import React, { useContext } from 'react';
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface Props {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }:Props) => {
  const { user } = useContext(AuthContext);

  if (!user?.uid) {
    // Redirect to login or handle unauthenticated user
    return <Navigate to="/login" />;
  }

  return <>{children}</> // Render children components if user is logged in
};

export default ProtectedRoute;
