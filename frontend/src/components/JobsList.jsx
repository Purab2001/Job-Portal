import React, { use } from 'react';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';

const tableVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.04, duration: 0.3 }
    })
};

const JobsList = ({ jobsCreatedByPromise, user }) => {
    const jobs = use(jobsCreatedByPromise);

    return (
        <div className='max-w-7xl mx-auto px-6 py-20'>
            <div className="rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0"
                    >
                        Jobs List
                    </motion.h2>
                    {user?._id && (
                        <motion.a
                            href={`/myApplications/${user._id}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition-colors cursor-pointer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <FiEye className="h-5 w-5" />
                            View My Applications
                        </motion.a>
                    )}
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-gray-500 mb-6 pb-2 border-b border-gray-100"
                >
                    All jobs you have created are listed below.
                </motion.p>
                <motion.div
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                    className="overflow-x-auto"
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {jobs && jobs.length > 0 ? (
                                jobs.map((job, idx) => (
                                    <motion.tr
                                        key={job._id || idx}
                                        variants={rowVariants}
                                        custom={idx}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.company}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <motion.div
                                                whileHover={{ scale: 1.08 }}
                                                whileTap={{ scale: 0.96 }}
                                                className="inline-flex"
                                            >
                                                <Link
                                                    to={`/applications/${job._id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                                                >
                                                    <FiEye className="h-4 w-4" />
                                                    View
                                                </Link>
                                            </motion.div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        No jobs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
};

export default JobsList;