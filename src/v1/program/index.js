import express from "express";
import apicache from "apicache";
import DefaultProgram from "../../models/DefaultProgram.model.js";

const router = express.Router()

router.get('/', apicache.middleware('15 minutes'), async (req, res) => {
    res.json(await DefaultProgram.find({}))
})

export default router
