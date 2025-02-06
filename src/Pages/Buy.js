// Buy.js
import React, { useState } from 'react';
import BooksNavbar from '../components/BooksNavbar';
import BookFilter from '../components/BookFilter';

const Buy = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
  };

  return (
    <div>
      <BooksNavbar onSearch={handleSearch} />
      <BookFilter searchQuery={searchQuery} />
    </div>
  );
};

export default Buy;
