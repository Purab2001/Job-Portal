import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // Added Framer Motion import
import { useNavigate } from "react-router";

const HotJobs = ({ jobsPromise }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await jobsPromise;
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobsPromise]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">Loading hot jobs...</p>
        {/* Optionally, add a spinner here */}
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Time between each child animation
      },
    },
  };

  // Individual card animation variants (can reuse from JobCard or define simpler here)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Hot Jobs</h2>
        <p className="text-lg text-gray-500">Currently, no hot jobs are available. Please check back later!</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🔥 Hot Jobs This Week
      </h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {jobs.slice(0, 8).map((job) => (
          <motion.div key={job._id || job.id} variants={itemVariants}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-12 text-center">
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0px 8px 25px -5px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => navigate('/findJobs')}
        >
          View All Hot Jobs
        </motion.button>
      </div>
      </div>
    </section>
  );
};

export default HotJobs;
