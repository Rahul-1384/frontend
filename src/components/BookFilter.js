import React, { useState, useMemo, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import Loading from './Loading';

const BookCard = ({ book }) => {
    return (
      <div className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-500 transition-colors duration-300">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
          <p className="text-sm text-gray-600 mb-1">Price: ₹{book.price}</p>
          <p className="text-sm text-gray-600 mb-1">Condition: <span className="font-medium">{book.condition}</span></p>
          <p className="text-sm text-gray-600 mb-1">Category: <span className="font-medium">{book.category}</span></p>
          <p className="text-sm text-gray-600 mb-1">Subject: <span className="font-medium">{book.subject}</span></p>
          <p className="text-sm text-gray-600 mb-1">Exam Type: <span className="font-medium">{book.examType}</span></p>
          <p className="text-sm text-gray-600 mb-1">Language: <span className="font-medium">{book.language}</span></p>
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            Buy Now
          </button>
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

  const [loading, setLoading] = useState(true); // Initially, loading is true
  const [books, setBooks] = useState([]);

  // Simulate fetching books from an API
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    const fetchBooks = async () => {
      // Simulate API delay
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
          examType: 'CBSE',
          year: 2020,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        {
          id: 2,
          title: 'Physics for JEE',
          author: 'Disha Publications',
          price: 500,
          condition: 'Good',
          category: 'NCERT',
          language: 'Hindi',
          genre: 'School',
          subject: 'Physics',
          examType: 'JEE',
          year: 2019,
          image: 'https://images.alphacoders.com/735/735617.jpg',
        },
        // More books...
      ];

      // Simulate network delay
      setTimeout(() => {
        setBooks(fetchedBooks);
        setLoading(false); // Set loading to false after data is fetched
      }, 1000); // Adjust the delay as needed
    };
    fetchBooks();
  }, []);

  // UseMemo for books initialization to avoid unnecessary renders
  const filteredBooks = useMemo(() => {
    const filtered = books.filter((book) => {
      const filterConditions = [
        { key: 'board', value: book.examType.toLowerCase() },
        { key: 'category', value: book.category.toLowerCase() },
        { key: 'subject', value: book.subject.toLowerCase() },
        { key: 'reference', value: book.author.toLowerCase() },
        { key: 'competitive', value: book.examType.toLowerCase() },
        { key: 'condition', value: book.condition.toLowerCase() },
        { key: 'language', value: book.language.toLowerCase() },
        { key: 'genre', value: book.genre.toLowerCase() },
      ];

      return filterConditions.every(
        ({ key, value }) =>
          filters[key].length === 0 || filters[key].includes(value)
      );
    });

    // Remove duplicate books based on 'id' (or other unique key)
    const uniqueBooks = filtered.reduce((acc, current) => {
      if (!acc.some(book => book.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);

    return uniqueBooks;
  }, [filters, books]);

  // Sort the filtered books
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

  // Utility to toggle a value in an array
  const toggleSelection = useCallback((value, key) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [key]: prev[key].includes(value)
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };

      // Scroll to the top when filters are applied
      window.scrollTo(0, 0); // Scroll to top of the page
      return updatedFilters;
    });
  }, []);

  // Debounced filtering function
  const debouncedFilter = useMemo(
    () =>
      debounce((newFilters) => {
        setFilters(newFilters);
        window.scrollTo(0, 0); // Scroll to top when filters change
      }, 300),
    []
  );

  return (
    <div className="flex">
      {/* Filter Section */}
      <div className="w-1/5 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

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
            {['Arihant Publications', 'Oswaal Books', 'Disha Publications', 'S. Chand', 'R.D. Sharma', 'R.S. Aggarwal', 'Full Marks Series', 'Wren & Martin', 'Golden Guides'].map((option) => (
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
      </div>

      {/* Product Display Section */}
      <div className="w-4/5 p-4">
        {/* Display Loading or Filtered Books */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedBooks.length === 0 ? (
              <div className="text-center text-gray-700">No books found based on the selected filters.</div>
            ) : (
              sortedBooks.map((book) => <BookCard key={book.id} book={book} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookFilter;
