import React from 'react'
import { motion } from 'framer-motion'
import {
  FaShieldAlt,
  FaHeadset,
  FaUndoAlt,
  FaCheckCircle,
  FaShippingFast,
  FaLock
} from 'react-icons/fa'

const OurPolicy = () => {

  // =========================================
  // POLICY DATA
  // =========================================

  const policies = [
    {
      id: 1,
      title: 'Easy Exchange',
      description:
        'Hassle-free exchange process with smooth pickup and quick replacement support.',
      icon: <FaUndoAlt />,
      badge: '7 Days',
      gradient: 'from-orange-500 to-red-500',
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      hover: 'group-hover:bg-orange-500'
    },

    {
      id: 2,
      title: 'Secure Payments',
      description:
        '100% secure transactions with encrypted checkout and trusted payment gateways.',
      icon: <FaLock />,
      badge: 'Protected',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      hover: 'group-hover:bg-blue-500'
    },

    {
      id: 3,
      title: 'Premium Quality',
      description:
        'Every product is quality checked to ensure premium materials and comfort.',
      icon: <FaCheckCircle />,
      badge: 'Verified',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      hover: 'group-hover:bg-green-500'
    },

    {
      id: 4,
      title: '24/7 Support',
      description:
        'Dedicated customer support available anytime for orders, returns and help.',
      icon: <FaHeadset />,
      badge: 'Live Help',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      hover: 'group-hover:bg-purple-500'
    }

  ]

  return (

    <section className='relative py-20 sm:py-24 overflow-hidden'>

      {/* ========================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ========================================= */}

      <div className='absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-orange-200/30 rounded-full blur-3xl'></div>

      <div className='absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-blue-200/30 rounded-full blur-3xl'></div>

      {/* ========================================= */}
      {/* CONTAINER */}
      {/* ========================================= */}

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>

        {/* ========================================= */}
        {/* TOP SECTION */}
        {/* ========================================= */}

        <div className='text-center mb-14'>

          {/* BADGE */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-3 px-5 py-3 rounded-full bg-black text-white shadow-xl mb-6'
          >

            <FaShippingFast className='text-orange-400' />

            <p className='text-sm font-semibold tracking-wide uppercase'>
              Trusted Shopping Experience
            </p>

          </motion.div>

          {/* HEADING */}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight'
          >

            Why Customers
            <span className='bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent'>
              {' '}Love Shopping
            </span>
            {' '}With Us

          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className='max-w-3xl mx-auto mt-6 text-gray-600 text-sm sm:text-base leading-8'
          >

            Experience premium ecommerce shopping with secure payments,
            easy returns, verified quality products and dedicated customer support
            crafted for a seamless modern shopping experience.

          </motion.p>

        </div>

        {/* ========================================= */}
        {/* POLICY GRID */}
        {/* ========================================= */}

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>

          {
            policies.map((item, index) => (

              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-[32px] border border-gray-100 ${item.bg} p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-500`}
              >

                {/* TOP BADGE */}

                <div className='absolute top-5 right-5'>

                  <div className={`bg-gradient-to-r ${item.gradient} text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg`}>

                    {item.badge}

                  </div>

                </div>

                {/* ICON */}

                <div className={`w-16 h-16 rounded-2xl ${item.iconBg} ${item.hover} flex items-center justify-center text-2xl text-gray-800 group-hover:text-white transition duration-500 shadow-md`}>

                  {item.icon}

                </div>

                {/* TITLE */}

                <h3 className='mt-7 text-xl font-bold text-gray-900'>

                  {item.title}

                </h3>

                {/* DESCRIPTION */}

                <p className='mt-4 text-gray-600 text-sm leading-7'>

                  {item.description}

                </p>

                {/* BOTTOM LINE */}

                <div className={`mt-7 h-1 w-16 rounded-full bg-gradient-to-r ${item.gradient}`}></div>

                {/* HOVER GLOW */}

                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${item.gradient} blur-3xl -z-10`}></div>

              </motion.div>

            ))
          }

        </div>

        {/* ========================================= */}
        {/* BOTTOM TRUST BAR */}
        {/* ========================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mt-16 rounded-[32px] border border-gray-100 bg-white shadow-xl px-6 sm:px-10 py-8 flex flex-col lg:flex-row items-center justify-between gap-8'
        >

          {/* LEFT */}

          <div>

            <h3 className='text-2xl font-black text-gray-900'>

              Trusted By Thousands Of Customers

            </h3>

            <p className='text-gray-500 mt-2 text-sm sm:text-base leading-7'>

              Premium quality products, secure checkout and smooth customer experience
              trusted by modern fashion shoppers.

            </p>

          </div>

          {/* RIGHT */}

          <div className='flex flex-wrap items-center justify-center gap-5'>

            <div className='bg-gray-100 px-5 py-3 rounded-2xl text-center min-w-[120px]'>

              <h4 className='text-2xl font-black text-black'>
                10K+
              </h4>

              <p className='text-xs text-gray-500 mt-1'>
                Happy Customers
              </p>

            </div>

            <div className='bg-gray-100 px-5 py-3 rounded-2xl text-center min-w-[120px]'>

              <h4 className='text-2xl font-black text-black'>
                24/7
              </h4>

              <p className='text-xs text-gray-500 mt-1'>
                Live Support
              </p>

            </div>

            <div className='bg-gray-100 px-5 py-3 rounded-2xl text-center min-w-[120px]'>

              <h4 className='text-2xl font-black text-black'>
                100%
              </h4>

              <p className='text-xs text-gray-500 mt-1'>
                Secure Checkout
              </p>

            </div>

          </div>

        </motion.div>

        {/* ========================================= */}
        {/* EXTRA TRUST SECTION */}
        {/* ========================================= */}

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-12'>

          <div className='bg-white border border-gray-100 rounded-2xl py-5 px-4 text-center shadow-sm'>

            <h4 className='text-lg font-bold text-gray-900'>
              Easy Returns
            </h4>

            <p className='text-xs text-gray-500 mt-1'>
              Smooth return process
            </p>

          </div>

          <div className='bg-white border border-gray-100 rounded-2xl py-5 px-4 text-center shadow-sm'>

            <h4 className='text-lg font-bold text-gray-900'>
              Fast Support
            </h4>

            <p className='text-xs text-gray-500 mt-1'>
              Instant customer help
            </p>

          </div>

          <div className='bg-white border border-gray-100 rounded-2xl py-5 px-4 text-center shadow-sm'>

            <h4 className='text-lg font-bold text-gray-900'>
              Trusted Store
            </h4>

            <p className='text-xs text-gray-500 mt-1'>
              Verified ecommerce brand
            </p>

          </div>

          <div className='bg-white border border-gray-100 rounded-2xl py-5 px-4 text-center shadow-sm'>

            <h4 className='text-lg font-bold text-gray-900'>
              Premium Quality
            </h4>

            <p className='text-xs text-gray-500 mt-1'>
              Quality checked items
            </p>

          </div>

        </div>

      </div>

    </section>

  )
}

export default OurPolicy
