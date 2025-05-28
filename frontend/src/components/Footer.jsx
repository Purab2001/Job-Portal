import React from 'react';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiBriefcase, FiMail, FiMapPin, FiPhone, FiLinkedin, FiTwitter, FiGithub, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <FiBriefcase className="text-2xl text-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">JobPortal</span>
            </div>
            <p className="text-slate-300 text-sm mt-4">
              Connecting talent with opportunity. Find your dream job or the perfect candidate with our comprehensive job portal.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                whileHover={{ y: -3, color: "#4299e1" }} 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: "#4299e1" }} 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: "#4299e1" }} 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: "#4299e1" }} 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <FiFacebook size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-slate-300">123 Job Street, Employment City, 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-blue-500 flex-shrink-0" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-blue-500 flex-shrink-0" />
                <span className="text-slate-300">info@jobportal.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-slate-300 text-sm mb-4">Subscribe to our newsletter for the latest job opportunities and career tips.</p>
            
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2.5 text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 focus:outline-none transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-slate-700/50 my-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} JobPortal. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;