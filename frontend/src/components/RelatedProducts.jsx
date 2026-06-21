import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    FaHeart,
    FaRegHeart,
    FaShoppingCart,
    FaStar,
    FaStarHalfAlt,
    FaBolt
} from 'react-icons/fa'

import { IoEyeOutline } from 'react-icons/io5'

import { ShopContext } from '../context/ShopContext'

const RelatedProducts = ({
    category,
    subCategory,
    currentProductId
}) => {

    const {
        products,
        currency,
        addToCart
    } = useContext(ShopContext)

    const navigate = useNavigate()

    // =========================================
    // STATES
    // =========================================

    const [related, setRelated] = useState([])

    // =========================================
    // GET RELATED PRODUCTS
    // =========================================

    useEffect(() => {

        if (products.length > 0) {

            let relatedProducts = products.filter(
                (item) =>
                    item.category === category &&
                    item.subCategory === subCategory &&
                    item._id !== currentProductId
            )

            // Shuffle for better ecommerce feel
            relatedProducts = relatedProducts.sort(
                () => 0.5 - Math.random()
            )

            setRelated(relatedProducts.slice(0, 4))

        }

    }, [
        products,
        category,
        subCategory,
        currentProductId
    ])

    // =========================================
    // WISHLIST FUNCTION
    // =========================================

    const toggleWishlist = (
        e,
        product
    ) => {

        e.stopPropagation()

        let wishlist =
            JSON.parse(
                localStorage.getItem('wishlist')
            ) || []

        const exists =
            wishlist.find(
                item => item.id === product._id
            )

        if (exists) {

            wishlist =
                wishlist.filter(
                    item => item.id !== product._id
                )

        } else {

            wishlist.push({
                id: product._id,
                image: product.image?.[0],
                name: product.name,
                price: product.price
            })

        }

        localStorage.setItem(
            'wishlist',
            JSON.stringify(wishlist)
        )

        window.dispatchEvent(
            new Event('storage')
        )

    }

    // =========================================
    // CHECK WISHLIST
    // =========================================

    const isWishlisted = (id) => {

        const wishlist =
            JSON.parse(
                localStorage.getItem('wishlist')
            ) || []

        return wishlist.some(
            item => item.id === id
        )

    }

    return (

        <div className='mt-24'>

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className='flex items-center justify-between mb-10 flex-wrap gap-4'>

                <div>

                    <p className='text-sm uppercase tracking-[4px] text-gray-400 font-semibold mb-3'>

                        You May Also Like

                    </p>

                    <h2 className='text-3xl sm:text-4xl font-black text-gray-900'>

                        Related Products

                    </h2>

                </div>

                <button
                    onClick={() => navigate('/collection')}
                    className='px-6 py-3 rounded-2xl border border-gray-300 font-semibold hover:bg-black hover:text-white transition duration-300'
                >

                    View All

                </button>

            </div>

            {/* ========================================= */}
            {/* PRODUCTS GRID */}
            {/* ========================================= */}

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7'>

                {

                    related.map((item, index) => {

                        const productImage =
                            item.image?.[0]

                        return (

                            <div
                                key={index}
                                onClick={() =>
                                    navigate(`/product/${item._id}`)
                                }
                                className='group relative bg-white rounded-[28px] overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 cursor-pointer'
                            >

                                {/* ========================================= */}
                                {/* BADGES */}
                                {/* ========================================= */}

                                <div className='absolute top-4 left-4 z-20 flex flex-col gap-2'>

                                    <span className='bg-black text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg'>

                                        Bestseller

                                    </span>

                                    <span className='bg-red-500 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-lg'>

                                        25% OFF

                                    </span>

                                </div>

                                {/* ========================================= */}
                                {/* WISHLIST */}
                                {/* ========================================= */}

                                <button
                                    onClick={(e) =>
                                        toggleWishlist(e, item)
                                    }
                                    className='absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl shadow-lg flex items-center justify-center hover:scale-110 transition duration-300'
                                >

                                    {
                                        isWishlisted(item._id) ? (

                                            <FaHeart className='text-red-500 text-sm' />

                                        ) : (

                                            <FaRegHeart className='text-gray-700 text-sm' />

                                        )
                                    }

                                </button>

                                {/* ========================================= */}
                                {/* IMAGE */}
                                {/* ========================================= */}

                                <div className='relative overflow-hidden bg-[#f8f8f8]'>

                                    <img
                                        src={productImage}
                                        alt={item.name}
                                        className='w-full h-[220px] sm:h-[280px] object-cover group-hover:scale-110 transition duration-700'
                                    />

                                    {/* OVERLAY */}

                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500'></div>

                                    {/* QUICK ACTIONS */}

                                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-3'>

                                        {/* QUICK VIEW */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                navigate(`/product/${item._id}`)

                                            }}
                                            className='w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition duration-300'
                                        >

                                            <IoEyeOutline className='text-lg' />

                                        </button>

                                        {/* ADD TO CART */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                addToCart(
                                                    item._id,
                                                    item.sizes?.[0] || 'M'
                                                )

                                            }}
                                            className='h-11 px-5 rounded-full bg-black text-white font-semibold shadow-xl flex items-center gap-2 hover:bg-gray-800 transition duration-300 text-sm'
                                        >

                                            <FaShoppingCart />

                                            Add

                                        </button>

                                    </div>

                                </div>

                                {/* ========================================= */}
                                {/* DETAILS */}
                                {/* ========================================= */}

                                <div className='p-5'>

                                    {/* BRAND */}

                                    <div className='flex items-center justify-between gap-3 mb-3'>

                                        <p className='text-[11px] uppercase tracking-[2px] text-gray-400 font-semibold truncate'>

                                            Stylentra Fashion

                                        </p>

                                        <div className='flex items-center gap-1 text-green-600 text-xs font-semibold shrink-0'>

                                            <FaBolt className='text-[10px]' />

                                            Trending

                                        </div>

                                    </div>

                                    {/* NAME */}

                                    <h3 className='text-[15px] sm:text-[16px] font-bold text-gray-900 leading-6 line-clamp-2 min-h-[48px] group-hover:text-black transition'>

                                        {item.name}

                                    </h3>

                                    {/* RATING */}

                                    <div className='flex items-center flex-wrap gap-2 mt-3'>

                                        <div className='flex items-center gap-[2px] text-yellow-400 text-sm shrink-0'>

                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStarHalfAlt />

                                        </div>

                                        <p className='text-xs sm:text-sm text-gray-500 whitespace-nowrap'>

                                            4.8 • 1.9k reviews

                                        </p>

                                    </div>

                                    {/* DESCRIPTION */}

                                    <p className='text-sm text-gray-500 leading-6 mt-3 line-clamp-2'>

                                        Premium fashion collection with modern style,
                                        elegant comfort and luxury materials.

                                    </p>

                                    {/* PRICE */}

                                    <div className='flex items-end flex-wrap gap-3 mt-5'>

                                        <h2 className='text-2xl font-black text-black leading-none'>

                                            {currency}{item.price}

                                        </h2>

                                        <p className='text-sm text-gray-400 line-through'>

                                            {currency}{item.price + 1200}

                                        </p>

                                        <span className='text-sm font-bold text-green-600'>

                                            Save 25%

                                        </span>

                                    </div>

                                    {/* STOCK */}

                                    <div className='flex items-center justify-between flex-wrap gap-3 mt-5'>

                                        <div className='flex items-center gap-2'>

                                            <span className='w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse'></span>

                                            <p className='text-sm font-medium text-green-600'>

                                                In Stock

                                            </p>

                                        </div>

                                        <p className='text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium'>

                                            Free Shipping

                                        </p>

                                    </div>

                                    {/* BUTTONS */}

                                    <div className='grid grid-cols-2 gap-3 mt-6'>

                                        {/* CART */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                addToCart(
                                                    item._id,
                                                    item.sizes?.[0] || 'M'
                                                )

                                            }}
                                            className='h-12 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition duration-300 text-sm'
                                        >

                                            <FaShoppingCart />

                                            Cart

                                        </button>

                                        {/* BUY NOW */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                navigate(`/product/${item._id}`)

                                            }}
                                            className='h-12 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-100 transition duration-300 text-sm'
                                        >

                                            Buy Now

                                        </button>

                                    </div>

                                </div>

                            </div>

                        )

                    })

                }

            </div>

        </div>
    )
}

export default RelatedProducts