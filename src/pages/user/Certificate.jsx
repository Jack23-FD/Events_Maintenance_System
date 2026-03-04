// src/pages/user/Certificate.jsx
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";

export default function Certificate() {
  const [certs, setCerts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await userService.getMyCertificates();
        setCerts(Array.isArray(data) ? data : []);
      } catch {
        setMsg("No certificates / backend not connected");
        setCerts([]);
      }
    })();
  }, []);

  return (
    <div className="row">
      <h1 style={{ margin: 0 }}>Certificates</h1>
      {msg && <div className="card">{msg}</div>}

      <div className="card">
        {certs.length === 0 ? (
          <div>No certificates found.</div>
        ) : (
          <ul>
            {certs.map((c) => (
              <li key={c.id}>
                {c.title || "Certificate"}{" "}
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noreferrer">Download</a>
                ) : (
                  <span style={{ opacity: 0.7 }}>(no url)</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}