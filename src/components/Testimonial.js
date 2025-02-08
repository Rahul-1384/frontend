import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { 
    id: 1, 
    name: "John Doe",
    role: "Student, MIT",
    image: "/api/placeholder/80/80", 
    desc: "Bookefy has transformed how I access textbooks. The platform is intuitive and the community is incredibly helpful.",
    rating: 4
  },
  { 
    id: 2, 
    name: "Jane Smith",
    role: "Graduate Student, Stanford",
    image: "/api/placeholder/80/80", 
    desc: "Finding affordable textbooks was always a challenge until I discovered Bookefy. The exchange process is seamless!",
    rating: 5
  },
  { 
    id: 3, 
    name: "Mike Johnson",
    role: "Professor, Harvard",
    image: "/api/placeholder/80/80", 
    desc: "I recommend Bookefy to all my students. It's making education more accessible and affordable.",
    rating: 3
  },
  { 
    id: 4, 
    name: "Sarah Wilson",
    role: "Student, Berkeley",
    image: "/api/placeholder/80/80", 
    desc: "The AI-powered pricing makes it fair for everyone. I've saved so much money using Bookefy!",
    rating: 4
  },
  { 
    id: 5, 
    name: "Alex Brown",
    role: "Research Scholar, Oxford",
    image: "/api/placeholder/80/80", 
    desc: "Excellent platform with a great selection of academic books. The community is very supportive.",
    rating: 5
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Updated animation variants to maintain vertical position
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute'
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 6000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-gradient-to-b overflow-x-hidden from-[#001E28] to-[#003244] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Testimonials
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            What our happy users say about Bookefy
          </p>
        </div>

        <div className="relative flex items-center justify-center max-w-4xl mx-auto">
          <button
            className="absolute left-0 md:-left-16 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full md:mb-0" style={{ height: 'auto' }}> {/* Fixed height container */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="w-full absolute top-0 left-0"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonials[index].image}
                        alt={testimonials[index].name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-purple-500/20"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {renderStars(testimonials[index].rating)}
                      </div>
                      <p className="text-gray-300 text-lg md:text-xl mb-6">
                        "{testimonials[index].desc}"
                      </p>
                      <div>
                        <h4 className="text-white font-semibold text-xl mb-1">
                          {testimonials[index].name}
                        </h4>
                        <p className="text-purple-400">
                          {testimonials[index].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="absolute right-0 md:-right-16 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const newDirection = i > index ? 1 : -1;
                setDirection(newDirection);
                setIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === index ? 'bg-purple-500 w-4' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;