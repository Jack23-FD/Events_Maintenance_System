// src/components/admin/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function AdminSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login/admin");
  };

  return (
    <aside style={{ background: "#0b1220", color: "white", padding: 16 }}>
      <h2 style={{ margin: 0 }}>Admin Panel</h2>
      <p style={{ opacity: 0.7, marginTop: 6 }}>Event Attendance (QR)</p>

      <nav style={{ display: "grid", gap: 10, marginTop: 18 }}>
        <NavLink className="nav" to="/admin/dashboard">Dashboard</NavLink>
        <NavLink className="nav" to="/admin/create-event">Create Event</NavLink>
        <NavLink className="nav" to="/admin/manage-event">Manage Event</NavLink>
        <NavLink className="nav" to="/admin/scanner">Scanner</NavLink>
      </nav>

      <button onClick={handleLogout} style={{ marginTop: 18 }} className="btn">
        Logout
      </button>

      <style>{`
        .nav{
          color:white;
          text-decoration:none;
          padding:10px 12px;
          border-radius:10px;
          background: rgba(255,255,255,0.06);
        }
        .nav.active{
          background: rgba(255,255,255,0.18);
          font-weight:600;
        }
      `}</style>
    </aside>
  );
}