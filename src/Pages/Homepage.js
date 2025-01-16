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
          name: "John Doe",
          position: "Student",
          avatar: "https://pagedone.io/asset/uploads/1696229969.png",
          rating: "4.9",
          feedback: "The convenience of browsing and buying books from home is unmatched. The website is easy to navigate, and I was impressed by the fast delivery. I’ll definitely be coming back for more!"
        },
        {
          name: "John Doe",
          position: "Neet Aspirant",
          avatar: "https://pagedone.io/asset/uploads/1696229994.png",
          rating: "4.9",
          feedback: "I love the wide selection of genres and the detailed book descriptions. The customer support is excellent, and the discounts make reading more affordable. Highly recommended for all readers!"
        },
        {
          name: "John Doe",
          position: "NDA Aspirant",
          avatar: "https://pagedone.io/asset/uploads/1696230018.png",
          rating: "4.8",
          feedback: "This online bookstore is a reader’s paradise! I found rare and out-of-print books that I couldn’t find elsewhere. Plus, the packaging ensured my books arrived in perfect condition."
        },
        {
          name: "John Doe",
          position: "Gate Aspirant",
          avatar: "https://pagedone.io/asset/uploads/1696230039.png",
          rating: "5.0",
          feedback: "I appreciate how seamless the ordering process is. The digital books section is great, too, for when I want to read on my tablet. It’s my go-to site for all my reading needs!"
        },
      ];
    return(
        <div>
            <Navbar/>
            <Hero/>
            <Trending/>
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