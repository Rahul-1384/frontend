import React, { useState, useMemo, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import './bookfilter.css';
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";

const BookCard = ({ book, addToCart }) => {
  const discountedPrice = (book.price - (book.discount || 0)).toFixed(2); // Calculate discounted price

  return (
    <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 bg-white">
      {/* Image Section */}
      <div className="relative h-64">
        <img
          src={book.image}
          alt={book.title}
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
          <div className='flex items-center gap-2'>
            <p className="text-3xl font-bold text-blue-600">₹{discountedPrice}</p>
            <p className="text-sm text-gray-400">
              <span className="font-medium">M.R.P:</span>{" "}
              <span className="line-through text-gray-400">₹{book.price}</span>
            </p>
          </div>
          <p className='text-lg font-semibold'>{book.board}</p>
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
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md hover:from-indigo-600 hover:to-blue-500 transition-all duration-300">
            Buy Now
          </button>
          <button
            onClick={() => addToCart(book)}
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-md transition-all duration-300"
            title="Add to Cart"
          >
            <FaCartPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};


const BookFilter = () => {
  const [filters, setFilters] = useState({
    board: [],
    category: [],
    subject: [],
    reference: [],
    competitive: [],
    condition: [],
    language: [],
    genre: [],
    sortBy: '',
  });

  const [loading, setLoading] = useState(false); // Set to false initially
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 21;

  const [isFilterOpen, setIsFilterOpen] = useState(false); // For toggling filter on mobile

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Set loading to true when fetching data
      const fetchedBooks = [
        {
          id: 1,
          title: 'Mathematics for Class 10',
          author: 'R.D. Sharma',
          price: 300,
          condition: 'Like New',
          category: 'NCERT',
          language: 'English',
          genre: 'School',
          subject: 'Mathematics',
          board: 'CBSE',
          year: 2020,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 8,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 9,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 10,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'UP',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 11,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'UP',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 12,
          title: 'Rahul for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'UP',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 13,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 14,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'UP',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 15,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 16,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 17,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 18,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 19,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 20,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'UP',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 21,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 22,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 23,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 24,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 25,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 26,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 27,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'ICSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 28,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'UP',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 29,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'UP',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 30,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          board: 'CBSE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        }
        // More books...
      ];

      // Simulate network delay
      setTimeout(() => {
        setBooks(fetchedBooks);
        setLoading(false); // Set loading to false after data is fetched
      }, 1000); // Adjust the delay as needed
    };

    fetchBooks();
  }, []); // Fetch books when the component is mounted

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
        if (!filters[key]) {
          return true; // If filters[key] doesn't exist, consider it a match
        }
        return filters[key].length === 0 || (value && filters[key].includes(value));
      });
    });
    

    const uniqueBooks = filtered.reduce((acc, current) => {
      if (!acc.some(book => book.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);

    return uniqueBooks;
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
      }, 6000),
    []
  );

  // Calculate the paginated books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
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
      {/* Filter Toggle Button for Mobile */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="md:hidden p-4 text-white bg-blue-500 sticky top-0  z-50 flex items-center justify-between w-full"
      >
        <FaFilter size={18} /> Filter
      </button>

      {/* Filter Section */}
      <div
        className={`md:w-1/5 filter-section bg-gray-100 p-4 md:block transition-all duration-1000 ease-in-out ${
          isFilterOpen ? 'open-modal' : 'close-modal'
        } md:static absolute z-50`}
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
            {['Like New', 'Good', 'Just Okay (Acceptable)'].map((option) => (
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
          <span onClick={window.scrollTo(0, 0)}>Clear All Filters</span>
        </button>
      </div>

      {/* Books Grid */}
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
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBooks.map((book) => (
              <BookCard key={book.id} book={book} addToCart={() => console.log(`Added ${book.title} to cart`)} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {currentBooks.length > 0 && (
          <div className="flex items-center justify-center mt-6 space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            {paginationRange.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default BookFilter;
