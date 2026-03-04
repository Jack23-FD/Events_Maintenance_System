import React from "react";

export default function EventCard({ event, onPrimary, primaryText = "Register" }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10, marginBottom: 10 }}>
      <h3 style={{ margin: 0 }}>{event?.title || "Event"}</h3>
      <p style={{ opacity: 0.8 }}>{event?.description || ""}</p>

      <div style={{ fontSize: 13, opacity: 0.8 }}>
        <div><b>Date:</b> {event?.eventDate || "-"}</div>
        <div><b>Venue:</b> {event?.venue || "-"}</div>
      </div>

      {onPrimary && (
        <button
          onClick={() => onPrimary(event)}
          style={{
            marginTop: 10,
            padding: "8px 12px",
            border: "none",
            borderRadius: 8,
            background: "#111827",
            color: "white",
            cursor: "pointer",
          }}
        >
          {primaryText}
        </button>
      )}
    </div>
  );
}