import { useEffect, useState } from "react";
import { eventService } from "../../services/eventService";
import EventCard from "../../components/user/EventCardComponent";
import { registrationService } from "../../services/registrationService";

export default function EventRegistration() {
  const [events, setEvents] = useState([]);
  const [msg, setMsg] = useState("");   

  useEffect(() => {
    (async () => {
      try {
        const data = await eventService.getAllEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch {
        setEvents([]);
      }
    })();
  }, []);

  const register = async (event) => {
    setMsg("");
    try {
      const res = await registrationService.register(event.id);
      setMsg(`✅ Registered for "${event.title}" | RegID: ${res?.registrationId || "(check backend)"}`);
    } catch (e) {
      setMsg(e?.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="row">
      <h1 style={{ margin: 0 }}>Event Registration</h1>
      {msg && <div className="card">{msg}</div>}

      <div style={{ display: "grid", gap: 12 }}>
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} onPrimary={register} primaryText="Register Now" />
        ))}
      </div>
    </div>
  );
}