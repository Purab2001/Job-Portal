import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData, useParams } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiLoader, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.08, duration: 0.5 }
    }
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.04, duration: 0.3 }
    })
};

const ViewApplications = () => {
    const { jobId } = useParams();
    const applications = useLoaderData();
    const [loading, setLoading] = useState(false);

    const handleStatusChange = (e, app_id) => {
        setLoading(true);
        axios.patch(`https://job-portal-umber-chi.vercel.app/applications/${app_id}`, { status: e.target.value })
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Application status updated successfully!");
                } else {
                    toast.error("Failed to update application status.");
                }
            })
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'hired':
            case 'accepted':
                return <FiCheckCircle className="text-green-500" />;
            case 'rejected':
                return <FiXCircle className="text-red-500" />;
            case 'interview':
                return <FiClock className="text-blue-500" />;
            default:
                return <FiClock className="text-yellow-500" />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <Toaster position='top-right' />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto px-6"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-gray-900 mb-8 text-center"
                >
                    {applications.length} Applications for Job: <span className="text-blue-600">{jobId}</span>
                </motion.h1>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white divide-y divide-gray-100"
                        >
                            {applications.map((application, idx) => (
                                <motion.tr
                                    key={application._id}
                                    variants={rowVariants}
                                    custom={idx}
                                    className="hover:bg-blue-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center gap-2">
                                        {getStatusIcon(application.status)}
                                        <span className="capitalize">{application.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <select
                                            onChange={e => handleStatusChange(e, application._id)}
                                            defaultValue={application.status}
                                            className="select select-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            disabled={loading}
                                        >
                                            <option disabled>Update Status</option>
                                            <option>Pending</option>
                                            <option>Interview</option>
                                            <option>Hired</option>
                                            <option>Rejected</option>
                                        </select>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                    {loading && (
                        <div className="flex justify-center items-center py-6">
                            <FiLoader className="animate-spin h-6 w-6 text-blue-500" />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ViewApplications;