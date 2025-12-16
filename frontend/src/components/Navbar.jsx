import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("airnova_user"));

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        ✈️ <span>AirNova</span>
      </div>

      <div className="nav-center">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/search")}>Book Flight</button>
        <button onClick={() => navigate("/bookings")}>My Bookings</button>
        <button onClick={() => navigate("/weather")}>Weather</button>
        <button onClick={() => navigate("/price")}>Price</button>
      </div>

      <div className="nav-right">
        <span className="username">{user?.name || "User"}</span>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
