import React from 'react';
import { PlayCircle, Download, AppleIcon, BookOpen, Search, Home, User } from 'lucide-react';

const DownloadApp = () => {
  const handleGooglePlayClick = () => {
    window.open('https://play.google.com/store', '_blank');
  };

  const handleAppStoreClick = () => {
    window.open('https://www.apple.com/app-store', '_blank');
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-indigo-50 rounded-full px-4 py-2 space-x-2 animate-fadeIn">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-sm font-medium text-indigo-600">New Features Available</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Download Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient">
                Mobile App Today
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Experience the future of reading on the go. Access millions of books, customize your reading experience, and join a global community of book lovers.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                'Offline Reading',
                'Night Mode',
                'Personalized Recommendations',
                'Reading Goals'
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 text-gray-700 transform hover:translate-x-2 transition-transform duration-300"
                >
                  <PlayCircle className="h-5 w-5 text-indigo-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons with Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGooglePlayClick}
                className="group relative overflow-hidden rounded-lg bg-black px-6 py-3 flex items-center justify-center space-x-3 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Download className="h-6 w-6 text-white" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </button>

              <button 
                onClick={handleAppStoreClick}
                className="group relative overflow-hidden rounded-lg bg-black px-6 py-3 flex items-center justify-center space-x-3 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <AppleIcon className="h-6 w-6 text-white" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Image Section with Animated Phone Mockup */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-indigo-100 rounded-full animate-spin-slow opacity-30"></div>
              <div className="absolute w-64 h-64 bg-purple-100 rounded-full animate-reverse-spin opacity-30"></div>
            </div>

            {/* Phone Mockup with Animated Content */}
            <div className="relative w-64 h-[500px] rounded-[3rem] border-8 border-black bg-white shadow-2xl transform hover:rotate-6 transition-transform duration-500">
              <div className="absolute top-0 w-full h-6 bg-black rounded-t-[2rem] flex justify-center">
                <div className="w-20 h-4 bg-black rounded-b-xl"></div>
              </div>
              
              {/* Animated App Interface */}
              <div className="h-full w-full bg-gradient-to-b from-indigo-50 to-purple-50 rounded-[2.5rem] p-4 overflow-hidden">
                {/* App Header */}
                <div className="text-center mb-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
                    Bookefy
                  </h2>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl p-3 mb-4 flex items-center space-x-2 shadow-md animate-slideInDown">
                  <Search className="h-4 w-4 text-gray-400" />
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                </div>

                {/* Featured Books Section */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-3 w-16 bg-gray-50 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-md transform translate-x-4 animate-slideInRight">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-3 w-12 bg-gray-50 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-2 shadow-lg flex justify-around animate-slideInUp">
                  <Home className="h-5 w-5 text-indigo-600" />
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10M+', label: 'Downloads' },
            { number: '4.8/5', label: 'App Rating' },
            { number: '150+', label: 'Countries' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-2xl font-bold text-indigo-600">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;