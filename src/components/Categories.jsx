import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import { 
  ArrowUpRight, BookOpen, Award, GraduationCap, Users, 
  Binary, BookMarked, Baby, Rocket, Search, Filter, 
  Grid, List, X, ChevronDown 
} from "lucide-react";

// Categories data
const categories = [
  {
    id: "class-4-8",
    name: "Class 4-8",
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
    description: "Comprehensive study materials for middle school students.",
    icon: BookOpen,
    bookCount: 245,
    path: "/categories/class-4-8"
  },
  {
    id: "class-9-12",
    name: "Class 9-12",
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
    description: "Advanced learning resources for high school students.",
    icon: GraduationCap,
    bookCount: 189,
    path: "/categories/class-9-12"
  },
  {
    id: "reference",
    name: "Reference Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    description: "Comprehensive reference materials across subjects.",
    icon: BookMarked,
    bookCount: 312,
    path: "/categories/reference"
  },
  {
    id: "competition",
    name: "Competition Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    description: "Prepare for competitive exams with our curated collection.",
    icon: Award,
    bookCount: 167,
    path: "/categories/competition"
  },
  {
    id: "academic",
    name: "Academic",
    image: "https://freebookbrowser.com/images/cool-icon/textbooks.jpg",
    description: "Essential academic resources and textbooks.",
    icon: Binary,
    bookCount: 423,
    path: "/categories/academic"
  },
  {
    id: "biographies",
    name: "Biographies",
    image: "https://lh3.googleusercontent.com/b8zxs8X2mcj2r7shj1ZpYaCSSwgHTqPxEQ6nIY5RjoMQFAd04V1nn2axjVKRWKfMQv8=h315",
    description: "Inspiring stories of remarkable individuals.",
    icon: Users,
    bookCount: 156,
    path: "/categories/biographies"
  },
  {
    id: "children",
    name: "Children's Books",
    image: "https://t3.ftcdn.net/jpg/07/56/38/12/240_F_756381268_sf9rCDhnKkCY23xLKd4BwDK9Y3w9PUKN.jpg",
    description: "Engaging books for young readers.",
    icon: Baby,
    bookCount: 278,
    path: "/categories/children"
  },
  {
    id: "science-fiction",
    name: "Science Fiction",
    image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg",
    description: "Explore futuristic and imaginative worlds.",
    icon: Rocket,
    bookCount: 198,
    path: "/categories/science-fiction"
  }
];


// SearchBar Component
const SearchBar = ({ onSearch, suggestions, searchTerm, setSearchTerm }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.item.name);
    onSearch(suggestion.item.name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || !suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex > -1) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-full sm:w-96" ref={searchRef}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            onSearch('');
            setShowSuggestions(false);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.item.icon;
              return (
                <button
                  key={suggestion.item.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 ${
                    index === selectedIndex ? 'bg-blue-50' : ''
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {suggestion.item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {suggestion.item.bookCount} books
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// CategoryCard Component
const CategoryCard = ({ category, index, viewType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const Icon = category.icon;

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCategories') || '[]');
    if (!isBookmarked) {
      localStorage.setItem('bookmarkedCategories', JSON.stringify([...bookmarks, category.id]));
    } else {
      localStorage.setItem('bookmarkedCategories', JSON.stringify(bookmarks.filter(id => id !== category.id)));
    }
  };

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCategories') || '[]');
    setIsBookmarked(bookmarks.includes(category.id));
  }, [category.id]);

  if (viewType === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      >
        <Link to={category.path} className="no-underline flex items-center p-4 group">
          <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
              loading="lazy"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{category.bookCount} books</span>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={category.path} className="block rounded-2xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-500">
        <div className="aspect-w-3 aspect-h-4 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          <img
            src={category.image}
            alt={category.name}
            className={`w-full h-64 object-cover transition-all duration-700 
              ${isLoading ? 'opacity-0' : 'opacity-100'} 
              group-hover:scale-110`}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-100 pt-10 text-white text-xl md:opacity-0 md:text-2xl text-center md:hover:pt-10 transition-all duration-500">
            {category.name}
          </div>

          <button
            onClick={handleBookmark}
            className={`absolute top-4 right-4 w-8 h-8 rounded-full 
              ${isBookmarked ? 'bg-blue-500' : 'bg-white/10 backdrop-blur-sm'} 
              flex items-center justify-center transition-all duration-300
              hover:scale-110 z-1`}
          >
            <motion.div
              initial={false}
              animate={{ scale: isBookmarked ? [1.2, 1] : 1 }}
              transition={{ duration: 0.2 }}
            >
              <BookMarked className={`w-4 h-4 ${isBookmarked ? 'text-white' : 'text-white'}`} />
            </motion.div>
          </button>

          <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <motion.div 
              className="flex items-center mb-2"
              whileHover={{ x: 5 }}
            >
              <Icon className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 text-sm font-medium">{category.bookCount} Books</span>
            </motion.div>
            <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-gray-200 text-sm mb-4">{category.description}</p>
            <motion.div 
              className="flex items-center text-white text-sm font-semibold"
              whileHover={{ x: 5 }}
            >
              <span className="text-3xl">Browse Collection</span>
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Main Categories Component
const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [suggestions, setSuggestions] = useState([]);

  // Initialize Fuse instance
  const fuse = new Fuse(categories, {
    keys: ['name', 'description'],
    threshold: 0.3,
    shouldSort: true,
    minMatchCharLength: 2
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setFilteredCategories(categories);
      setSuggestions([]);
      return;
    }

    const searchResults = fuse.search(value);
    setSuggestions(searchResults);
    setFilteredCategories(searchResults.map(result => result.item));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto md:px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-6 tracking-tight">
            Explore <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our comprehensive collection of books curated just for you
          </p>
        </motion.div>

        {/* Search and View Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-96">
          <SearchBar 
            onSearch={handleSearch}
            suggestions={suggestions}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewType('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewType === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewType === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <div className={
            viewType === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col space-y-4"
          }>
            {filteredCategories.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                index={index}
                viewType={viewType}
              />
            ))}
          </div>
        </AnimatePresence>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No categories found matching "{searchTerm}"</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Categories;
