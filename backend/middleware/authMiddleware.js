// ======================================================
// FILE: middleware/authMiddleware.js
// ADVANCED AUTH MIDDLEWARE
// REAL WORLD ECOMMERCE BACKEND
// AMAZON / FLIPKART STYLE
// ======================================================

import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// ======================================================
// PROTECT ROUTE MIDDLEWARE
// VERIFY LOGIN TOKEN
// ======================================================

export const protect = async (
    req,
    res,
    next
) => {

    try {

        // ======================================================
        // GET TOKEN
        // ======================================================

        let token = null

        // FROM COOKIE

        if (req.cookies?.token) {

            token = req.cookies.token
        }

        // FROM HEADER

        if (
            !token &&
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token =
                req.headers.authorization.split(" ")[1]
        }

        // ======================================================
        // TOKEN NOT FOUND
        // ======================================================

        if (!token) {

            return res.status(401).json({

                success: false,

                message:
                    "Access denied. Please login first."
            })
        }

        // ======================================================
        // VERIFY TOKEN
        // ======================================================

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            )

        // ======================================================
        // FIND USER
        // ======================================================

        const user =
            await User.findById(decoded.id)
                .select("-password")

        // ======================================================
        // USER NOT FOUND
        // ======================================================

        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "User not found"
            })
        }

        // ======================================================
        // BLOCKED USER CHECK
        // ======================================================

        if (user.isBlocked) {

            return res.status(403).json({

                success: false,

                message:
                    "Your account has been blocked"
            })
        }

        // ======================================================
        // SAVE USER IN REQUEST
        // ======================================================

        req.user = user

        next()

    } catch (error) {

        console.log(`
==================================================
❌ AUTH MIDDLEWARE ERROR
==================================================
${error.message}
==================================================
        `)

        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired token"
        })
    }
}

// ======================================================
// ADMIN ONLY MIDDLEWARE
// ======================================================

export const adminOnly = async (
    req,
    res,
    next
) => {

    try {

        // ======================================================
        // CHECK USER
        // ======================================================

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message:
                    "Unauthorized access"
            })
        }

        // ======================================================
        // CHECK ADMIN ROLE
        // ======================================================

        if (req.user.role !== "admin") {

            return res.status(403).json({

                success: false,

                message:
                    "Admin access only"
            })
        }

        // ======================================================
        // CONTINUE
        // ======================================================

        next()

    } catch (error) {

        console.log(`
==================================================
❌ ADMIN MIDDLEWARE ERROR
==================================================
${error.message}
==================================================
        `)

        return res.status(500).json({

            success: false,

            message:
                "Server error"
        })
    }
}