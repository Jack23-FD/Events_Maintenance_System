import { useEffect, useState } from "react";
import { registrationService } from "../../services/registrationService";
import { formatDate } from "../../utils/formatDate";
import { QRCodeCanvas } from "qrcode.react";

export default function MyEvent() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await registrationService.myRegistrations();
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setMsg("Failed to load your registrations (backend not ready?)");
        setRows([]);
      }
    })();
  }, []);

  return (
    <div className="row">
      <h1 style={{ margin: 0 }}>My Events (QR)</h1>
      {msg && <div className="card">{msg}</div>}

      <div style={{ display: "grid", gap: 12 }}>
        {rows.length === 0 && <div className="card">No registrations found.</div>}

        {rows.map((r) => {
          const ev = r.event || {};
          const registrationId = r.registrationId || r.id; // backend may use id
          return (
            <div className="card" key={registrationId}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{ev.title || "Event"}</h3>
                  <div style={{ opacity: 0.75, marginTop: 6 }}>
                    {ev.venue || "—"} • {formatDate(ev.eventDate)}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <b>Registration ID:</b> {registrationId}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                    Show this QR at entry and exit scan.
                  </div>
                </div>

                <div style={{ marginLeft: "auto" }}>
                  <QRCodeCanvas value={String(registrationId)} size={160} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}