import React from "react";
import Navbar from "./Navbar";
import Hero from './Hero';
import HowItWorks from "./HowItWorks";


const Homepage = () => {
    return(
        <div>
            <Navbar/>
            <Hero/>
            <HowItWorks/>
        </div>
    );
}

export default Homepage;