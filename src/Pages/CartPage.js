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
  Truck 
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Card } from '../components/ui/Card';

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchCartData();
    // Initialize quantities from cart data
    const initialQuantities = {};
    cart.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const fetchCartData = async () => {
    try {
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

  const handleQuantityChange = async (itemId, change) => {
    const newQuantity = Math.max(1, (quantities[itemId] || 1) + change);
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/cart-detail/${itemId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      if (!response.ok) throw new Error('Failed to update quantity');
      
      const updatedItem = await response.json();
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id: itemId, quantity: newQuantity } 
      });
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
      const response = await fetch(`http://127.0.0.1:8000/api/cart/cart-detail/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authToken')).access}`,
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
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      const price = (item.price || 0) - (item.discount || 0);
      return total + (price * quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 499 ? 0 : 40;
    return subtotal + shipping;
  };

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

  if (cart.length === 0) {
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

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({cart.length} items)</h1>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
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
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-900">
                        ₹{((item.price - (item.discount || 0)) * (quantities[item.id] || 1)).toFixed(2)}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{(item.price * (quantities[item.id] || 1)).toFixed(2)}
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
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {calculateSubtotal() > 499 ? 'FREE' : '₹40.00'}
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
        </div>
      </div>
    </div>
  );
};

export default CartPage;