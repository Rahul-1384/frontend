import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [emailInput, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', { name, emailInput, message });

    // sendMessage({ name, emailInput, message });

    setFormSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="bg-white p-8 py-20">
      <div className="text-2xl font-bold text-center text-[#001E28] mb-6 tracking-wide md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl">Contact Us</div>

      <div className="mt-6">
        <div className="text-sm text-center font-semibold mb-4 text-gray-400 md:text-xl">Have a question? Send us a message:</div>
        
        {formSubmitted && (
          <p className="text-green-500 text-center mb-4">Thank you for your message! We will get back to you soon.</p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 md:w-[60%] md:m-auto">
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={emailInput}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea 
            placeholder="Your Message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
