import React, { useEffect } from "react";
import './howitworks.css';
import sell from '../images/sell-section.png';
import buy from '../images/buy-section.png';


const HowItWorks = () => {
  useEffect(() => {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    slides.forEach((el) => observer.observe(el));

    return () => {
      slides.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-[#001E28] p-6 py-20">
      <h1 className="text-xl font-bold text-center text-white tracking-wide sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-4xl mb-12">
        How To <span className="text-red-500">Buy & Sell Books</span> On Rebook?
      </h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <img src={buy} className="slide  rounded-md w-[80%] mix-blend-plus-darker" alt="Buy Section" />
        <img src={sell} className="slide  rounded-md w-[80%] mix-blend-plus-darker" alt="Sell Section" />
        
      </div>
    </div>
  );
};

export default HowItWorks;
