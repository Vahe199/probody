import express from "express";
import AuthGuard from "../../middlewares/AuthGuard.js";
import Stats from "../../models/Stats.model.js";

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

router.get('/:salonId', AuthGuard('serviceProvider'), async (req, res) => {
    try {
        //TODO get stats for period
    } catch (e) {
        console.log(e)

        res.status(500).json({
            type: 'Error',
            message: 'Internal Server Error'
        })
    }
})

export default router
