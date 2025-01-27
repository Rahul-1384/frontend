import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlist.map((book) => (
          <div key={book.id} className="wishlist-item p-4 mb-4 border rounded-md">
            <img src={book.image} alt={book.title} className="w-32 h-40 object-cover" />
            <div className="ml-4">
              <p className="font-bold">{book.title}</p>
              <p className="text-sm text-gray-600">{book.description}</p>
              <Link to={`/book/${book.id}`} className="text-blue-500">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
