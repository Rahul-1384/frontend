import React, { useState, useEffect } from 'react';
import { Search, Download, Book, ChevronDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample data structure for books
const sampleBooks = [
  {
    id: 1,
    title: "The Art of Programming",
    author: "John Smith",
    cover: "https://rukminim2.flixcart.com/image/850/1000/kjvrdzk0/book/n/i/s/art-of-computer-programming-volume-4-fascicle-6-the-original-imafzbztzvegn8k5.jpeg?q=90&crop=false",
    category: "Technology",
    description: "A comprehensive guide to modern programming practices",
    downloadUrl: "#",
    readUrl: "#"
  },
  {
    id: 2,
    title: "Digital Marketing Essentials",
    author: "Sarah Johnson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1547282388i/43543280.jpg",
    category: "Marketing",
    description: "Learn the fundamentals of digital marketing",
    downloadUrl: "#",
    readUrl: "#"
  }
];

const EbooksSection = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(sampleBooks);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fuzzy search function
  const fuzzySearch = (text, searchTerm) => {
    const search = searchTerm.toLowerCase();
    const tokens = text.toLowerCase().split('');
    let searchPosition = 0;

    for (const char of tokens) {
      if (char === search[searchPosition]) {
        searchPosition += 1;
      }
      if (searchPosition === search.length) {
        return true;
      }
    }
    return false;
  };

  // Handle search and suggestions
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = books.filter(
        book => 
          fuzzySearch(book.title, value) || 
          fuzzySearch(book.author, value) ||
          fuzzySearch(book.category, value)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const categories = ['All', ...new Set(books.map(book => book.category))];
  const filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-4xl font-bold text-indigo-900 mb-4">Digital Library</h1>
        <p className="text-lg text-gray-600">Discover and download your next favorite book</p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                {suggestions.map((book) => (
                  <div
                    key={book.id}
                    className="p-3 hover:bg-indigo-50 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(book.title);
                      setSuggestions([]);
                    }}
                  >
                    <p className="font-medium text-gray-800">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative pb-[133%]">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="absolute w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-indigo-600 mb-1">{book.category}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{book.description}</p>
                  
                  <div className="flex gap-2">
                    <a
                      href={book.readUrl}
                      className="flex-1 no-underline flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Book className="w-4 h-4 mr-2" />
                      Read
                    </a>
                    <a
                      href={book.downloadUrl}
                      className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EbooksSection;