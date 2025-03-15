// src/pages/BuyPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiSearch, FiFilter, FiShoppingCart } from 'react-icons/fi';

const BookCard = ({ book, onAddToCart }) => {
  // Get the primary image or default
  const coverImage = book.images.find(img => img.is_primary)?.image || '/placeholder-book.jpg';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mt-1">by {book.author}</p>
        <p className="mt-2 font-semibold text-blue-600">₹{book.price}</p>
        <p className="text-xs text-gray-500 mt-1 capitalize">Condition: {book.condition.replace('_', ' ')}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/books/${book.id}`} 
            className="text-blue-600 hover:underline text-sm"
          >
            View Details
          </Link>
          
          <button
            onClick={() => onAddToCart(book.id)}
            className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <FiShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const BuyPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    condition: [],
    priceRange: { min: '', max: '' }
  });
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books/', {
          params: { for_sale: true }
        });
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
  useEffect(() => {
    // Apply filters and search
    let results = [...books];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );
    }
    
    // Condition filter
    if (filters.condition.length > 0) {
      results = results.filter(book => filters.condition.includes(book.condition));
    }
    
    // Price range filter
    if (filters.priceRange.min) {
      results = results.filter(book => parseFloat(book.price) >= parseFloat(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      results = results.filter(book => parseFloat(book.price) <= parseFloat(filters.priceRange.max));
    }
    
    setFilteredBooks(results);
  }, [searchQuery, filters, books]);
  
  const handleAddToCart = async (bookId) => {
    try {
      await axios.post('/api/cart/add_item/', { book_id: bookId });
      toast.success('Book added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.error || 'Failed to add to cart');
    }
  };
  
  const handleConditionToggle = (condition) => {
    setFilters(prev => {
      const newConditions = prev.condition.includes(condition)
        ? prev.condition.filter(c => c !== condition)
        : [...prev.condition, condition];
        
      return {
        ...prev,
        condition: newConditions
      };
    });
  };
  
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [name]: value
      }
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      condition: [],
      priceRange: { min: '', max: '' }
    });
    setSearchQuery('');
  };
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-grow">
          <input
            type="search"
            placeholder="Search by title, author, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200"
        >
          <FiFilter size={18} />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Filters</h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Condition</h3>
              <div className="space-y-2">
                {['new', 'like_new', 'good', 'fair', 'poor'].map((condition) => (
                  <label key={condition} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.condition.includes(condition)}
                      onChange={() => handleConditionToggle(condition)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="capitalize">{condition.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={handlePriceChange}
                  className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span>to</span>
                <input
                  type="number"
                  name="max"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={handlePriceChange}
                  className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No books found matching your criteria</p>
          <button 
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyPage;