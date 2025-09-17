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

const app=express()
dotenv.config()
const PORT=process.env.PORT


connectMonogoDb()

// app.use(
//   cors({
//     origin: ['http://localhost:8080', 'https://ibookingvenue.com'],
//     credentials: true,
//   })
// );

const allowedOrigins = [
    process.env.FRONTEND_URL as string,
    process.env.ADMIN_URL as string,
    'http://localhost:8080',
    'https://ibookingvenue.com',
    
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                console.log(origin, "origin when cors is used");
                callback(null, origin);
            } else {
                console.log(origin, allowedOrigins, "origin when cors is not used");
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);



app.use(express.json());
app.use(cookieParser());

app.use('/',auditoriumAuth_route)
app.use('/',userAuth_route)
app.use('/',auditorium_route)
app.use('/',user_route)
app.use('/',admin_route)

app.listen(PORT,()=>{
    console.log('running')
})