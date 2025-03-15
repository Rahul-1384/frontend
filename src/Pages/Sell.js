import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Camera, Upload, Check } from 'lucide-react';

// Component for the book selling page
const Sell = () => {
  // State for form data
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    condition: 'new',
    category: '',
    location: ''
  });
  
  // State for photo uploads
  const [photos, setPhotos] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  // Handle photo selection
  const handlePhotoSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = [...photos];
      const newPreviews = [...previewImages];
      
      Array.from(e.target.files).forEach(file => {
        if (newPhotos.length < 6) { // Limit to 6 photos
          newPhotos.push(file);
          const reader = new FileReader();
          reader.onload = (event) => {
            newPreviews.push(event.target.result);
            setPreviewImages([...newPreviews]);
          };
          reader.readAsDataURL(file);
        }
      });
      
      setPhotos(newPhotos);
    }
  };

  // Remove a photo
  const removePhoto = (index) => {
    const newPhotos = [...photos];
    const newPreviews = [...previewImages];
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    setPhotos(newPhotos);
    setPreviewImages(newPreviews);
  };

  // Get authentication token from localStorage
  // Get authentication token from localStorage
const getAuthToken = () => {
  try {
    const authData = JSON.parse(localStorage.getItem('authToken'));
    if (authData && authData.access) {
      return authData.access;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

  // Submit the form with actual API calls
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Step 1: Create the book listing
      const bookResponse = await fetch('http://127.0.0.1:8000/api/post-sell/sell-detail/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          sell_detail: {
            book_title: bookData.title,
            book_author: bookData.author,
            book_description: bookData.description,
            book_expected_price: parseFloat(bookData.price),
            book_condition: bookData.condition,
            book_category: bookData.category,
            book_location: bookData.location,
            book_quantity: 1
          }
        })        
      });

      if (!bookResponse.ok) {
        const errorData = await bookResponse.json();
        throw new Error(errorData.error || 'Failed to create book listing');
      }

      const bookResult = await bookResponse.json();
      const bookId = bookResult.id;

      // Step 2: Upload photos one by one
      for (const photo of photos) {
        const photoFormData = new FormData();
        photoFormData.append('book', bookId);
        photoFormData.append('photo', photo);

        const photoResponse = await fetch('http://127.0.0.1:8000/api/post-sell/book-photos/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
            // Don't set Content-Type here - FormData will set it with the boundary
          },
          body: photoFormData
        });

        if (!photoResponse.ok) {
          throw new Error('Failed to upload one or more photos');
        }
      }

      // Success state
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setBookData({
          title: '',
          author: '',
          description: '',
          price: '',
          condition: 'new',
          category: '',
          location: ''
        });
        setPhotos([]);
        setPreviewImages([]);
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to list your book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">List Your Book For Sale</h1>
              {submitSuccess && (
                <div className="flex items-center text-green-600">
                  <Check className="w-5 h-5 mr-1" />
                  <span>Book listed successfully!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                  <input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={bookData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={bookData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select
                    name="condition"
                    value={bookData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={bookData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="textbook">Textbook</option>
                    <option value="children">Children's Book</option>
                    <option value="comic">Comic/Graphic Novel</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={bookData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              {/* Photo upload section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                <p className="text-sm text-gray-500 mb-3">Add up to 6 photos of your book</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={preview} 
                        alt={`Book preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                      >
                        <X className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  ))}
                  
                  {photos.length < 6 && (
                    <label className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <Camera className="w-8 h-8 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Add Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoSelect} 
                        className="hidden" 
                        multiple={photos.length < 5}
                      />
                    </label>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Listing Book...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-1" />
                      List Book for Sale
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;