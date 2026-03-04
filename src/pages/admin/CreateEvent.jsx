// src/pages/admin/CreateEvent.jsx
import { useState } from "react";
import { eventService } from "../../services/eventService";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await eventService.createEvent({ title, venue, eventDate, description });
      setMsg("✅ Event created successfully");
      setTitle("");
      setVenue("");
      setEventDate("");
      setDescription("");
    } catch (err) {
      setMsg(err?.response?.data?.message || "❌ Failed to create event");
    }
  };

  return (
    <div className="row">
      <h1 style={{ margin: 0 }}>Create Event</h1>

      <form className="card" onSubmit={onSubmit}>
        {msg && <div style={{ padding: 10, borderRadius: 10, background: "#eef2ff" }}>{msg}</div>}

        <div className="grid2" style={{ marginTop: 10 }}>
          <div>
            <label>Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Venue</label>
            <input className="input" value={venue} onChange={(e) => setVenue(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Event Date</label>
          <input className="input" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Description</label>
          <textarea className="textarea" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button className="btn" style={{ marginTop: 12 }}>Create</button>
      </form>
    </div>
  );
}