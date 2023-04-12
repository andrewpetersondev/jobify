import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'
import morgan from 'morgan'

// production
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"


// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

// only for deployment
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))


app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/', (req, res) => {
    res.send({ msg: 'Welcome!' })
})

app.get('/api/v1', (req, res) => {
    res.send({ msg: 'API' })
})

// api routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// try to the two routes above, after that, every route will lead to client build's index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}

start()