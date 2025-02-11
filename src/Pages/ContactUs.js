import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './contactus.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.fullName.trim()) validationErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^[\w.%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      validationErrors.email = "Invalid email address.";
    }
    if (!formData.message.trim()) validationErrors.message = "Message is required.";
    return validationErrors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatusMessage("Submitting...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage("Message sent successfully!");
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        setStatusMessage("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
        <Navbar />
        <div className="relative bg-gray-800 text-white py-12 bg-contact-bg bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent rounded-t-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-transparent to-transparent rounded-t-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent rounded-t-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent rounded-t-xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="heading text-4xl font-bold text-center mb-8">Get In Touch</h2>
        <p className="subHeading text-center text-gray-200 mb-12">
          We'd love to hear from you! Fill out the form below or contact us directly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section: Contact Details */}
            <div className="left-section bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Contact Details</h3>
            <div className="space-y-6">
                <ContactDetail icon="fas fa-map-marker-alt" text="ReBook Store, Goverdhan Chauraha, Mathura, UP, India 281502" />
                <ContactDetail icon="fas fa-phone-alt" text="+91 73822 83721" />
                <ContactDetail icon="fas fa-envelope" text="ReBook2025@gmail.com" />
            </div>
            {/* Social Media Links */}
            <div className="social-media mt-8">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="no-underline w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-75 transition duration-200">
                    <i className="fab fa-facebook-f text-white text-lg"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="no-underline w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 hover:scale-75 transition duration-200">
                    <i className="fab fa-instagram text-white text-lg"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="no-underline w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 hover:scale-75 transition duration-200">
                    <i className="fab fa-twitter text-white text-lg"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="no-underline w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 hover:scale-75 transition duration-200">
                    <i className="fab fa-linkedin-in text-white text-lg"></i>
                </a>
                </div>
            </div>
            </div>


          {/* Right Section: Contact Form */}
          <div className="right-section bg-white p-8 rounded-lg shadow-lg text-gray-800">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            {statusMessage && (
              <StatusMessage
                message={statusMessage}
                type={statusMessage.includes("success") ? "success" : "error"}
              />
            )}
            <form onSubmit={handleFormSubmit}>
              <FormInput
                label="Full Name"
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
              />
              <FormInput
                label="Email Address"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <FormTextarea
                label="Message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                error={errors.message}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

const ContactDetail = ({ icon, text }) => (
  <div className="flex items-center">
    <p className="w-12 h-12 bg-blue-600 transition-all duration-200 rounded-full flex items-center justify-center">
      <i className={`${icon} text-white text-lg`}></i>
    </p>
    <p className="ml-4 w-96">{text}</p>
  </div>
);

const StatusMessage = ({ message, type }) => (
  <div
    className={`p-3 mb-4 rounded ${
      type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`}
  >
    {message}
  </div>
);

const FormInput = ({ label, id, type, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
      placeholder={`Your ${label}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormTextarea = ({ label, id, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows="4"
      value={value}
      onChange={onChange}
      className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
      placeholder={`Your ${label}`}
    ></textarea>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default ContactUs;
