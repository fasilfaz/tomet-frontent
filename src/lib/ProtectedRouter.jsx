import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({ children, isAuthenticated, role }) => {
    const dispatch = useDispatch();

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    // if (isAuthenticated && role === 'admin') {
    //     return <Navigate to={'/admin/dashboard'} />;
    // } else if (isAuthenticated && role === 'seller') {
    //     return <Navigate to={'/seller/dashboard'} />;
    // }

    return children;
};

export default ProtectedRouter;
