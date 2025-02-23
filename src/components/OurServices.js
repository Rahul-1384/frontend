import React, { useState } from 'react';
import { Book, Library, Heart, Truck, BookOpen, IndianRupee } from 'lucide-react';

const OurServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      icon: <Book />,
      title: "Buy & Sell Books",
      description: "Find your next favorite read or give your books a new home. Get the best prices on pre-loved books.",
      tag: "Most Popular",
      stats: "10K+ Books Available"
    },
    {
      icon: <Library />,
      title: "Book Rental",
      description: "Rent books for as long as you need. Perfect for students and avid readers on a budget.",
      tag: "Best Value",
      stats: "500+ Weekly Rentals"
    },
    {
      icon: <Heart />,
      title: "Book Donation",
      description: "Share the joy of reading by donating your books. Help us make literature accessible to everyone.",
      tag: "Community",
      stats: "2K+ Books Donated"
    },
    {
      icon: <BookOpen />,
      title: "Manga Collection",
      description: "Explore our extensive manga section featuring both popular series and rare editions.",
      tag: "New",
      stats: "1K+ Manga Titles"
    },
    {
      icon: <Truck />,
      title: "Doorstep Service",
      description: "Convenient pickup and delivery right at your doorstep. Schedule a time that works best for you.",
      tag: "Free Delivery",
      stats: "24hr Delivery"
    },
    {
      icon: <IndianRupee />,
      title: "Affordable Prices",
      description: "Quality books shouldn't break the bank. Enjoy reading without compromising your budget.",
      tag: "Best Deals",
      stats: "Up to 70% Off"
    }
  ];

  return (
    <div className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-indigo-100 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-violet-100 rounded-full mix-blend-multiply opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 top-1/4 left-1/3 bg-purple-100 rounded-full mix-blend-multiply opacity-40 animate-float"></div>
        <div className="absolute w-64 h-64 bottom-1/4 right-1/3 bg-fuchsia-100 rounded-full mix-blend-multiply opacity-40 animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 mb-6 animate-gradient">
            Discover Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your gateway to endless reading possibilities
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                group relative bg-white rounded-2xl p-8 
                transition-all duration-500 hover:shadow-2xl border border-gray-100
                transform hover:-translate-y-2 cursor-pointer
                ${hoveredIndex === index ? 'bg-gray-50 scale-105' : ''}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Enhanced Service Tag */}
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm px-4 py-1 rounded-full font-medium transform group-hover:scale-110 transition-transform duration-300">
                {service.tag}
              </div>

              {/* Enhanced Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {React.cloneElement(service.icon, { size: 28 })}
                </div>
              </div>

              {/* Enhanced Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {service.description}
              </p>

              {/* New Stats Section */}
              <div className="mt-4 py-2 px-4 bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-medium text-indigo-600">{service.stats}</span>
              </div>

              {/* Enhanced Call to Action */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-indigo-600 group-hover:text-violet-600 transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;