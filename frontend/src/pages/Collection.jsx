import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import ProductItem from '../components/ProductItem'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaHeart } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'

const Collection = () => {

  const navigate = useNavigate()

  const {
    products,
    search,
    showSearch,
    currency,
    addToCart
  } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  // =========================
  // TOGGLE CATEGORY
  // =========================

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {

      setCategory(prev =>
        prev.filter(item => item !== e.target.value)
      )

    }

    else {

      setCategory(prev => [...prev, e.target.value])

    }

  }

  // =========================
  // TOGGLE SUB CATEGORY
  // =========================

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {

      setSubCategory(prev =>
        prev.filter(item => item !== e.target.value)
      )

    }

    else {

      setSubCategory(prev => [...prev, e.target.value])

    }

  }

  // =========================
  // APPLY FILTER
  // =========================

  const applyFilter = () => {

    let productsCopy = [...products]

    // SEARCH
    if (showSearch && search) {

      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )

    }

    // CATEGORY
    if (category.length > 0) {

      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      )

    }

    // SUB CATEGORY
    if (subCategory.length > 0) {

      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )

    }

    setFilterProducts(productsCopy)

  }

  // =========================
  // SORT PRODUCTS
  // =========================

  const sortProduct = () => {

    let fpCopy = [...filterProducts]

    switch (sortType) {

      case 'low-high':

        setFilterProducts(
          fpCopy.sort((a, b) => a.price - b.price)
        )

        break

      case 'high-low':

        setFilterProducts(
          fpCopy.sort((a, b) => b.price - a.price)
        )

        break

      default:

        applyFilter()
        break

    }

  }

  useEffect(() => {

    applyFilter()

  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {

    sortProduct()

  }, [sortType])

  return (

    <div className='bg-gray-50 min-h-screen'>

      {/* ========================= */}
      {/* TOP BANNER */}
      {/* ========================= */}

      <div className='relative mb-10'>

        <img
          src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop'
          alt=""
          className='w-full h-[280px] sm:h-[380px] object-cover'
        />

        <div className='absolute inset-0 bg-black/50 flex items-center'>

          <div className='max-w-7xl mx-auto px-6 w-full'>

            <p className='text-yellow-400 uppercase tracking-[4px] text-sm mb-3'>
              Fashion Collection
            </p>

            <h1 className='text-white text-4xl sm:text-6xl font-bold leading-tight'>
              Discover Premium <br /> Fashion Trends
            </h1>

            <p className='text-gray-200 mt-4 max-w-xl'>
              Discover the latest fashion trends at Stylentra — where premium style meets seamless shopping, fast delivery, secure payments, and a modern ecommerce experience designed for every fashion lover.
            </p>

            <button
              onClick={() => navigate('/')}
              className='mt-6 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition'
            >
              Explore More
            </button>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* MAIN SECTION */}
      {/* ========================= */}

      <div className='flex flex-col lg:flex-row gap-8 px-4 sm:px-8 max-w-7xl mx-auto pb-16'>

        {/* ========================= */}
        {/* FILTER SIDEBAR */}
        {/* ========================= */}

        <div className='lg:w-[260px]'>

          <div className='bg-white rounded-3xl shadow-sm p-6 sticky top-24'>

            <div
              onClick={() => setShowFilter(!showFilter)}
              className='flex items-center justify-between cursor-pointer'
            >

              <h2 className='text-2xl font-bold'>
                Filters
              </h2>

              <img
                src={assets.dropdown_icon}
                alt=""
                className={`w-3 lg:hidden ${showFilter ? 'rotate-90' : ''}`}
              />

            </div>

            <div className={`${showFilter ? 'block' : 'hidden'} lg:block`}>

              {/* CATEGORY */}
              <div className='mt-8'>

                <p className='font-semibold mb-4'>
                  Categories
                </p>

                <div className='flex flex-col gap-3 text-gray-600'>

                  <label className='flex gap-3 items-center cursor-pointer'>

                    <input
                      type='checkbox'
                      value={'Men'}
                      onChange={toggleCategory}
                    />

                    Men

                  </label>

                  <label className='flex gap-3 items-center cursor-pointer'>

                    <input
                      type='checkbox'
                      value={'Women'}
                      onChange={toggleCategory}
                    />

                    Women

                  </label>

                  <label className='flex gap-3 items-center cursor-pointer'>

                    <input
                      type='checkbox'
                      value={'Kids'}
                      onChange={toggleCategory}
                    />

                    Kids

                  </label>

                </div>

              </div>

              {/* TYPE */}
              <div className='mt-8'>

                <p className='font-semibold mb-4'>
                  Product Type
                </p>

                <div className='flex flex-col gap-3 text-gray-600'>

                  <label className='flex gap-3 items-center cursor-pointer'>

                    <input
                      type='checkbox'
                      value={'Topwear'}
                      onChange={toggleSubCategory}
                    />

                    Topwear

                  </label>

                  <label className='flex gap-3 items-center cursor-pointer'>

                    <input
                      type='checkbox'
                      value={'Bottomwear'}
                      onChange={toggleSubCategory}
                    />

                    Bottomwear

                  </label>

                  <label className='flex gap-3 items-center cursor-pointer'>

                    <input
                      type='checkbox'
                      value={'Winterwear'}
                      onChange={toggleSubCategory}
                    />

                    Winterwear

                  </label>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ========================= */}
        {/* PRODUCTS SECTION */}
        {/* ========================= */}

        <div className='flex-1'>

          {/* TOP BAR */}
          <div className='bg-white rounded-3xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>

            <div>

              <h2 className='text-3xl font-bold'>
                All Collections
              </h2>

              <p className='text-gray-500 mt-1'>
                {filterProducts.length} Products Found
              </p>

            </div>

            <select
              onChange={(e) => setSortType(e.target.value)}
              className='border px-4 py-3 rounded-xl outline-none'
            >

              <option value='relevant'>
                Sort By : Relevant
              </option>

              <option value='low-high'>
                Price : Low To High
              </option>

              <option value='high-low'>
                Price : High To Low
              </option>

            </select>

          </div>

          {/* PRODUCT GRID */}
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>

            {filterProducts.map((item, index) => (

              <div
                key={index}
                className='bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 group relative'
              >

                {/* IMAGE */}
                <div className='overflow-hidden relative'>

                  <img
                    onClick={() => navigate(`/product/${item._id}`)}
                    src={item.image[0]}
                    alt=""
                    className='w-full h-72 object-cover cursor-pointer group-hover:scale-110 transition duration-500'
                  />

                  {/* DISCOUNT */}
                  <p className='absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full'>
                    20% OFF
                  </p>

                  {/* WISHLIST */}
                  <button className='absolute top-3 right-3 bg-white p-3 rounded-full shadow hover:bg-red-500 hover:text-white transition'>

                    <FaHeart />

                  </button>

                  {/* QUICK VIEW */}
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center gap-2'
                  >

                    <IoEyeSharp />

                    Quick View

                  </button>

                </div>

                {/* DETAILS */}
                <div className='p-5'>

                  <h3
                    onClick={() => navigate(`/product/${item._id}`)}
                    className='font-semibold text-lg cursor-pointer hover:text-blue-600 transition truncate'
                  >
                    {item.name}
                  </h3>

                  {/* RATING */}
                  <div className='flex items-center gap-2 mt-2'>

                    <div className='flex text-yellow-500 text-sm'>

                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />

                    </div>

                    <span className='text-gray-500 text-sm'>
                      (4.8)
                    </span>

                  </div>

                  {/* PRICE */}
                  <div className='flex items-center gap-3 mt-3'>

                    <p className='text-2xl font-bold'>
                      {currency}{item.price}
                    </p>

                    <p className='text-gray-400 line-through text-sm'>
                      {currency}{item.price + 500}
                    </p>

                  </div>

                  {/* DELIVERY */}
                  <p className='text-green-600 text-sm mt-2'>
                    Free Delivery Available
                  </p>

                  {/* BUTTONS */}
                  <div className='flex flex-col gap-3 mt-5'>

                    <button
                      onClick={() =>
                        addToCart(item._id, item.sizes?.[0] || 'M')
                      }
                      className='w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition'
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className='w-full border py-3 rounded-xl hover:bg-gray-100 transition'
                    >
                      View Product
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )
}

export default Collection
