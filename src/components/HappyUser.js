import React, { useState, useEffect, useRef } from "react";
import { UserGroupIcon, ThumbUpIcon, GlobeAltIcon } from "@heroicons/react/solid";
import './happyUser.css';

const HappyUser = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [satisfiedCustomers, setSatisfiedCustomers] = useState(0);
  const [globalReach, setGlobalReach] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Setup IntersectionObserver to start animation when the section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartAnimation(true); // Start animation when section enters the viewport
        } else {
          setStartAnimation(false); // Optionally, reset if the section goes out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (startAnimation) {
      const incrementCounters = (targetValue, setValue) => {
        let count = 0;
        const increment = Math.ceil(targetValue / 100); // Control animation speed by increment step
        const interval = setInterval(() => {
          count += increment;
          if (count >= targetValue) {
            setValue(targetValue);
            clearInterval(interval);
          } else {
            setValue(count);
          }
        }, 200); // Control speed of animation (20ms per step)
      };

      incrementCounters(12, setActiveUsers);
      incrementCounters(10, setSatisfiedCustomers);
      incrementCounters(20, setGlobalReach);
    }
  }, [startAnimation]);




  useEffect(() => {
      const slides = document.querySelectorAll('.left');
      if (slides.length === 0) return;
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('showLeft');
          } else {
            entry.target.classList.remove('showLeft');
          }
        });
      });
  
      slides.forEach((el) => observer.observe(el));
  
      return () => {
        slides.forEach((el) => observer.unobserve(el));
      };
    }, []);


    // middle
    useEffect(() => {
        const slides = document.querySelectorAll('.middle');
        if (slides.length === 0) return;
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('showMiddle');
            } else {
              entry.target.classList.remove('showMiddle');
            }
          });
        });
    
        slides.forEach((el) => observer.observe(el));
    
        return () => {
          slides.forEach((el) => observer.unobserve(el));
        };
      }, []);



    // Right
    useEffect(() => {
        const slides = document.querySelectorAll('.right');
        if (slides.length === 0) return;
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('showRight');
            } else {
              entry.target.classList.remove('showRight');
            }
          });
        });
    
        slides.forEach((el) => observer.observe(el));
    
        return () => {
          slides.forEach((el) => observer.unobserve(el));
        };
      }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden flex flex-col justify-center items-center gap-20 select-none text-center py-20 rounded-lg  mx-auto transition-transform duration-300">
      <div className="text-2xl font-bold text-center text-gray-800 mb-10 tracking-wide md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl">
        Happy Users
      </div>
      <div className="flex flex-wrap flex-col justify-center gap-3 sm:flex-row sm:w-[70%] sm:justify-between">

        <div className="left text-center group transform hover:scale-105 transition-transform duration-300">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <UserGroupIcon className="w-16 h-16 text-blue-500 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-blue-500 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Teamwork!
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-500">
            {activeUsers.toLocaleString()}+
          </p>
          <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
            Active Users
          </p>
        </div>

        <div className="middle text-center group transform hover:scale-105 transition-transform duration-300">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <ThumbUpIcon className="w-16 h-16 text-green-500 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-green-500 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Satisfaction!
            </div>
          </div>
          <p className="text-3xl font-bold text-green-500">
            {satisfiedCustomers.toLocaleString()}+
          </p>
          <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
            Satisfied Customers
          </p>
        </div>

        <div className="right text-center group transform hover:scale-105 transition-transform duration-300">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <GlobeAltIcon className="w-16 h-16 text-purple-500 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-purple-500 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Worldwide!
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-500">
            {globalReach.toLocaleString()}+
          </p>
          <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
            Total Visited
          </p>
        </div>
      </div>
    </div>
  );
};

export default HappyUser;
