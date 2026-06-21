import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Orders = () => {

    const {
        orders,
        setOrders,
        currency
    } = useContext(ShopContext)

    const navigate = useNavigate()

    // =====================================
    // REMOVE ORDER
    // =====================================

    const removeOrder = (indexToRemove) => {

        const updatedOrders =
            orders.filter((_, index) =>
                index !== indexToRemove
            )

        setOrders(updatedOrders)

        localStorage.setItem(
            'orders',
            JSON.stringify(updatedOrders)
        )

        toast.info('Order removed successfully 🗑️')
    }

    // =====================================
    // CANCEL ORDER
    // =====================================

    const cancelOrder = (indexToCancel) => {

        const updatedOrders = [...orders]

        updatedOrders[indexToCancel].status =
            'Cancelled'

        setOrders(updatedOrders)

        localStorage.setItem(
            'orders',
            JSON.stringify(updatedOrders)
        )

        toast.error('Order Cancelled ❌')
    }

    // =====================================
    // TRACK ORDER
    // =====================================

    const trackOrder = (index) => {

        const updatedOrders = [...orders]

        const currentStatus =
            updatedOrders[index].status

        if (currentStatus === 'Cancelled') {

            toast.error(
                'This order has been cancelled ❌'
            )

            return
        }

        if (currentStatus === 'Order Placed') {

            updatedOrders[index].status =
                'Processing'

            toast.success(
                '🛒 Order is now Processing'
            )
        }

        else if (currentStatus === 'Processing') {

            updatedOrders[index].status =
                'Shipped'

            toast.success(
                '📦 Order has been Shipped'
            )
        }

        else if (currentStatus === 'Shipped') {

            updatedOrders[index].status =
                'Out for Delivery'

            toast.success(
                '🚚 Order is Out for Delivery'
            )
        }

        else if (
            currentStatus === 'Out for Delivery'
        ) {

            updatedOrders[index].status =
                'Delivered'

            toast.success(
                '✅ Order Delivered Successfully'
            )
        }

        else if (currentStatus === 'Delivered') {

            toast.info(
                'Order already delivered 🎉'
            )

            return
        }

        setOrders(updatedOrders)

        localStorage.setItem(
            'orders',
            JSON.stringify(updatedOrders)
        )
    }

    // =====================================
    // REORDER
    // =====================================

    const reorderItem = (item) => {

        toast.success(
            `${item.name} added again 🛒`
        )
    }

    // =====================================
    // DOWNLOAD INVOICE
    // =====================================

    const downloadInvoice = (item) => {

        toast.success(
            'Invoice Download Started 📄'
        )
    }

    // =====================================
    // DELIVERY DATE
    // =====================================

    const getDeliveryDate = () => {

        const date = new Date()

        date.setDate(date.getDate() + 5)

        return date.toDateString()
    }

    // =====================================
    // PROGRESS BAR WIDTH
    // =====================================

    const getProgressWidth = (status) => {

        switch (status) {

            case 'Order Placed':
                return '20%'

            case 'Processing':
                return '40%'

            case 'Shipped':
                return '65%'

            case 'Out for Delivery':
                return '90%'

            case 'Delivered':
                return '100%'

            case 'Cancelled':
                return '100%'

            default:
                return '10%'
        }
    }

    return (

        <div className='bg-gradient-to-b from-gray-50 to-white min-h-screen pb-14'>

            {/* HERO BANNER */}

            <div className='relative w-full h-56 sm:h-72 overflow-hidden'>

                <img
                    src='https://images.unsplash.com/photo-1607082349566-187342175e2f'
                    alt=''
                    className='w-full h-full object-cover'
                />

                <div className='absolute inset-0 bg-black/60 flex items-center px-6 sm:px-12'>

                    <div>

                        <h1 className='text-white text-4xl sm:text-6xl font-bold tracking-tight'>
                            My Orders
                        </h1>

                        <p className='text-gray-200 mt-3 text-sm sm:text-lg'>
                            Track, manage and monitor your purchases in real time
                        </p>

                    </div>

                </div>

            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-8 mt-10'>

                {/* HEADER */}

                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10'>

                    <div>

                        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900'>
                            Order Dashboard
                        </h2>

                        <p className='text-gray-500 mt-2'>
                            View recent orders, track shipments and manage purchases
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate('/collection')
                        }
                        className='px-7 py-4 rounded-2xl border border-gray-300 bg-white hover:bg-black hover:text-white transition-all duration-300 shadow-sm'
                    >
                        Continue Shopping
                    </button>

                </div>

                {/* EMPTY STATE */}

                {orders.length === 0 ? (

                    <div className='bg-white border border-gray-200 rounded-[30px] p-14 text-center shadow-sm'>

                        <img
                            src='https://cdn-icons-png.flaticon.com/512/2038/2038854.png'
                            alt=''
                            className='w-28 mx-auto opacity-70 mb-6'
                        />

                        <h2 className='text-4xl font-bold mb-3'>
                            No Orders Yet
                        </h2>

                        <p className='text-gray-500 mb-8'>
                            Start shopping to see your orders here.
                        </p>

                        <button
                            onClick={() =>
                                navigate('/collection')
                            }
                            className='bg-black text-white px-10 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300'
                        >
                            Shop Now
                        </button>

                    </div>

                ) : (

                    <div className='flex flex-col gap-8'>

                        {orders.map((item, index) => (

                            <div
                                key={index}
                                className='bg-white border border-gray-200 rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300'
                            >

                                <div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8'>

                                    {/* LEFT SIDE */}

                                    <div className='flex flex-col md:flex-row gap-6'>

                                        {/* IMAGE */}

                                        <div className='relative shrink-0'>

                                            <img
                                                src={item.image?.[0]}
                                                alt=''
                                                className='w-36 h-36 object-cover rounded-3xl border shadow-sm'
                                            />

                                            <div className='absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full'>
                                                {item.quantity}x
                                            </div>

                                        </div>

                                        {/* DETAILS */}

                                        <div className='flex-1'>

                                            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                                                {item.name}
                                            </h2>

                                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 mt-5 text-gray-600'>

                                                <p>
                                                    Size :
                                                    <span className='ml-2 text-black font-medium'>
                                                        {item.size}
                                                    </span>
                                                </p>

                                                <p>
                                                    Payment :
                                                    <span className='ml-2 text-black font-medium'>
                                                        {item.paymentMethod}
                                                    </span>
                                                </p>

                                                <p>
                                                    Ordered On :
                                                    <span className='ml-2 text-black font-medium'>
                                                        {
                                                            item.date ||
                                                            item.orderDate
                                                        }
                                                    </span>
                                                </p>

                                                <p>
                                                    Order ID :
                                                    <span className='ml-2 text-black font-semibold'>
                                                        STYLENTRA{index + 1001}
                                                    </span>
                                                </p>

                                                <p>
                                                    Delivery Partner :
                                                    <span className='ml-2 text-black font-medium'>
                                                        Delhivery Express
                                                    </span>
                                                </p>

                                                <p>
                                                    Expected Delivery :
                                                    <span className='ml-2 text-green-600 font-semibold'>
                                                        {getDeliveryDate()}
                                                    </span>
                                                </p>

                                            </div>

                                            {/* STATUS */}

                                            <div className='flex items-center gap-3 mt-6'>

                                                <span className={`w-4 h-4 rounded-full
                                                ${item.status === 'Cancelled'
                                                        ? 'bg-red-500'
                                                        : item.status === 'Delivered'
                                                            ? 'bg-blue-500'
                                                            : 'bg-green-500'
                                                    }`}>
                                                </span>

                                                <p className={`font-semibold text-lg
                                                ${item.status === 'Cancelled'
                                                        ? 'text-red-500'
                                                        : item.status === 'Delivered'
                                                            ? 'text-blue-500'
                                                            : 'text-green-600'
                                                    }`}>
                                                    {item.status}
                                                </p>

                                            </div>

                                            {/* PROGRESS BAR */}

                                            <div className='mt-6 max-w-2xl'>

                                                <div className='flex justify-between text-xs sm:text-sm text-gray-500 mb-2'>

                                                    <span>Placed</span>

                                                    <span>Processing</span>

                                                    <span>Shipped</span>

                                                    <span>Delivered</span>

                                                </div>

                                                <div className='w-full h-3 bg-gray-200 rounded-full overflow-hidden'>

                                                    <div
                                                        style={{
                                                            width:
                                                                getProgressWidth(
                                                                    item.status
                                                                )
                                                        }}
                                                        className={`h-full transition-all duration-700
                                                        ${item.status === 'Cancelled'
                                                                ? 'bg-red-500'
                                                                : 'bg-gradient-to-r from-green-500 via-black to-black'
                                                            }`}
                                                    ></div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* RIGHT SIDE */}

                                    <div className='flex flex-col items-start xl:items-end gap-6'>

                                        {/* PRICE */}

                                        <div className='bg-black text-white px-8 py-5 rounded-3xl shadow-lg'>

                                            <h2 className='text-4xl font-bold'>
                                                {currency}
                                                {item.price * item.quantity}
                                            </h2>

                                            <p className='text-gray-300 mt-1 text-sm'>
                                                Total Amount
                                            </p>

                                        </div>

                                        {/* BUTTONS */}

                                        <div className='flex flex-wrap gap-3'>

                                            {/* TRACK */}

                                            <button
                                                onClick={() =>
                                                    trackOrder(index)
                                                }
                                                className='px-6 py-3 rounded-2xl bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300'
                                            >
                                                Track Order
                                            </button>

                                            {/* CANCEL */}

                                            {item.status !== 'Cancelled' &&
                                                item.status !== 'Delivered' && (

                                                    <button
                                                        onClick={() =>
                                                            cancelOrder(index)
                                                        }
                                                        className='px-6 py-3 rounded-2xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300'
                                                    >
                                                        Cancel Order
                                                    </button>

                                                )}

                                            {/* REORDER */}

                                            <button
                                                onClick={() =>
                                                    reorderItem(item)
                                                }
                                                className='px-6 py-3 rounded-2xl border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300'
                                            >
                                                Reorder
                                            </button>

                                            {/* INVOICE */}

                                            <button
                                                onClick={() =>
                                                    downloadInvoice(item)
                                                }
                                                className='px-6 py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 transition-all duration-300'
                                            >
                                                Invoice
                                            </button>

                                            {/* REMOVE */}

                                            <button
                                                onClick={() =>
                                                    removeOrder(index)
                                                }
                                                className='px-6 py-3 rounded-2xl border border-gray-300 hover:bg-black hover:text-white transition-all duration-300'
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}

export default Orders