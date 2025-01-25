import React, { useState } from "react";
import "./cartButton.css"; // Import the CSS for styling
import PropTypes from "prop-types";


const CartButton = ({book , addToCart}) => {

    const handleClick = (e) => {
        e.stopPropagation(); // Prevents click from propagating to parent elements
    
          addToCart(book); // Calls the provided addToCart function with the book          
          // Revert back to default after animation completes (e.g., 2 seconds)
      };
  return (
    <button className="button" onClick={handleClick}>
      <div className="wrap">
        <div className="state state--default">
          <div className="icon-cart">
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            >
            <circle r="1" cy="21" cx="8"></circle>
            <circle r="1" cy="21" cx="19"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          </div>
          <div className="icon">
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          </div>
          <p>
            <span style={{ "--i": 0 }}>A</span>
            <span style={{ "--i": 1 }}>d</span>
            <span style={{ "--i": 2 }}>d</span>
            <span style={{ "--i": 3 }}>t</span>
            <span style={{ "--i": 4 }}>o</span>
            <span style={{ "--i": 5 }}>c</span>
            <span style={{ "--i": 6 }}>a</span>
            <span style={{ "--i": 7 }}>r</span>
            <span style={{ "--i": 8 }}>t</span>
          </p>
        </div>
        <div className="state state--added">
          <div className="icon">
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <p>
            <span style={{ "--i": 5 }}>A</span>
            <span style={{ "--i": 6 }}>d</span>
            <span style={{ "--i": 7 }}>d</span>
            <span style={{ "--i": 8 }}>e</span>
            <span style={{ "--i": 9 }}>d</span>
          </p>
        </div>
      </div>
      <div className="bg"></div>
      <div className="bg-spin"></div>
      <div className="bg-gradient"></div>
    </button>
  );
};

CartButton.propTypes = {
    book: PropTypes.object.isRequired, // The book object containing details (e.g., title)
    addToCart: PropTypes.func.isRequired, // The function to handle adding the book to the cart
};

export default CartButton;
