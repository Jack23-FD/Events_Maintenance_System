// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../utils/constants";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);

  if (!token) return <Navigate to="/login/user" replace />;

  if (role && savedRole !== role) {
    // if admin tries user page or user tries admin page
    if (savedRole === ROLES.ADMIN) return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}