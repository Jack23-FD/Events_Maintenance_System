// src/pages/auth/AdminLogin.jsx
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { ROLES } from "../../utils/constants";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await authService.adminLogin(email, password);

      // safety: if backend doesn't send role, set it
      const finalData = { ...data, role: data.role || ROLES.ADMIN };
      login(finalData);

      navigate("/admin/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b1220" }}>
      <form onSubmit={onSubmit} className="card" style={{ width: 420 }}>
        <h2 style={{ marginTop: 0 }}>Admin Login</h2>
        {err && <div style={{ background: "#fee2e2", padding: 10, borderRadius: 10, marginBottom: 10 }}>{err}</div>}

        <label>Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@mail.com" />

        <div style={{ height: 10 }} />

        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

        <button className="btn" style={{ width: "100%", marginTop: 14 }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: 12, opacity: 0.7 }}>
          User login? <Link to="/login/user">Go here</Link>
        </p>
      </form>
    </div>
  );
}