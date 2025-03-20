import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminBookPanel() {
  const [pendingBooks, setPendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPendingBooks();
  }, []);

  const fetchPendingBooks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/upload-book/books/pending/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPendingBooks(response.data);
    } catch (error) {
      setError('Failed to fetch pending books');
    } finally {
      setLoading(false);
    }
  };

  const handlePricing = async (bookId, finalPrice, discount, status) => {
    try {
      await axios.patch(`http://your-backend-url/api/books/${bookId}/pricing/`, {
        final_price: finalPrice,
        discount: discount,
        status: status
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')?.access}`
        }
      });
      fetchPendingBooks(); // Refresh the list
    } catch (error) {
      setError('Failed to update book status');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pending Books for Approval</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
        {pendingBooks.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
            {book.book_images && (
              <img
                src={book.book_images}
                alt={book.book_title}
                className="h-48 rounded-md w-full mb-4 object-cover"
              />
            )}
            <h3 className="text-lg font-semibold">{book.book_title}</h3>
            <p className="text-gray-600">By {book.book_author}</p>
            <p className="text-gray-600">Original Price: ₹{book.original_price}</p>
            <p className="text-gray-600">Category: {book.category}</p>
            <p className="text-gray-600">Condition: {book.condition}</p>
            
            <div className="mt-4 space-y-2">
              <input
                type="number"
                placeholder="Final Price"
                className="border p-2 rounded w-full"
                onChange={(e) => book.tempFinalPrice = e.target.value}
              />
              <input
                type="number"
                placeholder="Discount"
                className="border p-2 rounded w-full"
                onChange={(e) => book.tempDiscount = e.target.value}
              />
              <button
                className="bg-green-600 rounded text-white w-full hover:bg-green-700 py-2"
                onClick={() => handlePricing(
                  book.id,
                  book.tempFinalPrice,
                  book.tempDiscount,
                  'Approved'
                )}
              >
                Approve with Pricing
              </button>
              <button
                className="bg-red-600 rounded text-white w-full hover:bg-red-700 py-2"
                onClick={() => handlePricing(book.id, null, null, 'Rejected')}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookPanel;