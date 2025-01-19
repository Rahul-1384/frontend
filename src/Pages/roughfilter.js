
// Fetch From API Code
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';
import './bookfilter.css';
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";


const BookCard = ({ book, addToCart }) => {
  const discountedPrice = (book.price - (book.discount || 0)).toFixed(2);

  return (
    <div
      className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 bg-white"
      aria-label={`Book card for ${book.title}`}
      tabIndex={0}
    >
      {/* Image Section */}
      <div className="relative h-64">
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-xl"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold">{book.title}</h3>
          <p className="text-sm">{book.author}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-blue-600">₹{discountedPrice}</p>
            <p className="text-sm text-gray-400">
              <span className="font-medium">M.R.P:</span>{" "}
              <span className="line-through text-gray-400">₹{book.price}</span>
            </p>
          </div>
          <p className="text-lg font-semibold">{book.board}</p>
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
              {book.condition}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Language:</span> {book.language}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
            aria-label={`Buy ${book.title} now`}
          >
            Buy Now
          </button>
          <button
            onClick={() => addToCart(book)}
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-md transition-all duration-300"
            aria-label={`Add ${book.title} to cart`}
            title="Add to Cart"
          >
            <FaCartPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};



// Helper functions for query string manipulation
const parseQueryString = (searchParams) => {
  const parsedFilters = {};
  for (const [key, value] of searchParams.entries()) {
    if (['board', 'category', 'subject', 'reference', 'competitive', 'condition', 'language', 'genre'].includes(key)) {
      parsedFilters[key] = value.split(',');
    } else if (key === 'sortBy') {
      parsedFilters[key] = value;
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
    }
  });
  return params.toString();
};


const BookFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    searchQuery: '', // Added state for search query
    ...parseQueryString(searchParams),
  }));

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 21;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const queryString = buildQueryString(filters);
    setSearchParams(queryString);
  }, [filters, setSearchParams]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/books');
      const data = await response.json();
      console.log("Fetched books:", data);

      const uniqueBooks = data.filter((book, index, self) =>
        index === self.findIndex((b) => b.id === book.id)
      );

      setBooks((prevBooks) => {
        return uniqueBooks.map((newBook) => {
          const existingBookIndex = prevBooks.findIndex((book) => book.id === newBook.id);
          if (existingBookIndex === -1) return newBook;
          
          const existingBook = prevBooks[existingBookIndex];
          const hasChanged = existingBook.title !== newBook.title || existingBook.author !== newBook.author;
          if (hasChanged) {
            return { ...existingBook, ...newBook };
          }
          return existingBook;
        });
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    const intervalId = setInterval(() => {
      fetchBooks();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const filteredBooks = useMemo(() => {
    const filtered = books.filter((book) => {
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
        if (!filters[key]) return true;
        return filters[key].length === 0 || (value && filters[key].includes(value));
      });
    });

    if (filters.searchQuery) {
      return filtered.filter((book) =>
        book.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [filters, books]);

  const sortedBooks = useMemo(() => {
    return filteredBooks.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        default:
          return 0;
      }
    });
  }, [filteredBooks, filters.sortBy]);

  const handleSearchChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: event.target.value,
    }));
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
      }, 6000),
    []
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

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

  return (
    <div className="flex flex-col md:flex-row">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="md:hidden p-4 text-white bg-blue-500 sticky top-0 z-50 flex items-center justify-between w-full"
      >
        <FaFilter size={18} /> Filter
      </button>

      <div
        className={`md:w-1/5 filter-section bg-gray-100 p-4 md:block transition-all duration-1000 ease-in-out ${
          isFilterOpen ? 'open-modal' : 'close-modal'
        } md:static absolute z-50`}
      >
        <button
          onClick={() => setIsFilterOpen(false)}
          className="sticky top-2 left-[100%] text-white bg-red-600 p-2 md:hidden rounded-full hover:bg-red-700 transition-colors duration-300"
          title="Close Filters"
        >
          <FaTimes size={20} />
        </button>
        <p className='-mt-8 font-extrabold text-[1.5rem] tracking-widest md:-mt-0'>Filters</p>
        
        {/* Search Bar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search by title or author"
          />
        </div>

        {/* Existing filters go here... */}

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
            searchQuery: '', // Clear search query too
          })}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all mb-4"
        >
          <span>Clear All Filters</span>
        </button>
      </div>

      <div className="w-full md:w-4/5 p-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        ) : currentBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <img
              src="https://media.tenor.com/OJalYnY8qjAAAAAj/oops-oops-sorry.gif"
              alt="No books found"
              className="w-32 h-32 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No books found
            </h2>
            <p className="text-gray-500 mb-4">Try adjusting your filters or clearing them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBooks.map((book) => (
              <BookCard key={book.id} book={book} addToCart={() => console.log(`Added ${book.title} to cart`)} />

            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {paginationRange.map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
