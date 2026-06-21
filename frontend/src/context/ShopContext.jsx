import { createContext, useEffect, useMemo, useState } from "react"
import { products as initialProducts } from "../assets/assets"
import { toast } from "react-toastify"

// =====================================
// CONTEXT
// =====================================

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {

    // =====================================
    // CONFIG
    // =====================================

    const currency = "$"
    const delivery_fee = 10

    // =====================================
    // STATE
    // =====================================

    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)

    const [cartItems, setCartItems] = useState({})
    const [orders, setOrders] = useState([])

    // =====================================
    // LOAD LOCAL STORAGE
    // =====================================

    useEffect(() => {

        try {

            const savedCart =
                localStorage.getItem("cartItems")

            const savedOrders =
                localStorage.getItem("orders")

            if (savedCart) {

                setCartItems(
                    JSON.parse(savedCart)
                )
            }

            if (savedOrders) {

                setOrders(
                    JSON.parse(savedOrders)
                )
            }

        } catch (error) {

            console.log(
                "LocalStorage Error",
                error
            )
        }

    }, [])

    // =====================================
    // SAVE CART
    // =====================================

    useEffect(() => {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        )

    }, [cartItems])

    // =====================================
    // SAVE ORDERS
    // =====================================

    useEffect(() => {

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        )
    }, [orders])

    // =====================================
    // PRODUCT MAP
    // =====================================

    const productMap = useMemo(() => {

        const map = {}

        initialProducts.forEach(product => {

            map[product._id] = product
        })

        return map

    }, [])

    // =====================================
    // SEARCH FILTER
    // =====================================

    const filteredProducts = useMemo(() => {

        if (!search.trim())
            return initialProducts

        return initialProducts.filter(product =>

            product.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            product.category
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            product.subCategory
                ?.toLowerCase()
                .includes(search.toLowerCase())
        )

    }, [search])

    // =====================================
    // ADD TO CART
    // =====================================

    const addToCart = (
        itemId,
        size
    ) => {

        if (!size) {

            toast.error(
                "Please select size"
            )

            return
        }

        setCartItems(prev => {

            const updated =
                structuredClone(prev)

            if (!updated[itemId]) {

                updated[itemId] = {}
            }

            updated[itemId][size] =
                (updated[itemId][size] || 0) + 1

            return updated
        })

        toast.success(
            "Added to cart 🛒"
        )
    }

    // =====================================
    // INCREASE QTY
    // =====================================

    const increaseQty = (
        itemId,
        size
    ) => {

        setCartItems(prev => {

            const updated =
                structuredClone(prev)

            if (!updated[itemId]?.[size])
                return prev

            updated[itemId][size] += 1

            return updated
        })
    }

    // =====================================
    // DECREASE QTY
    // =====================================

    const decreaseQty = (
        itemId,
        size
    ) => {

        setCartItems(prev => {

            const updated =
                structuredClone(prev)

            if (!updated[itemId]?.[size])
                return prev

            updated[itemId][size] -= 1

            if (
                updated[itemId][size] <= 0
            ) {

                delete updated[itemId][size]
            }

            if (
                Object.keys(
                    updated[itemId]
                ).length === 0
            ) {

                delete updated[itemId]
            }

            return updated
        })
    }

    // =====================================
    // REMOVE FROM CART
    // =====================================

    const removeFromCart = (
        itemId,
        size
    ) => {

        setCartItems(prev => {

            const updated =
                structuredClone(prev)

            if (
                updated[itemId]?.[size]
            ) {

                delete updated[itemId][size]
            }

            if (
                updated[itemId] &&
                Object.keys(
                    updated[itemId]
                ).length === 0
            ) {

                delete updated[itemId]
            }

            return updated
        })

        toast.info(
            "Item removed"
        )
    }

    // =====================================
    // CLEAR CART
    // =====================================

    const clearCart = () => {

        setCartItems({})

        toast.warning(
            "Cart cleared"
        )
    }

    // =====================================
    // CART COUNT
    // =====================================

    const getCartCount = () => {

        let total = 0

        for (const item in cartItems) {

            for (
                const size in cartItems[item]
            ) {

                total +=
                    cartItems[item][size]
            }
        }

        return total
    }

    // =====================================
    // CART AMOUNT
    // =====================================

    const getCartAmount = () => {

        let total = 0

        for (const item in cartItems) {

            const product =
                productMap[item]

            if (!product)
                continue

            for (
                const size in cartItems[item]
            ) {

                total +=
                    product.price *
                    cartItems[item][size]
            }
        }

        return total
    }

    // =====================================
    // PLACE ORDER
    // =====================================

    const placeOrder = (
        deliveryData,
        paymentMethod
    ) => {

        const newOrders = []

        for (const item in cartItems) {

            const product =
                productMap[item]

            if (!product)
                continue

            for (
                const size in cartItems[item]
            ) {

                newOrders.push({

                    id:
                        crypto.randomUUID(),

                    productId:
                        item,

                    name:
                        product.name,

                    image:
                        product.image,

                    price:
                        product.price,

                    size,

                    quantity:
                        cartItems[item][size],

                    paymentMethod,

                    deliveryData,

                    status:
                        "placed",

                    trackingSteps: [

                        "placed",
                        "processing",
                        "shipped",
                        "out_for_delivery",
                        "delivered"
                    ],

                    estimatedDelivery:
                        new Date(
                            Date.now() +
                            5 *
                            24 *
                            60 *
                            60 *
                            1000
                        ).toDateString(),

                    date:
                        new Date()
                            .toISOString()
                })
            }
        }

        setOrders(prev => [
            ...newOrders,
            ...prev
        ])

        setCartItems({})

        toast.success(
            "Order placed successfully 🎉"
        )
    }

    // =====================================
    // TRACK ORDER
    // =====================================

    const trackOrder = (
        orderId
    ) => {

        setOrders(prev =>

            prev.map(order => {

                if (
                    order.id !== orderId
                ) {

                    return order
                }

                if (
                    order.status ===
                    "cancelled"
                ) {

                    toast.error(
                        "Cancelled order cannot be tracked ❌"
                    )

                    return order
                }

                if (
                    order.status ===
                    "placed"
                ) {

                    toast.success(
                        "🛒 Order Processing Started"
                    )

                    return {
                        ...order,
                        status:
                            "processing"
                    }
                }

                if (
                    order.status ===
                    "processing"
                ) {

                    toast.success(
                        "📦 Order Shipped"
                    )

                    return {
                        ...order,
                        status:
                            "shipped"
                    }
                }

                if (
                    order.status ===
                    "shipped"
                ) {

                    toast.success(
                        "🚚 Out For Delivery"
                    )

                    return {
                        ...order,
                        status:
                            "out_for_delivery"
                    }
                }

                if (
                    order.status ===
                    "out_for_delivery"
                ) {

                    toast.success(
                        "✅ Delivered Successfully"
                    )

                    return {
                        ...order,
                        status:
                            "delivered"
                    }
                }

                toast.info(
                    "Order already delivered 🎉"
                )

                return order
            })
        )
    }

    // =====================================
    // CANCEL ORDER
    // =====================================

    const cancelOrder = (
        orderId
    ) => {

        setOrders(prev =>

            prev.map(order =>

                order.id === orderId

                    ? {
                        ...order,
                        status:
                            "cancelled"
                    }

                    : order
            )
        )

        toast.error(
            "Order cancelled ❌"
        )
    }

    // =====================================
    // REMOVE ORDER
    // =====================================

    const removeOrder = (
        orderId
    ) => {

        setOrders(prev =>

            prev.filter(order =>

                order.id !== orderId
            )
        )

        toast.success(
            "Order removed 🗑️"
        )
    }

    // =====================================
    // REORDER PRODUCT
    // =====================================

    const reorderProduct = (
        order
    ) => {

        addToCart(
            order.productId,
            order.size
        )

        toast.success(
            `${order.name} added again 🛒`
        )
    }

    // =====================================
    // DOWNLOAD INVOICE
    // =====================================

    const downloadInvoice = (
        order
    ) => {

        toast.success(
            `Invoice downloaded for ${order.name} 📄`
        )
    }

    // =====================================
    // STATUS COLOR
    // =====================================

    const getOrderStatusColor = (
        status
    ) => {

        switch (status) {

            case "placed":
                return "text-yellow-500"

            case "processing":
                return "text-blue-500"

            case "shipped":
                return "text-indigo-500"

            case "out_for_delivery":
                return "text-orange-500"

            case "delivered":
                return "text-green-500"

            case "cancelled":
                return "text-red-500"

            default:
                return "text-gray-500"
        }
    }

    // =====================================
    // PROGRESS BAR
    // =====================================

    const getOrderProgress = (
        status
    ) => {

        switch (status) {

            case "placed":
                return 20

            case "processing":
                return 40

            case "shipped":
                return 70

            case "out_for_delivery":
                return 90

            case "delivered":
                return 100

            case "cancelled":
                return 100

            default:
                return 0
        }
    }

    // =====================================
    // CONTEXT VALUE
    // =====================================

    const value = {

        // config
        currency,
        delivery_fee,

        // products
        products:
            initialProducts,

        filteredProducts,

        // search
        search,
        setSearch,
        showSearch,
        setShowSearch,

        // cart
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,

        // totals
        getCartCount,
        getCartAmount,

        // orders
        orders,
        setOrders,
        placeOrder,
        cancelOrder,
        removeOrder,
        trackOrder,
        reorderProduct,
        downloadInvoice,
        getOrderStatusColor,
        getOrderProgress
    }

    return (

        <ShopContext.Provider value={value}>

            {children}

        </ShopContext.Provider>
    )
}

export default ShopContextProvider
