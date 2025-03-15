import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id, title, author, category, condition } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const isMobileView = useRef(window.innerWidth < 768);
  
  // Fetch book data using the ID
  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        // Fallback to using URL parameters if the fetch fails
        setBook({
          id,
          title: decodeURIComponent(title || ''),
          author: decodeURIComponent(author || ''),
          category: decodeURIComponent(category || ''),
          condition: decodeURIComponent(condition || ''),
          // Add other default values as needed
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id, title, author, category, condition]);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      isMobileView.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex]);
  
  // Handle pincode check
  const checkDelivery = () => {
    if (!pincode.trim()) {
      setDeliveryStatus(null);
      return;
    }
    
    const isAvailable = book.availablePincodes.includes(pincode);
    setDeliveryStatus({
      available: isAvailable,
      message: isAvailable 
        ? "Delivery available! Estimated delivery in 3-5 business days." 
        : "Sorry, delivery is not available in your area."
    });
  };
  
  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Navigate through image
  const navigateImage = (direction) => {
    setIsZoomed(false);
    const newIndex = currentImageIndex + direction;
    
    if (newIndex >= 0 && newIndex < book.image.length) {
      setCurrentImageIndex(newIndex);
    } else if (newIndex < 0) {
      setCurrentImageIndex(book.image.length - 1);
    } else {
      setCurrentImageIndex(0);
    }
  };
  
  // Zoom functionality
  const handleImageMouseMove = (e) => {
    if (!isZoomed || !imageContainerRef.current) return;
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  // Touch swipe functionality for mobile
  const touchStartX = useRef(null);
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      navigateImage(diff > 0 ? 1 : -1);
    }
    
    touchStartX.current = null;
  };
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Book Not Found</h2>
          <p className="mt-2 text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
          <NavLink to="/books" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Browse Books
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="flex flex-wrap">
          <li className="flex items-center">
            <NavLink to='/' className="text-gray-500 hover:text-blue-600">Home</NavLink>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="flex items-center">
            <NavLink to='/' className="text-gray-500 hover:text-blue-600">Books</NavLink>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="text-gray-800 font-medium truncate">{book.title}</li>
        </ol>
      </nav>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Image Section */}
        <div className="sticky top-4">
          <div className="relative p-20 overflow-hidden rounded-lg shadow-xl" 
               ref={imageContainerRef}
               onMouseMove={handleImageMouseMove}
               onMouseLeave={() => setIsZoomed(false)}
               onTouchStart={handleTouchStart}
               onTouchEnd={handleTouchEnd}
               tabIndex="0"
               aria-label={`Book image ${currentImageIndex + 1} of ${book.image.length}`}>
            
            {/* Main Image with Zoom Effect */}
            <div 
              className={`relative w-full aspect-[3/4] cursor-zoom-in transition-all duration-300 ${isZoomed ? 'scale-150' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
              style={isZoomed ? { 
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : {}}
            >
              <img 
                src={book.image[currentImageIndex]} 
                alt={`${book.title} - View ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Navigation Buttons for Larger Screens */}
            <div className="hidden md:block">
              <button 
                onClick={() => navigateImage(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => navigateImage(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Swipe Indicator for Mobile */}
            <div className="block md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
              Swipe to view more
            </div>
            
            {/* Zoom Indicator */}
            {!isZoomed && (
              <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
                Tap to zoom
              </div>
            )}
          </div>
          
          {/* Navigation Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {book.image.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentImageIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View image ${index + 1}`}
                aria-current={currentImageIndex === index ? 'true' : 'false'}
              />
            ))}
          </div>
          
          {/* Thumbnail Preview */}
          <div className="mt-4 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 pb-2">
              {book.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-28 border-2 rounded transition-all ${
                    currentImageIndex === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                  }`}
                  aria-label={`Thumbnail ${index + 1}`}
                  aria-pressed={currentImageIndex === index ? 'true' : 'false'}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Book Details Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{book.title}</h1>
          <div className="mt-2">
            <p className="text-lg text-gray-700">by <NavLink to='/' className="text-blue-600 hover:underline">{book.author}</NavLink></p>
          </div>
          
          {/* Ratings */}
          <div className="mt-4 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-700">{book.rating} ({book.reviewCount} reviews)</p>
          </div>
          
          {/* Price */}
          <div className="mt-4">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">${book.price}</span>
              {book.originalPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">${book.originalPrice}</span>
              )}
              {book.originalPrice && (
                <span className="ml-2 text-sm font-medium text-green-600">
                  Save ${(book.originalPrice - book.price).toFixed(2)} ({Math.round((1 - book.price/book.originalPrice) * 100)}%)
                </span>
              )}
            </div>
          </div>
          
          {/* Stock Status */}
          <div className="mt-4">
            {book.stock > 10 ? (
              <p className="text-green-600">In Stock</p>
            ) : book.stock > 0 ? (
              <p className="text-orange-500">Only {book.stock} left in stock - order soon</p>
            ) : (
              <p className="text-red-600">Out of Stock</p>
            )}
          </div>
          
          {/* Quantity Selector */}
          <div className="mt-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="mt-1 flex">
              <button 
                onClick={decrementQuantity}
                className="px-3 py-1 border border-gray-300 bg-gray-100 text-gray-600 rounded-l hover:bg-gray-200"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={book.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), book.stock))}
                className="w-16 border-t border-b border-gray-300 text-center"
              />
              <button 
                onClick={incrementQuantity}
                className="px-3 py-1 border border-gray-300 bg-gray-100 text-gray-600 rounded-r hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Buy Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
              Buy Now
            </button>
          </div>
          
          {/* Delivery Check */}
          <div className="mt-8 p-4 border border-gray-200 rounded-lg">
            <p className="font-medium">Check Delivery Availability</p>
            <div className="mt-2 flex">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button 
                onClick={checkDelivery}
                className="bg-gray-800 text-white px-4 py-2 rounded-r hover:bg-gray-700 focus:outline-none"
              >
                Check
              </button>
            </div>
            {deliveryStatus && (
              <p className={`mt-2 text-sm ${deliveryStatus.available ? 'text-green-600' : 'text-red-600'}`}>
                {deliveryStatus.message}
              </p>
            )}
          </div>
          
          {/* Delivery Options */}
          <div className="mt-6">
            <h3 className="text-lg font-medium">Delivery Options</h3>
            <ul className="mt-2 space-y-2">
              {book.deliveryOptions.map((option, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700">
                {showFullDescription 
                  ? book.description + " " + book.longDescription
                  : book.description}
              </p>
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(book.details).map(([key, value]) => (
                <div key={key} className="py-2 border-b border-gray-100">
                  <dt className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Write a Review</button>
              </div>
              
              <div className="mt-6 space-y-8">
                {/* Sample reviews */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">Verified Purchase</span>
                  </div>
                  <h4 className="font-medium">Life-changing book on design!</h4>
                  <p className="mt-1 text-sm text-gray-500">Reviewed by John D. on September 15, 2024</p>
                  <p className="mt-2 text-gray-700">This book completely changed how I view everyday objects. Norman's principles are still incredibly relevant today, and I find myself noticing design flaws everywhere now. Highly recommended for anyone interested in design or product development.</p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">Verified Purchase</span>
                  </div>
                  <h4 className="font-medium">Great for UX designers</h4>
                  <p className="mt-1 text-sm text-gray-500">Reviewed by Sarah M. on August 2, 2024</p>
                  <p className="mt-2 text-gray-700">Required reading for anyone in UX/UI design. The principles are timeless and I refer back to it constantly in my work. The examples might be a bit dated, but the concepts apply perfectly to modern digital interfaces.</p>
                </div>
              </div>
              
              <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium">
                View All Reviews
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Books */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="group">
              <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden">
                <img 
                  src={`/api/placeholder/200/300?text=Book ${i+1}`} 
                  alt={`Related Book ${i+1}`}
                  className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              <h3 className="mt-2 text-sm text-gray-700 truncate">Related Book Title</h3>
              <p className="text-sm text-gray-500">Author Name</p>
              <p className="mt-1 text-sm font-medium text-gray-900">$19.99</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recently Viewed */}
      <div className="mt-12 mb-8">
        <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="group">
              <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden">
                <img 
                  src={`/api/placeholder/200/300?text=Viewed ${i+1}`} 
                  alt={`Recently Viewed Book ${i+1}`}
                  className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              <h3 className="mt-2 text-sm text-gray-700 truncate">Recently Viewed Book</h3>
              <p className="text-sm text-gray-500">Author Name</p>
              <p className="mt-1 text-sm font-medium text-gray-900">$22.99</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom CSS for hiding scrollbars but keeping functionality */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BookDetail;