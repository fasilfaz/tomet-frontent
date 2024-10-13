import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({ children, isAuthenticated, role }) => {

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    if(role !== 'admin') {
        return <Navigate to={"/login"} />
    }

    return children;
};

export default ProtectedRouter;
