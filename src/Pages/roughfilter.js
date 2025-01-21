import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookSaleComponent = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    author: "",
  });
  const [books, setBooks] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query string on load and set filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      search: params.get("search") || "",
      category: params.get("category") || "",
      author: params.get("author") || "",
    });
  }, [location.search]);

  // Fetch books based on filters
  const fetchBooks = async (currentFilters) => {
    const queryParams = new URLSearchParams(currentFilters).toString();
    // Fetch books based on query (replace URL with your API endpoint)
    const response = await fetch(`http://localhost:3000/books?${queryParams}`);
    const data = await response.json();
    setBooks(data);
  };

  // Update query string and fetch books
  const applyFilters = () => {
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`?${queryParams}`);
    setQueryHistory((prev) => [...prev, queryParams]);
    fetchBooks(filters);
  };

  // Navigate to previous or next query
  const navigateHistory = (direction) => {
    const currentIndex = queryHistory.indexOf(location.search.substring(1));
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < queryHistory.length) {
      const nextQuery = queryHistory[nextIndex];
      navigate(`?${nextQuery}`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border rounded p-2 mr-2"
        >
          <option value="">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
        </select>
        <select
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
          className="border rounded p-2 mr-2"
        >
          <option value="">All Authors</option>
          <option value="author1">Author 1</option>
          <option value="author2">Author 2</option>
        </select>
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => navigateHistory(-1)}
          disabled={queryHistory.indexOf(location.search.substring(1)) <= 0}
          className="bg-gray-300 p-2 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => navigateHistory(1)}
          disabled={
            queryHistory.indexOf(location.search.substring(1)) >=
            queryHistory.length - 1
          }
          className="bg-gray-300 p-2 rounded"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded">
            <h3 className="font-bold">{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSaleComponent;
