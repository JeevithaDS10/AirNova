import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login({ onSwitch }) {
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

      const token = res.token || res.access_token;
      const user = res.user;

      if (token && user) {
        localStorage.setItem("aeronova_token", token);
        localStorage.setItem("aeronova_user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Unexpected server response");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="auth-subtitle">Sign in to your account</h2>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      {/* 👇 THIS IS THE TEXT YOU WERE LOOKING FOR */}
      <p className="switch-text">New to AeroNova?</p>

     <button
  className="auth-btn secondary"
  onClick={() => navigate("/register/role")}
>
  Create an account
</button>

    </>
  );
}
