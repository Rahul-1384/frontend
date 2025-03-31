import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MessageCircle, HelpCircle, BookOpen, ShoppingCart, Search, AlertTriangle } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Common issues and their solutions
  const faqData = {
    general: [
      {
        id: 'gen1',
        question: 'How do I search for books?',
        answer: 'You can search for books using the search bar at the top of the main page. Enter keywords like the book title, author name, or category to find relevant books. You can also use filters to narrow down your search results.'
      },
      {
        id: 'gen2',
        question: 'How do I filter search results?',
        answer: 'On the main page, you can filter books by board, category, subject, language, condition, and more. Select your preferred filters from the sidebar menu. To clear all filters, click the "Reset Filters" button that appears when no books match your current filters.'
      },
      {
        id: 'gen3',
        question: 'How do I create an account?',
        answer: 'Click on the "Sign Up" button in the navigation bar. Fill in your details including name, email, and password. Verify your email address through the link sent to your inbox, and you\'re all set!'
      }
    ],
    errors: [
      {
        id: 'err1',
        question: 'I\'m seeing "No books found"',
        answer: 'This message appears when your search or filter criteria don\'t match any books in our inventory. Try broadening your search terms or resetting filters by clicking the "Reset Filters" button below the message.'
      },
      {
        id: 'err2',
        question: 'I\'m getting connection errors',
        answer: 'If you see "You\'re offline" or connection error messages, check your internet connection first. If you\'re connected to the internet but still seeing errors, try refreshing the page or clearing your browser cache. If problems persist, our servers might be experiencing issues - please try again later.'
      },
      {
        id: 'err3',
        question: 'The site is running slowly',
        answer: 'This could be due to a slow internet connection or heavy traffic on our site. Try refreshing the page or revisiting later. You can also try clearing your browser cache or using a different browser.'
      }
    ],
    orders: [
      {
        id: 'ord1',
        question: 'How do I place an order?',
        answer: 'To place an order, find the book you want to purchase, click "Add to Cart". Review your cart by clicking the cart icon in the navigation bar. When ready, proceed to checkout, enter your shipping and payment information, and confirm your order.'
      },
      {
        id: 'ord2',
        question: 'How can I track my order?',
        answer: 'You can track your order by logging into your account and navigating to "My Orders". Click on the specific order you want to track, and you\'ll see its current status and shipping details.'
      },
      {
        id: 'ord3',
        question: 'How do I cancel my order?',
        answer: 'To cancel an order, go to "My Orders" in your account, find the order you wish to cancel, and click the "Cancel Order" button. Note that you can only cancel orders that haven\'t been shipped yet. For shipped orders, you\'ll need to follow our return process.'
      }
    ]
  };

  const handleQuestionClick = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white min-h-screen">
      {/* Back button */}
      <Link to="/products" className="no-underline flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Books
      </Link>

      <div className="text-center mb-8">
        <HelpCircle size={48} className="mx-auto text-blue-500 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Help Center</h1>
        <p className="text-gray-600 mt-2">Find answers to common questions and issues</p>
      </div>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar for tabs on desktop, top tabs on mobile */}
        <div className="md:w-1/4">
          <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              className={`p-3 rounded-lg flex items-center ${activeTab === 'general' ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-gray-50 hover:bg-gray-100'} whitespace-nowrap`}
              onClick={() => setActiveTab('general')}
            >
              <BookOpen size={18} className="mr-2" />
              General Help
            </button>
            <button
              className={`p-3 rounded-lg flex items-center ${activeTab === 'errors' ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-gray-50 hover:bg-gray-100'} whitespace-nowrap`}
              onClick={() => setActiveTab('errors')}
            >
              <AlertTriangle size={18} className="mr-2" />
              Error Solutions
            </button>
            <button
              className={`p-3 rounded-lg flex items-center ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-gray-50 hover:bg-gray-100'} whitespace-nowrap`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart size={18} className="mr-2" />
              Orders & Shipping
            </button>
          </div>
        </div>

        {/* Right content area */}
        <div className="md:w-3/4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              {activeTab === 'general' && 'Frequently Asked Questions'}
              {activeTab === 'errors' && 'Common Error Solutions'}
              {activeTab === 'orders' && 'Orders & Shipping Help'}
            </h2>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {faqData[activeTab].map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50"
                    onClick={() => handleQuestionClick(item.id)}
                  >
                    <span className="font-medium">{item.question}</span>
                    <span className={`transform transition-transform ${activeQuestion === item.id ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {activeQuestion === item.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact section */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
            <p className="mb-4 text-gray-700">If you couldn't find an answer to your question, our support team is here to help.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <NavLink href="mailto:support@bookstore.com" className="no-underline flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition">
                <Mail size={24} className="text-blue-500 mb-2" />
                <p className="font-medium">Email Us</p>
                <p className="text-sm text-gray-500 text-center">supportBookose@gmail.com</p>
              </NavLink>
              
              <NavLink href="tel:+18001234567" className="no-underline flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition">
                <Phone size={24} className="text-blue-500 mb-2" />
                <p className="font-medium">Call Us</p>
                <p className="text-sm text-gray-500">+91 XXXXX XXXXX</p>
              </NavLink>
              
              <button className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition">
                <MessageCircle size={24} className="text-blue-500 mb-2" />
                <p className="font-medium text-blue-500">Live Chat</p>
                <p className="text-sm text-gray-500">Available<br /> 10:00 AM-08:00 PM</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;