import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import History from "./pages/History";

export default function App() {
  const [token, setToken] = useState(null);

  // Restore session on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Persist token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Central logout handler
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public */}
        <Route path="/" element={<Landing isAuthenticated={!!token} />} />

        {/* 🔐 Auth */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* 🧠 Protected */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard onLogout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/predict"
          element={
            token ? (
              <Predict token={token} onLogout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/history"
          element={
            token ? (
              <History token={token} onLogout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
