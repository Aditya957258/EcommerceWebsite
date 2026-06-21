import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import NewLetterBox from '../components/NewLetterBox'

const Contact = () => {

  // ===============================
  // FORM STATE
  // ===============================
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleSubmit = (e) => {

    e.preventDefault()

    // EMPTY VALIDATION
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {

      toast.error('Please fill all details')
      return
    }

    // EMAIL VALIDATION
    if (!formData.email.includes('@')) {

      toast.error('Please enter valid email')
      return
    }

    // SUCCESS
    toast.success('🎉 Message Sent Successfully')

    // RESET FORM
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  // ===============================
  // FEATURES
  // ===============================
  const features = [
    {
      title: "24/7 Support",
      desc: "Our support team is always available to help customers anytime.",
      icon: "📞"
    },
    {
      title: "Fast Response",
      desc: "Get quick replies for orders, payments and account issues.",
      icon: "⚡"
    },
    {
      title: "Secure Assistance",
      desc: "Your information is protected with secure customer support.",
      icon: "🔒"
    },
    {
      title: "Live Order Tracking",
      desc: "Track every order in real-time from your orders section.",
      icon: "🚚"
    }
  ]

  return (

    <div className='pt-10 min-h-screen'>

      {/* =============================== */}
      {/* HERO SECTION */}
      {/* =============================== */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-24'>

        {/* LEFT */}
        <div>

          <p className='text-sm uppercase tracking-[4px] text-gray-500 mb-3'>
            Contact Stylentra
          </p>

          <h1 className='text-4xl sm:text-5xl font-bold leading-tight mb-6'>
            We Are Always
            <br />
            Here To Help
          </h1>

          <p className='text-gray-600 leading-7 mb-6'>
            Have questions about products, orders, payments or delivery?
            Our dedicated support team is available 24/7 to provide the
            best shopping assistance experience.
          </p>

          {/* CONTACT BOXES */}

          <div className='flex flex-col gap-4'>

            {/* ADDRESS */}
            <div className='flex items-center gap-4 border rounded-2xl p-4 hover:shadow-lg transition'>

              <div className='text-3xl'>
                📍
              </div>

              <div>

                <h3 className='font-semibold text-lg'>
                  Office Address
                </h3>

                <p className='text-gray-500'>
                  Stylentra Fashion Hub, India
                </p>

              </div>

            </div>

            {/* PHONE */}
            <div className='flex items-center gap-4 border rounded-2xl p-4 hover:shadow-lg transition'>

              <div className='text-3xl'>
                📞
              </div>

              <div>

                <h3 className='font-semibold text-lg'>
                  Customer Support
                </h3>

                <p className='text-gray-500'>
                  +91 8651786912
                </p>

              </div>

            </div>

            {/* EMAIL */}
            <div className='flex items-center gap-4 border rounded-2xl p-4 hover:shadow-lg transition'>

              <div className='text-3xl'>
                ✉️
              </div>

              <div>

                <h3 className='font-semibold text-lg'>
                  Email Support
                </h3>

                <p className='text-gray-500'>
                  aditya957258@gmail.com
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div>

          <img
            src={assets.contact_img}
            alt=""
            className='w-full rounded-3xl shadow-xl'
          />

        </div>

      </div>

      {/* =============================== */}
      {/* CONTACT FORM SECTION */}
      {/* =============================== */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24'>

        {/* FORM */}
        <div className='border rounded-3xl p-8 shadow-sm bg-white'>

          <p className='text-sm uppercase tracking-[4px] text-gray-500 mb-3'>
            Send Message
          </p>

          <h2 className='text-3xl font-bold mb-8'>
            Get In Touch
          </h2>

          <form onSubmit={handleSubmit}>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>

              <input
                type="text"
                name='name'
                placeholder='Your Name'
                value={formData.name}
                onChange={handleChange}
                className='border p-4 rounded-2xl outline-none'
              />

              <input
                type="email"
                name='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleChange}
                className='border p-4 rounded-2xl outline-none'
              />

            </div>

            <input
              type="text"
              name='subject'
              placeholder='Subject'
              value={formData.subject}
              onChange={handleChange}
              className='border p-4 rounded-2xl outline-none w-full mb-4'
            />

            <textarea
              name='message'
              placeholder='Write your message...'
              value={formData.message}
              onChange={handleChange}
              className='border p-4 rounded-2xl outline-none w-full h-40 resize-none mb-5'
            />

            <button
              type='submit'
              className='bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition w-full'
            >
              Send Message
            </button>

          </form>

        </div>

        {/* SUPPORT SECTION */}
        <div className='flex flex-col gap-6'>

          {/* SUPPORT HOURS */}
          <div className='border rounded-3xl p-8 hover:shadow-xl transition'>

            <h2 className='text-2xl font-bold mb-5'>
              Customer Support Hours
            </h2>

            <div className='flex justify-between mb-4 text-gray-600'>

              <span>Monday - Friday</span>
              <span>9:00 AM - 10:00 PM</span>

            </div>

            <div className='flex justify-between mb-4 text-gray-600'>

              <span>Saturday</span>
              <span>10:00 AM - 8:00 PM</span>

            </div>

            <div className='flex justify-between text-gray-600'>

              <span>Sunday</span>
              <span>Emergency Support</span>

            </div>

          </div>

          {/* LIVE SUPPORT */}
          <div className='bg-black text-white rounded-3xl p-8'>

            <p className='text-sm uppercase tracking-[4px] text-gray-300 mb-3'>
              Live Support
            </p>

            <h2 className='text-3xl font-bold mb-4'>
              Need Instant Help?
            </h2>

            <p className='text-gray-300 leading-7 mb-6'>
              Connect instantly with Stylentra support team for
              order tracking, payment issues, return requests and
              shopping assistance.
            </p>

            <button
              onClick={() => {
                window.open(
                  'https://wa.me/918651786912',
                  '_blank'
                )
              }}
              className='bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition'
            >
              Live Chat Support
            </button>

          </div>

        </div>

      </div>

      {/* =============================== */}
      {/* FEATURES SECTION */}
      {/* =============================== */}

      <div className='mb-24'>

        <div className='text-center mb-12'>

          <p className='text-sm uppercase tracking-[4px] text-gray-500 mb-3'>
            Why Customers Trust Us
          </p>

          <h2 className='text-4xl font-bold'>
            Premium Customer Support
          </h2>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

          {features.map((item, index) => (

            <div
              key={index}
              className='border rounded-3xl p-7 hover:shadow-2xl transition bg-white'
            >

              <div className='text-5xl mb-5'>
                {item.icon}
              </div>

              <h3 className='text-2xl font-semibold mb-3'>
                {item.title}
              </h3>

              <p className='text-gray-600 leading-7'>
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* =============================== */}
      {/* FAQ SECTION */}
      {/* =============================== */}

      <div className='mb-24'>

        <div className='text-center mb-12'>

          <p className='text-sm uppercase tracking-[4px] text-gray-500 mb-3'>
            Frequently Asked Questions
          </p>

          <h2 className='text-4xl font-bold'>
            Quick Answers
          </h2>

        </div>

        <div className='flex flex-col gap-5'>

          {/* FAQ 1 */}
          <div className='border rounded-2xl p-6 hover:shadow-lg transition'>

            <h3 className='text-xl font-semibold mb-2'>
              How can I track my order?
            </h3>

            <p className='text-gray-600'>
              Go to My Orders section and click on Track Order
              to view live delivery updates.
            </p>

          </div>

          {/* FAQ 2 */}
          <div className='border rounded-2xl p-6 hover:shadow-lg transition'>

            <h3 className='text-xl font-semibold mb-2'>
              Which payment methods are supported?
            </h3>

            <p className='text-gray-600'>
              We support UPI, Debit Card, Credit Card and Cash on Delivery.
            </p>

          </div>

          {/* FAQ 3 */}
          <div className='border rounded-2xl p-6 hover:shadow-lg transition'>

            <h3 className='text-xl font-semibold mb-2'>
              Can I cancel my order?
            </h3>

            <p className='text-gray-600'>
              Yes, you can cancel orders before shipment from My Orders section.
            </p>

          </div>

        </div>

      </div>

      {/* =============================== */}
      {/* NEWSLETTER */}
      {/* =============================== */}

      <NewLetterBox />

    </div>
  )
}

export default Contact