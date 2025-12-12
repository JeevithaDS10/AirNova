// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register({ onSwitchMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      console.log("Register: sending", { name, email, phone });
      const res = await registerUser({ name, email, password, phone });

      // If your backend returns a simple { user_id, message }:
      if (res && (res.user_id || res.id || res.message)) {
        setSuccess(res.message || "Registered successfully — please log in.");
        // navigate to login after short delay so user sees message (optional)
        setTimeout(() => {
          if (onSwitchMode) onSwitchMode("login");
          else navigate("/login");
        }, 700);
        return;
      }

      // If backend returns user/token (uncommon for register), handle similarly:
      if (res.access_token && res.user) {
        localStorage.setItem("airnova_token", res.access_token);
        localStorage.setItem("airnova_user", JSON.stringify(res.user));
        navigate("/dashboard");
        return;
      }

      // fallback: show raw response for debugging
      console.error("Register response (raw):", res);
      setError("Registration completed but unexpected response format — check console.");
    } catch (err) {
      console.error("Register error:", err);
      // if fetch failed the Error message is err.message; if backend returned JSON with detail, registerUser should have thrown with it
      setError(err?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card" style={{ maxWidth: 380 }}>
      {/* TOP toggle - only one pair here */}
      <div className="auth-toggle" style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 18 }}>
        <button
          className="btn-small" 
          onClick={() => { if (onSwitchMode) onSwitchMode("login"); else navigate("/login"); }}
          type="button"
          style={{ padding: "8px 16px", borderRadius: 20, background: "#f2f7ff", border: "none" }}
        >
          Login
        </button>

        <button
          className="btn-small active"
          type="button"
          style={{ padding: "8px 16px", borderRadius: 20, background: "#eaf0ff", border: "none" }}
        >
          Register
        </button>
      </div>

      <h2 style={{ margin: "6px 0 12px" }}>Create Account</h2>

      {error && <p className="auth-error" style={{ color: "#d33", marginBottom: 12 }}>{error}</p>}
      {success && <p className="auth-success" style={{ color: "#1a7", marginBottom: 12 }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 10 }}>
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "10px", marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 10 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "10px", marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 10 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "10px", marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 16 }}>
          Phone (optional)
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ display: "block", width: "100%", padding: "10px", marginTop: 6 }}
            placeholder="9876543210"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            background: "#1e63f7",
            color: "#fff",
            border: "none",
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: 14, textAlign: "center" }}>
        Already have an account?{" "}
        <button
          onClick={() => { if (onSwitchMode) onSwitchMode("login"); else navigate("/login"); }}
          style={{ background: "transparent", border: "none", color: "#1e63f7", cursor: "pointer", textDecoration: "underline" }}
        >
          Login
        </button>
      </p>

      <p className="auth-note" style={{ marginTop: 10, fontSize: 13 }}>
        🔐 Authentication uses <strong>Argon2id</strong> (password hashing) + <strong>JWT</strong>.
      </p>
    </div>
  );
}
