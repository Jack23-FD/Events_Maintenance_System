// src/pages/admin/DashBoard.jsx
import { useEffect, useState } from "react";
import AdminCard from "../../components/admin/AdminCard";
import { eventService } from "../../services/eventService";

export default function DashBoard() {
  const [eventsCount, setEventsCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const events = await eventService.getAllEvents();
        setEventsCount(Array.isArray(events) ? events.length : 0);
      } catch {
        setEventsCount(0);
      }
    })();
  }, []);

  return (
    <div className="row">
      <h1 style={{ margin: 0 }}>Admin Dashboard</h1>

      <div className="grid2">
        <AdminCard title="Total Events" value={eventsCount} hint="Fetched from backend" />
        <AdminCard title="Scanner Ready" value="YES" hint="Go to Scanner page" />
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Next Step</h3>
        <ol style={{ lineHeight: 1.7 }}>
          <li>Create event</li>
          <li>Manage event (edit/delete)</li>
          <li>Scanner page → scan QR → mark attendance</li>
        </ol>
      </div>
    </div>
  );
}