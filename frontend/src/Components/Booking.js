import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MailIcon, ClockIcon, ChevronDownIcon } from '@heroicons/react/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://jr-auto-detailing.onrender.com';

const Booking = () => {
  const location = useLocation();
  const { cart = [], totalPrice = 0 } = location.state || {};

  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const fetchAvailableSlots = useCallback(async () => {
    if (!date) return;
    setIsLoading(true);
    setError(null);
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(`${API_URL}/available-slots?date=${formattedDate}`);
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setError('Failed to fetch available slots. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchAvailableSlots();
  }, [date, fetchAvailableSlots]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/book`, {
        email,
        date: date.toISOString().split('T')[0],
        time,
        services: cart.map(service => service.title),
        totalPrice
      });
      alert('Booking successful!');
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Error creating booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time24) => {
    const [hour, minute] = time24.split(':');
    const hour12 = hour % 12 || 12;
    const ampm = hour < 12 || hour === 24 ? 'AM' : 'PM';
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h2 
        className="text-4xl font-extrabold mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Book Your Service
      </motion.h2>
      <motion.div 
        className="bg-white rounded-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                required
                placeholderText="Select a date"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                {isLoading ? (
                  <div className="block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md bg-gray-100">
                    Loading available times...
                  </div>
                ) : (
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                    required
                  >
                    <option value="">Select a time</option>
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>{formatTime(slot)}</option>
                    ))}
                  </select>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
            {error && <p className="text-red-500">{error}</p>}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm Booking'}
              </motion.button>
            </motion.div>
          </form>
        </div>
        {cart && cart.length > 0 && (
          <motion.div 
            className="bg-gray-50 px-4 py-5 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Booking Summary</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSummary(!showSummary)}
                className="text-indigo-600 hover:text-indigo-500 focus:outline-none transition duration-300"
              >
                {showSummary ? 'Hide' : 'Show'} Details
              </motion.button>
            </div>
            <AnimatePresence>
              {showSummary && (
                <motion.ul 
                  className="divide-y divide-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {cart.map((service, index) => (
                    <motion.li 
                      key={index} 
                      className="py-4 flex justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <span className="text-sm font-medium text-gray-900">{service.title}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <motion.div 
              className="mt-4 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-base font-bold text-indigo-600">
                {totalPrice !== undefined ? `$${totalPrice.toFixed(2)}` : 'N/A'}
              </span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Booking;