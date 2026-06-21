import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'))

        if (!currentUser) {
            toast.error("Please login first")
            navigate('/login')
        } else {
            setUser(currentUser)
        }

    }, [])

    if (!user) return null

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
        toast.success("Logged out successfully")
        navigate('/login')
    }

    return (
        <div className='min-h-screen bg-gray-100'>

            {/* 🔥 BANNER IMAGE (LIKE HOME PAGE HERO) */}
            <div className='w-full h-48 sm:h-64 relative'>

                <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    className='w-full h-full object-cover'
                    alt="banner"
                />

                <div className='absolute inset-0 bg-black/40 flex items-center px-6'>
                    <h1 className='text-white text-2xl sm:text-4xl font-bold'>
                        Welcome Back, {user.name}
                    </h1>
                </div>

            </div>

            {/* MAIN CONTENT */}
            <div className='max-w-6xl mx-auto p-6'>

                {/* USER CARD */}
                <div className='bg-white shadow rounded-xl p-6 flex items-center gap-5 -mt-16 relative z-10'>

                    <div className='w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold'>
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className='text-xl font-semibold'>
                            {user.name}
                        </h2>
                        <p className='text-gray-500 break-all'>
                            {user.email}
                        </p>
                        <p className='text-green-600 text-sm mt-1'>
                            Prime Member (Demo)
                        </p>
                    </div>

                </div>

                {/* GRID CARDS (LIKE HOME PAGE SECTIONS) */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8'>

                    {/* ORDERS CARD */}
                    <div
                        onClick={() => navigate('/orders')}
                        className='bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden'
                    >
                        <img
                            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
                            className='h-32 w-full object-cover'
                            alt=""
                        />

                        <div className='p-4'>
                            <h3 className='font-semibold'>My Orders</h3>
                            <p className='text-sm text-gray-500'>
                                Track your purchases easily
                            </p>
                        </div>
                    </div>

                    {/* CART CARD */}
                    <div
                        onClick={() => navigate('/cart')}
                        className='bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden'
                    >
                        <img
                            src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
                            className='h-32 w-full object-cover'
                            alt=""
                        />

                        <div className='p-4'>
                            <h3 className='font-semibold'>My Cart</h3>
                            <p className='text-sm text-gray-500'>
                                View saved items
                            </p>
                        </div>
                    </div>

                    {/* PROFILE INFO CARD */}
                    <div className='bg-white rounded-xl shadow overflow-hidden'>

                        <img
                            src="https://images.unsplash.com/photo-1520975922284-9a3d9f3f5c1a"
                            className='h-32 w-full object-cover'
                            alt=""
                        />

                        <div className='p-4 text-sm'>

                            <h3 className='font-semibold mb-2'>Account Details</h3>

                            <p className='flex justify-between'>
                                Name <span className='font-medium'>{user.name}</span>
                            </p>

                            <p className='flex justify-between mt-1'>
                                Email <span className='font-medium break-all'>{user.email}</span>
                            </p>

                        </div>

                    </div>

                </div>

                {/* SETTINGS SECTION */}
                <div className='mt-8 bg-white p-6 rounded-xl shadow flex justify-between items-center'>

                    <div>
                        <h3 className='font-semibold'>Account Settings</h3>
                        <p className='text-sm text-gray-500'>
                            Manage your profile and security
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600'
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Profile