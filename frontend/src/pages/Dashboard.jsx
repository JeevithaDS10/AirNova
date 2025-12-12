// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchFlights from "./SearchFlights";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tokenPreview, setTokenPreview] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const token = localStorage.getItem("airnova_token");
    const userStr = localStorage.getItem("airnova_user");

    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userStr);
    setUser(parsedUser);

    setTokenPreview(token.slice(0, 40) + "...");
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("airnova_token");
    localStorage.removeItem("airnova_user");
    navigate("/login");
  }

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Top bar */}
      <header
        style={{
          height: 64,
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "999px",
              backgroundColor: "#1d4ed8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
            }}
          >
            ✈
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>AirNova</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Smart Flight Booking System
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              Hi, {user.name?.toUpperCase()}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{user.email}</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "none",
              backgroundColor: "#ef4444",
              color: "white",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 16,
            padding: "12px 16px",
          }}
        >
          {[
            { id: "overview", label: "Overview" },
            { id: "search", label: "Search Flights" },
            { id: "bookings", label: "My Bookings" },
            { id: "weather", label: "Weather & Disruptions" },
            { id: "security", label: "Security / Crypto" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "none",
                backgroundColor:
                  activeTab === tab.id ? "#2563eb" : "transparent",
                color: activeTab === tab.id ? "white" : "#374151",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: activeTab === tab.id ? 600 : 500,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 1100, margin: "16px auto", padding: "0 16px" }}>
        {activeTab === "overview" && (
          <OverviewSection user={user} tokenPreview={tokenPreview} />
        )}

        {activeTab === "search" && <SearchFlights />}

        {activeTab === "bookings" && (
          <div style={{ padding: "16px 0" }}>
            <h2>My Bookings</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              We will connect this to your real bookings shortly.
            </p>
          </div>
        )}

        {activeTab === "weather" && (
          <div style={{ padding: "16px 0" }}>
            <h2>Weather & Disruptions</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              This will show live weather API + disruption alerts.
            </p>
          </div>
        )}

        {activeTab === "security" && (
          <div style={{ padding: "16px 0" }}>
            <h2>Security / Cryptography</h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              Here we&apos;ll display hashed passwords, encrypted payment
              samples, and JWT details from the backend.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function OverviewSection({ user, tokenPreview }) {
  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>Dashboard Overview</h1>
      <p style={{ color: "#4b5563", marginBottom: 20 }}>
        Welcome to AirNova, {user.name?.toUpperCase()} ✈️
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 16,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #e5e7eb",
          }}
        >
          <h3 style={{ marginBottom: 6 }}>Session Security</h3>
          <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 8 }}>
            You are logged in using a <b>JWT</b> token issued by the backend.
          </p>
          <p style={{ fontSize: 12, color: "#6b7280" }}>
            Token preview: <code>{tokenPreview}</code>
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #e5e7eb",
          }}
        >
          <h3 style={{ marginBottom: 6 }}>Next Steps</h3>
          <ul style={{ fontSize: 14, color: "#4b5563", paddingLeft: 18 }}>
            <li>Use &quot;Search Flights&quot; to find available flights.</li>
            <li>Use &quot;My Bookings&quot; to view your tickets.</li>
            <li>
              Use &quot;Security / Crypto&quot; to see hashing & encryption
              demo.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
