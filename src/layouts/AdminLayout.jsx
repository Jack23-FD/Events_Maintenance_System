// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import "./layout.css";

export default function AdminLayout() {
  return (
    <div className="layout">
      <AdminSidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}