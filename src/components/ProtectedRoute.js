import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        // מפנה את המשתמש לדף התחברות אם הוא לא מחובר
        return <Navigate to="/login" />;
    }

    // מחזיר את הרכיב המבוקש אם המשתמש מחובר
    return children;
};

export default ProtectedRoute;
