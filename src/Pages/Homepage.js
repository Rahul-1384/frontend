import React from "react";
import Navbar from "../components/Navbar";
import Hero from '../components/Hero';
import HowItWorks from "../components/HowItWorks";
import HappyUser from "../components/HappyUser";
import Contact from "../components/Contact";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import OurServices from "../components/OurServices";
import DownloadApp from "../components/DownloadApp";

const Homepage = () => {
    return(
        <div>
          
            <Navbar/>
            <Hero/>
            <Trending/>
            <Categories/>
            <HowItWorks/>
            <OurServices/>
            <HappyUser/>
            <Testimonial/>
            <DownloadApp/>
            <Contact/>
            <Footer/>
        </div>
    );
}

export default Homepage;