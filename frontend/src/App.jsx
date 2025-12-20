import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SearchFlights from "./pages/SearchFlights";
import FlightResults from "./pages/FlightResults";
import Weather from "./pages/Weather";
import PricePrediction from "./pages/PricePrediction";
import RoleSelect from "./pages/RoleSelect";   // ✅ NEW
import Register from "./pages/Register";       // ✅ WILL BE REUSED

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Splash />} />

      {/* Auth */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />

      {/* 🔴 CHANGE HERE */}
      <Route path="/register/role" element={<RoleSelect />} />
      <Route path="/register/user" element={<Register role="USER" />} />
      <Route path="/register/crew" element={<Register role="CREW" />} />

      {/* Post-login */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/search" element={<SearchFlights />} />
      <Route path="/results" element={<FlightResults />} />

      {/* Smart features */}
      <Route path="/weather" element={<Weather />} />
      <Route path="/price" element={<PricePrediction />} />
    </Routes>
  );
}
