import express from "express"
import RedisHelper from "../../helpers/RedisHelper.js"
import Worker from '../../models/Worker.model.js'
import Search from "../../helpers/Search.js";
import Region from "../../models/Region.model.js";

const router = express.Router()

router.get('/worker', async (req, res) => {
        const workersKey = 'pending:check:worker:*',
            vacanciesKey = 'pending:check:vacancy:*',
            reviewsKey = 'pending:check:review:*',
            uuidExtractor = key => key.split(':')[3]

        res.json({
            workers: (await RedisHelper.keys(workersKey)).map(uuidExtractor),
            vacancies: (await RedisHelper.keys(vacanciesKey)).map(uuidExtractor),
            reviews: (await RedisHelper.keys(reviewsKey)).map(uuidExtractor)
        })
})

router.patch('/worker/:uuid/approve', async (req, res) => {
    try {
        const redisKey = 'pending:check:worker:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        const workerId = await (new Worker(doc)).save()
        await Search.addWorker('search:workers:', workerId, doc.name, doc.phone, doc.lastRaise, doc.rooms, doc.description, doc.leads, doc.services, doc.massageTypes, (await Region.findById(doc.region)).name)
        await RedisHelper.unlink(redisKey)

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

router.patch('/worker/:uuid/decline', async (req, res) => {
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

router.patch('/worker/:uuid/editandapprove', async (req, res) => {
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
            await Search.addWorker('search:workers:', workerId, doc.name, doc.phone, doc.lastRaise, doc.rooms, doc.description, doc.leads, doc.services, doc.massageTypes, (await Region.findById(doc.region)).name)
            await RedisHelper.unlink(redisKey)

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
