import express from "express"
import RedisHelper from "../../helpers/RedisHelper.js"
import Worker from '../../models/Worker.model.js'

const router = express.Router()

router.patch('/worker/:uuid/approve', async (req, res) => {
    try {
        const redisKey = 'pending:check:worker:' + req.params.uuid,
            doc = JSON.parse(await RedisHelper.get(redisKey))

        if (!doc) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        await (new Worker(doc)).save()
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
