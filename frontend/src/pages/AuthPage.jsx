import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./auth-page.css";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-in">
        {/* Brand Header */}
        <div className="brand-header">
          <h1 className="brand-title">
            ✈️ Welcome to <span>AeroNova</span>
          </h1>
          <p className="brand-tagline">
            Secure, Smart & Seamless Flight Booking
          </p>
        </div>

       

        {mode === "login" ? (
          <Login onSwitch={() => setMode("register")} />
        ) : (
          <Register onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
