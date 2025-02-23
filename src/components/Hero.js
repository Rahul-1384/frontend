import React, { useState, useEffect, Suspense, useRef } from 'react';
import { NavLink, redirect } from "react-router-dom";
import { ArrowRight, Library, BookOpen, BookCopy, Send, ChevronLeft, ChevronRight  } from 'lucide-react';
import { useChatbot } from '../context/ChatContext';
import AppDownloadButtons from './AppDownloadButtons';
import mobile1 from "../images/Hero/slide1_mobile.jpg";
import tablet1 from "../images/Hero/slide1_tablet.jpg";
import desktop1 from "../images/Hero/slide1_desktop.jpg";
import blur1 from "../images/Hero/slide1_blur.jpg";

import mobile2 from "../images/Hero/slide2_mobile.jpg";
import tablet2 from "../images/Hero/slide2_tablet.jpg";
import desktop2 from "../images/Hero/slide2_desktop.jpg";
import blur2 from "../images/Hero/slide2_blur.jpg";

import mobile3 from "../images/Hero/slide3_mobile.jpg";
import tablet3 from "../images/Hero/slide3_tablet.jpg";
import desktop3 from "../images/Hero/slide3_desktop.jpg";
import blur3 from "../images/Hero/slide3_blur.jpg";

import mobile4 from "../images/Hero/slide4_mobile.jpg";
import tablet4 from "../images/Hero/slide4_tablet.jpg";
import desktop4 from "../images/Hero/slide4_desktop.jpg";
import blur4 from "../images/Hero/slide4_blur.jpg";

import mobile5 from "../images/Hero/slide5_mobile.avif";

import mobile6 from "../images/Hero/slide6_mobile.jpg";
import tablet6 from "../images/Hero/slide6_tablet.jpg";
import desktop6 from "../images/Hero/slide6_desktop.jpg";
import blur6 from "../images/Hero/slide6_blur.jpg";

import mobile7 from "../images/Hero/slide7_mobile.jpg";
import tablet7 from "../images/Hero/slide7_tablet.jpg";
import desktop7 from "../images/Hero/slide7_desktop.jpg";
import blur7 from "../images/Hero/slide7_blur.jpg";



// Updated image configuration with better quality and fallback
const imageConfig = {
  slide1: {
    mobile: mobile1,
    tablet: tablet1,
    desktop: desktop1,
    placeholder: blur1
  },
  slide2: {
    mobile: mobile2,
    tablet: tablet2,
    desktop: desktop2,
    placeholder: blur2
  },
  slide3: {
    mobile: mobile3,
    tablet: tablet3,
    desktop: desktop3,
    placeholder: blur3
  },
  slide4: {
    mobile: mobile4,
    tablet: tablet4,
    desktop: desktop4,
    placeholder: blur4
  },
  slide5: {
    mobile: mobile5,
    tablet: mobile5,
    desktop: mobile5,
    placeholder: mobile5
  },
  slide6: {
    mobile: mobile6,
    tablet: tablet6,
    desktop: desktop6,
    placeholder: blur6
  },
  slide7: {
    mobile: mobile7,
    tablet: tablet7,
    desktop: desktop7,
    placeholder: blur7
  }
};

// Slide content with updated image references
const SlideContent = [
  {
    title: "Quality Books at Affordable Prices",
    subtitle: "Save up to 70% on used books",
    description: "Discover thousands of pre-loved books in excellent condition. Every book is quality-checked and sanitized before reaching you.",
    images: imageConfig.slide1,
    redirect: "/products"
  },
  {
    title: "Flexible Book Rentals",
    subtitle: "Why buy when you can rent?",
    description: "Rent textbooks and novels for as low as ₹10/week. Perfect for students and avid readers who want to optimize their reading budget.",
    images: imageConfig.slide2,
    redirect: "/rent"
  },
  {
    title: "Give Books a Second Life",
    subtitle: "Your donations make a difference",
    description: "Donate your books to support education in underserved communities. We've donated over 50,000 books to schools and libraries worldwide.",
    images: imageConfig.slide3,
    redirect: "/donate"
  },
  {
    title: "Massive Manga Collection",
    subtitle: "Your Manga Paradise",
    description: "Explore our vast collection of manga series, from classic titles to the latest releases. Available in both Japanese and English.",
    images: imageConfig.slide4,
    redirect: "/manga"
  },
  {
    title: "Digital Library Access",
    subtitle: "Read Anywhere, Anytime",
    description: "Access over 100,000 e-books from your devices. Enjoy offline reading and seamless syncing across all your devices.",
    images: imageConfig.slide5,
    redirect: "/ebooks"
  },
  {
    title: "Reading for Social Impact",
    subtitle: "Promoting Sustainability",
    description: "By choosing used books, you contribute to reducing paper waste and saving trees, making reading a sustainable choice for our planet.",
    images: imageConfig.slide6,
  },
  {
    title: "Take Us Anywhere",
    subtitle: "Download Our Mobile App",
    description: "Scan the QR code to download our app. Available on iOS and Android.",
    images: imageConfig.slide7,
    extra: <AppDownloadButtons/>
  }
];

const OptimizedImage = ({ images, alt, priority = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(images.placeholder);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = () => {
      const width = window.innerWidth;
      let sourceUrl;

      if (width < 768) {
        sourceUrl = images.mobile;
      } else if (width < 1024) {
        sourceUrl = images.tablet;
      } else {
        sourceUrl = images.desktop;
      }

      const img = new Image();
      
      img.onload = () => {
        setCurrentSrc(sourceUrl);
        setLoaded(true);
        setError(false);
      };

      img.onerror = () => {
        // Try fallback image if main image fails
        if (images.fallback && sourceUrl !== images.fallback) {
          const fallbackImg = new Image();
          fallbackImg.src = images.fallback;
          fallbackImg.onload = () => {
            setCurrentSrc(images.fallback);
            setLoaded(true);
            setError(false);
          };
          fallbackImg.onerror = () => {
            setCurrentSrc(images.placeholder);
            setError(true);
          };
        } else {
          setCurrentSrc(images.placeholder);
          setError(true);
        }
      };

      img.src = sourceUrl;
    };

    if (priority) {
      loadImage();
    } else {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadImage();
          observer.disconnect();
        }
      }, {
        rootMargin: '50px'
      });

      const element = document.getElementById(`image-${alt}`);
      if (element) observer.observe(element);
      return () => observer.disconnect();
    }
  }, [images, priority, alt]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={images.placeholder}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-0' : 'opacity-100 blur-lg'
        }`}
      />
      <img
        id={`image-${alt}`}
        src={currentSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <p>Image failed to load</p>
        </div>
      )}
    </div>
  );
};

const HeroSlide = ({ title, subtitle, description, images, extra, isActive, priority, isLastTwoSlides, redirect }) => (
  <div 
    className={`absolute inset-0 transition-opacity duration-700 ${
      isActive ? 'opacity-100' : 'opacity-0'
    }`}
  >
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/40 z-10" />
      <Suspense fallback={
        <div className="w-full h-full bg-gray-900 animate-pulse" />
      }>
        <OptimizedImage
          images={images}
          alt={title}
          priority={priority}
        />
      </Suspense>
    </div>
    <div className="h-full flex items-center">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-left z-10">
          <p className={`text-4xl md:text-6xl font-bold text-white mb-4 transition-all duration-500 ${
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {title}
          </p>
          <p className={`text-2xl md:text-3xl text-purple-300 mb-4 transition-all duration-500 delay-100 ${
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {subtitle}
          </p>
          <p className={`text-lg md:text-xl text-gray-300 mb-8 transition-all duration-500 delay-200 ${
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {description}
          </p>
          {extra && (
            <div className={`transition-all duration-500 delay-300 ${
              isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              {extra}
            </div>
          )}
          {!isLastTwoSlides && (
            <NavLink 
              to={redirect}
              className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 group no-underline ${
                isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Explore Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  </div>
);

const NavigationButton = ({ direction, onClick }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm group hidden lg:block"
      style={{ [direction]: '2rem' }}
    >
      <Icon className={`w-8 h-8 transition-transform duration-300 ${
        direction === 'left' 
          ? 'group-hover:-translate-x-1' 
          : 'group-hover:translate-x-1'
      }`} />
    </button>
  );
};


const Hero = () => {
  const { isChatbotVisible, toggleChatbot } = useChatbot();
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50; // minimum distance for swipe
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const goToNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % SlideContent.length);
    setTimeout(() => setIsTransitioning(false), 700); // Match this with your transition duration
  };

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + SlideContent.length) % SlideContent.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToPrevSlide();
      } else {
        goToNextSlide();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#0F172A] overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Visual touch feedback indicator */}
      <div 
        className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-200 pointer-events-none touch-feedback"
        style={{ opacity: isTransitioning ? '0.1' : '0' }}
      />

      {SlideContent.map((slide, index) => (
        <HeroSlide
          key={index}
          {...slide}
          isActive={currentSlide === index}
          priority={index === 0}
          isLastTwoSlides={index >= SlideContent.length - 2} // Check if it's the last slide
          redirect={slide.redirect}
        />
      ))}

      {/* Navigation Buttons (hidden on mobile) */}
      <NavigationButton direction="left" onClick={goToPrevSlide} />
      <NavigationButton direction="right" onClick={goToNextSlide} />

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SlideContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-purple-500 w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Chat Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ask AI
        </span>
      </button>

      {/* Add some CSS for better touch handling */}
      <style jsx>{`
        .touch-feedback {
          will-change: opacity;
        }
        
        @media (hover: none) {
          .touch-feedback {
            background: linear-gradient(
              to right,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 100%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;