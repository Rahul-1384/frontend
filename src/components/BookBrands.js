import React, { useState } from 'react';
import { Info } from 'lucide-react';

const BookBrands = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const bookBrands = [
    { 
      name: 'NCERT', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'National Council of Educational Research and Training, primary textbook publisher in India.',
      speciality: 'Educational Textbooks'
    },
    { 
      name: 'Oxford', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'Renowned global publisher with extensive academic and literary collections.',
      speciality: 'Academic & Literature'
    },
    { 
      name: 'Cambridge', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'World-leading academic publisher known for scholarly works and research.',
      speciality: 'Research Publications'
    },
    { 
      name: 'Pearson', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'Multinational publishing and education company with global reach.',
      speciality: 'Educational Technology'
    },
    { 
      name: 'McGraw-Hill', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'Major educational content, software, and services provider.',
      speciality: 'Professional Learning'
    },
    { 
      name: 'Wiley', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'International academic publisher focusing on research and professional development.',
      speciality: 'Scientific Research'
    },
    { 
      name: 'Macmillan', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'Global publishing company with strong presence in academic and trade markets.',
      speciality: 'Diverse Publications'
    },
    { 
      name: 'Springer', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/91/NCERT_300px.svg',
      description: 'Leading scientific and technical publisher of research journals and books.',
      speciality: 'STEM Publications'
    }
  ];

  return (
    <div className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Featured Publishers
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore a world of knowledge from top global publishers
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bookBrands.map((brand, index) => (
            <div 
              key={index}
              className="relative"
              onMouseEnter={() => setSelectedBrand(brand.name)}
              onMouseLeave={() => setSelectedBrand(null)}
            >
              <div className={`
                bg-white rounded-xl shadow-md p-4 sm:p-6 
                flex flex-col items-center 
                transform transition-all duration-300
                ${selectedBrand === brand.name 
                  ? 'scale-105 shadow-xl' 
                  : 'scale-100 hover:scale-105'}
              `}>
                {/* Brand Logo */}
                <div className="mb-4 h-20 flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-16 max-w-full object-contain 
                      grayscale opacity-70 
                      group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>

                {/* Brand Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {brand.name}
                </h3>

                {/* Detailed Info Overlay */}
                {selectedBrand === brand.name && (
                  <div className="absolute inset-0 bg-white bg-opacity-95 
                    rounded-xl p-4 flex flex-col items-center justify-center 
                    text-center z-10 animate-fade-in">
                    <p className="text-sm text-gray-700 mb-2">
                      {brand.description}
                    </p>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 
                      rounded-full text-xs">
                      {brand.speciality}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BookBrands;