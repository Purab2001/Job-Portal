import React, { use } from 'react';
import AuthContext from "../contexts/AuthContext";
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const { user } = use(AuthContext)
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={location.pathname} replace />;
    }

    return children;
};

export default PrivateRoutes;