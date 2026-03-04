// src/components/admin/AdminCard.jsx

import React from "react";

function AdminCard({ title, value, hint }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "10px",
      }}
    >
      <h4 style={{ margin: 0, color: "#555" }}>{title}</h4>

      <h2 style={{ margin: "10px 0", color: "#111" }}>{value}</h2>

      <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{hint}</p>
    </div>
  );
}

export default AdminCard;