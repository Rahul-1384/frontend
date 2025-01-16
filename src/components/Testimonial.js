import React, { useState, useEffect } from 'react';

const books = [
  { id: 1, title: "John Doe", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAI54j9Ynb5T2HVcfKuhbXirFLUT0fq7-Xa1GEggi2YYkjignJ9I_Kjw_hayyOBaGy91Q&usqp=CAU", desc: "Description of the Users, what they say." },
  { id: 2, title: "John Doe", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAI54j9Ynb5T2HVcfKuhbXirFLUT0fq7-Xa1GEggi2YYkjignJ9I_Kjw_hayyOBaGy91Q&usqp=CAU", desc: "Description of the Users, what they say." },
  { id: 3, title: "John Doe", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAI54j9Ynb5T2HVcfKuhbXirFLUT0fq7-Xa1GEggi2YYkjignJ9I_Kjw_hayyOBaGy91Q&usqp=CAU", desc: "Description of the Users, what they say." },
  { id: 4, title: "John Doe", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAI54j9Ynb5T2HVcfKuhbXirFLUT0fq7-Xa1GEggi2YYkjignJ9I_Kjw_hayyOBaGy91Q&usqp=CAU", desc: "Description of the Users, what they say." },
  { id: 5, title: "John Doe", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAI54j9Ynb5T2HVcfKuhbXirFLUT0fq7-Xa1GEggi2YYkjignJ9I_Kjw_hayyOBaGy91Q&usqp=CAU", desc: "Description of the Users, what they say." },
];

function Testimonial() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-[#001E28] py-20'>
        <p className='text-xl font-bold text-center text-white tracking-wide sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-4xl mb-6'>Testimonials</p>
        <div className="text-sm text-center font-semibold mb-4 text-gray-400 md:text-lg">What our happy users say</div>
        <div className="relative flex items-center justify-center w-[90%] overflow-hidden mx-auto bg-gradient-to-r p-5 shadow-xl">
            <button 
                className="bg-white text-purple-500 font-bold px-4 py-2 rounded-full hover:bg-purple-100 transition duration-300 absolute left-4 z-10"
                onClick={prevSlide}
            >
                &#8592;
            </button>
            <div 
                className="flex transition-transform duration-700 w-[50%] ease-in-out" 
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {books.map((book, i) => (
                <div 
                    className={`min-w-full flex flex-col items-center justify-center text-center p-5 border mx-2 shadow-lg rounded-lg transform hover:scale-105 transition duration-300 ${
                    i === index ? 'border-4 border-purple-500' : 'border-gray-200'
                    }`}
                    key={book.id}
                >
                    <img src={book.image} alt={book.title} className="w-[50%] h-[50%] object-cover mb-4 rounded-lg" />
                    <p className="text-xl font-bold mb-2 text-white">{book.title}</p>
                    <p className="text-gray-300">{book.desc}</p>
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

export default Testimonial;
