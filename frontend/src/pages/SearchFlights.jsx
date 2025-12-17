import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search-flights.css";

export default function SearchFlights() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const autoFill = (fromCity, toCity) => {
    setFrom(fromCity);
    setTo(toCity);
  };

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill all required fields");
      return;
    }

    navigate("/results", {
      state: {
        from,
        to,
        date,
        returnDate,
        passengers,
        tripType,
      },
    });
  };

  return (
    <div className="search-page">
      <h1>Search Flights ✈️</h1>
      <p className="subtitle">
        Find the best flights with smart price & weather insights
      </p>

      {/* SEARCH CARD */}
      <div className="search-card">
        {/* Trip Type */}
        <div className="trip-toggle">
          <button
            className={tripType === "oneway" ? "active" : ""}
            onClick={() => setTripType("oneway")}
          >
            One Way
          </button>

          <button
            className={tripType === "roundtrip" ? "active" : ""}
            onClick={() => setTripType("roundtrip")}
          >
            Round Trip
          </button>
        </div>

        {/* FROM */}
        <label>From</label>
        <input
          type="text"
          placeholder="Departure city"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        {/* TO */}
        <label>To</label>
        <input
          type="text"
          placeholder="Destination city"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        {/* DATE + PASSENGERS */}
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

        {/* RETURN DATE (only for round trip) */}
        {tripType === "roundtrip" && (
          <div>
            <label>Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}

        {/* SEARCH BUTTON */}
        <button className="search-btn primary" onClick={handleSearch}>
          🔍 Search Flights
        </button>
      </div>


      {/* POPULAR ROUTES */}
      <div className="popular-routes">
        <h3>Popular Routes</h3>

        <div className="routes-grid">
          <div onClick={() => autoFill("Bengaluru", "Delhi")}>
            Bengaluru → Delhi
          </div>
          <div onClick={() => autoFill("Mumbai", "Bengaluru")}>
            Mumbai → Bengaluru
          </div>
          <div onClick={() => autoFill("Chennai", "Hyderabad")}>
            Chennai → Hyderabad
          </div>
          <div onClick={() => autoFill("Mysuru", "Bengaluru")}>
            Mysuru → Bengaluru
          </div>
        </div>
      </div>
    </div>
  );
}
