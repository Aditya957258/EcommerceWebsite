import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

import { FaArrowRight, FaStar, FaHeart, FaBolt } from "react-icons/fa";

const toggleWishlist = (id) => {
  try {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let updatedWishlist = [];

    if (existingWishlist.includes(id)) {
      updatedWishlist = existingWishlist.filter((item) => item !== id);

      toast.info("Removed from wishlist");
    } else {
      updatedWishlist = [...existingWishlist, id];

      toast.success("Added to wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    window.dispatchEvent(new Event("wishlistUpdated"));
  } catch (error) {
    console.log(error);
  }
};

const LatestCollection = () => {
  const navigate = useNavigate();

  const { products, currency } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // =========================================
  // FILTERS
  // =========================================

  const filters = ["All", "Trending", "New", "Popular"];

  // =========================================
  // GET PRODUCTS
  // =========================================

  useEffect(() => {
    if (products.length > 0) {
      const updatedProducts = [...products].reverse().slice(0, 10);

      setLatestProducts(updatedProducts);
    }
  }, [products]);

  // =========================================
  // FILTER PRODUCTS
  // =========================================

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") {
      return latestProducts;
    }

    if (activeFilter === "Trending") {
      return latestProducts.filter((_, index) => index % 2 === 0);
    }

    if (activeFilter === "Popular") {
      return latestProducts.filter((_, index) => index % 3 === 0);
    }

    if (activeFilter === "New") {
      return latestProducts.slice(0, 5);
    }

    return latestProducts;
  }, [latestProducts, activeFilter]);

  return (
    <section className="relative py-24 overflow-hidden bg-[#f8f8f8]">
      {/* ========================================= */}
      {/* MODERN BACKGROUND */}
      {/* ========================================= */}

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#ececec] to-transparent"></div>

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#e8e8e8] rounded-full blur-[120px] opacity-70"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f1f1f1] rounded-full blur-[120px] opacity-70"></div>
      </div>

      {/* ========================================= */}
      {/* MAIN CONTAINER */}
      {/* ========================================= */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================= */}
        {/* TOP SECTION */}
        {/* ========================================= */}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16">
          {/* LEFT */}

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <FaBolt className="text-black text-sm" />

              <span className="text-xs sm:text-sm tracking-[2px] font-semibold text-gray-700">
                STYLENTRA COLLECTIONS
              </span>
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              <Title text1={"LATEST"} text2={"COLLECTIONS"} />
            </div>

            <p className="mt-6 text-gray-600 leading-8 text-sm sm:text-base max-w-xl">
              Explore premium fashion collections designed with modern
              aesthetics, elegant styling and a luxury ecommerce experience
              inspired by global brands.
            </p>
          </div>

          {/* RIGHT FILTERS */}

          <div className="flex flex-wrap items-center justify-center gap-4">
            {filters.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(item)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border

                                    ${
                                      activeFilter === item
                                        ? "bg-black text-white border-black shadow-lg scale-105"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                                    }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* PRODUCT GRID */}
        {/* ========================================= */}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-7">
          {filteredProducts.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[30px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500"
            >
              {/* ========================================= */}
              {/* TOP BADGES */}
              {/* ========================================= */}

              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <span className="bg-black text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">
                  NEW
                </span>

                {index % 2 === 0 && (
                  <span className="bg-white border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    TRENDING
                  </span>
                )}
              </div>

              {/* ========================================= */}
              {/* WISHLIST */}
              {/* ========================================= */}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item._id);
                }}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition duration-300"
              >
                <FaHeart className="text-sm" />
              </button>

              {/* ========================================= */}
              {/* PRODUCT */}
              {/* ========================================= */}

              <div className="overflow-hidden">
                <div className="group-hover:scale-[1.04] transition duration-700">
                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                </div>
              </div>

              {/* ========================================= */}
              {/* PRODUCT INFO */}
              {/* ========================================= */}

              <div className="px-4 pb-5">
                {/* RATING */}

                <div className="flex items-center gap-1 mt-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}

                  <span className="text-xs text-gray-500 ml-1">4.9</span>
                </div>

                {/* PRICE + BUTTON */}

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {currency}
                      {item.price}
                    </p>

                    <p className="text-xs text-green-600 font-medium mt-1">
                      Available
                    </p>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition duration-300">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================= */}
        {/* BOTTOM BUTTON */}
        {/* ========================================= */}

        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate("/collection")}
            className="group px-8 py-4 rounded-full bg-black text-white font-semibold shadow-xl hover:scale-105 active:scale-95 transition duration-300 flex items-center gap-3"
          >
            View All Collections
            <FaArrowRight className="group-hover:translate-x-1 transition duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
