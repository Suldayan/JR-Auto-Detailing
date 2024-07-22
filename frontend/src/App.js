import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AboutPage from './Components/AboutPage';
import PortfolioSection from './Components/PortfolioSection';
import ServiceSection from './Components/ServiceSection';
import Navbar from './Components/Navbar';
import Booking from './Components/Booking';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AboutPage />} />
        <Route path="/home" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioSection />} />
        <Route path="/services" element={<ServiceSection />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;