
// ======================================================
// FILE: models/userModel.js
// ADVANCED USER MODEL
// REAL WORLD ECOMMERCE BACKEND
// AMAZON / FLIPKART STYLE
// ======================================================

import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ======================================================
// USER SCHEMA
// ======================================================

const userSchema = new mongoose.Schema(

    {
        // ======================================================
        // FULL NAME
        // ======================================================

        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 3,
            maxlength: 50
        },

        // ======================================================
        // EMAIL
        // ======================================================

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },

        // ======================================================
        // PASSWORD
        // ======================================================

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false
        },

        // ======================================================
        // PROFILE IMAGE
        // ======================================================

        avatar: {
            type: String,

            default:
                "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png"
        },

        // ======================================================
        // PHONE NUMBER
        // ======================================================

        phone: {
            type: String,
            default: ""
        },

        // ======================================================
        // USER ROLE
        // ======================================================

        role: {
            type: String,

            enum: [
                "user",
                "admin"
            ],

            default: "user"
        },

        // ======================================================
        // ACCOUNT STATUS
        // ======================================================

        isBlocked: {
            type: Boolean,
            default: false
        },

        // ======================================================
        // EMAIL VERIFIED
        // ======================================================

        isVerified: {
            type: Boolean,
            default: false
        },

        // ======================================================
        // CART DATA
        // ======================================================

        cartData: {
            type: Object,
            default: {}
        },

        // ======================================================
        // SHIPPING ADDRESS
        // ======================================================

        address: [

            {
                fullName: {
                    type: String
                },

                phone: {
                    type: String
                },

                pincode: {
                    type: String
                },

                city: {
                    type: String
                },

                state: {
                    type: String
                },

                country: {
                    type: String
                },

                area: {
                    type: String
                },

                addressType: {
                    type: String,
                    default: "Home"
                }
            }
        ],

        // ======================================================
        // WISHLIST
        // ======================================================

        wishlist: [

            {
                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Product"
            }
        ],

        // ======================================================
        // LAST LOGIN
        // ======================================================

        lastLogin: {
            type: Date
        }

    },

    {
        timestamps: true
    }
)

// ======================================================
// HASH PASSWORD BEFORE SAVE
// ======================================================

userSchema.pre(

    "save",

    async function (next) {

        // ONLY HASH WHEN PASSWORD MODIFIED

        if (!this.isModified("password")) {

            return next()
        }

        // HASH PASSWORD

        this.password =
            await bcrypt.hash(
                this.password,
                10
            )

        next()
    }
)

// ======================================================
// COMPARE PASSWORD
// ======================================================

userSchema.methods.comparePassword =
    async function (
        enteredPassword
    ) {

        return await bcrypt.compare(
            enteredPassword,
            this.password
        )
    }

// ======================================================
// GENERATE JWT TOKEN
// ======================================================

userSchema.methods.generateToken =
    function () {

        return jwt.sign(

            {
                id: this._id,
                role: this.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }
        )
    }

// ======================================================
// REMOVE PASSWORD FROM RESPONSE
// ======================================================

userSchema.methods.toJSON =
    function () {

        const userObject =
            this.toObject()

        delete userObject.password

        return userObject
    }

// ======================================================
// SEARCH INDEX
// ======================================================

userSchema.index({

    name: "text",

    email: "text"
})

// ======================================================
// USER MODEL
// ======================================================

const userModel =

    mongoose.models.User ||

    mongoose.model(
        "User",
        userSchema
    )

// ======================================================
// EXPORT
// ======================================================

export default userModel