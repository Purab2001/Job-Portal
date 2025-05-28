import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import AuthContext from '../contexts/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/findJobs", text: "Find Jobs" },
    ...(user ? [{ to: "/myApplications", text: "My Applications" }] : []),
    ...(user ? [{ to: "/addJob", text: "Add Job" }] : []),
    ...(user ? [{ to: "/myPostedJobs", text: "My Posted Jobs" }] : []),
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  const NavLinkItem = ({ to, text }) => (
    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg transition-colors duration-300 ${
            isActive 
              ? 'text-blue-600 font-medium bg-blue-50' 
              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
          }`
        }
      >
        {text}
      </NavLink>
    </motion.li>
  );

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <FiBriefcase className="text-2xl text-blue-600" />
            <NavLink to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JobPortal
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x 1">
            <ul className="flex space-x-2">
              {navLinks.map((link) => (
                <NavLinkItem key={link.to} to={link.to} text={link.text} />
              ))}
            </ul>

            <div className="ml-8 flex items-center space-x-3">
              {user ? (
                <>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                    ref={dropdownRef}
                  >
                    <button 
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <FiUser className="text-lg" />
                      <span>My Profile</span>
                    </button>
                    {profileDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                      >
                        <NavLink to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Dashboard</NavLink>
                        <NavLink to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Edit Profile</NavLink>
                        <button 
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <FiLogOut className="text-sm" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className="px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                  >
                    Log In
                  </NavLink>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <NavLink 
                      to="/register" 
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-md transition-all"
                    >
                      Sign Up
                    </NavLink>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y 2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="py-2"
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {link.text}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt 4 border-t border-gray-100 mt-4">
                {user ? (
                  <>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <FiLogOut />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <NavLink
                      to="/login"
                      className="px-4 py-2 text-center rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50"
                    >
                      Log In
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="px-4 py-2 text-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-md"
                    >
                      Sign Up
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;