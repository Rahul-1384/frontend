import React, { useState, useEffect } from 'react';

const books = [
  { id: 1, title: "Book One", image: "" },
  { id: 2, title: "Book Two", image: "https://via.placeholder.com/300x200?text=Book+Two" },
  { id: 3, title: "Book Three", image: "https://via.placeholder.com/300x200?text=Book+Three" },
  { id: 4, title: "Book Four", image: "https://via.placeholder.com/300x200?text=Book+Four" },
  { id: 5, title: "Book Five", image: "https://via.placeholder.com/300x200?text=Book+Five" },
];

function Trending() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Adjust the interval as needed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-[#001E28] py-20'>
        <p className='text-xl font-bold text-center text-white tracking-wide sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-4xl mb-12'>Trending Books</p>
        <div className="relative flex items-center justify-center w-[90%] overflow-hidden mx-auto bg-gradient-to-r p-5 shadow-xl">
            <button 
                className="bg-white text-purple-500 font-bold px-4 py-2 rounded-full hover:bg-purple-100 transition duration-300 absolute left-4 z-10"
                onClick={prevSlide}
            >
                &#8592;
            </button>
            <div 
                className="flex transition-transform duration-700 w-[30%] ease-in-out" 
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {books.map((book, i) => (
                <div 
                    className={`min-w-full flex flex-col items-center justify-center text-center p-5 border mx-2 shadow-lg rounded-lg transform hover:scale-105 transition duration-300 ${
                    i === index ? 'border-4 border-purple-500' : 'border-gray-200'
                    }`}
                    key={book.id}
                >
                    <img src={book.image} alt={book.title} className="w-32 h-32 object-cover mb-4 rounded-lg" />
                    <p className="text-xl font-bold mb-2 text-white">{book.title}</p>
                    <p className="text-gray-300">Discover the fascinating details of {book.title}.</p>
                </div>
                ))}
            </div>
            <button 
                className="bg-white text-purple-500 font-bold px-4 py-2 rounded-full hover:bg-purple-100 transition duration-300 absolute right-4 z-10"
                onClick={nextSlide}
            >
                &#8594;
            </button>
        </div>
    </div>
  );
}

export default Trending;
