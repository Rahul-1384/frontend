// CartContext.js
import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload]; // Add book to cart
    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload); // Remove book from cart
    case "CLEAR_CART":
      return []; // Clear all items in cart
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

