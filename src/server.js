import express from 'express'
import './helpers/Environment.js'
import './helpers/MongoDB.js'
import next from 'next'
import APIv1 from './v1/index.js'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import * as mime from "mime-types"
import * as shortid from 'shortid'
import multer from 'multer'
import Search from "./helpers/Search.js"
import path from "path"
import AuthGuard from "./middlewares/AuthGuard.js";

const port = parseInt(process.env.PORT)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const uploader = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/')
        },
        filename: (req, file, cb) => {
            let id = shortid.generate(),
                ext = mime.extension(file.mimetype)

            cb(null, `${id}.${ext}`)
        },
        fileFilter(req, file, cb) {
            const fileSize = parseInt(req.headers["content-length"])

            if ((file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") && fileSize <= 2.5e+7) {//25мб
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    })
})

await Search.fullSync()
await Search.createIndexes()

app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json());
    server.use(cookieParser())
    server.use('/v1', APIv1)

    server.post('/pic', AuthGuard('serviceProvider'), uploader.any(), (req, res) => {
        res.send(req.files[0].filename)
    })
    server.use('/pic', express.static(path.resolve('uploads')))

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
