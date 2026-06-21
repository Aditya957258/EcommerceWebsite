import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaArrowRight
} from 'react-icons/fa'

import {
  MdVerified,
  MdLocalShipping,
  MdSupportAgent,
  MdEmail,
  MdPhone
} from 'react-icons/md'

import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Footer = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  // =========================================
  // NEWSLETTER
  // =========================================

  const handleSubscribe = (e) => {

    e.preventDefault()

    if (!email.includes('@')) {
      toast.error('Please enter valid email')
      return
    }

    toast.success('Subscribed Successfully')
    setEmail('')
  }

  // =========================================
  // SOCIAL LINKS
  // =========================================

  const socialLinks = {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com'
  }

  return (

    <footer className='bg-gradient-to-br from-[#fffdf7] via-[#f8f3e9] to-[#f3eadb] text-gray-800 mt-28 overflow-hidden relative border-t border-[#e7dcc8]'>

      {/* ========================================= */}
      {/* BACKGROUND EFFECT */}
      {/* ========================================= */}

      <div className='absolute top-0 left-0 w-72 h-72 bg-[#efe3cd] blur-[120px] rounded-full'></div>

      <div className='absolute bottom-0 right-0 w-72 h-72 bg-[#f5e8d7] blur-[120px] rounded-full'></div>

      {/* ========================================= */}
      {/* NEWSLETTER */}
      {/* ========================================= */}

      <div className='border-b border-[#e7dcc8] relative z-10'>

        <div className='max-w-7xl mx-auto px-6 sm:px-10 py-16'>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

            {/* LEFT */}

            <div>

              <p className='uppercase tracking-[5px] text-[#9f8660] text-sm font-semibold mb-4'>

                STYLENTRA COMMUNITY

              </p>

              <h2 className='text-4xl sm:text-5xl font-black leading-tight text-gray-900'>

                Upgrade Your
                <span className='bg-gradient-to-r from-[#b89d76] via-[#9d7d52] to-[#c8b08b] bg-clip-text text-transparent'>
                  {' '}Fashion Experience
                </span>

              </h2>

              <p className='text-gray-600 mt-6 leading-8 max-w-2xl text-sm sm:text-base'>

                Discover luxury fashion collections, exclusive member offers,
                flash sales, premium brands and next-generation shopping
                experiences crafted for modern lifestyles.

              </p>

            </div>

            {/* RIGHT */}

            <div className='bg-white/70 border border-[#e7dcc8] backdrop-blur-2xl rounded-[32px] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.08)]'>

              <form
                onSubmit={handleSubscribe}
                className='flex flex-col sm:flex-row gap-4'
              >

                <div className='relative flex-1'>

                  <MdEmail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl' />

                  <input
                    type="email"
                    placeholder='Enter your email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-[#e7dcc8] text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#b89d76] transition'
                  />

                </div>

                <button
                  type='submit'
                  className='h-14 px-8 rounded-2xl bg-gradient-to-r from-[#b89d76] to-[#d2b48c] text-white hover:scale-105 active:scale-95 transition duration-300 font-semibold shadow-lg flex items-center justify-center gap-3'
                >

                  Subscribe
                  <FaArrowRight />

                </button>

              </form>

              <p className='text-gray-500 text-sm mt-5 leading-6'>

                Get premium fashion updates, exclusive deals and flash sale notifications instantly.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* MAIN FOOTER */}
      {/* ========================================= */}

      <div className='max-w-7xl mx-auto px-6 sm:px-10 py-20 relative z-10'>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14'>

          {/* BRAND */}

          <div>

            <img
              src={assets.logo}
              alt="Stylentra Logo"
              className='w-52 mb-6'
            />

            <p className='text-gray-600 leading-8 text-sm'>

              Stylentra is a premium ecommerce fashion platform designed for
              seamless shopping experiences with luxury UI, secure checkout,
              fast delivery and modern collections for every style.

            </p>

            {/* SOCIALS */}

            <div className='flex items-center gap-4 mt-8'>

              <button
                onClick={() => window.open(socialLinks.instagram)}
                className='w-12 h-12 rounded-2xl bg-white border border-[#eadfcb] hover:bg-[#d9c1a3] hover:text-white transition-all duration-300 flex items-center justify-center hover:-translate-y-1'
              >
                <FaInstagram />
              </button>

              <button
                onClick={() => window.open(socialLinks.facebook)}
                className='w-12 h-12 rounded-2xl bg-white border border-[#eadfcb] hover:bg-[#d9c1a3] hover:text-white transition-all duration-300 flex items-center justify-center hover:-translate-y-1'
              >
                <FaFacebookF />
              </button>

              <button
                onClick={() => window.open(socialLinks.twitter)}
                className='w-12 h-12 rounded-2xl bg-white border border-[#eadfcb] hover:bg-[#d9c1a3] hover:text-white transition-all duration-300 flex items-center justify-center hover:-translate-y-1'
              >
                <FaTwitter />
              </button>

              <button
                onClick={() => window.open(socialLinks.youtube)}
                className='w-12 h-12 rounded-2xl bg-white border border-[#eadfcb] hover:bg-[#d9c1a3] hover:text-white transition-all duration-300 flex items-center justify-center hover:-translate-y-1'
              >
                <FaYoutube />
              </button>

            </div>

          </div>

          {/* COMPANY */}

          <div>

            <h3 className='text-2xl font-bold mb-7 text-gray-900'>
              Company
            </h3>

            <ul className='space-y-5 text-gray-600 text-sm'>

              <li
                onClick={() => navigate('/')}
                className='hover:text-[#9f8660] cursor-pointer transition duration-300'
              >
                Home
              </li>

              <li
                onClick={() => navigate('/collection')}
                className='hover:text-[#9f8660] cursor-pointer transition duration-300'
              >
                Collection
              </li>

              <li
                onClick={() => navigate('/about')}
                className='hover:text-[#9f8660] cursor-pointer transition duration-300'
              >
                About Us
              </li>

              <li
                onClick={() => navigate('/contact')}
                className='hover:text-[#9f8660] cursor-pointer transition duration-300'
              >
                Contact Us
              </li>

              <li className='hover:text-[#9f8660] cursor-pointer transition duration-300'>
                Privacy Policy
              </li>

              <li className='hover:text-[#9f8660] cursor-pointer transition duration-300'>
                Terms & Conditions
              </li>

            </ul>

          </div>

          {/* SERVICES */}

          <div>

            <h3 className='text-2xl font-bold mb-7 text-gray-900'>
              Services
            </h3>

            <div className='space-y-6 text-sm'>

              <div className='flex items-start gap-4'>

                <div className='w-12 h-12 rounded-2xl bg-white border border-[#eadfcb] flex items-center justify-center flex-shrink-0'>

                  <MdLocalShipping className='text-2xl text-[#9f8660]' />

                </div>

                <div>

                  <h4 className='font-semibold text-gray-900'>
                    Fast Delivery
                  </h4>

                  <p className='text-gray-600 mt-1 leading-6'>
                    Quick and secure doorstep delivery service.
                  </p>

                </div>

              </div>

              <div className='flex items-start gap-4'>

                <div className='w-12 h-12 rounded-2xl bg-white border border-[#eadfcb] flex items-center justify-center flex-shrink-0'>

                  <MdVerified className='text-2xl text-[#9f8660]' />

                </div>

                <div>

                  <h4 className='font-semibold text-gray-900'>
                    Secure Payments
                  </h4>

                  <p className='text-gray-600 mt-1 leading-6'>
                    100% safe and trusted payment systems.
                  </p>

                </div>

              </div>

              <div className='flex items-start gap-4'>

                <div className='w-12 h-12 rounded-2xl bg-white border border-[#eadfcb] flex items-center justify-center flex-shrink-0'>

                  <MdSupportAgent className='text-2xl text-[#9f8660]' />

                </div>

                <div>

                  <h4 className='font-semibold text-gray-900'>
                    24/7 Support
                  </h4>

                  <p className='text-gray-600 mt-1 leading-6'>
                    Dedicated customer support anytime.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className='text-2xl font-bold mb-7 text-gray-900'>
              Contact
            </h3>

            <div className='space-y-6 text-sm text-gray-600'>

              <div className='flex items-start gap-4'>

                <div className='w-11 h-11 rounded-2xl bg-white border border-[#eadfcb] flex items-center justify-center flex-shrink-0'>

                  <MdPhone className='text-[#9f8660] text-xl' />

                </div>

                <div>

                  <p className='text-gray-900 font-medium mb-1'>
                    Phone
                  </p>

                  <a
                    href='tel:+918651786912'
                    className='hover:text-[#9f8660] transition'
                  >
                    +91 8651786912
                  </a>

                </div>

              </div>

              <div className='flex items-start gap-4'>

                <div className='w-11 h-11 rounded-2xl bg-white border border-[#eadfcb] flex items-center justify-center flex-shrink-0'>

                  <MdEmail className='text-[#9f8660] text-xl' />

                </div>

                <div>

                  <p className='text-gray-900 font-medium mb-1'>
                    Email
                  </p>

                  <a
                    href='mailto:aditya957258@gmail.com'
                    className='hover:text-[#9f8660] transition break-all'
                  >
                    aditya957258@gmail.com
                  </a>

                </div>

              </div>

              <div>

                <p className='text-gray-900 font-medium mb-2'>
                  Working Hours
                </p>

                <p>
                  Monday - Sunday : 24 Hours Support
                </p>

              </div>

            </div>

            {/* PAYMENT */}

            <div className='mt-10'>

              <p className='text-gray-900 font-medium mb-5'>
                Secure Payments
              </p>

              <div className='flex items-center gap-5 text-4xl text-[#9f8660]'>

                <FaCcVisa className='hover:text-[#7d6646] transition cursor-pointer' />

                <FaCcMastercard className='hover:text-[#7d6646] transition cursor-pointer' />

                <FaCcPaypal className='hover:text-[#7d6646] transition cursor-pointer' />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* BOTTOM */}
      {/* ========================================= */}

      <div className='border-t border-[#e7dcc8] bg-white/40 backdrop-blur-xl relative z-10'>

        <div className='max-w-7xl mx-auto px-6 sm:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-5'>

          <p className='text-sm text-gray-600 text-center md:text-left leading-7'>

            © 2026 Stylentra. All Rights Reserved.
            Crafted with premium modern ecommerce experiences.

          </p>

          <div className='flex items-center gap-6 text-sm text-gray-600 flex-wrap justify-center'>

            <p className='hover:text-[#9f8660] cursor-pointer transition'>
              Terms
            </p>

            <p className='hover:text-[#9f8660] cursor-pointer transition'>
              Privacy
            </p>

            <p className='hover:text-[#9f8660] cursor-pointer transition'>
              Security
            </p>

            <p className='hover:text-[#9f8660] cursor-pointer transition'>
              Cookies
            </p>

          </div>

        </div>

      </div>

    </footer>

  )
}

export default Footer

