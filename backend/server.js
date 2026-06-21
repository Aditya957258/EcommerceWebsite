// ======================================================
// FILE: server.js
// PRODUCTION LEVEL ECOMMERCE BACKEND SERVER
// ======================================================

import "dotenv/config"

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"

// ======================================================
// IMPORT ROUTES
// ======================================================

import userRoute from "./routes/userRoute.js"

// ======================================================
// IMPORT CONFIGS
// ======================================================

import { connectCloudinary } from "./config/cloudinary.js"

// ======================================================
// APP INITIALIZATION
// ======================================================

const app = express()

// ======================================================
// REQUIRED ENVIRONMENT VARIABLES
// ======================================================

const requiredEnvVars = [
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "CLOUDINARY_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_SECRET_KEY"
]

requiredEnvVars.forEach((env) => {
    if (!process.env[env]) {
        console.log(`
==================================================
❌ Missing Environment Variable
==================================================
${env}
==================================================
`)
        process.exit(1)
    }
})

// ======================================================
// DATABASE CONNECTION
// ======================================================

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log(`
==================================================
✅ MongoDB Connected Successfully
==================================================
`)
    } catch (error) {
        console.log(`
==================================================
❌ MongoDB Connection Failed
==================================================
${error.message}
==================================================
`)
        process.exit(1)
    }
}

// ======================================================
// CONNECT CLOUDINARY
// ======================================================

const initializeServices = async () => {
    try {
        await connectDB()

        await connectCloudinary()

        console.log(`
==================================================
☁️ Cloudinary Connected Successfully
==================================================
`)
    } catch (error) {
        console.log(`
==================================================
❌ Service Initialization Failed
==================================================
${error.message}
==================================================
`)
        process.exit(1)
    }
}

// ======================================================
// SECURITY MIDDLEWARE
// ======================================================

app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
)

// ======================================================
// LOGGER
// ======================================================

app.use(morgan("dev"))

// ======================================================
// BODY PARSER
// ======================================================

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// ======================================================
// COOKIE PARSER
// ======================================================

app.use(cookieParser())

// ======================================================
// CORS CONFIGURATION
// ======================================================

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("CORS Not Allowed"))
            }
        },
        credentials: true
    })
)

// ======================================================
// API STATUS ROUTE
// ======================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Stylentra Backend Running 🚀",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date()
    })
})

// ======================================================
// HEALTH CHECK ROUTE
// ======================================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Server Healthy ✅",
        uptime: process.uptime(),
        time: new Date()
    })
})

// ======================================================
// API ROUTES
// ======================================================

app.use("/api/user", userRoute)

// ======================================================
// DEMO PRODUCT ROUTE
// ======================================================

app.get("/api/products", async (req, res) => {
    try {
        const products = [
            {
                id: 1,
                name: "Premium Hoodie",
                category: "Men",
                price: 1999,
                stock: 15,
                rating: 4.8
            },
            {
                id: 2,
                name: "Stylish Jacket",
                category: "Winter",
                price: 2999,
                stock: 10,
                rating: 4.7
            }
        ]

        res.status(200).json({
            success: true,
            totalProducts: products.length,
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found ❌"
    })
})

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((error, req, res, next) => {
    console.error(error.stack)

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    })
})

// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 4000

const startServer = async () => {
    try {
        await initializeServices()

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`
==================================================
🚀 STYLENTRA SERVER STARTED
==================================================
🌐 PORT        : ${PORT}
🛠 MODE        : ${process.env.NODE_ENV || "development"}
🔗 LOCAL URL   : http://localhost:${PORT}
==================================================
`)
        })
    } catch (error) {
        console.log(`
==================================================
❌ Server Startup Failed
==================================================
${error.message}
==================================================
`)
        process.exit(1)
    }
}

startServer()