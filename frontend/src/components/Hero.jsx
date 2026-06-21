import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

import {
  FaArrowRight,
  FaPlay,
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle
} from 'react-icons/fa'

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Hero = () => {

  const navigate = useNavigate()

  const {
    products,
    currency
  } = useContext(ShopContext)

  // =========================================
  // STATES
  // =========================================

  const [featuredProduct, setFeaturedProduct] = useState(null)

  // =========================================
  // FEATURED PRODUCT
  // =========================================

  useEffect(() => {

    if (products.length > 0) {

      const best =
        products.find(item => item.bestseller)

      setFeaturedProduct(best || products[0])
    }

  }, [products])

  // =========================================
  // WISHLIST
  // =========================================

  const addToWishlist = () => {

    if (!featuredProduct) return

    const wishlist =
      JSON.parse(localStorage.getItem('wishlist')) || []

    const alreadyExists =
      wishlist.find(
        item => item._id === featuredProduct._id
      )

    if (alreadyExists) return

    const updatedWishlist = [
      ...wishlist,
      featuredProduct
    ]

    localStorage.setItem(
      'wishlist',
      JSON.stringify(updatedWishlist)
    )

    window.dispatchEvent(
      new Event('wishlistUpdated')
    )
  }

  return (

    <section className='relative overflow-hidden bg-[#f6f7fb] rounded-[25px] lg:rounded-[45px] border border-gray-200 shadow-[0_20px_80px_rgba(0,0,0,0.08)]'>

      {/* ========================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ========================================= */}

      <div className='absolute inset-0 overflow-hidden'>

        <div className='absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-pink-200 rounded-full blur-3xl opacity-40'></div>

        <div className='absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-blue-200 rounded-full blur-3xl opacity-40'></div>

      </div>

      {/* ========================================= */}
      {/* TOP BAR */}
      {/* ========================================= */}

      <div className='relative z-20 bg-black text-white py-3 px-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium'>

        <p>
          Premium Fashion Collection
        </p>

        <p>
          Modern Ecommerce Experience
        </p>

        <p>
          Trusted By Thousands
        </p>

      </div>

      {/* ========================================= */}
      {/* MAIN HERO */}
      {/* ========================================= */}

      <div className='relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center'>

        {/* ========================================= */}
        {/* LEFT CONTENT */}
        {/* ========================================= */}

        <div className='px-5 sm:px-10 lg:px-16 py-14 lg:py-24'>

          {/* BADGE */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='inline-flex items-center gap-3 bg-white border border-gray-200 shadow-lg px-5 py-3 rounded-full mb-7'
          >

            <span className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></span>

            <p className='text-xs sm:text-sm font-semibold text-gray-700 tracking-wide'>

              NEW ARRIVAL 2026

            </p>

          </motion.div>

          {/* TITLE */}

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] text-gray-900'
          >

            Discover

            <span className='block mt-2 bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent'>

              Premium Fashion

            </span>

          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mt-7 text-gray-600 text-base sm:text-lg leading-8 max-w-2xl'
          >

            Experience luxury fashion shopping with modern collections,
            premium quality products and beautiful ecommerce design
            inspired by real world brands.

          </motion.p>

          {/* FEATURES */}

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10'>

            <div className='bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-xl transition duration-300'>

              <div className='w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl mb-4'>

                <FaShoppingBag />

              </div>

              <h3 className='font-bold text-gray-900'>
                Premium Styles
              </h3>

              <p className='text-sm text-gray-500 mt-2 leading-6'>
                Modern luxury fashion collections.
              </p>

            </div>

            <div className='bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-xl transition duration-300'>

              <div className='w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl mb-4'>

                <FaShieldAlt />

              </div>

              <h3 className='font-bold text-gray-900'>
                Secure Payment
              </h3>

              <p className='text-sm text-gray-500 mt-2 leading-6'>
                Trusted checkout experience.
              </p>

            </div>

            <div className='bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-xl transition duration-300'>

              <div className='w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl mb-4'>

                <FaHeadset />

              </div>

              <h3 className='font-bold text-gray-900'>
                Support Team
              </h3>

              <p className='text-sm text-gray-500 mt-2 leading-6'>
                Smooth customer support access.
              </p>

            </div>

          </div>

          {/* BUTTONS */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='flex flex-wrap gap-4 mt-12'
          >

            <button
              onClick={() => navigate('/collection')}
              className='group bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition duration-300 flex items-center gap-3'
            >

              Shop Collection

              <FaArrowRight className='group-hover:translate-x-1 transition duration-300' />

            </button>

            <button
              onClick={() => navigate('/about')}
              className='bg-white border border-gray-300 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition duration-300 flex items-center gap-3'
            >

              <FaPlay />

              Explore Brand

            </button>

          </motion.div>

          {/* TRUSTED */}

          <div className='flex items-center gap-4 mt-12 flex-wrap'>

            <div className='flex -space-x-3'>

              <img
                src='https://randomuser.me/api/portraits/women/44.jpg'
                alt=""
                className='w-12 h-12 rounded-full border-4 border-white object-cover'
              />

              <img
                src='https://randomuser.me/api/portraits/men/32.jpg'
                alt=""
                className='w-12 h-12 rounded-full border-4 border-white object-cover'
              />

              <img
                src='https://randomuser.me/api/portraits/women/68.jpg'
                alt=""
                className='w-12 h-12 rounded-full border-4 border-white object-cover'
              />

            </div>

            <div>

              <h3 className='font-bold text-gray-900'>
                Trusted by 10K+ Users
              </h3>

              <p className='text-sm text-gray-500 mt-1'>
                Real premium ecommerce experience.
              </p>

            </div>

          </div>

          {/* STATS */}

          <div className='grid grid-cols-3 gap-4 mt-12'>

            <div className='bg-white rounded-3xl border border-gray-200 p-5 text-center shadow-sm'>

              <h2 className='text-3xl sm:text-4xl font-black text-black'>

                10K+

              </h2>

              <p className='text-xs sm:text-sm text-gray-500 mt-2'>

                Customers

              </p>

            </div>

            <div className='bg-white rounded-3xl border border-gray-200 p-5 text-center shadow-sm'>

              <h2 className='text-3xl sm:text-4xl font-black text-black'>

                5K+

              </h2>

              <p className='text-xs sm:text-sm text-gray-500 mt-2'>

                Products

              </p>

            </div>

            <div className='bg-white rounded-3xl border border-gray-200 p-5 text-center shadow-sm'>

              <h2 className='text-3xl sm:text-4xl font-black text-black'>

                4.9★

              </h2>

              <p className='text-xs sm:text-sm text-gray-500 mt-2'>

                Ratings

              </p>

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* RIGHT SIDE */}
        {/* ========================================= */}

        <div className='relative w-full h-full p-4 sm:p-8 lg:p-10'>

          {/* MAIN IMAGE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className='relative'
          >

            <img
              src={assets.hero_img}
              alt=""
              className='w-full h-[500px] sm:h-[650px] lg:h-[850px] object-cover rounded-[30px] lg:rounded-[40px] shadow-2xl'
            />

            {/* DARK OVERLAY */}

            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-[30px] lg:rounded-[40px]'></div>

            {/* OFFER CARD */}

            <div className='absolute top-4 right-4 sm:top-6 sm:right-6 bg-white rounded-[25px] p-4 sm:p-6 shadow-2xl w-[180px] sm:w-[240px]'>

              <p className='text-[10px] sm:text-xs uppercase tracking-[3px] text-gray-500 font-semibold'>

                Limited Offer

              </p>

              <h2 className='text-4xl sm:text-5xl font-black text-black mt-2'>

                70%

              </h2>

              <p className='text-gray-500 mt-2 text-xs sm:text-sm leading-6'>

                Discounts on premium collections.

              </p>

              <button
                onClick={() => navigate('/collection')}
                className='mt-4 w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition'
              >

                Shop Deals

              </button>

            </div>

            {/* MOBILE SAFE PRODUCT CARD */}

            {
              featuredProduct && (

                <div className='relative sm:absolute sm:bottom-6 sm:left-6 sm:right-6 mt-5 sm:mt-0 bg-white rounded-[28px] sm:rounded-[35px] p-4 sm:p-5 shadow-2xl border border-gray-200 overflow-hidden'>

                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>

                    {/* IMAGE */}

                    <img
                      src={featuredProduct.image[0]}
                      alt=""
                      className='w-full sm:w-28 h-[220px] sm:h-28 rounded-3xl object-cover border border-gray-200'
                    />

                    {/* DETAILS */}

                    <div className='flex-1 w-full'>

                      <div className='flex items-start justify-between gap-3'>

                        <div>

                          <h3 className='font-black text-xl sm:text-2xl text-gray-900 line-clamp-1'>

                            {featuredProduct.name}

                          </h3>

                          <div className='flex items-center gap-2 mt-2 flex-wrap'>

                            <div className='flex items-center gap-1 text-yellow-500 text-sm'>

                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />

                            </div>

                            <span className='text-sm text-gray-500'>
                              4.9 Ratings
                            </span>

                          </div>

                        </div>

                        <button
                          onClick={addToWishlist}
                          className='min-w-[45px] h-[45px] rounded-full bg-gray-100 hover:bg-black hover:text-white transition duration-300 flex items-center justify-center'
                        >

                          <FaHeart />

                        </button>

                      </div>

                      {/* VERIFIED */}

                      <div className='flex items-center gap-2 mt-3 text-green-600 text-sm font-medium'>

                        <FaCheckCircle />

                        Verified Premium Product

                      </div>

                      {/* PRICE */}

                      <div className='flex items-center justify-between mt-5 flex-wrap gap-4'>

                        <div>

                          <p className='text-2xl sm:text-3xl font-black text-black'>

                            {currency}{featuredProduct.price}

                          </p>

                          <p className='text-sm text-green-600 mt-1'>
                            In Stock
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            navigate(`/product/${featuredProduct._id}`)
                          }
                          className='bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition duration-300 w-full sm:w-auto'
                        >

                          View Product

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )
            }

          </motion.div>

        </div>

      </div>

    </section>

  )
}

export default Hero

