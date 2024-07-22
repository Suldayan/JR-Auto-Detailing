import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceCard = ({ service, onAddToCart }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#444]">{service.title}</h3>
          <span className="text-xl font-bold text-[#444] bg-[#f0f0f0] px-3 py-1 rounded-full">
            {service.prices['Coupe/Sedan']}
          </span>
        </div>
        <p className="text-sm text-[#666] mb-6 h-16 overflow-hidden">{service.description}</p>
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#555' }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#444] text-white px-6 py-2 rounded-full hover:bg-[#333] transition duration-300 text-sm font-semibold tracking-wide"
            onClick={() => onAddToCart(service)}
          >
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, color: '#000' }}
            whileTap={{ scale: 0.95 }}
            className="text-[#444] hover:text-[#666] text-sm font-medium underline"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </motion.button>
        </div>
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-sm text-[#666]"
            >
              <h4 className="font-semibold mb-3 text-[#444] text-lg">Features:</h4>
              <ul className="list-none space-y-2">
                {service.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceCard;