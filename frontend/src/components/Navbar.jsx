import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">✈ AirNova</span>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/search">Book Flight</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/price">Price</Link>
      </div>

      <div className="nav-right">
        <span className="username">JEEVITHA D S</span>
        <button className="logout-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>
    </nav>
  );
}
