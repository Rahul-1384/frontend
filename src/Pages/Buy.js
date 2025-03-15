// Buy.js
import React, { useState } from 'react';
import BooksNavbar from '../components/BooksNavbar';
import BookFilter from '../components/BookFilter';
import Navbar from '../components/Navbar';

const Buy = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
  };

  return (
    <div>
      {/* <BooksNavbar onSearch={handleSearch} /> */}
      <Navbar onSearch={handleSearch} />
      <BookFilter searchQuery={searchQuery} />
    </div>
  );
};

export default Buy;




// import React, { useState, useEffect } from 'react';
// import { Search, Filter, ArrowUpDown, ChevronDown, Plus, Minus, Trash2, X, Grid3X3, List, Heart, ShoppingCart, Star, Eye } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Buy = () => {
//   const navigate = useNavigate();
  
//   // State management
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     board: [],
//     category: [],
//     subject: [],
//     reference: [],
//     competitive: [],
//     condition: [],
//     language: [],
//     genre: [],
//     sortBy: 'newest'
//   });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilterPanel, setActiveFilterPanel] = useState(null);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [wishlistOpen, setWishlistOpen] = useState(false);

//   const updateCartItemQuantity = (itemId, newQuantity) => {
//     setCartItems(prevItems => 
//       prevItems.map(item => 
//         item.id === itemId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const calculateCartTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleCheckout = () => {
//     navigate('/checkout'); // Redirect to checkout page
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
//   };
  
//   const removeFromWishlist = (itemId) => {
//     setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
//   };

//   // Fetch products from backend
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const queryParams = new URLSearchParams();
      
//       if (searchQuery) queryParams.append('search', searchQuery);
      
//       Object.entries(filters).forEach(([key, value]) => {
//         if (Array.isArray(value) && value.length > 0) {
//           value.forEach(val => queryParams.append(key, val));
//         } else if (!Array.isArray(value) && value) {
//           queryParams.append(key, value);
//         }
//       });
      
//       const url = `/api/products?${queryParams.toString()}`;
//       console.log(`Fetching from: ${url}`);
      
//       // Simulating API fetch with timeout
//       setTimeout(() => {
//         const mockData = Array(24).fill().map((_, i) => ({
//           id: i + 1,
//           title: `${['The Art of', 'Principles of', 'Advanced', 'Introduction to', 'Modern'][Math.floor(Math.random() * 5)]} ${['Mathematics', 'Physics', 'Literature', 'History', 'Biology'][Math.floor(Math.random() * 5)]} - Vol. ${Math.floor(Math.random() * 3) + 1}`,
//           author: ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'David Garcia'][Math.floor(Math.random() * 5)],
//           price: Math.floor(Math.random() * 200) + 10,
//           originalPrice: Math.floor(Math.random() * 300) + 100,
//           discount: Math.floor(Math.random() * 40) + 10,
//           image: `https://m.media-amazon.com/images/I/31WIiECCtxL._AC_UF1000,1000_QL80_.jpg`,
//           category: ['Academic', 'Fiction', 'Reference', 'Textbook', 'Study Guide'][Math.floor(Math.random() * 5)],
//           board: ['CBSE', 'ICSE', 'State Board', 'International'][Math.floor(Math.random() * 4)],
//           subject: ['Math', 'Science', 'History', 'Literature', 'Art'][Math.floor(Math.random() * 5)],
//           condition: ['New', 'Like New', 'Good', 'Fair'][Math.floor(Math.random() * 4)],
//           language: ['English', 'Spanish', 'French', 'Hindi', 'Chinese'][Math.floor(Math.random() * 5)],
//           rating: (Math.random() * 2 + 3).toFixed(1),
//           reviewCount: Math.floor(Math.random() * 200) + 5,
//           stockStatus: Math.random() > 0.2 ? 'In Stock' : 'Out of Stock',
//           date: new Date(Date.now() - Math.random() * 10000000000),
//           description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi. Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi."
//         }));
        
//         setProducts(mockData);
//         setLoading(false);
//       }, 800);
      
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setLoading(false);
//     }
//   };

//   // Fetch products when filters or search change
//   useEffect(() => {
//     fetchProducts();
    
//     const queryParams = new URLSearchParams(window.location.search);
    
//     if (searchQuery) {
//       queryParams.set('search', searchQuery);
//     } else {
//       queryParams.delete('search');
//     }
    
//     Object.entries(filters).forEach(([key, value]) => {
//       queryParams.delete(key);
//       if (Array.isArray(value) && value.length > 0) {
//         value.forEach(val => queryParams.append(key, val));
//       } else if (!Array.isArray(value) && value) {
//         queryParams.set(key, value);
//       }
//     });
    
//     const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
//     window.history.replaceState({}, '', newUrl);
    
//   }, [filters, searchQuery]);

//   // Filter options data
//   const filterOptions = {
//     board: ["CBSE", "ICSE", "State Board", "International"],
//     category: ["Academic", "Fiction", "Reference", "Textbook", "Study Guide"],
//     subject: ["Math", "Science", "History", "Literature", "Art"],
//     reference: ["Reference 1", "Reference 2", "Reference 3"],
//     competitive: ["JEE", "NEET", "CAT", "UPSC", "Banking"],
//     condition: ["New", "Like New", "Good", "Fair", "Poor"],
//     language: ["English", "Hindi", "Spanish", "French", "German", "Chinese"],
//     genre: ["Fiction", "Non-Fiction", "Fantasy", "Sci-Fi", "Biography", "Self-Help"]
//   };

//   // Sort options
//   const sortOptions = [
//     { value: 'price_asc', label: 'Price: Low to High' },
//     { value: 'price_desc', label: 'Price: High to Low' },
//     { value: 'newest', label: 'Newest First' },
//     { value: 'oldest', label: 'Oldest First' },
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'rating', label: 'Highest Rated' }
//   ];

//   // Handle filter changes
//   const handleFilterChange = (type, value) => {
//     setFilters(prev => {
//       const newFilters = { ...prev };
      
//       if (type === 'sortBy') {
//         newFilters.sortBy = value;
//       } else {
//         if (newFilters[type].includes(value)) {
//           newFilters[type] = newFilters[type].filter(item => item !== value);
//         } else {
//           newFilters[type] = [...newFilters[type], value];
//         }
//       }
      
//       return newFilters;
//     });
//   };

//   // Clear a specific filter
//   const clearFilter = (type) => {
//     setFilters(prev => ({
//       ...prev,
//       [type]: []
//     }));
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setFilters({
//       board: [],
//       category: [],
//       subject: [],
//       reference: [],
//       competitive: [],
//       condition: [],
//       language: [],
//       genre: [],
//       sortBy: 'newest'
//     });
//     setSearchQuery('');
//   };

//   // Toggle filter panel visibility
//   const toggleFilterPanel = (panel) => {
//     if (activeFilterPanel === panel) {
//       setActiveFilterPanel(null);
//     } else {
//       setActiveFilterPanel(panel);
//     }
//   };

//   // Get active filter count
//   const getActiveFilterCount = () => {
//     return Object.entries(filters).reduce((count, [key, value]) => {
//       if (key === 'sortBy') return count; // Don't count sort as a filter
//       return count + (Array.isArray(value) ? value.length : 0);
//     }, 0);
//   };

//   // Handle add to cart
//   const handleAddToCart = (product, buyNow = false) => {
//     setCartItems(prev => {
//       const existingItem = prev.find(item => item.id === product.id);
      
//       if (existingItem) {
//         return prev.map(item => 
//           item.id === product.id 
//             ? { ...item, quantity: item.quantity + 1 } 
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
    
//     alert(buyNow ? "Added to cart! Redirecting to checkout..." : "Added to cart!");
    
//     if (buyNow) {
//       setTimeout(() => {
//         navigate('/checkout');
//       }, 500);
//     }
//   };

//   // Handle add to wishlist
//   const handleAddToWishlist = (product) => {
//     setWishlistItems(prev => {
//       if (prev.some(item => item.id === product.id)) {
//         return prev.filter(item => item.id !== product.id);
//       } else {
//         return [...prev, product];
//       }
//     });
//   };

//   // Handle view product details
//   const handleViewProduct = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   // Handle quick view
//   const handleQuickView = (product) => {
//     setQuickViewProduct(product);
//   };

//   // Close quick view
//   const closeQuickView = () => {
//     setQuickViewProduct(null);
//   };

//   // Render star ratings
//   const renderRating = (rating, max = 5) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
//     const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
    
//     return (
//       <div className="flex items-center">
//         {[...Array(fullStars)].map((_, i) => (
//           <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
//         ))}
//         {hasHalfStar && (
//           <div className="relative">
//             <Star size={16} className="text-gray-300 fill-gray-300" />
//             <div className="absolute left-0 top-0 overflow-hidden w-1/2">
//               <Star size={16} className="text-yellow-400 fill-yellow-400" />
//             </div>
//           </div>
//         )}
//         {[...Array(emptyStars)].map((_, i) => (
//           <Star key={`empty-${i}`} size={16} className="text-gray-300 fill-gray-300" />
//         ))}
//       </div>
//     );
//   };

//   // Function to calculate discount percentage
//   const calculateDiscount = (originalPrice, currentPrice) => {
//     if (!originalPrice || originalPrice <= currentPrice) return null;
//     const discount = Math.round((originalPrice - currentPrice) / originalPrice * 100);
//     return discount;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header with search and navigation */}
//       <header className="bg-white shadow sticky top-0 z-30">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-blue-700">BookStore</h1>
//             </div>
            
//             {/* Search bar */}
//             <div className="relative w-full md:w-1/3">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Search size={18} className="text-gray-500" />
//               </div>
//               <input
//                 type="text"
//                 className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Search books, authors, subjects..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//               />
//               {searchQuery && (
//                 <button 
//                   className="absolute inset-y-0 right-0 flex items-center pr-3"
//                   onClick={() => setSearchQuery('')}
//                 >
//                   <X size={18} className="text-gray-500 hover:text-gray-700" />
//                 </button>
//               )}
//             </div>
            
//             {/* Navigation icons */}
//             <div className="flex items-center gap-6">
//               <button className="relative" onClick={() => setWishlistOpen(true)}>
//                 <Heart size={24} className="text-gray-700 hover:text-red-500" />
//                 {wishlistItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                     {wishlistItems.length}
//                   </span>
//                 )}
//               </button>
//               <button className="relative" onClick={() => setCartOpen(true)}>
//                 <ShoppingCart size={24} className="text-gray-700 hover:text-blue-500" />
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </button>
//               <button className="hidden md:block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors">
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Category navigation */}
//       <div className="bg-blue-700 text-white overflow-x-auto">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center py-2 space-x-6 whitespace-nowrap">
//             <a href="#" className="text-sm font-medium hover:text-blue-200 transition-colors py-1">All Categories</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Academic</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Fiction</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Children's</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Self-Help</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Biography</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Business</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Competitive Exams</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">New Arrivals</a>
//             <a href="#" className="text-sm hover:text-blue-200 transition-colors py-1">Best Sellers</a>
//           </div>
//         </div>
//       </div>

//       <main className="container mx-auto px-4 py-6">
//         {/* Page title and breadcrumb */}
//         <div className="mb-6">
//           <div className="flex items-center text-sm text-gray-500 mb-2">
//             <a href="#" className="hover:text-blue-600">Home</a>
//             <span className="mx-2">/</span>
//             <a href="#" className="hover:text-blue-600">Books</a>
//             <span className="mx-2">/</span>
//             <span className="text-gray-700">All Books</span>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">Books Collection</h1>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Filter sidebar - Desktop */}
//           <aside className="hidden lg:block w-64 bg-white rounded-lg shadow p-4 h-fit sticky top-24">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               {getActiveFilterCount() > 0 && (
//                 <button 
//                   className="text-sm text-blue-600 hover:text-blue-800"
//                   onClick={clearAllFilters}
//                 >
//                   Clear all
//                 </button>
//               )}
//             </div>

//             {/* Filter sections */}
//             {Object.entries(filterOptions).map(([key, options]) => (
//               <div key={key} className="mb-4 pb-4 border-b border-gray-200">
//                 <div 
//                   className="flex justify-between items-center cursor-pointer mb-2"
//                   onClick={() => toggleFilterPanel(key)}
//                 >
//                   <h3 className="font-medium capitalize">{key}</h3>
//                   <div className="flex items-center">
//                     {filters[key].length > 0 && (
//                       <span className="mr-2 text-xs font-medium text-blue-600">
//                         {filters[key].length}
//                       </span>
//                     )}
//                     <ChevronDown 
//                       size={16} 
//                       className={`transition-transform ${activeFilterPanel === key ? 'rotate-180' : ''}`} 
//                     />
//                   </div>
//                 </div>
                
//                 {activeFilterPanel === key && (
//                   <div className="pl-1 space-y-1 max-h-48 overflow-y-auto">
//                     {options.map(option => (
//                       <label key={option} className="flex items-center gap-2 cursor-pointer py-1">
//                         <input
//                           type="checkbox"
//                           className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                           checked={filters[key].includes(option)}
//                           onChange={() => handleFilterChange(key, option)}
//                         />
//                         <span className="text-sm">{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Price range filter */}
//             <div className="mb-4 pb-4 border-b border-gray-200">
//               <div 
//                 className="flex justify-between items-center cursor-pointer mb-2"
//                 onClick={() => toggleFilterPanel('price')}
//               >
//                 <h3 className="font-medium">Price Range</h3>
//                 <ChevronDown 
//                   size={16} 
//                   className={`transition-transform ${activeFilterPanel === 'price' ? 'rotate-180' : ''}`} 
//                 />
//               </div>
              
//               {activeFilterPanel === 'price' && (
//                 <div className="pl-1 space-y-4">
//                   <div className="flex justify-between items-center">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       className="w-20 p-2 border rounded"
//                     />
//                     <span className="text-gray-500">to</span>
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       className="w-20 p-2 border rounded"
//                     />
//                   </div>
//                   <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
//                     Apply
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Rating filter */}
//             <div className="mb-4 pb-4 border-b border-gray-200">
//               <div 
//                 className="flex justify-between items-center cursor-pointer mb-2"
//                 onClick={() => toggleFilterPanel('rating')}
//               >
//                 <h3 className="font-medium">Customer Rating</h3>
//                 <ChevronDown 
//                   size={16} 
//                   className={`transition-transform ${activeFilterPanel === 'rating' ? 'rotate-180' : ''}`} 
//                 />
//               </div>
              
//               {activeFilterPanel === 'rating' && (
//                 <div className="pl-1 space-y-2">
//                   {[4, 3, 2, 1].map(rating => (
//                     <label key={rating} className="flex items-center gap-2 cursor-pointer py-1">
//                       <input
//                         type="checkbox"
//                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                       <span className="flex items-center">
//                         {renderRating(rating)}
//                         <span className="ml-1 text-sm text-gray-600">& Up</span>
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Availability filter */}
//             <div className="mb-4">
//               <div 
//                 className="flex justify-between items-center cursor-pointer mb-2"
//                 onClick={() => toggleFilterPanel('availability')}
//               >
//                 <h3 className="font-medium">Availability</h3>
//                 <ChevronDown 
//                   size={16} 
//                   className={`transition-transform ${activeFilterPanel === 'availability' ? 'rotate-180' : ''}`} 
//                 />
//               </div>
              
//               {activeFilterPanel === 'availability' && (
//                 <div className="pl-1 space-y-1">
//                   <label className="flex items-center gap-2 cursor-pointer py-1">
//                     <input
//                       type="checkbox"
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm">In Stock</span>
//                   </label>
//                   <label className="flex items-center gap-2 cursor-pointer py-1">
//                     <input
//                       type="checkbox"
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm">Out of Stock</span>
//                   </label>
//                 </div>
//               )}
//             </div>
//           </aside>

//           {/* Mobile filter button */}
//           <div className="lg:hidden mb-4">
//             <button 
//               className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
//               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
//             >
//               <Filter size={18} />
//               <span>Filters</span>
//               {getActiveFilterCount() > 0 && (
//                 <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
//                   {getActiveFilterCount()}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Filter sidebar - Mobile */}
//           {mobileFiltersOpen && (
//             <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex lg:hidden">
//               <div className="ml-auto w-4/5 max-w-md bg-white h-full overflow-y-auto p-4">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-lg font-bold">Filters</h2>
//                   <button 
//                     className="text-gray-500"
//                     onClick={() => setMobileFiltersOpen(false)}
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>

//                 {getActiveFilterCount() > 0 && (
//                   <button 
//                     className="w-full py-2 mb-4 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded-lg"
//                     onClick={clearAllFilters}
//                   >
//                     Clear all filters
//                   </button>
//                 )}

//                 {/* Mobile filter sections */}
//                 {Object.entries(filterOptions).map(([key, options]) => (
//                   <div key={key} className="mb-4 pb-4 border-b border-gray-200">
//                     <div 
//                       className="flex justify-between items-center cursor-pointer mb-2"
//                       onClick={() => toggleFilterPanel(key)}
//                     >
//                       <h3 className="font-medium capitalize">{key}</h3>
//                       <div className="flex items-center">
//                         {filters[key].length > 0 && (
//                           <span className="mr-2 text-xs font-medium text-blue-600">
//                             {filters[key].length}
//                           </span>
//                         )}
//                         <ChevronDown 
//                           size={16} 
//                           className={`transition-transform ${activeFilterPanel === key ? 'rotate-180' : ''}`} 
//                         />
//                       </div>
//                     </div>
                    
//                     {activeFilterPanel === key && (
//                       <div className="pl-1 space-y-1 max-h-48 overflow-y-auto">
//                         {options.map(option => (
//                           <label key={option} className="flex items-center gap-2 cursor-pointer py-1">
//                             <input
//                               type="checkbox"
//                               className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                               checked={filters[key].includes(option)}
//                               onChange={() => handleFilterChange(key, option)}
//                             />
//                             <span className="text-sm">{option}</span>
//                           </label>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {/* Price range filter - Mobile */}
//                 <div className="mb-4 pb-4 border-b border-gray-200">
//                   <div 
//                     className="flex justify-between items-center cursor-pointer mb-2"
//                     onClick={() => toggleFilterPanel('price')}
//                   >
//                     <h3 className="font-medium">Price Range</h3>
//                     <ChevronDown 
//                       size={16} 
//                       className={`transition-transform ${activeFilterPanel === 'price' ? 'rotate-180' : ''}`} 
//                     />
//                   </div>
                  
//                   {activeFilterPanel === 'price' && (
//                     <div className="pl-1 space-y-4">
//                       <div className="flex justify-between items-center">
//                         <input
//                           type="number"
//                           placeholder="Min"
//                           className="w-24 p-2 border rounded"
//                         />
//                         <span className="text-gray-500">to</span>
//                         <input
//                           type="number"
//                           placeholder="Max"
//                           className="w-24 p-2 border rounded"
//                         />
//                       </div>
//                       <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
//                         Apply
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Rating filter - Mobile */}
//                 <div className="mb-4 pb-4 border-b border-gray-200">
//                   <div 
//                     className="flex justify-between items-center cursor-pointer mb-2"
//                     onClick={() => toggleFilterPanel('rating')}
//                   >
//                     <h3 className="font-medium">Customer Rating</h3>
//                     <ChevronDown 
//                       size={16} 
//                       className={`transition-transform ${activeFilterPanel === 'rating' ? 'rotate-180' : ''}`} 
//                     />
//                   </div>
                  
//                   {activeFilterPanel === 'rating' && (
//                     <div className="pl-1 space-y-2">
//                       {[4, 3, 2, 1].map(rating => (
//                         <label key={rating} className="flex items-center gap-2 cursor-pointer py-1">
//                           <input
//                             type="checkbox"
//                             className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                           />
//                           <span className="flex items-center">
//                             {renderRating(rating)}
//                             <span className="ml-1 text-sm text-gray-600">& Up</span>
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <button 
//                   className="w-full py-3 mt-4 bg-blue-600 text-white font-medium rounded-lg"
//                   onClick={() => setMobileFiltersOpen(false)}
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Main content */}
//           <div className="flex-1">
//             {/* Active filters and sort */}
//             <div className="bg-white rounded-lg shadow p-4 mb-6">
//               <div className="flex flex-col sm:flex-row justify-between gap-4">
//                 {/* Active filters */}
//                 <div className="flex flex-wrap gap-2 items-center">
//                   <span className="text-sm text-gray-700">Selected filters:</span>
//                   {getActiveFilterCount() === 0 && (
//                     <span className="text-sm text-gray-500">None</span>
//                   )}
                  
//                   {Object.entries(filters).map(([key, values]) => {
//                     if (key === 'sortBy' || values.length === 0) return null;
                    
//                     return values.map(value => (
//                       <span 
//                         key={`${key}-${value}`} 
//                         className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
//                       >
//                         {`${key}: ${value}`}
//                         <button 
//                           onClick={() => handleFilterChange(key, value)}
//                           className="text-blue-800 hover:text-blue-900"
//                         >
//                           <X size={14} />
//                         </button>
//                       </span>
//                     ));
//                   })}
//                 </div>
                
//                 {/* Sort options */}
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-700 whitespace-nowrap">Sort by:</span>
//                   <div className="relative">
//                     <select
//                       className="appearance-none pl-3 pr-8 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
//                       value={filters.sortBy}
//                       onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                     >
//                       {sortOptions.map(option => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <ArrowUpDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//                   </div>
                  
//                   {/* View mode toggles */}
//                   <div className="ml-2 flex items-center border rounded-lg overflow-hidden">
//                     <button 
//                       className={`p-1.5 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-500'}`}
//                       onClick={() => setViewMode('grid')}
//                     >
//                       <Grid3X3 size={18} />
//                     </button>
//                     <button 
//                       className={`p-1.5 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-500'}`}
//                       onClick={() => setViewMode('list')}
//                     >
//                       <List size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Results count */}
//             <div className="mb-4">
//               <p className="text-sm text-gray-600">
//                 Showing <span className="font-medium">{loading ? '...' : products.length}</span> results
//               </p>
//             </div>

//             {/* Loading indicator */}
//             {loading && (
//               <div className="flex justify-center py-12">
//                 <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//               </div>
//             )}

//             {/* No results */}
//             {!loading && products.length === 0 && (
//               <div className="bg-white rounded-lg shadow p-8 text-center">
//                                 <div className="mb-4">
//                   <Search size={48} className="mx-auto text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
//                 <p className="text-gray-600 mb-4">
//                   We couldn't find any books matching your search criteria.
//                 </p>
//                 <button 
//                   className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//                   onClick={clearAllFilters}
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             )}

//             {/* Product grid */}
//             {!loading && products.length > 0 && viewMode === 'grid' && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {products.map(product => (
//                   <div key={product.id} className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
//                     <div className="relative group">
//                       <img 
//                         src={product.image} 
//                         alt={product.title}
//                         className="w-full h-48 sm:h-56 object-cover object-center rounded-t-lg"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                         <button 
//                           className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600"
//                           onClick={() => handleQuickView(product)}
//                         >
//                           <Eye size={18} />
//                         </button>
//                         <button 
//                           className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600"
//                           onClick={() => handleAddToWishlist(product)}
//                         >
//                           <Heart 
//                             size={18} 
//                             className={wishlistItems.some(item => item.id === product.id) ? 'fill-red-500 text-red-500' : ''} 
//                           />
//                         </button>
//                         <button 
//                           className="p-2 bg-white rounded-full text-gray-700 hover:text-green-600"
//                           onClick={() => handleAddToCart(product)}
//                         >
//                           <ShoppingCart size={18} />
//                         </button>
//                       </div>
                      
//                       {/* Discount badge */}
//                       {product.discount > 0 && (
//                         <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//                           {product.discount}% OFF
//                         </span>
//                       )}
                      
//                       {/* Stock badge */}
//                       {product.stockStatus === 'Out of Stock' && (
//                         <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded">
//                           Out of Stock
//                         </span>
//                       )}
//                     </div>
                    
//                     {/* Product details */}
//                     <div className="p-4 flex flex-col">
//                       <div className="mb-1">
//                         <span className="text-xs text-gray-500">{product.category}</span>
//                       </div>
//                       <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 cursor-pointer" onClick={() => handleViewProduct(product.id)}>
//                         {product.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-2">by {product.author}</p>
                      
//                       {/* Rating */}
//                       <div className="flex items-center gap-1 mb-2">
//                         {renderRating(product.rating)}
//                         <span className="text-xs text-gray-500">({product.reviewCount})</span>
//                       </div>
                      
//                       {/* Price */}
//                       <div className="mt-auto">
//                         <div className="flex items-baseline gap-2 mb-2">
//                           <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
//                           {product.originalPrice > product.price && (
//                             <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
//                           )}
//                         </div>
                        
//                         {/* Add to cart button */}
//                         <button 
//                           className={`w-full py-2 rounded-lg font-medium ${
//                             product.stockStatus === 'Out of Stock' 
//                               ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                               : 'bg-blue-600 text-white hover:bg-blue-700'
//                           }`}
//                           disabled={product.stockStatus === 'Out of Stock'}
//                           onClick={() => handleAddToCart(product)}
//                         >
//                           Add to Cart
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {/* Product list */}
//             {!loading && products.length > 0 && viewMode === 'list' && (
//               <div className="space-y-4">
//                 {products.map(product => (
//                   <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
//                     <div className="flex flex-col sm:flex-row">
//                       {/* Product image */}
//                       <div className="relative sm:w-48 w-full">
//                         <img 
//                           src={product.image} 
//                           alt={product.title}
//                           className="w-full h-48 object-cover object-center"
//                         />
                        
//                         {/* Discount badge */}
//                         {product.discount > 0 && (
//                           <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//                             {product.discount}% OFF
//                           </span>
//                         )}
//                       </div>
                      
//                       {/* Product details */}
//                       <div className="flex-1 p-4 flex flex-col">
//                         <div className="mb-1">
//                           <span className="text-xs text-gray-500">{product.category}</span>
//                         </div>
//                         <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600 cursor-pointer" onClick={() => handleViewProduct(product.id)}>
//                           {product.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-2">by {product.author}</p>
                        
//                         {/* Rating */}
//                         <div className="flex items-center gap-1 mb-2">
//                           {renderRating(product.rating)}
//                           <span className="text-xs text-gray-500">({product.reviewCount})</span>
//                         </div>
                        
//                         {/* Additional details */}
//                         <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
//                           <div className="text-gray-600">Language: <span className="text-gray-900">{product.language}</span></div>
//                           <div className="text-gray-600">Condition: <span className="text-gray-900">{product.condition}</span></div>
//                         </div>
                        
//                         <div className="mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
//                           {/* Price */}
//                           <div className="flex items-baseline gap-2">
//                             <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
//                             {product.originalPrice > product.price && (
//                               <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
//                             )}
//                           </div>
                          
//                           {/* Quick actions */}
//                           <div className="flex gap-2">
//                             <button 
//                               className="p-2 border border-gray-300 rounded-full text-gray-700 hover:text-blue-600 hover:border-blue-600"
//                               onClick={() => handleQuickView(product)}
//                             >
//                               <Eye size={18} />
//                             </button>
//                             <button 
//                               className="p-2 border border-gray-300 rounded-full text-gray-700 hover:text-red-600 hover:border-red-600"
//                               onClick={() => handleAddToWishlist(product)}
//                             >
//                               <Heart 
//                                 size={18} 
//                                 className={wishlistItems.some(item => item.id === product.id) ? 'fill-red-500 text-red-500' : ''} 
//                               />
//                             </button>
//                             <button 
//                               className={`py-2 px-4 rounded-lg font-medium ${
//                                 product.stockStatus === 'Out of Stock' 
//                                   ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                                   : 'bg-blue-600 text-white hover:bg-blue-700'
//                               }`}
//                               disabled={product.stockStatus === 'Out of Stock'}
//                               onClick={() => handleAddToCart(product)}
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {/* Pagination */}
//             {!loading && products.length > 0 && (
//               <div className="mt-8 flex justify-center">
//                 <div className="inline-flex overflow-hidden rounded-md border border-gray-300">
//                   <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 border-r border-gray-300">Previous</button>
//                   <button className="px-4 py-2 bg-blue-600 text-white font-medium">1</button>
//                   <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100">2</button>
//                   <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100">3</button>
//                   <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100 border-l border-gray-300">Next</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 mt-12">
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 mb-4">BookStore</h3>
//               <p className="text-gray-600 mb-4">
//                 Your one-stop shop for all types of books and educational materials.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-blue-600 hover:text-blue-800">
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-blue-400 hover:text-blue-600">
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-red-600 hover:text-red-800">
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.5 17.863a.144.144 0 0 1-.206.021c-1.72-1.052-3.88-1.287-6.416-.702a.144.144 0 0 1-.172-.115.145.145 0 0 1 .115-.173c2.78-.631 5.146-.362 7.013.788a.144.144 0 0 1 .021.206zm1.2-2.679a.18.18 0 0 1-.247.025c-1.968-1.21-4.97-1.561-7.294-.852a.181.181 0 1 1-.105-.345c2.656-.81 5.957-.416 8.218.969a.18.18 0 0 1 .024.247zm.105-2.771c-2.366-1.408-6.259-1.538-8.512-.852a.216.216 0 1 1-.125-.413c2.595-.79 6.909-.637 9.638.946a.217.217 0 0 1 .073.3.218.218 0 0 1-.3.073z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-pink-600 hover:text-pink-800">
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQs</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Shipping Policy</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Return Policy</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Academic</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Fiction</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Children's</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Self-Help</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Biography</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600">Competitive Exams</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Subscribe</h3>
//               <p className="text-gray-600 mb-4">
//                 Subscribe to our newsletter for the latest updates and offers.
//               </p>
//               <form className="mb-4">
//                 <div className="flex">
//                   <input 
//                     type="email" 
//                     placeholder="Your email address" 
//                     className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   <button 
//                     type="submit" 
//                     className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Subscribe
//                   </button>
//                 </div>
//               </form>
//               <p className="text-sm text-gray-500">
//                 By subscribing, you agree to our terms and conditions and privacy policy.
//               </p>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-200 mt-8 pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p className="text-sm text-gray-600">
//                 &copy; {new Date().getFullYear()} BookStore. All rights reserved.
//               </p>
//               <div className="flex space-x-4 mt-4 md:mt-0">
//                 <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a>
//                 <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a>
//                 <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Sitemap</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Quick view modal */}
//       {quickViewProduct && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
//             <div className="flex justify-end p-2">
//               <button 
//                 className="p-1 text-gray-500 hover:text-gray-700"
//                 onClick={closeQuickView}
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row gap-8">
//                 {/* Product image */}
//                 <div className="md:w-1/2">
//                   <img 
//                     src={quickViewProduct.image} 
//                     alt={quickViewProduct.title}
//                     className="w-full h-auto object-cover rounded-lg"
//                   />
//                 </div>
                
//                 {/* Product details */}
//                 <div className="md:w-1/2">
//                   <div className="mb-2">
//                     <span className="text-sm text-gray-500">{quickViewProduct.category}</span>
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                     {quickViewProduct.title}
//                   </h2>
//                   <p className="text-gray-600 mb-4">by {quickViewProduct.author}</p>
                  
//                   {/* Rating */}
//                   <div className="flex items-center gap-2 mb-4">
//                     {renderRating(quickViewProduct.rating)}
//                     <span className="text-sm text-gray-500">({quickViewProduct.reviewCount} reviews)</span>
//                   </div>
                  
//                   {/* Price */}
//                   <div className="flex items-baseline gap-2 mb-4">
//                     <span className="text-2xl font-bold text-gray-900">₹{quickViewProduct.price}</span>
//                     {quickViewProduct.originalPrice > quickViewProduct.price && (
//                       <>
//                         <span className="text-lg text-gray-500 line-through">₹{quickViewProduct.originalPrice}</span>
//                         <span className="text-sm font-medium text-green-600">
//                           Save {calculateDiscount(quickViewProduct.originalPrice, quickViewProduct.price)}%
//                         </span>
//                       </>
//                     )}
//                   </div>
                  
//                   {/* Stock status */}
//                   <div className="mb-4">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       quickViewProduct.stockStatus === 'In Stock' 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {quickViewProduct.stockStatus}
//                     </span>
//                   </div>
                  
//                   {/* Description */}
//                   <p className="text-gray-600 mb-6">
//                     {quickViewProduct.description}
//                   </p>
                  
//                   {/* Additional details */}
//                   <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
//                     <div className="text-gray-600">Board: <span className="text-gray-900">{quickViewProduct.board}</span></div>
//                     <div className="text-gray-600">Subject: <span className="text-gray-900">{quickViewProduct.subject}</span></div>
//                     <div className="text-gray-600">Language: <span className="text-gray-900">{quickViewProduct.language}</span></div>
//                     <div className="text-gray-600">Condition: <span className="text-gray-900">{quickViewProduct.condition}</span></div>
//                   </div>
                  
//                   {/* Actions */}
//                   <div className="space-y-3">
//                     <button 
//                       className={`w-full py-3 rounded-lg font-medium ${
//                         quickViewProduct.stockStatus === 'Out of Stock' 
//                           ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                           : 'bg-blue-600 text-white hover:bg-blue-700'
//                       }`}
//                       disabled={quickViewProduct.stockStatus === 'Out of Stock'}
//                       onClick={() => handleAddToCart(quickViewProduct)}
//                     >
//                       Add to Cart
//                     </button>
                    
//                     <button 
//                       className="w-full py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
//                       onClick={() => handleAddToWishlist(quickViewProduct)}
//                     >
//                       {wishlistItems.some(item => item.id === quickViewProduct.id) 
//                         ? 'Remove from Wishlist' 
//                         : 'Add to Wishlist'}
//                     </button>
                    
//                     <button 
//                       className="w-full py-3 rounded-lg font-medium border border-blue-600 text-blue-600 hover:bg-blue-50"
//                       onClick={() => handleViewProduct(quickViewProduct.id)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Cart sidebar */}
//       {cartOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
//           <div className="ml-auto w-full max-w-md h-screen bg-white flex flex-col">
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <h2 className="text-lg font-bold">Your Cart ({cartItems.length})</h2>
//               <button 
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={() => setCartOpen(false)}
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             {cartItems.length === 0 ? (
//               <div className="flex-1 flex flex-col items-center justify-center p-4">
//                 <ShoppingCart size={64} className="text-gray-300 mb-4" />
//                 <p className="text-gray-600 mb-6 text-center">Your cart is empty</p>
//                 <button 
//                   className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
//                   onClick={() => setCartOpen(false)}
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="flex-1 overflow-y-auto p-4">
//                   <div className="space-y-4">
//                     {cartItems.map(item => (
//                       <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
//                         <img 
//                           src={item.image} 
//                           alt={item.title}
//                           className="w-20 h-20 object-cover rounded"
//                         />
                        
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
//                           <p className="text-sm text-gray-600 mb-2">by {item.author}</p>
                          
//                           <div className="flex justify-between items-center">
//                             <div className="flex items-center border rounded overflow-hidden">
//                               <button 
//                                 className="px-2 py-1 text-gray-600 hover:bg-gray-100"
//                                 onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
//                                 disabled={item.quantity === 1}
//                               >
//                                 <Minus size={14} />
//                               </button>
//                               <span className="px-2 py-1 text-sm">{item.quantity}</span>
//                               <button 
//                                 className="px-2 py-1 text-gray-600 hover:bg-gray-100"
//                                 onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
//                               >
//                                 <Plus size={14} />
//                               </button>
//                             </div>
                            
//                             <span className="font-medium">₹{item.price * item.quantity}</span>
//                           </div>
//                         </div>
                        
//                         <button 
//                           className="text-gray-400 hover:text-red-500"
//                           onClick={() => removeFromCart(item.id)}
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="p-4 border-t border-gray-200">
//                   <div className="space-y-3">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Subtotal</span>
//                       <span className="font-medium">₹{calculateCartTotal()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Shipping</span>
//                       <span className="font-medium">₹12</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Tax</span>
//                       <span className="font-medium">₹2</span>
//                     </div>
//                     <div className="flex justify-between pt-2 border-t border-gray-200">
//                       <span className="font-bold">Total</span>
//                       <span className="font-bold">₹{calculateCartTotal() + 12 + 2}</span>
//                     </div>
                    
//                     <button 
//                       className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
//                       onClick={handleCheckout}
//                     >
//                       Proceed to Checkout
//                     </button>
                    
//                     <button 
//                       className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
//                       onClick={() => setCartOpen(false)}
//                     >
//                       Continue Shopping
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Wishlist sidebar */}
//       {wishlistOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
//           <div className="ml-auto w-full max-w-md h-screen bg-white flex flex-col">
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <h2 className="text-lg font-bold">Your Wishlist ({wishlistItems.length})</h2>
//               <button 
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={() => setWishlistOpen(false)}
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             {wishlistItems.length === 0 ? (
//               <div className="flex-1 flex flex-col items-center justify-center p-4">
//                 <Heart size={64} className="text-gray-300 mb-4" />
//                 <p className="text-gray-600 mb-6 text-center">Your wishlist is empty</p>
//                 <button 
//                   className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
//                   onClick={() => setWishlistOpen(false)}
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             ) : (
//               <div className="flex-1 overflow-y-auto p-4">
//                 <div className="space-y-4">
//                   {wishlistItems.map(item => (
//                     <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
//                       <img 
//                         src={item.image} 
//                         alt={item.title}
//                         className="w-20 h-20 object-cover rounded"
//                       />
                      
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
//                         <p className="text-sm text-gray-600 mb-2">by {item.author}</p>
                        
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium">₹{item.price}</span>
                          
//                           <button 
//                             className={`px-3 py-1 rounded text-sm font-medium ${
//                               item.stockStatus === 'Out of Stock' 
//                                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                                 : 'bg-blue-600 text-white hover:bg-blue-700'
//                             }`}
//                             disabled={item.stockStatus === 'Out of Stock'}
//                             onClick={() => handleAddToCart(item)}
//                           >
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
                      
//                       <button 
//                         className="text-gray-400 hover:text-red-500"
//                         onClick={() => removeFromWishlist(item.id)}
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Buy;