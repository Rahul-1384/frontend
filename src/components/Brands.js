import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Brands = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = {
    all: 'All Publishers',
    board: 'Educational Boards',
    private: 'Private Publishers'
  };

  const bookBrands = [
    { 
      name: 'NCERT', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'National Council of Educational Research and Training',
      category: 'board',
      stats: {
        books: '1000+',
        subjects: '15+',
        years: '60+'
      },
      features: ['Government Authorized', 'Comprehensive Curriculum', 'Research-Based Content']
    },
    { 
      name: 'CBSE', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMDWtCzfbGJtDc6xG9tMexbUVDPMooMY428A&s',
      description: 'Central Board of Secondary Education',
      category: 'board',
      stats: {
        books: '500+',
        subjects: '12+',
        years: '50+'
      },
      features: ['National Curriculum', 'Standardized Education', 'Quality Resources']
    },
    { 
      name: 'ICSE', 
      logo: 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2017/12/18/Pictures/_da0308dc-e3d9-11e7-b094-c21f82b60b0b.jpg',
      description: 'Indian Certificate of Secondary Education',
      category: 'board',
      stats: {
        books: '800+',
        subjects: '14+',
        years: '45+'
      },
      features: ['International Standards', 'Holistic Learning', 'Advanced Curriculum']
    },
    { 
      name: 'Oswaal', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqjaHfmC_iz2Sj24ZQ8WHew4_26R8VoPuoqQ&s',
      description: 'Leading Educational Books Publisher',
      category: 'private',
      stats: {
        books: '2000+',
        subjects: '20+',
        years: '30+'
      },
      features: ['Exam Preparation', 'Practice Materials', 'Study Guides']
    },
    { 
      name: 'Arihant', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOiWJdIfdLHuMsTAw4WjaUd9O521yVngVTA&s',
      description: 'Premier Publishing House for Competitive Exams',
      category: 'private',
      stats: {
        books: '3000+',
        subjects: '25+',
        years: '35+'
      },
      features: ['Test Series', 'Competitive Exams', 'Expert Authors']
    },
    { 
      name: 'S. Chand', 
      logo: 'https://i.ytimg.com/vi/OLqzqPbZSSg/maxresdefault.jpg',
      description: "India's Oldest and Largest Educational Books Publisher",
      category: 'private',
      stats: {
        books: '5000+',
        subjects: '30+',
        years: '80+'
      },
      features: ['Legacy Publisher', 'Diverse Portfolio', 'Quality Education']
    },
    {
      name: "MTG Learning Media",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Leading publisher for Olympiad preparation and science education. Known for comprehensive study materials and practice papers.",
      category: "Competitive Exams",
      stats: {
        books: "800+",
        students: "15M+",
        editions: "1500+"
      },
      features: ['Olympiad Preparation', 'Science Education', 'Practice Papers']
    },
    {
      name: "Goyal Brothers Prakashan",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Established publisher with strong presence in CBSE and ICSE curriculum. Known for quality textbooks and study materials.",
      category: "private",
      stats: {
        books: "1500+",
        students: "12M+",
        editions: "2500+"
      },
      features: ['CBSE & ICSE Books', 'Quality Content', 'Comprehensive Coverage']
    },
    {
      name: "Laxmi Publications",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Famous for engineering and technical books. Specializes in computer science, IT, and management subjects.",
      category: "private",
      stats: {
        books: "2000+",
        students: "8M+",
        editions: "3000+"
      },
      features: ['Technical Books', 'Engineering Subjects', 'Management Books']
    },
    {
      name: "Upkar Prakashan",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Specializes in government exam preparation. Popular for SSC, Railway, and Banking exam materials.",
      category: "Competitive Exams",
      stats: {
        books: "600+",
        students: "5M+",
        editions: "1000+"
      },
      features: ['Government Exams', 'Banking Exams', 'Railway Exams']
    },
    {
      name: "Navneet Publications",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Popular in Maharashtra and Gujarat. Known for SSC and state board exam preparation materials.",
      category: "Competitive Exams",
      stats: {
        books: "1000+",
        students: "7M+",
        editions: "1500+"
      },
      features: ['State Board Exams', 'SSC Preparation', 'Regional Focus']
    },
    {
      name: "Unique Publishers",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Specializes in competitive exam preparation. Known for comprehensive study materials and practice tests.",
      category: "Competitive Exams",
      stats: {
        books: "500+",
        students: "4M+",
        editions: "800+"
      },
      features: ['Competitive Exams', 'Practice Tests', 'Study Materials']
    },
    {
      name: "G.K. Publications",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Famous for general knowledge books and current affairs materials. Essential for various competitive exams.",
      category: "Competitive Exams",
      stats: {
        books: "300+",
        students: "6M+",
        editions: "500+"
      },
      features: ['General Knowledge', 'Current Affairs', 'Competitive Exams']
    },
    {
      name: "Pragati Prakashan",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Known for engineering textbooks with practical examples. Popular among technical students.",
      category: "private",
      stats: {
        books: "400+",
        students: "3M+",
        editions: "600+"
      },
      features: ['Engineering Books', 'Practical Examples', 'Technical Education']
    },
    {
      name: "Vidya Prakashan",
      logo: "https://images-na.ssl-images-amazon.com/images/I/71QqX5F3RzL._AC_UL600_SR600,400_.jpg",
      description: "Specializes in CBSE and ICSE textbooks. Known for quality content and comprehensive coverage.",
      category: "private",
      stats: {
        books: "700+",
        students: "5M+",
        editions: "1000+"
      },
      features: ['CBSE & ICSE Books', 'Quality Content', 'School Education']
    }
  ];

  const filteredBrands = activeTab === 'all' 
    ? bookBrands 
    : bookBrands.filter(brand => brand.category === activeTab);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === filteredBrands.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [filteredBrands.length]);

  return (
    <section className="min-h-screen bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Available Book Brands
            </span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Find textbooks, study guides & exam materials from NCERT, CBSE, ICSE & leading publishers
          </motion.p>
        </div>

        {/* Category Tabs - Mobile Dropdown */}
        <div className="md:hidden mb-8 px-4">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full px-4 py-3 bg-white rounded-lg shadow-md flex items-center justify-between text-gray-900"
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">{categories[activeTab]}</span>
            <svg 
              className={`w-5 h-5 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 mt-2 w-full max-w-sm left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg py-2"
              >
                {Object.entries(categories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setIsMenuOpen(false);
                      setCurrentIndex(0);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors duration-200 ${
                      activeTab === key ? 'text-gray-900 font-medium' : 'text-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Tabs - Desktop */}
        <motion.div 
          className="hidden md:flex justify-center gap-3 lg:gap-4 mb-12 lg:mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setCurrentIndex(0);
              }}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === key
                ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-105'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Sliding Brands Carousel */}
        <div className="relative overflow-hidden px-4">
          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentIndex(prev => prev === 0 ? filteredBrands.length - 1 : prev - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex(prev => prev === filteredBrands.length - 1 ? 0 : prev + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-white p-2 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative bg-white rounded-xl border border-gray-100 overflow-hidden">
                {/* Brand Category Tag */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-900/10 text-gray-900">
                    {filteredBrands[currentIndex].category === 'board' ? 'Educational Board' : 'Private Publisher'}
                  </span>
                </div>

                {/* Logo Section */}
                <div className="relative h-32 sm:h-40 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <motion.img
                    src={filteredBrands[currentIndex].logo}
                    alt={`${filteredBrands[currentIndex].name} logo`}
                    className="w-full h-full object-contain mix-blend-multiply"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {filteredBrands[currentIndex].name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                    {filteredBrands[currentIndex].description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {filteredBrands[currentIndex].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100">
                    {Object.entries(filteredBrands[currentIndex].stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-lg sm:text-xl font-bold text-gray-900">{value}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {filteredBrands.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-gray-900 w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;