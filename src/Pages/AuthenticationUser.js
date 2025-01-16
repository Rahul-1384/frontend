import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaFacebookF, FaInstagram, FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthenticationUser = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);  // State for showing/hiding password

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
      const response = await axios.post(url, formData);
      alert(response.data.message);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error(error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-lg border border-white/30">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
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
          )}

          {isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
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
            {/* Eye Icon to toggle password visibility, centered vertically */}
            <span
              className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
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
