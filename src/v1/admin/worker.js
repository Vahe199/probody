import RedisHelper from "../../helpers/RedisHelper.js";
import Worker from "../../models/Worker.model.js";
import Search from "../../helpers/Search.js";
import Region from "../../models/Region.model.js";
import express from "express";

const router = express.Router();

router.get('/:uuid/view', async (req, res) => {
    try {
        const redisKey = 'pending:check:worker:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(404).json({
                message: 'Entity not found'
            })
        }

        res.status(200).json({
            data: doc
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

router.patch('/:uuid/approve', async (req, res) => {
    try {
        const redisKey = 'pending:check:worker:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        const parentWorker = await (new Worker(doc)).save()

        if (doc.kind === 'salon') {
            doc.masters.forEach(master => {
                const masterDoc = {
                        kind: 'master',
                        name: master.name,
                        characteristics: master.characteristics,
                        parent: parentWorker._id,
                        host: doc.host,
                        photos: master.photos
                    }

                ;(new Worker(masterDoc)).save()
            })
        }

        const populatedDoc = await Worker.findById(parentWorker._id).populate('services', 'name').populate('leads', 'name').populate('region', 'name')

        await Search.addWorker('search:workers:', parentWorker._id, doc.kind, doc.name, doc.phone, doc.lastRaise, doc.avgCost, doc.rooms, doc.description, populatedDoc.leads, populatedDoc.services, doc.programs, populatedDoc.region.name)
        await RedisHelper.unlink(redisKey)
        await RedisHelper.unlink('haspw:' + doc.host)

        res.status(202).json({
            message: 'approvedWorker'
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

router.patch('/:uuid/decline', async (req, res) => {
    try {
        const redisKey = 'pending:check:worker:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        // maybe, we'll have to notify the user here...
        await RedisHelper.unlink(redisKey)
        await RedisHelper.unlink('haspw:' + doc.host)

        res.status(202).json({
            message: 'declinedWorker'
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

router.patch('/:uuid/editandapprove', async (req, res) => {
    try {
        const redisKey = 'pending:check:worker:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        Object.assign(doc, req.body)

        // maybe, we'll have to notify the user here...
        const mongoDoc = new Worker(doc)

        mongoDoc.validate(async (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }

            await mongoDoc.save()
            await Search.addWorker('search:workers:', mongoDoc._id, doc.kind, doc.name, doc.phone, doc.lastRaise, doc.rooms, doc.description, doc.leads, doc.services, doc.programs, (await Region.findById(doc.region)).name)
            await RedisHelper.unlink(redisKey)
            await RedisHelper.unlink('haspw:' + doc.host)

            res.status(202).json({
                message: 'approvedWorker'
            })
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

export default router
