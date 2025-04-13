import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  if (!user) {
    return <Navigate to="/admin-login" replace />; // Redirect if not logged in
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Redirect if role not allowed
  }

  return <Outlet />; // Render child routes if authorized
};

export default ProtectedRoute;
