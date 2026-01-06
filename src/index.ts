import express from 'express'
import dotenv from 'dotenv'
import connectMonogoDb from './config/db'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userAuth_route from './routes/userRoutes/authRoutes'
import auditoriumAuth_route from './routes/auditoriumRoutes/authRoute'
import auditorium_route from './routes/auditoriumRoutes/auditoriumRoutes'
import user_route from './routes/userRoutes/userRoutes'
import admin_route from './routes/AdminRoutes/adminRoutes'
import "./cron/subscriptionReminder"
import "./cron/bookingReminder"

dotenv.config()

const app = express()
const PORT = process.env.PORT

connectMonogoDb()

const allowedOrigins = [
    process.env.FRONTEND_URL as string,
    process.env.ADMIN_URL as string,
    'http://localhost:8080',
    'https://ibookingvenue.com',
]

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("Incoming origin:", origin)
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true)
            } else {
                console.log("Blocked by CORS:", origin)
                return callback(new Error("Not allowed by CORS"))
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

// ✅ REQUIRED for preflight requests
// app.options("*", cors())

app.use(express.json())
app.use(cookieParser())

app.use('/', auditoriumAuth_route)
app.use('/', userAuth_route)
app.use('/', auditorium_route)
app.use('/', user_route)
app.use('/', admin_route)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
