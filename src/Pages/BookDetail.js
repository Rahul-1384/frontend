// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink, useParams } from "react-router-dom";

// const BookDetail = () => {
//   const { id, title, author, category, condition } = useParams();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [pincode, setPincode] = useState('');
//   const [deliveryStatus, setDeliveryStatus] = useState(null);
//   const [activeTab, setActiveTab] = useState('description');
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const imageContainerRef = useRef(null);
//   const isMobileView = useRef(window.innerWidth < 768);
  
//   // Fetch book data using the ID
//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://localhost:5000/books/${id}`);
//         if (!response.ok) {
//           throw new Error('Book not found');
//         }
//         const data = await response.json();
//         setBook(data);
//       } catch (error) {
//         console.error('Error fetching book details:', error);
//         // Fallback to using URL parameters if the fetch fails
//         setBook({
//           id,
//           title: decodeURIComponent(title || ''),
//           author: decodeURIComponent(author || ''),
//           category: decodeURIComponent(category || ''),
//           condition: decodeURIComponent(condition || ''),
//           // Add other default values as needed
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchBookDetails();
//     }
//   }, [id, title, author, category, condition]);

//   // Detect screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       isMobileView.current = window.innerWidth < 768;
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
  
//   // Keyboard navigation for gallery
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowLeft') {
//         navigateImage(-1);
//       } else if (e.key === 'ArrowRight') {
//         navigateImage(1);
//       } else if (e.key === 'Escape') {
//         setIsZoomed(false);
//       }
//     };
    
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [currentImageIndex]);
  
//   // Handle pincode check
//   const checkDelivery = () => {
//     if (!pincode.trim()) {
//       setDeliveryStatus(null);
//       return;
//     }
    
//     const isAvailable = book.availablePincodes.includes(pincode);
//     setDeliveryStatus({
//       available: isAvailable,
//       message: isAvailable 
//         ? "Delivery available! Estimated delivery in 3-5 business days." 
//         : "Sorry, delivery is not available in your area."
//     });
//   };
  
//   // Handle quantity changes
//   const incrementQuantity = () => {
//     if (quantity < book.stock) {
//       setQuantity(quantity + 1);
//     }
//   };
  
//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   // Navigate through image
//   const navigateImage = (direction) => {
//     setIsZoomed(false);
//     const newIndex = currentImageIndex + direction;
    
//     if (newIndex >= 0 && newIndex < book.image.length) {
//       setCurrentImageIndex(newIndex);
//     } else if (newIndex < 0) {
//       setCurrentImageIndex(book.image.length - 1);
//     } else {
//       setCurrentImageIndex(0);
//     }
//   };
  
//   // Zoom functionality
//   const handleImageMouseMove = (e) => {
//     if (!isZoomed || !imageContainerRef.current) return;
    
//     const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
    
//     setZoomPosition({ x, y });
//   };
  
//   // Touch swipe functionality for mobile
//   const touchStartX = useRef(null);
  
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
  
//   const handleTouchEnd = (e) => {
//     if (touchStartX.current === null) return;
    
//     const touchEndX = e.changedTouches[0].clientX;
//     const diff = touchStartX.current - touchEndX;
    
//     if (Math.abs(diff) > 50) { // Minimum swipe distance
//       navigateImage(diff > 0 ? 1 : -1);
//     }
    
//     touchStartX.current = null;
//   };
//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-4 flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading book details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!book) {
//     return (
//       <div className="max-w-7xl mx-auto p-4 flex items-center justify-center h-screen">
//         <div className="text-center">
//           <p className="text-2xl font-bold text-red-600">Book Not Found</p>
//           <p className="mt-2 text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
//           <NavLink to="/books" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             Browse Books
//           </NavLink>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 bg-white">
//       {/* Breadcrumb */}
//       <nav className="text-sm mb-6">
//         <ol className="flex flex-wrap">
//           <li className="flex items-center">
//             <NavLink to='/' className="text-gray-500 hover:text-blue-600">Home</NavLink>
//             <span className="mx-2 text-gray-400">/</span>
//           </li>
//           <li className="flex items-center">
//             <NavLink to='/' className="text-gray-500 hover:text-blue-600">Books</NavLink>
//             <span className="mx-2 text-gray-400">/</span>
//           </li>
//           <li className="text-gray-800 font-medium truncate">{book.title}</li>
//         </ol>
//       </nav>
      
//       {/* Main Content */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Book Image Section */}
//         <div className="sticky top-4">
//           <div className="relative p-20 overflow-hidden rounded-lg shadow-xl" 
//                ref={imageContainerRef}
//                onMouseMove={handleImageMouseMove}
//                onMouseLeave={() => setIsZoomed(false)}
//                onTouchStart={handleTouchStart}
//                onTouchEnd={handleTouchEnd}
//                tabIndex="0"
//                aria-label={`Book image ${currentImageIndex + 1} of ${book.image.length}`}>
            
//             {/* Main Image with Zoom Effect */}
//             <div 
//               className={`relative w-full aspect-[3/4] cursor-zoom-in transition-all duration-300 ${isZoomed ? 'scale-150' : ''}`}
//               onClick={() => setIsZoomed(!isZoomed)}
//               style={isZoomed ? { 
//                 transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
//               } : {}}
//             >
//               <img 
//                 src={book.image[currentImageIndex]} 
//                 alt={`${book.title} - View ${currentImageIndex + 1}`} 
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             {/* Navigation Buttons for Larger Screens */}
//             <div className="hidden md:block">
//               <button 
//                 onClick={() => navigateImage(-1)}
//                 className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Previous image"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button 
//                 onClick={() => navigateImage(1)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Next image"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
            
//             {/* Swipe Indicator for Mobile */}
//             <div className="block md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
//               Swipe to view more
//             </div>
            
//             {/* Zoom Indicator */}
//             {!isZoomed && (
//               <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
//                 Tap to zoom
//               </div>
//             )}
//           </div>
          
//           {/* Navigation Dots */}
//           <div className="mt-4 flex justify-center gap-2">
//             {book.image.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentImageIndex(index)}
//                 className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   currentImageIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 aria-label={`View image ${index + 1}`}
//                 aria-current={currentImageIndex === index ? 'true' : 'false'}
//               />
//             ))}
//           </div>
          
//           {/* Thumbnail Preview */}
//           <div className="mt-4 overflow-x-auto hide-scrollbar">
//             <div className="flex gap-2 pb-2">
//               {book.image.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`flex-shrink-0 w-20 h-28 border-2 rounded transition-all ${
//                     currentImageIndex === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
//                   }`}
//                   aria-label={`Thumbnail ${index + 1}`}
//                   aria-pressed={currentImageIndex === index ? 'true' : 'false'}
//                 >
//                   <img 
//                     src={img} 
//                     alt={`Thumbnail ${index + 1}`} 
//                     className="w-full h-full object-cover rounded"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Book Details Section */}
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{book.title}</h1>
//           <div className="mt-2">
//             <p className="text-lg text-gray-700">by <NavLink to='/' className="text-blue-600 hover:underline">{book.author}</NavLink></p>
//           </div>
          
//           {/* Ratings */}
//           <div className="mt-4 flex items-center">
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <svg 
//                   key={i} 
//                   className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
//                   fill="currentColor" 
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <p className="ml-2 text-sm text-gray-700">{book.rating} ({book.reviewCount} reviews)</p>
//           </div>
          
//           {/* Price */}
//           <div className="mt-4">
//             <div className="flex items-baseline">
//               <span className="text-2xl font-bold text-gray-900">${book.price}</span>
//               {book.originalPrice && (
//                 <span className="ml-2 text-lg text-gray-500 line-through">${book.originalPrice}</span>
//               )}
//               {book.originalPrice && (
//                 <span className="ml-2 text-sm font-medium text-green-600">
//                   Save ${(book.originalPrice - book.price).toFixed(2)} ({Math.round((1 - book.price/book.originalPrice) * 100)}%)
//                 </span>
//               )}
//             </div>
//           </div>
          
//           {/* Stock Status */}
//           <div className="mt-4">
//             {book.stock > 10 ? (
//               <p className="text-green-600">In Stock</p>
//             ) : book.stock > 0 ? (
//               <p className="text-orange-500">Only {book.stock} left in stock - order soon</p>
//             ) : (
//               <p className="text-red-600">Out of Stock</p>
//             )}
//           </div>
          
//           {/* Quantity Selector */}
//           <div className="mt-6">
//             <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
//             <div className="mt-1 flex">
//               <button 
//                 onClick={decrementQuantity}
//                 className="px-3 py-1 border border-gray-300 bg-gray-100 text-gray-600 rounded-l hover:bg-gray-200"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 id="quantity"
//                 name="quantity"
//                 min="1"
//                 max={book.stock}
//                 value={quantity}
//                 onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), book.stock))}
//                 className="w-16 border-t border-b border-gray-300 text-center"
//               />
//               <button 
//                 onClick={incrementQuantity}
//                 className="px-3 py-1 border border-gray-300 bg-gray-100 text-gray-600 rounded-r hover:bg-gray-200"
//               >
//                 +
//               </button>
//             </div>
//           </div>
          
//           {/* Buy Buttons */}
//           <div className="mt-6 flex flex-col sm:flex-row gap-4">
//             <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
//               Add to Cart
//             </button>
//             <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors">
//               Buy Now
//             </button>
//           </div>
          
//           {/* Delivery Check */}
//           <div className="mt-8 p-4 border border-gray-200 rounded-lg">
//             <p className="font-medium">Check Delivery Availability</p>
//             <div className="mt-2 flex">
//               <input
//                 type="text"
//                 placeholder="Enter Pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               <button 
//                 onClick={checkDelivery}
//                 className="bg-gray-800 text-white px-4 py-2 rounded-r hover:bg-gray-700 focus:outline-none"
//               >
//                 Check
//               </button>
//             </div>
//             {deliveryStatus && (
//               <p className={`mt-2 text-sm ${deliveryStatus.available ? 'text-green-600' : 'text-red-600'}`}>
//                 {deliveryStatus.message}
//               </p>
//             )}
//           </div>
          
//           {/* Delivery Options */}
//           <div className="mt-6">
//             <h3 className="text-lg font-medium">Delivery Options</h3>
//             <ul className="mt-2 space-y-2">
//               {book.deliveryOptions.map((option, index) => (
//                 <li key={index} className="flex items-center">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   {option}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
      
//       {/* Tabs Section */}
//       <div className="mt-12">
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex space-x-8 overflow-x-auto hide-scrollbar">
//             <button
//               onClick={() => setActiveTab('description')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
//                 activeTab === 'description'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               Description
//             </button>
//             <button
//               onClick={() => setActiveTab('details')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
//                 activeTab === 'details'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               Product Details
//             </button>
//             <button
//               onClick={() => setActiveTab('reviews')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
//                 activeTab === 'reviews'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               Reviews
//             </button>
//           </nav>
//         </div>
        
//         <div className="py-6">
//           {activeTab === 'description' && (
//             <div>
//               <p className="text-gray-700">
//                 {showFullDescription 
//                   ? book.description + " " + book.longDescription
//                   : book.description}
//               </p>
//               <button 
//                 onClick={() => setShowFullDescription(!showFullDescription)}
//                 className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
//               >
//                 {showFullDescription ? 'Show Less' : 'Read More'}
//               </button>
//             </div>
//           )}
          
//           {activeTab === 'details' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {Object.entries(book.details).map(([key, value]) => (
//                 <div key={key} className="py-2 border-b border-gray-100">
//                   <dt className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
//                   <dd className="mt-1 text-sm text-gray-900">{value}</dd>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {activeTab === 'reviews' && (
//             <div>
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">Customer Reviews</h3>
//                 <button className="text-blue-600 hover:text-blue-800 font-medium">Write a Review</button>
//               </div>
              
//               <div className="mt-6 space-y-8">
//                 {/* Sample reviews */}
//                 <div className="border-b border-gray-200 pb-6">
//                   <div className="flex items-center mb-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <svg 
//                           key={i} 
//                           className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
//                           fill="currentColor" 
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 text-sm font-medium text-gray-700">Verified Purchase</span>
//                   </div>
//                   <h4 className="font-medium">Life-changing book on design!</h4>
//                   <p className="mt-1 text-sm text-gray-500">Reviewed by John D. on September 15, 2024</p>
//                   <p className="mt-2 text-gray-700">This book completely changed how I view everyday objects. Norman's principles are still incredibly relevant today, and I find myself noticing design flaws everywhere now. Highly recommended for anyone interested in design or product development.</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-6">
//                   <div className="flex items-center mb-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <svg 
//                           key={i} 
//                           className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
//                           fill="currentColor" 
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 text-sm font-medium text-gray-700">Verified Purchase</span>
//                   </div>
//                   <h4 className="font-medium">Great for UX designers</h4>
//                   <p className="mt-1 text-sm text-gray-500">Reviewed by Sarah M. on August 2, 2024</p>
//                   <p className="mt-2 text-gray-700">Required reading for anyone in UX/UI design. The principles are timeless and I refer back to it constantly in my work. The examples might be a bit dated, but the concepts apply perfectly to modern digital interfaces.</p>
//                 </div>
//               </div>
              
//               <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium">
//                 View All Reviews
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Related Books */}
//       <div className="mt-12">
//         <p className="text-xl font-bold text-gray-900">You Might Also Like</p>
//         <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="group">
//               <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden">
//                 <img 
//                   src={`/api/placeholder/200/300?text=Book ${i+1}`} 
//                   alt={`Related Book ${i+1}`}
//                   className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
//                 />
//               </div>
//               <h3 className="mt-2 text-sm text-gray-700 truncate">Related Book Title</h3>
//               <p className="text-sm text-gray-500">Author Name</p>
//               <p className="mt-1 text-sm font-medium text-gray-900">$19.99</p>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Recently Viewed */}
//       <div className="mt-12 mb-8">
//         <p className="text-xl font-bold text-gray-900">Recently Viewed</p>
//         <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="group">
//               <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden">
//                 <img 
//                   src={`/api/placeholder/200/300?text=Viewed ${i+1}`} 
//                   alt={`Recently Viewed Book ${i+1}`}
//                   className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
//                 />
//               </div>
//               <h3 className="mt-2 text-sm text-gray-700 truncate">Recently Viewed Book</h3>
//               <p className="text-sm text-gray-500">Author Name</p>
//               <p className="mt-1 text-sm font-medium text-gray-900">$22.99</p>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Custom CSS for hiding scrollbars but keeping functionality */}
//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BookDetail;































import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { toast } from 'react-toastify';
import AuthErrorModal from '../components/AuthErrorModal';
import { 
  Star, 
  Check, 
  ShoppingCart, 
  Heart, 
  ArrowLeft, 
  Truck, 
  Gift, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  Share2,
  BookOpen,
  Info
} from 'lucide-react';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, fetchCartItems } = useCart();
  
  // States
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // In production, replace with actual API endpoint
        const response = await fetch(`http://localhost:5000/books/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch book details: ${response.status}`);
        }
        
        const bookData = await response.json();
        
        // Create an array of sample images if the book doesn't have multiple images
        if (!bookData.images || bookData.images.length === 0) {
          bookData.images = [
            bookData.image || "/api/placeholder/400/600",
            "/api/placeholder/400/600?text=Back Cover",
            "/api/placeholder/400/600?text=Inside Pages"
          ];
        }
        
        // Add sample reviews if none exist
        if (!bookData.reviews) {
          bookData.reviews = [
            { id: 1, user: "Aryan S.", rating: 5, date: "2024-02-15", comment: "Excellent book for CBSE preparation. Covers all topics thoroughly." },
            { id: 2, user: "Priya K.", rating: 4, date: "2024-01-20", comment: "Good quality print and paper. Content is well-organized." },
            { id: 3, user: "Rajesh M.", rating: 5, date: "2023-12-05", comment: "Helped my child score well in exams. Highly recommended!" }
          ];
        }
        
        setBook(bookData);
        
        // Fetch related books (of the same category or author)
        fetchRelatedBooks(bookData.category, bookData.author, bookData.id);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Unable to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  // Fetch related books
  const fetchRelatedBooks = async (category, author, currentBookId) => {
    try {
      // In production, replace with actual API endpoint with proper query params
      const response = await fetch('http://localhost:5000/books');
      if (!response.ok) throw new Error("Failed to fetch related books");
      
      const books = await response.json();
      
      // Filter related books (same category or author, but not the current book)
      const related = books.filter(book => 
        book.id !== parseInt(currentBookId) && 
        (book.category === category || book.author === author)
      ).slice(0, 4);
      
      setRelatedBooks(related);
    } catch (error) {
      console.error("Error fetching related books:", error);
    }
  };

  // Handle login button click
  const handleLogin = () => {
    navigate(`/login?returnUrl=${encodeURIComponent(`/books/${id}`)}`);
    setShowAuthModal(false);
  };

  // Handle adding to cart
  const handleAddToCart = useCallback(async () => {
    if (isAddingToCart || !book) return;
  
    setIsAddingToCart(true);
    
    try {
      const authToken = localStorage.getItem("authToken");
      const accessToken = authToken ? JSON.parse(authToken).access : null;
  
      if (!accessToken) {
        // Show auth modal for authentication errors
        setShowAuthModal(true);
        setIsAddingToCart(false);
        return;
      }
  
      // In production, replace with actual API endpoint
      const response = await fetch("http://127.0.0.1:8000/api/cart/cart-detail/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ book_id: book.id, quantity: 1 })
      });
  
      if (!response.ok) {
        let errorText = "Failed to add item to cart.";
        try {
          const errorData = await response.json();
          if (errorData?.message) {
            errorText = errorData.message;
          } else if (errorData?.errors) {
            errorText = Object.values(errorData.errors).flat().join(", ");
          }
        } catch {
          errorText = "Unexpected server error.";
        }
  
        toast.error(errorText);
        setIsAddingToCart(false);
        return;
      }
  
      // Success case
      dispatch({ type: 'ADD_TO_CART', payload: book });
      setIsAdded(true);
      await fetchCartItems();
      toast.success("Book added to cart!");
  
      setTimeout(() => {
        setIsAdded(false);
        setIsAddingToCart(false);
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Network error. Please try again.");
      setIsAddingToCart(false);
    }
  }, [book, isAddingToCart, dispatch, fetchCartItems]);

  // Handle adding to wishlist
  const handleAddToWishlist = useCallback(() => {
    // In production, replace with actual wishlist API
    setIsInWishlist(prev => !prev);
    
    if (!isInWishlist) {
      toast.success("Added to wishlist!");
    } else {
      toast.info("Removed from wishlist");
    }
  }, [isInWishlist]);

  // Function to scroll through book images
  const handleImageNavigation = (direction) => {
    if (!book?.images) return;
    
    if (direction === 'next') {
      setActiveImageIndex((prev) => (prev + 1) % book.images.length);
    } else {
      setActiveImageIndex((prev) => (prev - 1 + book.images.length) % book.images.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Image skeleton */}
          <div className="md:w-2/5 animate-pulse">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-300 w-20 h-20 rounded-lg"></div>
              ))}
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="md:w-3/5 animate-pulse">
            <div className="bg-gray-300 h-10 w-3/4 rounded mb-4"></div>
            <div className="bg-gray-300 h-6 w-1/2 rounded mb-6"></div>
            <div className="bg-gray-300 h-8 w-1/4 rounded mb-6"></div>
            <div className="bg-gray-300 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded mb-6"></div>
            <div className="bg-gray-300 h-12 w-full rounded mb-4"></div>
            <div className="bg-gray-300 h-12 w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-red-50 p-8 rounded-lg shadow">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-xl font-semibold text-gray-800 mb-2">{error}</p>
          <p className="text-gray-600 mb-6">We couldn't find the book you're looking for.</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/products')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Browse Books
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Book not found
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-yellow-50 p-8 rounded-lg shadow">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-xl font-semibold text-gray-800 mb-2">Book Not Found</p>
          <p className="text-gray-600 mb-6">We couldn't find the book you're looking for.</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Browse Other Books
          </button>
        </div>
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice = Math.max(0, (book.price || 0) - (book.discount || 0)).toFixed(2);
  const discountPercentage = book.price > 0 && book.discount > 0 
    ? Math.round((book.discount / book.price) * 100) 
    : 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Books</span>
        </button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Main Book Details Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Images */}
            <div className="md:w-2/5 p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
              {/* Main Image with Navigation Controls */}
              <div className="relative h-72 sm:h-96 mb-4 rounded-lg overflow-hidden bg-gray-50">
                <img 
                  src={book.images[activeImageIndex] || book.image || "/api/placeholder/400/600"} 
                  alt={`${book.title} - Img ${activeImageIndex + 1}`} 
                  className="w-full h-full object-contain"
                />
                
                {/* Image Navigation */}
                {book.images && book.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {book.images && book.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {book.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded overflow-hidden ${
                        activeImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${book.title} thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Right Column - Details */}
            <div className="md:w-3/5 p-4 md:p-8">
              {/* Title and Author */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">by <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{book.author}</span></p>
              
              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (book.rating || 4) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-blue-600 cursor-pointer hover:underline">
                  {book.reviews ? book.reviews.length : (123).toLocaleString()} ratings
                </span>
              </div>
              
              {/* Price Section */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 items-baseline">
                  <div className="flex items-baseline">
                    <span className="text-2xl text-gray-600">₹</span>
                    <span className="text-3xl font-medium">{discountedPrice}</span>
                  </div>
                  {book.price > 0 && book.discount > 0 && (
                    <div className="flex text-sm gap-2 items-center">
                      <span className="text-gray-500 line-through">₹{book.price}</span>
                      <span className="text-red-600">({discountPercentage}% off)</span>
                    </div>
                  )}
                </div>
                
                {/* Tax Info */}
                <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>
              
              {/* Delivery Info */}
              <div className="mb-6 space-y-2">
                {!book.isPrime && (
                  <div className="flex text-gray-700 gap-2 items-center">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>
                      <span className="font-medium">FREE delivery:</span> {book.deliveryDate || "In 2 to 4 Days"}
                    </span>
                    {!book.fastDelivery && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                        Fastest delivery available
                      </span>
                    )}
                  </div>
                )}
                
                {/* Stock Status */}
                <div className="flex text-gray-700 gap-2 items-center">
                  <div className={`flex-shrink-0 h-2.5 w-2.5 rounded-full ${
                    book.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span>{book.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  {book.inStock && book.quantity && book.quantity < 10 && (
                    <span className="text-red-600 text-sm">
                      Only {book.quantity} left in stock - order soon
                    </span>
                  )}
                </div>
                
                {/* Gift Options */}
                <div className="flex text-gray-700 gap-2 items-center">
                  <Gift className="h-5 w-5" />
                  <span>Gift wrap available</span>
                </div>
              </div>
              
              {/* Book Specifications */}
              <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {book.edition && (
                  <>
                    <div className="text-gray-500">Edition:</div>
                    <div>{book.edition}</div>
                  </>
                )}
                {book.language && (
                  <>
                    <div className="text-gray-500">Language:</div>
                    <div>{book.language}</div>
                  </>
                )}
                {book.board && (
                  <>
                    <div className="text-gray-500">Board:</div>
                    <div>{book.board}</div>
                  </>
                )}
                {book.condition && (
                  <>
                    <div className="text-gray-500">Condition:</div>
                    <div>{book.condition}</div>
                  </>
                )}
                {book.pages && (
                  <>
                    <div className="text-gray-500">Pages:</div>
                    <div>{book.pages}</div>
                  </>
                )}
                {book.category && (
                  <>
                    <div className="text-gray-500">Category:</div>
                    <div>{book.category}</div>
                  </>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !book.inStock}
                  className={`flex-1 py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-colors ${
                    !book.inStock 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : isAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleAddToWishlist}
                  className={`py-3 px-6 border rounded-full font-medium flex items-center justify-center gap-2 transition-colors ${
                    isInWishlist 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Heart className={isInWishlist ? "h-5 w-5 fill-red-600 stroke-red-600" : "h-5 w-5"} />
                  {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              
              {/* Secure Transaction */}
              <div className="flex items-center text-xs text-gray-600 gap-2 border-t pt-4 border-gray-200">
                <Shield className="h-4 w-4" />
                <span>Secure transaction: Your transaction is secure. We work hard to protect your security and privacy.</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <p className="text-xl font-semibold mb-4 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  About this Book
                </p>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">{book.description || "No description available for this book."}</p>
                  {book.bulletPoints && book.bulletPoints.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {book.bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <p className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Customer Reviews
                </p>
                
                {/* Review Summary */}
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < (book.rating || 4) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-lg font-medium">{book.rating || 4} out of 5</span>
                </div>
                
                {/* Review List */}
                <div className="space-y-4">
                  {book.reviews && book.reviews.length > 0 ? (
                    (reviewsExpanded ? book.reviews : book.reviews.slice(0, 2)).map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-center mb-2">
                          <div className="bg-blue-100 text-blue-700 rounded-full h-8 w-8 flex items-center justify-center font-medium mr-2">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No reviews yet.</p>
                  )}
                  
                  {/* Show More Button */}
                  {book.reviews && book.reviews.length > 2 && (
                    <button 
                      onClick={() => setReviewsExpanded(!reviewsExpanded)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {reviewsExpanded ? "Show Less" : `Show All ${book.reviews.length} Reviews`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Additional Info */}
          <div className="lg:col-span-1">
            {/* Product Details Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <p className="text-xl font-semibold mb-4 flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  Product Details
                </p>
                <table className="w-full text-sm">
                  <tbody>
                    {book.publisher && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Publisher</td>
                        <td className="py-2">{book.publisher}</td>
                      </tr>
                    )}
                    {book.publishDate && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Publication Date</td>
                        <td className="py-2">{book.publishDate}</td>
                      </tr>
                    )}
                    {book.language && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Language</td>
                        <td className="py-2">{book.language}</td>
                      </tr>
                    )}
                    {book.pages && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Pages</td>
                        <td className="py-2">{book.pages}</td>
                      </tr>
                    )}
                    {book.isbn && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">ISBN</td>
                        <td className="py-2">{book.isbn}</td>
                      </tr>
                    )}
                    {book.dimensions && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Dimensions</td>
                        <td className="py-2">{book.dimensions}</td>
                      </tr>
                    )}
                    {book.weight && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Weight</td>
                        <td className="py-2">{book.weight}</td>
                      </tr>
                    )}
                    {book.board && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Board</td>
                        <td className="py-2">{book.board}</td>
                      </tr>
                    )}
                    {book.category && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-500">Category</td>
                        <td className="py-2">{book.category}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <p className="text-xl font-semibold mb-4 flex items-center">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share This Book
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.008 10.008 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M7.17 22c-.67 0-1.34-.17-1.95-.51l-3.12 1.38c-.51.23-1.07-.12-.97-.65l.4-2.48C.6 18.48 0 16.92 0 15.36v-2.72A6.47 6.47 0 016.47 6.2h11.06A6.47 6.47 0 0124 12.65v2.72A6.47 6.47 0 0117.54 22H7.17zM19 14.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-5.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-5.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Books */}
        {relatedBooks && relatedBooks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
            <div className="p-6">
              <p className="text-xl font-semibold mb-6">Related Books</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {relatedBooks.map((relatedBook) => (
                  <div key={relatedBook.id} 
                    onClick={() => navigate(`/books/${relatedBook.id}/${relatedBook.title}/${relatedBook.author}/${relatedBook.category}/${relatedBook.condition}`)}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-w-2 aspect-h-3 bg-gray-100">
                      <img 
                        src={relatedBook.image || "/api/placeholder/200/300"} 
                        alt={relatedBook.title} 
                        className="object-contain w-full h-full p-2"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2 hover:text-blue-600 cursor-pointer mb-1">
                        {relatedBook.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{relatedBook.author}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">₹{(relatedBook.price - (relatedBook.discount || 0)).toFixed(2)}</span>
                          {relatedBook.discount > 0 && (
                            <span className="text-xs text-gray-500 line-through ml-1">₹{relatedBook.price}</span>
                          )}
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                          <span>{relatedBook.rating || "4.0"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Error Modal */}
      <AuthErrorModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default BookDetail;