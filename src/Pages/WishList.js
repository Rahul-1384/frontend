import React, { useState } from 'react';
import { PackageSearch, AlertCircle, Calendar, Truck, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 14.99,
      image: '/api/placeholder/120/180'
    },
    // Add more sample items as needed
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-black mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-36 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-gray-200 font-medium">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.author}</p>
                  <p className="text-yellow-500 font-medium">${item.price.toFixed(2)}</p>
                  <div className="mt-4 space-x-2">
                    <button className="px-3 py-1 bg-yellow-500 text-slate-900 rounded hover:bg-yellow-400 transition-colors duration-200">
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="px-3 py-1 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;