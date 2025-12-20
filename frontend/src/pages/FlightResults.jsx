// src/pages/FlightResults.jsx
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./flight-results.css";

export default function FlightResults() {
  const location = useLocation();
  const { from, to, date } = location.state || {};

  const flights = [
    {
      airline: "IndiGo",
      route: "Mysuru → Bengaluru",
      duration: "2h 15m",
      stops: "Non-stop",
      price: 3136,
      weather: "☀️ Clear 26°C",
      priceHint: "🟢 Good time to book"
    },
    {
      airline: "Air India",
      route: "Mysuru → Chennai → Bengaluru",
      duration: "3h 25m",
      stops: "1 stop",
      price: 4811,
      weather: "🌤 Partly Cloudy",
      priceHint: "🟡 Prices stable"
    },
    {
      airline: "Vistara",
      route: "Mysuru → Hyderabad → Bengaluru",
      duration: "3h 30m",
      stops: "1 stop",
      price: 4914,
      weather: "🌧 Light rain expected",
      priceHint: "🔴 Price may increase"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="results-page">
        {/* SEARCH SUMMARY */}
        <div className="search-summary">
          <h2>
            {from} → {to}
          </h2>
          <p>{date || "Selected date"}</p>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <span className="filter active">All</span>
          <span className="filter">Non-stop</span>
          <span className="filter">1 Stop</span>
          <span className="filter">Cheapest</span>
        </div>

        {/* FLIGHT LIST */}
        <div className="flight-list">
          {flights.map((f, i) => (
            <div key={i} className="flight-card">
              <div className="flight-left">
                <h3>{f.airline}</h3>
                <p className="route">{f.route}</p>
                <p className="meta">
                  {f.duration} • {f.stops}
                </p>
              </div>

              <div className="flight-middle">
                <span className="weather">{f.weather}</span>
                <span className="price-hint">{f.priceHint}</span>
              </div>

              <div className="flight-right">
                <h3>₹{f.price}</h3>
                <button className="select-btn">Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
