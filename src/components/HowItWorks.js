import React from 'react';
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

  const StepCard = ({ icon, title, description }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/15">
      <div className="text-red-500 mb-4">
        {icon}
      </div>
      <p className="text-lg font-semibold mb-2 text-white">{title}</p>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="bg-[#001E28] px-4 py-16 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-4">
          How <span className="text-blue-600">Bookefy</span> Works?
        </p>
        <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Experience the easiest way to buy and sell books with AI-powered pricing and doorstep service
        </p>

        <div className="space-y-20">
          {/* Buy Section */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <ShoppingCartIcon className="w-6 h-6 text-red-500" />
              <p className="text-xl md:text-2xl font-semibold text-white text-center">
                Buying a Book
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {buySteps.map((step, index) => (
                <StepCard key={`buy-${index}`} {...step} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center">
            <ArrowDownIcon className="w-8 h-8 text-red-500 animate-bounce" />
          </div>

          {/* Sell Section */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <BookOpenIcon className="w-6 h-6 text-red-500" />
              <p className="text-xl md:text-2xl font-semibold text-white text-center">
                Selling a Book
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellSteps.map((step, index) => (
                <StepCard key={`sell-${index}`} {...step} />
              ))}
            </div>
          </div>

          {/* AI Help Banner */}
<div 
  onClick={toggleChatbot}
  className="group relative overflow-hidden bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl p-8 text-center cursor-pointer hover:scale-105 transition-all duration-700"
>
  {/* Single shine effect overlay */}
  <div 
    className="absolute inset-0 opacity-1 group-hover:opacity-100 transition-opacity duration-700"
  >
    <div 
      className="absolute  inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/100 to-transparent"
    />
    <div 
      className="absolute  delay-200 inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/100 to-transparent"
    />
  </div>

  {/* Content */}
  <div className="relative z-0">
    <div className="flex justify-center mb-4">
      <BotIcon className="w-12 h-12 text-red-500" />
    </div>
    <p className="text-xl font-semibold text-white mb-2">
      Need Help? Our AI Assistant is Here!
    </p>
    <p className="text-gray-300">
      Click here to get instant support 24/7 for any questions about buying, selling, or book recommendations
    </p>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;









































































// import React from 'react';
// import { ShoppingCartIcon, TruckIcon, BookOpenIcon, DollarSignIcon, BotIcon, ClipboardIcon, ArrowDownIcon } from 'lucide-react';

// const HowItWorks = ({ onOpenChat }) => {
//   const buySteps = [
//     {
//       icon: <ShoppingCartIcon className="w-8 h-8" />,
//       title: "Choose Your Books",
//       description: "Browse our vast collection of quality books at affordable prices",
//       color: "from-blue-500/20 to-purple-500/20"
//     },
//     {
//       icon: <TruckIcon className="w-8 h-8" />,
//       title: "Doorstep Delivery",
//       description: "Receive your books at your doorstep in secure packaging",
//       color: "from-purple-500/20 to-pink-500/20"
//     },
//     {
//       icon: <BotIcon className="w-8 h-8" />,
//       title: "24/7 AI Support",
//       description: "Get instant help from our AI chatbot for any queries or assistance",
//       color: "from-pink-500/20 to-red-500/20"
//     }
//   ];

//   const sellSteps = [
//     {
//       icon: <ClipboardIcon className="w-8 h-8" />,
//       title: "List Your Book",
//       description: "Fill a simple form with your book details",
//       color: "from-red-500/20 to-orange-500/20"
//     },
//     {
//       icon: <BookOpenIcon className="w-8 h-8" />,
//       title: "Get AI Price Prediction",
//       description: "Our AI model suggests the best price for your book",
//       color: "from-orange-500/20 to-yellow-500/20"
//     },
//     {
//       icon: <TruckIcon className="w-8 h-8" />,
//       title: "Doorstep Pickup",
//       description: "Our agent collects the book from your location",
//       color: "from-yellow-500/20 to-green-500/20"
//     },
//     {
//       icon: <DollarSignIcon className="w-8 h-8" />,
//       title: "Instant Payment",
//       description: "Receive immediate payment via cash or UPI",
//       color: "from-green-500/20 to-blue-500/20"
//     }
//   ];

//   const StepCard = ({ icon, title, description, color }) => (
//     <div className={`bg-gradient-to-br ${color} backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl border border-white/10`}>
//       <div className="text-white bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-4 mb-4 shadow-lg">
//         {icon}
//       </div>
//       <p className="text-lg font-semibold mb-2 text-white">{title}</p>
//       <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
//     </div>
//   );

//   return (
//     <div className="bg-gradient-to-b from-[#001E28] to-[#002838] px-4 py-16 md:px-8 lg:px-16">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center space-y-4 mb-16">
//           <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//             How Bookefy Works?
//           </p>
//           <p className="text-gray-300 max-w-2xl mx-auto text-lg">
//             Experience the easiest way to buy and sell books with AI-powered pricing and doorstep service
//           </p>
//         </div>

//         <div className="space-y-20">
//           {/* Buy Section */}
//           <div className="transform hover:scale-[1.01] transition-transform duration-300">
//             <div className="flex items-center justify-center gap-3 mb-8">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
//                 <ShoppingCartIcon className="w-6 h-6 text-white" />
//               </div>
//               <p className="text-xl md:text-2xl font-semibold text-white text-center">
//                 Buying a Book
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {buySteps.map((step, index) => (
//                 <StepCard key={`buy-${index}`} {...step} />
//               ))}
//             </div>
//           </div>

//           {/* Animated Divider */}
//           <div className="flex justify-center">
//             <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce">
//               <ArrowDownIcon className="w-6 h-6 text-white" />
//             </div>
//           </div>

//           {/* Sell Section */}
//           <div className="transform hover:scale-[1.01] transition-transform duration-300">
//             <div className="flex items-center justify-center gap-3 mb-8">
//               <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
//                 <BookOpenIcon className="w-6 h-6 text-white" />
//               </div>
//               <p className="text-xl md:text-2xl font-semibold text-white text-center">
//                 Selling a Book
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {sellSteps.map((step, index) => (
//                 <StepCard key={`sell-${index}`} {...step} />
//               ))}
//             </div>
//           </div>

//           {/* AI Help Banner */}
//           <button 
//             onClick={onOpenChat}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group"
//           >
//             <div className="flex justify-center mb-4">
//               <div className="bg-white/10 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
//                 <BotIcon className="w-12 h-12 text-white" />
//               </div>
//             </div>
//             <p className="text-xl font-semibold text-white mb-2">
//               Need Help? Our AI Assistant is Here!
//             </p>
//             <p className="text-gray-200">
//               Get instant support 24/7 for any questions about buying, selling, or book recommendations
//             </p>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HowItWorks;