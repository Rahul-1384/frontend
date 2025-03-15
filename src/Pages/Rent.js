import React, { useState } from 'react';
import { Calendar, Book, Clock, Info, Search, Filter, ArrowLeft, ArrowRight } from 'lucide-react';

const Rent = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(7); // days
  const [currentPage, setCurrentPage] = useState(1);

  // Sample book data
  const books = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Thomas H. Cormen",
      category: "academic",
      imageUrl: "/api/placeholder/200/300",
      dailyRate: 5,
      weeklyRate: 25,
      monthlyRate: 80,
      available: true,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "fiction",
      imageUrl: "/api/placeholder/200/300",
      dailyRate: 3,
      weeklyRate: 15,
      monthlyRate: 45,
      available: true,
      rating: 4.8,
      reviews: 256
    },
    {
      id: 3,
      title: "Chemistry: A Molecular Approach",
      author: "Nivaldo J. Tro",
      category: "academic",
      imageUrl: "/api/placeholder/200/300",
      dailyRate: 6,
      weeklyRate: 30,
      monthlyRate: 90,
      available: false,
      rating: 4.3,
      reviews: 89
    },
    // Add more books as needed
  ];

  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'academic', name: 'Academic' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
  ];

  const durations = [
    { days: 7, label: '1 Week' },
    { days: 14, label: '2 Weeks' },
    { days: 30, label: '1 Month' },
    { days: 90, label: '3 Months' },
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const calculateRentalPrice = (book) => {
    if (selectedDuration <= 7) return book.dailyRate * selectedDuration;
    if (selectedDuration <= 30) return book.weeklyRate * Math.ceil(selectedDuration / 7);
    return book.monthlyRate * Math.ceil(selectedDuration / 30);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Rent Your Books</h1>
        <p className="text-lg text-gray-600 mb-8">Access knowledge without the commitment of buying</p>

        {/* Search and Filter Section */}
      </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
              >
                {durations.map(duration => (
                  <option key={duration.days} value={duration.days}>
                    {duration.label}
                  </option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Filter size={20} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({book.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-1" />
                    {selectedDuration} days
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ${calculateRentalPrice(book)}
                  </div>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    book.available
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!book.available}
                >
                  {book.available ? 'Rent Now' : 'Currently Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            className="p-2 rounded-lg bg-white shadow hover:bg-gray-50"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            <ArrowLeft size={20} />
          </button>
          <span className="px-4 py-2 text-gray-700">Page {currentPage}</span>
          <button
            className="p-2 rounded-lg bg-white shadow hover:bg-gray-50"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
    </div>
  );
};

export default Rent;