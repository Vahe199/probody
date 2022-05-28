import express from "express"
import AuthGuard from "../../middlewares/AuthGuard.js"
import Worker from '../../models/Worker.model.js'
import {v4 as uuidv4} from 'uuid'
import RedisHelper from "../../helpers/RedisHelper.js"
import mongoose from "mongoose";
import apicache from "apicache";

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

router.get('/:id/similar', apicache.middleware('5 minutes'), async (req, res) => {
    if (!mongoose.mongo.ObjectId.isValid(req.params.id)) {
        return res.status(406).json({
            message: 'invalidId'
        })
    }

    const workerDoc = await Worker.findById(req.params.id, 'location')

    if (!workerDoc) {
        return res.status(404).json({
            message: 'workerNotFound'
        })
    }

    if (workerDoc.kind === 'master') {
        res.json(await Worker.find({parent: {$exists: false}}).where('location').near({ center: { coordinates: workerDoc.location.coordinates, type: 'Point' }}).limit(3)) // TODO: set up projection
    } else {
        res.json(await Worker.find({slaves: {$exists: true, $ne: []}}).where('location').near({ center: { coordinates: workerDoc.location.coordinates, type: 'Point' }}).limit(3)) // TODO: set up projection
    }
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

router.get('/:id/slaves', async (req, res) => {
    try {
        if (!mongoose.mongo.ObjectId.isValid(req.params.id)) {
            return res.status(406).json({
                message: 'invalidId'
            })
        }

        const worker = await Worker.findOne({_id: new mongoose.mongo.ObjectId(req.params.id)}, ["kind", 'slaves'])

        if (!worker) {
            return res.status(404).json({
                message: 'workerNotFound'
            })
        }

        if (worker.kind === 'salon') {
            return res.json(await Worker
                .find({_id: {$in: worker.slaves}}))
        } else {
            return res.json(null)
        }
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export default router
