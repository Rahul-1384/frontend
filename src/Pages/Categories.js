import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Grid3X3, LayoutList, X, 
  ChevronRight, Bookmark, BookmarkCheck,
  Star, TrendingUp, Clock, Filter
} from 'lucide-react';

// Sample categories data
const categories = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Latest in tech and programming',
    imageUrl: '/api/placeholder/400/300',
    itemCount: 342,
    trending: true,
    rating: 4.8,
    lastUpdated: '2024-02-10'
  },
  {
    id: 'design',
    name: 'Design',
    description: 'UI/UX and graphic design resources',
    imageUrl: '/api/placeholder/400/300',
    itemCount: 256,
    trending: false,
    rating: 4.6,
    lastUpdated: '2024-02-09'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Business and entrepreneurship guides',
    imageUrl: '/api/placeholder/400/300',
    itemCount: 189,
    trending: true,
    rating: 4.7,
    lastUpdated: '2024-02-11'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Digital marketing strategies',
    imageUrl: '/api/placeholder/400/300',
    itemCount: 215,
    trending: false,
    rating: 4.5,
    lastUpdated: '2024-02-08'
  }
];

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
        placeholder="Search categories..."
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            onSearch('');
          }}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

const CategoryCard = ({ category, isGrid }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  if (!isGrid) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl p-4 flex items-center gap-6 hover:shadow-lg transition-all group"
      >
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            {category.trending && (
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Trending
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-2">{category.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" /> {category.rating}
            </span>
            <span>{category.itemCount} items</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Updated {category.lastUpdated}
            </span>
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
      className="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>
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
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" /> {category.rating}
            </span>
            <span className="text-gray-500">{category.itemCount} items</span>
          </div>
          {category.trending && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Trending
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isGrid, setIsGrid] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    trending: false,
    rating: 0,
  });

  const handleSearch = (value) => {
    const filtered = categories.filter(
      category =>
        category.name.toLowerCase().includes(value.toLowerCase()) ||
        category.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const applyFilters = () => {
    let filtered = [...categories];
    
    if (filters.trending) {
      filtered = filtered.filter(category => category.trending);
    }
    
    if (filters.rating > 0) {
      filtered = filtered.filter(category => category.rating >= filters.rating);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(
        category =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCategories(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm]);

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
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 z-10"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.trending}
                            onChange={(e) => setFilters({ ...filters, trending: e.target.checked })}
                            className="rounded text-blue-500"
                          />
                          Show only trending
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Rating
                        </label>
                        <select
                          value={filters.rating}
                          onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                          className="w-full rounded-lg border-gray-200"
                        >
                          <option value={0}>All ratings</option>
                          <option value={4.5}>4.5 and above</option>
                          <option value={4}>4.0 and above</option>
                          <option value={3.5}>3.5 and above</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isGrid={isGrid}
              />
            ))}
          </div>
        </AnimatePresence>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No categories found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;