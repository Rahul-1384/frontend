import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, AlertCircle, Check, X, User, AtSign, HelpCircle, MessageSquare as MessageIcon } from 'lucide-react';

const ContactSection = ({ icon: Icon, title, children }) => (
  <div className="flex items-start space-x-4 p-6 rounded-xl hover:bg-blue-100 transition-all duration-300">
    <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="mt-2 text-gray-600">{children}</div>
    </div>
  </div>
);

const FormField = ({ label, error, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 ml-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        {...props}
        className={`
          w-full bg-white rounded-xl border-2 transition-all duration-200
          ${Icon ? 'pl-12 pr-4' : 'px-4'} py-3
          ${error ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}
          focus:outline-none focus:ring-4 ${error ? 'focus:ring-red-100' : 'focus:ring-blue-100'}
        `}
      />
      {error && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
          <AlertCircle className="w-5 h-5" />
        </div>
      )}
    </div>
    {error && (
      <p className="text-sm text-red-500 ml-1">{error}</p>
    )}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setNotification({
        type: 'success',
        message: 'Message sent successfully! Well get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Let's Start a Conversation
          </h1>
          <p className="text-lg text-gray-600">
            Have questions or want to collaborate? We're here to help and would love to hear from you.
          </p>
        </div>

        {notification && (
          <div 
            className={`
              fixed top-20 right-6 max-w-md p-4 rounded-xl shadow-lg flex items-center gap-3
              animate-slide-in-right
              ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
            `}
          >
            {notification.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="flex-1">{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <ContactSection icon={Mail} title="Email Us">
              <a href="mailto:bookefy2k25@gmail.com" className="text-blue-600 no-underline hover:text-blue-700">
                bookefy2k25@gmail.com
              </a>
            </ContactSection>

            <ContactSection icon={Phone} title="Call Us">
              <p>Support: +91 XXXXXXXXXX</p>
            </ContactSection>

            <ContactSection icon={MapPin} title="Visit Our Office">
              <p>Goverdhan Chauraha</p>
              <p>Mathura NH-19</p>
              <p>U.P, India 281001</p>
            </ContactSection>

            <ContactSection icon={MessageSquare} title="Live Chat">
              <p>Available Monday to Saturday</p>
              <p>9:00 AM - 7:00 PM IST</p>
            </ContactSection>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                label="Your Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Full Name"
                disabled={isSubmitting}
                icon={User}
              />

              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Email"
                disabled={isSubmitting}
                icon={AtSign}
              />
            </div>

            <FormField
              label="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              placeholder="What's this about?"
              disabled={isSubmitting}
              icon={HelpCircle}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 ml-1">
                Message
              </label>
              <div className="relative">
                <div className="absolute left-4 top-5 text-gray-400">
                  <MessageIcon className="w-5 h-5" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`
                    w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 transition-all duration-200
                    ${errors.message ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}
                    focus:outline-none focus:ring-4 ${errors.message ? 'focus:ring-red-100' : 'focus:ring-blue-100'}
                  `}
                  placeholder="Tell us how we can help..."
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <div className="absolute right-3 top-3 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              {errors.message && (
                <p className="text-sm text-red-500 ml-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium
                hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;