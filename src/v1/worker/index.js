import express from "express"
import AuthGuard from "../../middlewares/AuthGuard.js"
import Worker from '../../models/Worker.model.js'
import {v4 as uuidv4} from 'uuid'
import RedisHelper from "../../helpers/RedisHelper.js";

const router = express.Router()

router.post('/', AuthGuard('serviceProvider'), async (req, res) => {
        if (req.body.location) {
            req.body.location = {
                type: "Point",
                coordinates: req.body.location
            }
        }

        (new Worker(req.body)).validate(async (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                })
            }

            const redisKey = 'pending:check:worker:' + uuidv4()

            await RedisHelper.set(redisKey, JSON.stringify(req.body))

            res.status(202).json({
                message: "createdWorker"
            })
        })
})

export default router
