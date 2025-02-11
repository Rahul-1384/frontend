import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Clock, Download, Share2, 
  BookMarked, Filter, Search, Grid, List, SortAsc,
  ChevronDown, Star 
} from 'lucide-react';

// Sample book data structure - Replace with your actual data source

const categories = [
    {
      id: "class-4-8",
      name: "Class 4-8",
      image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
      description: "Comprehensive study materials for middle school students.",
      bookCount: 245,
      path: "/categories/class-4-8"
    },
    {
      id: "class-9-12",
      name: "Class 9-12",
      image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
      description: "Advanced learning resources for high school students.",
      bookCount: 189,
      path: "/categories/class-9-12"
    },
    {
      id: "reference",
      name: "Reference Books",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      description: "Comprehensive reference materials across subjects.",
      bookCount: 312,
      path: "/categories/reference"
    },
    {
      id: "competition",
      name: "Competition Books",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      description: "Prepare for competitive exams with our curated collection.",
      bookCount: 167,
      path: "/categories/competition"
    },
    {
      id: "academic",
      name: "Academic",
      image: "https://freebookbrowser.com/images/cool-icon/textbooks.jpg",
      description: "Essential academic resources and textbooks.",
      bookCount: 423,
      path: "/categories/academic"
    },
    {
      id: "biographies",
      name: "Biographies",
      image: "https://lh3.googleusercontent.com/b8zxs8X2mcj2r7shj1ZpYaCSSwgHTqPxEQ6nIY5RjoMQFAd04V1nn2axjVKRWKfMQv8=h315",
      description: "Inspiring stories of remarkable individuals.",
      bookCount: 156,
      path: "/categories/biographies"
    },
    {
      id: "children",
      name: "Children's Books",
      image: "https://t3.ftcdn.net/jpg/07/56/38/12/240_F_756381268_sf9rCDhnKkCY23xLKd4BwDK9Y3w9PUKN.jpg",
      description: "Engaging books for young readers.",
      bookCount: 278,
      path: "/categories/children"
    },
    {
      id: "science-fiction",
      name: "Science Fiction",
      image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
      description: "Explore futuristic and imaginative worlds.",
      bookCount: 198,
      path: "/categories/science-fiction"
    }
  ];
const booksData = {
  "class-4-8": [
    {
      id: 1,
      title: "Mathematics Grade 6",
      author: "John Smith",
      coverImage: "/api/placeholder/200/300",
      rating: 4.5,
      reviews: 128,
      downloads: 1500,
      description: "Comprehensive mathematics textbook for 6th-grade students.",
      lastUpdated: "2024-01-15",
      format: "PDF",
      size: "15.2 MB",
      pages: 250
    },
    // Add more books...
  ],
  // Add more categories...
};

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    format: [],
    rating: null,
    dateRange: 'all'
  });

  // Find category details from the categories array
  useEffect(() => {
    const categoryData = categories.find(cat => cat.id === categoryId);
    if (categoryData) {
      setCategory(categoryData);
      // Simulate API call to fetch books
      setTimeout(() => {
        setBooks(booksData[categoryId] || []);
        setLoading(false);
      }, 1000);
    } else {
      navigate('/categories');
    }
  }, [categoryId, navigate]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Implement search logic here
  };

  const handleSort = (value) => {
    setSortBy(value);
    // Implement sorting logic here
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    // Implement filter logic here
  };

  const BookCard = ({ book, viewType }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = (e) => {
      e.preventDefault();
      setIsBookmarked(!isBookmarked);
      // Implement bookmark logic here
    };

    if (viewType === 'list') {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4"
        >
          <div className="flex items-center space-x-4">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-24 h-32 object-cover rounded-lg"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
              <p className="text-sm text-gray-600">By {book.author}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{book.rating}</span>
                <span className="text-sm text-gray-400">({book.reviews} reviews)</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{book.description}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full ${
                  isBookmarked ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <BookMarked className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Download
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div className="relative">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleBookmark}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isBookmarked ? 'bg-blue-600 text-white' : 'bg-white/80 text-gray-600'
            } backdrop-blur-sm hover:scale-110 transition-all duration-300`}
          >
            <BookMarked className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-600">By {book.author}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{book.rating}</span>
            <span className="text-sm text-gray-400">({book.reviews} reviews)</span>
          </div>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{book.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{new Date(book.lastUpdated).toLocaleDateString()}</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Download
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h2>
        <button
          onClick={() => navigate('/categories')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/categories')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Categories</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-lg text-blue-100 mb-6">{category.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{category.bookCount} Books</span>
              </div>
              <div className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                <span>1.2k Downloads</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SortAsc className="w-5 h-5" />
                  <span>Sort</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* Add sort dropdown menu */}
              </div>

              {/* Filter */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 border rounded-lg p-1">
                <button
                  onClick={() => setViewType('grid')}
                  className={`p-2 rounded ${
                    viewType === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewType('list')}
                  className={`p-2 rounded ${
                    viewType === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        <div className={
          viewType === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col space-y-4"
        }>
          {books.map((book) => (
            <BookCard key={book.id} book={book} viewType={viewType} />
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No books found in this category</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryDetails;