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

    
    const paragraphs = [
        "Turning old books into new opportunities.",
        "Bringing knowledge to your doorstep.",
        "Innovating the way we read and learn.",
        "Preserving the past for a brighter future."
    ];

    return (
        <div className="relative">
            <img loading="lazy" src={hero} alt="Hero-bg" className="w-full h-auto object-cover img-fluid relative"/>
            <p className="text-[#866a22] font-bold text-[0.5rem] absolute top-[27%] left-[36.8%] text-center max-w-[6rem] xxxsm:text-[0.6rem] xxxsm:max-w-[7rem] xxsm:text-[0.7rem] xxsm:max-w-[8rem] xsm:text-[0.8rem] xsm:max-w-[9rem] sm:text-[1rem] sm:max-w-[12rem] md:text-[1.2rem] md:max-w-[15rem] lg:text-[1.8rem] lg:left-[38%] lg:top-[29%] lg:max-w-[23rem] xl:text-[2rem] xl:left-[38%] xl:top-[27%] xl:max-w-[23rem]">
      <Typed
        strings={paragraphs}
        typeSpeed={50}
        backSpeed={30}
        backDelay={2000}
        loop={true}
        showCursor={true}
      />
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

            <div className="flex items-center justify-around absolute top-[65%] z-[10] w-[100%] h-auto text-[0.5rem] m-auto ">
                <div className="flex gap-4 ">
                    <NavLink className="button-style no-underline text-neutral-50 px-[1rem] py-[0.3rem] border-3 bg-black border-white outline-none font-bold  xxxsm:text-[0.3rem] xxsm:text-[0.4rem] xsm:text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9rem] xxl:text-[1rem] " to="/products">Buy Now</NavLink>
                    <NavLink className="button-style no-underline text-neutral-50 px-[1rem] py-[0.3rem] border-3 bg-black border-white outline-none font-bold  xxxsm:text-[0.3rem] xxsm:text-[0.4rem] xsm:text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9rem] xxl:text-[1rem] " to="/buy">E-Books</NavLink>
                </div>
                <div className="flex gap-4">
                    <button onClick={openModal} className="button-style no-underline text-neutral-50 px-[1rem] py-[0.3rem] border-3 bg-black border-white outline-none font-bold  xxxsm:text-[0.3rem] xxsm:text-[0.4rem] xsm:text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9rem] xxl:text-[1rem]">Sell Now</button>
                    <NavLink className="button-style no-underline text-neutral-50 px-[1rem] py-[0.3rem] border-3 bg-black border-white outline-none font-bold  xxxsm:text-[0.3rem] xxsm:text-[0.4rem] xsm:text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9rem] xxl:text-[1rem] " to="/manga">Manga</NavLink>
                </div>
            </div>


            {/* Moving Eyes */}
            <div className="btn-container">
                <div style={{"--a": 0}} className="btn-sensor sensor-n"></div>
                <div style={{"--a": 45}} className="btn-sensor sensor-ne"></div>
                <div style={{"--a": 90}} className="btn-sensor sensor-e"></div>
                <div style={{"--a": 135}} className="btn-sensor sensor-se"></div>
                <div style={{"--a": 180}} className="btn-sensor sensor-s"></div>
                <div style={{"--a": 225}} className="btn-sensor sensor-sw"></div>
                <div style={{"--a": 270}} className="btn-sensor sensor-w"></div>
                <div style={{"--a": 315}} className="btn-sensor sensor-nw"></div>
                <button className="btn-button">
                    <div className="btn-lid"></div>
                    <div className="btn-pupil"></div>
                </button>
                <div className="clickable absolute z-[100] -top-[10%] -left-[20%] rounded-full w-6 h-7 cursor-pointer  transition-transform" onClick={toggleChatbot}></div>
                <button className="btn-button">
                    <div className="btn-lid"></div>
                    <div className="btn-pupil"></div>
                </button>
            </div>


            {/* Sell you books board */}
            <NavLink to="/sell" className="blinking-text bg-white  absolute px-[0.1rem] top-[21%] right-[14%] no-underline font-bold text-[0.3rem] text-center w-fit xxxsm:text-[0.3rem] xxsm:text-[0.4rem] xsm:text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] md:right-[14.3%] lg:text-[0.8rem] xl:text-[0.9rem] xl:w-20 xl:right-[14%] xxl:text-[1rem] " >Click Me <br />To Sell</NavLink>

            {isModalVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-[300]"
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
                        <p className="text-2xl font-bold mb-4">Choose an Option</p>
                        <div className="flex justify-around">
                            <NavLink to='/sell' className="px-4 no-underline py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Sell Course
                            </NavLink>
                            <NavLink to='/sell' className="px-4 no-underline py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                Sell Individual
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}




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
