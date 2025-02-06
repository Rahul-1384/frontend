import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// Icons (kept from original implementation)
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
// Image Carousel Component (from original)
const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const safeImages = Array.isArray(images) && images.length > 0 
    ? images 
    : ['/api/placeholder/400/500'];
  return (
    <div className="relative w-full">
      <img 
        src={safeImages[currentImageIndex]} 
        alt={`Book view ${currentImageIndex + 1}`} 
        className="w-full h-96 object-contain"
      />
      {safeImages.length > 1 && (
        <>
          <div className="absolute top-1/2 w-full flex justify-between px-4">
            <button onClick={prevImage} className="bg-gray-500 text-white p-2 rounded-full">←</button>
            <button onClick={nextImage} className="bg-gray-500 text-white p-2 rounded-full">→</button>
          </div>
        </>
      )}
    </div>
  );
};
function BookDetail() {
  const API_BASE_URL = "http://localhost:3000";
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlistStatus, setWishlistStatus] = useState(false);
  // Fetch book details and wishlist status
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const bookResponse = await axios.get(`${API_BASE_URL}/books/${id}`);
        setBook(bookResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch book details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookDetails();
  }, [id]);
  // Memoized calculations
  const discountedPrice = useMemo(() => {
    if (!book) return "Out of Stock";
    return Math.max(0, book.price - (book.price * book.discount / 100)).toFixed(2);
  }, [book]);
  const averageRating = useMemo(() => {
    if (!book || !book.reviews || book.reviews.length === 0) return "N/A";
    return (book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length).toFixed(1);
  }, [book]);
  // Event Handlers
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/api/cart/add`, 
        { bookId: id, quantity }, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      navigate('/cart');
    } catch (err) {
      console.error('Add to cart failed', err);
      alert('Failed to add book to cart');
    }
  };
  const handleWishlistToggle = async () => {
    try {
      setIsWishlist(!isWishlist);
      const token = localStorage.getItem('token');
      const method = wishlistStatus ? 'delete' : 'post';
      await axios[method](`${API_BASE_URL}/api/wishlist/${id}`, 
        {}, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Wishlist toggle failed', err);
    }
  };
  const [isWishlist, setIsWishlist] = useState(false);



  // Loading and Error States
  if (loading) return <div className="text-center py-10">Loading book details...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  if (!book) return <div className="text-center py-10">No book found</div>;
  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Book Images */}
        <div>
          <ImageCarousel images={book.image || ['/api/placeholder/400/500']} />
        </div>
        {/* Book Information */}
        <div>
          <div className='flex items-center gap-2'>
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className={`px-2 py-1 text-xs text-white font-bold rounded-md ${
              book.condition === "New" ? "bg-green-500" :
              book.condition === "Good" ? "bg-yellow-500" : 
              "bg-orange-600"
            }`}>
              {book.condition}
            </p>
          </div>
          
          {/* Rating Section */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon 
                  key={star} 
                  filled={star <= Math.round(parseFloat(averageRating))} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {averageRating} ({book.reviews?.length || 0} reviews)
            </span>
          </div>
          {/* Price Section */}
          <div className="mb-4">
            <p className="text-4xl font-bold text-green-600">${discountedPrice}</p>
            <div className="flex items-center">
              <span className="line-through text-gray-500 mr-2">${book.price}</span>
              <span className="text-green-600 font-semibold">
                {book.discount}% OFF
              </span>
            </div>
          </div>
          {/* Wishlist and Actions */}
          {/* Wishlist and Actions */}
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={handleWishlistToggle}
              className={`flex items-center ${isWishlist ? 'text-red-500' : 'text-gray-500'}`}
            >
              <HeartIcon filled={isWishlist} />
              <span className="ml-2">Wishlist</span>
            </button>
          </div>
          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span className="mx-4">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            >
              <ShoppingCartIcon />
              <span className="ml-2">Add to Cart</span>
            </button>
            <button 
              className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Book Description */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Book Description</h2>
        <p className="text-gray-700">{book.description || 'No description available.'}</p>
      </section>
      {/* Book Details */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Book Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p><strong>Author:</strong> {book.author || 'Unknown'}</p>
            <p><strong>Publisher:</strong> {book.publisher || 'Unknown'}</p>
          </div>
          <div>
            <p><strong>Language:</strong> {book.language || 'Unknown'}</p>
            <span className={`p-1 rounded-md ${
              book.condition === "New" ? "bg-green-500" :
              book.condition === "Good" ? "bg-yellow-500" : 
              "bg-orange-600 text-white"
            }`}>
              <strong>Condition:</strong> {book.condition || 'Unknown'}
            </span>
          </div>
        </div>
      </section>
      {/* Related Books */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(book.relatedBooks || []).map(relatedBook => (
            <Link 
              to={`/book/${relatedBook.id}`} 
              key={relatedBook.id} 
              className="border p-2 text-center hover:shadow-lg transition"
            >
              <img 
                src={relatedBook.image || '/api/placeholder/200/300'} 
                alt={relatedBook.title} 
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="text-sm font-semibold">{relatedBook.title}</h3>
              <p className="text-green-600">${relatedBook.price}</p>
            </Link>
          ))}
        </div>
      </section>
      {/* Reviews */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {(book.reviews || []).map(review => (
          <div key={review.id} className="border-b py-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-500 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star} 
                    filled={star <= review.rating} 
                  />
                ))}
              </div>
              <span className="text-gray-600">{review.username}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
export default BookDetail;