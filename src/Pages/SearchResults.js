import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";


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
              className={`px-2 py-1 text-xs rounded-md ${
                book.condition === "Like New"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
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
        <div className="flex gap-2">
          <Button
            onClick={() => console.log(`Buying ${book.title}`)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500"
            ariaLabel={`Buy ${book.title || 'this book'} now`}
          >
            Buy Now
          </Button>
          <Button
            onClick={(e) => { e.stopPropagation(); addToCart(book); }}
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
            ariaLabel={`Add ${book.title || 'this book'} to cart`}
          >
            <FaCartPlus size={18} />
          </Button>
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
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to parse query parameters from the URL
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
  };

  // Fetch results based on the query
  useEffect(() => {
    const query = getQueryParam('query');
    setSearchQuery(query || ''); // If there's no query, set an empty string

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/books?query=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data); // Assuming the API returns an array of books
        } else {
          setError('No results found.');
        }
      } catch (err) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
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
    <div className="search-results">
      <h1>Search Results</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="md:w-full p-4 flex gap-4">
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

      {/* Loading, Error, and Results display */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>No results found for "{searchQuery}".</p>
      )}

      

      <div className="results-list">
        {results.map((book, index) => (
          <div key={index} className="result-card">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
