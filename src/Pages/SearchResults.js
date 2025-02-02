import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa";

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
const BookCard = ({ book, addToCart }) => {
  const discountedPrice = (
    Math.max(0, (book.price || 0) - (book.discount || 0))
  ).toFixed(2);

  return (
    <div
      className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transform transition-all duration-300 hover:scale-105 bg-white"
      aria-label={`Book card for ${book.title || "Untitled"}`}
      tabIndex={0}
    >
      {/* Image Section */}
      <div className="relative h-64">
        <img
          src={book.image || "https://via.placeholder.com/150"}
          alt={`Cover of ${book.title || "Untitled"}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-xl"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold">{book.title || "Untitled"}</h3>
          <p className="text-sm">{book.author || "Unknown Author"}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-blue-600">₹{discountedPrice}</p>
            {book.price && (
              <p className="text-sm text-gray-400">
                <span className="font-medium">M.R.P:</span>{" "}
                <span className="line-through text-gray-400">₹{book.price}</span>
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => console.log(`Buying ${book.title}`)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500"
            ariaLabel={`Buy ${book.title || "this book"} now`}
          >
            Buy Now
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(book);
            }}
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
            ariaLabel={`Add ${book.title || "this book"} to cart`}
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
    image: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

// Search Results Component
const SearchResults = ({ addToCart }) => {
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
    <div className="search-results p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

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

      {/* Loading, Error, and Results display */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>No results found for "{searchQuery}".</p>
      )}

      {/* Books List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((book) => (
          <BookCard key={book.id} book={book} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default SearchResults;
