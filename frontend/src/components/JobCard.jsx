import React from "react";
import { useNavigate } from "react-router"; // Import useNavigate
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const JobCard = ({ job }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    title,
    jobType,
    category,
    location,
    description,
    company,
    company_logo,
    salaryRange,
    applicationDeadline,
    requirements,
  } = job;

  // Format salary range
  const formatSalary = () => {
    if (!salaryRange) return "Negotiable";
    const { min, max, currency } = salaryRange;
    const currencySymbol = currency === "usd" ? "$" : "৳";
    return `${currencySymbol}${min.toLocaleString()} - ${currencySymbol}${max.toLocaleString()}`;
  };

  // Format deadline
  const formatDeadline = () => {
    if (!applicationDeadline) return "Open";
    return new Date(applicationDeadline).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)", // A slightly more pronounced shadow for hover
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  return (
    <motion.div 
      className="card bg-base-100 border border-gray-200 rounded-lg shadow-sm flex flex-col h-full overflow-hidden" 
      // Removed hover:shadow-lg and transition-all from className as Framer Motion will handle it
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="card-body p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
            {title || "Job Title"}
          </h2>
          {jobType && <div className="badge badge-accent badge-outline text-xs mt-1">{jobType}</div>}
        </div>

        <div className="flex items-center gap-2.5 mb-3 mt-1">
          {company_logo && (
            <img
              src={company_logo}
              alt={company || "Company Logo"}
              className="w-10 h-10 object-contain rounded-md border border-gray-200 p-0.5"
            />
          )}
          <div>
            <p className="text-sm font-medium text-gray-700">{company || "Company Name"}</p>
            {location && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{formatSalary()}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Deadline: {formatDeadline()}</span>
        </div>

        <p className="text-xs text-gray-600 line-clamp-3 mb-3 flex-grow">
          {description || "No description available. Click to learn more about this exciting opportunity."}
        </p>

        {requirements && requirements.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold mb-1">Skills Required:</p>
            <div className="flex flex-wrap gap-1.5">
              {requirements.slice(0, 3).map((skill, index) => (
                <div key={index} className="badge badge-ghost badge-sm text-xs">{skill}</div>
              ))}
              {requirements.length > 3 && (
                <div className="badge badge-ghost badge-sm text-xs">+{requirements.length - 3} more</div>
              )}
            </div>
          </div>
        )}

        <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="badge badge-neutral badge-outline text-xs">{category || "General"}</div>
          <motion.button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 6px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/jobs/${job._id}`)}
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
