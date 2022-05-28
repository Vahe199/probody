import express from "express";
import Vacancy from "../../models/Vacancy.model.js";

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.query.limit || req.query.limit > 20) {
        req.query.limit = 20
    }

    if (!req.query.page) {
        req.query.page = 1
    }

    res.json({
        vacancies: await Vacancy.find({}, ['previewText', 'phone', 'photo', 'slug', 'salary', 'description', 'workHours', 'salonTitle', 'region']).populate('region').limit(req.query.limit).skip((req.query.page - 1) * req.query.limit).sort({createdAt: -1}),
        pageCount: Math.ceil(await Vacancy.countDocuments({}) / req.query.limit)
    })
})

export default router;
