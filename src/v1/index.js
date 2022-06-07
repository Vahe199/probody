import express from "express"
import AuthRouter from "./auth/index.js"
import WorkerRouter from "./worker/index.js"
import AdminRouter from "./admin/index.js"
import SearchRouter from "./search/index.js"
import ProgramRouter from "./program/index.js"
import UserRouter from './user/index.js'
import ReviewRouter from "./review/index.js"
import VacancyRouter from "./vacancy/index.js"
import BlogRouter from "./blog/index.js"
import AuthGuard from "../middlewares/AuthGuard.js"

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/admin', AuthGuard('admin'), AdminRouter)
router.use('/worker', WorkerRouter)
router.use('/program', ProgramRouter)
router.use('/user', UserRouter)
router.use('/search', SearchRouter)
router.use('/review', ReviewRouter)
router.use('/vacancy', VacancyRouter)
router.use('/blog', BlogRouter)

export default router
