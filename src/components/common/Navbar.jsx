// src/components/common/Navbar.jsx
import React from "react";

export default function Navbar({ title = "Event Attendance System", right }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        padding: "12px 14px",
        boxShadow: "0 8px 26px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
      }}
    >
      <div>
        <div style={{ fontWeight: 900 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>QR Based Attendance</div>
      </div>
      <div>{right}</div>
    </div>
  );
}