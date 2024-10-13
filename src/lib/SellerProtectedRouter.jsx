import React from 'react'
import { Navigate } from 'react-router-dom';

const SellerProtectedRouter = ({isAuthenticated, role, children}) => {
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    if(role !== 'seller') {
        return <Navigate to={"/login"} />
    }

    return children;
}

export default SellerProtectedRouter
