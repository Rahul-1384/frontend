import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, TruckIcon, BookOpenIcon, DollarSignIcon, BotIcon, ClipboardIcon, ArrowDownIcon } from 'lucide-react';
import { useChatbot } from '../context/ChatContext';

const HowItWorks = () => {
  const { toggleChatbot } = useChatbot();

  const buySteps = [
    {
      icon: <ShoppingCartIcon className="w-8 h-8" />,
      title: "Choose Your Books",
      description: "Browse our vast collection of quality books at affordable prices"
    },
    {
      icon: <TruckIcon className="w-8 h-8" />,
      title: "Doorstep Delivery",
      description: "Receive your books at your doorstep in secure packaging"
    },
    {
      icon: <BotIcon className="w-8 h-8" />,
      title: "24/7 AI Support",
      description: "Get instant help from our AI chatbot for any queries or assistance"
    }
  ];

  const sellSteps = [
    {
      icon: <ClipboardIcon className="w-8 h-8" />,
      title: "List Your Book",
      description: "Fill a simple form with your book details"
    },
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      title: "Get AI Price Prediction",
      description: "Our AI model suggests the best price for your book"
    },
    {
      icon: <TruckIcon className="w-8 h-8" />,
      title: "Doorstep Pickup",
      description: "Our agent collects the book from your location"
    },
    {
      icon: <DollarSignIcon className="w-8 h-8" />,
      title: "Instant Payment",
      description: "Receive immediate payment via cash or UPI"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const StepCard = ({ icon, title, description, index }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/15 relative overflow-hidden group"
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-red-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <p className="text-lg font-semibold mb-2 text-white group-hover:text-red-500 transition-colors duration-300">{title}</p>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-[#001E28] px-4 py-16 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            How <span className="text-blue-600">Bookefy</span> Works?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Experience the easiest way to buy and sell books with AI-powered pricing and doorstep service
          </p>
        </motion.div>

        <div className="space-y-20">
          {/* Buy Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <ShoppingCartIcon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white text-center">
                Buying a Book
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {buySteps.map((step, index) => (
                <StepCard key={`buy-${index}`} {...step} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Animated Divider */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-red-500/20 p-3 rounded-full">
              <ArrowDownIcon className="w-8 h-8 text-red-500 animate-bounce" />
            </div>
          </motion.div>

          {/* Sell Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <BookOpenIcon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white text-center">
                Selling a Book
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellSteps.map((step, index) => (
                <StepCard key={`sell-${index}`} {...step} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Enhanced AI Help Banner */}
          <motion.div 
            onClick={toggleChatbot}
            className="group relative overflow-hidden bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl p-8 text-center cursor-pointer hover:scale-105 transition-all duration-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Shine effect overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <BotIcon className="w-12 h-12 text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                Need Help? Our AI Assistant is Here!
              </h3>
              <p className="text-gray-300">
                Click here to get instant support 24/7 for any questions about buying, selling, or book recommendations
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;