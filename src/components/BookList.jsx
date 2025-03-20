import { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, RefreshCw, LogIn } from 'lucide-react'; // Lucide icons for error, retry, and login
import { useNavigate } from 'react-router-dom'; // For navigation

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ type: '', message: '' }); // Error state with type and message
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to show toast message
  const showToastMessage = (message) => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 5 seconds
  };

  const fetchBooks = async () => {
    setLoading(true); // Set loading to true when retrying
    setError({ type: '', message: '' }); // Clear any previous errors
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/upload-book/books/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setBooks(response.data);
    } catch (error) {
      let errorMessage = 'Failed to fetch books. Please try again later.';
      if (error.response) {
        // Server responded with a status code outside 2xx
        switch (error.response.status) {
          case 401:
            errorMessage = 'Authentication failed. Please log in to access this page.';
            setError({ type: 'authentication', message: errorMessage });
            break;
          case 403:
            errorMessage = 'You do not have permission to access this resource.';
            setError({ type: 'permission', message: errorMessage });
            break;
          case 404:
            errorMessage = 'The requested resource was not found.';
            setError({ type: 'not_found', message: errorMessage });
            break;
          case 500:
            errorMessage = 'A server error occurred. Please try again later.';
            setError({ type: 'server', message: errorMessage });
            break;
          default:
            errorMessage = 'An unexpected error occurred. Please try again later.';
            setError({ type: 'unknown', message: errorMessage });
        }
      } else if (error.request) {
        // No response received (network error)
        errorMessage = 'Network error. Please check your internet connection.';
        setError({ type: 'network', message: errorMessage });
      } else {
        // Something else caused the error
        errorMessage = 'An unexpected error occurred. Please try again later.';
        setError({ type: 'unknown', message: errorMessage });
      }
      showToastMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return <div className="flex h-screen justify-center items-center">Loading...</div>;
  }

  // Show login UI if authentication error occurs
  if (error.type === 'authentication') {
    return (
      <div className="flex flex-col h-screen justify-center text-red-600 items-center">
        <AlertCircle className="h-12 text-red-600 w-12 mb-4" /> {/* Lucide error icon */}
        <p className="text-xl font-semibold">Authentication Required</p>
        <p className="text-gray-600 text-sm mt-2">You need to log in to access this page.</p>
        {/* Login Button */}
        <button
          onClick={handleLoginRedirect}
          className="flex bg-red-600 rounded-lg text-white hover:bg-red-700 items-center mt-4 px-4 py-2 transition-colors"
        >
          <LogIn className="h-5 w-5 mr-2" /> {/* Lucide login icon */}
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Custom Toast Notification */}
      {showToast && (
        <div className="flex bg-red-100 border border-red-400 rounded-lg shadow-lg text-red-700 animate-fade-in fixed items-center px-4 py-2 right-4 top-4">
          <AlertCircle className="h-5 w-5 mr-2" /> {/* Lucide error icon */}
          <span>{error.message}</span>
        </div>
      )}

      {/* Error UI */}
      {error.message && error.type !== 'authentication' && (
        <div className="flex flex-col h-screen justify-center text-red-600 items-center">
          <AlertCircle className="h-12 text-red-600 w-12 mb-4" /> {/* Lucide error icon */}
          <p className="text-xl font-semibold">Oops! Something went wrong.</p>
          <p className="text-gray-600 text-sm mt-2">{error.message}</p>
          {/* Retry Button */}
          <button
            onClick={fetchBooks}
            className="flex bg-red-600 rounded-lg text-white hover:bg-red-700 items-center mt-4 px-4 py-2 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" /> {/* Lucide retry icon */}
            Retry
          </button>
        </div>
      )}

      {/* Book List */}
      {!error.message && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-lg duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden transform transition-all">
              {book.book_images && (
                <img
                  src={book.book_images}
                  alt={book.book_title}
                  className="h-64 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-gray-900 text-xl font-bold mb-2">{book.book_title}</h3>
                <p className="text-gray-600 text-sm mb-2">By {book.book_author}</p>
                <p className="text-gray-500 text-sm mb-4">
                  Category: {book.category}<br />
                  Subject: {book.subject}<br />
                  Condition: {book.condition}
                </p>
                <p className="text-indigo-600 text-xl font-bold mb-4">
                  ₹{book.final_price || book.original_price}
                </p>
                {book.status && (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    book.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    book.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {book.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;