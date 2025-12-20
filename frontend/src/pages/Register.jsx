// src/pages/Register.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./auth-page.css";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role; // CUSTOMER or CREW

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    crewRole: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // later connect backend here
    console.log("REGISTER DATA:", { ...form, role });

    alert("Registration successful!");
    navigate("/login"); // 🔁 redirect after success
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* TITLE */}
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Join AeroNova to book flights seamlessly
        </p>

        {/* FORM */}
        <div className="auth-form">
          <label>
            Full Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </label>

          {/* 🔥 ONLY FOR CREW */}
          {role === "CREW" && (
            <label>
              Crew Role
              <select
                name="crewRole"
                value={form.crewRole}
                onChange={handleChange}
              >
                <option value="">Select role</option>
                <option value="PILOT">Pilot</option>
                <option value="CABIN_CREW">Cabin Crew</option>
                <option value="GROUND_STAFF">Ground Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>
          )}

          <button className="primary-btn" onClick={handleRegister}>
            Register
          </button>
        </div>

        {/* FOOTER */}
        <div className="auth-footer">
          Already have an account?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>

      </div>
    </div>
  );
}
