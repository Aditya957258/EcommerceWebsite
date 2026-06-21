import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const {
        cartItems,
        products,
        currency,
        increaseQty,
        decreaseQty,
        removeFromCart
    } = useContext(ShopContext)

    const navigate = useNavigate()

    return (
        <div className='bg-gray-50 min-h-screen pb-10'>

            {/* 🔥 BANNER */}
            <div className='w-full h-48 sm:h-60 relative mb-10'>

                <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    className='w-full h-full object-cover'
                    alt=""
                />

                <div className='absolute inset-0 bg-black/50 flex items-center px-6'>
                    <div>
                        <h1 className='text-white text-3xl sm:text-5xl font-bold'>
                            Your Shopping Cart
                        </h1>
                        <p className='text-gray-200 mt-2'>
                            Review and manage your selected products
                        </p>
                    </div>
                </div>

            </div>

            <div className='max-w-6xl mx-auto px-4'>

                <h1 className='text-2xl font-semibold mb-6'>
                    Shopping Cart
                </h1>

                <div className='flex flex-col lg:flex-row gap-10'>

                    {/* LEFT SIDE */}
                    <div className='flex-1'>

                        {Object.keys(cartItems).length === 0 ? (

                            <div className='bg-white p-10 rounded-2xl shadow text-center'>

                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                                    className='w-24 mx-auto mb-4 opacity-70'
                                    alt=""
                                />

                                <p className='text-gray-500'>
                                    Your cart is empty 🛒
                                </p>

                                <button
                                    onClick={() => navigate('/collection')}
                                    className='mt-5 bg-black text-white px-6 py-3 rounded-xl'
                                >
                                    Start Shopping
                                </button>

                            </div>

                        ) : (

                            Object.keys(cartItems).map((itemId) => {

                                const product = products.find(p => p._id === itemId)

                                if (!product) return null

                                return Object.keys(cartItems[itemId]).map((size) => (

                                    <div
                                        key={itemId + size}
                                        className='bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-4 mb-4 flex items-center justify-between gap-4'
                                    >

                                        {/* IMAGE */}
                                        <div className='relative'>

                                            <img
                                                src={product.image[0]}
                                                className='w-24 h-24 object-cover rounded-xl border'
                                                alt=""
                                            />

                                            <span className='absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded'>
                                                {size}
                                            </span>

                                        </div>

                                        {/* DETAILS */}
                                        <div className='flex-1 ml-3'>

                                            <p className='font-semibold'>
                                                {product.name}
                                            </p>

                                            <p className='text-sm text-gray-500 mt-1'>
                                                Size: {size}
                                            </p>

                                            <p className='text-sm font-medium mt-1'>
                                                {currency}{product.price}
                                            </p>

                                        </div>

                                        {/* QUANTITY */}
                                        <div className='flex items-center gap-2'>

                                            <button
                                                onClick={() => decreaseQty(itemId, size)}
                                                className='px-3 py-1 border rounded'
                                            >
                                                -
                                            </button>

                                            <span className='font-medium'>
                                                {cartItems[itemId][size]}
                                            </span>

                                            <button
                                                onClick={() => increaseQty(itemId, size)}
                                                className='px-3 py-1 border rounded'
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* REMOVE */}
                                        <button
                                            onClick={() => removeFromCart(itemId, size)}
                                            className='text-red-500 font-medium hover:underline'
                                        >
                                            Remove
                                        </button>

                                    </div>

                                ))
                            })
                        )}

                    </div>

                    {/* RIGHT SIDE */}
                    <div className='w-full lg:w-[350px] sticky top-10'>

                        <div className='bg-white p-4 rounded-2xl shadow'>

                            <CartTotal />

                            <button
                                onClick={() => navigate('/place-order')}
                                className='w-full mt-5 bg-black text-white py-3 rounded-xl hover:bg-gray-800'
                            >
                                Proceed to Checkout
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Cart