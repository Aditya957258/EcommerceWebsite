// ======================================================
// FILE: src/pages/Wishlist.jsx
// AMAZON / FLIPKART STYLE PRODUCTION WISHLIST
// FULLY WORKING + LOCALSTORAGE SYNC
// ======================================================

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'
import { toast } from 'react-toastify'

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Wishlist = () => {

  const navigate = useNavigate()

  const {
    products = [],
    addToCart = () => {}
  } = useContext(ShopContext) || {}

  const [wishlistItems, setWishlistItems] = useState([])

  // ======================================================
  // LOAD WISHLIST
  // ======================================================

  const loadWishlist = () => {

    try {

      const wishlistData =
        JSON.parse(localStorage.getItem('wishlist')) || []

      if (!Array.isArray(wishlistData)) {
        setWishlistItems([])
        return
      }

      const filteredProducts = products.filter((product) => {

        const productId = product?._id || product?.id

        return wishlistData
          .map(String)
          .includes(String(productId))
      })

      setWishlistItems(filteredProducts)

    } catch (error) {

      console.log('Wishlist Error:', error)
      setWishlistItems([])

    }

  }

  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {

    loadWishlist()

    window.addEventListener('wishlistUpdated', loadWishlist)

    return () => {
      window.removeEventListener(
        'wishlistUpdated',
        loadWishlist
      )
    }

  }, [products])

  // ======================================================
  // REMOVE FROM WISHLIST
  // ======================================================

  const removeFromWishlist = (id) => {

    try {

      const existingWishlist =
        JSON.parse(localStorage.getItem('wishlist')) || []

      const updatedWishlist = existingWishlist.filter(
        item => String(item) !== String(id)
      )

      localStorage.setItem(
        'wishlist',
        JSON.stringify(updatedWishlist)
      )

      setWishlistItems(prev =>
        prev.filter(item => {
          const itemId = item?._id || item?.id
          return String(itemId) !== String(id)
        })
      )

      window.dispatchEvent(
        new Event('wishlistUpdated')
      )

      toast.success('Removed from wishlist')

    } catch (error) {

      console.log(error)

    }

  }

  // ======================================================
  // MOVE TO CART
  // ======================================================

  const moveToCart = (id, name) => {

    addToCart(id)

    removeFromWishlist(id)

    toast.success(`${name} added to cart`)

  }

  // ======================================================
  // IMAGE FALLBACK
  // ======================================================

  const getImage = (image) => {

    if (Array.isArray(image)) {
      return image[0]
    }

    if (typeof image === 'string') {
      return image
    }

    return (
      assets?.placeholder ||
      'https://via.placeholder.com/400'
    )

  }

  // ======================================================
  // EMPTY WISHLIST
  // ======================================================

  if (wishlistItems.length === 0) {

    return (

      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>

        <div className='bg-white w-full max-w-md rounded-2xl shadow-sm border p-10 text-center'>

          <div className='w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6'>
            <Heart
              size={40}
              className='text-red-500'
            />
          </div>

          <h1 className='text-2xl font-bold text-gray-800'>
            Your Wishlist is Empty
          </h1>

          <p className='text-gray-500 mt-3 text-sm'>
            Save your favorite products here like Amazon & Flipkart.
          </p>

          <button
            onClick={() => navigate('/collection')}
            className='mt-8 bg-black text-white px-8 py-3 rounded-xl hover:bg-red-600 transition'
          >
            Continue Shopping
          </button>

        </div>

      </div>

    )

  }

  // ======================================================
  // MAIN UI
  // ======================================================

  return (

    <div className='min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>

      <div className='max-w-7xl mx-auto'>

        {/* HEADER */}

        <div className='flex items-center justify-between mb-8'>

          <div>

            <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
              <Heart className='fill-red-500 text-red-500' />
              My Wishlist
            </h1>

            <p className='text-gray-500 mt-2 text-sm'>
              {wishlistItems.length} items saved
            </p>

          </div>

        </div>

        {/* PRODUCT GRID */}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

          {wishlistItems.map((item) => {

            const itemId = item?._id || item?.id

            const inStock =
              item?.stock !== false

            return (

              <div
                key={itemId}
                className='bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 group'
              >

                {/* IMAGE */}

                <div className='relative overflow-hidden aspect-[4/5] bg-gray-100'>

                  <img
                    src={getImage(item?.image)}
                    alt={item?.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
                  />

                  {/* REMOVE BUTTON */}

                  <button
                    onClick={() =>
                      removeFromWishlist(itemId)
                    }
                    className='absolute top-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 hover:text-white transition'
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* STOCK */}

                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    inStock
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>

                    {inStock
                      ? 'In Stock'
                      : 'Out of Stock'}

                  </div>

                </div>

                {/* CONTENT */}

                <div className='p-4'>

                  {/* RATING */}

                  <div className='flex items-center gap-1 mb-2'>

                    <Star
                      size={14}
                      className='fill-yellow-400 text-yellow-400'
                    />

                    <span className='text-sm font-medium'>
                      {item?.rating || 4.5}
                    </span>

                  </div>

                  {/* CATEGORY */}

                  <p className='text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1'>
                    {item?.category || 'Fashion'}
                  </p>

                  {/* PRODUCT NAME */}

                  <h2
                    onClick={() =>
                      navigate(`/product/${itemId}`)
                    }
                    className='font-semibold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer transition'
                  >
                    {item?.name}
                  </h2>

                  {/* PRICE */}

                  <div className='flex items-center gap-2 mt-3'>

                    <span className='text-2xl font-bold text-gray-900'>
                      ₹{item?.price}
                    </span>

                    {item?.oldPrice && (

                      <span className='text-sm text-gray-400 line-through'>
                        ₹{item?.oldPrice}
                      </span>

                    )}

                  </div>

                  {/* BUTTON */}

                  <button
                    disabled={!inStock}
                    onClick={() =>
                      moveToCart(
                        itemId,
                        item?.name
                      )
                    }
                    className={`mt-5 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition ${
                      inStock
                        ? 'bg-black text-white hover:bg-red-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >

                    <ShoppingCart size={18} />

                    {inStock
                      ? 'Move to Cart'
                      : 'Out of Stock'}

                  </button>

                </div>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}

export default Wishlist