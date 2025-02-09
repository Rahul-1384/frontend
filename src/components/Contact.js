import React, { useState } from 'react';

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: false, message: '' });

    try {
      // Simulated API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example API call structure:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitStatus({
        success: true,
        error: false,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        success: false,
        error: true,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-gray-600">
            Have a question? Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        {(submitStatus.success || submitStatus.error) && (
          <div className={`mb-6 p-4 rounded-lg ${
            submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;