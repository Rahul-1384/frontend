import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import './navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // const inputRef = useRef(null);

    
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        
        if (searchQuery.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
        }
        
        setSearchQuery("");
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit(event);
        }
    };

    // const handleButtonClick = () => {
    //     if (inputRef.current) {
    //         inputRef.current.focus(); // Set focus on the input field
    //     }
    // };

    return (
        <div className="bg-[#001E29] relative z-[100]">
            <div className="flex justify-between items-center w-[100%] h-[4rem] m-auto px-4  relative">
                <NavLink to="/" className="rebook-logo relative z-[200] w-[90px] h-[50px]">
                    
                </NavLink>

                <ul className="navItems hidden md:flex md:mt-4 md:items-center md:space-x-6 md:text-[0.7rem] lg:text-[1rem]">
                    <li>
                        <NavLink className="border-bottom-class no-underline text-white" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="border-bottom-class no-underline text-white" to="/products">Buy</NavLink>
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
                    {/* <li className="relative">
                        <input type="text"  placeholder="Search books..." className="pl-10 pr-4 py-1 w-[15rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb604] md:w-[2px] lg:w-[90%]"/>
                        <i className="fa fa-search absolute left-3 top-2 text-gray-400"></i>
                    </li> */}
                    {/* onClick={handleButtonClick} */}
                    <li class="input-wrapper">
                        <button class="icon" > 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20"></path>
                            </svg>
                        </button>
                        {/* ref={inputRef} */}
                        <input autoFocus={true} placeholder="search.." value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyPress} name="text" type="text"className="input"  />
                    </li>
                </ul>

                <button className="md:hidden text-[#fdb604] text-2xl focus:outline-none" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>

                <div className="flex items-center gap-4 md:gap-1">
                    <NavLink className="button-style font-bold no-underline px-4 py-2 text-[0.6rem] border-2 rounded-sm text-[#fdb604] border-[#fdb604] lg:text-[11px]" to="/login">Sign Up</NavLink>
                    <NavLink className="hidden sm:inline-block button-style font-bold no-underline px-4 py-2 text-[0.6rem] border-2 rounded-sm text-[#fdb604] border-[#fdb604] lg:text-[11px]" to="/login">Log in</NavLink>
                </div>

            </div>

            <div
                className={`fixed z-[100] top-0 left-0 h-full w-[75%] bg-[#001E29] text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="text-[#fdb604] text-2xl absolute top-4 right-4 focus:outline-none" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <nav className="flex flex-col space-y-6 mt-20 px-6">
                    <NavLink className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded" to="/" onClick={toggleMenu}>Home</NavLink>
                    <NavLink className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded" to="/products" onClick={toggleMenu}>Buy</NavLink>
                    <NavLink className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded" to="/sell" onClick={toggleMenu}>Sell</NavLink>
                    <NavLink className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded" to="/contactus" onClick={toggleMenu}>Contact Us</NavLink>
                    <NavLink className="block no-underline text-white py-2 hover:bg-[#fdb604] hover:text-[#001E29] rounded" to="/aboutus" onClick={toggleMenu}>About Us</NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
