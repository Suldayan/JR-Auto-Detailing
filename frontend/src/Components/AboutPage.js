import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope, FaPhone, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-[#F5F5F3] min-h-screen text-[#4A4A4A] font-sans relative pt-16 sm:pt-20">
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-50">
        <div className="w-px bg-gradient-to-b from-transparent via-[#E0E0E0] to-transparent h-full"></div>
        <div className="w-px bg-gradient-to-b from-transparent via-[#E0E0E0] to-transparent h-full"></div>
        <div className="w-px bg-gradient-to-b from-transparent via-[#E0E0E0] to-transparent h-full"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent w-full"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent w-full"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent w-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 relative"
      >
        <header className="mb-12 sm:mb-20 border-b border-[#E0E0E0] pb-8 sm:pb-12 font-mecha">
          <motion.h1 
            {...fadeInUp}
            className="text-5xl sm:text-7xl lg:text-9xl font-bold mb-4 sm:mb-6 tracking-tighter sm:translate-y-10 bg-clip-text text-transparent bg-gradient-to-r from-[#4A4A4A] to-[#6D6D6D]"
          >
            JR AUTO DETAILING
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-[#6D6D6D] max-w-3xl leading-relaxed"
          >
            Elevating your vehicle's appearance to perfection, one meticulous detail at a time.
          </motion.p>
        </header>

        <main className="space-y-16 sm:space-y-32">
          <section className="relative border-b border-[#E0E0E0] pb-12">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <div className="col-span-1 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-[#E0E0E0] pb-12 lg:pb-0 lg:pr-12">
                <motion.img 
                  src="https://i.pinimg.com/originals/4e/2a/33/4e2a3321041d526f45717662fbbdeae6.png" 
                  alt="Car Model" 
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-semibold">EXCLUSIVE DETAILING</h2>
                <p className="text-[#6D6D6D] text-lg leading-relaxed">
                  Experience the pinnacle of automotive care with our exclusive detailing services. We treat every vehicle as a masterpiece, ensuring it receives the attention it deserves.
                </p>
                <ul className="space-y-2 text-[#6D6D6D]">
                  {['Premium-grade products', 'Time efficient', 'Tailored detailing packages'].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <FaChevronRight className="text-[#4A4A4A]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/services" className="inline-block bg-[#4A4A4A] text-[#F5F5F3] px-8 py-4 mt-6 transition duration-300 rounded-full shadow-lg hover:bg-[#3A3A3A] hover:shadow-xl text-lg font-semibold">
                    Discover Our Services
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section className="relative border-b border-[#E0E0E0] pb-12">
            <motion.div 
              className="flex justify-center"
              {...fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl">
                {[
                  {
                    img: "https://i.pinimg.com/564x/3e/b5/fe/3eb5feceaa9a443a7c5490f2ceac2909.jpg",
                    title: "Interior Detailing",
                    desc: "Transform your car's interior into a pristine, comfortable space that feels brand new."
                  },
                  {
                    img: "https://i.pinimg.com/736x/a3/46/4a/a3464a36c62af68375c7ada7bbfcdfc8.jpg",
                    title: "Exterior Detailing",
                    desc: "Restore your vehicle's shine with our meticulous exterior detailing process, turning heads wherever you go."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="space-y-6 border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#E0E0E0] pb-6 sm:pb-0 sm:pr-6"
                  >
                    <img 
                      src={item.img}
                      alt={item.title} 
                      className="w-full h-64 object-cover rounded-lg shadow-lg" 
                    />
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="text-[#6D6D6D] text-lg leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="relative border-b border-[#E0E0E0] pb-12">
            <motion.div
              className="text-center space-y-12"
              {...fadeInUp}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold">OUR COMMITMENT TO EXCELLENCE</h2>
              <motion.div 
                className="flex flex-col sm:flex-row justify-between"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                {[
                  { number: '100%', desc: 'Customer Satisfaction' },
                  { number: 'PREMIUM', desc: 'Products' },
                  { number: '24/7', desc: 'Customer Support' }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#E0E0E0] pb-6 sm:pb-0"
                    variants={fadeInUp}
                  >
                    <p className="text-4xl sm:text-6xl font-bold mb-4">{item.number}</p>
                    <p className="text-[#6D6D6D] text-xl">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section className="relative">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
              {...fadeInUp}
              transition={{ delay: 1 }}
            >
              <div className="text-center border-b sm:border-b-0 sm:border-r border-[#E0E0E0] pb-6 sm:pb-0">
                <motion.iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1303.209468707969!2d-122.86173396107111!3d49.21158154284561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d7f391c8f6fb%3A0x7537dbe5c2a0bbd8!2sSurrey%2C%20BC%20V3R%200C3!5e0!3m2!1sen!2sca!4v1724177127387!5m2!1sen!2sca"
                  width="100%" 
                  height="250" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                ></motion.iframe>
                <p className="mt-4 font-semibold text-xl">Our Location</p>
                <p className="text-lg text-[#6D6D6D]">13085 115 AVE, Surrey, BC V3R 0C3</p>
              </div>
              {[
                { icon: FaInstagram, label: 'Follow Us', link: 'https://www.instagram.com/jrautoodetailing/' },
                { icon: FaEnvelope, label: 'Email Us', link: 'mailto:info@jrautodetailing.com' },
                { icon: FaPhone, label: 'Call Us', link: 'tel:+17787736980' }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-center border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#E0E0E0] pb-6 sm:pb-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block hover:text-[#3A3A3A] transition duration-300">
                    <item.icon className="text-5xl sm:text-6xl mx-auto mb-4" />
                    <p className="font-semibold text-xl">{item.label}</p>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </main>

        <footer className="mt-16 sm:mt-32 text-center relative border-t border-[#E0E0E0] pt-12">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 1.2 }}
            className="space-y-6"
          >
            <p className="text-[#6D6D6D] text-lg">
              © 2024 JR-AUTO-DETAILING. All rights reserved.
            </p>
          </motion.div>
        </footer>
      </motion.div>
    </div>
  );
};

export default AboutPage;