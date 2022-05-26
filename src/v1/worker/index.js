import express from "express"
import AuthGuard from "../../middlewares/AuthGuard.js"
import Worker from '../../models/Worker.model.js'
import {v4 as uuidv4} from 'uuid'
import RedisHelper from "../../helpers/RedisHelper.js"
import mongoose from "mongoose";

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

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.mongo.ObjectId.isValid(req.params.id)) {
            return res.status(406).json({
                message: 'invalidId'
            })
        }

        const worker = await Worker.findOne({_id: new mongoose.mongo.ObjectId(req.params.id)}, "kind")

        if (!worker) {
            return res.status(404).json({
                message: 'workerNotFound'
            })
        }

        if (worker.kind === 'master') {
            return res.json(await Worker
                .findOne({_id: new mongoose.mongo.ObjectId(req.params.id)})
                .populate('services', 'name')
                .populate('leads', 'name')
                .populate('massageTypes', 'name')
                .populate('region', 'name'))
        } else {
            return res.json({kind: 'salon'})
        }
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export default router
