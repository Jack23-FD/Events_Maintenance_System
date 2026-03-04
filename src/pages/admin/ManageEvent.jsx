// src/pages/admin/ManageEvent.jsx
import { useEffect, useState } from "react";
import { eventService } from "../../services/eventService";
import { formatDate } from "../../utils/formatDate";

export default function ManageEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const data = await eventService.getAllEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (e) {
      setMsg("Failed to load events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await eventService.deleteEvent(id);
      setMsg("✅ Deleted");
      load();
    } catch (e) {
      setMsg(e?.response?.data?.message || "❌ Delete failed");
    }
  };

  return (
    <div className="row">
      <h1 style={{ margin: 0 }}>Manage Events</h1>

      {msg && <div className="card">{msg}</div>}

      <div className="card">
        <button className="btn secondary" onClick={load} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {events.length === 0 && !loading && <div>No events found.</div>}

          {events.map((ev) => (
            <div key={ev.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{ev.title}</div>
                  <div style={{ opacity: 0.75, fontSize: 13 }}>
                    {ev.venue} • {formatDate(ev.eventDate)}
                  </div>
                </div>
                <button className="btn" onClick={() => onDelete(ev.id)}>Delete</button>
              </div>
              {ev.description && <p style={{ marginBottom: 0, opacity: 0.8 }}>{ev.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}