import express from "express"

const router = express.Router()

router.post('/', (req, res) => {
    res.json(req.body)
})

export default router
