import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { attendanceService } from "../../services/attendanceService";

export default function Scanner() {
  const [lastId, setLastId] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [status, setStatus] = useState("Starting camera...");
  const instanceRef = useRef(null);
  const lockRef = useRef(false);

  const doScan = async (registrationId) => {
    setStatus("Checking registration...");
    try {
      const res = await attendanceService.scan(registrationId);
      setScanResult(res);
      setStatus(res?.message || "✅ Scan processed");
    } catch (e) {
      setScanResult(null);
      setStatus(e?.response?.data?.message || "❌ Scan failed");
    }
  };

  useEffect(() => {
    const start = async () => {
      const html5QrCode = new Html5Qrcode("qr-reader");
      instanceRef.current = html5QrCode;

      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            // decodedText should be registrationId
            const id = String(decodedText).trim();
            if (!id) return;

            // prevent spamming repeated scans in 1 second
            if (lockRef.current) return;
            lockRef.current = true;
            setTimeout(() => (lockRef.current = false), 1200);

            setLastId(id);
            await doScan(id);
          },
          () => {}
        );

        setStatus("Camera ready. Scan student QR.");
      } catch {
        setStatus("❌ Camera permission / device issue");
      }
    };

    start();

    return () => {
      const stop = async () => {
        try {
          const inst = instanceRef.current;
          if (inst) {
            await inst.stop();
            await inst.clear();
          }
        } catch {}
      };
      stop();
    };
  }, []);

  return (
    <div className="row">
      <h1 style={{ margin: 0 }}>Admin QR Scanner</h1>

      <div className="grid2">
        <div className="card">
          <div id="qr-reader" />
          <p style={{ marginBottom: 0, fontSize: 12, opacity: 0.7 }}>
            QR value must be: <b>registrationId</b>
          </p>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Status</h3>
          <p>{status}</p>

          <div style={{ marginTop: 10 }}>
            <b>Last Registration ID:</b> {lastId || "—"}
          </div>

          <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

          <h3 style={{ marginTop: 0 }}>Confirmation</h3>

          {!scanResult ? (
            <div style={{ opacity: 0.7 }}>Scan a QR to see details.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              <div>
                <b>Registered?</b>{" "}
                {scanResult.registered ? "✅ YES" : "❌ NO"}
              </div>

              <div>
                <b>Student:</b> {scanResult.studentName || "—"}
              </div>

              <div>
                <b>Event:</b> {scanResult.eventTitle || "—"}
              </div>

              <div>
                <b>Next Action:</b> {scanResult.nextAction || "—"}
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  (Backend decides IN / OUT / DONE)
                </div>
              </div>

              <div style={{ padding: 10, borderRadius: 10, background: "#eef2ff" }}>
                {scanResult.message || "—"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}