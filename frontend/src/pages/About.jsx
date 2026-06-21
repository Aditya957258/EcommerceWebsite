import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import NewLetterBox from '../components/NewLetterBox'

const About = () => {

  const navigate = useNavigate()

  const features = [
    {
      title: "Fast Delivery",
      desc: "Get your fashion products delivered quickly with live order tracking.",
      icon: "🚚"
    },
    {
      title: "Secure Payments",
      desc: "100% secure checkout with UPI, Cards and Cash on Delivery support.",
      icon: "🔒"
    },
    {
      title: "Premium Fashion",
      desc: "Discover trending collections inspired by modern global fashion.",
      icon: "✨"
    },
    {
      title: "Easy Returns",
      desc: "Simple and hassle-free return policy for customer satisfaction.",
      icon: "↩️"
    }
  ]

  const stats = [
    {
      number: "10K+",
      title: "Happy Customers"
    },
    {
      number: "5K+",
      title: "Products"
    },
    {
      number: "100+",
      title: "Top Brands"
    },
    {
      number: "24/7",
      title: "Support"
    }
  ]

  const services = [
    "Live Order Tracking",
    "Secure Checkout",
    "Fast Shipping",
    "Premium Collections",
    "Easy Refund Policy",
    "24/7 Customer Support"
  ]

  return (

    <div className='pt-10 min-h-screen'>

      {/* ================= NEW: HERO IMAGE BANNER ================= */}
      <div className='mb-20 relative'>

        <img
          src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd49"
          className='w-full h-64 sm:h-80 object-cover rounded-2xl'
          alt=""
        />

        <div className='absolute inset-0 bg-black/40 rounded-2xl flex items-center px-8'>

          <div>
            <h1 className='text-white text-3xl sm:text-5xl font-bold'>
              About Stylentra
            </h1>
            <p className='text-gray-200 mt-2'>
              Inspired by Amazon • Built for Fashion Lovers
            </p>
          </div>

        </div>

      </div>

      {/* HERO SECTION (YOUR OLD - KEPT SAME) */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-24'>

        <div>

          <p className='text-sm uppercase tracking-[4px] text-gray-500 mb-3'>
            Welcome To Stylentra
          </p>

          <h1 className='text-4xl sm:text-5xl font-bold leading-tight mb-6'>
            Premium Fashion
            <br />
            Shopping Experience
          </h1>

          <p className='text-gray-600 leading-7 mb-6'>
            Stylentra is a modern e-commerce fashion platform inspired by
            shopping experiences like Amazon and Flipkart.
          </p>

          <div className='flex flex-wrap gap-4'>

            <button
              onClick={() => navigate('/collection')}
              className='bg-black text-white px-7 py-3 rounded-xl hover:bg-gray-800 transition'
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate('/contact')}
              className='border px-7 py-3 rounded-xl hover:bg-black hover:text-white transition'
            >
              Contact Us
            </button>

          </div>

        </div>

        <div>

          <img
            src={assets.about_img}
            alt=""
            className='w-full rounded-3xl shadow-xl'
          />

        </div>

      </div>

      {/* ================= NEW: TRUST IMAGE STRIP ================= */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-20'>

        <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" className='w-20 mx-auto opacity-70' />
        <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" className='w-20 mx-auto opacity-70' />
        <img src="https://cdn-icons-png.flaticon.com/512/891/891419.png" className='w-20 mx-auto opacity-70' />
        <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" className='w-20 mx-auto opacity-70' />

      </div>

      {/* STATS (UNCHANGED) */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mb-24'>

        {stats.map((item, index) => (

          <div key={index} className='border rounded-2xl p-7 text-center hover:shadow-xl transition bg-white'>

            <h2 className='text-4xl font-bold mb-2'>{item.number}</h2>
            <p className='text-gray-500'>{item.title}</p>

          </div>

        ))}

      </div>

      {/* ABOUT CONTENT (UNCHANGED) */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-24'>

        <div>
          <img src={assets.hero_img} className='rounded-3xl shadow-lg' />
        </div>

        <div>

          <p className='text-sm uppercase tracking-[4px] text-gray-500 mb-3'>
            About Stylentra
          </p>

          <h2 className='text-4xl font-bold mb-6'>
            Fashion Meets Innovation
          </h2>

          <p className='text-gray-600 leading-7 mb-5'>
            Stylentra provides modern online shopping solutions.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

            {services.map((service, index) => (

              <div key={index} className='flex items-center gap-3 border rounded-xl p-4'>

                <div className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center'>
                  ✓
                </div>

                <p className='font-medium text-gray-700'>{service}</p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* FEATURES (UNCHANGED) */}
      <div className='mb-24 text-center'>

        <h2 className='text-4xl font-bold mb-12'>
          Advanced Shopping Features
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

          {features.map((item, index) => (

            <div key={index} className='border rounded-3xl p-7 bg-white'>

              <div className='text-5xl mb-5'>{item.icon}</div>
              <h3 className='text-2xl font-semibold mb-3'>{item.title}</h3>
              <p className='text-gray-600'>{item.desc}</p>

            </div>

          ))}

        </div>

      </div>

      {/* ADVANCED SECTION (UNCHANGED) */}
      <div className='bg-black text-white rounded-3xl p-10 mb-24'>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>

          <div>

            <h2 className='text-4xl font-bold mb-6'>
              Experience The Future Of Online Fashion
            </h2>

            <button
              onClick={() => navigate('/collection')}
              className='bg-white text-black px-8 py-4 rounded-2xl font-semibold'
            >
              Explore Collection
            </button>

          </div>

          <div className='grid grid-cols-2 gap-5'>

            <div className='bg-white/10 p-6 rounded-2xl text-center'>
              <h2 className='text-3xl font-bold'>99%</h2>
            </div>

            <div className='bg-white/10 p-6 rounded-2xl text-center'>
              <h2 className='text-3xl font-bold'>24H</h2>
            </div>

            <div className='bg-white/10 p-6 rounded-2xl text-center'>
              <h2 className='text-3xl font-bold'>100%</h2>
            </div>

            <div className='bg-white/10 p-6 rounded-2xl text-center'>
              <h2 className='text-3xl font-bold'>24/7</h2>
            </div>

          </div>

        </div>

      </div>

      <NewLetterBox />

    </div>
  )
}

export default About