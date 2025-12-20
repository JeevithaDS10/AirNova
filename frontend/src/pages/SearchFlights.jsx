// src/pages/SearchFlights.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./search-flights.css";

export default function SearchFlights() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("oneway");

  function handleSearch() {
    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }

    navigate("/results", {
      state: { from, to, date, passengers, tripType }
    });
  }

  return (
    <>
      <Navbar />

      <div className="search-page">
        <h1 className="page-title">Search Flights ✈️</h1>
        <p className="subtitle">
          Find the best flights with smart price & weather insights
        </p>

        <div className="search-card">
          {/* Trip Type */}
          <div className="trip-type">
            <button
              className={tripType === "oneway" ? "active" : ""}
              onClick={() => setTripType("oneway")}
            >
              One Way
            </button>
            <button
              className={tripType === "round" ? "active" : ""}
              onClick={() => setTripType("round")}
            >
              Round Trip
            </button>
          </div>

          {/* Inputs */}
          <label>From</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Departure city"
          />

          <label>To</label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Destination city"
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

          <button className="search-btn" onClick={handleSearch}>
            🔍 Search Flights
          </button>
        </div>

        {/* Popular Routes */}
        <div className="popular-routes">
          <h3>Popular Routes</h3>
          <div className="routes">
            {[
              ["Bengaluru", "Delhi"],
              ["Mumbai", "Bengaluru"],
              ["Chennai", "Hyderabad"],
              ["Mysuru", "Bengaluru"]
            ].map(([a, b], i) => (
              <button
                key={i}
                onClick={() => {
                  setFrom(a);
                  setTo(b);
                }}
              >
                {a} → {b}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
