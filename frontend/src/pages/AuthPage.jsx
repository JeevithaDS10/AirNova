// src/pages/AuthPage.jsx
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./auth-page.css"; // make sure this path is correct

export default function AuthPage() {
  // default mode can be 'register' or 'login'
  const [mode, setMode] = useState("register");

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-tabs" role="tablist" aria-label="Auth tabs">
          <button
            type="button"
            className={`tab-button ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
            aria-pressed={mode === "login"}
          >
            Login
          </button>

          <button
            type="button"
            className={`tab-button ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
            aria-pressed={mode === "register"}
          >
            Register
          </button>
        </div>

        <div className="auth-body">
          {mode === "login" ? (
            <Login onSwitch={() => setMode("register")} />
          ) : (
            <Register onSwitch={() => setMode("login")} />
          )}
        </div>
      </div>
    </div>
  );
}
