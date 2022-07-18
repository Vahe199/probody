import express from "express";
import SupportTicket from "../../models/SupportTicket.model.js";

const router = express.Router()

router.post('/', async (req, res) => {
    await (new SupportTicket(req.body)).save()

    res.send('ok')
})

export default router
