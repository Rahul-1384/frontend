// BooksNavbar.js
import React, { useState } from 'react';

const BooksNavbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm); // Pass the search term to parent (Buy)
  };

  return (
    <nav>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default BooksNavbar;
