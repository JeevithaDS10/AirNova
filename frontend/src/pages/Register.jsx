// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  function simpleValidate() {
    if (!name.trim()) return "Please enter your name";
    if (!email.trim()) return "Please enter your email";
    if (!password || password.length < 8)
      return "Password must be at least 8 characters";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    const v = simpleValidate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      // Normal payload expected by backend: { name, email, password, phone }
      const res = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
      });

      // backend might return success message or user id
      // if registerUser threw, we'll be in catch block.
      setSuccessMsg("Registration successful! Please login.");
      // small delay and navigate to login
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      // If `registerUser` throws Error with message, show that, otherwise stringify
      setError(err?.message || JSON.stringify(err) || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-toggle" style={{ marginBottom: 8 }}>
        <button onClick={() => navigate("/login")} type="button">Login</button>
        <button className="active" type="button">Register</button>
      </div>

      <h2>Create Account</h2>

      {error && <p className="auth-error" style={{ color: "#c62828" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>

        <label>
          Phone (optional)
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account?
        <button onClick={() => navigate("/login")} type="button">Login</button>
      </p>
    </div>
  );
}
