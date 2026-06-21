// ======================================================
// FILE: controllers/userController.js
// ADVANCED USER CONTROLLER
// REAL WORLD ECOMMERCE BACKEND
// STYLENTRA BACKEND
// ======================================================

import User from "../models/userModel.js"
import validator from "validator"

// ======================================================
// JWT SECRET CHECK
// ======================================================

if (!process.env.JWT_SECRET) {

    throw new Error(
        "JWT_SECRET is missing in .env file"
    )
}

// ======================================================
// GENERATE TOKEN + COOKIE
// ======================================================

const sendToken = (user, statusCode, res) => {

    const token = user.generateToken()

    res
        .status(statusCode)
        .cookie("token", token, {

            httpOnly: true,

            secure: false,

            sameSite: "strict",

            maxAge:
                7 * 24 * 60 * 60 * 1000
        })

        .json({

            success: true,

            token,

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                avatar: user.avatar,

                role: user.role,

                phone: user.phone,

                isVerified:
                    user.isVerified
            }
        })
}

// ======================================================
// REGISTER USER
// ======================================================

export const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body

        // ======================================================
        // VALIDATION
        // ======================================================

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"
            })
        }

        // ======================================================
        // EMAIL VALIDATION
        // ======================================================

        if (
            !validator.isEmail(email)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter valid email"
            })
        }

        // ======================================================
        // PASSWORD VALIDATION
        // ======================================================

        if (
            password.length < 6
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 6 characters"
            })
        }

        // ======================================================
        // CHECK EXISTING USER
        // ======================================================

        const existingUser =
            await User.findOne({

                email:
                    email.toLowerCase()
            })

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message:
                    "User already exists"
            })
        }

        // ======================================================
        // CREATE USER
        // ======================================================

        const user =
            await User.create({

                name,

                email:
                    email.toLowerCase(),

                password
            })

        // ======================================================
        // SEND TOKEN
        // ======================================================

        sendToken(
            user,
            201,
            res
        )

    } catch (error) {

        console.log(error)

        res.status(500).json({

            success: false,

            message:
                error.message
        })
    }
}

// ======================================================
// LOGIN USER
// ======================================================

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body

        // ======================================================
        // VALIDATION
        // ======================================================

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password required"
            })
        }

        // ======================================================
        // FIND USER
        // ======================================================

        const user =
            await User.findOne({

                email:
                    email.toLowerCase()
            })

        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"
            })
        }

        // ======================================================
        // BLOCK CHECK
        // ======================================================

        if (user.isBlocked) {

            return res.status(403).json({

                success: false,

                message:
                    "Your account has been blocked"
            })
        }

        // ======================================================
        // CHECK PASSWORD
        // ======================================================

        const isMatch =
            await user.comparePassword(
                password
            )

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"
            })
        }

        // ======================================================
        // UPDATE LAST LOGIN
        // ======================================================

        user.lastLogin =
            new Date()

        await user.save()

        // ======================================================
        // SEND TOKEN
        // ======================================================

        sendToken(
            user,
            200,
            res
        )

    } catch (error) {

        console.log(error)

        res.status(500).json({

            success: false,

            message:
                error.message
        })
    }
}

// ======================================================
// LOGOUT USER
// ======================================================

export const logoutUser = async (req, res) => {

    try {

        res.cookie(

            "token",

            "",

            {

                httpOnly: true,

                expires:
                    new Date(0)
            }
        )

        res.status(200).json({

            success: true,

            message:
                "Logout successful"
        })

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message
        })
    }
}

// ======================================================
// GET USER PROFILE
// ======================================================

export const getUserProfile = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.user.id
            )

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"
            })
        }

        res.status(200).json({

            success: true,

            user
        })

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message
        })
    }
}

// ======================================================
// UPDATE USER PROFILE
// ======================================================

export const updateUserProfile = async (req, res) => {

    try {

        const {
            name,
            phone,
            avatar
        } = req.body

        const user =
            await User.findById(
                req.user.id
            )

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"
            })
        }

        // ======================================================
        // UPDATE DATA
        // ======================================================

        user.name =
            name || user.name

        user.phone =
            phone || user.phone

        user.avatar =
            avatar || user.avatar

        await user.save()

        res.status(200).json({

            success: true,

            message:
                "Profile updated successfully",

            user
        })

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message
        })
    }
}

// ======================================================
// GET ALL USERS
// ADMIN ONLY
// ======================================================

export const getAllUsers = async (req, res) => {

    try {

        const users =
            await User.find()
                .sort({
                    createdAt: -1
                })

        res.status(200).json({

            success: true,

            totalUsers:
                users.length,

            users
        })

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message
        })
    }
}

// ======================================================
// DELETE USER
// ======================================================

export const deleteUser = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.params.id
            )

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"
            })
        }

        await user.deleteOne()

        res.status(200).json({

            success: true,

            message:
                "User deleted successfully"
        })

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message
        })
    }
}