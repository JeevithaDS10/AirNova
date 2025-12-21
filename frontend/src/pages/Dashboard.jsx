// src/pages/Dashboard.jsx
import "./dashboard.css";
import bgImage from "../assets/plane2.jpg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ username = "Jeevitha" }) {
  return (
    <div className="dashboard">
      <Navbar />

      {/* IMAGE – DO NOT TOUCH */}
      <div
        className="bg-main"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* HERO TEXT */}
      <div className="hero-text">
        <h2>Hi, {username} 👋</h2>
        <h1>
          Plan smarter<br />
          Fly with confidence
        </h1>
        <p>Your journey begins with the right decisions.</p>
        {/* // inside your text container (below the subtitle) */}
       <button className="search-btn">
       Search Flights
       </button>



      </div>
    </div>
  );
}
