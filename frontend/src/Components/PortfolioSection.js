import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaClock, FaSmile, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PortfolioSection = () => {
  const [selectedCar, setSelectedCar] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const portfolioItems = [
    {
      car: 'Mercedes-Benz GLE Coupe',
      image: 'https://purepng.com/public/uploads/large/purepng.com-mercedes-benz-gle-coupe-white-carcarvehicletransportmercedes-benz-961524660217nch4l.png',
      stats: [
        { label: 'Interior', value: 'Gold', icon: FaStar },
        { label: 'Exterior', value: 'Gold', icon: FaStar },
        { label: 'Duration', value: '1 1/2 hrs', icon: FaClock },
        { label: 'Satisfaction', value: '100%', icon: FaSmile },
      ],
      workImages: [
        { src: './BENZ-INTERIOR.jpg', alt: 'Interior detailing' },
        { src: './BENZ-EXTERIOR.jpg', alt: 'Exterior polishing' },
        { src: './BENZ-WHEELS.jpg', alt: 'Wheel cleaning' },
        { src: './BENZ-STEAR.jpg', alt: 'Interior detailing' },
        { src: './BENZ-TRUNK.jpg', alt: 'Interior detailing' },
        { src: './BENZ-REAR.jpg', alt: 'Exterior detailing' },
      ],
      description: 'Luxurious detailing for a premium SUV experience. Our team meticulously cleaned and polished every surface, bringing out the true beauty of this Mercedes-Benz GLE Coupe.',
      testimonial: {
        text: "I appreciate the fine detailing that they have put towards my car. They follow their service packages thoroughly, producing exactly what I booked.",
        author: "Jackson Z."
      }
    },
    {
      car: 'Maserati Q4',
      image: 'https://www.pngmart.com/files/22/Maserati-Quattroporte-PNG-HD-Isolated.png',
      stats: [
        { label: 'Interior', value: 'Gold', icon: FaStar },
        { label: 'Exterior', value: 'Gold', icon: FaStar },
        { label: 'Duration', value: '2 hrs', icon: FaClock },
        { label: 'Satisfaction', value: '100%', icon: FaSmile },
      ],
      workImages: [
        { src: 'Car-Images/MASERATI-FRONT', alt: 'Interior detailing' },
        { src: 'Car-Images/MASERATI-DASH', alt: 'Wheel cleaning' },
        { src: 'Car-Images/MASERATI-FRONT', alt: 'Interior detailing' },
        { src: 'Car-Images/MASERATI-SEATS', alt: 'Interior detailing' },
        { src: 'Car-Images/MASERATI-SHOTGUN', alt: 'Exterior detailing' },
      ],
      description: 'Luxurious detailing for a premium SUV experience. Our team meticulously cleaned and polished every surface, bringing out the true beauty of this Mercedes-Benz GLE Coupe.',
    },
    {
      car: 'Mercedes CLA 45 AMG',
      image: 'https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/0aab52e8-297d-4304-a1dc-ea2dcf3b65e6/385d51be-3d92-4a51-ad20-16bab630ae7b.png',
      stats: [
        { label: 'Interior', value: 'Gold', icon: FaStar },
        { label: 'Exterior', value: 'Gold', icon: FaStar },
        { label: 'Duration', value: '2 hrs', icon: FaClock },
        { label: 'Satisfaction', value: '100%', icon: FaSmile },
      ],
      workImages: [
        { src: 'Car-Images/MERCEDES-CLA-EXT.jpg', alt: 'Interior detailing' },
        { src: 'Car-Images/MERCEDES-CLA-BACK.jpg', alt: 'Exterior polishing' },
        { src: 'Car-Images/MERCEDES-CLA-WHEEL.jpg', alt: 'Wheel cleaning' },
        { src: 'Car-Images/MERCEDES-CLA-SEATS.jpg', alt: 'Interior detailing' },
        { src: 'Car-Images/MERCEDES-CLA-DASH.jpg', alt: 'Interior detailing' },
      ],
      description: 'Luxurious detailing for a premium SUV experience. Our team meticulously cleaned and polished every surface, bringing out the true beauty of this Mercedes-Benz GLE Coupe.',
    },
  ];

  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
    const timer = setTimeout(() => setAnimateStats(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCar]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % portfolioItems[selectedCar].workImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + portfolioItems[selectedCar].workImages.length) % portfolioItems[selectedCar].workImages.length
    );
  };

  return (
    <div className="bg-[#F5F5F3] min-h-screen text-[#4A4A4A] font-sans relative pt-20">
      <div className="absolute inset-0 flex justify-between pointer-events-none">
        <div className="w-px bg-[#E0E0E0] h-full"></div>
        <div className="w-px bg-[#E0E0E0] h-full"></div>
        <div className="w-px bg-[#E0E0E0] h-full"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        <div className="h-px bg-[#E0E0E0] w-full"></div>
        <div className="h-px bg-[#E0E0E0] w-full"></div>
        <div className="h-px bg-[#E0E0E0] w-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 relative"
      >
        <header className="mb-16 border-b border-[#E0E0E0] pb-8 font-mecha">
          <motion.h1 
            {...fadeInUp}
            className="text-6xl font-bold mb-4 tracking-tighter"
          >
            OUR PORTFOLIO
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#6D6D6D] max-w-2xl"
          >
            Witness the transformation of vehicles through our expert detailing.
          </motion.p>
        </header>

        <main className="space-y-24">
          <section className="relative border-b border-[#E0E0E0] pb-8">
            <motion.div 
              className="flex flex-wrap justify-center mb-12 gap-4"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              {portfolioItems.map((item, index) => (
                <motion.button
                  key={index}
                  className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${selectedCar === index ? 'bg-[#4A4A4A] text-[#F5F5F3]' : 'bg-[#F5F5F3] text-[#4A4A4A] hover:bg-[#E0E0E0]'}`}
                  onClick={() => setSelectedCar(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.car}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <div className="space-y-8">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold"
                  >
                    {portfolioItems[selectedCar].car}
                  </motion.h3>
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={portfolioItems[selectedCar].image}
                      alt={portfolioItems[selectedCar].car}
                      className="w-full object-contain h-64 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to zoom</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="grid grid-cols-2 gap-6 bg-[#F5F5F3] p-6 rounded-lg shadow-md border border-[#E0E0E0]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {portfolioItems[selectedCar].stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ scale: 1 }}
                        animate={{ scale: animateStats ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <p className="text-sm text-[#6D6D6D] mb-1">{stat.label}</p>
                        <p className="text-xl font-bold flex items-center">
                          <stat.icon className="mr-2 text-[#4A4A4A]" /> <span>{stat.value}</span>
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p
                    className="text-[#6D6D6D] leading-relaxed bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {portfolioItems[selectedCar].description}
                  </motion.p>
                  {portfolioItems[selectedCar].testimonial && (
                    <motion.div
                      className="bg-[#F5F5F3] p-6 rounded-lg shadow-md border border-[#E0E0E0]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-semibold mb-2">Client Testimonial</h4>
                      <p className="italic text-[#6D6D6D] bg-white p-4 rounded-lg shadow-sm">"{portfolioItems[selectedCar].testimonial.text}"</p>
                      <p className="text-right mt-2 font-semibold">- {portfolioItems[selectedCar].testimonial.author}</p>
                    </motion.div>
                  )}
                </div>
                <div className="space-y-6">
                  <motion.h4 
                    className="text-2xl font-semibold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Our Process
                  </motion.h4>
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <img
                      src={portfolioItems[selectedCar].workImages[currentImageIndex].src}
                      alt={portfolioItems[selectedCar].workImages[currentImageIndex].alt}
                      className="w-full h-96 object-cover rounded-lg shadow-md cursor-pointer"
                      onClick={() => setActiveImage(portfolioItems[selectedCar].workImages[currentImageIndex])}
                    />
                    <button 
                      onClick={prevImage} 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors duration-300"
                    >
                      <FaChevronLeft className="text-[#4A4A4A]" />
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors duration-300"
                    >
                      <FaChevronRight className="text-[#4A4A4A]" />
                    </button>
                  </motion.div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {portfolioItems[selectedCar].workImages.map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className={`w-full h-24 object-cover rounded-lg shadow-md cursor-pointer border-2 ${index === currentImageIndex ? 'border-[#4A4A4A]' : 'border-transparent'}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </main>

        {/* Image Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setActiveImage(null)}
            >
              <motion.img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-w-full max-h-full object-contain p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setIsZoomed(false)}
            >
              <motion.img
                src={portfolioItems[selectedCar].image}
                alt={portfolioItems[selectedCar].car}
                className="max-w-full max-h-full object-contain p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PortfolioSection;