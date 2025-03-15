import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Trash2, 
  AlertCircle, 
  ShoppingBag, 
  ArrowLeft, 
  Minus,
  Plus, 
  RefreshCw,
  ShieldCheck,
  Truck,
  Heart,
  CreditCard,
  Timer
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Card } from '../components/ui/Card';

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [savedForLater, setSavedForLater] = useState([]);
  const navigate = useNavigate();

  // Initial data fetch
  useEffect(() => {
    fetchCartData();
    fetchSavedForLater();
  }, []);

  // Initialize quantities whenever cart changes
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/cart/cart-detail/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      dispatch({ type: 'SET_CART', payload: data });
    } catch (error) {
      setError(error.message);
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedForLater = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch('http://127.0.0.1:8000/api/cart/saved-for-later/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch saved items');
      }

      const data = await response.json();
      setSavedForLater(data);
    } catch (error) {
      console.error('Error fetching saved items:', error);
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    const newQuantity = Math.max(1, (quantities[itemId] || 1) + change);
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://127.0.0.1:8000/api/cart/cart-detail/${itemId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      if (!response.ok) throw new Error('Failed to update quantity');
      
      const updatedItem = await response.json();
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id: itemId, quantity: newQuantity } 
      });
      
      // Toast notification replacement
      console.log("Quantity updated");
    } catch (error) {
      // Revert the quantity if the API call fails
      setQuantities(prev => ({
        ...prev,
        [itemId]: prev[itemId]
      }));
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://127.0.0.1:8000/api/cart/cart-detail/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to remove item');
      
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      
      // Remove from quantities state
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[itemId];
        return newQuantities;
      });
      
      // Toast notification replacement
      console.log("Item removed from cart");
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleSaveForLater = async (itemId) => {
    try {
      const token = localStorage.getItem('authToken');
      const item = cart.find(item => item.id === itemId);
      
      // First, remove from cart
      await fetch(`http://127.0.0.1:8000/api/cart/cart-detail/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      // Then, add to saved for later
      const saveResponse = await fetch('http://127.0.0.1:8000/api/cart/saved-for-later/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: item.product_id }),
      });
      
      if (!saveResponse.ok) throw new Error('Failed to save item for later');
      
      // Update states
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      fetchSavedForLater();
      
      // Toast notification replacement
      console.log("Item saved for later");
    } catch (error) {
      console.error('Error saving item for later:', error);
    }
  };

  const handleMoveToCart = async (itemId) => {
    try {
      const token = localStorage.getItem('authToken');
      const item = savedForLater.find(item => item.id === itemId);
      
      // First, remove from saved for later
      await fetch(`http://127.0.0.1:8000/api/cart/saved-for-later/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      // Then, add to cart
      const addResponse = await fetch('http://127.0.0.1:8000/api/cart/cart-detail/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          product_id: item.product_id,
          quantity: 1
        }),
      });
      
      if (!addResponse.ok) throw new Error('Failed to add item to cart');
      
      // Update states
      setSavedForLater(prev => prev.filter(item => item.id !== itemId));
      fetchCartData();
      
      // Toast notification replacement
      console.log("Item moved to cart");
    } catch (error) {
      console.error('Error moving item to cart:', error);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      console.log("Please enter a coupon code");
      return;
    }
    
    try {
      setIsCouponLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/cart/apply-coupon/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ code: couponCode }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to apply coupon');
      }
      
      setAppliedCoupon(data);
      setCouponCode('');
      
      // Toast notification replacement
      console.log(`Coupon applied with discount of ₹${data.discount_amount}`);
      
      // Refresh cart to reflect new prices
      fetchCartData();
    } catch (error) {
      console.error('Error applying coupon:', error);
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch('http://127.0.0.1:8000/api/cart/remove-coupon/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      setAppliedCoupon(null);
      
      // Toast notification replacement
      console.log("Coupon removed");
      
      // Refresh cart
      fetchCartData();
    } catch (error) {
      console.error('Error removing coupon:', error);
    }
  };

  // Calculation functions
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      const price = (item.price || 0) - (item.discount || 0);
      return total + (price * quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return appliedCoupon ? appliedCoupon.discount_amount : 0;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 499 ? 0 : 40;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const discount = calculateDiscount();
    return subtotal + shipping - discount;
  };

  // Rendering conditions
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const isLoggedIn = localStorage.getItem('authToken');
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Your cart is waiting</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please log in to view your cart items and complete your purchase
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log in to continue
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start adding some amazing books to your cart!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart {cart.length > 0 && `(${cart.length} items)`}</h1>
          <div className="flex items-center mt-4 md:mt-0 gap-4">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 border border-gray-200 px-4 py-2 rounded"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </button>
            {cart.length > 0 && (
              <button
                onClick={() => navigate('/checkout')}
                className="inline-flex items-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Checkout
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items & Saved for Later */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart items section */}
            {cart.length > 0 && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Cart Items</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img
                          src={item.image || "/api/placeholder/120/180"}
                          alt={item.title}
                          className="w-24 h-36 object-cover rounded-md"
                        />
                        <div className="flex-grow min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-gray-500">by {item.author}</p>
                          {item.in_stock ? (
                            <p className="text-sm text-green-600 mt-1">In Stock</p>
                          ) : (
                            <p className="text-sm text-red-600 mt-1">Out of Stock</p>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-lg font-medium text-gray-900">
                              ₹{((item.price - (item.discount || 0)) * (quantities[item.id] || 1)).toFixed(2)}
                            </span>
                            {item.discount > 0 && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{(item.price * (quantities[item.id] || 1)).toFixed(2)}
                              </span>
                            )}
                            {item.discount > 0 && (
                              <span className="text-sm text-green-600">
                                Save {Math.round((item.discount / item.price) * 100)}%
                              </span>
                            )}
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                                disabled={quantities[item.id] <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2">{quantities[item.id] || 1}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleSaveForLater(item.id)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Heart className="w-4 h-4" />
                                Save for later
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Saved for later section */}
            {savedForLater.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Saved for Later ({savedForLater.length})</h2>
                <div className="space-y-4">
                  {savedForLater.map((item) => (
                    <Card key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img
                          src={item.image || "/api/placeholder/120/180"}
                          alt={item.title}
                          className="w-24 h-36 object-cover rounded-md"
                        />
                        <div className="flex-grow min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-gray-500">by {item.author}</p>
                          {item.in_stock ? (
                            <p className="text-sm text-green-600 mt-1">In Stock</p>
                          ) : (
                            <p className="text-sm text-red-600 mt-1">Out of Stock</p>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-lg font-medium text-gray-900">
                              ₹{(item.price - (item.discount || 0)).toFixed(2)}
                            </span>
                            {item.discount > 0 && (
                              <span className="text-sm text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-4">
                            <button
                              onClick={() => handleMoveToCart(item.id)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-50 px-3 py-1 border rounded-md text-sm"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => {
                                // Remove from saved for later
                                const token = localStorage.getItem('authToken');
                                fetch(`http://127.0.0.1:8000/api/cart/saved-for-later/${item.id}/`, {
                                  method: 'DELETE',
                                  headers: {
                                    'Authorization': `Bearer ${token}`,
                                  },
                                }).then(() => {
                                  setSavedForLater(prev => prev.filter(i => i.id !== item.id));
                                  console.log("Item removed from saved items");
                                });
                              }}
                              className="text-red-600 hover:text-red-800 flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        Coupon: {appliedCoupon.code}
                        <button 
                          onClick={handleRemoveCoupon}
                          className="text-red-500 ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                      <span>-₹{calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping().toFixed(2)}`}
                    </span>
                  </div>
                  
                  {calculateSubtotal() < 499 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Add ₹{(499 - calculateSubtotal()).toFixed(2)} more to get free shipping!
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {!appliedCoupon && (
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={isCouponLoading || !couponCode.trim()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
                        >
                          {isCouponLoading ? 
                            <RefreshCw className="w-4 h-4 animate-spin" /> : 
                            'Apply'
                          }
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-medium text-gray-900">
                        ₹{calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>Free shipping on orders above ₹499</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      <span>Quick delivery within 2-5 business days</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;








































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Trash2, 
//   AlertCircle, 
//   ShoppingBag, 
//   ArrowLeft, 
//   Minus, 
//   Plus, 
//   RefreshCw,
//   ShieldCheck,
//   Truck,
//   Heart,
//   CreditCard,
//   Timer
// } from 'lucide-react';
// import { Alert, AlertDescription } from '../components/ui/Alert';
// import { Card } from '../components/ui/Card';

// // Hardcoded cart data
// const hardcodedCartItems = [
//   {
//     id: 1,
//     product_id: 101,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     image: "/api/placeholder/120/180",
//     price: 299.00,
//     discount: 50.00,
//     quantity: 1,
//     in_stock: true
//   },
//   {
//     id: 2,
//     product_id: 102,
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     image: "/api/placeholder/120/180",
//     price: 350.00,
//     discount: 70.00,
//     quantity: 2,
//     in_stock: true
//   },
//   {
//     id: 3,
//     product_id: 103,
//     title: "1984",
//     author: "George Orwell",
//     image: "/api/placeholder/120/180",
//     price: 280.00,
//     discount: 30.00,
//     quantity: 1,
//     in_stock: true
//   }
// ];

// // Hardcoded saved for later items
// const hardcodedSavedItems = [
//   {
//     id: 4,
//     product_id: 104,
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     image: "/api/placeholder/120/180",
//     price: 260.00,
//     discount: 40.00,
//     in_stock: true
//   },
//   {
//     id: 5,
//     product_id: 105,
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     image: "/api/placeholder/120/180",
//     price: 320.00,
//     discount: 0,
//     in_stock: false
//   }
// ];

// // Valid coupon codes
// const validCoupons = {
//   "BOOKS10": { code: "BOOKS10", discount_amount: 50 },
//   "SUMMER25": { code: "SUMMER25", discount_amount: 100 }
// };

// const CartPage = () => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantities, setQuantities] = useState({});
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [isCouponLoading, setIsCouponLoading] = useState(false);
//   const [savedForLater, setSavedForLater] = useState([]);
//   const navigate = useNavigate();

//   // Simulate initial data fetch
//   useEffect(() => {
//     // Simulate loading delay
//     const timer = setTimeout(() => {
//       setCart(hardcodedCartItems);
//       setSavedForLater(hardcodedSavedItems);
      
//       // Initialize quantities
//       const initialQuantities = {};
//       hardcodedCartItems.forEach(item => {
//         initialQuantities[item.id] = item.quantity || 1;
//       });
//       setQuantities(initialQuantities);
      
//       setLoading(false);
//     }, 800); // Simulate a short loading time
    
//     return () => clearTimeout(timer);
//   }, []);

//   const handleQuantityChange = (itemId, change) => {
//     const newQuantity = Math.max(1, (quantities[itemId] || 1) + change);
//     setQuantities(prev => ({
//       ...prev,
//       [itemId]: newQuantity
//     }));

//     // Update cart item quantity
//     setCart(prev => prev.map(item => 
//       item.id === itemId ? { ...item, quantity: newQuantity } : item
//     ));

//     console.log(`Quantity updated to ${newQuantity}`);
//   };

//   const handleRemoveItem = (itemId) => {
//     setCart(prev => prev.filter(item => item.id !== itemId));
    
//     // Remove from quantities state
//     setQuantities(prev => {
//       const newQuantities = { ...prev };
//       delete newQuantities[itemId];
//       return newQuantities;
//     });
    
//     console.log("Item removed from cart");
//   };

//   const handleSaveForLater = (itemId) => {
//     const itemToSave = cart.find(item => item.id === itemId);
    
//     // Remove from cart
//     setCart(prev => prev.filter(item => item.id !== itemId));
    
//     // Add to saved for later
//     setSavedForLater(prev => [...prev, itemToSave]);
    
//     // Remove from quantities
//     setQuantities(prev => {
//       const newQuantities = { ...prev };
//       delete newQuantities[itemId];
//       return newQuantities;
//     });
    
//     console.log("Item saved for later");
//   };

//   const handleMoveToCart = (itemId) => {
//     const itemToMove = savedForLater.find(item => item.id === itemId);
    
//     // Remove from saved for later
//     setSavedForLater(prev => prev.filter(item => item.id !== itemId));
    
//     // Add to cart with quantity 1
//     const itemWithQuantity = { ...itemToMove, quantity: 1 };
//     setCart(prev => [...prev, itemWithQuantity]);
    
//     // Add to quantities
//     setQuantities(prev => ({
//       ...prev,
//       [itemId]: 1
//     }));
    
//     console.log("Item moved to cart");
//   };

//   const handleApplyCoupon = () => {
//     if (!couponCode.trim()) {
//       console.log("Please enter a coupon code");
//       return;
//     }
    
//     setIsCouponLoading(true);
    
//     // Simulate API call delay
//     setTimeout(() => {
//       const coupon = validCoupons[couponCode.toUpperCase()];
      
//       if (coupon) {
//         setAppliedCoupon(coupon);
//         setCouponCode('');
//         console.log(`Coupon applied with discount of ₹${coupon.discount_amount}`);
//       } else {
//         setError("Invalid coupon code");
//         setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
//       }
      
//       setIsCouponLoading(false);
//     }, 1000);
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     console.log("Coupon removed");
//   };

//   // Calculation functions
//   const calculateSubtotal = () => {
//     return cart.reduce((total, item) => {
//       const quantity = quantities[item.id] || 1;
//       const price = (item.price || 0) - (item.discount || 0);
//       return total + (price * quantity);
//     }, 0);
//   };

//   const calculateDiscount = () => {
//     return appliedCoupon ? appliedCoupon.discount_amount : 0;
//   };

//   const calculateShipping = () => {
//     const subtotal = calculateSubtotal();
//     return subtotal > 499 ? 0 : 40;
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const shipping = calculateShipping();
//     const discount = calculateDiscount();
//     return subtotal + shipping - discount;
//   };

//   // Rendering conditions
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   // Simulating logged in status - set to true to show cart
//   const isLoggedIn = true;
  
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md mx-auto">
//           <div className="text-center mb-8">
//             <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
//             <h2 className="mt-6 text-3xl font-bold text-gray-900">Your cart is waiting</h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Please log in to view your cart items and complete your purchase
//             </p>
//           </div>
//           <div className="mt-8 space-y-4">
//             <button
//               onClick={() => navigate('/login')}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Log in to continue
//             </button>
//             <button
//               onClick={() => navigate('/products')}
//               className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (cart.length === 0 && savedForLater.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md mx-auto text-center">
//           <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">Your cart is empty</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Start adding some amazing books to your cart!
//           </p>
//           <button
//             onClick={() => navigate('/products')}
//             className="mt-8 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {error && (
//           <Alert variant="destructive" className="flex items-center gap-2">
//             <p><AlertCircle className="h-4 w-4 text-red-600" /></p>
//             <p><AlertDescription>{error}</AlertDescription></p>
//           </Alert>
//         )}

//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">Shopping Cart {cart.length > 0 && `(${cart.length} items)`}</h1>
//           <div className="flex items-center mt-4 md:mt-0 gap-4">
//             <button
//               onClick={() => navigate('/products')}
//               className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 border border-gray-200 px-4 py-2 rounded"
//             >
//               <ArrowLeft className="w-4 h-4 mr-1" />
//               Continue Shopping
//             </button>
//             {cart.length > 0 && (
//               <button
//                 onClick={() => navigate('/checkout')}
//                 className="inline-flex items-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
//               >
//                 Checkout
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items & Saved for Later */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Cart items section */}
//             {cart.length > 0 && (
//               <div>
//                 <h2 className="text-xl font-medium text-gray-900 mb-4">Cart Items</h2>
//                 <div className="space-y-4">
//                   {cart.map((item) => (
//                     <Card key={item.id} className="p-6">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                         <img
//                           src={item.image || "/api/placeholder/120/180"}
//                           alt={item.title}
//                           className="w-24 h-36 object-cover rounded-md"
//                         />
//                         <div className="flex-grow min-w-0">
//                           <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{item.title}</h3>
//                           <p className="text-sm text-gray-500">by {item.author}</p>
//                           {item.in_stock ? (
//                             <p className="text-sm text-green-600 mt-1">In Stock</p>
//                           ) : (
//                             <p className="text-sm text-red-600 mt-1">Out of Stock</p>
//                           )}
//                           <div className="mt-2 flex items-center gap-2">
//                             <span className="text-lg font-medium text-gray-900">
//                               ₹{((item.price - (item.discount || 0)) * (quantities[item.id] || 1)).toFixed(2)}
//                             </span>
//                             {item.discount > 0 && (
//                               <span className="text-sm text-gray-500 line-through">
//                                 ₹{(item.price * (quantities[item.id] || 1)).toFixed(2)}
//                               </span>
//                             )}
//                             {item.discount > 0 && (
//                               <span className="text-sm text-green-600">
//                                 Save {Math.round((item.discount / item.price) * 100)}%
//                               </span>
//                             )}
//                           </div>
//                           <div className="mt-4 flex flex-wrap items-center gap-4">
//                             <div className="flex items-center border rounded-md">
//                               <button
//                                 onClick={() => handleQuantityChange(item.id, -1)}
//                                 className="p-2 hover:bg-gray-100 disabled:opacity-50"
//                                 disabled={quantities[item.id] <= 1}
//                               >
//                                 <Minus className="w-4 h-4" />
//                               </button>
//                               <span className="px-4 py-2">{quantities[item.id] || 1}</span>
//                               <button
//                                 onClick={() => handleQuantityChange(item.id, 1)}
//                                 className="p-2 hover:bg-gray-100"
//                               >
//                                 <Plus className="w-4 h-4" />
//                               </button>
//                             </div>
//                             <div className="flex items-center gap-3">
//                               <button
//                                 onClick={() => handleSaveForLater(item.id)}
//                                 className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                               >
//                                 <Heart className="w-4 h-4" />
//                                 Save for later
//                               </button>
//                               <button
//                                 onClick={() => handleRemoveItem(item.id)}
//                                 className="text-red-600 hover:text-red-800 flex items-center gap-1"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Saved for later section */}
//             {savedForLater.length > 0 && (
//               <div className="mt-8">
//                 <h2 className="text-xl font-medium text-gray-900 mb-4">Saved for Later ({savedForLater.length})</h2>
//                 <div className="space-y-4">
//                   {savedForLater.map((item) => (
//                     <Card key={item.id} className="p-6">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                         <img
//                           src={item.image || "/api/placeholder/120/180"}
//                           alt={item.title}
//                           className="w-24 h-36 object-cover rounded-md"
//                         />
//                         <div className="flex-grow min-w-0">
//                           <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{item.title}</h3>
//                           <p className="text-sm text-gray-500">by {item.author}</p>
//                           {item.in_stock ? (
//                             <p className="text-sm text-green-600 mt-1">In Stock</p>
//                           ) : (
//                             <p className="text-sm text-red-600 mt-1">Out of Stock</p>
//                           )}
//                           <div className="mt-2 flex items-center gap-2">
//                             <span className="text-lg font-medium text-gray-900">
//                               ₹{(item.price - (item.discount || 0)).toFixed(2)}
//                             </span>
//                             {item.discount > 0 && (
//                               <span className="text-sm text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
//                             )}
//                           </div>
//                           <div className="mt-4 flex flex-wrap items-center gap-4">
//                             <button
//                               onClick={() => handleMoveToCart(item.id)}
//                               className="text-blue-600 border-blue-600 hover:bg-blue-50 px-3 py-1 border rounded-md text-sm"
//                             >
//                               Move to Cart
//                             </button>
//                             <button
//                               onClick={() => {
//                                 // Remove from saved for later
//                                 setSavedForLater(prev => prev.filter(i => i.id !== item.id));
//                                 console.log("Item removed from saved items");
//                               }}
//                               className="text-red-600 hover:text-red-800 flex items-center gap-1"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           {cart.length > 0 && (
//             <div className="lg:col-span-1">
//               <Card className="p-6 sticky top-8">
//                 <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="text-gray-900">₹{calculateSubtotal().toFixed(2)}</span>
//                   </div>
                  
//                   {appliedCoupon && (
//                     <div className="flex justify-between text-green-600">
//                       <span className="flex items-center gap-1">
//                         <CreditCard className="w-4 h-4" />
//                         Coupon: {appliedCoupon.code}
//                         <button 
//                           onClick={handleRemoveCoupon}
//                           className="text-red-500 ml-2"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </button>
//                       </span>
//                       <span>-₹{calculateDiscount().toFixed(2)}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="text-gray-900">
//                       {calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping().toFixed(2)}`}
//                     </span>
//                   </div>
                  
//                   {calculateSubtotal() < 499 && (
//                     <Alert>
//                       <AlertCircle className="h-4 w-4" />
//                       <AlertDescription>
//                         Add ₹{(499 - calculateSubtotal()).toFixed(2)} more to get free shipping!
//                       </AlertDescription>
//                     </Alert>
//                   )}
                  
//                   {!appliedCoupon && (
//                     <div className="pt-2">
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           value={couponCode}
//                           onChange={(e) => setCouponCode(e.target.value)}
//                           placeholder="Enter coupon code"
//                           className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         />
//                         <button
//                           onClick={handleApplyCoupon}
//                           disabled={isCouponLoading || !couponCode.trim()}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
//                         >
//                           {isCouponLoading ? 
//                             <RefreshCw className="w-4 h-4 animate-spin" /> : 
//                             'Apply'
//                           }
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between">
//                       <span className="text-lg font-medium text-gray-900">Total</span>
//                       <span className="text-lg font-medium text-gray-900">
//                         ₹{calculateTotal().toFixed(2)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="space-y-2 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <ShieldCheck className="w-4 h-4" />
//                       <span>Secure checkout</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Truck className="w-4 h-4" />
//                       <span>Free shipping on orders above ₹499</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Timer className="w-4 h-4" />
//                       <span>Quick delivery within 2-5 business days</span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => navigate('/checkout')}
//                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;