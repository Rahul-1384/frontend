import React from 'react';
import { useEffect, useState } from 'react';

// Custom hook to detect if an element is in view
const useOnScreen = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isVisible];
};

const AboutUs = () => {
  const [introRef, introVisible] = useOnScreen({});
  const [storyRef, storyVisible] = useOnScreen({});
  const [teamRef, teamVisible] = useOnScreen({});
  const [ctaRef, ctaVisible] = useOnScreen({});

  return (
    <div className="bg-gray-50">
      {/* Introduction Section with Animation */}
      <section className={`py-16 ${introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
        <div className="container mx-auto text-center" ref={introRef}>
          <h1 className="text-4xl font-semibold text-gray-800">Who We Are</h1>
          <p className="mt-4 text-lg text-gray-600">
            We are a second-hand bookstore with a mission to make books accessible, affordable, and eco-friendly. Our curated collection is full of hidden gems, waiting to be discovered by you.
          </p>
        </div>
      </section>

      {/* Our Story Section with Fade In */}
      <section className={`py-16 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000`}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12" ref={storyRef}>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
            <p className="mt-4 text-lg text-gray-600">
              Born out of a love for books and sustainability, we started our journey to give used books a second life. From humble beginnings, our shop has grown into a beloved community hub.
            </p>
          </div>
          <div className="text-center md:text-left">
            <img src="/path-to-your-image.jpg" alt="Bookstore" className="w-full rounded-lg shadow-lg"/>
          </div>
        </div>
      </section>

      {/* Mission & Values Section with Slide-in Animation */}
      <section className={`bg-gray-100 py-16 ${teamVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000`}>
        <div className="container mx-auto text-center" ref={teamRef}>
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission & Values</h2>
          <p className="mt-4 text-lg text-gray-600">
            We strive to make books accessible to everyone, promoting sustainability, affordability, and community growth. Here’s what drives us:
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">Sustainability</h3>
              <p className="mt-4 text-gray-600">Buying second-hand books reduces waste and supports eco-friendly living.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">Affordability</h3>
              <p className="mt-4 text-gray-600">We believe in providing affordable books for everyone, no matter their budget.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">Community</h3>
              <p className="mt-4 text-gray-600">We’re dedicated to building a community of readers who share a love for books and knowledge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section with Hover Effects */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Meet the Team</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our team is passionate about books and customer service. Here’s a little bit about each of us:
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-12" ref={teamRef}>
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src="/path-to-team-member-1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto"/>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="mt-2 text-gray-600">Founder & CEO</p>
              <p className="mt-4 text-gray-600">A lifelong book lover, John started the bookstore with the goal of making books accessible to all.</p>
            </div>
            {/* Repeat for other team members */}
          </div>
        </div>
      </section>

      {/* Call to Action Section with Fade In and Hover Animation */}
      <section className={`bg-green-600 text-white py-16 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`} ref={ctaRef}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Ready to Find Your Next Favorite Book?</h2>
          <p className="mt-4 text-lg">Browse our collection today and discover amazing second-hand books at affordable prices!</p>
          <a href="/shop" className="mt-8 inline-block px-8 py-3 bg-white text-green-600 font-semibold rounded-lg transform hover:scale-105 transition-transform duration-300">
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
