// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((store) => store.auth);
  const user = useSelector((store) => store.user);
  const location = useLocation();

  if (!user.profile) {
    console.log(auth, user);
    // Redirect to login with the return URL
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
