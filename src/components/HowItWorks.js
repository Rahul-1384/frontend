import React from "react";
import sell from '../images/sell-section.png'
import buy from '../images/buy-section.png'


const HowItWorks = () => {
  return (
    <div className="bg-[#cfcfcd] p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        How To <span className="text-red-500">Buy & Sell Books</span> On BookFlow?
      </h1>
      <img src={sell} className="m-auto"/>
      <img src={buy} className="m-auto"/>
    </div>
  );
};

export default HowItWorks;
