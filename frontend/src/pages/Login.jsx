// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login({ onSwitchMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      console.log("login response:", res);

      // token / user shape normalization:
      const token = res.access_token || res.raw?.token || res.raw?.access_token || null;
      const user = res.user || res.raw?.user || (res.user ? res.user : null);

      if (token && user) {
        localStorage.setItem("airnova_token", token);
        localStorage.setItem("airnova_user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        console.error("Login response missing token or user:", res);
        setError("Login succeeded but server returned an unexpected response. Check console.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>

      <p>
        No account? <button onClick={onSwitchMode}>Register</button>
      </p>
    </div>
  );
}
