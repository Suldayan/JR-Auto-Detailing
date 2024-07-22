import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-[#f5f5f5] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-light text-[#444] hover:text-[#666] transition-colors duration-300">
            JR Auto Detailing
          </Link>
          <div className="hidden md:flex items-center space-x-10">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/services">Services/Booking</NavLink>
            <NavLink to="/portfolio">Portfolio</NavLink>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-[#444] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#f5f5f5] shadow-lg"
          >
            <div className="container mx-auto px-6 py-6 space-y-6">
              <NavLink to="/home" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/services" onClick={() => setIsOpen(false)}>Services/Booking</NavLink>
              <NavLink to="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    className="block text-lg uppercase tracking-wide text-[#444] hover:text-[#666] transition-colors duration-300 font-medium"
    onClick={onClick}
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  </Link>
);

export default Navbar;