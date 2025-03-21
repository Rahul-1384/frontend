import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import PropTypes from "prop-types";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import BooksNavbar from '../components/BooksNavbar';
import { Star, ChevronDown, Gift, Truck, ShoppingCart, Heart, Check, X } from 'lucide-react';
import { useCart } from "../context/CartContext";
import CartButton from "../components/CartButton";
import Navbar from '../components/Navbar';
import DropdownFilter from '../components/DropdownFIlter';
import Breadcrumbs from "../components/Breadcrumbs";


// Reusable Button Component
const Button = ({ onClick, children, className, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-md transition-all duration-300 ${className}`}
    aria-label={ariaLabel}
  >
    {children}
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

  const discountedPrice = (
    Math.max(0, (book.price || 0) - (book.discount || 0))
  ).toFixed(2);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      // Simulate adding to cart
      dispatch({ type: 'ADD_TO_CART', payload: book });
      setIsAdded(true);
      await fetchCartItems();

      setTimeout(() => {
        setIsAdded(false);
        setIsAddingToCart(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

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
                  className={`w-4 h-4 ${
                    i < (book.rating || 4)
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
              className={`w-full sm:flex-1 py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-colors duration-300 ${
                isAdded
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
    image: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

// Search Results Component
const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to parse query parameters from the URL
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
  };
  const [cart, setCart] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);


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
  }));

  const [currentPage, setCurrentPage] = useState(filters.page || 1);



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
  const debouncedFilter = useMemo(
    () =>
      debounce((newFilters) => {
        setFilters(newFilters);
        window.scrollTo(0, 0);
      }, 1000),
    [filters] // Add filters as a dependency
  );


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

  // Function to add the selected book to the cart
  const handleCardClick = (id, title, author, category, condition) => {
    navigate(`/books/${id}/${title}/${author}/${category}/${condition}`);
    console.log("Id of the book", id);
  };

  // Fetch results based on the query
  useEffect(() => {
    const query = getQueryParam("query");
    setSearchQuery(query || ""); // If no query, set an empty string

    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:5000/books?query=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error("No results found.");

        const data = await response.json();
        setResults(
          data.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submit for search (update URL and trigger fetch)
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };


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
    <div className="search-results ">
      {/* <BooksNavbar/> */}
      <Navbar />
      <Breadcrumbs />

      <div className='items-center md:items-start flex flex-col md:flex-row'>
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
        <div className='w-full md:w-4/5 p-4'>
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for books..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </form>
          <h1 className="text-2xl font-bold mb-4">Search Results For {searchQuery}</h1>

          {/* Loading, Error, and Results display */}
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && results.length === 0 && (
            <p>No results found for "{searchQuery}".</p>
          )}

          {/* Books List */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((book) => (
              <BookCard key={book.id || book.title} book={book} addToCart={addToCart} onClick={() => handleCardClick(book.id, book.title, book.author, book.category, book.condition)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default SearchResults;
