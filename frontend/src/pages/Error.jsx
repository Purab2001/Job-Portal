import React from 'react';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import errorData from '../assets/lotties/error404.json';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const Error = () => {
    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center"
        >
            <div className="container mx-auto max-w-7xl px-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Animation Section */}
                        <motion.div 
                            variants={itemVariants}
                            className="w-full lg:w-1/2 p-6 lg:p-12 flex justify-center"
                        >
                            <Lottie 
                                animationData={errorData} 
                                loop={true} 
                                className="w-full max-w-md"
                            />
                        </motion.div>

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2 p-6 lg:p-12 text-center lg:text-left">
                            <motion.div variants={itemVariants} className="space-y-6">
                                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-2">
                                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">404</span>
                                </h1>
                                <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
                                    Page Not Found
                                </h2>
                                <p className="text-slate-300 mb-8 max-w-md mx-auto lg:mx-0">
                                    Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link 
                                            to="/"
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 w-full sm:w-auto"
                                        >
                                            <FiHome />
                                            Go Home
                                        </Link>
                                    </motion.div>
                                    
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <button 
                                            onClick={() => window.history.back()}
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-blue-500 text-blue-400 font-medium rounded-lg hover:bg-blue-500/10 transition-all duration-200 w-full sm:w-auto"
                                        >
                                            <FiArrowLeft />
                                            Go Back
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                {/* Additional Help */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-8 text-center text-slate-400 text-sm"
                >
                    <p>Need help? <Link to="/contact" className="text-blue-400 hover:underline">Contact our support team</Link></p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Error;