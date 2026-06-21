import React from "react";
import { Routes, Route } from "react-router-dom";

// ===============================
// PAGES
// ===============================
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

// ===============================
// COMPONENTS
// ===============================
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

// ===============================
// TOASTIFY
// ===============================
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (

    <div className="flex flex-col min-h-screen px-4">

      {/* =============================== */}
      {/* TOAST NOTIFICATION */}
      {/* =============================== */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* =============================== */}
      {/* HEADER */}
      {/* =============================== */}
      <Navbar />
      <SearchBar />

      {/* =============================== */}
      {/* MAIN ROUTES */}
      {/* =============================== */}
      <main className="flex-1">

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* COLLECTION */}
          <Route path="/collection" element={<Collection />} />

          {/* ABOUT */}
          <Route path="/about" element={<About />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact />} />

          {/* PRODUCT DETAILS */}
          <Route path="/product/:productId" element={<Product />} />

          {/* CART */}
          <Route path="/cart" element={<Cart />} />

          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* PLACE ORDER */}
          <Route path="/place-order" element={<PlaceOrder />} />

          {/* MY ORDERS */}
          <Route path="/orders" element={<Orders />} />

          {/* PROFILE */}
          <Route path="/profile" element={<Profile />} />

          {/* WISHLIST */}
          <Route path="/wishlist" element={<Wishlist />} />

        </Routes>

      </main>

      {/* =============================== */}
      {/* FOOTER */}
      {/* =============================== */}
      <Footer />

    </div>
  );
};

export default App;