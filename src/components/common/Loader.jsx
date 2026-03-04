// src/components/common/Loader.jsx
import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "3px solid #e5e7eb",
          borderTop: "3px solid #111827",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span style={{ opacity: 0.8 }}>{text}</span>

      <style>{`
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
      `}</style>
    </div>
  );
}