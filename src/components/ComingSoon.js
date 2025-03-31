import React, { useEffect, useRef } from 'react';
import { Library, Instagram, X, Facebook, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './comingSoon.css';  // Importing external CSS

const ComingSoon = () => {
  const orbitRef = useRef(null);
  
  useEffect(() => {
    if (!orbitRef.current) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = orbitRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (clientX - centerX) / (window.innerWidth / 2) * 20;
      const moveY = (clientY - centerY) / (window.innerHeight / 2) * 20;
      
      orbitRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="coming-soon-container">
      <div className="gradient-bg"></div>
      <div className="starry-background">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="star" style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 5 + 5}s`
          }} />
        ))}
      </div>
      
      <div className="content">
        <div className="logo-title">
          <div className="logo-container">
            <Library className="logo-icon" />
          </div>
          <h1 className="title">Coming Soon</h1>
          <p className="subtitle">Your Literary Sanctuary</p>
        </div>

        <div className="message-container">
          <div className="divider"></div>
          <h2 className="heading">Book Haven</h2>
          <p className="description">
            We're crafting a beautiful new experience for book lovers. Our virtual doors will open soon, bringing you a curated collection of literary treasures.
          </p>
        </div>

        <div ref={orbitRef} className="orbit-container">
          <div className="orbit-layer slow"><div className="orbit-dot purple"></div></div>
          <div className="orbit-layer medium"><div className="orbit-dot pink"></div></div>
          <div className="orbit-layer fast"><div className="orbit-dot blue"></div></div>
        </div>

        <div className="social-links">
          <NavLink to="https://www.instagram.com/bookefy_06?igsh=OXZmYnluYTN3dWxi" target='_blank' className="social-icon">
            <Instagram />
          </NavLink>
          <NavLink to="https://www.instagram.com/bookefy_06?igsh=OXZmYnluYTN3dWxi" target='_blank' className="social-icon">
            <X />
          </NavLink>
          <NavLink to="https://www.instagram.com/bookefy_06?igsh=OXZmYnluYTN3dWxi" target='_blank' className="social-icon">
            <Facebook />
          </NavLink>
          <NavLink to="mailto:bookefy2k25@gmail.com" target='_blank' className="social-icon">
            <Mail />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
