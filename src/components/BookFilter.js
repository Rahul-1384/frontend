import React, { useState, useMemo, useCallback, useEffect } from 'react';
// import { useCart } from "../context/CartContext";
// import { useNavigate } from 'react-router-dom';
// import debounce from 'lodash.debounce';
// import { useSearchParams } from 'react-router-dom';
// import './bookfilter.css';
// import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
// import PropTypes from 'prop-types';
// import CartButton from "./CartButton";

// const Button = ({ onClick, label, children, className, ariaLabel }) => (
//   <button
//     onClick={onClick}
//     className={`py-2 px-4 rounded-md transition-all duration-300 ${className}`}
//     aria-label={ariaLabel}
//   >
//     {children || label}
//   </button>
// );

// Button.propTypes = {
//   onClick: PropTypes.func,
//   label: PropTypes.string,
//   children: PropTypes.node,
//   className: PropTypes.string,
//   ariaLabel: PropTypes.string.isRequired,
// };

// const BookCard = ({ book, addToCart, onClick }) => {
//   const discountedPrice = (
//     Math.max(0, (book.price || 0) - (book.discount || 0))
//   ).toFixed(2);

//   return (
//     <div
//       className=" rounded-md overflow-hidden hover:shadow-2xl transform transition-all duration-300 ease-in-out  bg-white"
//       aria-label={`Book card for ${book.title || 'Untitled'}`}
//       tabIndex={0}
//       onClick={onClick}
//     >
//       {/* Image Section */}
//       <div className="relative h-64">
//         <img
//           src={book.image || 'https://via.placeholder.com/150'}
//           alt={`Cover of ${book.title || 'Untitled'}`}
//           className="absolute inset-0 w-full h-full object-cover"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-xl"></div>
//         <div className="absolute bottom-4 left-4 text-white">
//           <h3 className="text-lg font-bold">
//             {book.title || 'Untitled'}
//           </h3>
//           <p className="text-sm">{book.author || 'Unknown Author'}</p>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="p-4">
//         <div className="mb-2 flex flex-col xsm:flex-row xsm:items-center justify-between">
//           <div className="flex items-center gap-2">
//             <p className="text-3xl font-bold text-blue-600">
//               ₹{discountedPrice}
//             </p>
//             {book.price && (
//               <p className="text-sm text-gray-400">
//                 <span className="font-medium">M.R.P:</span>{" "}
//                 <span className="line-through text-gray-400">
//                   ₹{book.price}
//                 </span>
//               </p>
//             )}
//           </div>
//           <p className="text-lg font-semibold">
//             {book.board || 'General'}
//           </p>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Condition:</span>{" "}
//             <span
//               className={`px-2 py-1 text-xs text-white font-bold rounded-md ${
//                 book.condition === "New"
//                   ? "bg-green-500"
//                   : book.condition === "Good"
//                   ? "bg-yellow-500"
//                   : "bg-orange-600"
//               }`}
//             >
//               {book.condition || 'Unknown'}
//             </span>
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Language:</span>{" "}
//             {book.language || 'N/A'}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col gap-2">
//           <Button
//             onClick={() => console.log(`Buying ${book.title}`)}
//             className="buy-btn flex-1 bg-gradient-to-r bg-blue-600 transition-all duration-1000 text-white font-semibold hover:bg-blue-700 "
//             ariaLabel={`Buy ${book.title || 'this book'} now`}
//           >

//             <span style={{ "--i": 0 }}>B</span>
//             <span style={{ "--i": 1 }}>u</span>
//             <span style={{ "--i": 2 }}>y</span>
//             <span>&nbsp;</span> {/* Add space here */}
//             <span style={{ "--i": 4 }}>N</span>
//             <span style={{ "--i": 5 }}>o</span>
//             <span style={{ "--i": 6 }}>w</span>

//           </Button>
//           <CartButton book={book} addToCart={addToCart} />
//         </div>
//       </div>
//     </div>
//   );
// };

// BookCard.propTypes = {
//   book: PropTypes.shape({
//     title: PropTypes.string,
//     author: PropTypes.string,
//     price: PropTypes.number,
//     discount: PropTypes.number,
//     condition: PropTypes.string,
//     language: PropTypes.string,
//     board: PropTypes.string,
//     image: PropTypes.string,
//   }).isRequired,
//   addToCart: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

// // Helper functions for query string manipulation
// const parseQueryString = (searchParams) => {
//   const parsedFilters = {};
//   for (const [key, value] of searchParams.entries()) {
//     if (['board', 'category', 'subject', 'reference', 'competitive', 'condition', 'language', 'genre'].includes(key)) {
//       parsedFilters[key] = value.split(',');
//     } else if (key === 'sortBy') {
//       parsedFilters[key] = value;
//     } else if (key === 'page') {
//       parsedFilters[key] = parseInt(value, 10) || 1; // Default to 1 if no page is specified
//     }
//   }
//   return parsedFilters;
// };

// const buildQueryString = (filters) => {
//   const params = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (Array.isArray(value) && value.length > 0) {
//       params.set(key, value.join(','));
//     } else if (typeof value === 'string' && value) {
//       params.set(key, value);
//     } else if (key === 'page' && value) {
//       params.set(key, value);  // Add page to query string
//     }
//   });
//   return params.toString();
// };

// const BookFilter = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate(); // Correctly use this hook
//   // State to hold the cart items
//   const [cart, setCart] = useState([]);

//   // Function to add the selected book to the cart
//   const handleCardClick = (id, title, author, category, condition) => {
//     navigate(`/books/${id}/${title}/${author}/${category}/${condition}`);
//     console.log("Id of the book", id);
//   };

//   const addToCart = (book) => {
//     setCart((prevCart) => {
//       console.log('Book Added to cart', book);
//       const isBookInCart = prevCart.some((item) => item.id === book.id);
//       if (isBookInCart) {
//         return prevCart; // Prevent adding the same book again
//       }
//       return [...prevCart, book];
//     });
//     // navigate("/cart"); // Ensure this is called after adding to the cart
//   };

//   const [filters, setFilters] = useState(() => ({
//     board: [],
//     category: [],
//     subject: [],
//     reference: [],
//     competitive: [],
//     condition: [],
//     language: [],
//     genre: [],
//     sortBy: '',
//     page: 1, // Default to page 1
//     ...parseQueryString(searchParams), // Initialize from query string
//   }));

//   const [searchTerm, setSearchTerm] = useState(""); // Add search state
//   const [searchQuery, setSearchQuery] = useState('');
//   const [inputSearchTerm, setInputSearchTerm] = useState(""); // Temporary input state
//   const [loading, setLoading] = useState(true);
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(filters.page || 1);
//   const booksPerPage = 9;
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Sync filters with searchParams
//   useEffect(() => {
//     const newFilters = parseQueryString(searchParams);
//     setFilters((prev) => ({
//       ...prev,
//       ...newFilters,
//     }));
//   }, [searchParams]);

//   // Update query string whenever filters change
//   useEffect(() => {
//     const queryString = buildQueryString(filters);
//     navigate(`?${queryString}`, { replace: true });
//   }, [filters, navigate]);


//   // Function to fetch books from the API
//   const fetchBooks = async () => {
//     setLoading(true); // Set loading to true at the start of the request

//     try {
//       const response = await fetch('http://localhost:3000/books');
//       const data = await response.json();
//       console.log("Fetched books:", data);

//       // Filter out duplicate books based on the 'id'
//       const uniqueBooks = data.filter((book, index, self) =>
//         index === self.findIndex((b) => b.id === book.id)
//       );

//       setBooks(uniqueBooks);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     } finally {
//       setLoading(false); // Set loading to false after the request is completed
//     }
//   };

//   useEffect(() => {
//     fetchBooks(); // Initial fetch when component mounts
//   }, []);

//   // Filter books based on search term and other filters
//   const filteredBooks = useMemo(() => {
//     const searchFiltered = books.filter((book) => {
//       const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
//       if (searchTerm && !matchesSearchTerm) {
//         return false; // Filter out books that do not match the search term
//       }

//       const filterConditions = [
//         { key: 'board', value: book.board?.toLowerCase() },
//         { key: 'category', value: book.category?.toLowerCase() },
//         { key: 'subject', value: book.subject?.toLowerCase() },
//         { key: 'reference', value: book.author?.toLowerCase() },
//         { key: 'competitive', value: book.examType?.toLowerCase() },
//         { key: 'condition', value: book.condition?.toLowerCase() },
//         { key: 'language', value: book.language?.toLowerCase() },
//         { key: 'genre', value: book.genre?.toLowerCase() },
//       ];

//       return filterConditions.every(({ key, value }) => {
//         if (!filters[key]) {
//           return true;
//         }
//         return filters[key].length === 0 || (value && filters[key].includes(value));
//       });
//     });

//     return searchFiltered;
//   }, [filters, books, searchTerm]);

//   // Pagination and other code...
//   const sortedBooks = useMemo(() => {
//     return filteredBooks.sort((a, b) => {
//       switch (filters.sortBy) {
//         case 'price-low-high':
//           return (a.price || 0) - (b.price || 0);
//         case 'price-high-low':
//           return (b.price || 0) - (a.price || 0);
//         case 'newest':
//           return (b.year || 0) - (a.year || 0);
//         case 'oldest':
//           return (a.year || 0) - (b.year || 0);
//         default:
//           return 0;
//       }
//     });
//   }, [filteredBooks, filters.sortBy]);


//   const toggleSelection = useCallback((value, key) => {
//     setFilters((prev) => {
//       const updatedFilters = {
//         ...prev,
//         [key]: prev[key].includes(value)
//           ? prev[key].filter((v) => v !== value)
//           : [...prev[key], value],
//       };

//       window.scrollTo(0, 0);
//       setCurrentPage(1);

//       // Close the filter modal on mobile after applying the filter
//       if (window.innerWidth <= 768) {
//         setIsFilterOpen(false);
//       }

//       return updatedFilters;
//     });
//   }, []);


//   const debouncedFilter = useMemo(
//     () =>
//       debounce((newFilters) => {
//         setFilters(newFilters);
//         window.scrollTo(0, 0);
//       }, 1000),
//     []
//   );

//   // Calculate the paginated books
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);  // Ensure we slice correctly



//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     setFilters((prev) => ({
//       ...prev,
//       page: page, // Set page in filters object
//     }));
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       handlePageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       handlePageChange(currentPage + 1);
//     }
//   };

//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   const paginationRange = useMemo(() => {
//     const range = [];
//     const rangeSize = 4;
//     let start = currentPage - Math.floor(rangeSize / 2);
//     let end = currentPage + Math.floor(rangeSize / 2);

//     if (start < 1) {
//       start = 1;
//       end = Math.min(rangeSize, totalPages);
//     }

//     if (end > totalPages) {
//       end = totalPages;
//       start = Math.max(1, totalPages - rangeSize + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       range.push(i);
//     }

//     return range;
//   }, [currentPage, totalPages]);


//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();

//     if (searchQuery.trim()) {
//       navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
//     }

//     setSearchQuery(""); // Reset search query after submitting
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearchSubmit(event);
//     }
//   };




//   // const handleCardClick = (id) => {
//   //   navigate(`/book/${id}`);
//   //   console.log("Id of the book", id);
//   // };

//   const [isScrolled, setIsScrolled] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       // Change UI when scrolled past 50px (adjust threshold as needed)
//       setIsScrolled(window.scrollY > 60);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   return (
//     <div className="flex flex-col md:flex-row">

//       <button
//         onClick={() => setIsFilterOpen(!isFilterOpen)}
//         className={`md:hidden p-3 text-white bg-blue-500 sticky ${
//           isScrolled ? "top-[70px] left-[80%] w-fit rounded-full" : "top-0 w-full"
//         } z-10 flex items-center transition-all duration-700 justify-between`}
//       >
//         <FaFilter size={18} />
//         {!isScrolled && <span>Filter</span>} {/* Show "Filter" only when not scrolled */}
//       </button>

//       {/* Filter Section */}
//       <div
//         className={`md:w-1/5 filter-section bg-gray-100 p-4 md:block transition-all duration-1000 ease-in-out ${
//           isFilterOpen ? 'open-modal z-50' : 'close-modal z-0'
//         } md:static absolute `}
//       >
//         {/* Close Button */}
//         <button
//           onClick={() => setIsFilterOpen(false)}
//           className="sticky top-2 left-[100%] text-white bg-red-600 p-2 md:hidden rounded-full hover:bg-red-700 transition-colors duration-300"
//           title="Close Filters"
//         >
//           <FaTimes size={20} />
//         </button>
//         <p className='-mt-8 font-extrabold text-[1.5rem] tracking-widest md:-mt-0'>Filters</p>
//         {/* Board Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Boards</label>
//           <div>
//             {['CBSE', 'ICSE', 'UP'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.board.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'board')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
//           <div>
//             {['NCERT'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.category.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'category')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Subject Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
//           <div>
//             {['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Political Science', 'Economics', 'Civics', 'Hindi', 'Business Studies', 'Accounts'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.subject.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'subject')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Reference Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Reference Books</label>
//           <div>
//             {['Arihant Publications', 'Oswaal Books', 'Disha Publications', 'S. Chand', 'R.D. Sharma', 'R.S. Aggarwal', 'S.L. Arora', 'Full Marks Series', 'Wren & Martin', 'Golden Guides'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.reference.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'reference')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Competitive Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Competitive Exams</label>
//           <div>
//             {['JEE', 'NEET', 'GATE', 'UPSC', 'SSC'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.competitive.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'competitive')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Condition Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
//           <div>
//             {['New', 'Good', 'Acceptable'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.condition.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'condition')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Language Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
//           <div>
//             {['English', 'Hindi'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.language.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'language')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Genre Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//           <div>
//             {['Fiction', 'Non-Fiction', 'Children', 'Sci-Fi', 'Biography', 'School', 'Comics', 'Mystery', 'Thriller'].map((option) => (
//               <label key={option} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   value={option.toLowerCase()}
//                   checked={filters.genre.includes(option.toLowerCase())}
//                   onChange={() => toggleSelection(option.toLowerCase(), 'genre')}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Sort By Filter */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//           <select
//             value={filters.sortBy}
//             onChange={(e) => debouncedFilter({ ...filters, sortBy: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select</option>
//             <option value="price-low-high">Price: Low to High</option>
//             <option value="price-high-low">Price: High to Low</option>
//             <option value="newest">Newest First</option>
//             <option value="oldest">Oldest First</option>
//           </select>
//         </div>

//         {/* Reset Filters Button */}
//         <button
//           onClick={() => setFilters({
//             board: [],
//             category: [],
//             subject: [],
//             reference: [],
//             competitive: [],
//             condition: [],
//             language: [],
//             genre: [],
//             sortBy: '',
//           })}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all mb-4"
//         >
//           <span>Clear All Filters</span>
//         </button>
//       </div>

//       {/* Books Grid */}
//       <div className="w-full p-2">
//       {/* Search Input */}
//       <div className="md:w-full py-4 flex gap-2">
//         <input
//             autoFocus
//             placeholder="search.."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onKeyDown={handleKeyPress}
//             name="text"
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           <button
//             onClick={handleSearchSubmit}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Search
//           </button>
//       </div>
//         {loading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {Array.from({ length: booksPerPage }).map((_, index) => (
//               <div key={index} className="bg-white p-4 border border-gray-200 rounded-xl shadow-md animate-pulse">
//                 <div className="relative h-64 bg-gray-300 rounded-md"></div>
//                 <div className="p-4 mt-4">
//                   <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
//                   <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filteredBooks.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <img
//               src="https://media.tenor.com/OJalYnY8qjAAAAAj/oops-oops-sorry.gif"
//               alt="No books found"
//               className="w-32 h-32 mb-4"
//             />
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               No books found
//             </h2>
//             <p className="text-gray-500 mb-4">Try adjusting your filters or clearing them to see more results.</p>
//             <button
//               onClick={() =>
//                 setFilters({
//                   board: [],
//                   category: [],
//                   subject: [],
//                   reference: [],
//                   competitive: [],
//                   condition: [],
//                   language: [],
//                   genre: [],
//                   sortBy: '',
//                   page: 1, // Reset to the first page
//                 })
//               }
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//             >
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
//             {/* Render filtered books */}
//             {currentBooks.map((book) => (
//               <BookCard key={book.id} book={book} addToCart={addToCart} onClick={() => handleCardClick(book.id, book.title, book.author, book.category, book.condition)} />
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredBooks.length > 0 && (
//           <div className="flex items-center justify-center mt-6 space-x-2">
//             <button
//             onClick={handlePrev}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-md ${
//               currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             Previous
//           </button>

//           {paginationRange.map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-3 py-1 rounded-md ${
//                 currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//           <button
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-md ${
//               currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             Next
//           </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookFilter;


















































import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';
import './bookfilter.css';
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import PropTypes from 'prop-types';
import CartButton from "./CartButton";
import { Star, Search, Gift, Truck, ShoppingCart, Heart, Check, X } from 'lucide-react';
import DropdownFilter from './DropdownFIlter'; // Import the DropdownFilter component
import { toast } from 'react-toastify';



const Button = ({ onClick, label, children, className, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-md transition-all duration-300 ${className}`}
    aria-label={ariaLabel}
  >
    {children || label}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
};

const BookCard = ({ book, addToCart, onClick, onAddToWishlist, isInWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { dispatch, fetchCartItems } = useCart();

  const discountedPrice = useMemo(() => (
    Math.max(0, (book.price || 0) - (book.discount || 0)).toFixed(2)
  ), [book.price, book.discount]);

  const handleAddToCart = useCallback(async (e) => {
    e.stopPropagation();
    if (isAddingToCart) return;
  
    setIsAddingToCart(true);
    try {
      // ✅ Correctly retrieve access token
      const tokens = JSON.parse(localStorage.getItem("authToken"));
      const accessToken = tokens ? tokens[0] : null; 
  
      if (!accessToken) {
        toast.error("Authentication error. Please log in.");
        setIsAddingToCart(false);
        return;
      }
  
      const response = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ book_id: book.id, quantity: 1 })
      });
      console.log(accessToken);
      if (!response.ok) throw new Error("Failed to add item to cart");
  
      dispatch({ type: 'ADD_TO_CART', payload: book });
      setIsAdded(true);
      await fetchCartItems();
      toast.success("Book added to cart!");
  
      setTimeout(() => {
        setIsAdded(false);
        setIsAddingToCart(false);
      }, 2000);
    } catch (error) {
      toast.error("Error adding to cart.");
      setIsAddingToCart(false);
    }
  }, [book, isAddingToCart, dispatch, fetchCartItems]);
  

  return (
    <div
      className="bg-white p-3 mb-2 sm:p-4 rounded-sm hover:shadow-2xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Book card for ${book.title || 'Untitled'}`}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-col items-center gap-4">
        <div className="relative w-full sm:w-48 h-48 sm:h-64 flex-shrink-0">
          <img
            src={book.image || "/api/placeholder/400/320"}
            alt={book.title}
            className="w-full h-full object-contain sm:object-cover hover:scale-105 transition-transform duration-300"
          />
          {book.isPrime && (
            <div className="absolute top-2 right-2">
              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Prime
              </div>
            </div>
          )}
        </div>
        <div className='border-b-2 border-gray-300 w-full' />

        <div className="flex-grow min-w-0">
          <div className="mb-2">
            <h2 className="text-base sm:text-lg font-medium text-blue-600 hover:text-orange-500 hover:underline cursor-pointer line-clamp-2">
              {book.title}
            </h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < (book.rating || 4)
                      ? 'fill-yellow-400 stroke-yellow-400'
                      : 'stroke-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-blue-600 hover:text-orange-500 cursor-pointer">
              {book.reviews?.toLocaleString()} ratings
            </span>
          </div>

          <div className="mb-3">
            <div className="flex flex-wrap items-baseline gap-2">
              <div className="flex items-baseline">
                <span className="text-2xl text-gray-600">₹</span>
                <span className="text-xl sm:text-2xl font-medium">{discountedPrice}</span>
              </div>
              {book.price && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 line-through">₹{book.price}</span>
                  <span className="text-red-600">({Math.round((book.discount / book.price) * 100)}% off)</span>
                </div>
              )}
            </div>
            {book.isPrime && (
              <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                <Truck className="w-4 h-4" />
                <span className="line-clamp-1">FREE delivery by {book.deliveryDate}</span>
              </div>
            )}
          </div>

          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Gift className="w-4 h-4 flex-shrink-0" />
              <span>Gift wrap available</span>
            </div>
            {book.condition === 'New' && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                <span>Brand New</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-full sm:flex-1 py-2 px-0 sm:px-2 rounded-full font-medium flex items-center justify-center gap-2 transition-colors duration-300 ${isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span className='text-sm'>Add to Cart</span>
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToWishlist(book);
              }}
              className={`hidden sm:block p-2 border border-gray-300 rounded-full hover:bg-gray-50 ${isInWishlist ? 'text-red-600' : 'text-gray-700'}`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    condition: PropTypes.string,
    language: PropTypes.string,
    board: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
  isInWishlist: PropTypes.bool.isRequired,
};

// Helper functions for query string manipulation
const parseQueryString = (searchParams) => {
  const parsedFilters = {};
  for (const [key, value] of searchParams.entries()) {
    if (['board', 'category', 'subject', 'reference', 'competitive', 'condition', 'language', 'genre'].includes(key)) {
      parsedFilters[key] = value.split(',');
    } else if (key === 'sortBy') {
      parsedFilters[key] = value;
    } else if (key === 'page') {
      parsedFilters[key] = parseInt(value, 10) || 1; // Default to 1 if no page is specified
    }
  }
  return parsedFilters;
};

const buildQueryString = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(','));
    } else if (typeof value === 'string' && value) {
      params.set(key, value);
    } else if (key === 'page' && value) {
      params.set(key, value);  // Add page to query string
    }
  });
  return params.toString();
};

const BookFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // Correctly use this hook
  // State to hold the cart items
  const [cart, setCart] = useState([]);

  // Function to add the selected book to the cart
  const handleCardClick = (id, title, author, category, condition) => {
    navigate(`/books/${id}/${title}/${author}/${category}/${condition}`);
    console.log("Id of the book", id);
  };

  const addToCart = (book) => {
    setCart((prevCart) => {
      console.log('Book Added to cart', book);
      const isBookInCart = prevCart.some((item) => item.id === book.id);
      if (isBookInCart) {
        return prevCart; // Prevent adding the same book again
      }
      return [...prevCart, book];
    });
    // navigate("/cart"); // Ensure this is called after adding to the cart
  };
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'


  const [filters, setFilters] = useState(() => ({
    board: [],
    category: [],
    subject: [],
    reference: [],
    competitive: [],
    condition: [],
    language: [],
    genre: [],
    sortBy: '',
    page: 1, // Default to page 1
    ...parseQueryString(searchParams), // Initialize from query string
  }));

  const [searchTerm, setSearchTerm] = useState(""); // Add search state
  const [searchQuery, setSearchQuery] = useState('');
  const [inputSearchTerm, setInputSearchTerm] = useState(""); // Temporary input state
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(filters.page || 1);
  const booksPerPage = 9;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync filters with searchParams
  useEffect(() => {
    const newFilters = parseQueryString(searchParams);
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, [searchParams]);

  // Update query string whenever filters change
  useEffect(() => {
    const queryString = buildQueryString(filters);
    navigate(`?${queryString}`, { replace: true });
  }, [filters, navigate]);


  // Function to fetch books from the API
  const fetchBooks = async () => {
    setLoading(true); // Set loading to true at the start of the request

    try {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      console.log("Fetched books:", data);

      // Filter out duplicate books based on the 'id'
      const uniqueBooks = data.filter((book, index, self) =>
        index === self.findIndex((b) => b.id === book.id)
      );

      setBooks(uniqueBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  useEffect(() => {
    fetchBooks(); // Initial fetch when component mounts
  }, []);

  // Filter books based on search term and other filters
  const filteredBooks = useMemo(() => {
    const searchFiltered = books.filter((book) => {
      const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (searchTerm && !matchesSearchTerm) {
        return false; // Filter out books that do not match the search term
      }

      const filterConditions = [
        { key: 'board', value: book.board?.toLowerCase() },
        { key: 'category', value: book.category?.toLowerCase() },
        { key: 'subject', value: book.subject?.toLowerCase() },
        { key: 'reference', value: book.author?.toLowerCase() },
        { key: 'competitive', value: book.examType?.toLowerCase() },
        { key: 'condition', value: book.condition?.toLowerCase() },
        { key: 'language', value: book.language?.toLowerCase() },
        { key: 'genre', value: book.genre?.toLowerCase() },
      ];

      return filterConditions.every(({ key, value }) => {
        if (!filters[key]) {
          return true;
        }
        return filters[key].length === 0 || (value && filters[key].includes(value));
      });
    });

    return searchFiltered;
  }, [filters, books, searchTerm]);

  // Pagination and other code...
  const sortedBooks = useMemo(() => {
    return filteredBooks.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low-high':
          return (a.price || 0) - (b.price || 0);
        case 'price-high-low':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return (b.year || 0) - (a.year || 0);
        case 'oldest':
          return (a.year || 0) - (b.year || 0);
        default:
          return 0;
      }
    });
  }, [filteredBooks, filters.sortBy]);

  const handleAddToWishlist = (book) => {
    setWishlist((prev) => {
      const isBookInWishlist = prev.some((item) => item.id === book.id);
      if (isBookInWishlist) {
        return prev.filter((item) => item.id !== book.id); // Remove from wishlist
      }
      return [...prev, book]; // Add to wishlist
    });
  };
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleQuickView = (book) => {
    setQuickViewProduct(book);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };
  const toggleSelection = useCallback((value, key) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [key]: prev[key].includes(value)
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };

      window.scrollTo(0, 0);
      setCurrentPage(1);

      // Close the filter modal on mobile after applying the filter
      if (window.innerWidth <= 768) {
        setIsFilterOpen(false);
      }

      return updatedFilters;
    });
  }, []);
  const handleAddToCart = (book) => {
    setCart((prevCart) => {
      const isBookInCart = prevCart.some((item) => item.id === book.id);
      if (isBookInCart) {
        return prevCart; // Prevent adding the same book again
      }
      return [...prevCart, book];
    });
  };


  const debouncedFilter = useMemo(
    () =>
      debounce((newFilters) => {
        setFilters(newFilters);
        window.scrollTo(0, 0);
      }, 1000),
    []
  );

  // Calculate the paginated books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);  // Ensure we slice correctly



  const handlePageChange = (page) => {
    setCurrentPage(page);
    setFilters((prev) => ({
      ...prev,
      page: page, // Set page in filters object
    }));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginationRange = useMemo(() => {
    const range = [];
    const rangeSize = 4;
    let start = currentPage - Math.floor(rangeSize / 2);
    let end = currentPage + Math.floor(rangeSize / 2);

    if (start < 1) {
      start = 1;
      end = Math.min(rangeSize, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - rangeSize + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }, [currentPage, totalPages]);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }

    setSearchQuery(""); // Reset search query after submitting
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };




  // const handleCardClick = (id) => {
  //   navigate(`/book/${id}`);
  //   console.log("Id of the book", id);
  // };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Change UI when scrolled past 50px (adjust threshold as needed)
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex flex-col bg-gray-200 md:flex-row">

      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={`md:hidden p-3 text-white bg-blue-500 sticky ${isScrolled ? "top-[70px] left-[80%] w-fit rounded-full" : "top-0 w-full"
          } z-10 flex items-center transition-all duration-700 justify-between`}
      >
        <FaFilter size={18} />
        {!isScrolled && <span>Filter</span>} {/* Show "Filter" only when not scrolled */}
      </button>

      {/* Filter Section */}
      <div
        className={`md:w-1/5 filter-section bg-white ml-2 my-2 shadow-sm shadow-black p-4 md:block transition-all duration-1000 ease-in-out ${isFilterOpen ? 'open-modal z-50' : 'close-modal z-0'
          } md:static absolute `}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsFilterOpen(false)}
          className="sticky top-2 left-[100%] text-white bg-red-600 p-2 md:hidden rounded-full hover:bg-red-700 transition-colors duration-300"
          title="Close Filters"
        >
          <FaTimes size={20} />
        </button>
        <p className='-mt-8 font-extrabold text-[1.5rem] tracking-widest md:-mt-0'>Filters</p>
        {/* Board Filter */}
        <DropdownFilter
          label="Boards"
          options={['CBSE', 'ICSE', 'UP']}
          selectedOptions={filters.board}
          toggleSelection={(value) => toggleSelection(value, 'board')}
        />
        <div className='w-full border mb-3' />

        {/* Category Filter */}
        <DropdownFilter
          label="Categories"
          options={['NCERT']}
          selectedOptions={filters.category}
          toggleSelection={(value) => toggleSelection(value, 'category')}
        />
        <div className='w-full border mb-3' />
        {/* Subject Filter */}
        <DropdownFilter
          label="Subject"
          options={['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Political Science', 'Economics', 'Civics', 'Hindi', 'Business Studies', 'Accounts']}
          selectedOptions={filters.subject}
          toggleSelection={(value) => toggleSelection(value, 'subject')}
        />
        <div className='w-full border mb-3' />

        {/* Reference Filter */}
        <DropdownFilter
          label="Reference Books"
          options={['Arihant Publications', 'Oswaal Books', 'Disha Publications', 'S. Chand', 'R.D. Sharma', 'R.S. Aggarwal', 'S.L. Arora', 'Full Marks Series', 'Wren & Martin', 'Golden Guides']}
          selectedOptions={filters.reference}
          toggleSelection={(value) => toggleSelection(value, 'reference')}
        />
        <div className='w-full border mb-3' />

        {/* Competitive Filter */}
        <DropdownFilter
          label="Competitive Exams"
          options={['JEE', 'NEET', 'GATE', 'UPSC', 'SSC']}
          selectedOptions={filters.competitive}
          toggleSelection={(value) => toggleSelection(value, 'competitive')}
        />
        <div className='w-full border mb-3' />

        {/* Condition Filter */}
        <DropdownFilter
          label="Condition"
          options={['New', 'Good', 'Acceptable']}
          selectedOptions={filters.condition}
          toggleSelection={(value) => toggleSelection(value, 'condition')}
        />
        <div className='w-full border mb-3' />

        {/* Language Filter */}
        <DropdownFilter
          label="Language"
          options={['English', 'Hindi']}
          selectedOptions={filters.language}
          toggleSelection={(value) => toggleSelection(value, 'language')}
        />
        <div className='w-full border mb-3' />


        {/* Genre Filter */}
        <DropdownFilter
          label="Genre"
          options={['Fiction', 'Non-Fiction', 'Children', 'Sci-Fi', 'Biography', 'School', 'Comics', 'Mystery', 'Thriller']}
          selectedOptions={filters.genre}
          toggleSelection={(value) => toggleSelection(value, 'genre')}
        />
        <div className='w-full border mb-3' />

        {/* Sort By Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => debouncedFilter({ ...filters, sortBy: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div className='w-full border mb-3' />

        {/* Reset Filters Button */}
        <button
          onClick={() => setFilters({
            board: [],
            category: [],
            subject: [],
            reference: [],
            competitive: [],
            condition: [],
            language: [],
            genre: [],
            sortBy: '',
          })}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all mb-4"
        >
          <span>Clear All Filters</span>
        </button>
      </div>

      {/* Books Grid */}
      <div className="w-full lg:mx-2 bg-white my-2 p-2">
        {/* Search Input */}
        <div className="md:w-full py-4 flex gap-2 relative">
          <input
            autoFocus
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            name="text"
            type="text"
            className="w-full pl-10  border border-gray-300 rounded-md" // Add padding to the left for the icon
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Lucide Search icon */}
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: booksPerPage }).map((_, index) => (
              <div key={index} className="bg-white p-4 border border-gray-200 rounded-xl shadow-md animate-pulse">
                <div className="relative h-64 bg-gray-300 rounded-md"></div>
                <div className="p-4 mt-4">
                  <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <img
              src="https://media.tenor.com/OJalYnY8qjAAAAAj/oops-oops-sorry.gif"
              alt="No books found"
              className="w-32 h-32 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No books found
            </h2>
            <p className="text-gray-500 mb-4">Try adjusting your filters or clearing them to see more results.</p>
            <button
              onClick={() => setFilters({
                board: [],
                category: [],
                subject: [],
                reference: [],
                competitive: [],
                condition: [],
                language: [],
                genre: [],
                sortBy: '',
                page: 1,
              })}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2" : "flex flex-col"}>
            {/* Render filtered books */}
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                addToCart={addToCart}
                onClick={() => handleCardClick(book.id, book.title, book.author, book.category, book.condition)}
                onAddToWishlist={handleAddToWishlist}
                isInWishlist={wishlist.some(item => item.id === book.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
{filteredBooks.length > 0 && (
  <div className="flex relative z-10 items-center justify-center mt-6 space-x-2">
    <button
      onClick={handlePrev}
      disabled={currentPage === 1}
      className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {paginationRange.map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        {page}
      </button>
    ))}

    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
)}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="flex justify-end p-2">
              <button
                className="p-1 text-gray-500 hover:text-gray-700"
                onClick={closeQuickView}
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{quickViewProduct.title}</h2>
                  <p className="text-gray-600 mb-4">by {quickViewProduct.author}</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{quickViewProduct.price}</span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-lg text-gray-500 line-through">₹{quickViewProduct.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{quickViewProduct.description}</p>
                  <button
                    className={`w-full py-3 rounded-lg font-medium ${quickViewProduct.stockStatus === 'Out of Stock' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    disabled={quickViewProduct.stockStatus === 'Out of Stock'}
                    onClick={() => handleAddToCart(quickViewProduct)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookFilter;