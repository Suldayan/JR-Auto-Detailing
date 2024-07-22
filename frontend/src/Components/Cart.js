import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cart, setCart, handleToggleCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [carType, setCarType] = useState('Coupe/Sedan');
  const navigate = useNavigate();

  const calculateTotal = useCallback(() => {
    const total = cart.reduce((sum, service) => {
      const priceString = service.prices[carType] || '$0';
      const price = parseFloat(priceString.replace('$', ''));
      return sum + price;
    }, 0);
    setTotalPrice(total);
  }, [cart, carType]);

  useEffect(() => {
    calculateTotal();
  }, [cart, carType, calculateTotal]);

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    handleToggleCart();
    navigate('/booking', { state: { cart, carType, totalPrice } });
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto text-[#444] bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-[#333]"
        >
          Your Configuration
        </motion.h2>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleCart} 
          className="text-[#444] hover:text-[#666] transition-colors duration-300"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </motion.button>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-3">Selected Car Type</h3>
        <select
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#444] focus:border-transparent mb-4 sm:mb-6 text-[#444] text-base sm:text-lg transition-all duration-300"
        >
          {['Coupe/Sedan', 'SUV/Pickup Truck', 'Large SUV/Lifted Pickup Truck'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <AnimatePresence>
          {cart.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#f5f5f5] rounded-lg p-3 sm:p-5 mb-3 sm:mb-4 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{service.title}</h3>
                <p className="text-base sm:text-lg text-[#666]">{service.prices[carType]}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, color: '#ff4136' }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500 hover:text-red-600 transition-colors duration-300"
                onClick={() => handleRemoveFromCart(index)}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 sm:mt-6 p-3 sm:p-5 bg-[#f0f0f0] rounded-lg shadow-inner"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[#333]">Total: ${totalPrice.toFixed(2)}</h3>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#333' }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 sm:mt-8 w-full bg-[#444] text-white text-lg sm:text-xl font-semibold px-4 py-3 sm:px-6 sm:py-4 rounded-lg hover:bg-[#333] transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleCheckout}
        >
          Proceed to Booking
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Cart;