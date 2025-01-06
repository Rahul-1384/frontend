import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import './navbar.css';

const Navbar = () => {
    // State to toggle the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State to store the input value
    const [searchQuery, setSearchQuery] = useState("");
    
    // Get the navigate function from useNavigate
    const navigate = useNavigate();

    // Function to toggle mobile menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle search submit (e.g., redirecting to the search results page)
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        
        // Check if search query is not empty
        if (searchQuery.trim()) {
            // Redirect to a search results page (replace 'search-results' with your desired route)
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
        }
        
        // Clear the input field after submission
        setSearchQuery("");
    };

    // Function to handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit(event);
        }
    };

    return (
        <div className="bg-[#001E29]">
            <div className="flex justify-between items-center w-[100%] h-[4rem] m-auto px-4 relative">
                {/* Logo */}
                <div className="relative z-10 font-extrabold text-[#fdb604] text-xl">ReBook</div>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex md:mt-4 md:items-center md:space-x-6">
                    <li>
                        <NavLink className="border-bottom-class no-underline text-white" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="border-bottom-class no-underline text-white" to="/buy">Buy</NavLink>
                    </li>
                    <li>
                        <NavLink className="border-bottom-class no-underline text-white" to="/sell">Sell</NavLink>
                    </li>
                    <li>
                        <NavLink className="border-bottom-class no-underline text-white" to="/contactus">Contact Us</NavLink>
                    </li>
                    <li>
                        <NavLink className="border-bottom-class no-underline text-white" to="/aboutus">About Us</NavLink>
                    </li>
                    {/* Search Bar */}
                    <li className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyPress}  // Added event listener for Enter key
                            placeholder="Search books..."
                            className="pl-10 pr-4 py-1 w-[15rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb604]"
                        />
                        <i className="fa fa-search absolute left-3 top-2 text-gray-400"></i>
                    </li>
                </ul>

                {/* Hamburger Menu Icon (Mobile) */}
                <button
                    className="md:hidden text-[#fdb604] text-2xl focus:outline-none"
                    onClick={toggleMenu}
                >
                    {/* Hamburger Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Sign Up & Log In Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <NavLink
                        className="button-style md:text-[0.8rem] font-bold no-underline px-4 py-2 text-[0.7rem] border-2 rounded-sm text-[#fdb604] border-[#fdb604]"
                        to="/signup"
                    >
                        Sign Up
                    </NavLink>
                    <NavLink
                        className="button-style md:text-[0.8rem] font-bold no-underline px-4 py-2 text-[0.7rem] border-2 rounded-sm text-[#fdb604] border-[#fdb604]"
                        to="/login"
                    >
                        Log in
                    </NavLink>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-[75%] bg-[#001E29] text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button
                    className="text-[#fdb604] text-2xl absolute top-4 right-4 focus:outline-none"
                    onClick={toggleMenu}
                >
                    {/* Close Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <nav className="flex flex-col space-y-6 mt-20 px-6">
                    <NavLink
                        className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded"
                        to="/"
                        onClick={toggleMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded"
                        to="/buy"
                        onClick={toggleMenu}
                    >
                        Buy
                    </NavLink>
                    <NavLink
                        className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded"
                        to="/sell"
                        onClick={toggleMenu}
                    >
                        Sell
                    </NavLink>
                    <NavLink
                        className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded"
                        to="/contactus"
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </NavLink>
                    <NavLink
                        className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded"
                        to="/aboutus"
                        onClick={toggleMenu}
                    >
                        About Us
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
