import express from "express";
import SupportTicket from "../../models/SupportTicket.model.js";

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        await (new SupportTicket(req.body)).save()

        res.send('ok')
    } catch (e) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

export default router
