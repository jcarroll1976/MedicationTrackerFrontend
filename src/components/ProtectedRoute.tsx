import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user?.uid) {
    // Redirect to login or handle unauthenticated user
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render children or Outlet for nested routes
};

export default ProtectedRoute;
