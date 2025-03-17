import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const shipping = subtotal > 0 ? 50 : 0; // Example shipping fee
  const total = subtotal + shipping;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const token = JSON.parse(localStorage.getItem('authToken'))?.access;

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
    setError('Failed to fetch cart items');
    setLoading(false);
    console.error(err);
  }
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
  } catch (err) {
    setError('Failed to remove item');
    console.error(err);
  }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-lg text-gray-600">Your cart is empty</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            onClick={() => window.location.href = '/products'}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="lg:flex lg:gap-6">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="hidden md:grid md:grid-cols-12 bg-gray-100 p-4 font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="border-t first:border-t-0 p-4">
                  <div className="md:grid md:grid-cols-12 md:gap-4 items-center">
                    {/* Product */}
                    <div className="md:col-span-6 flex gap-4 mb-4 md:mb-0">
                      <div className="w-20 h-28 bg-gray-200 flex-shrink-0 rounded overflow-hidden">
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
                      <div>
                        <h3 className="font-medium">{item.book_details.title}</h3>
                        <p className="text-gray-600 text-sm">{item.book_details.author}</p>
                        <button 
                          onClick={() => removeFromCart(item.book_details.book_id)}
                          className="text-red-500 text-sm flex items-center gap-1 mt-2 md:hidden"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 flex justify-between md:justify-center mb-2 md:mb-0">
                      <span className="md:hidden">Price:</span>
                      <div>
                        <span className="text-gray-800">₹{item.price_at_addition}</span>
                        {item.book_details.price > item.price_at_addition && (
                          <span className="text-gray-500 line-through text-sm ml-1">
                            ₹{item.book_details.price}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-between md:justify-center mb-2 md:mb-0">
                      <span className="md:hidden">Quantity:</span>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.book_details.book_id, item.quantity - 1)}
                          className="text-gray-500 hover:text-blue-600"
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle size={20} />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.book_details.book_id, item.quantity + 1)}
                          className="text-gray-500 hover:text-blue-600"
                        >
                          <PlusCircle size={20} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total & Actions */}
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden">Total:</span>
                      <span className="font-medium">₹{item.total_price}</span>
                      <button 
                        onClick={() => removeFromCart(item.book_details.book_id)}
                        className="text-red-500 hidden md:block"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="border-t pt-3 font-bold flex justify-between">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <div className="space-y-3">
                <button 
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  onClick={() => window.location.href = '/checkout'}
                >
                  Proceed to Checkout
                </button>
                <button 
                  className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50"
                  onClick={() => window.location.href = '/books'}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;