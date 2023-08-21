import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to='/login' />;
    }
    return children;
};

export default ProtectedRoutes;
