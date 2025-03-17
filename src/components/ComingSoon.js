import React, { useEffect, useRef } from 'react';
import { Library, Instagram, X, Facebook, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ComingSoon = () => {
  const orbitRef = useRef(null);
  
  // Animation for the orbit effect
  useEffect(() => {
    if (!orbitRef.current) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = orbitRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center, normalized to -1 to 1
      const moveX = (clientX - centerX) / (window.innerWidth / 2) * 20;
      const moveY = (clientY - centerY) / (window.innerHeight / 2) * 20;
      
      // Apply transform to the orbit container
      orbitRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-black opacity-80"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-gradient-to-r from-purple-700 to-purple-900 mix-blend-screen opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-pink-600 to-purple-700 mix-blend-screen opacity-40 animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 w-[15vw] h-[15vw] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mix-blend-screen opacity-40 animate-float-fast"></div>
        
        {/* Light streaks */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-purple-300/20 to-transparent transform -rotate-12 animate-pulse-slow"></div>
          <div className="absolute top-[30%] left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-pink-300/20 to-transparent transform rotate-12 animate-pulse-medium"></div>
          <div className="absolute top-[70%] left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-blue-300/20 to-transparent transform -rotate-8 animate-pulse-fast"></div>
        </div>
      </div>
      
      {/* Starry background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 5 + 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="z-10 max-w-lg w-full flex py-4 flex-col items-center text-white px-4">
        {/* Logo/title with reveal animation */}
        <div className="mb-8 text-center transform translate-y-0 opacity-100 transition-all duration-1000 animate-reveal">
          <div className="inline-block p-4 bg-black/30 rounded-full backdrop-blur-md mb-4 animate-pulse-glow">
            <Library className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 animate-text-shimmer">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-pink-200">
              Coming Soon
            </span>
          </h1>
          <p className="text-pink-200 text-sm md:text-base mt-2 animate-fade-in">Your Literary Sanctuary</p>
        </div>
        
        {/* Coming soon message with staggered reveal */}
        <div className="text-center mb-12 max-w-md">
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 mx-auto mb-8 rounded-full animate-expand"></div>
          <h2 className="text-2xl md:text-3xl font-light mb-4 animate-slide-up">Book Haven</h2>
          <p className="text-gray-200 mx-auto leading-relaxed animate-fade-in-delay">
            We're crafting a beautiful new experience for book lovers. 
            Our virtual doors will open soon, bringing you a curated collection 
            of literary treasures.
          </p>
        </div>
        
        {/* Orbiting elements */}
        <div ref={orbitRef} className="relative w-48 h-48 mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full animate-rotate-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full blur-sm"></div>
            </div>
            <div className="absolute w-3/4 h-3/4 animate-rotate-medium">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full blur-sm"></div>
            </div>
            <div className="absolute w-1/2 h-1/2 animate-rotate-fast">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Social media with hover effects */}
        <div className="flex justify-center gap-6 mb-12 animate-fade-in-delay-longer">
          <NavLink to="https://www.instagram.com/bookefy_06?igsh=OXZmYnluYTN3dWxi" target='_blank' className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-glow">
            <Instagram className="w-5 h-5" />
          </NavLink>
          <NavLink to="https://www.instagram.com/bookefy_06?igsh=OXZmYnluYTN3dWxi" target='_blank' className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-glow">
            <X className="w-5 h-5" />
          </NavLink>
          <NavLink to="https://www.instagram.com/bookefy_06?igsh=OXZmYnluYTN3dWxi" target='_blank' className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-glow">
            <Facebook className="w-5 h-5" />
          </NavLink>
          <NavLink to="mailto:bookefy2k25@gmail.com"  target='_blank' className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-glow">
            <Mail className="w-5 h-5" />
          </NavLink>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -40px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes rotate-medium {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes rotate-fast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes reveal {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          0% { width: 0; opacity: 0; }
          100% { width: 24px; opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(139, 92, 246, 0); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-delay {
          0%, 30% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-delay-longer {
          0%, 50% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-delay-longest {
          0%, 70% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 9s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        
        .animate-pulse-medium {
          animation: pulse-medium 7s ease-in-out infinite;
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 5s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 5s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
        }
        
        .animate-rotate-medium {
          animation: rotate-medium 20s linear infinite;
        }
        
        .animate-rotate-fast {
          animation: rotate-fast 10s linear infinite;
        }
        
        .animate-reveal {
          animation: reveal 1s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animate-expand {
          animation: expand 1.5s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 8s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          animation-delay: 0.7s;
          opacity: 0;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-longer {
          animation: fade-in-delay-longer 2s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-longest {
          animation: fade-in-delay-longest 2.5s ease-out forwards;
          opacity: 0;
        }
        
        .hover\:shadow-glow:hover {
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;