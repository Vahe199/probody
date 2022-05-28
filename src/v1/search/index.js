import express from "express"
import Search from "../../helpers/Search.js"

const router = express.Router()

router.post('/region', async (req, res) => {
    if (!req.body.query || req.body.query.length < 3) {
        return res.status(422).json({
            message: 'invalidQueryLength'
        })
    }

    res.json(await Search.findRegion(`@name:{${req.body.query}*}`, 7, 0))
})

export default router
