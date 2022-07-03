import express from "express"
import Vacancy from "../../models/Vacancy.model.js"
import AuthGuard from "../../middlewares/AuthGuard.js"
import {v4 as uuidv4} from "uuid";
import RedisHelper from "../../helpers/RedisHelper.js";

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.query.limit || req.query.limit > 20) {
        req.query.limit = 20
    }

    if (!req.query.page) {
        req.query.page = 1
    }

    res.json({
        vacancies: await Vacancy.find({}, ['previewText', 'phone', 'photo', 'slug', 'salary', 'description', 'workHours', 'salonTitle', 'region', 'title']).populate('region').limit(req.query.limit).skip((req.query.page - 1) * req.query.limit).sort({createdAt: -1}),
        pageCount: Math.ceil(await Vacancy.countDocuments({}) / req.query.limit)
    })
})

router.post('/', AuthGuard('serviceProvider'), async (req, res) => {
    req.body = Object.assign({}, req.body, {
        host: req.user._id
    })

    console.log(req.body)

    try {
        (new Vacancy(req.body)).validate(async (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                })
            }

            const redisKey = 'pending:check:vacancy:' + uuidv4()

            await RedisHelper.set(redisKey, JSON.stringify(req.body))

            res.status(202).json({
                message: "createdVacancy"
            })
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

router.get('/:slug', async (req, res) => {
    res.json(await Vacancy.findOne({slug: req.params.slug}))
})

export default router;
