import React, { useEffect, useState } from 'react'

import {
    FaEnvelope,
    FaCheckCircle,
    FaGift,
    FaArrowRight
} from 'react-icons/fa'

import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const NewLetterBox = () => {

    // =========================================
    // STATES
    // =========================================

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [subscribed, setSubscribed] = useState(false)

    // =========================================
    // CHECK PREVIOUS SUBSCRIPTION
    // =========================================

    useEffect(() => {

        const subscribedEmail =
            localStorage.getItem('newsletterSubscribed')

        if (subscribedEmail) {

            setSubscribed(true)
            setEmail(subscribedEmail)

        }

    }, [])

    // =========================================
    // EMAIL VALIDATION
    // =========================================

    const validateEmail = (email) => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    }

    // =========================================
    // SUBMIT HANDLER
    // =========================================

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        if (!email) {

            toast.error('Please enter your email address')
            return

        }

        if (!validateEmail(email)) {

            toast.error('Please enter a valid email')
            return

        }

        setLoading(true)

        // =========================================
        // FAKE API DELAY
        // =========================================

        setTimeout(() => {

            localStorage.setItem(
                'newsletterSubscribed',
                email
            )

            setSubscribed(true)

            setLoading(false)

            toast.success(
                '🎉 Successfully subscribed to Stylentra'
            )

        }, 1800)

    }

    return (

        <section className='relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[#f7f5f2]'>

            {/* ========================================= */}
            {/* BACKGROUND DESIGN */}
            {/* ========================================= */}

            <div className='absolute inset-0 overflow-hidden'>

                <div className='absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#ece5dc] blur-[120px] opacity-80'></div>

                <div className='absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#e8e0d5] blur-[120px] opacity-80'></div>

            </div>

            {/* ========================================= */}
            {/* MAIN CONTAINER */}
            {/* ========================================= */}

            <div className='relative z-10 max-w-6xl mx-auto'>

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 60
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.7
                    }}
                    className='relative bg-white border border-gray-200 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden'
                >

                    {/* ========================================= */}
                    {/* INNER DESIGN */}
                    {/* ========================================= */}

                    <div className='absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#f6f1ea] blur-[80px]'></div>

                    {/* ========================================= */}
                    {/* CONTENT */}
                    {/* ========================================= */}

                    <div className='relative z-10 px-6 sm:px-10 lg:px-20 py-16 lg:py-20 text-center'>

                        {/* TOP ICON */}

                        <div className='w-20 h-20 mx-auto rounded-full bg-black text-white flex items-center justify-center shadow-xl mb-8'>

                            {
                                subscribed
                                    ? (
                                        <FaCheckCircle className='text-3xl' />
                                    )
                                    : (
                                        <FaEnvelope className='text-3xl' />
                                    )
                            }

                        </div>

                        {/* TAG */}

                        <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-[#fafafa] shadow-sm mb-6'>

                            <FaGift className='text-sm text-black' />

                            <span className='text-xs sm:text-sm tracking-[2px] font-semibold text-gray-700'>

                                EXCLUSIVE MEMBER BENEFITS

                            </span>

                        </div>

                        {/* TITLE */}

                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight max-w-4xl mx-auto'>

                            {
                                subscribed
                                    ? 'You Are Successfully Subscribed'
                                    : 'Join The Stylentra Fashion Community'
                            }

                        </h2>

                        {/* DESCRIPTION */}

                        <p className='mt-6 max-w-2xl mx-auto text-gray-600 leading-8 text-sm sm:text-base'>

                            {
                                subscribed
                                    ? 'You will now receive exclusive fashion updates, premium collection launches and special member-only offers directly in your inbox.'
                                    : 'Get early access to premium collections, exclusive offers, limited fashion drops and modern shopping updates from Stylentra.'
                            }

                        </p>

                        {/* ========================================= */}
                        {/* FORM */}
                        {/* ========================================= */}

                        {
                            !subscribed && (

                                <form
                                    onSubmit={onSubmitHandler}
                                    className='mt-12 max-w-3xl mx-auto'
                                >

                                    <div className='flex flex-col sm:flex-row items-center gap-4 bg-[#fafafa] border border-gray-200 rounded-[24px] p-3 shadow-sm'>

                                        {/* INPUT */}

                                        <div className='flex items-center gap-4 flex-1 w-full px-3'>

                                            <FaEnvelope className='text-gray-400 text-lg shrink-0' />

                                            <input
                                                type='email'
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder='Enter your email address'
                                                className='w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 py-4 text-sm sm:text-base'
                                            />

                                        </div>

                                        {/* BUTTON */}

                                        <button
                                            type='submit'
                                            disabled={loading}
                                            className='w-full sm:w-auto min-w-[190px] h-[58px] rounded-[18px] bg-black text-white font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition duration-300 disabled:opacity-70'
                                        >

                                            {
                                                loading
                                                    ? (
                                                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                                    )
                                                    : (
                                                        <>
                                                            Subscribe Now

                                                            <FaArrowRight className='text-sm' />
                                                        </>
                                                    )
                                            }

                                        </button>

                                    </div>

                                </form>

                            )
                        }

                        {/* ========================================= */}
                        {/* TRUST TEXT */}
                        {/* ========================================= */}

                        <div className='flex flex-wrap justify-center items-center gap-6 mt-10 text-xs sm:text-sm text-gray-500'>

                            <span>
                                ✓ Premium Fashion Alerts
                            </span>

                            <span>
                                ✓ Exclusive Member Offers
                            </span>

                            <span>
                                ✓ No Spam Emails
                            </span>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>

    )
}

export default NewLetterBox