import mongoose from "mongoose"
import Review from "../../models/Review.model.js"
import express from "express"
import apicache from "apicache"
import {parsePhoneNumber} from "libphonenumber-js";

const router = express.Router()

router.get('/:workerId', apicache.middleware('15 minutes'), async (req, res) => {
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
        reviews: await Review.find({target: req.params.workerId}, ['name', 'interior', 'massage', 'service', 'avg', 'text']).limit(req.query.limit).skip((req.query.page - 1) * req.query.limit).sort({createdAt: -1}),
        pageCount: Math.ceil(await Review.countDocuments({target: req.params.workerId}) / req.query.limit),
        avg: (await Review.aggregate([{$group: {_id: null, averageRate: {$avg: "$avg"}}}]))[0].averageRate
    })
})

export default router
