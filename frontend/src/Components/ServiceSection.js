import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from './services';
import Cart from './Cart';
import ServiceCard from './ServiceCard';

const ServiceSection = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [filteredServices, setFilteredServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(services)) {
      setFilteredServices(
        selectedType === 'All'
          ? services
          : services.filter(service => service.type === selectedType)
      );
    } else {
      console.error('Services is not an array:', services);
      setFilteredServices([]);
    }
  }, [selectedType]);

  const handleAddToCart = (service) => {
    setCart(prevCart => [...prevCart, service]);
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (!Array.isArray(services) || services.length === 0) {
    return <div className="pt-20 px-4">No services available at the moment.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-[#f5f5f5] to-[#e0e0e0] min-h-screen text-[#444] pt-20"> 
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-auto mb-8 lg:mb-0 lg:mr-8"
          >
            <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 sticky top-20">
              {['All', 'Interior', 'Exterior'].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05, backgroundColor: '#555' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 lg:flex-none px-6 py-3 rounded-full ${
                    selectedType === type ? 'bg-[#444] text-white' : 'bg-white text-[#444]'
                  } shadow-lg transition-all duration-300 font-semibold tracking-wide`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main content */}
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-light mb-8 text-[#444] tracking-wide"
            >
              Configure Your Service
            </motion.h1>
            
            {/* Service Showcase */}
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg mb-12 p-8 min-h-[250px] flex items-center justify-center overflow-hidden"
            >
              <motion.div
                key={selectedType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-3xl font-semibold mb-6">{selectedType} Services</h2>
                <p className="text-xl mb-6 text-[#666] max-w-2xl mx-auto">
                  {selectedType === 'All' 
                    ? 'Explore our comprehensive range of interior and exterior services designed to elevate your vehicle\'s appearance and performance.' 
                    : `Discover our premium ${selectedType.toLowerCase()} detailing options tailored to meet your specific needs and preferences.`}
                </p>
                <motion.div 
                  className="flex justify-center space-x-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  {[1, 2, 3].map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-4 h-4 bg-[#444] rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Service cards */}
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredServices.map(service => (
                  <motion.div
                    key={service.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ServiceCard 
                      service={service} 
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-8 right-8"
      >
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#555' }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#444] text-white p-6 rounded-full shadow-xl flex items-center justify-center text-lg font-semibold transition-all duration-300"
          onClick={handleToggleCart}
        >
          <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span>{cart.length}</span>
        </motion.button>
      </motion.div>

      {/* Cart modal */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
            >
              <Cart cart={cart} setCart={setCart} handleToggleCart={handleToggleCart} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceSection;