import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";

const JobDetails = () => {
  const jobDataArray = useLoaderData();
  const job = jobDataArray?.[0];
  const navigate = useNavigate();

  // Note: Error handling and loading states are typically managed by
  // react-router's loader and errorElement functionality in the router configuration.
  // For simplicity in this component, we'll primarily rely on the presence of 'job'.

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    out: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    in: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
    },
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not Disclosed";
    const { min, max, currency, per } = salary;
    const currencySymbol =
      currency === "usd" ? "$" : currency === "eur" ? "€" : "৳";
    const perText = per ? ` per ${per}` : "";
    if (min && max)
      return `${currencySymbol}${min.toLocaleString()} - ${currencySymbol}${max.toLocaleString()}${perText}`;
    if (min) return `From ${currencySymbol}${min.toLocaleString()}${perText}`;
    if (max) return `Up to ${currencySymbol}${max.toLocaleString()}${perText}`;
    return "Negotiable";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-gray-500">
        Job details not found.
      </div>
    );
  }

  return (
    <motion.div
      className="bg-slate-50 min-h-screen py-8 md:py-20"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <FiChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Job Listings
          </Link>
        </motion.div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="p-6 md:p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {job.title}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{job.company}</p>
              </div>
              {job.company_logo && (
                <img
                  src={job.company_logo}
                  alt={`${job.company} logo`}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-lg border border-gray-200 p-1 bg-white shadow-sm"
                />
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
              {job.location && (
                <div className="flex items-center">
                  <FiMapPin className="h-5 w-5 mr-1.5 text-blue-500" />
                  {job.location}
                </div>
              )}
              {job.jobType && (
                <div className="flex items-center">
                  <FiBriefcase className="h-5 w-5 mr-1.5 text-blue-500" />
                  {job.jobType}
                </div>
              )}
              {job.salaryRange && (
                <div className="flex items-center">
                  <FiDollarSign className="h-5 w-5 mr-1.5 text-blue-500" />
                  {formatSalary(job.salaryRange)}
                </div>
              )}
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Job Description, Requirements, Responsibilities) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Responsibilities
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-1.5 pl-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Requirements
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-1.5 pl-2">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Right Column (Apply Button, Job Summary, Company Info) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Apply for this job
                </h2>
                <motion.button
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/jobApply/${job._id}`)}
                >
                  Apply Now
                </motion.button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Application Deadline: {formatDate(job.applicationDeadline)}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Job Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong className="text-gray-600">Posted Date:</strong>{" "}
                    {formatDate(job.postedDate)}
                  </p>
                  <p>
                    <strong className="text-gray-600">Location:</strong>{" "}
                    {job.location}
                  </p>
                  <p>
                    <strong className="text-gray-600">Job Type:</strong>{" "}
                    {job.jobType}
                  </p>
                  <p>
                    <strong className="text-gray-600">Category:</strong>{" "}
                    {job.category || "N/A"}
                  </p>
                  <p>
                    <strong className="text-gray-600">Salary:</strong>{" "}
                    {formatSalary(job.salaryRange)}
                  </p>
                </div>
              </div>

              {job.companyOverview && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    About {job.company}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.companyOverview}
                  </p>
                </div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Benefits
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;
