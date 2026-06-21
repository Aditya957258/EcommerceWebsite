import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(ShopContext)

    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [selectedSize, setSelectedSize] = useState(null)

    const fetchProductData = () => {
        const product = products.find((item) => item._id === productId)

        if (product) {
            setProductData(product)
            setImage(product.image[0])
        }
    }

    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

            {/* PRODUCT SECTION */}
            <div className='flex gap-12 flex-col sm:flex-row'>

                {/* IMAGES */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full'>
                        {
                            productData.image.map((item, index) => (
                                <img
                                    key={index}
                                    onClick={() => setImage(item)}
                                    src={item}
                                    className='w-[24%] sm:w-full sm:mb-3 cursor-pointer'
                                    alt=""
                                />
                            ))
                        }
                    </div>

                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' alt="" />
                    </div>
                </div>

                {/* INFO */}
                <div className='flex-1'>

                    <h1 className='text-2xl font-medium'>
                        {productData.name}
                    </h1>

                    {/* RATING */}
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} className='w-3.5' />
                        <img src={assets.star_icon} className='w-3.5' />
                        <img src={assets.star_icon} className='w-3.5' />
                        <img src={assets.star_icon} className='w-3.5' />
                        <img src={assets.star_dull_icon} className='w-3.5' />
                        <p className='pl-2'>(122)</p>
                    </div>

                    <p className='text-3xl font-medium mt-5'>
                        {currency}{productData.price}
                    </p>

                    <p className='text-gray-500 mt-5 md:w-4/5'>
                        {productData.description}
                    </p>

                    {/* SIZE */}
                    <div className='my-8'>
                        <p className='mb-2'>Select Size</p>

                        <div className='flex gap-2'>
                            {
                                productData.sizes.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSize(item)}
                                        className={`border py-2 px-4 transition
                                            ${selectedSize === item
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* ADD TO CART BUTTON */}
                    <button
                        disabled={!selectedSize}
                        onClick={() => addToCart(productData._id, selectedSize)}
                        className={`px-8 py-3 text-sm text-white transition
                            ${selectedSize
                                ? 'bg-black active:bg-gray-700'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        ADD TO CART
                    </button>

                    <hr className='mt-8 sm:w-4/5' />

                    <div className='text-sm text-gray-500 mt-5'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available.</p>
                        <p>Easy return within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className='mt-20'>

                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>

                <div className='border px-6 py-6 text-sm text-gray-500 flex flex-col gap-4'>
                    <p>
                        Stylentra is a modern e-commerce platform designed for fashion shopping, offering a smooth and user-friendly experience.
                    </p>
                    <p>
                        Built using React.js and Tailwind CSS with responsive design and dynamic product management features.
                    </p>
                </div>
            </div>

            {/* RELATED PRODUCTS */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
                currentProductId={productData._id}
            />

        </div>
    ) : (
        <div className='opacity-0'></div>
    )
}

export default Product