import express from "express"
import apicache from 'apicache'
import Search from "../../helpers/Search.js"
import Lead from "../../models/Lead.model.js"
import Messenger from "../../models/Messenger.model.js"
import Service from "../../models/Service.model.js"

const router = express.Router()

router.post('/region', async (req, res) => {
    if (!req.body.query || req.body.query.length < 3) {
        return res.status(422).json({
            message: 'invalidQueryLength'
        })
    }

    res.json(await Search.findRegion(`@name:{${req.body.query}*}`, 7, 0))
})

router.get('/filter', apicache.middleware('5 minutes'), async (req, res) => {
    res.json({
        leads: await Lead.find({}),
        services: await Service.find({}),
        messengers: await Messenger.find({}),
        rooms: [
            {
                name: '2-5'
            },
            {
                name: '5-10'
            },
            {
                name: '10+'
            }
        ]
    })
})

export default router
