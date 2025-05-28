import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiXCircle, FiLoader, FiSearch, FiFilter } from 'react-icons/fi';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios.get(`https://job-portal-umber-chi.vercel.app/applications?email=${user.email}`)
                .then(res => {
                    // Get the application data
                    const applicationData = res.data;

                    // For each application, fetch the associated job details
                    const jobPromises = applicationData.map(app => {
                        if (app.jobId) {
                            return axios.get(`https://job-portal-umber-chi.vercel.app/jobs/${app.jobId}`)
                                .then(jobRes => {
                                    const jobData = jobRes.data[0]; // The job data is in an array
                                    return { ...app, jobDetails: jobData };
                                })
                                .catch(() => {
                                    // If job fetch fails, return the application without job details
                                    return app;
                                });
                        }
                        return Promise.resolve(app);
                    });

                    // Wait for all job detail requests to complete
                    return Promise.all(jobPromises);
                })
                .then(applicationsWithJobs => {
                    setApplications(applicationsWithJobs);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to load your applications',
                        confirmButtonColor: '#2563eb',
                    });
                });
        }
    }, [user]);

    const filteredApplications = applications
        .filter(app => {
            if (filter === 'all') return true;
            if (filter === 'pending' || filter === 'accepted' || filter === 'rejected') {
                return app.status === filter;
            }
            // Filter by job category if it's not a status filter
            return app.jobDetails?.category === filter;
        })
        .filter(app => {
            if (!searchTerm.trim()) return true;
            const searchLower = searchTerm.toLowerCase();
            return (
                app.jobDetails?.title?.toLowerCase().includes(searchLower) ||
                app.jobDetails?.company?.toLowerCase().includes(searchLower) ||
                app.jobDetails?.location?.toLowerCase().includes(searchLower) ||
                app.jobDetails?.category?.toLowerCase().includes(searchLower) ||
                app.jobDetails?.jobType?.toLowerCase().includes(searchLower) ||
                app.fullName?.toLowerCase().includes(searchLower) ||
                app.email?.toLowerCase().includes(searchLower)
            );
        });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'text-green-500';
            case 'rejected':
                return 'text-red-500';
            default:
                return 'text-yellow-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted':
                return <FiCheckCircle className="text-green-500" />;
            case 'rejected':
                return <FiXCircle className="text-red-500" />;
            default:
                return <FiClock className="text-yellow-500" />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        My Applications
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Track and manage all your job applications in one place
                    </motion.p>
                </div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">

                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search applications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <FiFilter className="text-gray-500" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            <option value="all">All Applications</option>
                            <option disabled>──── Status ────</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option disabled>──── Categories ────</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                            <option value="Sales">Sales</option>
                            <option value="Finance">Finance</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                        </select>
                    </div>
                </motion.div>

                {/* Applications List */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="text-blue-500">
                            <FiLoader className="h-10 w-10" />
                        </motion.div>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white shadow rounded-lg p-10 text-center">
                        <FiBriefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {searchTerm || filter !== 'all'
                                ? 'Try changing your search or filter settings'
                                : 'You haven\'t applied to any jobs yet'}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4">
                        {filteredApplications.map((application, index) => (
                            <motion.div
                                key={application._id || index}
                                variants={itemVariants}
                                className="bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-md transition-shadow duration-300">
                                <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                                            <FiBriefcase className="text-blue-500" />
                                            {application.jobDetails?.title || 'Job Title'}
                                        </h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500 flex items-center gap-1">
                                            <FiMapPin className="text-gray-400" />
                                            {application.jobDetails?.location || 'Location not specified'}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {application.jobDetails?.jobType && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {application.jobDetails.jobType}
                                                </span>
                                            )}
                                            {application.jobDetails?.category && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {application.jobDetails.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(application.status || 'pending')}
                                            <span className={`text-sm font-medium capitalize ${getStatusColor(application.status || 'pending')}`}>
                                                {application.status || 'pending'}
                                            </span>
                                        </div>
                                        {application.jobDetails?.applicationDeadline && (
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <FiCalendar className="text-gray-400" />
                                                Deadline: {new Date(application.jobDetails.applicationDeadline).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                                <FiMapPin className="text-gray-400" /> Full Name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">{application.fullName || 'Not specified'}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                                <FiCalendar className="text-gray-400" /> Email
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">{application.email || 'Not specified'}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{application.phone || 'Not specified'}</dd>
                                        </div>
                                        {application.portfolio && (
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Portfolio</dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        View Portfolio
                                                    </a>
                                                </dd>
                                            </div>
                                        )}
                                        {application.coverLetter && (
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">Cover Letter</dt>
                                                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{application.coverLetter}</dd>
                                            </div>
                                        )}
                                        {application.jobId && (
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">Job ID</dt>
                                                <dd className="mt-1 text-sm text-gray-900 font-mono">{application.jobId}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MyApplications;