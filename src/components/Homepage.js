import React from "react";
import Navbar from "./Navbar";
import Hero from './Hero';
import HowItWorks from "./HowItWorks";
import HappyUser from "./HappyUser";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import Categories from "./Categories";

const Homepage = () => {
    const address = "Goverdhan chauraha, Mathura, UP, India";
    const phone = "+91 7482917298";
    const email = "ReBook2025@gmail.com";
    const hours = [
        "Monday to Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed"
    ]
    const socialLinks = [
        { platform: "Facebook", url: "https://facebook.com/ReBook" },
        { platform: "Twitter", url: "https://twitter.com/ReBook" },
        { platform: "Instagram", url: "https://instagram.com/ReBook" }
    ]


    const testimonialData = [
        {
          name: "Jane D",
          position: "CEO",
          avatar: "https://pagedone.io/asset/uploads/1696229969.png",
          rating: "4.9",
          feedback: "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily."
        },
        {
          name: "Harsh P.",
          position: "Product Designer",
          avatar: "https://pagedone.io/asset/uploads/1696229994.png",
          rating: "4.9",
          feedback: "Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before."
        },
        {
          name: "Sophia W.",
          position: "Software Engineer",
          avatar: "https://pagedone.io/asset/uploads/1696230018.png",
          rating: "4.8",
          feedback: "With pagedone, I have a reliable tool that helps me stay ahead of the curve in my work, making my decisions easier."
        },
        {
          name: "Rahul B.",
          position: "CTO",
          avatar: "https://pagedone.io/asset/uploads/1696230039.png",
          rating: "5.0",
          feedback: "Pagedone has greatly enhanced our team's performance with its user-friendly interface and seamless features."
        },
      ];
    return(
        <div>
            <Navbar/>
            <Hero/>
            <Categories/>
            <HowItWorks/>
            <HappyUser/>
            <Testimonial testimonials={testimonialData}/>
            <Contact address={address} phone={phone} email={email} hours={hours} socialLinks={socialLinks}/>
            <Footer/>
        </div>
    );
}

export default Homepage;