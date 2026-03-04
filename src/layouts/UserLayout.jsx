// src/layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import "./layout.css";

export default function UserLayout() {
  return (
    <div className="layout">
      <UserSidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}