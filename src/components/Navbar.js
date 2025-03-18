import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    Search, Menu, X, LogIn, UserPlus, Home, ShoppingCart, BookOpen, Mail, Info, ChevronDown, Package, Heart,
    Settings, User, LogOut, Clock
} from 'lucide-react';
import logo from '../images/rebook-logo.png';
import { useAuth } from '../context/AuthContext';
import { useAddressContext } from '../context/AddressContext';
import AddressDisplay from './address/AddressDisplay';

const Navbar = () => {
    const { isAuthenticated, user, logoutUser } = useAuth();
    const { defaultAddress } = useAddressContext(); // Get the default address from context
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.addEventListener('mousedown', handleClickOutside);
    }, []);

    const profileMenuItems = [
        { icon: Package, label: 'My Orders', path: '/orders' },
        { icon: Clock, label: 'Track Orders', path: '/track-orders' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const UserProfileButton = () => (
        <div className="relative" ref={profileRef}>
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 focus:outline-none"
            >
                <div className="relative">
                    <div className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-200">
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-slate-900 font-bold text-lg">
                                {user?.name[0].toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div className="hidden md:block">
                    <p className="text-sm font-medium mt-2 text-gray-200">
                        {user?.name}
                    </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            <div className={`absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-lg border border-slate-700 transition-all duration-200 ${isProfileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="flex items-center space-x-3">
                    <div className="relative pl-4 mt-2">
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-yellow-500">
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-slate-900 font-bold text-lg">
                                    {user?.name[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                    </div>
                    <div className="pt-4 ">
                        <p className="text-sm font-medium text-gray-200">{user?.name}</p>
                    </div>
                </div>
                <p className="text-xs pl-5 text-gray-400">{user?.email}</p>
                <hr className="my-2 border-white w-[90%] mx-auto" />
                <div className="p-2">
                    {profileMenuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex no-underline items-center space-x-3 px-3 py-2 text-sm text-gray-200 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                        >
                            <item.icon className="w-4 h-4 text-gray-400" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                    <hr className="my-2 border-slate-700" />
                    <button
                        onClick={() => {
                            setIsProfileOpen(false);
                            logoutUser();
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 rounded-lg hover:bg-red-500/10 transition-colors duration-200"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
        setSearchQuery("");
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit(event);
        }
    };

    const navItems = [
        { path: "/", label: "Home", icon: Home },
        { path: "/products", label: "Buy", icon: ShoppingCart },
        { path: "/sell", label: "Sell", icon: BookOpen },
        { path: "/contactus", label: "Contact", icon: Mail },
        { path: "/aboutus", label: "About", icon: Info },
    ];

    const NavItem = ({ path, label, icon: Icon, onClick }) => {
        const isActive = location.pathname === path;
        return (
            <NavLink
                to={path}
                onClick={onClick}
                className={`group no-underline flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? 'text-yellow-500 bg-slate-800/50'
                    : 'text-gray-200 hover:text-yellow-500 hover:bg-slate-800/30'
                    }`}
            >
                <Icon className={`w-4 h-4 mr-2 transition-colors duration-200 ${isActive ? 'text-yellow-500' : 'text-gray-400 group-hover:text-yellow-500'
                    }`} />
                {label}
            </NavLink>
        );
    };

    return (
        // <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 -backdrop-blur-[2px] shadow-lg' : 'bg-transparent'
        <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 -backdrop-blur-[2px] shadow-lg' : 'bg-slate-900'
            }`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo */}
                    <NavLink
                        to="/products"
                        className="relative mix-blend-plus-lighter overflow-hidden z-10 flex-shrink-0 flex items-center"
                    >
                        <div className="w-32 h-16 bg-gradient-to-r  rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
                            <span className="text-slate-900 font-bold text-xl tracking-wider"><img src={logo} alt="" /></span>
                        </div>
                    </NavLink>
                    <AddressDisplay address={defaultAddress} />


                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <NavItem key={item.path} {...item} />
                        ))}
                    </div>

                    {/* Desktop Search and Auth */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyPress}
                                className="w-64 px-10 py-2 pl-10 text-sm outline-none text-gray-200 bg-slate-800/50 rounded-lg border-2 border-slate-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200 placeholder-gray-400"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </form>

                        {user ? (
                            <UserProfileButton />
                        ) :
                            (
                                <div className="flex items-center space-x-2">
                                    <NavLink
                                        to="/login"
                                        className="inline-flex no-underline items-center px-4 py-2 text-sm font-medium text-slate-900 border-2 border-yellow-500 bg-yellow-500 rounded-lg hover:bg-transparent hover:text-white hover:border-2 hover:border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Log in
                                    </NavLink>

                                    <NavLink
                                        to="/signup"
                                        className="inline-flex no-underline items-center px-4 py-2 text-sm font-medium text-yellow-500 bg-transparent border-2 border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                                    >
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Sign up
                                    </NavLink>
                                </div>
                            )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex lg:hidden items-center space-x-2">
                        <button
                            onClick={toggleSearch}
                            className="p-2 rounded-lg text-gray-200 hover:text-yellow-500 focus:outline-none"
                        >
                            <Search className="h-6 w-6" />
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg text-gray-200 hover:text-yellow-500 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-20 opacity-100 mb-2' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <form onSubmit={handleSearchSubmit} className="p-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyPress}
                                className="w-full px-10 py-2 pl-10 text-sm outline-none text-gray-200 bg-slate-800/50 rounded-lg border-2 border-slate-700 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </form>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                ? 'max-h-screen opacity-100 border-t border-slate-800'
                : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-md">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.path}
                            {...item}
                            onClick={toggleMenu}
                        />
                    ))}

                    {user ? (
                        <div className="border-t border-slate-700">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-yellow-500">
                                        {user?.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-slate-900 font-bold text-lg">
                                                {user?.name[0].toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                                </div>
                                <div className="mt-12">
                                    <p className="text-sm font-medium text-gray-200">{user?.name}</p>
                                    <p className="text-xs text-gray-400">{user?.email}</p>
                                </div>
                            </div>
                            {profileMenuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center no-underline space-x-3 px-3 py-2 text-sm text-gray-200 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                                >
                                    <item.icon className="w-4 h-4 text-gray-400" />
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                            <hr className="my-2 border-slate-700" />
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    logoutUser();
                                }}
                                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 rounded-lg hover:bg-red-500/10 transition-colors duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) :
                        (
                            <div className="pt-4 space-y-2 px-2">
                                <NavLink
                                    to="/login"
                                    className="no-underline flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-900 bg-yellow-500 border-2 border-yellow-400 hover:text-white rounded-lg hover:bg-transparent hover:border-white transition-colors duration-200 shadow-lg"
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Log in
                                </NavLink>

                                <NavLink
                                    to="/signup"
                                    className="no-underline flex items-center justify-center px-4 py-2 text-sm font-medium text-yellow-500 bg-transparent border-2 border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white hover:border-white transition-colors duration-200"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Sign up
                                </NavLink>
                            </div>
                        )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;