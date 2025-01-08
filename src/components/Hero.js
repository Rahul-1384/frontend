import { ReactTyped as Typed } from "react-typed"; 
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import hero from "../images/hero-bg.png";
import "./hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
    const [isChatbotVisible, setChatbotVisible] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you today?" },
    ]);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const toggleChatbot = () => {
        setChatbotVisible(!isChatbotVisible);
    };

    useEffect(() => {
        if (isChatbotVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isChatbotVisible]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (userInput.trim() === "") return;

        setMessages([...messages, { sender: "user", text: userInput }]);
        setUserInput("");

        setIsTyping(true);

        try {
            const response = await axios.post("http://localhost:5000/chatbot", {
                message: userInput,
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: response.data.response },
            ]);
        } catch (error) {
            console.error("Error calling API:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };


    const [isModalVisible, setModalVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const openModal = () => {
        setIsClosing(false); // Reset closing animation
        setModalVisible(true); // Open modal
    };

    const closeModal = () => {
        setIsClosing(true); // Start closing animation
        setTimeout(() => {
            setModalVisible(false); // Hide modal after animation
        }, 300); // Match animation duration
    };

    return (
        <div className="relative">
            <img src={hero} alt="Hero-bg" className="w-full h-auto object-cover img-fluid relative"/>
            <p className="text-[#866a22] font-bold text-[0.5rem] absolute top-[27%] left-[36.8%] text-center max-w-[6rem] xxxsm:text-[0.6rem] xxxsm:max-w-[7rem] xxsm:text-[0.7rem] xxsm:max-w-[8rem] xsm:text-[0.8rem] xsm:max-w-[9rem] sm:text-[1rem] sm:max-w-[12rem] md:text-[1.2rem] md:max-w-[15rem] lg:text-[1.8rem] lg:left-[38%] lg:top-[29%] lg:max-w-[23rem] xl:text-[2rem] xl:left-[38%] xl:top-[27%] xl:max-w-[23rem]">
                <Typed strings={["Turning old books into new opportunities."]} typeSpeed={50} backSpeed={30} backDelay={1000} loop={false}/>
            </p>
            <span className="absolute top-[58%] left-[47.5%] font-bold text-[#fdb604] text-[0.5rem] xsm:text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl xxl:text-2xl">
                Ask AI
            </span>
            <div class="indicator">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="flex items-center justify-around absolute top-[65%] w-[100%] h-auto text-[0.5rem] m-auto ">
                <div className="flex gap-4 ">
                    <NavLink className="button-style no-underline text-neutral-50 px-[0.4rem] py-[0.1rem] border-1 border-white rounded-lg outline-none font-bold backdrop-filter backdrop-blur-lg xxxsm:text-[0.5rem] xxsm:text-[0.6rem] xsm:text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl xxl:text-3xl " to="/buy">Buy Now</NavLink>
                    <NavLink className="button-style no-underline text-neutral-50 px-[0.4rem] py-[0.1rem] border-1 border-white rounded-lg outline-none font-bold backdrop-filter backdrop-blur-lg xxxsm:text-[0.5rem] xxsm:text-[0.6rem] xsm:text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl xxl:text-3xl " to="/buy">E-Books</NavLink>
                </div>
                <div className="flex gap-4">
                    <button onClick={openModal} className="button-style no-underline text-neutral-50 px-[0.4rem] py-[0.1rem] border-1 border-white rounded-lg outline-none font-bold backdrop-filter backdrop-blur-lg xxxsm:text-[0.5rem] xxsm:text-[0.6rem] xsm:text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl xxl:text-3xl">Sell Now</button>
                    <NavLink className="button-style no-underline text-neutral-50 px-[0.4rem] py-[0.1rem] border-1 border-white rounded-lg outline-none font-bold backdrop-filter backdrop-blur-lg xxxsm:text-[0.5rem] xxsm:text-[0.6rem] xsm:text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl xxl:text-3xl " to="/buy">E-Books</NavLink>
                </div>
            </div>


            {isModalVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal} // Close modal when clicking outside
                >
                    <div
                        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative transition-all ${
                            isClosing ? "modal-close" : "modal-open"
                        }`}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            <i className="fa-solid fa-xmark text-2xl"></i>
                        </button>

                        {/* Modal Content */}
                        <h2 className="text-2xl font-bold mb-4">Choose an Option</h2>
                        <div className="flex justify-around">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Buy Course
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                Buy Individual
                            </button>
                        </div>
                    </div>
                </div>
            )}



            <div className="clickable absolute top-[77%] left-[46.9%] rounded-full w-6 h-7 cursor-pointer hover:scale-110 transition-transform" onClick={toggleChatbot}></div>

            {isChatbotVisible && (
                <div className="chatbot fixed z-[200] bottom-20 right-10 bg-white shadow-lg rounded-lg w-80 sm:w-72 md:w-96 lg:w-[24rem] xl:w-[28rem] p-4 animate-slide-in max-w-full sm:bottom-10 sm:right-5">
                    <div className="chatbot-header bg-lime-500 text-white p-3 rounded-t-lg font-bold flex justify-between items-center">
                        Chatbot
                        <button className="text-white text-sm bg-transparent" onClick={() => setChatbotVisible(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className="chatbot-messages  h-56 sm:h-40 md:h-48 lg:h-60 overflow-y-auto p-2 border-b">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right text-blue-600" : "text-left text-gray-600"} animate-fade-in`}>
                                <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="text-gray-400 text-left animate-fade-in">
                                Typing...
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className="chatbot-input flex mt-2">
                        <input ref={inputRef} type="text" placeholder="Type a message..." className="flex-grow p-2 border rounded-l-md focus:outline-none text-sm sm:text-base" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}/>
                        <button className="button-style border-2 text-black px-4 py-2 rounded-r-md transition text-sm sm:text-base" onClick={handleSendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Hero;
