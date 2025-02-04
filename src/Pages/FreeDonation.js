import React, { useState } from 'react';
import { Gift } from 'lucide-react';

const FreeDonation = () => {
  const [donationDetails, setDonationDetails] = useState({
    title: '',
    author: '',
    condition: '',
    name: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and submission logic
    console.log('Donation Submitted:', donationDetails);
  };

  return (
    <div className="max-w-md mx-auto my-[100px] p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <Gift className="text-blue-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-blue-600">Donate Books</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={donationDetails.title}
          onChange={handleInputChange}
          placeholder="Book Title"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        
        <input
          type="text"
          name="author"
          value={donationDetails.author}
          onChange={handleInputChange}
          placeholder="Author"
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <select
          name="condition"
          value={donationDetails.condition}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select Book Condition</option>
          <option value="new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>

        <input
          type="text"
          name="name"
          value={donationDetails.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <input
          type="email"
          name="email"
          value={donationDetails.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Book Donation
        </button>
      </form>
    </div>
  );
};

export default FreeDonation;