// ======================================================
// FILE: src/pages/Home.jsx
// BRAND ARCHITECTURE: STYLENTRA FASHION ECOSYSTEM
// PRODUCTION LEVEL UI & PERFORMANCE OPTIMIZED
// ======================================================

import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Eye,
  Clock3,
  BadgePercent,
  Gift,
  Sparkles,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'

const Home = () => {
  const navigate = useNavigate()
  const trendingSliderRef = useRef(null)

  // ======================================================
  // INTERACTIVE STATES (REAL WORKFLOW SIMULATION)
  // ======================================================
  const [wishlist, setWishlist] = useState([])
  const [cartNotification, setCartNotification] = useState(null)
  const [selectedQuickView, setSelectedQuickView] = useState(null)

  // ======================================================
  // FLASH SALE TIMER (STYLENTRA LIGHTNING DEALS)
  // ======================================================
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 18,
    seconds: 32
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              clearInterval(timer)
            }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // ======================================================
  // FUNCTIONAL HANDLERS
  // ======================================================
  const toggleWishlist = (id) => {

    try {

        const existingWishlist =
            JSON.parse(localStorage.getItem('wishlist')) || []

        let updatedWishlist = []

        const itemExists = existingWishlist.some(
            item => String(item) === String(id)
        )

        if (itemExists) {

            updatedWishlist = existingWishlist.filter(
                item => String(item) !== String(id)
            )

            toast.info('Removed from wishlist')

        } else {

            updatedWishlist = [...existingWishlist, id]

            toast.success('Added to wishlist')

        }

        localStorage.setItem(
            'wishlist',
            JSON.stringify(updatedWishlist)
        )

        // IMPORTANT
        window.dispatchEvent(
            new Event('wishlistUpdated')
        )

    } catch (error) {

        console.log(error)

    }

}

  const handleAddToCart = (productName) => {
    setCartNotification(`${productName} added to your Stylentra Bag!`)
    setTimeout(() => setCartNotification(null), 3000)
  }

  const slideProducts = (direction) => {
    if (trendingSliderRef.current) {
      const { scrollLeft, clientWidth } = trendingSliderRef.current
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2
      trendingSliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  // ======================================================
  // STYLENTRA HIGH-CONVERSION PRODUCT METADATA
  // ======================================================
  const categories = [
    { name: 'Men Wear', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80', subtitle: 'Min. 40% OFF' },
    { name: 'Women Wear', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80', subtitle: 'Flat 50% OFF' },
    { name: 'Kids Fashion', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80', subtitle: 'Under ₹799' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80', subtitle: 'Trending Kicks' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', subtitle: 'Luxury Picks' },
    { name: 'Winter Collection', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80', subtitle: 'Up to 70% OFF' }
  ]

  const trendingProducts = [
    { id: 1, title: 'Stylentra Premium Oversized Soft Knit Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80', price: 1199, oldPrice: 3999, rating: 4.8, reviews: '1,420', badge: '70% OFF DEAL' },
    { id: 2, title: 'Street-Paced Aero Cushion Tech Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', price: 2999, oldPrice: 5999, rating: 4.9, reviews: '890', badge: 'Lightning Deal' },
    { id: 3, title: 'Stylentra Weatherproof Classic Varsity Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80', price: 2399, oldPrice: 7999, rating: 4.7, reviews: '2,150', badge: '70% OFF DEAL' },
    { id: 4, title: 'Minimalist Stealth Chronograph Leather Watch', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80', price: 2699, oldPrice: 8999, rating: 4.9, reviews: '540', badge: 'Top Rated' },
    { id: 5, title: 'Urban Casual Distressed Slim-Fit Denim Jacket', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80', price: 1499, oldPrice: 4999, rating: 4.6, reviews: '912', badge: '70% OFF DEAL' }
  ]

  return (
    <div className='bg-[#F4F6F6] min-h-screen text-gray-900 font-sans relative antialiased'>
      
      {/* ====================================================== */}
      {/* LIVE INTERACTIVE FLOATING CART ALERT */}
      {/* ====================================================== */}
      {cartNotification && (
        <div className='fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-800 animate-in fade-in slide-in-from-bottom-5 duration-200'>
          <CheckCircle className='text-emerald-400' size={18} />
          <span className='text-xs md:text-sm font-semibold tracking-wide'>{cartNotification}</span>
        </div>
      )}

      {/* ====================================================== */}
      {/* TOP NOTIFICATION BANNER */}
      {/* ====================================================== */}
      <div className='bg-[#0F1111] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-3'>
        <div className='bg-red-600 text-white font-black px-2 py-0.5 rounded text-[10px] tracking-widest uppercase'>
          LIVE
        </div>
        <p className='text-gray-300 tracking-wide'>
          <BadgePercent size={16} className='text-red-500 inline mr-1 align-middle' />
          The Stylentra Grand Launch Event: Save flat <span className='text-white font-extrabold text-red-500'>70% OFF</span> on marked luxury items!
        </p>
      </div>

      {/* ====================================================== */}
      {/* HERO HERO SECTION WITH SMOOTH BOTTOM BLEND */}
      {/* ====================================================== */}
      <div className='relative z-0 select-none'>
        <Hero />
        <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F4F6F6] to-transparent hidden md:block' />
      </div>

      {/* ====================================================== */}
      {/* STYLENTRA LOGO BRANDING & GRID CARDS ENTRY */}
      {/* ====================================================== */}
      <div className='max-w-[1440px] mx-auto px-4 -mt-12 md:-mt-24 relative z-10 mb-8'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 p-6 bg-white/95 backdrop-blur-sm'>
          <div className='flex items-center gap-4 p-3'>
            <div className='p-3 bg-red-50 rounded-xl text-red-600'><Truck size={24} /></div>
            <div>
              <h3 className='font-bold text-sm md:text-base text-neutral-800'>Free Priority Shipping</h3>
              <p className='text-xs text-gray-500 mt-0.5'>Automatically applied storewide</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-3'>
            <div className='p-3 bg-emerald-50 rounded-xl text-emerald-600'><ShieldCheck size={24} /></div>
            <div>
              <h3 className='font-bold text-sm md:text-base text-neutral-800'>Secure Gateways</h3>
              <p className='text-xs text-gray-500 mt-0.5'>100% Protected standard escrow</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-3'>
            <div className='p-3 bg-blue-50 rounded-xl text-blue-600'><RotateCcw size={24} /></div>
            <div>
              <h3 className='font-bold text-sm md:text-base text-neutral-800'>Instant Replacements</h3>
              <p className='text-xs text-gray-500 mt-0.5'>7-day completely free policy</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-3'>
            <div className='p-3 bg-amber-50 rounded-xl text-amber-600'><Headphones size={24} /></div>
            <div>
              <h3 className='font-bold text-sm md:text-base text-neutral-800'>Concierge 24/7 Support</h3>
              <p className='text-xs text-gray-500 mt-0.5'>Direct technical chat assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* STYLENTRA HERO 70% OFF LIQUIDATION ROW */}
      {/* ====================================================== */}
      <div className='max-w-[1440px] mx-auto px-4 mb-10'>
        <div className='relative rounded-2xl overflow-hidden border border-red-900/40 shadow-xl bg-neutral-900'>
          
          {/* HIGH CONVERSION COMMERCIAL HERO BACKGROUND LAYOUT */}
          <div className='absolute inset-0 z-0'>
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80" 
              alt="Premium Warehouse Background" 
              className='w-full h-full object-cover object-center opacity-25 filter grayscale scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-[#5c0d0d] via-[#1a0505] to-black/90' />
          </div>

          <div className='relative z-10 p-6 md:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8'>
            <div className='space-y-4 max-w-2xl'>
              <div className='inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-500/30 text-xs font-bold text-red-300 tracking-wider uppercase'>
                <Zap size={14} className='fill-current text-red-400' />
                STYLENTRA WAREHOUSE CLEARANCE
              </div>
              
              {/* BRANDED TITLE */}
              <h2 className='text-3xl md:text-6xl font-black tracking-tight text-white leading-none'>
                FLAT <span className='text-red-500 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400 font-extrabold'>70% DISCOUNT</span> STORES
              </h2>
              
              <p className='text-red-100/80 text-sm md:text-base leading-relaxed font-normal'>
                Experience the launch of <span className='text-white font-bold tracking-wide'>Stylentra</span>. Get premium fashion staples, structural hoodies, and tailored outerwear elements with maximum liquidation price reductions directly applied.
              </p>
              
              <button
                onClick={() => navigate('/collection')}
                className='bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition-all text-xs tracking-widest uppercase'
              >
                Claim Launch Discount
              </button>
            </div>

            {/* LIGHTNING INTERACTIVE TIMER OVERLAY */}
            <div className='flex flex-col items-start bg-black/40 backdrop-blur-md p-5 md:p-6 rounded-xl border border-white/10 w-full lg:w-auto font-mono'>
              <div className='text-xs text-red-300 font-bold tracking-wider uppercase flex items-center gap-1.5 mb-2.5'>
                <Clock3 size={12} /> ALLOTMENT RESERVATION WINDOW:
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-neutral-950 rounded-lg px-3.5 py-3 border border-neutral-800 text-center min-w-[65px]'>
                  <span className='text-2xl md:text-3xl font-black text-white block'>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className='text-[9px] text-gray-400 uppercase tracking-wider block mt-0.5'>Hours</span>
                </div>
                <span className='text-xl font-bold text-red-500 animate-pulse'>:</span>
                <div className='bg-neutral-950 rounded-lg px-3.5 py-3 border border-neutral-800 text-center min-w-[65px]'>
                  <span className='text-2xl md:text-3xl font-black text-white block'>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className='text-[9px] text-gray-400 uppercase tracking-wider block mt-0.5'>Mins</span>
                </div>
                <span className='text-xl font-bold text-red-500 animate-pulse'>:</span>
                <div className='bg-neutral-950 rounded-lg px-3.5 py-3 border border-neutral-800 text-center min-w-[65px]'>
                  <span className='text-2xl md:text-3xl font-black text-red-500 block'>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className='text-[9px] text-gray-400 uppercase tracking-wider block mt-0.5'>Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* SHOP BY CATEGORY */}
      {/* ====================================================== */}
      <div className='max-w-[1440px] mx-auto px-4 mb-10'>
        <div className='bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200'>
          <div className='flex justify-between items-end mb-6 border-b border-gray-100 pb-5'>
            <div>
              <h2 className='text-2xl font-black tracking-tight text-neutral-900'>
                Browse Collections
              </h2>
              <p className='text-xs md:text-sm text-gray-500 mt-0.5'>High velocity category listings verified by buyer intent loops</p>
            </div>
            <button
              onClick={() => navigate('/collection')}
              className='text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 group tracking-wider uppercase'
            >
              See All Directories
              <ArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
            </button>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate('/collection')}
                className='group cursor-pointer bg-neutral-50 rounded-xl overflow-hidden border border-gray-200/70 hover:border-red-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between'
              >
                <div className='overflow-hidden relative bg-neutral-100 aspect-square'>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className='h-full w-full object-cover object-top group-hover:scale-103 transition-transform duration-500'
                  />
                </div>
                <div className='p-3 text-center bg-white border-t border-gray-100'>
                  <h3 className='font-bold text-xs md:text-sm text-neutral-800 line-clamp-1'>
                    {item.name}
                  </h3>
                  <p className='text-[10px] font-bold text-red-600 bg-red-50 rounded-md py-0.5 inline-block px-2 mt-1 border border-red-100/50'>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* TRENDING PRODUCTS CAROUSEL ROW */}
      {/* ====================================================== */}
      <div className='max-w-[1440px] mx-auto px-4 mb-10 relative group/slider'>
        <div className='bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200'>
          
          <div className='flex justify-between items-center mb-6 border-b border-gray-100 pb-5'>
            <div>
              <h2 className='text-2xl font-black tracking-tight text-neutral-900 flex items-center gap-2'>
                <TrendingUp className='text-red-600' size={22} /> Stylentra Launch Deals
              </h2>
              <p className='text-xs md:text-sm text-gray-500 mt-0.5'>Real-time premium stock catalog showing verified 70% liquidations</p>
            </div>
            
            <div className='flex gap-1.5 opacity-100 sm:opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200'>
              <button 
                onClick={() => slideProducts('left')}
                className='bg-neutral-50 p-2 rounded-full text-neutral-700 hover:bg-neutral-900 hover:text-white border border-gray-200 shadow-sm transition'
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => slideProducts('right')}
                className='bg-neutral-50 p-2 rounded-full text-neutral-700 hover:bg-neutral-900 hover:text-white border border-gray-200 shadow-sm transition'
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div 
            ref={trendingSliderRef}
            className='flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className='min-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 snap-start flex flex-col justify-between group'
              >
                <div className='relative overflow-hidden bg-neutral-50 aspect-[4/5]'>
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className='w-full h-full object-cover object-top'
                  />

                  {product.badge && (
                    <div className='absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded text-[10px] font-black tracking-wider uppercase border border-red-500 shadow-md'>
                      {product.badge}
                    </div>
                  )}

                  <div className='absolute top-3 right-3 flex flex-col gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10'>
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full shadow-md border transition ${
                        wishlist.includes(product.id) 
                          ? 'bg-red-600 border-red-700 text-white' 
                          : 'bg-white/90 border-gray-200 text-neutral-700 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <Heart size={14} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                    </button>
                    <button 
                      onClick={() => setSelectedQuickView(product)}
                      className='bg-white/90 border border-gray-200 p-2 rounded-full shadow-md text-neutral-700 hover:bg-neutral-900 hover:text-white transition'
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </div>

                <div className='p-4 border-t border-gray-50 flex-1 flex flex-col justify-between'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-1'>
                      <div className='flex items-center text-amber-400'><Star className='fill-current' size={12} /></div>
                      <span className='text-xs font-bold text-neutral-800'>{product.rating}</span>
                      <span className='text-xs text-gray-400'>({product.reviews})</span>
                    </div>

                    <h3 className='font-bold text-xs sm:text-sm text-neutral-800 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors'>
                      {product.title}
                    </h3>
                  </div>

                  <div className='mt-4 pt-3 border-t border-gray-100'>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-lg font-black text-neutral-900'>₹{product.price}</span>
                      <span className='text-xs text-gray-400 line-through font-medium'>₹{product.oldPrice}</span>
                      <span className='text-[10px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100'>
                        SAVE 70%
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.title)}
                      className='mt-3 w-full bg-neutral-900 text-white hover:bg-red-600 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs shadow-sm transition-all active:scale-98'
                    >
                      <ShoppingBag size={14} />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* SECONDARY CORE PLUGINS */}
      {/* ====================================================== */}
      <div className='space-y-10 max-w-[1440px] mx-auto px-4 mb-10'>
        <div className='bg-white rounded-xl p-2 md:p-6 shadow-sm border border-gray-200 overflow-hidden'>
          <LatestCollection />
        </div>

        {/* BRANDS ADVERTISING STRIP */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 relative rounded-xl overflow-hidden min-h-[300px] shadow-sm border border-gray-200 group/banner'>
            <img
              src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80'
              alt="Stylentra Lookbook"
              loading="lazy"
              className='absolute inset-0 w-full h-full object-cover group-hover/banner:scale-101 transition-transform duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent' />
            <div className='absolute inset-0 p-8 md:p-10 flex flex-col justify-center items-start text-white space-y-3 max-w-lg'>
              <div className='flex items-center gap-1.5 text-amber-400 font-bold text-xs tracking-widest uppercase'>
                <Sparkles size={14} /> STYLENTRA PREMIUM INDEX
              </div>
              <h2 className='text-3xl font-black leading-tight tracking-tight'>
                Redefining Contemporary Casual Silhouettes
              </h2>
              <button
                onClick={() => navigate('/collection')}
                className='bg-white text-neutral-950 font-bold px-5 py-2.5 rounded-xl hover:bg-neutral-50 transition text-xs tracking-wider uppercase'
              >
                View Catalog
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
            <div className='bg-[#0F1111] rounded-xl p-5 text-white flex flex-col justify-between border border-neutral-800 shadow-sm'>
              <div className='flex justify-between items-start'>
                <div className='p-2.5 bg-white/5 rounded-lg text-amber-400 border border-white/10'><Gift size={20} /></div>
                <span className='text-[9px] font-bold bg-amber-400 text-neutral-900 px-2 py-0.5 rounded tracking-wider uppercase'>PREMIUM PERK</span>
              </div>
              <div className='mt-2'>
                <h3 className='text-base font-bold tracking-tight'>Instant Wallet Cashbacks</h3>
                <p className='text-xs text-gray-400 mt-1 leading-relaxed'>Get flat ₹500 discount credits loaded automatically upon new account creation checks.</p>
              </div>
              <button className='text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start group mt-2'>
                Activate Wallet <ArrowRight size={12} className='group-hover:translate-x-0.5 transition-transform' />
              </button>
            </div>

            <div className='bg-gradient-to-br from-red-950 to-neutral-950 rounded-xl p-5 text-white flex flex-col justify-between border border-red-900/30 shadow-sm'>
              <div className='flex justify-between items-start'>
                <div className='p-2.5 bg-white/5 rounded-lg text-red-400 border border-white/10'><Clock3 size={20} /></div>
                <span className='text-[9px] font-bold bg-white text-red-900 px-2 py-0.5 rounded tracking-wider uppercase'>STOCK STATUS</span>
              </div>
              <div className='mt-2'>
                <h3 className='text-base font-bold tracking-tight'>Volatile Allocation Drops</h3>
                <p className='text-xs text-red-200/70 mt-1 leading-relaxed'>High inventory demand cycles. Selected 70% items lock up indefinitely when out of stock.</p>
              </div>
              <button 
                onClick={() => navigate('/collection')}
                className='bg-white text-red-950 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-neutral-50 transition mt-2 self-start'
              >
                Lock Current Cart
              </button>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl p-2 md:p-6 shadow-sm border border-gray-200 overflow-hidden'>
          <BestSeller />
        </div>
      </div>

      {/* ====================================================== */}
      {/* BRAND METRICS STATEMENT */}
      {/* ====================================================== */}
      <div className='max-w-[1440px] mx-auto px-4 mb-10'>
        <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100'>
            <div className='space-y-0.5 p-1'>
              <div className='text-2xl md:text-3xl font-black text-neutral-900 tracking-tight'>STYLENTRA</div>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Official Label</p>
            </div>
            <div className='space-y-0.5 p-1'>
              <div className='text-2xl md:text-3xl font-black text-neutral-900 tracking-tight'>100%</div>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Genuine Fabric</p>
            </div>
            <div className='space-y-0.5 p-1'>
              <div className='text-2xl md:text-3xl font-black text-neutral-900 tracking-tight'>7 Days</div>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Easy Exchange</p>
            </div>
            <div className='space-y-0.5 p-1'>
              <div className='text-2xl md:text-3xl font-black text-neutral-900 tracking-tight'>Direct</div>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Warehouse Fulfilled</p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* CLOSING CORE COMPONENT STREAMS */}
      {/* ====================================================== */}
      <div className='bg-white border-t border-gray-200'>
        <div className='max-w-[1440px] mx-auto px-4 py-6'>
          <OurPolicy />
        </div>
      </div>

      <div className='bg-[#0F1111] text-white border-t border-neutral-800'>
        <div className='max-w-[1440px] mx-auto py-10'>
          <NewLetterBox />
        </div>
      </div>

      {/* ====================================================== */}
      {/* INTERACTIVE MODAL INTERFACE (QUICK VIEW MODULE) */}
      {/* ====================================================== */}
      {selectedQuickView && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4' onClick={() => setSelectedQuickView(null)}>
          <div className='bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100 animate-in fade-in zoom-in-95 duration-150' onClick={e => e.stopPropagation()}>
            <div className='w-full md:w-1/2 bg-neutral-50 aspect-square max-h-[300px] md:max-h-full relative'>
              <img src={selectedQuickView.image} alt={selectedQuickView.title} className='w-full h-full object-cover object-top' />
            </div>
            <div className='w-full md:w-1/2 p-5 flex flex-col justify-between space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between items-start gap-4'>
                  <span className='bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider border border-red-100'>{selectedQuickView.badge || 'Stylentra Original'}</span>
                  <button onClick={() => setSelectedQuickView(null)} className='text-gray-400 hover:text-neutral-900 font-bold text-lg leading-none p-1'>&times;</button>
                </div>
                <h2 className='text-lg font-black tracking-tight text-neutral-900 leading-snug'>{selectedQuickView.title}</h2>
                <div className='flex items-center gap-1.5 text-xs font-bold text-neutral-800'>
                  <Star className='fill-current text-amber-400' size={12} />
                  <span>{selectedQuickView.rating}</span>
                  <span className='text-gray-400 font-medium'>({selectedQuickView.reviews} reviews)</span>
                </div>
                <p className='text-[11px] text-gray-500 leading-relaxed pt-1'>
                  Item runs completely true to standard retail dimensions. Crafted via audited mills and optimized for everyday versatile longevity cycles.
                </p>
              </div>

              <div className='pt-3 border-t border-gray-100'>
                <div className='flex items-baseline gap-2 mb-3'>
                  <span className='text-xl font-black text-neutral-900'>₹{selectedQuickView.price}</span>
                  <span className='text-xs text-gray-400 line-through font-medium'>₹{selectedQuickView.oldPrice}</span>
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(selectedQuickView.title)
                    setSelectedQuickView(null)
                  }}
                  className='w-full bg-neutral-900 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm transition'
                >
                  <ShoppingBag size={14} /> Add to Bag Securely
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home