import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRoutesProps {
    children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to='/login' />;
    }
    return <>{children}</>;
};

export default ProtectedRoutes;
