import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Trash2, MinusCircle, PlusCircle, ShoppingCart, LogIn, UserPlus, Heart, Share2, ArrowLeft, Check, X, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [showSaveForLater, setShowSaveForLater] = useState(false);
  const [saveForLaterItems, setSaveForLaterItems] = useState([]);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Add this for return URL functionality


  // Calculate cart totals based on selected items
  const selectedItemsArray = cartItems.filter(item => selectedItems[item.book_details.book_id]);
  const subtotal = selectedItemsArray.reduce((sum, item) => sum + item.total_price, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const discount = couponApplied ? Math.min(subtotal * 0.1, 200) : 0; // 10% discount up to ₹200
  const total = subtotal + shipping - discount;
  
  // Calculate total items in cart
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  // Initialize selected items when cart items are fetched
  useEffect(() => {
    const initialSelectedState = {};
    cartItems.forEach(item => {
      initialSelectedState[item.book_details.book_id] = true;
    });
    setSelectedItems(initialSelectedState);
  }, [cartItems]);

  const checkAuthentication = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const parsedToken = JSON.parse(authToken);
        if (parsedToken && parsedToken.access) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setLoading(false);
          // Redirect to login with return URL
          navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setLoading(false);
        // Redirect to login with return URL
        navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
      }
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const token = isAuthenticated ? JSON.parse(localStorage.getItem('authToken'))?.access : null;

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/cart/cart-detail/', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      setCartItems(response.data);
      setLoading(false);
    } catch (err) {
      // Check for authentication errors (401)
      if (err.response && err.response.status === 401) {
        setIsAuthenticated(false);
        // Redirect to login with return URL
        navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
        return;
      }
      setError('Failed to fetch cart items');
      setLoading(false);
      console.error(err);
    }
  };

  const handleLogin = () => {
    navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
  };

  const updateQuantity = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.patch('http://127.0.0.1:8000/api/cart/cart-detail/', 
        { book_id: bookId, quantity: newQuantity },
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        }
      );
      setCartItems(cartItems.map(item => 
        item.book_details.book_id === bookId 
          ? {...item, quantity: newQuantity, total_price: newQuantity * item.price_at_addition} 
          : item
      ));
    } catch (err) {
      setError('Failed to update quantity');
      console.error(err);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      await axios.delete('http://127.0.0.1:8000/api/cart/cart-detail/', {
        data: { book_id: bookId },
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      setCartItems(cartItems.filter(item => item.book_details.book_id !== bookId));
      
      // Also remove from selected items
      const updatedSelectedItems = {...selectedItems};
      delete updatedSelectedItems[bookId];
      setSelectedItems(updatedSelectedItems);
    } catch (err) {
      setError('Failed to remove item');
      console.error(err);
    }
  };

  const toggleItemSelection = (bookId) => {
    setSelectedItems({
      ...selectedItems,
      [bookId]: !selectedItems[bookId]
    });
  };

  const moveToSaveForLater = (item) => {
    setSaveForLaterItems([...saveForLaterItems, item]);
    removeFromCart(item.book_details.book_id);
  };

  const moveToCart = (item) => {
    // In a real implementation, this would make an API call to add back to cart
    const newItem = {...item};
    const updatedSaveForLater = saveForLaterItems.filter(
      savedItem => savedItem.book_details.book_id !== item.book_details.book_id
    );
    setSaveForLaterItems(updatedSaveForLater);
    setCartItems([...cartItems, newItem]);
  };

  const applyCoupon = () => {
    // Simple coupon validation - in real app would validate with backend
    if (couponCode.toUpperCase() === 'SAVE10' || couponCode.toUpperCase() === 'WELCOME') {
      setCouponApplied(true);
      setCouponDiscount(Math.min(subtotal * 0.1, 200));
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
    }
  };

  const handleCheckout = () => {
    // Only checkout with selected items
    if (selectedItemsArray.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    
    // In a real implementation, you would pass the selected items to checkout
    // For now, we'll just redirect
    navigate('/checkout', { 
      state: { 
        items: selectedItemsArray,
        summary: {
          subtotal,
          shipping,
          discount,
          total
        }
      } 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        {error}
      </div>
    );
  }

  // Login UI for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <ShoppingCart size={36} />
            </div>
            <h1 className="text-2xl font-bold text-center">Access Your Cart</h1>
            <p className="text-center text-blue-100 mt-2">Please log in to view your shopping cart</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <NavLink
                to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogIn size={18} className="mr-2" />
                Log in
              </NavLink>

              <NavLink
                to="/signup"
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <UserPlus size={18} className="mr-2" />
                Register Now
              </NavLink>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <NavLink to="/products" className="text-blue-600 hover:text-blue-800">
                  Browse Books
                </NavLink>
                {' • '}
                <NavLink to="/help" className="text-blue-600 hover:text-blue-800">
                  Need Help?
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <span>Your Shopping Cart</span>
          <span className="ml-3 bg-blue-100 text-blue-800 text-sm py-1 px-2 rounded-full">{totalCartItems} items</span>
        </h1>
        <NavLink 
          to="/products" 
          className="text-blue-600 no-underline hover:text-blue-800 flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Continue Shopping</span>
        </NavLink>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex flex-col items-center">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <NavLink
              to="/products"
              className="bg-blue-600 no-underline text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Start Shopping
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="lg:flex lg:gap-6">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="hidden md:grid md:grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
                <div className="col-span-1 flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-blue-600 rounded"
                    checked={cartItems.length > 0 && Object.keys(selectedItems).length === cartItems.length && Object.values(selectedItems).every(val => val)}
                    onChange={() => {
                      const allSelected = cartItems.length > 0 && Object.keys(selectedItems).length === cartItems.length && Object.values(selectedItems).every(val => val);
                      const newSelectedState = {};
                      cartItems.forEach(item => {
                        newSelectedState[item.book_details.book_id] = !allSelected;
                      });
                      setSelectedItems(newSelectedState);
                    }}
                  />
                </div>
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="border-t first:border-t-0 p-4 md:p-6 hover:bg-gray-50 transition duration-150">
                  <div className="md:grid md:grid-cols-12 md:gap-4 items-center">
                    {/* Selection Checkbox */}
                    <div className="mb-3 md:mb-0 md:col-span-1 flex justify-start md:justify-center">
                      <input 
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded"
                        checked={selectedItems[item.book_details.book_id] || false}
                        onChange={() => toggleItemSelection(item.book_details.book_id)}
                      />
                    </div>
                    
                    {/* Product */}
                    <div className="md:col-span-5 flex gap-4 mb-4 md:mb-0">
                      <div className="w-24 h-32 bg-gray-200 flex-shrink-0 rounded-md overflow-hidden shadow-md">
                        {item.book_details.image ? (
                          <img 
                            src={item.book_details.image} 
                            alt={item.book_details.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{item.book_details.book_title}</h3>
                          <p className="text-gray-600 text-sm">By: {item.book_details.book_author}</p>
                          {item.book_details.genre && (
                            <p className="text-gray-500 text-xs mt-1">Genre: {item.book_details.genre}</p>
                          )}
                          {item.book_details.published_year && (
                            <p className="text-gray-500 text-xs">Published: {item.book_details.published_year}</p>
                          )}
                          {item.book_details.format && (
                            <span className="inline-block mt-2 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                              {item.book_details.format}
                            </span>
                          )}
                        </div>
                        <div className="flex mt-2 space-x-4 md:hidden">
                          <button 
                            onClick={() => removeFromCart(item.book_details.book_id)}
                            className="text-red-500 text-sm flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                          <button 
                            onClick={() => moveToSaveForLater(item)}
                            className="text-blue-500 text-sm flex items-center gap-1"
                          >
                            <Heart size={14} />
                            <span>Save for Later</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 flex justify-between md:justify-center mb-2 md:mb-0">
                      <span className="font-medium md:hidden">Price:</span>
                      <div>
                        <span className="text-gray-800 font-medium">₹{item.price_at_addition}</span>
                        {item.book_details.price > item.price_at_addition && (
                          <div>
                            <span className="text-gray-500 line-through text-sm">
                              ₹{item.book_details.price}
                            </span>
                            <span className="text-green-600 text-xs ml-1">
                              ({Math.round((1 - item.price_at_addition/item.book_details.price) * 100)}% off)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-between md:justify-center mb-2 md:mb-0">
                      <span className="font-medium md:hidden">Quantity:</span>
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.book_details.book_id, item.quantity - 1)}
                          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle size={18} />
                        </button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.book_details.book_id, item.quantity + 1)}
                          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-r-md"
                        >
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total & Actions */}
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="font-medium md:hidden">Total:</span>
                      <span className="font-bold text-gray-800">₹{item.total_price}</span>
                      <div className="hidden md:flex md:ml-4 md:space-x-2">
                        <button 
                          onClick={() => removeFromCart(item.book_details.book_id)}
                          className="text-red-500 p-1 hover:bg-red-50 rounded"
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button 
                          onClick={() => moveToSaveForLater(item)}
                          className="text-blue-500 p-1 hover:bg-blue-50 rounded"
                          title="Save for later"
                        >
                          <Heart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Save for Later Section */}
            {saveForLaterItems.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Saved for Later ({saveForLaterItems.length})</h2>
                  <button 
                    onClick={() => setShowSaveForLater(!showSaveForLater)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {showSaveForLater ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showSaveForLater && saveForLaterItems.map((item) => (
                  <div key={`saved-${item.id}`} className="border-t first:border-t-0 p-4 md:p-6 hover:bg-gray-50 transition duration-150">
                    <div className="flex gap-4">
                      <div className="w-16 h-24 bg-gray-200 flex-shrink-0 rounded-md overflow-hidden shadow-md">
                        {item.book_details.image ? (
                          <img 
                            src={item.book_details.image} 
                            alt={item.book_details.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="font-medium">{item.book_details.book_title}</h3>
                          <p className="text-gray-600 text-sm">By: {item.book_details.book_author}</p>
                          <div className="mt-1">
                            <span className="text-gray-800 font-medium">₹{item.price_at_addition}</span>
                          </div>
                        </div>
                        <div className="flex mt-2 space-x-4">
                          <button 
                            onClick={() => moveToCart(item)}
                            className="text-blue-600 text-sm font-medium hover:text-blue-800"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Selected Items ({selectedItemsArray.length})</span>
                  <span>{selectedItemsArray.reduce((sum, item) => sum + item.quantity, 0)} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                
                {/* Coupon Section */}
                <div className="pt-3 pb-3 border-t border-dashed">
                  <div className="flex mb-2">
                    <input
                      type="text"
                      className="flex-grow border rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="bg-blue-600 text-white px-3 py-2 rounded-r-md text-sm hover:bg-blue-700"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex items-center justify-between text-green-600 text-sm bg-green-50 p-2 rounded">
                      <div className="flex items-center">
                        <Check size={16} className="mr-1" />
                        <span>Coupon applied successfully!</span>
                      </div>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  
                  {couponCode && !couponApplied && (
                    <div className="flex items-center text-red-600 text-sm">
                      <X size={16} className="mr-1" />
                      <span>Invalid coupon code</span>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <Info size={12} className="mr-1" />
                    <span>Try "SAVE10" or "WELCOME" for 10% off</span>
                  </div>
                </div>
                
                <div className="border-t pt-3 font-bold flex justify-between text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center font-medium"
                  disabled={selectedItemsArray.length === 0}
                  onClick={handleCheckout}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Checkout ({selectedItemsArray.length} items)
                </button>
                
                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <div className="flex items-center mr-4">
                    <Check size={16} className="text-green-500 mr-1" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-1" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
              
              {/* Recommended Add-ons */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3">You might also like</h3>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={`rec-${i}`} className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <div className="w-12 h-16 bg-gray-200 flex-shrink-0 rounded overflow-hidden mr-3">
                        <div className="w-full h-full bg-gray-300"></div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium">Recommended Book {i}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-bold">₹399</span>
                          <button className="text-blue-600 text-xs hover:text-blue-800">Add</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;