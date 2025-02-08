import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const SellBooks = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    book_type: '',
    photos: null,
    condition: '',
    quantity: '',
    price: '',
    payment: '',
    address: '',
    pincode: '',
    phone: '',
    secure_details: false,
  });

  const [bookDetailsMethod, setBookDetailsMethod] = useState('manual');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBookDetailsChange = (method) => {
    setBookDetailsMethod(method);
    setIsCameraOpen(method === 'ai');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { phone, pincode } = formData;

    if (!/^[0-9]{10}$/.test(phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      alert('Pin code must be 6 digits.');
      return;
    }

    alert('Form submitted successfully!');
    // Form submission logic goes here
  };

  return (
    <div className="flex flex-col items-center bg-gray-50  px-0">
      <Navbar />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <h1 className="text-3xl font-semibold mb-6 text-center text-[#c7ae6f]">Sell Your Used Books</h1>
        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:px-24" onSubmit={handleSubmit}>
          {/* Book Details Method */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Details</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="book_details_method"
                  value="manual"
                  checked={bookDetailsMethod === 'manual'}
                  onChange={() => handleBookDetailsChange('manual')}
                  className="w-4 h-4 cursor-pointer text-[#fdb604] border-gray-300 focus:ring-[#fdb604]"
                />
                <span className="ml-2 text-sm cursor-pointer text-gray-700">Enter Book Details Manually</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="book_details_method"
                  value="ai"
                  checked={bookDetailsMethod === 'ai'}
                  onChange={() => handleBookDetailsChange('ai')}
                  className="w-4 h-4 text-[#fdb604] cursor-pointer border-gray-300 focus:ring-[#fdb604]"
                />
                <span className="ml-2 text-sm cursor-pointer text-gray-700">Enter the Details with AI</span>
              </label>
            </div>
          </div>

          {/* AI Input Section */}
          {isCameraOpen && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Capture Book Images</label>
              <p className="text-sm text-gray-500 mb-3">
                Please follow these instructions for capturing images of the book:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-500 mb-4">
                <li>Ensure the environment is well-lit to avoid shadows or glare.</li>
                <li>Position the book straight and ensure all text is readable.</li>
                <li>Capture the following:
                  <ul className="list-disc pl-5">
                    <li><strong>Front Cover:</strong> Clearly showing the title, author, and any other text.</li>
                    <li><strong>Back Cover:</strong> Ensure the synopsis and barcode are visible.</li>
                    <li><strong>Key Pages:</strong> Include the copyright page, ISBN, or any relevant details.</li>
                  </ul>
                </li>
                <li>Avoid blurry or cropped images for accurate AI reading.</li>
              </ul>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                Once you've captured the images, they will be uploaded for AI processing to extract book details automatically.
              </p>
            </div>
          )}



          {/* Manual Input Section */}
          {
            bookDetailsMethod === 'manual' && (
              <>

                {/* Title */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  />
                </div>

                {/* Author */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  />
                </div>

                  {/* Book Type */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book Type</label>
                  <select
                    name="book_type" 
                    value={formData.book_type}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  >
                    <option value="">Select a type</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-fiction</option>
                    <option value="educational">Educational</option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                    <option value="state-board">State Board</option>
                    <option value="international">International</option>
                    <option value="jee">JEE</option>
                    <option value="neet">NEET</option>
                    <option value="upsc">UPSC</option>
                    <option value="banking">Banking Exams</option>
                    <option value="ssc">SSC Exams</option>
                    <option value="ca">CA (Chartered Accountant)</option>
                    <option value="medical">Medical Entrance</option>
                    <option value="engineering">Engineering Entrance</option>
                    <option value="commerce">Commerce</option>
                    <option value="law">Law Entrance</option>
                    <option value="self-development">Self-Development</option>
                    <option value="biography">Biography</option>
                    <option value="children">Children's Books</option>
                  </select>
                </div>

                {/* Photos */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="w-full p-3 border cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  />
                </div>
              </>
          )
          }
          
          {/* Condition */}
          <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <div className="flex flex-wrap gap-4">
                    {['Bad', 'Average', 'Good'].map((condition) => (
                      <label key={condition} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="condition"
                          value={condition.toLowerCase()}
                          checked={formData.condition === condition.toLowerCase()}
                          onChange={handleChange}
                          className="w-4 h-4 cursor-pointer text-[#fdb604] border-gray-300 focus:ring-[#fdb604]"
                        />
                        <span className="ml-2 text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  />
                </div>

                {/* Expected Price */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  />
                </div>

                {/* Payment */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Payment</label>
                  <div className="flex flex-wrap gap-4">
                    {['UPI', 'Bank Transfer', 'Cash'].map((paymentMethod) => (
                      <label key={paymentMethod} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value={paymentMethod.toLowerCase()}
                          checked={formData.payment === paymentMethod.toLowerCase()}
                          onChange={handleChange}
                          className="w-4 h-4 cursor-pointer text-[#fdb604] border-gray-300 focus:ring-[#fdb604]"
                        />
                        <span className="ml-2 text-sm text-gray-700">{paymentMethod}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  ></textarea>
                </div>

                {/* Pin Code */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Alternative)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fdb604] focus:outline-none"
                  />
                </div>
          
          {/* Submit Button */}
          <div className="col-span-2">
            {/* Checkbox */}
            <div className="col-span-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="secure_details"
                      checked={formData.secure_details}
                      onChange={handleChange}
                      className="w-5 cursor-pointer h-5 text-[#fdb604] border-gray-300 rounded focus:ring-[#fdb604]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Keep my details secure</span>
                  </label>
                </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#fdb604] text-black rounded-lg hover:bg-[#cda84a] transition-all"
            >
              Post Your Book Advertisement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellBooks;
