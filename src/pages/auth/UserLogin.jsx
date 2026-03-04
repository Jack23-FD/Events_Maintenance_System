// src/pages/auth/UserLogin.jsx
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { ROLES } from "../../utils/constants";

export default function UserLogin() {
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
      const data = await authService.userLogin(email, password);
      const finalData = { ...data, role: data.role || ROLES.USER };
      login(finalData);
      navigate("/user/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "User login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#111827" }}>
      <form onSubmit={onSubmit} className="card" style={{ width: 420 }}>
        <h2 style={{ marginTop: 0 }}>User Login</h2>
        {err && <div style={{ background: "#fee2e2", padding: 10, borderRadius: 10, marginBottom: 10 }}>{err}</div>}

        <label>Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@mail.com" />

        <div style={{ height: 10 }} />

        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

        <button className="btn" style={{ width: "100%", marginTop: 14 }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: 12, opacity: 0.7 }}>
          Admin login? <Link to="/login/admin">Go here</Link>
        </p>
      </form>
    </div>
  );
}