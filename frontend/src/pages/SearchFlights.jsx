// src/pages/SearchFlights.jsx
import { useState } from "react";
import { searchFlights, getPricePrediction } from "../services/api";

export default function SearchFlights() {
  const [form, setForm] = useState({
    source: "BLR",
    destination: "DEL",
    date: new Date().toISOString().slice(0, 10), // today
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flights, setFlights] = useState([]);
  const [predictingId, setPredictingId] = useState(null);
  const [predictions, setPredictions] = useState({}); // flight_id -> prediction obj

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setFlights([]);
    setPredictions({});

    try {
      const data = await searchFlights(form);
      setFlights(data);
      if (!data.length) {
        setError("No flights found for this route / date.");
      }
    } catch (err) {
      setError(err.message || "Failed to search flights");
    } finally {
      setLoading(false);
    }
  }

  async function handlePredict(flightId) {
    setPredictingId(flightId);
    setError("");

    try {
      const result = await getPricePrediction(flightId);
      setPredictions((prev) => ({
        ...prev,
        [flightId]: result,
      }));
    } catch (err) {
      setError(err.message || "Failed to get price prediction");
    } finally {
      setPredictingId(null);
    }
  }

  return (
    <div style={{ padding: "16px 0" }}>
      <h2 style={{ marginBottom: "16px" }}>Search Flights</h2>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-end",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: 14, marginBottom: 4 }}>From (Airport)</label>
          <input
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="BLR"
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              minWidth: 120,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: 14, marginBottom: 4 }}>To (Airport)</label>
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="DEL"
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              minWidth: 120,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: 14, marginBottom: 4 }}>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div style={{ color: "#b91c1c", marginBottom: 12, fontSize: 14 }}>
          {error}
        </div>
      )}

      {/* Results table */}
      {flights.length > 0 && (
        <div
          style={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            backgroundColor: "white",
            padding: "12px 16px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", fontSize: 14, color: "#6b7280" }}>
                <th style={{ padding: "8px 4px" }}>Flight</th>
                <th style={{ padding: "8px 4px" }}>Route</th>
                <th style={{ padding: "8px 4px" }}>Departure</th>
                <th style={{ padding: "8px 4px" }}>Base Price</th>
                <th style={{ padding: "8px 4px" }}>Seats Left</th>
                <th style={{ padding: "8px 4px" }}>Delay Risk</th>
                <th style={{ padding: "8px 4px" }}>Smart Price (ML)</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => {
                const id = flight.flight_id || flight.id;
                const prediction = predictions[id];

                const source =
                  flight.source_airport ||
                  flight.source ||
                  flight.from_airport_code ||
                  form.source;

                const destination =
                  flight.destination_airport ||
                  flight.destination ||
                  flight.to_airport_code ||
                  form.destination;

                const departureRaw =
                  flight.departure_time || flight.departure || flight.dep_time;

                const departure = departureRaw
                  ? new Date(departureRaw).toLocaleString()
                  : "-";

                const basePrice = flight.base_price || flight.price || "-";
                const seatsLeft = flight.seats_left ?? flight.available_seats ?? "-";
                const delayRisk = flight.delay_risk || "-";

                return (
                  <tr
                    key={id}
                    style={{
                      borderTop: "1px solid #f3f4f6",
                      fontSize: 14,
                    }}
                  >
                    <td style={{ padding: "8px 4px" }}>
                      {flight.flight_number || `AN${String(id).padStart(3, "0")}`}
                    </td>
                    <td style={{ padding: "8px 4px" }}>
                      {source} → {destination}
                    </td>
                    <td style={{ padding: "8px 4px" }}>{departure}</td>
                    <td style={{ padding: "8px 4px" }}>₹ {basePrice}</td>
                    <td style={{ padding: "8px 4px" }}>{seatsLeft}</td>
                    <td style={{ padding: "8px 4px" }}>{delayRisk}</td>
                    <td style={{ padding: "8px 4px" }}>
                      {prediction ? (
                        <div>
                          <div>₹ {prediction.predicted_price}</div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#6b7280",
                            }}
                          >
                            model: {prediction.model_version}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePredict(id)}
                          disabled={predictingId === id}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 999,
                            border: "none",
                            backgroundColor: "#16a34a",
                            color: "white",
                            fontSize: 13,
                            cursor: "pointer",
                          }}
                        >
                          {predictingId === id ? "Loading..." : "Get Smart Price"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
