import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const normalizeText = (text = "") => {
    return text
        .toLowerCase()
        .replace(/['"]/g, "")
        .replace(/s\b/g, "s") // basic cleanup
        .trim()
}

// 🔥 FIX: Smart keyword matching (men → mens → men's)
const matchQuery = (itemName, query) => {
    const name = normalizeText(itemName)
    const q = normalizeText(query)

    const synonyms = {
        men: ["mens", "men", "man", "male"],
        women: ["womens", "women", "woman", "female"]
    }

    let expandedQuery = [q]

    Object.keys(synonyms).forEach(key => {
        if (synonyms[key].includes(q)) {
            expandedQuery = [...expandedQuery, ...synonyms[key]]
        }
    })

    return expandedQuery.some(word => name.includes(word))
}

const SearchBar = () => {

    const {
        search,
        setSearch,
        showSearch,
        setShowSearch,
        products = []
    } = useContext(ShopContext)

    const navigate = useNavigate()
    const ref = useRef()

    const [results, setResults] = useState([])

    const safeProducts = Array.isArray(products) ? products : []

    // -------------------------
    // REAL SEARCH (FIXED LOGIC)
    // -------------------------
    useEffect(() => {

        if (!search?.trim()) {
            setResults([])
            return
        }

        const timer = setTimeout(() => {

            const filtered = safeProducts.filter(item =>
                matchQuery(item?.name, search) ||
                matchQuery(item?.category, search)
            )

            setResults(filtered.slice(0, 6))

        }, 200)

        return () => clearTimeout(timer)

    }, [search, safeProducts])

    // -------------------------
    // OUTSIDE CLICK CLOSE
    // -------------------------
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowSearch(false)
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [setShowSearch])

    const openProduct = (id) => {
        setSearch("")
        setResults([])
        setShowSearch(false)
        navigate(`/product/${id}`)
    }

    if (!showSearch) return null

    return (
        <div className='border-t border-b bg-white shadow-md'>

            <div className='flex justify-center py-4' ref={ref}>

                <div className='relative w-3/4 sm:w-1/2 flex items-center border rounded-full px-4 py-2 shadow-sm'>

                    {/* INPUT */}
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='flex-1 outline-none text-sm'
                        placeholder='Search for products, men, women...'
                    />

                    {/* ICON */}
                    <img
                        src={assets?.search_icon}
                        alt="search"
                        className='w-4 opacity-70'
                    />

                    {/* DROPDOWN */}
                    {search && results.length > 0 && (
                        <div className='absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto'>

                            {results.map(item => (
                                <div
                                    key={item._id}
                                    onClick={() => openProduct(item._id)}
                                    className='flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                                >

                                    <div className='flex items-center gap-2'>
                                        <img
                                            src={item?.image || item?.images?.[0] || ""}
                                            alt={item?.name}
                                            className='w-8 h-8 object-cover rounded'
                                            onError={(e) => e.target.style.display = "none"}
                                        />

                                        <span>
                                            {item?.name}
                                        </span>
                                    </div>

                                    <span className='text-gray-500'>
                                        ₹{item?.price || 0}
                                    </span>
                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </div>

            {/* CLOSE */}
            <div className='text-center pb-3'>
                <img
                    src={assets?.cross_icon}
                    onClick={() => setShowSearch(false)}
                    className='w-3 opacity-60 cursor-pointer'
                    alt="close"
                />
            </div>

        </div>
    )
}

export default SearchBar