import React, { useState } from "react";
import axios from "axios";
import logo from '../images/rebook-logo.png';
import './booksnavbar.css';
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // Importing shopping cart icon

const BooksNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/search?q=${encodeURIComponent(searchTerm)}`
        );
        setResults(response.data || []);
      } catch (error) {
        console.error("Error performing search:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

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

        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full py-2 px-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isLoading && (
            <div className="absolute top-2 right-2">
              <div className="loader border-t-2 border-blue-500 w-4 h-4 rounded-full animate-spin"></div>
            </div>
          )}
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
            <NavLink
              to="/login"
              className="no-underline text-lg font-bold py-2"
            >
              Login
            </NavLink>
            <NavLink
              to="/cart"
              className="no-underline text-lg font-bold py-2"
            >
              Cart
            </NavLink>
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="container mx-auto mt-4">
          <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
          <ul className="bg-white border rounded-md shadow-lg">
            {results.map((result, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-100">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default BooksNavbar;
