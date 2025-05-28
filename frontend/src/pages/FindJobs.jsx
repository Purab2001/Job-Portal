import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiBriefcase, FiDollarSign, FiChevronDown } from 'react-icons/fi';

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    salaryRange: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all jobs (replace with your actual API call)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://job-portal-umber-chi.vercel.app/jobs');
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;

    // Simple salary filter logic (you can enhance this based on your data structure)
    const matchesSalary = !filters.salaryRange ||
      (filters.salaryRange === 'high' && job.salaryRange?.max > 100000) ||
      (filters.salaryRange === 'medium' && job.salaryRange?.max > 50000 && job.salaryRange?.max <= 100000) ||
      (filters.salaryRange === 'low' && job.salaryRange?.max <= 50000);

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="animate-pulse text-2xl text-gray-600">Loading jobs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our latest job listings and find the perfect opportunity for your career growth.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search jobs, companies, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <FiFilter className="h-5 w-5 mr-2 text-gray-700" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Dropdown */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any location"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="jobType"
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={filters.jobType}
                      onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                    >
                      <option value="">Any Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="salaryRange"
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={filters.salaryRange}
                      onChange={(e) => setFilters({ ...filters, salaryRange: e.target.value })}
                    >
                      <option value="">Any Salary</option>
                      <option value="high">$100,000+</option>
                      <option value="medium">$50,000 - $100,000</option>
                      <option value="low">Up to $50,000</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ location: '', jobType: '', salaryRange: '' })}
                  className="text-sm text-gray-600 hover:text-gray-900 mr-4"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
          </h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <select className="text-sm border-0 bg-transparent focus:ring-2 focus:ring-blue-500 rounded-md">
              <option>Most Recent</option>
              <option>Salary: High to Low</option>
              <option>Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job._id || job.id} variants={itemVariants}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({ location: '', jobType: '', salaryRange: '' });
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobs;