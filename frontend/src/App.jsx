// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import AuthPage from "./pages/AuthPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      {/* All auth routes go to the same page which switches mode */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      
    </Routes>
  );
}
