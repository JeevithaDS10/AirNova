// src/pages/SearchFlights.jsx
import { useState } from "react";
import "./search-flights.css";

export default function SearchFlights() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  function handleSearch(e) {
    e.preventDefault();
    console.log({ from, to, date, passengers });
    // later → navigate to results page
  }

  return (
    <div className="search-page">
      {/* PAGE TITLE */}
      <h1 className="page-title">
        Search Flights ✈️
      </h1>
      <p className="page-subtitle">
        Find the best flights with smart price & weather insights
      </p>

      {/* SEARCH CARD */}
      <div className="search-card">
        {/* TRIP TYPE */}
        <div className="trip-type">
          <span className="active">One Way</span>
          <span className="disabled">Round Trip</span>
        </div>

        <form onSubmit={handleSearch}>
          <label>From</label>
          <input
            type="text"
            placeholder="Departure city"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <label>To</label>
          <input
            type="text"
            placeholder="Destination city"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <div className="row">
            <div>
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label>Passengers</label>
              <input
                type="number"
                min="1"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="search-btn">
            🔍 Search Flights
          </button>
        </form>
      </div>

      {/* SMART INSIGHTS */}
      <div className="smart-insights">
        <div className="insight-card weather">
          🌦 <strong>Weather at Destination</strong>
          <p>Forecast available after selecting date</p>
        </div>

        <div className="insight-card price">
          📈 <strong>Price Prediction</strong>
          <p>AI will suggest the best time to book</p>
        </div>
      </div>

      {/* POPULAR ROUTES */}
      <div className="popular-routes">
        <h3>Popular Routes</h3>
        <div className="routes">
          <span>Bengaluru → Delhi</span>
          <span>Mumbai → Chennai</span>
          <span>Hyderabad → Kolkata</span>
          <span>Pune → Goa</span>
        </div>
      </div>
    </div>
  );
}
