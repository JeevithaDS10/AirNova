// src/components/Navbar.jsx
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="logo">✈ AeroNova</span>

        <ul className="nav-links">
          <li>Home</li>
          <li>Flights</li>
          <li>Price Prediction</li>
          <li>Weather</li>
          <li>My Trips</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="nav-alert">
          <span>
            ✨ New routes added · Fare alerts enabled · Book early & save more
          </span>
        </div>

        <div className="profile">
          👤
        </div>
      </div>
    </nav>
  );
}
