import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import loginData from '../assets/lotties/login.json';
import AuthContext from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log('Logged in user:', user);
        // Redirect to home or dashboard after successful login
        navigate(from); 
      })
      .catch((err) => {
        console.error('Login error:', err);
        let errorMessage = 'Failed to login. Please check your credentials.';
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid email or password.';
        } else if (err.code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
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
        <div className="flex flex-col lg:flex-row w-full lg:w-4/5 xl:w-3/4 mx-auto bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden">
          {/* Lottie Animation Section */}
          <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-blue-600 to-indigo-700"
          >
            <Lottie
              animationData={loginData}
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
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back!</h2>
            <p className='text-center text-slate-300 mb-8'>Sign in to continue to your account.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
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
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-slate-400" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>
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
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FiLogIn />
                      Sign In
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
              Don't have an account?{
                ' '
              }
              <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
                Sign Up
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;