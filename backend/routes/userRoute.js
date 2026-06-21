// ======================================================
// FILE: routes/userRoute.js
// ENTERPRISE LEVEL USER ROUTES
// STYLENTRA ECOMMERCE BACKEND
// AMAZON / FLIPKART STYLE
// ======================================================

import express from "express"

// ======================================================
// IMPORT CONTROLLERS
// ======================================================

import {

    registerUser,
    loginUser,
    logoutUser,

    getUserProfile,
    updateUserProfile,

    getAllUsers,
    deleteUser

} from "../controllers/userController.js"

// ======================================================
// IMPORT MIDDLEWARES
// ======================================================

import {

    protect,
    adminOnly

} from "../middleware/authMiddleware.js"

// ======================================================
// ROUTER CONFIG
// ======================================================

const userRoute = express.Router()

// ======================================================
// AUTH ROUTES
// ======================================================

// ======================================================
// REGISTER USER
// ROUTE : POST /api/user/register
// ACCESS : PUBLIC
// ======================================================

userRoute.post(
    "/register",
    registerUser
)

// ======================================================
// LOGIN USER
// ROUTE : POST /api/user/login
// ACCESS : PUBLIC
// ======================================================

userRoute.post(
    "/login",
    loginUser
)

// ======================================================
// LOGOUT USER
// ROUTE : GET /api/user/logout
// ACCESS : PRIVATE
// ======================================================

userRoute.get(
    "/logout",
    protect,
    logoutUser
)

// ======================================================
// USER PROFILE ROUTES
// ======================================================

// ======================================================
// GET USER PROFILE
// ROUTE : GET /api/user/profile
// ACCESS : PRIVATE
// ======================================================

userRoute.get(
    "/profile",
    protect,
    getUserProfile
)

// ======================================================
// UPDATE USER PROFILE
// ROUTE : PUT /api/user/profile/update
// ACCESS : PRIVATE
// ======================================================

userRoute.put(
    "/profile/update",
    protect,
    updateUserProfile
)

// ======================================================
// ADMIN ROUTES
// ======================================================

// ======================================================
// GET ALL USERS
// ROUTE : GET /api/user/admin/users
// ACCESS : ADMIN
// ======================================================

userRoute.get(
    "/admin/users",
    protect,
    adminOnly,
    getAllUsers
)

// ======================================================
// DELETE USER
// ROUTE : DELETE /api/user/admin/user/:id
// ACCESS : ADMIN
// ======================================================

userRoute.delete(
    "/admin/user/:id",
    protect,
    adminOnly,
    deleteUser
)

// ======================================================
// SERVER TEST ROUTE
// ROUTE : GET /api/user/test
// ======================================================

userRoute.get(
    "/test",
    async (req, res) => {

        try {

            res.status(200).json({

                success: true,

                message:
                    "✅ User Route Working Successfully",

                backend:
                    "Stylentra Ecommerce Backend",

                environment:
                    process.env.NODE_ENV || "development",

                serverTime:
                    new Date(),

                apiVersion:
                    "v1"
            })

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message
            })
        }
    }
)

// ======================================================
// INVALID ROUTE HANDLER
// ======================================================

userRoute.use((req, res) => {

    res.status(404).json({

        success: false,

        message:
            "❌ User API Route Not Found"
    })
})

// ======================================================
// EXPORT ROUTER
// ======================================================

export default userRoute
