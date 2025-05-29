import React, { Suspense } from 'react';
import useAuth from '../../hooks/useAuth';
import JobsList from '../../components/JobsList';
import { jobsCreatedByPromise } from '../../api/jobsAPI';

const MyPostedJobs = () => {

    const { user } = useAuth();

    return (
        <div>
            <Suspense>
                <JobsList jobsCreatedByPromise={jobsCreatedByPromise(user.email)} />
            </Suspense>
        </div>
    );
};

export default MyPostedJobs;