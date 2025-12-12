// src/pages/AuthPage.jsx
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./auth.css"; // optional - only if you have styles

// Single entry for auth page. Only this file should render login/register UI.
export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <div style={{ padding: 24 }}>
      <div className="auth-container" style={{ maxWidth: 420 }}>
        {/* top nav buttons (single pair) */}
        <div className="auth-toggle" style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
            type="button"
          >
            Register
          </button>
        </div>

        {/* Switch between the two forms — only one rendered at a time */}
        {mode === "login" ? (
          <Login onSwitchMode={(m) => setMode(m)} />
        ) : (
          <Register onSwitchMode={(m) => setMode(m)} />
        )}
      </div>
    </div>
  );
}
