import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";




export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("airnova_user"));

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>
            Welcome, {user?.name || "User"} 👋
          </h1>
          <p>Your AirNova dashboard</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Upcoming Trips</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Last Payment</h3>
            <p>N/A</p>
          </div>

          <div className="stat-card">
            <h3>Notifications</h3>
            <p>0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-section">
          <h2>Quick Actions</h2>

          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate("/search")}>
              <span>✈️</span>
              Book Flight
            </button>

            <button className="action-btn" onClick={() => navigate("/bookings")}>
              <span>📄</span>
              My Bookings
            </button>

            <button className="action-btn" onClick={() => navigate("/weather")}>
              <span>🌦</span>
              Weather Forecast
            </button>

            <button className="action-btn" onClick={() => navigate("/price")}>
              <span>📈</span>
              Price Prediction
            </button>

            <button className="action-btn logout-btn" onClick={handleLogout}>
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


<>
  <Navbar />
  <div className="dashboard-wrapper">
    {/* existing dashboard code */}
  </div>
</>
