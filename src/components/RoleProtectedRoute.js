import React from "react";
import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔒 Check login
  if (!token) {
    return <Navigate to="/login-player" />;
  }

  // 🔒 Check role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;
