import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Trending = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       setLoading(true);
  //       // Replace with your actual API endpoint
  //       const response = await axios.get('http://localhost:3000/books');
  //       setBooks(response.data);
  //     } catch (err) {
  //       setError('Failed to fetch books. Please try again later.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBooks();
  // }, []);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Hardcoded book data (temporary replacement for API call)
        const booksData = [
          { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-crw0gMQo_4KCXAtx9fxfrNr7eFEBmI1X4g&s" },
          { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-crw0gMQo_4KCXAtx9fxfrNr7eFEBmI1X4g&s" },
          { id: 3, title: "1984", author: "George Orwell", price: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-crw0gMQo_4KCXAtx9fxfrNr7eFEBmI1X4g&s" }
        ];
        setBooks(booksData);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchBooks();
  }, []);
  

  useEffect(() => {
    if (books.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [books.length]);

  const navigate = (direction) => {
    setIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % books.length;
      }
      return (prevIndex - 1 + books.length) % books.length;
    });
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="w-full bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="h-8 w-64 mx-auto mb-12 bg-slate-800 animate-pulse rounded" />
          <div className="flex justify-center">
            <div className="h-96 w-full max-w-2xl bg-slate-800 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="w-full bg-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-12">
          Trending Books
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-10">
            <button
              onClick={() => navigate('prev')}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              aria-label="Previous book"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate('next')}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              aria-label="Next book"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-hidden mx-auto rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {books.map((book) => (
                <div key={book.id} className="min-w-full px-4">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl backdrop-blur-sm">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-48 h-64 relative flex-shrink-0">
                          <img
                            src={book.image || "/api/placeholder/192/256"}
                            alt={book.title}
                            className="w-full h-full object-cover rounded-lg shadow-xl"
                          />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                            {book.title}
                          </h3>
                          <p className="text-slate-300 mb-4 line-clamp-3">
                            {book.description || `Discover the fascinating details of ${book.title}.`}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {book.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {books.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? 'bg-white w-6' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;