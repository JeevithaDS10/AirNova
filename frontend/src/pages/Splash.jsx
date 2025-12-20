// src/pages/Splash.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-wrapper">
      <div className="splash-center">
        {/* Plane flies in the same horizontal line as the logo */}
        <div className="plane-track">
          <span className="plane-icon">✈</span>
        </div>

        {/* AIRNOVA text that is "brought in" by the plane */}
        <h1 className="splash-logo">AERONOVA</h1>

        {/* Subtitle */}
        <p className="splash-subtitle">
          Secure, Smart &amp; Seamless Flight Booking
        </p>
      </div>
    </div>
  );
}
