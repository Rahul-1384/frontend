import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Add this import


function BookUploadForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
  const [previewImage, setPreviewImage] = useState(null);

  const conditions = ['Good', 'Better', 'Best'];
  const categories = ['Class 4-8', 'Class 9-12', 'Reference Book', 'Children Book', 'Competition Book', 'Other'];
  const subjects = ['Science', 'Commerce', 'Humanities', 'Mathematics', 'English', 'Hindi', 'Other'];
  const competitiveExams = ['NEET', 'JEE', 'AIIMS', 'UPSC', 'SSC', 'GATE', 'CAT', 'Other'];
  const boards = ['CBSE', 'ICSE', 'ISC', 'Other'];
  const languages = ['English', 'Hindi', 'Other'];

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        if (!authToken?.access) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        // Verify token with a backend API call
        const response = await axios.get('http://127.0.0.1:8000/api/upload-book/books/', {
          headers: { 
            'Authorization': `Bearer ${authToken.access}`
          }
        });
        
        setIsAuthenticated(true);
      } catch (error) {
        // If token is invalid or expired, try refreshing the token
        try {
          const authToken = JSON.parse(localStorage.getItem('authToken'));
          if (authToken?.refresh) {
            const refreshResponse = await axios.post('http://127.0.0.1:8000/api/user/refresh/', {
              refresh: authToken.refresh
            });
            
            // Update the access token
            localStorage.setItem('authToken', JSON.stringify({
              ...authToken,
              access: refreshResponse.data.access
            }));
            
            setIsAuthenticated(true);
          } else {
            throw new Error('No refresh token available');
          }
        } catch (refreshError) {
          // If refresh fails, clear token and set as unauthenticated
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'book_images' && files && files[0]) {
      setPreviewImage(URL.createObjectURL(files[0]));
      setBook(prev => ({
        ...prev,
        book_images: files[0]
      }));
    } else {
      setBook(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if image is selected
    if (!book.book_images) {
      toast.error('Please select a book image');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    Object.entries(book).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      const response = await axios.post('http://127.0.0.1:8000/api/upload-book/books/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken.access}`
        }
      });

      toast.success('Book uploaded successfully! Waiting for admin approval.');

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
      setPreviewImage(null);
      
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const authToken = JSON.parse(localStorage.getItem('authToken'));
          const refreshResponse = await axios.post('http://127.0.0.1:8000/api/user/refresh/', {
            refresh: authToken.refresh
          });
          
          const newAuthToken = {
            ...authToken,
            access: refreshResponse.data.access
          };
          localStorage.setItem('authToken', JSON.stringify(newAuthToken));
          
          const response = await axios.post('http://127.0.0.1:8000/api/upload-book/books/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${newAuthToken.access}`
            }
          });

          toast.success('Book uploaded successfully! Waiting for admin approval.');
          
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
          setPreviewImage(null);
          
        } catch (refreshError) {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          toast.error('Your session has expired. Please log in again.');
        }
      } else {
        toast.error(error.response?.data?.message || 'Failed to upload book. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  // Login redirect function
  const redirectToLogin = () => {
    navigate(`/login?returnUrl=${encodeURIComponent('/sell')}`);
  };
  const redirectToSignup = () => {
    navigate(`/signup?returnUrl=${encodeURIComponent('/sell')}`);
  };
  

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Unauthenticated user view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-red-500 text-white px-6 py-4">
            <h2 className="text-xl font-bold">Access Denied</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V8a3 3 0 00-6 0v4m9 0h-9" />
              </svg>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Authentication Required</h3>
                <p className="text-gray-600">You need to be logged in to upload books.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Please log in to your account to access the book upload feature. If you don't have an account, you'll need to register first.
            </p>
            <div className="flex gap-3">
              <button
                onClick={redirectToLogin}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Log In
              </button>
              <a 
                onClick={redirectToSignup}
                className="w-full bg-gray-200 no-underline text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200 text-center"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user view - Book upload form
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 6000,
          success: {
            duration: 5000,
            style: {
              background: '#34D399',
              color: 'white',
            },
          },
          error: {
            duration: 8000, // Longer duration for errors
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      /> {/* Add this line */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Upload Book</h2>
          <p className="text-indigo-100">Share your books with the community</p>
        </div>

        {message.text && (
          <div className={`m-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-5 w-5 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {message.type === 'success' ? (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6 md:col-span-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Title*</label>
                <input
                  type="text"
                  name="book_title"
                  required
                  value={book.book_title}
                  onChange={handleChange}
                  placeholder="Enter the book title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author*</label>
                <input
                  type="text"
                  name="book_author"
                  required
                  value={book.book_author}
                  onChange={handleChange}
                  placeholder="Enter the author's name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  name="book_description"
                  required
                  value={book.book_description}
                  onChange={handleChange}
                  placeholder="Provide a brief description of the book"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)*</label>
                <input
                  type="number"
                  name="original_price"
                  required
                  value={book.original_price}
                  onChange={handleChange}
                  placeholder="Enter the original price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Image*</label>
                <div className="flex items-center">
                  <label className="cursor-pointer flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {book.book_images ? 'Change Image' : 'Select Image'}
                    <input
                      type="file"
                      name="book_images"
                      accept="image/*"
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                {previewImage && (
                  <div className="mt-2">
                    <div className="relative rounded-md overflow-hidden h-40 bg-gray-100">
                      <img 
                        src={previewImage} 
                        alt="Book preview" 
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setBook(prev => ({ ...prev, book_images: null }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6 md:col-span-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  name="condition"
                  value={book.condition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={book.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  name="subject"
                  value={book.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Competitive Exam</label>
                  <select
                    name="competitive_exam"
                    value={book.competitive_exam}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {competitiveExams.map(exam => (
                      <option key={exam} value={exam}>{exam}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
                  <select
                    name="boards"
                    value={book.boards}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {boards.map(board => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  name="language"
                  value={book.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload Book'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookUploadForm;