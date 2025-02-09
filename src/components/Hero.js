import React, { useState, useEffect, useRef } from 'react';
import { ReactTyped as Typed } from "react-typed";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Library, BookOpen, BookCopy, Send } from 'lucide-react';

const Hero = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const paragraphs = [
    "Turning old books into new opportunities.",
    "Bringing knowledge to your doorstep.",
    "Innovating the way we read and learn.",
    "Preserving the past for a brighter future."
  ];

  // Existing handlers and effects...
  const toggleChatbot = () => setChatbotVisible(!isChatbotVisible);
  const openModal = () => {
    setIsClosing(false);
    setModalVisible(true);
  };
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => setModalVisible(false), 300);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;
    setMessages(prev => [...prev, { sender: "user", text: userInput }]);
    setUserInput("");
    setIsTyping(true);
    try {
      const response = await axios.post("http://localhost:5000/chatbot", {
        message: userInput,
      });
      setMessages(prev => [...prev, { sender: "bot", text: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (isChatbotVisible && inputRef.current) inputRef.current.focus();
  }, [isChatbotVisible]);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0F0326] via-[#2B0548] to-[#290066] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/5 rounded-full animate-float"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="min-h-screen flex flex-col items-center justify-center">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text text-pink-300 mb-8 animate-text-shine">
              Bookefy
            </h1>
            <div className="text-xl md:text-3xl text-purple-200 font-medium mb-12 h-20">
              <Typed
                strings={paragraphs}
                typeSpeed={50}
                backSpeed={30}
                backDelay={2000}
                loop={true}
                className="inline-block"
              />
            </div>

            {/* Main Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              <NavLink to="/products" className="group no-underline">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-4 border-white/10 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <Library className="w-8 h-8 text-purple-300 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">Buy Now</h3>
                  <p className="text-purple-200/80 text-sm">Explore our vast collection of books</p>
                </div>
              </NavLink>

              <NavLink to="/ebooks" className="group no-underline">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-4 border-white/10 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <BookOpen className="w-8 h-8 text-purple-300 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">E-Books</h3>
                  <p className="text-purple-200/80 text-sm">Digital reading experience</p>
                </div>
              </NavLink>

              <NavLink to="/rent" className="group no-underline">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-4 border-white/10 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <BookOpen className="w-8 h-8 text-purple-300 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">Rent Books</h3>
                  <p className="text-purple-200/80 text-sm">Enables you to rent books for a short period</p>
                </div>
              </NavLink>

              <button onClick={openModal} className="group no-underline">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-4 border-white/10 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <Send className="w-8 h-8 text-purple-300 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">Sell Now</h3>
                  <p className="text-purple-200/80 text-sm">Turn your books into cash</p>
                </div>
              </button>

              <NavLink to="/donate" className="group no-underline col-span-1 lg:col-span-2">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-4 border-white/10 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <BookCopy className="w-8 h-8 text-purple-300 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">Donate Now</h3>
                  <p className="text-purple-200/80 text-sm">Donate books to those in need</p>
                </div>
              </NavLink>

              <NavLink to="/manga" className="group no-underline col-span-1 lg:col-span-2">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-4 border-white/10 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <BookCopy className="w-8 h-8 text-purple-300 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">Manga</h3>
                  <p className="text-purple-200/80 text-sm">Japanese comic collection</p>
                </div>
              </NavLink>
            </div>

            {/* Call to Action */}
            <NavLink 
              to="/sell" 
              className="inline-flex no-underline items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 group"
            >
              Start Selling Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </NavLink>
          </div>
        </div>

        {/* Chat Button */}
        <button
          onClick={toggleChatbot}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ask AI
          </span>
        </button>

        {/* Chatbot Panel */}
        {isChatbotVisible && (
          <div className="fixed bottom-10 right-2 w-88 bg-white rounded-lg shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">AI Assistant</h3>
                <button 
                  onClick={() => setChatbotVisible(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } max-w-[80%]`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-500 animate-pulse">AI is typing...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
            <div 
              className={`bg-white rounded-2xl p-6 m-4 max-w-md w-full transform transition-all duration-300 ${
                isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Choose Your Path
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <NavLink
                  to="/sell"
                  className="no-underline px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-center font-medium hover:opacity-90 transition-opacity"
                >
                  Sell Course
                </NavLink>
                <NavLink
                  to="/sell"
                  className="no-underline px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-center font-medium hover:opacity-90 transition-opacity"
                >
                  Sell Individual
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;