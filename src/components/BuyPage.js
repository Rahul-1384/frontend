import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const BuyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    sortBy: '',
    page: 1,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const booksPerPage = 9;

  // Fetch books from API
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle filters and search
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSearchParams({ ...filters, [key]: value });
  };

  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value);
    setFilters((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
  }, 300);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearchTerm =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearchTerm;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low-high') return a.price - b.price;
        if (filters.sortBy === 'price-high-low') return b.price - a.price;
        return 0;
      });
  }, [books, searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const currentPageBooks = filteredBooks.slice(
    (filters.page - 1) * booksPerPage,
    filters.page * booksPerPage
  );

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    setSearchParams({ ...filters, page });
  };

  // Render
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Buy Used Books</h1>
      <input
        type="text"
        placeholder="Search by title, author, category, or ISBN"
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      {loading && <div className="skeleton-loader">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {filteredBooks.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <img src="oops-image-url" alt="No results found" className="w-32 h-32 mb-4" />
          <p className="text-lg font-semibold">No books found. Try adjusting your filters or search.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPageBooks.map((book) => (
          <div key={book.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-blue-600 font-bold">Price: ₹{book.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
          className={`px-4 py-2 rounded-md ${filters.page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <span className="text-lg">Page {filters.page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page === totalPages}
          className={`px-4 py-2 rounded-md ${filters.page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BuyPage;