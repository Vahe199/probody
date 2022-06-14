import express from "express"
import apicache from 'apicache'
import Search from "../../helpers/Search.js"
import Lead from "../../models/Lead.model.js"
import Messenger from "../../models/Messenger.model.js"
import Service from "../../models/Service.model.js"
import {isValidPhoneNumber, parsePhoneNumber} from "libphonenumber-js";
import Region from "../../models/Region.model.js";

const router = express.Router()

// router.post('/region', async (req, res) => {
//     if (!req.body.query || req.body.query.length < 3) {
//         return res.status(422).json({
//             message: 'invalidQueryLength'
//         })
//     }
//
//     res.json(await Search.findRegion(req.body.query + '*', 7, 0))
// })
// router.get('/region', apicache.middleware('15 minutes'), async (req, res) => {
//     res.json(await Region.find({}))
// })

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
    try {
        let parsedPN

        try {
            parsedPN = parsePhoneNumber(req.body.query, process.env.PHONE_REGION)
            if (!isValidPhoneNumber(parsedPN.number, process.env.PHONE_REGION)) {
                parsedPN = null
            }
        } catch (e) {
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

        req.body.query = req.body.query.trim().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')

        if (parsedPN && parsedPN.isValid()) {
            req.body.query = '@phone:{' + parsedPN.number.replace('+', '') + '}'
        } else if (req.body.query.length) {
            req.body.query += '*'
        }

        if (req.body.filters) {
            for (let filterName in req.body.filters) {
                if (req.body.filters[filterName].length) {
                    if (filterName === 'kind') {
                        req.body.query += ` @${filterName}:{${req.body.filters[filterName]}}`
                    } else {
                        req.body.query += ` @${filterName}:${req.body.filters[filterName]}`
                    }
                }
            }
        }

        if (!req.body.query.length) {
            req.body.query = '*'
        }

        res.json(await Search.findWorker(req.body.query, req.query.hasOwnProperty('mapView'), req.query.limit, (req.query.page - 1) * req.query.limit))
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})

export default router
