import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader, Minimize2, Maximize2 } from 'lucide-react';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && chatContainerRef.current) {
        chatContainerRef.current.style.maxHeight = `${window.innerHeight * 0.7}px`;
      } else if (chatContainerRef.current) {
        chatContainerRef.current.style.maxHeight = '26rem'; // 416px
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: messages.length + 1, text: inputValue, isBot: false };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API call to get AI response
    try {
      setTimeout(() => {
        const botResponses = [
          "I'd be happy to help with that!",
          "Great question! Let me find that information for you.",
          "Thanks for asking. Here's what I know about that.",
          "Let me suggest some books that might interest you based on your question."
        ];
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botMessage = { id: messages.length + 2, text: randomResponse, isBot: true };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        id: messages.length + 2, 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        isBot: true 
      }]);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-8 z-50 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center gap-2">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-medium">BookAI Assistant</span>
          <div className="flex gap-1 ml-2">
            <button 
              onClick={toggleMinimize} 
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <Maximize2 size={16} />
            </button>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 sm:bottom-20 right-0 sm:right-8 z-50 w-full sm:w-full sm:max-w-sm bg-white rounded-t-lg sm:rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-medium">BookAI Assistant</h3>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={toggleMinimize}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 size={16} />
          </button>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="h-96 sm:h-96 overflow-y-auto p-3 bg-gray-50"
        style={{ maxHeight: 'calc(70vh - 110px)' }}
      >
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`p-2 sm:p-3 rounded-lg max-w-[85%] text-sm sm:text-base ${
                message.isBot 
                  ? 'bg-gray-200 text-gray-800 rounded-tl-none' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-tr-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="bg-gray-200 p-2 sm:p-3 rounded-lg rounded-tl-none flex items-center text-sm sm:text-base">
              <Loader size={14} className="animate-spin mr-2" />
              <span>Typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-2 sm:p-3 border-t flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputValue.trim()}
          className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-white disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;