import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'

import {
    Link,
    NavLink,
    useLocation,
    useNavigate
} from 'react-router-dom'

import {
    FaSearch,
    FaShoppingBag,
    FaBars,
    FaTimes,
    FaUserCircle,
    FaHeart,
    FaBoxOpen,
    FaSignOutAlt,
    FaChevronDown,
    FaEnvelope,
    FaInfoCircle,
    FaHome
} from 'react-icons/fa'

import {
    AnimatePresence,
    motion
} from 'framer-motion'

import { toast } from 'react-toastify'

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation()

    // =========================================
    // CONTEXT
    // =========================================

    const {
        setShowSearch,
        getCartCount
    } = useContext(ShopContext)

    // =========================================
    // STATES
    // =========================================

    const [visible, setVisible] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [wishlistCount, setWishlistCount] = useState(0)

    const profileRef = useRef()

    // =========================================
    // USER
    // =========================================

    const [user, setUser] = useState(null)

    useEffect(() => {

        const currentUser =
            JSON.parse(localStorage.getItem('currentUser'))

        if (currentUser) {
            setUser(currentUser)
        }

    }, [])

    // =========================================
    // SCROLL EFFECT
    // =========================================

    useEffect(() => {

        const handleScroll = () => {

            setIsScrolled(window.scrollY > 15)

        }

        window.addEventListener('scroll', handleScroll)

        return () =>
            window.removeEventListener('scroll', handleScroll)

    }, [])

    // =========================================
    // CLOSE PROFILE ON OUTSIDE CLICK
    // =========================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false)
            }

        }

        document.addEventListener(
            'mousedown',
            handleClickOutside
        )

        return () =>
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            )

    }, [])

    // =========================================
    // WISHLIST COUNT
    // =========================================

    useEffect(() => {

        const updateWishlist = () => {

            const wishlist =
                JSON.parse(
                    localStorage.getItem('wishlist')
                ) || []

            setWishlistCount(wishlist.length)

        }

        updateWishlist()

        window.addEventListener(
            'wishlistUpdated',
            updateWishlist
        )

        window.addEventListener(
            'storage',
            updateWishlist
        )

        return () => {

            window.removeEventListener(
                'wishlistUpdated',
                updateWishlist
            )

            window.removeEventListener(
                'storage',
                updateWishlist
            )

        }

    }, [])

    // =========================================
    // AUTO-CLOSE MOBILE MENU ON PATH CHANGE
    // =========================================
    useEffect(() => {
        setVisible(false)
    }, [location])

    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')

        setUser(null)

        toast.success('Logged Out Successfully')

        navigate('/login')
    }

    // =========================================
    // NAVIGATION LINKS WITH ICONS FOR MOBILE
    // =========================================

    const navLinks = [
        {
            name: 'Home',
            path: '/',
            icon: <FaHome />
        },
        {
            name: 'Collection',
            path: '/collection',
            icon: <FaBoxOpen />
        },
        {
            name: 'About',
            path: '/about',
            icon: <FaInfoCircle />
        },
        {
            name: 'Contact',
            path: '/contact',
            icon: <FaEnvelope />
        }
    ]

    return (

        <>
            {/* ========================================= */}
            {/* NAVBAR */}
            {/* ========================================= */}

            <header
                className={`sticky top-0 z-50 transition-all duration-500

                ${
                    isScrolled
                        ? 'bg-white/85 backdrop-blur-2xl border-b border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]'
                        : 'bg-[#faf8f4]'
                }`}
            >

                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                    <div className='flex items-center justify-between h-[85px]'>

                        {/* ========================================= */}
                        {/* LOGO */}
                        {/* ========================================= */}

                        <Link
                            to='/'
                            className='flex items-center shrink-0'
                        >

                            <img
                                src={assets.logo}
                                alt='Stylentra'
                                className='w-40 sm:w-48 object-contain'
                            />

                        </Link>

                        {/* ========================================= */}
                        {/* DESKTOP MENU */}
                        {/* ========================================= */}

                        <ul className='hidden lg:flex items-center gap-10'>

                            {
                                navLinks.map((item, index) => (

                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        className='relative text-[15px] font-semibold text-gray-700 hover:text-black transition duration-300'
                                    >

                                        {({ isActive }) => (

                                            <div className='relative'>

                                                <span>

                                                    {item.name}

                                                </span>

                                                {
                                                    isActive && (

                                                        <motion.div
                                                            layoutId='navbar-active'
                                                            className='absolute -bottom-2 left-0 right-0 h-[2px] bg-black rounded-full'
                                                        />

                                                    )
                                                }

                                            </div>

                                        )}

                                    </NavLink>

                                ))
                            }

                        </ul>

                        {/* ========================================= */}
                        {/* RIGHT SECTION */}
                        {/* ========================================= */}

                        <div className='flex items-center gap-3 sm:gap-4'>

                            {/* SEARCH */}

                            <button
                                onClick={() => setShowSearch(true)}
                                className='w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:text-white transition duration-300'
                            >

                                <FaSearch className='text-sm' />

                            </button>

                            {/* WISHLIST */}

                            <button
                                onClick={() => navigate('/wishlist')}
                                className='relative hidden sm:flex w-11 h-11 rounded-full border border-gray-200 bg-white items-center justify-center hover:bg-black hover:text-white transition duration-300'
                            >

                                <FaHeart className='text-sm' />

                                {
                                    wishlistCount > 0 && (

                                        <span className='absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold'>

                                            {wishlistCount}

                                        </span>

                                    )
                                }

                            </button>

                            {/* CART */}

                            <Link
                                to='/cart'
                                className='relative w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:text-white transition duration-300'
                            >

                                <FaShoppingBag className='text-sm' />

                                {
                                    getCartCount() > 0 && (

                                        <span className='absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-semibold'>

                                            {getCartCount()}

                                        </span>

                                    )
                                }

                            </Link>

                            {/* PROFILE */}

                            <div
                                ref={profileRef}
                                className='relative hidden sm:block'
                            >

                                <button
                                    onClick={() =>
                                        setShowProfile(!showProfile)
                                    }
                                    className='flex items-center gap-2 px-3 h-11 rounded-full border border-gray-200 bg-white hover:border-black transition duration-300'
                                >

                                    {
                                        user?.avatar ? (

                                            <img
                                                src={user.avatar}
                                                alt=''
                                                className='w-8 h-8 rounded-full object-cover'
                                            />

                                        ) : (

                                            <FaUserCircle className='text-2xl text-gray-600' />

                                        )
                                    }

                                    <FaChevronDown
                                        className={`text-xs transition duration-300

                                        ${
                                            showProfile
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                    />

                                </button>

                                {/* PROFILE DROPDOWN */}

                                <AnimatePresence>

                                    {
                                        showProfile && (

                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 12
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 12
                                                }}
                                                transition={{
                                                    duration: 0.25
                                                }}
                                                className='absolute right-0 top-16 w-72 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
                                            >

                                                <div className='p-5 border-b border-gray-100 bg-[#fafafa]'>

                                                    {
                                                        user ? (

                                                            <div className='flex items-center gap-4'>

                                                                {
                                                                    user?.avatar ? (

                                                                        <img
                                                                            src={user.avatar}
                                                                            alt=''
                                                                            className='w-14 h-14 rounded-full object-cover'
                                                                        />

                                                                    ) : (

                                                                        <FaUserCircle className='text-5xl text-gray-500' />

                                                                    )
                                                                }

                                                                <div>

                                                                    <h3 className='font-bold text-gray-900 text-base'>

                                                                        {user.name}

                                                                    </h3>

                                                                    <p className='text-sm text-gray-500 mt-1 break-all'>

                                                                        {user.email}

                                                                    </p>

                                                                </div>

                                                            </div>

                                                        ) : (

                                                            <>
                                                                <h3 className='font-bold text-gray-900 text-lg'>

                                                                    Welcome Guest

                                                                </h3>

                                                                <p className='text-sm text-gray-500 mt-1'>

                                                                    Login to continue shopping

                                                                </p>
                                                            </>

                                                        )
                                                    }

                                                </div>

                                                <div className='p-3 flex flex-col gap-1'>

                                                    {
                                                        user ? (

                                                            <>
                                                                <button
                                                                    onClick={() => {
                                                                        navigate('/profile')
                                                                        setShowProfile(false)
                                                                    }}
                                                                    className='flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-100 transition'
                                                                >

                                                                    <FaUserCircle />

                                                                    My Profile

                                                                </button>

                                                                <button
                                                                    onClick={() => {
                                                                        navigate('/orders')
                                                                        setShowProfile(false)
                                                                    }}
                                                                    className='flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-100 transition'
                                                                >

                                                                    <FaBoxOpen />

                                                                    My Orders

                                                                </button>

                                                                <button
                                                                    onClick={() => {
                                                                        navigate('/wishlist')
                                                                        setShowProfile(false)
                                                                    }}
                                                                    className='flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-100 transition'
                                                                >

                                                                    <FaHeart />

                                                                    Wishlist

                                                                </button>

                                                                <button
                                                                    onClick={() => {
                                                                        navigate('/cart')
                                                                        setShowProfile(false)
                                                                    }}
                                                                    className='flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-100 transition'
                                                                >

                                                                    <FaShoppingBag />

                                                                    My Cart

                                                                </button>

                                                                <button
                                                                    onClick={logout}
                                                                    className='flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition'
                                                                >

                                                                    <FaSignOutAlt />

                                                                    Logout

                                                                </button>
                                                            </>

                                                        ) : (

                                                            <button
                                                                onClick={() => {
                                                                    navigate('/login')
                                                                    setShowProfile(false)
                                                                }}
                                                                className='w-full py-3 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition'
                                                            >

                                                                Login / Sign Up

                                                            </button>

                                                        )
                                                    }

                                                </div>

                                            </motion.div>

                                        )
                                    }

                                </AnimatePresence>

                            </div>

                            {/* MOBILE MENU TRIGGER BAR */}

                            <button
                                onClick={() => setVisible(true)}
                                className='lg:hidden w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:border-black transition'
                            >

                                <FaBars />

                            </button>

                        </div>

                    </div>

                </div>

            </header>

            {/* ====================================================== */}
            {/* AMBIENT MOBILE SLIDE-OUT DRAWER INTERFACE               */}
            {/* ====================================================== */}
            <AnimatePresence>
                {visible && (
                    <>
                        {/* BACKDROP BLUR OVERLAY */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setVisible(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
                        />

                        {/* DRAWER CONTENT PANEL */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-50 lg:hidden shadow-2xl border-l border-gray-100 flex flex-col justify-between"
                        >
                            <div>
                                {/* DRAWER HEADER */}
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <img
                                        src={assets.logo}
                                        alt="Stylentra"
                                        className="w-32 object-contain"
                                    />
                                    <button
                                        onClick={() => setVisible(false)}
                                        className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-neutral-900 hover:text-white transition"
                                    >
                                        <FaTimes className="text-sm" />
                                    </button>
                                </div>

                                {/* USER STATUS ACCOUNT STRIP (MOBILE PROFILE PORTAL) */}
                                <div className="p-5 border-b border-gray-50 bg-[#fafafa]">
                                    {user ? (
                                        <div className="flex items-center gap-3" onClick={() => navigate('/profile')}>
                                            {user.avatar ? (
                                                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                <FaUserCircle className="text-3xl text-gray-400" />
                                            )}
                                            <div className="overflow-hidden">
                                                <p className="text-xs text-gray-400 font-medium">Logged in as</p>
                                                <h4 className="font-bold text-gray-900 text-sm truncate">{user.name}</h4>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider transition hover:opacity-90"
                                        >
                                            Sign In / Register
                                        </button>
                                    )}
                                </div>

                                {/* CORE COLLECTION NAVIGATION LINKS LIST */}
                                <nav className="p-4 flex flex-col gap-1.5">
                                    {navLinks.map((link, index) => (
                                        <NavLink
                                            key={index}
                                            to={link.path}
                                            className={({ isActive }) => `
                                                flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all
                                                ${isActive 
                                                    ? 'bg-neutral-950 text-white shadow-md' 
                                                    : 'text-gray-600 hover:bg-neutral-50 hover:text-neutral-950'
                                                }
                                            `}
                                        >
                                            <span className="text-sm opacity-80">{link.icon}</span>
                                            {link.name}
                                        </NavLink>
                                    ))}
                                </nav>
                            </div>

                            {/* EXTRA UTILITY FOOTER STRIP FOR MOBILE USER SELECTION */}
                            <div className="p-4 border-t border-gray-100 bg-[#fafafa] flex flex-col gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => navigate('/wishlist')}
                                        className="py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 flex items-center justify-center gap-2"
                                    >
                                        <FaHeart className="text-red-500" /> Wishlist ({wishlistCount})
                                    </button>
                                    <button 
                                        onClick={() => navigate('/cart')}
                                        className="py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 flex items-center justify-center gap-2"
                                    >
                                        <FaShoppingBag /> Bag ({getCartCount()})
                                    </button>
                                </div>
                                {user && (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setVisible(false);
                                        }}
                                        className="w-full py-3 rounded-xl border border-red-100 text-red-500 bg-red-50/50 hover:bg-red-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                                    >
                                        <FaSignOutAlt /> Log Out Account
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar