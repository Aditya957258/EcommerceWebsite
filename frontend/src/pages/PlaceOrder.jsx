import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const {
        getCartAmount,
        delivery_fee,
        currency,
        cartItems,
        products,
        placeOrder
    } = useContext(ShopContext)

    const navigate = useNavigate()

    // =====================================
    // DELIVERY FORM
    // =====================================
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        phone: ''
    })

    // =====================================
    // PAYMENT METHOD
    // =====================================
    const [paymentMethod, setPaymentMethod] = useState('COD')

    // =====================================
    // CARD DATA
    // =====================================
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: ''
    })

    // =====================================
    // UPI DATA
    // =====================================
    const [upiId, setUpiId] = useState('')

    // =====================================
    // HANDLE DELIVERY INPUT
    // =====================================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // =====================================
    // HANDLE CARD INPUT
    // =====================================
    const handleCardChange = (e) => {

        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        })
    }

    // =====================================
    // PLACE ORDER
    // =====================================
    const handlePlaceOrder = () => {

        // EMPTY CART
        if (Object.keys(cartItems).length === 0) {

            toast.error('Your cart is empty 🛒')
            return
        }

        // DELIVERY VALIDATION
        for (let key in formData) {

            if (!formData[key].trim()) {

                toast.error('Please fill all delivery details')
                return
            }
        }

        // PHONE VALIDATION
        if (formData.phone.length < 10) {

            toast.error('Enter valid phone number')
            return
        }

        // EMAIL VALIDATION
        if (!formData.email.includes('@')) {

            toast.error('Enter valid email')
            return
        }

        // =====================================
        // UPI VALIDATION
        // =====================================
        if (paymentMethod === 'UPI') {

            if (!upiId.includes('@')) {

                toast.error('Enter valid UPI ID')
                return
            }
        }

        // =====================================
        // CARD VALIDATION
        // =====================================
        if (paymentMethod === 'CARD') {

            if (
                !cardData.cardNumber ||
                !cardData.expiry ||
                !cardData.cvv ||
                !cardData.cardName
            ) {

                toast.error('Fill all card details')
                return
            }

            if (cardData.cardNumber.length < 16) {

                toast.error('Invalid card number')
                return
            }

            if (cardData.cvv.length < 3) {

                toast.error('Invalid CVV')
                return
            }
        }

        // =====================================
        // PAYMENT SUCCESS MESSAGE
        // =====================================
        if (paymentMethod === 'CARD') {

            toast.success('💳 Card Payment Successful')

        } else if (paymentMethod === 'UPI') {

            toast.success('📱 UPI Payment Successful')

        } else {

            toast.success('🏠 Order placed successfully')
        }

        // =====================================
        // SAVE ORDER
        // =====================================
        placeOrder(formData, paymentMethod)

        // =====================================
        // REDIRECT
        // =====================================
        setTimeout(() => {

            navigate('/orders')

        }, 1500)
    }

    // =====================================
    // PRICE CALCULATION
    // =====================================
    const subtotal = getCartAmount()

    const delivery =
        subtotal > 0 ? delivery_fee : 0

    const total =
        subtotal + delivery

    // =====================================
    // DATE
    // =====================================
    const today = new Date()

    const orderDate =
        today.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })

    return (

        <div className='pt-10 min-h-screen'>

            {/* PAGE TITLE */}
            <div className='mb-8'>

                <h1 className='text-3xl font-bold'>
                    Secure Checkout
                </h1>

                <p className='text-gray-500 mt-2'>
                    Complete your order securely with Stylentra
                </p>

            </div>

            <div className='flex flex-col lg:flex-row gap-10'>

                {/* ===================================== */}
                {/* LEFT SECTION */}
                {/* ===================================== */}

                <div className='flex-1'>

                    {/* DELIVERY INFO */}
                    <div className='border rounded-2xl p-6 mb-6 shadow-sm bg-white'>

                        <h2 className='text-2xl font-semibold mb-5'>
                            Delivery Information
                        </h2>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className='border p-3 rounded-xl outline-none'
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className='border p-3 rounded-xl outline-none'
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className='border p-3 rounded-xl outline-none'
                            />

                            <input
                                type="number"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className='border p-3 rounded-xl outline-none'
                            />

                        </div>

                        <textarea
                            name="address"
                            placeholder="Full Address"
                            value={formData.address}
                            onChange={handleChange}
                            className='border p-3 rounded-xl outline-none w-full mt-4 h-28 resize-none'
                        />

                    </div>

                    {/* PAYMENT SECTION */}
                    <div className='border rounded-2xl p-6 shadow-sm bg-white'>

                        <h2 className='text-2xl font-semibold mb-5'>
                            Payment Method
                        </h2>

                        {/* COD */}
                        <label className='flex items-center gap-4 border rounded-xl p-4 mb-4 cursor-pointer hover:border-black transition'>

                            <input
                                type="radio"
                                checked={paymentMethod === 'COD'}
                                onChange={() => setPaymentMethod('COD')}
                            />

                            <div>

                                <p className='font-semibold'>
                                    Cash on Delivery
                                </p>

                                <p className='text-sm text-gray-500'>
                                    Pay after receiving your order
                                </p>

                            </div>

                        </label>

                        {/* UPI */}
                        <label className='flex items-center gap-4 border rounded-xl p-4 mb-4 cursor-pointer hover:border-black transition'>

                            <input
                                type="radio"
                                checked={paymentMethod === 'UPI'}
                                onChange={() => setPaymentMethod('UPI')}
                            />

                            <div>

                                <p className='font-semibold'>
                                    UPI Payment
                                </p>

                                <p className='text-sm text-gray-500'>
                                    Google Pay, PhonePe, Paytm supported
                                </p>

                            </div>

                        </label>

                        {/* UPI SECTION */}
                        {paymentMethod === 'UPI' && (

                            <div className='border rounded-xl p-4 bg-gray-50 mb-4'>

                                <p className='font-medium mb-2'>
                                    Enter UPI ID
                                </p>

                                <input
                                    type="text"
                                    placeholder='example@upi'
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className='border w-full p-3 rounded-xl outline-none'
                                />

                            </div>
                        )}

                        {/* CARD */}
                        <label className='flex items-center gap-4 border rounded-xl p-4 mb-4 cursor-pointer hover:border-black transition'>

                            <input
                                type="radio"
                                checked={paymentMethod === 'CARD'}
                                onChange={() => setPaymentMethod('CARD')}
                            />

                            <div>

                                <p className='font-semibold'>
                                    Credit / Debit Card
                                </p>

                                <p className='text-sm text-gray-500'>
                                    Visa, Mastercard, Rupay accepted
                                </p>

                            </div>

                        </label>

                        {/* CARD SECTION */}
                        {paymentMethod === 'CARD' && (

                            <div className='border rounded-xl p-4 bg-gray-50'>

                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder='Card Number'
                                    value={cardData.cardNumber}
                                    onChange={handleCardChange}
                                    className='border w-full p-3 rounded-xl mb-3 outline-none'
                                />

                                <input
                                    type="text"
                                    name="cardName"
                                    placeholder='Name on Card'
                                    value={cardData.cardName}
                                    onChange={handleCardChange}
                                    className='border w-full p-3 rounded-xl mb-3 outline-none'
                                />

                                <div className='flex gap-3'>

                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder='MM/YY'
                                        value={cardData.expiry}
                                        onChange={handleCardChange}
                                        className='border w-1/2 p-3 rounded-xl outline-none'
                                    />

                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder='CVV'
                                        value={cardData.cvv}
                                        onChange={handleCardChange}
                                        className='border w-1/2 p-3 rounded-xl outline-none'
                                    />

                                </div>

                                <p className='text-xs text-gray-500 mt-3'>
                                    🔒 100% Secure encrypted payment gateway
                                </p>

                            </div>
                        )}

                    </div>

                </div>

                {/* ===================================== */}
                {/* RIGHT SECTION */}
                {/* ===================================== */}

                <div className='w-full lg:w-[380px]'>

                    <div className='border rounded-2xl p-6 shadow-sm sticky top-5 bg-white'>

                        <h2 className='text-2xl font-semibold mb-5'>
                            Order Summary
                        </h2>

                        {/* PRODUCTS */}
                        <div className='max-h-[300px] overflow-y-auto pr-2'>

                            {Object.keys(cartItems).map((itemId) => {

                                const product =
                                    products.find(
                                        item => item._id === itemId
                                    )

                                if (!product) return null

                                return Object.keys(cartItems[itemId]).map((size) => (

                                    <div
                                        key={itemId + size}
                                        className='flex gap-3 mb-5 border-b pb-4'
                                    >

                                        <img
                                            src={product.image[0]}
                                            alt=""
                                            className='w-16 h-16 object-cover rounded-xl border'
                                        />

                                        <div className='flex-1'>

                                            <p className='font-medium text-sm'>
                                                {product.name}
                                            </p>

                                            <p className='text-xs text-gray-500 mt-1'>
                                                Size: {size}
                                            </p>

                                            <p className='text-xs text-gray-500'>
                                                Qty: {cartItems[itemId][size]}
                                            </p>

                                        </div>

                                        <p className='font-semibold text-sm'>
                                            {currency}
                                            {product.price * cartItems[itemId][size]}
                                        </p>

                                    </div>
                                ))
                            })}

                        </div>

                        {/* PRICE DETAILS */}
                        <div className='mt-5'>

                            <div className='flex justify-between mb-3 text-gray-600'>

                                <span>Subtotal</span>

                                <span>
                                    {currency}{subtotal}
                                </span>

                            </div>

                            <div className='flex justify-between mb-3 text-gray-600'>

                                <span>Delivery Fee</span>

                                <span>
                                    {currency}{delivery}
                                </span>

                            </div>

                            <div className='flex justify-between mb-3 text-gray-600'>

                                <span>Order Date</span>

                                <span>{orderDate}</span>

                            </div>

                            <hr className='my-4' />

                            <div className='flex justify-between text-2xl font-bold'>

                                <span>Total</span>

                                <span>
                                    {currency}{total}
                                </span>

                            </div>

                        </div>

                        {/* BUTTON */}
                        <button
                            type='button'
                            onClick={handlePlaceOrder}
                            className='bg-black text-white w-full py-4 rounded-2xl mt-6 hover:bg-gray-800 transition'
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PlaceOrder