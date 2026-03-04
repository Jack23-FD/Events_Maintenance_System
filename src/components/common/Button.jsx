// src/components/common/Button.jsx
import React from "react";

export default function Button({ children, variant = "primary", style, ...props }) {
  const base = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  };

  const variants = {
    primary: { background: "#111827", color: "white" },
    secondary: { background: "#e5e7eb", color: "#111827" },
    danger: { background: "#ef4444", color: "white" },
  };

  return (
    <button style={{ ...base, ...variants[variant], ...style }} {...props}>
      {children}
    </button>
  );
}