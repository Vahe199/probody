import express from "express"
import apicache from 'apicache'
import Search from "../../helpers/Search.js"
import Lead from "../../models/Lead.model.js"
import Messenger from "../../models/Messenger.model.js"
import Service from "../../models/Service.model.js"
import {parsePhoneNumber} from "libphonenumber-js";

const router = express.Router()

router.post('/region', async (req, res) => {
    if (!req.body.query || req.body.query.length < 3) {
        return res.status(422).json({
            message: 'invalidQueryLength'
        })
    }

    res.json(await Search.findRegion(req.body.query + '*', 7, 0))
})

router.get('/filter', apicache.middleware('15 minutes'), async (req, res) => {
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

router.post('/worker', async (req, res) => {
    let parsedPN

    try {
        parsedPN = parsePhoneNumber(req.body.query, process.env.PHONE_REGION)
    } catch (e) {}

    if (!req.body.query || req.body.query.length < 3) {
        return res.status(422).json({
            message: 'invalidQueryLength'
        })
    }

    if (!req.query.limit || req.query.limit > 20) {
        req.query.limit = 20
    }

    if (!req.query.page) {
        req.query.page = 1
    }

    if (req.query.onlyCount === 'true') {
        req.query.limit = 0
    }

    if (parsedPN && parsedPN.isValid()) {
        req.body.query = '@phone:{' + parsedPN.number.replace('+', '') + '}'
    } else {
        req.body.query += '*'
    }

    if (req.body.filters) {
        for (let filterName in req.body.filters) {
            req.body.query += ` @${filterName}:${req.body.filters[filterName]}`
        }
    }

    res.json(await Search.findWorker(req.body.query, req.query.hasOwnProperty('mapView'), req.query.limit, (req.query.page - 1) * req.query.limit))
})

export default router
