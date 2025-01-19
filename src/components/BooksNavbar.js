import React, { useState } from "react";
import logo from "../images/rebook-logo.png";
import "./booksnavbar.css";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const BooksNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#001E29] shadow-md top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-16" />
        </div>

        {/* Hamburger Menu for Small Devices */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Buttons and Cart */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavLink
            to="/sell"
            className="button-style no-underline font-bold border-2 border-[#fdb604] text-[#fdb604] px-4 py-2 rounded-md"
          >
            Sell
          </NavLink>
          <NavLink
            to="/login"
            className="button-style no-underline font-bold border-2 px-4 py-2 rounded-md text-white hover:border-[#fdb604]"
          >
            Login
          </NavLink>
          <NavLink
            to="/cart"
            className="relative flex items-center justify-center text-white text-lg p-2 hover:text-[#fdb604]"
          >
            <FiShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              3
            </span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#001E29] text-white">
          <div className="flex flex-col items-center py-4">
            <NavLink to="/sell" className="no-underline text-lg font-bold py-2">
              Sell
            </NavLink>
            <NavLink to="/login" className="no-underline text-lg font-bold py-2">
              Login
            </NavLink>
            <NavLink to="/cart" className="no-underline text-lg font-bold py-2">
              Cart
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default BooksNavbar;
