import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ShopContext } from '../context/ShopContext'
import Title from './Title'

import {
    FaStar,
    FaHeart,
    FaShoppingCart
} from 'react-icons/fa'

import { IoEyeSharp } from 'react-icons/io5'
import { MdVerified } from 'react-icons/md'

const BestSeller = () => {

    const navigate = useNavigate()

    const {
        products,
        currency,
        addToCart
    } = useContext(ShopContext)

    const [bestseller, setBestSeller] = useState([])
    const [wishlist, setWishlist] = useState([])

    // =====================================
    // GET BEST SELLER PRODUCTS
    // =====================================

    useEffect(() => {

        const bestProduct = products.filter(
            (item) => item.bestseller
        )

        setBestSeller(bestProduct.slice(0, 10))

    }, [products])

    // =====================================
    // LOAD WISHLIST
    // =====================================

    useEffect(() => {

        const savedWishlist =
            JSON.parse(localStorage.getItem('wishlist')) || []

        setWishlist(savedWishlist)

    }, [])

    // =====================================
    // TOGGLE WISHLIST
    // =====================================

    const toggleWishlist = (product) => {

        const alreadyExists = wishlist.find(
            item => item._id === product._id
        )

        let updatedWishlist = []

        if (alreadyExists) {

            updatedWishlist = wishlist.filter(
                item => item._id !== product._id
            )

        } else {

            updatedWishlist = [...wishlist, product]

        }

        setWishlist(updatedWishlist)

        localStorage.setItem(
            'wishlist',
            JSON.stringify(updatedWishlist)
        )

        // NAVBAR UPDATE EVENT
        window.dispatchEvent(new Event('wishlistUpdated'))
    }

    return (

        <section className='py-24 bg-[#f8f8f8]'>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                {/* ===================================== */}
                {/* TOP HEADER */}
                {/* ===================================== */}

                <div className='text-center mb-16'>

                    <div className='inline-flex items-center gap-3 bg-white border border-gray-200 px-5 py-2 rounded-full mb-6 shadow-sm'>

                        <span className='w-2 h-2 rounded-full bg-black'></span>

                        <p className='text-sm font-bold uppercase tracking-[3px] text-gray-700'>
                            Premium Best Sellers
                        </p>

                    </div>

                    <div className='text-4xl sm:text-5xl font-black text-gray-900'>

                        <Title text1={'BEST'} text2={'SELLERS'} />

                    </div>

                    <p className='max-w-2xl mx-auto mt-6 text-gray-500 leading-8 text-sm sm:text-base'>

                        Discover premium fashion collections designed with
                        modern aesthetics, luxury comfort and elegant styling.

                    </p>

                </div>

                {/* ===================================== */}
                {/* PRODUCTS GRID */}
                {/* ===================================== */}

                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>

                    {

                        bestseller.map((item, index) => (

                            <div
                                key={index}
                                className='group bg-white rounded-[30px] overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] transition-all duration-500 relative'
                            >

                                {/* ================================= */}
                                {/* IMAGE SECTION */}
                                {/* ================================= */}

                                <div
                                    onClick={() => navigate(`/product/${item._id}`)}
                                    className='relative overflow-hidden cursor-pointer bg-[#f5f5f5]'
                                >

                                    <img
                                        src={item.image[0]}
                                        alt=""
                                        className='w-full h-[320px] object-cover group-hover:scale-105 transition duration-700'
                                    />

                                    {/* DISCOUNT */}

                                    <div className='absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg'>

                                        NEW

                                    </div>

                                    {/* WISHLIST */}

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation()

                                            toggleWishlist(item)

                                        }}
                                        className={`absolute top-4 right-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition duration-300

                                        ${
                                            wishlist.find(
                                                w => w._id === item._id
                                            )
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white hover:bg-black hover:text-white'
                                        }`}
                                    >

                                        <FaHeart className='text-sm' />

                                    </button>

                                    {/* QUICK VIEW */}

                                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-500'>

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                navigate(`/product/${item._id}`)

                                            }}
                                            className='bg-black text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition'
                                        >

                                            <IoEyeSharp />

                                            Quick View

                                        </button>

                                    </div>

                                </div>

                                {/* ================================= */}
                                {/* DETAILS */}
                                {/* ================================= */}

                                <div className='p-5'>

                                    {/* VERIFIED */}

                                    <div className='flex items-center gap-2 text-green-600 text-xs font-semibold mb-3'>

                                        <MdVerified />

                                        Verified Product

                                    </div>

                                    {/* PRODUCT NAME */}

                                    <h3
                                        onClick={() => navigate(`/product/${item._id}`)}
                                        className='font-bold text-[17px] text-gray-800 line-clamp-1 cursor-pointer hover:text-black transition'
                                    >

                                        {item.name}

                                    </h3>

                                    {/* RATINGS */}

                                    <div className='flex items-center gap-2 mt-3'>

                                        <div className='flex items-center text-yellow-400 text-sm gap-[2px]'>

                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />

                                        </div>

                                        <span className='text-gray-500 text-sm'>
                                            4.9
                                        </span>

                                    </div>

                                    {/* DESCRIPTION */}

                                    <p className='text-gray-500 text-sm mt-3 leading-6 line-clamp-2'>

                                        Premium stylish collection with modern fit,
                                        elegant design and luxury comfort.

                                    </p>

                                    {/* PRICE */}

                                    <div className='flex items-center gap-3 mt-5'>

                                        <p className='text-2xl font-black text-black'>

                                            {currency}{item.price}

                                        </p>

                                        <p className='line-through text-gray-400 text-sm'>

                                            {currency}{item.price + 800}

                                        </p>

                                    </div>

                                    {/* STOCK */}

                                    <div className='flex items-center justify-between mt-4'>

                                        <p className='text-sm text-green-600 font-medium'>
                                            In Stock
                                        </p>

                                        <p className='text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600'>
                                            Bestseller
                                        </p>

                                    </div>

                                    {/* BUTTONS */}

                                    <div className='grid grid-cols-2 gap-3 mt-5'>

                                        {/* ADD TO CART */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                addToCart(
                                                    item._id,
                                                    item.sizes?.[0] || 'M'
                                                )

                                            }}
                                            className='bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2'
                                        >

                                            <FaShoppingCart />

                                            Cart

                                        </button>

                                        {/* BUY NOW */}

                                        <button
                                            onClick={() => navigate(`/product/${item._id}`)}
                                            className='border border-gray-300 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition'
                                        >

                                            Buy Now

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

                {/* ===================================== */}
                {/* EXPLORE BUTTON */}
                {/* ===================================== */}

                <div className='flex justify-center mt-16'>

                    <button
                        onClick={() => navigate('/collection')}
                        className='bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-gray-800 hover:scale-105 transition duration-300'
                    >

                        Explore All Products

                    </button>

                </div>

            </div>

        </section>

    )

}

export default BestSeller