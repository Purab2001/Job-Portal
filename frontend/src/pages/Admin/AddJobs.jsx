import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const initialState = {
    title: '',
    location: '',
    jobType: 'Hybrid',
    category: 'Engineering',
    applicationDeadline: '',
    salaryRange: {
        min: '',
        max: '',
        currency: 'bdt'
    },
    description: '',
    company: '',
    requirements: [],
    responsibilities: [],
    status: 'active',
    hr_email: '',
    hr_name: '',
    company_logo: ''
};

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
        },
    }),
};

const AddJobs = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState(initialState);
    const [requirementsInput, setRequirementsInput] = useState('');
    const [responsibilitiesInput, setResponsibilitiesInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('salaryRange.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                salaryRange: {
                    ...prev.salaryRange,
                    [key]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddJob = e => {
        e.preventDefault();

        const data = {
            ...formData,
            requirements: requirementsInput
                .split(',')
                .map(req => req.trim()),
            responsibilities: responsibilitiesInput
                .split(',')
                .map(res => res.trim()),
            salaryRange: {
                ...formData.salaryRange,
                min: Number(formData.salaryRange.min),
                max: Number(formData.salaryRange.max),
            },
        };
        data.status = 'active';

        console.log('Job Data:', data);

        axios.post('https://job-portal-umber-chi.vercel.app/jobs', data)
            .then(response => {
                console.log('Job added successfully:', response.data);
                setFormData(initialState);
                setRequirementsInput('');
                setResponsibilitiesInput('');
                toast.success('Job added successfully!');
            })
            .catch(error => {
                console.error('Error adding job:', error);
                toast.error('Failed to add job. Please try again.');
            });
    };

    return (
        <div className="bg-gray-50 pb-20 pt-30">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8"
                >
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Add New Job
                    </motion.h2>
                    <motion.form
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleAddJob}
                        className="space-y-6"
                    >
                        {/* Job Title */}
                        <motion.div variants={itemVariants} custom={0}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="e.g. Software Engineer"
                            />
                        </motion.div>
                        {/* Location */}
                        <motion.div variants={itemVariants} custom={1}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="e.g. Dhaka"
                            />
                        </motion.div>
                        {/* Job Type & Category */}
                        <motion.div variants={itemVariants} custom={2} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Onsite">Onsite</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Engineering">Engineering</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Finance">Finance</option>
                                </select>
                            </div>
                        </motion.div>
                        {/* Application Deadline */}
                        <motion.div variants={itemVariants} custom={3}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                name="applicationDeadline"
                                value={formData.applicationDeadline}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </motion.div>
                        {/* Salary Range */}
                        <motion.div variants={itemVariants} custom={4} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="salaryRange.min"
                                    value={formData.salaryRange.min}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    placeholder="e.g. 20000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    name="salaryRange.max"
                                    value={formData.salaryRange.max}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    placeholder="e.g. 50000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                <select
                                    name="salaryRange.currency"
                                    value={formData.salaryRange.currency}
                                    onChange={handleChange}
                                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="bdt">BDT</option>
                                    <option value="usd">USD</option>
                                </select>
                            </div>
                        </motion.div>
                        {/* Description */}
                        <motion.div variants={itemVariants} custom={5}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                required
                                placeholder="Describe the job role, expectations, etc."
                            />
                        </motion.div>
                        {/* Company Name */}
                        <motion.div variants={itemVariants} custom={6}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="e.g. Google"
                            />
                        </motion.div>
                        {/* Requirements */}
                        <motion.div variants={itemVariants} custom={7}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={requirementsInput}
                                onChange={e => setRequirementsInput(e.target.value)}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g. Python, SQL, Tableau, Statistics"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate requirements with commas.</p>
                        </motion.div>
                        {/* Responsibilities */}
                        <motion.div variants={itemVariants} custom={8}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={responsibilitiesInput}
                                onChange={e => setResponsibilitiesInput(e.target.value)}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g. Analyze data, Create reports, Present findings"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate responsibilities with commas.</p>
                        </motion.div>
                        {/* HR Email */}
                        <motion.div variants={itemVariants} custom={9}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">HR Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                name="hr_email"
                                defaultValue={user.email}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="hr@example.com"
                            />
                        </motion.div>
                        {/* HR Name */}
                        <motion.div variants={itemVariants} custom={10}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">HR Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="hr_name"
                                value={formData.hr_name}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="e.g. Jane Doe"
                            />
                        </motion.div>
                        {/* Company Logo URL */}
                        <motion.div variants={itemVariants} custom={11}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
                            <input
                                type="url"
                                name="company_logo"
                                value={formData.company_logo}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://logo-url.com"
                            />
                        </motion.div>
                        {/* Status */}
                        <motion.div variants={itemVariants} custom={12}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </motion.div>
                        {/* Submit Button */}
                        <motion.div variants={itemVariants} custom={13} className="pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
                            >
                                Submit
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddJobs;