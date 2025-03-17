import React from "react";
import { X } from "lucide-react";

const AuthErrorModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  // Prevent modal from closing when clicking inside the content
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose} // Clicking outside closes modal
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden animate-fadeIn"
        style={{ animation: "0.3s ease-out forwards scaleIn" }}
        onClick={handleModalClick} // Prevent modal close when clicking inside
      >
        {/* Header */}
        <div className="bg-red-600 p-4 flex justify-between items-center">
          <h3 className="text-white font-medium text-lg">Authentication Required</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="text-white hover:text-gray-200 focus:outline-none transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-5a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <h4 className="text-gray-800 font-medium text-lg mb-2">Please log in to continue</h4>
            <p className="text-gray-600 text-center">You need to be logged in to add items to your cart. Please log in or create an account to continue shopping.</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex-1"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onLogin();
              }}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-1 font-medium"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorModal;
