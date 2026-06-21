import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

import {
  FaTag,
  FaShieldAlt,
  FaTruck,
  FaGift,
  FaLock,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa'

const CartTotal = () => {

  const {
    getCartAmount,
    delivery_fee,
    currency,
    cartItems
  } = useContext(ShopContext)

  const navigate = useNavigate()

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  // ======================================
  // APPLY COUPON
  // ======================================

  const applyCoupon = () => {

    const code = promoCode.trim().toUpperCase()

    if (code === 'STYLENTRA10') {

      setDiscount(10)
      setCouponApplied(true)
      setCouponMessage('🎉 10% Discount Applied Successfully')

    }

    else if (code === 'FASHION20') {

      setDiscount(20)
      setCouponApplied(true)
      setCouponMessage('🔥 20% Discount Applied Successfully')

    }

    else if (code === 'WELCOME25') {

      setDiscount(25)
      setCouponApplied(true)
      setCouponMessage('💎 25% Premium Discount Activated')

    }

    else {

      setDiscount(0)
      setCouponApplied(false)
      setCouponMessage('❌ Invalid Coupon Code')

    }

  }

  // ======================================
  // REMOVE COUPON
  // ======================================

  const removeCoupon = () => {

    setPromoCode('')
    setDiscount(0)
    setCouponApplied(false)
    setCouponMessage('Coupon Removed Successfully')

  }

  // ======================================
  // PRICE CALCULATION
  // ======================================

  const subtotal = getCartAmount()

  const delivery = subtotal > 999
    ? 0
    : subtotal > 0
      ? delivery_fee
      : 0

  const total = subtotal + delivery

  const discountAmount = (total * discount) / 100

  const finalTotal = total - discountAmount

  const totalItems = Object.keys(cartItems).length

  // ======================================
  // CHECKOUT
  // ======================================

  const handleCheckout = () => {

    if (subtotal === 0) return

    navigate('/place-order')

  }

  return (

    <div className='w-full lg:w-[420px]'>

      {/* ====================================== */}
      {/* MAIN CARD */}
      {/* ====================================== */}

      <div className='bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden sticky top-24'>

        {/* ====================================== */}
        {/* HEADER */}
        {/* ====================================== */}

        <div className='bg-gradient-to-r from-black via-gray-900 to-black p-6 text-white relative overflow-hidden'>

          <div className='absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>

          <div className='relative flex items-center justify-between'>

            <div>

              <p className='uppercase tracking-[3px] text-xs text-gray-300'>
                Stylentra Secure Checkout
              </p>

              <h2 className='text-3xl font-black mt-2'>
                Order Summary
              </h2>

            </div>

            <div className='w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl border border-white/20 shadow-lg'>

              🛍️

            </div>

          </div>

        </div>

        {/* ====================================== */}
        {/* BODY */}
        {/* ====================================== */}

        <div className='p-6'>

          {/* ITEMS CARD */}

          <div className='bg-gradient-to-r from-gray-50 to-white rounded-3xl p-5 mb-6 border border-gray-100 shadow-sm'>

            <div className='flex items-center justify-between'>

              <div className='flex items-center gap-4'>

                <div className='w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-xl shadow-lg'>

                  <FaGift />

                </div>

                <div>

                  <h3 className='font-bold text-gray-800 text-lg'>
                    Shopping Bag
                  </h3>

                  <p className='text-sm text-gray-500 mt-1'>
                    Premium Fashion Collection
                  </p>

                </div>

              </div>

              <div className='text-right'>

                <h2 className='text-3xl font-black text-black'>
                  {totalItems}
                </h2>

                <p className='text-xs text-gray-500'>
                  Items
                </p>

              </div>

            </div>

          </div>

          {/* ====================================== */}
          {/* PRICE DETAILS */}
          {/* ====================================== */}

          <div className='space-y-5'>

            {/* SUBTOTAL */}

            <div className='flex items-center justify-between'>

              <div className='flex items-center gap-3 text-gray-700'>

                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                  <FaTag />
                </div>

                <span className='font-medium'>
                  Subtotal
                </span>

              </div>

              <span className='font-bold text-lg'>
                {currency}{subtotal}
              </span>

            </div>

            {/* DELIVERY */}

            <div className='flex items-center justify-between'>

              <div className='flex items-center gap-3 text-gray-700'>

                <div className='w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center'>
                  <FaTruck />
                </div>

                <span className='font-medium'>
                  Delivery Fee
                </span>

              </div>

              {

                delivery === 0 ? (

                  <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold'>
                    FREE
                  </span>

                ) : (

                  <span className='font-bold text-lg'>
                    {currency}{delivery}
                  </span>

                )

              }

            </div>

            {/* FREE DELIVERY MESSAGE */}

            {

              subtotal > 999 && (

                <div className='bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 text-sm flex items-center gap-3'>

                  <FaCheckCircle className='text-lg' />

                  Congratulations! You unlocked free delivery on this order.

                </div>

              )

            }

            {/* DISCOUNT */}

            {

              discount > 0 && (

                <div className='flex items-center justify-between bg-red-50 border border-red-100 rounded-2xl px-4 py-3'>

                  <span className='text-red-500 font-semibold'>
                    Discount ({discount}%)
                  </span>

                  <span className='text-red-500 font-black text-lg'>
                    - {currency}{discountAmount.toFixed(2)}
                  </span>

                </div>

              )

            }

          </div>

          {/* DIVIDER */}

          <div className='border-t border-dashed my-7'></div>

          {/* ====================================== */}
          {/* GRAND TOTAL */}
          {/* ====================================== */}

          <div className='flex items-center justify-between mb-7'>

            <div>

              <p className='text-sm text-gray-500 uppercase tracking-[2px]'>
                Grand Total
              </p>

              <h2 className='text-4xl font-black text-black mt-1'>
                {currency}{finalTotal.toFixed(2)}
              </h2>

            </div>

            <div className='bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm'>
              Secure Payment
            </div>

          </div>

          {/* ====================================== */}
          {/* COUPON SECTION */}
          {/* ====================================== */}

          <div className='bg-gradient-to-r from-gray-50 to-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-7'>

            <div className='flex items-center gap-3 mb-5'>

              <div className='w-12 h-12 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-lg'>
                <FaGift />
              </div>

              <div>

                <h3 className='font-bold text-lg text-gray-800'>
                  Apply Coupon
                </h3>

                <p className='text-sm text-gray-500'>
                  Unlock exclusive discounts
                </p>

              </div>

            </div>

            {/* INPUT + BUTTON */}

            <div className='flex gap-3'>

              <input
                type='text'
                placeholder='Enter coupon code'
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className='flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black transition bg-white'
              />

              {

                couponApplied ? (

                  <button
                    onClick={removeCoupon}
                    className='bg-red-500 hover:bg-red-600 text-white px-5 rounded-2xl font-semibold transition flex items-center gap-2 shadow-lg'
                  >

                    <FaTimes />

                    Remove

                  </button>

                ) : (

                  <button
                    onClick={applyCoupon}
                    className='bg-black hover:bg-gray-800 text-white px-6 rounded-2xl font-semibold transition shadow-lg'
                  >
                    Apply
                  </button>

                )

              }

            </div>

            {/* MESSAGE */}

            {

              couponMessage && (

                <p
                  className={`mt-4 text-sm font-semibold ${
                    discount > 0
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >

                  {couponMessage}

                </p>

              )

            }

            {/* DEMO COUPONS */}

            <div className='flex flex-wrap gap-3 mt-5'>

              <div className='bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-700 shadow-sm'>
                STYLENTRA10
              </div>

              <div className='bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-700 shadow-sm'>
                FASHION20
              </div>

              <div className='bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-700 shadow-sm'>
                WELCOME25
              </div>

            </div>

          </div>

          {/* ====================================== */}
          {/* SECURITY CARD */}
          {/* ====================================== */}

          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-5 mb-7 shadow-sm'>

            <div className='flex items-start gap-4'>

              <div className='w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-xl shadow-lg'>

                <FaShieldAlt />

              </div>

              <div>

                <h3 className='font-bold text-gray-800 text-lg'>
                  Safe & Secure Payments
                </h3>

                <p className='text-sm text-gray-600 mt-2 leading-7'>
                  Your payment information is protected with advanced encryption, trusted payment gateways and secure checkout protection.
                </p>

              </div>

            </div>

          </div>

          {/* ====================================== */}
          {/* CHECKOUT BUTTON */}
          {/* ====================================== */}

          <button
            onClick={handleCheckout}
            disabled={subtotal === 0}
            className={`w-full py-4 rounded-2xl text-lg font-bold transition duration-300 shadow-xl ${
              subtotal === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 hover:scale-[1.02]'
            }`}
          >

            {

              subtotal === 0
                ? 'Your Cart Is Empty'
                : 'Proceed To Checkout'

            }

          </button>

          {/* PAYMENT INFO */}

          <div className='flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-gray-500 text-center'>

            <div className='flex items-center gap-2'>
              <FaLock />
              Secure Payment
            </div>

            <span>•</span>

            <div>
              Fast Delivery
            </div>

            <span>•</span>

            <div>
              Trusted Shopping
            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default CartTotal