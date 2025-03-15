import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Book, Sparkles, ChevronRight, Globe, ChevronLeft } from 'lucide-react';
import aboutHero from '../images/contact-bg.webp';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import RahulRajput from '../images/Leaders/RahulRajput.jpeg';
import Mradul from '../images/Leaders/Mradul.png';
import RahulJadon from '../images/Leaders/RahulJadon.jpg';
import YashRajput from '../images/Leaders/YashRajput.jpg';
import Siddharth from '../images/Leaders/Siddharth.jpg';
import Deepak from '../images/Leaders/Deepak.jpeg';

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leaders.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "100K+", label: "Books Exchanged" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "30+", label: "Partner Universities" },
  ];

  const features = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "Vast Collection",
      description: "Access thousands of carefully curated books across all academic disciplines."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Pricing",
      description: "AI-powered pricing system ensures the best value for buyers and sellers."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Network",
      description: "Connect with students and institutions worldwide for book exchanges."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Quality Assured",
      description: "Every book undergoes thorough quality checks before listing."
    }
  ];

  const leaders = [
    {
      name: "Rahul Rajput",
      role: "Frontend Lead",
      image: RahulRajput,
      socialLinks: {
      linkedin: "https://www.linkedin.com/in/rahul1384/",
      github: "https://github.com/Rahul1384",
      email: "siddharth@Bookefy.com"
    },
      quote: "Leading the frontend development with modern web technologies to create an intuitive and user-friendly interface."
    },
    {
      name: "Mradul",
      role: "Database Architect",
      image: Mradul,
      socialLinks: {
      linkedin: "https://linkedin.com/in/siddharth",
      github: "https://github.com/siddharth",
      email: "siddharth@Bookefy.com"
    },
      quote: "Optimizing database systems to ensure seamless access to information and efficient data management."
    },
    {
      name: "Rahul Jadon",
      role: "Business Strategy Lead",
      image: RahulJadon,
      socialLinks: {
      linkedin: "https://linkedin.com/in/siddharth",
      github: "https://github.com/siddharth",
      email: "siddharth@Bookefy.com"
    },
      quote: "Driving our mission to make education accessible while building a sustainable community."
    },
    {
      name: "Yash Rajput",
      role: "AI Development Lead",
      image: YashRajput,
      socialLinks: {
      linkedin: "https://linkedin.com/in/siddharth",
      github: "https://github.com/siddharth",
      email: "siddharth@Bookefy.com"
    },
      quote: "Training our AI models with historical data to deliver accurate price predictions for our book inventory."
    },
    {
      name: "Siddharth",
      role: "Backend Lead",
      image: Siddharth,
      socialLinks: {
      linkedin: "https://linkedin.com/in/siddharth",
      github: "https://github.com/siddharth",
      email: "siddharth@Bookefy.com"
    },
      quote: "Building robust server-side architecture to support our growing platform and ensure scalability."
    },
    {
      name: "Deepak",
      role: "Design Lead",
      image: Deepak,
      socialLinks: {
      linkedin: "https://linkedin.com/in/siddharth",
      github: "https://github.com/siddharth",
      email: "siddharth@Bookefy.com"
    },
      quote: "Creating intuitive user experiences through thoughtful design and seamless interactions."
    }
  ];

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <motion.div 
              className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="text-blue-600">Bookefy</span> is
                <span className="block">Revolutionizing</span>
                <span className="block text-blue-600">Book Exchange</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Bookefy is transforming how students access educational materials through our innovative second-hand book marketplace. We're making education more accessible, one book at a time.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <NavLink to='/products' className="no-underline rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300">
                  Get Started
                  <ChevronRight className="ml-2 -mr-1 w-5 h-5 inline-block" />
                </NavLink>
              </div>
            </motion.div>

            <motion.div 
              className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-x-0 -top-16 -bottom-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl"></div>
              <img
                className="relative mx-auto w-full max-w-lg rounded-2xl shadow-xl ring-1 ring-gray-900/10"
                src={aboutHero}
                alt="About Bookefy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-8 md:max-w-none md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex flex-col bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                <dd className="text-3xl font-bold leading-9 tracking-tight text-blue-600">{stat.number}</dd>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose Bookefy?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform combines cutting-edge technology with a passion for education to create the most efficient book exchange system.
            </p>
          </motion.div>
          <div className="mx-auto grid max-w-lg gap-8 md:max-w-none md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group relative flex flex-col bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-600 transition-colors duration-300">
                  <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Leadership Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Leadership</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Meet the visionaries behind Bookefy who are working together to revolutionize educational accessibility.
            </p>
          </motion.div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {leaders.map((leader, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full ring-4 ring-blue-200 group-hover:ring-blue-300 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{leader.role}</p>
                  <blockquote className="text-gray-600 italic text-sm">
                    "{leader.quote}"
                  </blockquote>
                </div>

                <div className="mt-6 flex space-x-4">
                  <NavLink target='__blank' to={leader.socialLinks.linkedin} aria-label='linkedin' className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <i className="fab fa-linkedin text-xl"></i>
                  </NavLink>
                  <NavLink target='__blank' to={leader.socialLinks.github} aria-label='github' className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <i className="fab fa-github text-xl"></i>
                  </NavLink>
                  <NavLink target='__blank' to={leader.socialLinks.email} aria-label='email' className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <i className="fas fa-envelope text-xl"></i>
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Slider View */}
          <div className="md:hidden relative">
            <motion.div 
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 shadow-lg"
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mb-6">
                  <img
                    src={leaders[currentSlide].image}
                    alt={leaders[currentSlide].name}
                    className="w-24 h-24 rounded-full ring-4 ring-blue-100"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {leaders[currentSlide].name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {leaders[currentSlide].role}
                  </p>
                  <blockquote className="text-gray-600 italic text-sm">
                    "{leaders[currentSlide].quote}"
                  </blockquote>
                </div>

                <div className="mt-6 flex space-x-4">
                  <NavLink target='__blank' to={leaders[currentSlide].socialLinks.linkedin} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <i className="fab fa-linkedin text-xl"></i>
                  </NavLink>
                  <NavLink target='__blank' to={leaders[currentSlide].socialLinks.github} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <i className="fab fa-github text-xl"></i>
                  </NavLink>
                  <NavLink target='__blank' to={leaders[currentSlide].socialLinks.email} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <i className="fas fa-envelope text-xl"></i>
                  </NavLink>
                </div>
              </motion.div>
            </motion.div>

            {/* Slider Controls */}
            <div className="flex justify-between items-center mt-4">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
              <div className="flex space-x-2">
                {leaders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-blue-600' : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>
          </div>

          {/* Collective Mission Statement */}
          <div className="mt-20 max-w-3xl mx-auto text-center bg-blue-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Collective Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              "Together, we're building more than just a platform – we're creating a community where knowledge is accessible to everyone. Through our combined expertise in technology, design, and education, we're making textbooks affordable while building a sustainable ecosystem for students worldwide."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="relative isolate overflow-hidden"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to join our community?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Start your journey with Bookefy today and become part of a growing community of students helping students.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300">
                Get Started Now
              </button>
              <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-300">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
    </div>
  );
};

export default AboutUs;