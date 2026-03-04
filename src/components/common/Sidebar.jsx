// src/components/common/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ title, subtitle, links = [], footer }) {
  return (
    <aside style={{ background: "#0b1220", color: "white", padding: 16 }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ opacity: 0.7, marginTop: 6 }}>{subtitle}</p>}

      <nav style={{ display: "grid", gap: 10, marginTop: 18 }}>
        {links.map((l) => (
          <NavLink key={l.to} className="nav" to={l.to}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      {footer && <div style={{ marginTop: 18 }}>{footer}</div>}

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