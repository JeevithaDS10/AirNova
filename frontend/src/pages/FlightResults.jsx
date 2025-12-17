import Navbar from "../components/Navbar";
import "./flight-results.css";

export default function FlightResults() {
  const flights = [
    {
      airline: "IndiGo",
      route: "Mysuru → Bengaluru",
      stops: "Non-stop",
      duration: "2h 15m",
      price: 3136,
    },
    {
      airline: "Air India",
      route: "Mysuru → Chennai → Bengaluru",
      stops: "1 Stop",
      duration: "3h 25m",
      price: 4811,
    },
    {
      airline: "Vistara",
      route: "Mysuru → Hyderabad → Bengaluru",
      stops: "1 Stop",
      duration: "3h 25m",
      price: 4914,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="results-container">
        <div className="breadcrumb">
          Dashboard &gt; Search Flights &gt; Results
        </div>

        <h2 className="results-title">
          Flights from <b>Mysuru</b> → <b>Bengaluru</b>
        </h2>

        <p className="results-subtitle">
          Tue, 21 Jan · 1 Passenger
        </p>

        <div className="flight-list">
          {flights.map((f, idx) => (
            <div key={idx} className="flight-card">
              <div className="flight-left">
                <h3>{f.airline}</h3>
                <p className="route">{f.route}</p>
                <p className="meta">{f.stops} • {f.duration}</p>
              </div>

              <div className="flight-right">
                <div className="price">₹{f.price}</div>
                <button className="select-btn">Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
