import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => setChatbotVisible(!isChatbotVisible);

  return (
    <ChatContext.Provider value={{ isChatbotVisible, toggleChatbot }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatbot = () => useContext(ChatContext);