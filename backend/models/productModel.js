
// ======================================================

import mongoose from "mongoose"

// ======================================================
// PRODUCT SCHEMA
// ======================================================

const productSchema = new mongoose.Schema(

    {
        // ======================================================
        // BASIC INFO
        // ======================================================

        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: 3,
            maxlength: 200
        },

        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            minlength: 20
        },

        brand: {
            type: String,
            default: "Stylentra",
            trim: true
        },

        // ======================================================
        // CATEGORY
        // ======================================================

        category: {
            type: String,
            required: true,

            enum: [
                "Men",
                "Women",
                "Kids",
                "Electronics",
                "Accessories",
                "Footwear",
                "Beauty",
                "Winterwear"
            ]
        },

        subCategory: {
            type: String,
            required: true,
            trim: true
        },

        // ======================================================
        // PRICING
        // ======================================================

        price: {
            type: Number,
            required: true,
            min: 0
        },

        oldPrice: {
            type: Number,
            default: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        // ======================================================
        // STOCK
        // ======================================================

        stock: {
            type: Number,
            required: true,
            default: 1,
            min: 0
        },

        inStock: {
            type: Boolean,
            default: true
        },

        // ======================================================
        // PRODUCT IMAGES
        // ======================================================

        image: [

            {
                type: String,
                required: true
            }
        ],

        // ======================================================
        // SIZE OPTIONS
        // ======================================================

        sizes: [

            {
                type: String,

                enum: [
                    "XS",
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ]
            }
        ],

        // ======================================================
        // COLORS
        // ======================================================

        colors: [

            {
                type: String
            }
        ],

        // ======================================================
        // RATINGS & REVIEWS
        // ======================================================

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        numReviews: {
            type: Number,
            default: 0
        },

        // ======================================================
        // PRODUCT TAGS
        // ======================================================

        tags: [

            {
                type: String
            }
        ],

        // ======================================================
        // FEATURED PRODUCTS
        // ======================================================

        bestseller: {
            type: Boolean,
            default: false
        },

        featured: {
            type: Boolean,
            default: false
        },

        latest: {
            type: Boolean,
            default: true
        },

        // ======================================================
        // SHIPPING
        // ======================================================

        freeDelivery: {
            type: Boolean,
            default: false
        },

        deliveryTime: {
            type: String,
            default: "3-5 Days"
        },

        // ======================================================
        // SEO FRIENDLY SLUG
        // ======================================================

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        }

    },

    {
        timestamps: true
    }
)

// ======================================================
// AUTO UPDATE STOCK STATUS
// ======================================================

productSchema.pre(

    "save",

    function (next) {

        // AUTO STOCK STATUS

        this.inStock =
            this.stock > 0

        // AUTO DISCOUNT

        if (
            this.oldPrice > this.price
        ) {

            this.discount =
                Math.round(

                    (
                        (
                            this.oldPrice -
                            this.price
                        )
                        /
                        this.oldPrice
                    ) * 100
                )
        }

        next()
    }
)

// ======================================================
// TEXT SEARCH INDEX
// ======================================================

productSchema.index({

    name: "text",

    category: "text",

    brand: "text",

    description: "text"
})

// ======================================================
// VIRTUAL FIELD
// ======================================================

productSchema.virtual(
    "finalPrice"
).get(function () {

    return this.price
})

// ======================================================
// MODEL
// ======================================================

const productModel =

    mongoose.models.Product ||

    mongoose.model(
        "Product",
        productSchema
    )

// ======================================================
// EXPORT
// ======================================================

export default productModel