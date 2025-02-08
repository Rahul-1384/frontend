import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import PropTypes from "prop-types";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import BooksNavbar from '../components/BooksNavbar';

import CartButton from "../components/CartButton";
import Navbar from '../components/Navbar';

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
  children: PropTypes.node,
  className: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
};

// BookCard Component
const BookCard = ({ book, addToCart, onClick }) => {
  const discountedPrice = (
    Math.max(0, (book.price || 0) - (book.discount || 0))
  ).toFixed(2);

  return (
    <div
      className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 bg-white"
      aria-label={`Book card for ${book.title || 'Untitled'}`}
      tabIndex={0}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative h-64">
        <img
          src={book.image || 'https://via.placeholder.com/150'}
          alt={`Cover of ${book.title || 'Untitled'}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-xl"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold">
            {book.title || 'Untitled'}
          </h3>
          <p className="text-sm">{book.author || 'Unknown Author'}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-blue-600">
              ₹{discountedPrice}
            </p>
            {book.price && (
              <p className="text-sm text-gray-400">
                <span className="font-medium">M.R.P:</span>{" "}
                <span className="line-through text-gray-400">
                  ₹{book.price}
                </span>
              </p>
            )}
          </div>
          <p className="text-lg font-semibold">
            {book.board || 'General'}
          </p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Condition:</span>{" "}
            <span
              className={`px-2 py-1 text-xs text-white font-bold rounded-md ${book.condition === "New"
                  ? "bg-green-500"
                  : book.condition === "Good"
                    ? "bg-yellow-500"
                    : "bg-orange-600"
                }`}
            >
              {book.condition || 'Unknown'}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Language:</span>{" "}
            {book.language || 'N/A'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => console.log(`Buying ${book.title}`)}
            className="buy-btn flex-1 bg-gradient-to-r bg-blue-600 transition-all duration-1000 text-white font-semibold hover:bg-blue-700 "
            ariaLabel={`Buy ${book.title || 'this book'} now`}
          >

            <span style={{ "--i": 0 }}>B</span>
            <span style={{ "--i": 1 }}>u</span>
            <span style={{ "--i": 2 }}>y</span>
            <span>&nbsp;</span> {/* Add space here */}
            <span style={{ "--i": 4 }}>N</span>
            <span style={{ "--i": 5 }}>o</span>
            <span style={{ "--i": 6 }}>w</span>

          </Button>
          <CartButton book={book} addToCart={addToCart} />
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
          `http://localhost:3000/books?query=${encodeURIComponent(query)}`
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




  return (
    <div className="search-results ">
      {/* <BooksNavbar/> */}
      <Navbar />

      <div className='items-center md:items-start flex flex-col md:flex-row'>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden p-4 text-white bg-blue-500 sticky top-0  z-50 flex items-center justify-between w-full"
        >
          <FaFilter size={18} /> Filter
        </button>

        {/* Filter Section */}
        <div
          className={`md:w-1/5 top-[10%] filter-section bg-gray-100 p-4 md:block transition-all duration-1000 ease-in-out ${isFilterOpen ? 'open-modal' : 'close-modal'
            } md:static absolute`}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Boards</label>
            <div>
              {['CBSE', 'ICSE', 'UP'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.board.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'board')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
            <div>
              {['NCERT'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.category.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'category')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <div>
              {['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Political Science', 'Economics', 'Civics', 'Hindi', 'Business Studies', 'Accounts'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.subject.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'subject')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Reference Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference Books</label>
            <div>
              {['Arihant Publications', 'Oswaal Books', 'Disha Publications', 'S. Chand', 'R.D. Sharma', 'R.S. Aggarwal', 'S.L. Arora', 'Full Marks Series', 'Wren & Martin', 'Golden Guides'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.reference.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'reference')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Competitive Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitive Exams</label>
            <div>
              {['JEE', 'NEET', 'GATE', 'UPSC', 'SSC'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.competitive.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'competitive')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
            <div>
              {['New', 'Good', 'Acceptable'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.condition.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'condition')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <div>
              {['English', 'Hindi'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.language.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'language')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <div>
              {['Fiction', 'Non-Fiction', 'Children', 'Sci-Fi', 'Biography', 'School', 'Comics', 'Mystery', 'Thriller'].map((option) => (
                <label key={option} className="block text-sm">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    checked={filters.genre.includes(option.toLowerCase())}
                    onChange={() => toggleSelection(option.toLowerCase(), 'genre')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
