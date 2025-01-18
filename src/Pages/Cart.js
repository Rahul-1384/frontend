import React, { useState } from 'react';
import { Transition } from '@headlessui/react'; // For smooth transitions

const CartItem = ({ item, removeItem, updateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Transition
      show={true} // Always show for simplicity; could be tied to item state
      enter="transition-all duration-300 transform ease-in-out"
      enterFrom="opacity-0 translate-x-4"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-300 transform ease-in-out"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-4"
    >
      <div className="flex items-center border-b py-4 space-x-4 hover:scale-105 transition-transform ease-in-out">
        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
        <div className="flex-grow">
          <h4 className="font-semibold text-lg">{item.title}</h4>
          <p className="text-sm text-gray-500">by {item.author}</p>
          <p className="text-lg font-bold">{`$${item.price}`}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-200 transition"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            className="w-12 text-center border rounded"
            readOnly
          />
          <button
            className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-200 transition"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
          <button
            className="text-red-500 ml-2 hover:text-red-700 transition"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </Transition>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM7SOTbegIs-D7Qc8-YYuhlLinXYiA_mkg8w&s',
      title: 'Book 1',
      author: 'Author A',
      price: 10,
      quantity: 2,
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM7SOTbegIs-D7Qc8-YYuhlLinXYiA_mkg8w&s',
      title: 'Book 2',
      author: 'Author B',
      price: 20,
      quantity: 1,
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-2xl font-bold mb-6">Your Cart</div>
      <div className="space-y-4">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="font-semibold text-xl">Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-400 transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
