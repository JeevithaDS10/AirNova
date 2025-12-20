import { useNavigate } from "react-router-dom";
import "./role-select.css";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="role-card-main">
        
        {/* Branding */}
       <div className="role-header">
  <h1>
    Welcome to <span>AeroNova</span>
  </h1>
  <p className="tagline">
    Secure, Smart & Seamless Flight Booking
  </p>
</div>


        {/* Title */}
        <h2 className="role-title">Choose your role</h2>

        {/* Cards */}
        <div className="role-options">
          <div
            className="role-option"
            onClick={() => navigate("/register/user")}
          >
            <div className="role-icon">👤</div>
            <h3>Customer</h3>
            <p>Search, book flights & manage trips</p>
          </div>

          <div
            className="role-option"
            onClick={() => navigate("/register/crew")}
          >
            <div className="role-icon">🧑‍✈️</div>
            <h3>Crew</h3>
            <p>Manage flights & onboard operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
