import RedisHelper from "../../helpers/RedisHelper.js";
import express from "express";
import Vacancy from "../../models/Vacancy.model.js";

const router = express.Router();

router.get('/:uuid/view', async (req, res) => {
    try {
        const redisKey = 'pending:check:vacancy:' + req.params.uuid,
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
        const redisKey = 'pending:check:vacancy:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        if (doc._id) {
            console.log({_id: doc._id}, JSON.stringify({$set: doc}, undefined, 4))
            Vacancy.updateOne({_id: doc._id}, {$set: doc})
        } else {
            await (new Vacancy(doc)).save()
        }

        await RedisHelper.unlink(redisKey)

        res.status(202).json({
            message: 'approvedVacancy'
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
        const redisKey = 'pending:check:vacancy:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        // maybe, we'll have to notify the user here...
        await RedisHelper.unlink(redisKey)

        res.status(202).json({
            message: 'declinedVacancy'
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
        const redisKey = 'pending:check:vacancy:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        Object.assign(doc, req.body)

        // maybe, we'll have to notify the user here...
        const mongoDoc = new Vacancy(doc)

        mongoDoc.validate(async (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }

            await mongoDoc.save()
            await RedisHelper.unlink(redisKey)

            res.status(202).json({
                message: 'approvedVacancy'
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
