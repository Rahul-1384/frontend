import React, { useState, useEffect, useRef } from 'react';
import { Search, Download, Book, ChevronDown, Loader2, Sun, Moon, ArrowLeft, ArrowRight, Maximize, Minimize, ZoomIn, ZoomOut, List, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Sample data structure for books with extended properties
const sampleBooks = [
  {
    id: 1,
    title: "The Art of Programming",
    author: "John Smith",
    cover: "https://rukminim2.flixcart.com/image/850/1000/kjvrdzk0/book/n/i/s/art-of-computer-programming-volume-4-fascicle-6-the-original-imafzbztzvegn8k5.jpeg?q=90&crop=false",
    category: "Technology",
    description: "A comprehensive guide to modern programming practices and techniques for beginners and advanced developers alike.",
    downloadUrl: "#",
    readUrl: "#",
    pages: 320,
    published: "2023",
    language: "English",
    content: [
      "Chapter 1: Introduction to Programming",
      "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.",
      "Chapter 2: Fundamentals of Algorithms",
      "An algorithm is a step-by-step procedure for calculations. Algorithms are used for calculation, data processing, and automated reasoning.",
    ]
  },
  {
    id: 2,
    title: "Digital Marketing Essentials",
    author: "Sarah Johnson",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1547282388i/43543280.jpg",
    category: "Marketing",
    description: "Learn the fundamentals of digital marketing and how to implement effective strategies for business growth.",
    downloadUrl: "#",
    readUrl: "#",
    pages: 284,
    published: "2022",
    language: "English",
    content: [
      "Chapter 1: The Digital Marketing Landscape",
      "Digital marketing encompasses all marketing efforts that use an electronic device or the internet. Businesses leverage digital channels such as search engines, social media, email, and websites to connect with current and prospective customers.",
      "Chapter 2: Search Engine Optimization",
      "Search engine optimization (SEO) is the process of optimizing your online content so that a search engine likes to show it as a top result for searches of a certain keyword.",
    ]
  },
  {
    id: 3,
    title: "Financial Freedom",
    author: "Robert Miles",
    cover: "https://m.media-amazon.com/images/I/71PL+3qM3cL._AC_UF1000,1000_QL80_.jpg",
    category: "Finance",
    description: "A step-by-step path to making more money, saving more, and living the life you want.",
    downloadUrl: "#",
    readUrl: "#",
    pages: 352,
    published: "2021",
    language: "English",
    content: [
      "Chapter 1: Money Mindset",
      "Your relationship with money shapes your ability to build wealth and achieve financial independence. In this chapter, we explore how to develop a positive money mindset that serves your goals.",
    ]
  },
  {
    id: 4,
    title: "Healthy Living",
    author: "Maria Chen",
    cover: "https://m.media-amazon.com/images/I/61MdEEhwbyL._AC_UF1000,1000_QL80_.jpg",
    category: "Health",
    description: "Practical advice for maintaining physical and mental well-being in today's busy world.",
    downloadUrl: "#",
    readUrl: "#",
    pages: 230,
    published: "2023",
    language: "English",
    content: [
      "Chapter 1: Nutrition Fundamentals",
      "Understanding the basics of nutrition is essential for maintaining good health. This chapter covers macronutrients, micronutrients, and how to create balanced meal plans.",
    ]
  }
];

// Book Card Component
const BookCard = ({ book, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className='bg-white hover:bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full'
      whileHover={{ y: -5 }}
    >
      <div className="relative pb-[100%] overflow-hidden group"> {/* Adjusted height */}
        <img
          src={book.cover}
          alt={book.title}
          className="absolute w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="font-medium">{book.title}</p>
            <p className="text-sm opacity-80">{book.author}</p>
          </div>
        </div>
      </div>
      <div className='p-4 flex-grow text-gray-900'>
        <div className="flex justify-between items-start mb-2">
          <p className='text-sm font-medium text-indigo-600'>{book.category}</p>
          <p className="text-xs opacity-70">{book.pages} pages</p>
        </div>
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{book.title}</h3>
        <p className='text-sm text-gray-600 mb-1'>{book.author}</p>
        <p className='text-sm text-gray-500 mb-4 line-clamp-2'>{book.description}</p>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onClick(book)}
            className='flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors'
          >
            <Book className="w-4 h-4 mr-2" />
            Read
          </button>
          <a
            href={book.downloadUrl}
            className='flex items-center justify-center px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors'
            aria-label="Download"
          >
            <Download className='w-4 h-4 text-gray-600' />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Reader Page Component
const ReaderPage = ({ book, onClose }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const readerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      readerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e) => {
      // Left arrow or PageUp for previous page
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setPageIndex(prevIndex => Math.max(0, prevIndex - 1));
      }
      // Right arrow or PageDown for next page
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setPageIndex(prevIndex => Math.min(book.content.length - 1, prevIndex + 1));
      }
      // Escape to exit fullscreen or close reader
      else if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      }
      // + to zoom in
      else if (e.key === '+') {
        setZoom(prev => Math.min(prev + 10, 200));
      }
      // - to zoom out
      else if (e.key === '-') {
        setZoom(prev => Math.max(prev - 10, 50));
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, book, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} overflow-hidden flex flex-col`}
      ref={readerRef}
      onClick={() => setShowControls(!showControls)}
    >
      {/* Reader Header */}
      <AnimatePresence>
        {(showControls || !isFullscreen) && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-4 py-3 flex items-center justify-between`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label="Close reader"
              >
                <X className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              <div>
                <h2 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{book.title}</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{book.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Page {pageIndex + 1} of {book.content.length}
              </span>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reader Content */}
      <div className="flex-grow overflow-auto p-4 sm:p-8 flex justify-center">
        <div
          className={`h-fit w-full md:w-[90%] ${darkMode ? 'text-gray-200' : 'text-gray-800'} reader-content`}
          style={{
            fontSize: `${zoom}%`,
            padding: '2rem',
            backgroundColor: darkMode ? '#1e1e2e' : '#fcfcfc',
            borderRadius: '0.5rem',
            boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div>
            <p className={`${darkMode ? 'text-purple-400' : 'text-indigo-600'} font-bold text-xl mb-4`}>
              {book.content[pageIndex]}
            </p>
            {pageIndex + 1 < book.content.length && (
              <p className="leading-relaxed">
                {book.content[pageIndex + 1]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reader Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-4 py-3`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                  disabled={pageIndex === 0}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-600'} disabled:cursor-not-allowed`}
                  aria-label="Previous page"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPageIndex(Math.min(book.content.length - 1, pageIndex + 1))}
                  disabled={pageIndex >= book.content.length - 1}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-600'} disabled:cursor-not-allowed`}
                  aria-label="Next page"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(zoom - 10, 50))}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{zoom}%</span>
                <button
                  onClick={() => setZoom(Math.min(zoom + 10, 200))}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100'}`}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ?
                    <Minimize className="w-5 h-5" /> :
                    <Maximize className="w-5 h-5" />
                  }
                </button>
                <button
                  onClick={() => setShowControls(false)}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} lg:hidden`}
                  aria-label="Hide controls"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main EbooksSection Component
const EbooksSection = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const suggestionsRef = useRef(null);

  // Handle clicks outside suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load books and recently viewed from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(sampleBooks);

      // Load recently viewed books from localStorage
      try {
        const stored = localStorage.getItem('recentlyViewedBooks');
        if (stored) {
          setRecentlyViewed(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load recently viewed books:', error);
      }

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Fuzzy search function
  const fuzzySearch = (text, searchTerm) => {
    if (!text) return false;
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
          fuzzySearch(book.category, value) ||
          fuzzySearch(book.description, value)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle book selection for reading
  const handleBookSelect = (book) => {
    setSelectedBook(book);

    // Add to recently viewed and save to localStorage
    const updatedRecent = [book, ...recentlyViewed.filter(item => item.id !== book.id)].slice(0, 4);
    setRecentlyViewed(updatedRecent);

    try {
      localStorage.setItem('recentlyViewedBooks', JSON.stringify(updatedRecent));
    } catch (error) {
      console.error('Failed to save recently viewed books:', error);
    }
  };

  // Get all categories from books
  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];

  // Filter books by category and search term
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 transition-colors duration-300'>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <h1 className='text-4xl sm:text-5xl font-bold text-indigo-900 mb-4'>Digital Library</h1>
          <p className='text-lg text-gray-600'>Discover and download your next favorite book</p>
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
            <div className="relative flex-1" ref={suggestionsRef}>
              <div className="relative">
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type="text"
                  placeholder="Search by title, author, or category..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 rounded-lg border bg-white border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className='absolute z-10 w-full mt-1 rounded-lg shadow-lg border bg-white border-gray-200'>
                  {suggestions.map((book) => (
                    <div
                      key={book.id}
                      className='p-3 cursor-pointer flex items-center gap-3 hover:bg-indigo-50'
                      onClick={() => {
                        setSearchTerm('');
                        setSuggestions([]);
                        handleBookSelect(book);
                      }}
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div>
                        <p className='font-medium text-gray-800'>{book.title}</p>
                        <p className='text-sm text-gray-600'>{book.author}</p>
                      </div>
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
                className='appearance-none w-full md:w-48 px-4 py-3 rounded-lg border bg-white border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' />
            </div>
          </div>
        </motion.div>

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-7xl mx-auto mb-8"
          >
            <h2 className='text-xl font-semibold mb-4 text-gray-900'>Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentlyViewed.map((book) => (
                <div
                  key={`recent-${book.id}`}
                  className='bg-white hover:bg-gray-50 p-2 rounded-lg flex items-center gap-3 cursor-pointer'
                  onClick={() => handleBookSelect(book)}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="min-w-0">
                    <p className='font-medium text-sm truncate text-gray-800'>{book.title}</p>
                    <p className='text-xs truncate text-gray-600'>{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Books Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className='w-8 h-8 animate-spin text-indigo-600' />
            </div>
          ) : filteredBooks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-12 text-gray-600'
            >
              <p className="text-xl mb-2">No books found</p>
              <p>Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 flex justify-between items-center"
              >
                <h2 className='text-xl font-semibold text-gray-900'>
                  {selectedCategory === 'All' ? 'All Books' : selectedCategory}
                </h2>
                <p className='text-sm text-gray-600'>
                  {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
                </p>
              </motion.div>
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={handleBookSelect}
                  />
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedBook && (
          <ReaderPage
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EbooksSection;