import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Add your subscription logic here
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-20 overflow-hidden">
      {/* Enhanced Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-blue-900/40 to-purple-900/40 opacity-30 animate-pulse"></div>

      {/* Improved Floating Decorative Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-teal-500/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute top-40 right-1/4 w-16 h-16 bg-purple-500/30 rounded-full blur-xl animate-float-slower"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-1">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Us Section - Enhanced */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white border-b-2 border-teal-500/30 pb-2 inline-block">
              About Us
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Rediscover the joy of reading with our curated collection of pre-loved books. 
              Join our community of book lovers and embrace sustainable reading.
            </p>
          </div>

          {/* Quick Links - Enhanced */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white border-b-2 border-teal-500/30 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/categories', label: 'Categories' },
                { path: '/contactus', label: 'Contact Us' },
                { path: '/faq', label: 'FAQ' }
              ].map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    onClick={scrollToTop}
                    className="group no-underline flex items-center text-gray-300 hover:text-teal-400 transition-all duration-300"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></i>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription - Enhanced */}
          <div className="lg:col-span-2 space-y-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <i className="fas fa-envelope-open-text text-3xl text-teal-400"></i>
              <h3 className="text-2xl font-bold text-white">
                Join Our Newsletter
              </h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300">
                Subscribe to get exclusive updates, special offers, and monthly reading recommendations!
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-4 rounded-lg bg-gray-800/80 border border-gray-700 focus:outline-none focus:border-teal-500 text-white placeholder-gray-500 pr-36 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-md hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                  >
                    Subscribe
                  </button>
                </div>
                {isSubscribed && (
                  <div className="flex items-center space-x-2 text-teal-400 animate-fade-in">
                    <p><i className="fas fa-check-circle"></i></p>
                    <p>Thank you for subscribing!</p>
                  </div>
                )}
              </form>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <p><i className="fas fa-shield-alt"></i></p>
                <p>We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>

          {/* Social Media - Enhanced */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white border-b-2 border-teal-500/30 pb-2 inline-block">
              Connect
            </h3>
            <div className="flex space-x-4">
              {[
                { icon: 'facebook-f', color: 'hover:text-white hover:bg-[#1877F2]', link: 'https://www.google.com' },
                { icon: 'twitter', color: 'hover:text-white hover:bg-[#1DA1F2]', link: 'https://www.google.com' },
                { icon: 'instagram', color: 'hover:text-white hover:bg-[#E4405F]', link: 'https://www.google.com' },
                { icon: 'linkedin-in', color: 'hover:text-white hover:bg-[#0A66C2]', link: 'https://www.google.com' }
              ].map((social, index) => (
                <NavLink
                  key={index}
                  to={social.link}
                  className={`w-10 h-10 flex text-teal-400 items-center no-underline justify-center rounded-lg bg-gray-800 ${social.color} transition-all duration-300 transform hover:scale-110 hover:rotate-6`}
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Categories - Enhanced */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 border-b-2 border-teal-500/30 pb-2 inline-block">
            Trending Categories
          </h3>
          <div className="flex flex-wrap gap-4">
            {[
              'Fiction', 'Science', 'History', 'Mystery', 'Self-Help', 'Fantasy'
            ].map((category, index) => (
              <span
                key={index}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 text-white hover:from-teal-500 hover:to-blue-500 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <span className="px-6 text-teal-500">
            <i className="fas fa-book-open text-3xl transform hover:scale-110 transition-transform duration-300"></i>
          </span>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        {/* Footer Bottom - Enhanced */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Second-Hand Bookstore. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            <i className="fas fa-arrow-up mr-2 transform group-hover:-translate-y-1 transition-transform duration-300"></i>
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;