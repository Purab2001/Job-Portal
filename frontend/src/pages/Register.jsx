import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import registerData from "../assets/lotties/register.json";
import AuthContext from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiUserPlus } from 'react-icons/fi';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    
    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log('Registered user:', user);
        // Update profile with name
        if (user && name) {
          // If your auth system supports updating profile
          // updateUserProfile(name);
        }
        // Redirect to home or login after successful registration
        navigate('/login');
      })
      .catch((err) => {
        console.error('Registration error:', err);
        let errorMessage = 'Failed to register. Please try again.';
        if (err.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered.';
        } else if (err.code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
        } else if (err.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak. Please use a stronger password.';
        }
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-18 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row-reverse w-full lg:w-4/5 xl:w-3/4 mx-auto bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden">
          {/* Lottie Animation Section */}
          <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-indigo-600 to-purple-700"
          >
            <Lottie
              animationData={registerData}
              loop={true}
              className="w-full max-w-md"
            />
          </motion.div>

          {/* Form Section */}
          <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
            <p className='text-center text-slate-300 mb-8'>Join our community and find your dream job.</p>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-slate-400" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-slate-400" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-slate-400" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">Password must be at least 6 characters</p>
              </div>

              {error && (
                <motion.p 
                  initial={{opacity: 0, y: -10}}
                  animate={{opacity: 1, y: 0}}
                  className="text-sm text-red-400 bg-red-500/10 p-2 rounded-md text-center"
                >
                  {error}
                </motion.p>
              )}

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FiUserPlus />
                      Create Account
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <motion.p 
              variants={itemVariants}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center text-sm text-slate-400"
            >
              Already have an account?{
                ' '
              }
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline">
                Sign In
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
