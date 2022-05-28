import express from "express"
import AuthRouter from "./auth/index.js"
import WorkerRouter from "./worker/index.js"
import AdminRouter from "./admin/index.js"
import SearchRouter from "./search/index.js"
import AuthGuard from "../middlewares/AuthGuard.js"

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/admin', AuthGuard('admin'), AdminRouter)
router.use('/worker', WorkerRouter)
router.use('/search', SearchRouter)

export default router
