import express from "express";
import AuthGuard from "../../middlewares/AuthGuard.js";
import Stats from "../../models/Stats.model.js";
import Worker from "../../models/Worker.model.js";

const router = express.Router()

router.put('/:salonId/views', async (req, res) => {
    try {
        const currentDay = new Date()
        currentDay.setHours(0, 0, 0, 0)

        await Stats.updateOne({
                salon: req.params.salonId,
                date: currentDay
            }, {
                $inc: {
                    [`counters.views`]: 1
                }
            },
            {
                upsert: true
            }
        )

        res.status(202).send('ok')
    } catch (e) {
        console.log(e)

        res.status(500).json({
            type: 'Error',
            message: 'Internal Server Error'
        })
    }
})

router.put('/:salonId/:field', async (req, res) => {
    try {
        const currentDay = new Date()
        currentDay.setHours(0, 0, 0, 0)

        await Stats.updateOne({
                salon: req.params.salonId,
                date: currentDay
            }, {
                $inc: {
                    [`counters.actions.${req.params.field}`]: 1
                }
            },
            {
                upsert: true
            }
        )

        res.status(202).send('ok')
    } catch (e) {
        console.log(e)

        res.status(500).json({
            type: 'Error',
            message: 'Internal Server Error'
        })
    }
})

router.get('/', AuthGuard('serviceProvider'), async (req, res) => {
    try {
        const salon = await Worker.findOne({
            host: req.user._id,
            parent: {
                $exists: false
            }
        }, '_id')

        res.json({
            data: await Stats.find({
                salon: salon._id,
                date: {
                    $gte: req.query.from,
                    $lte: req.query.to
                }
            })
        })
    } catch (e) {
        console.log(e)

        res.status(500).json({
            type: 'Error',
            message: 'Internal Server Error'
        })
    }
})

export default router
