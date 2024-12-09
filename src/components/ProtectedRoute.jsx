import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((store) => store);
  // console.log("auth ", auth); 
  if (!auth.jwt || !auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
