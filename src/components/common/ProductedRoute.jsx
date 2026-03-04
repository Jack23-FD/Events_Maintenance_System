// src/components/common/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login/user" replace />;

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"} replace />;
  }

  return children;
}