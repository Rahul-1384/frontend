import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { 
  Search, Grid3X3, LayoutList, X, 
  Bookmark, BookmarkCheck
} from 'lucide-react';

// Sample categories data
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
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
    description: "Comprehensive reference materials across subjects.",
    bookCount: 312,
    path: "/categories/reference"
  },
  {
    id: "competition",
    name: "Competition Books",
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
    description: "Prepare for competitive exams with our curated collection.",
    bookCount: 167,
    path: "/categories/competition"
  },
  {
    id: "academic",
    name: "Academic",
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
    description: "Essential academic resources and textbooks.",
    bookCount: 423,
    path: "/categories/academic"
  },
  {
    id: "biographies",
    name: "Biographies",
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
    description: "Inspiring stories of remarkable individuals.",
    bookCount: 156,
    path: "/categories/biographies"
  },
  {
    id: "children",
    name: "Children's Books",
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
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

// Configure Fuse instance with search options
const fuseOptions = {
  keys: ['name', 'description'],
  threshold: 0.3,
  location: 0,
  distance: 100,
  minMatchCharLength: 2,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
};

const fuse = new Fuse(categories, fuseOptions);

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1);
    onSearch(value);

    if (value.trim()) {
      const results = fuse.search(value, { limit: 5 });
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        if (selectedIndex > -1) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.item.name);
    onSearch(suggestion.item.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
        className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
        placeholder="Search categories..."
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            onSearch('');
            setSuggestions([]);
            setShowSuggestions(false);
            setSelectedIndex(-1);
          }}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <ul className="divide-y  divide-gray-100">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.item.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {suggestion.item.name}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {suggestion.item.description}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {((1 - suggestion.score) * 100).toFixed(0)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryCard = ({ category, isGrid, searchScore }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleClick = () => {
    navigate(`/categories/${category.id}`);
  };

  const scoreLabel = searchScore !== undefined 
    ? `Match: ${((1 - searchScore) * 100).toFixed(0)}%` 
    : null;

  if (!isGrid) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl p-4 flex items-center gap-6 hover:shadow-lg transition-all group cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            {scoreLabel && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {scoreLabel}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-2">{category.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{category.bookCount} books</span>
          </div>
        </div>
        <button
          onClick={toggleBookmark}
          className="p-2 rounded-full hover:bg-gray-100 transition-all"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-blue-500" />
          ) : (
            <Bookmark className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            {scoreLabel && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {scoreLabel}
              </span>
            )}
          </div>
          <button
            onClick={toggleBookmark}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-all"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-blue-500" />
            ) : (
              <Bookmark className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-3">{category.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{category.bookCount} books</span>
        </div>
      </div>
    </motion.div>
  );
};

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isGrid, setIsGrid] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (value) => {
    setIsSearching(!!value);
    if (!value.trim()) {
      setSearchResults(categories.map(category => ({ item: category })));
      return;
    }

    const results = fuse.search(value);
    setSearchResults(results);
  };

  useEffect(() => {
    // Initialize with all categories
    setSearchResults(categories.map(category => ({ item: category })));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of resources across various categories
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setIsGrid(true)}
                className={`p-2 rounded-lg transition-all ${
                  isGrid ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsGrid(false)}
                className={`p-2 rounded-lg transition-all ${
                  !isGrid ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <div className={
            isGrid 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {searchResults.map((result) => (
              <CategoryCard
                key={result.item.id}
                category={result.item}
                isGrid={isGrid}
                searchScore={isSearching ? result.score : undefined}
              />
            ))}
          </div>
        </AnimatePresence>

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No categories found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;