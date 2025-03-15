import React, { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, Zap, Leaf, ShieldCheck, DollarSign } from 'lucide-react';
import img from '../images/whychooseus.jpg';

const WhyChooseUs = () => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    {
      icon: <BookOpen size={24} />,
      title: "No Shipping Fees",
      description: "Skip packaging hassles and delivery wait times",
      delay: "delay-100"
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Payment",
      description: "Sellers get paid immediately after successful pickup",
      delay: "delay-200"
    },
    {
      icon: <Leaf size={24} />,
      title: "Eco-Friendly",
      description: "Give books a second life and reduce waste",
      delay: "delay-300"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Secure Platform",
      description: "User-friendly interface with built-in safety features",
      delay: "delay-400"
    },
    {
      icon: <DollarSign size={24} />,
      title: "Better Value",
      description: "Lower prices for buyers, higher returns for sellers",
      delay: "delay-500"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#003244] to-[#001E28] p-8 shadow-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header with emerald accent */}
        <h1 
          className={`text-3xl lg:text-5xl font-bold text-center text-emerald-100 mb-12 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
        >
          Why Choose Us?
        </h1>

        {/* Main content container */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Bookshelf image in a decorative frame */}
          <div 
            className={`w-full lg:w-1/2 transition-all duration-1000 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="relative">
              {/* Decorative elements with emerald color */}
              <div className="absolute -top-3 -left-3 h-16 w-16 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
              <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>
              
              {/* Main image with emerald overlay */}
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <div className="relative">
                  <img 
                    src={img}
                    alt="Elegant bookshelf" 
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Benefits cards */}
          <div className="w-full lg:w-1/2">
            <h2 
              className={`text-3xl font-bold text-center text-emerald-300 mb-8 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              What sets Bookefy Apart from Others?
            </h2>
            
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`bg-[#002A36] border border-emerald-800/40 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:border-emerald-500/60 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} ${benefit.delay}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-900/50 rounded-full text-emerald-300">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-emerald-200">{benefit.title}</h3>
                      <p className="text-emerald-50/80">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA section with emerald button */}
            <div 
              className={`mt-8 transition-all duration-700 delay-600 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <button className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl group">
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 h-full w-full transform scale-x-0 origin-left transition-transform duration-500 bg-gradient-to-r from-green-600 to-emerald-500 group-hover:scale-x-100"></div>
              </button>
              <p className="mt-3 text-emerald-200/70 text-sm">Join 50,000+ book lovers today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;