import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaFacebookF, FaInstagram, FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AuthenticationUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.password2) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const url = isLogin ? 'http://127.0.0.1:8000/api/auth/login/' : 'http://127.0.0.1:8000/api/auth/register/';
    setIsLoading(true); // Show loader when the form is submitted

    try {
      console.log("Form Data:", formData);
      const response = await axios.post(url, formData);
      console.log(response.data);
      setErrorMessage(''); // Clear error message on successful response
      alert(response.data.message);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false); // Remove loader after submission is complete
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-lg border border-white/30">
        <p className="text-3xl font-semibold text-center text-gray-900 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  required={!isLogin}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          {isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                required={isLogin}
              />
            </div>
          )}

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none pr-10"
              required
            />
            {isLogin && (
              <div className="flex justify-end">
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </div>
            )}
            <span
              className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>

          {!isLogin && (
            <div className="mb-4 relative">
              <label htmlFor="password2" className="block text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none pr-10"
                required={!isLogin}
              />
              <span
                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-900">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={toggleForm}
              className="ml-1 text-blue-500 hover:underline focus:outline-none"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-900">Or sign in with</p>
          <div className="flex flex-col items-center justify-center mt-4 gap-2">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center gap-2 w-[100%] justify-center px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
            >
              <FaGoogle /> Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center gap-2 w-[100%] justify-center px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              <FaFacebookF /> Facebook
            </button>
            <button
              onClick={() => handleSocialLogin('instagram')}
              className="flex items-center gap-2 w-[100%] justify-center px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none"
            >
              <FaInstagram /> Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationUser;
