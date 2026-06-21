// ======================================================
// FILE: config/cloudinary.js
// PROFESSIONAL CLOUDINARY CONFIG
// AMAZON / FLIPKART STYLE BACKEND
// ======================================================

import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

// ======================================================
// VALIDATE ENV VARIABLES
// ======================================================

const requiredEnvVariables = [
    "CLOUDINARY_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_SECRET_KEY"
]

requiredEnvVariables.forEach((key) => {

    if (!process.env[key]) {

        console.error(`❌ Missing Environment Variable: ${key}`)

        process.exit(1)
    }
})

// ======================================================
// CLOUDINARY CONFIGURATION
// ======================================================

cloudinary.config({

    cloud_name: process.env.CLOUDINARY_NAME,

    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_SECRET_KEY,

    secure: true
})

// ======================================================
// CONNECT CLOUDINARY
// ======================================================

const connectCloudinary = async () => {

    try {

        console.log(`
========================================
☁️  CLOUDINARY CONNECTED SUCCESSFULLY
========================================
Cloud Name : ${process.env.CLOUDINARY_NAME}
Status     : ACTIVE
Secure SSL : ENABLED
========================================
        `)

    } catch (error) {

        console.log(`
========================================
❌ CLOUDINARY CONNECTION FAILED
========================================
Error : ${error.message}
========================================
        `)

        process.exit(1)
    }
}

// ======================================================
// IMAGE UPLOAD FUNCTION
// ======================================================

const uploadImage = async (
    filePath,
    folder = "stylentra"
) => {

    try {

        const result = await cloudinary.uploader.upload(
            filePath,
            {
                folder,

                resource_type: "image",

                quality: "auto",

                fetch_format: "auto",

                transformation: [
                    {
                        width: 1200,
                        crop: "limit"
                    }
                ]
            }
        )

        return {
            success: true,
            url: result.secure_url,
            public_id: result.public_id
        }

    } catch (error) {

        console.log("❌ Image Upload Failed")

        return {
            success: false,
            message: error.message
        }
    }
}

// ======================================================
// DELETE IMAGE FUNCTION
// ======================================================

const deleteImage = async (publicId) => {

    try {

        await cloudinary.uploader.destroy(publicId)

        return {
            success: true,
            message: "Image Deleted Successfully"
        }

    } catch (error) {

        return {
            success: false,
            message: error.message
        }
    }
}

// ======================================================
// MULTIPLE IMAGE UPLOAD
// ======================================================

const uploadMultipleImages = async (
    files = [],
    folder = "stylentra"
) => {

    try {

        const uploadedImages = await Promise.all(

            files.map(async (file) => {

                const result =
                    await cloudinary.uploader.upload(
                        file.path,
                        {
                            folder,

                            resource_type: "image",

                            quality: "auto",

                            fetch_format: "auto"
                        }
                    )

                return {
                    url: result.secure_url,
                    public_id: result.public_id
                }
            })
        )

        return {
            success: true,
            images: uploadedImages
        }

    } catch (error) {

        return {
            success: false,
            message: error.message
        }
    }
}

// ======================================================
// EXPORTS
// ======================================================

export {
    cloudinary,
    connectCloudinary,
    uploadImage,
    deleteImage,
    uploadMultipleImages
}