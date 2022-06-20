import express from "express"
import AuthGuard from "../../middlewares/AuthGuard.js"
import Worker from '../../models/Worker.model.js'
import {v4 as uuidv4} from 'uuid'
import RedisHelper from "../../helpers/RedisHelper.js"
import mongoose from "mongoose";
import apicache from "apicache";
import Review from "../../models/Review.model.js"
import Service from "../../models/Service.model.js";

const router = express.Router()

router.post('/', AuthGuard('serviceProvider'), apicache.middleware('5 minutes'), async (req, res) => {
    if (req.body.location) {
        req.body.location = {
            type: "Point",
            coordinates: req.body.location
        }
    }

    req.body.programs = req.body.programs.map(i => {
        i.cost = Number(i.cost)

        return i
    });

    req.body.host = req.user._id

    ;(new Worker(req.body)).validate(async (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }

        const redisKey = 'pending:check:worker:' + uuidv4()

        await RedisHelper.set('haspw:' + req.user._id, '')
        await RedisHelper.set(redisKey, JSON.stringify(req.body))

        res.status(202).json({
            message: "createdWorker"
        })
    })
})

router.get('/top3', apicache.middleware('15 minutes'), async (req, res) => {
    const top3Ids = Object.assign({}, ...(await Review.aggregate([{$match: {targetType: 'master'}}, {
            $group: {
                _id: '$target',
                averageRate: {$avg: "$avg"}
            }
        }]).sort({averageRate: -1}).limit(3)).map(item => ({[item._id]: item.averageRate}))),
        top3Workers = await Worker.find({_id: {$in: Object.keys(top3Ids)}})

    res.json(top3Workers)
})

router.get('/:id/similar', apicache.middleware('15 minutes'), async (req, res) => {
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
        res.json(await Worker.find({parent: {$exists: false}}).where('location').near({
            center: {
                coordinates: workerDoc.location.coordinates,
                type: 'Point'
            }
        }).limit(3)) // TODO: set up projection
    } else {
        res.json(await Worker.find({
            kind: 'salon'
        }).where('location').near({center: {coordinates: workerDoc.location.coordinates, type: 'Point'}}).limit(3)) // TODO: set up projection
    }
})

router.get('/:slug', async (req, res) => {
    try {
        const worker = await Worker.findOne({slug: req.params.slug}, "kind")

        if (!worker) {
            return res.status(404).json({
                message: 'workerNotFound'
            })
        }

        const aggregationPipeline = [
            {
                $match: {
                    slug: req.params.slug
                }
            },
            {
                $limit: 1
            },
            {
                $lookup: {
                    from: 'workers',
                    localField: '_id',
                    foreignField: 'parent',
                    as: 'masters'
                }
            },
            {
                $lookup: {
                    from: 'regions',
                    localField: 'region',
                    foreignField: '_id',
                    as: 'region'
                }
            },
            {
                $lookup: {
                    from: 'services',
                    localField: 'services',
                    foreignField: '_id',
                    as: 'services'
                }
            },
            {
                $lookup: {
                    from: 'leads',
                    localField: 'leads',
                    foreignField: '_id',
                    as: 'leads'
                }
            },
            {
                $project: {
                    region: {$arrayElemAt: ['$region', 0]},

                    services: 1,
                    leads: 1,
                    kind: 1,
                    location: 1,
                    characteristics: 1,
                    name: 1,
                    slug: 1,
                    workHours: 1,
                    workDays: 1,
                    isVerified: 1,
                    photos: 1,
                    messengers: 1,
                    address: 1,
                    social: 1,
                    programs: 1,
                    description: 1,
                    phone: 1,
                }
            }]

        return res.json({
            worker: await Worker.aggregate(aggregationPipeline),
            allServices: await Service.find({}),
            reviews: await Review.aggregate([{
                $match: {
                    target: worker._id
                }
            }, {
                $group: {
                    _id: '$target',
                    avg: {
                        $avg: '$avg'
                    },
                    count: {
                        $count: {}
                    }
                }
            }])
        })
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
