import { useState } from 'react';
import axios from 'axios';
import { Upload, Book, DollarSign } from 'lucide-react'; // Import icons

function BookUploadForm() {
  const [book, setBook] = useState({
    book_title: '',
    book_author: '',
    book_description: '',
    original_price: '',
    condition: 'Good',
    category: 'Other',
    subject: 'Other',
    competitive_exam: 'Other',
    boards: 'Other',
    language: 'Other',
    book_images: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const conditions = ['Good', 'Better', 'Best'];
  const categories = ['Class 4-8', 'Class 9-12', 'Reference Book', 'Children Book', 'Competition Book', 'Other'];
  const subjects = ['Science', 'Commerce', 'Humanities', 'Mathematics', 'English', 'Hindi', 'Other'];
  const competitiveExams = ['NEET', 'JEE', 'AIIMS', 'UPSC', 'SSC', 'GATE', 'CAT', 'Other'];
  const boards = ['CBSE', 'ICSE', 'ISC', 'Other'];
  const languages = ['English', 'Hindi', 'Other'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    Object.entries(book).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload-book/books/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('authToken')?.access}`
        }
      });

      setMessage({
        type: 'success',
        text: 'Book uploaded successfully! Waiting for admin approval.'
      });

      // Reset form
      setBook({
        book_title: '',
        book_author: '',
        book_description: '',
        original_price: '',
        condition: 'Good',
        category: 'Other',
        subject: 'Other',
        competitive_exam: 'Other',
        boards: 'Other',
        language: 'Other',
        book_images: null
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to upload book. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  
    return (
      <div className="bg-gradient-to-br from-indigo-50 lg:px-8 min-h-screen px-4 py-12 sm:px-6 to-purple-50 via-white">
        <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 px-8 py-6 to-purple-600">
            <div className="flex items-center space-x-4">
              <Book className="h-8 text-white w-8" />
              <h2 className="text-2xl text-white font-bold">List Your Book</h2>
            </div>
            <p className="text-indigo-100 mt-2">Share your knowledge with others</p>
          </div>
  
          {/* Message Display */}
          {message.text && (
            <div className={`mx-8 mt-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
  
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="border-b text-gray-900 text-lg font-semibold pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="group">
                  <input
                    type="text"
                    name="book_title"
                    required
                    value={book.book_title}
                    onChange={handleChange}
                    placeholder="Book Title"
                    className="border-b-2 border-gray-300 text-gray-900 w-full focus:border-indigo-600 focus:outline-none peer placeholder-transparent px-1 py-2"
                  />
                  <label className="text-gray-600 text-sm -top-5 absolute left-1 peer-focus:-top-5 peer-focus:text-indigo-600 peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                    Book Title
                  </label>
                </div>
  
                <div className="group">
                  <input
                    type="text"
                    name="book_author"
                    required
                    value={book.book_author}
                    onChange={handleChange}
                    placeholder="Author"
                    className="border-b-2 border-gray-300 text-gray-900 w-full focus:border-indigo-600 focus:outline-none peer placeholder-transparent px-1 py-2"
                  />
                  <label className="text-gray-600 text-sm -top-5 absolute left-1 peer-focus:-top-5 peer-focus:text-indigo-600 peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                    Author
                  </label>
                </div>
              </div>
  
              <div className="relative">
                <textarea
                  name="book_description"
                  required
                  value={book.book_description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Description"
                  className="border border-gray-300 p-3 rounded-lg text-gray-900 w-full focus:border-indigo-600 focus:ring-indigo-600"
                />
              </div>
  
              <div className="relative">
                <div className="flex absolute inset-y-0 items-center left-0 pl-3 pointer-events-none">
                  <DollarSign className="h-5 text-gray-400 w-5" />
                </div>
                <input
                  type="number"
                  name="original_price"
                  required
                  value={book.original_price}
                  onChange={handleChange}
                  placeholder="Original Price"
                  className="border-gray-300 rounded-lg w-full focus:border-indigo-600 focus:ring-indigo-600 pl-10"
                />
              </div>
            </div>
  
            {/* Book Details Section */}
            <div className="space-y-6">
              <h3 className="border-b text-gray-900 text-lg font-semibold pb-2">
                Book Details
              </h3>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
                {/* Condition Select */}
                <div className="relative">
                  <select
                    name="condition"
                    value={book.condition}
                    onChange={handleChange}
                    className="bg-white border-gray-300 rounded-lg w-full focus:border-indigo-600 focus:ring-indigo-600"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                  <label className="bg-white text-gray-600 text-xs -mt-px -top-2 absolute left-2 px-1">
                    Condition
                  </label>
                </div>
  
                {/* Similar styling for other select inputs */}
                {/* ... Add the rest of the select inputs with the same pattern */}
              </div>
            </div>
  
            {/* Image Upload Section */}
            <div className="space-y-6">
              <h3 className="border-b text-gray-900 text-lg font-semibold pb-2">
                Book Image
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg duration-200 hover:border-indigo-600 relative transition-colors">
                <input
                  type="file"
                  name="book_images"
                  accept="image/*"
                  onChange={handleChange}
                  className="h-full w-full absolute cursor-pointer inset-0 opacity-0"
                  required
                />
                <div className="text-center">
                  <Upload className="h-12 text-gray-400 w-12 mx-auto" />
                  <p className="text-gray-600 text-sm mt-2">
                    Drag and drop your book image here or click to browse
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white text-sm font-semibold transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              {loading ? (
                <>
                  <svg className="h-5 text-white w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Upload Book</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default BookUploadForm;