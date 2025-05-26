import React from 'react';
import Banner from '../components/Banner';
import HotJobs from '../components/HotJobs';

const Home = () => {

    const jobsPromise = fetch("https://job-portal-umber-chi.vercel.app/jobs").then(res => res.json());

    return (
        <div>
            <Banner />
            <HotJobs jobsPromise={jobsPromise} />
        </div>
    );
};

export default Home;