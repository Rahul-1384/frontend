import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    default:
      return state;
  }
};

// ✅ Reusable function for fetching with access token only
const fetchWithAuth = async (url, options = {}) => {
  const tokens = JSON.parse(localStorage.getItem('authToken'));
  const accessToken = tokens?.access;

  if (!accessToken) {
    throw new Error('Access token not found. Please log in.');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    console.error('Access token is invalid or expired.');
  }

  return response;
};

// 🚀 CartProvider with access token-based authentication
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // ✅ Fetch cart items with authentication
  const fetchCartItems = async () => {
    try {
      const response = await fetchWithAuth(
        'http://127.0.0.1:8000/api/cart/cart-detail/'
      );
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      dispatch({ type: 'SET_CART', payload: data });
    } catch (error) {
      // console.error('Error fetching cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, dispatch, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// 🔥 Custom hook for consuming cart context
export const useCart = () => useContext(CartContext);
