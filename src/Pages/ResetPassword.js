import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './resetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://your-backend-api.com/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Your password has been reset successfully.");
        setError("");
      } else {
        setError(data.error || "Failed to reset password. Please try again.");
        setMessage("");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div className="p-3 text-green-700 bg-green-100 rounded-lg">
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute top-10 right-3 text-gray-600"
            >
              {passwordVisible ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute top-10 right-3 text-gray-600"
            >
              {confirmPasswordVisible ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="ld-ripple">
                <div></div>
                <div></div>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
