import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login-player" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />; // redirect if role not allowed
  }

  return children;
}

export default RoleProtectedRoute;
