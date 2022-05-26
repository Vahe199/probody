import express from 'express'
import next from 'next'
import APIv1 from './v1/index.js'
import './helpers/Environment.js'
import './helpers/MongoDB.js'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import Search from "./helpers/Search.js";

const port = parseInt(process.env.PORT)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

await Search.fullSync()
await Search.createIndexes()

app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json());
    server.use(cookieParser())
    server.use('/v1', APIv1)

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
