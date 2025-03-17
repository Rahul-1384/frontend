import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <ChatContext.Provider value={{ isChatbotOpen, toggleChatbot, closeChatbot }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatProvider');
  }
  return context;
};