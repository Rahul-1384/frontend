import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16 overflow-hidden">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-blue-900 to-purple-900 opacity-20 animate-pulse"></div>

      {/* Floating Decorative Shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-teal-500 rounded-full opacity-20 animate-float blur-xl"></div>
      <div className="absolute bottom-16 right-16 w-16 h-16 bg-blue-500 rounded-full opacity-30 animate-float-slow blur-lg"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">About Us</h3>
            <p className="text-sm">
              Rediscover the joy of reading with our curated collection of pre-loved books. Affordable, sustainable, and timeless.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="" className="hover:text-teal-400 no-underline transition duration-300">Home</a></li>
              <li><a href="#categories" className="hover:text-teal-400 no-underline transition duration-300">Categories</a></li>
              <li><a href="#contact" className="hover:text-teal-400 no-underline transition duration-300">Contact Us</a></li>
              <li><a href="#faq" className="hover:text-teal-400 no-underline transition duration-300">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Subscribe</h3>
            <p className="text-sm">Get the latest updates and offers directly in your inbox.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
              />
              <button className="bg-teal-500 text-white px-4 py-2 rounded-r-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-6 text-2xl">
              <a href="#" className="hover:text-teal-400 transition-transform transform hover:scale-110 animate-pulse"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-teal-400 transition-transform transform hover:scale-110 animate-pulse"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-teal-400 transition-transform transform hover:scale-110 animate-pulse"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-teal-400 transition-transform transform hover:scale-110 animate-pulse"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Trending Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white mb-6">Trending Categories</h3>
          <div className="flex flex-wrap gap-4">
            {['Fiction', 'Science', 'History', 'Mystery', 'Self-Help', 'Fantasy'].map((category, index) => (
              <span 
                key={index} 
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 animate-glow">
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Icon Divider */}
        <div className="flex justify-center my-16">
          <span className="text-teal-500 text-3xl px-4"><i className="fas fa-book-open"></i></span>
          <span className="border-t border-gray-700 w-32 md:w-64"></span>
          <span className="text-teal-500 text-3xl px-4"><i className="fas fa-feather-alt"></i></span>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center text-sm border-t border-gray-700 pt-6">
          <p>&copy; 2025 Second-Hand Bookstore. All Rights Reserved.</p>
          <button 
            onClick={scrollToTop} 
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 ripple">
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
