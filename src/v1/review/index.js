import mongoose from "mongoose"
import Review from "../../models/Review.model.js"
import Worker from "../../models/Worker.model.js";
import express from "express"
import apicache from "apicache"
import AuthGuard from "../../middlewares/AuthGuard.js";
import {v4 as uuidv4} from "uuid";
import RedisHelper from "../../helpers/RedisHelper.js";

const router = express.Router()

router.get('/:workerId', apicache.middleware('5 minutes'), async (req, res) => {
    if (!mongoose.mongo.ObjectId.isValid(req.params.workerId)) {
        return res.status(406).json({
            message: 'invalidId'
        })
    }

    if (!req.query.limit || req.query.limit > 20) {
        req.query.limit = 20
    }

    if (!req.query.page) {
        req.query.page = 1
    }

    res.json({
        reviews: await Review.find({target: req.params.workerId}).limit(req.query.limit).skip((req.query.page - 1) * req.query.limit).sort({createdAt: -1}),
        pageCount: Math.ceil(await Review.countDocuments({target: req.params.workerId}) / req.query.limit),
        // avg: (await Review.aggregate([{$group: {_id: null, averageRate: {$avg: "$avg"}}}]))[0].averageRate
    })
})

router.post('/:workerId', AuthGuard('serviceProvider'), async (req, res) => {
    try {
        const {text,
            interior,
            massage,
            service} = req.body

        if (!mongoose.mongo.ObjectId.isValid(req.params.workerId)) {
            return res.status(406).json({
                message: 'invalidId'
            })
        }

        const salonDoc = await Worker.findById(req.params.workerId, 'kind')

        if (!salonDoc) {
            return res.status(406).json({
                message: 'Salon not found'
            })
        }

        const reviewData = {
            userId: req.user._id,
            target: req.params.workerId,
            targetType: salonDoc.kind,
            name: req.user.nickName || 'Гость',

            text,
            interior,
            massage,
            service
        }

        ;(new Review(reviewData)).validate(async (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                })
            }

            const redisKey = 'pending:check:review:' + uuidv4()

            await RedisHelper.set(redisKey, JSON.stringify(reviewData))

            res.status(202).json({
                message: "createdReview"
            })
        })
    }catch (e) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

router.post('/:reviewId/answer', AuthGuard('serviceProvider'), async (req, res) => {
    try {
        const {text} = req.body

        if (!mongoose.mongo.ObjectId.isValid(req.params.reviewId)) {
            return res.status(406).json({
                message: 'invalidId'
            })
        }

        const reviewDoc = await Review.findOne({_id: req.params.reviewId}).populate('target')

        if (!reviewDoc || String(reviewDoc.target.host) !== String(req.user._id)) {
            return res.status(406).json({
                message: 'Review not found'
            })
        }

        reviewDoc.answer = text
        await reviewDoc.save()

        res.status(202).json({
            message: "createdAnswer"
        })
    }catch (e) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

export default router
