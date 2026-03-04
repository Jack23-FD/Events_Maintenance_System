// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import AdminLogin from "../pages/auth/AdminLogin";
import UserLogin from "../pages/auth/UserLogin";

import AdminDashboard from "../pages/admin/DashBoard";
import AdminHome from "../pages/admin/AdminHome";
import CreateEvent from "../pages/admin/CreateEvent";
import ManageEvent from "../pages/admin/ManageEvent";
import Scanner from "../pages/admin/Scanner";

import UserDashboard from "../pages/user/DashBoard";
import EventRegistration from "../pages/user/EventRegistration";
import MyEvent from "../pages/user/MyEvent";
import Certificate from "../pages/user/Certificate";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login/user" replace />} />

      {/* AUTH */}
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/user" element={<UserLogin />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="manage-event" element={<ManageEvent />} />
        <Route path="scanner" element={<Scanner />} />
      </Route>

      {/* USER */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="event-registration" element={<EventRegistration />} />
        <Route path="my-events" element={<MyEvent />} />
        <Route path="certificates" element={<Certificate />} />
      </Route>

      <Route path="*" element={<div style={{ padding: 20 }}>404 - Page Not Found</div>} />

    </Routes>
  );
}