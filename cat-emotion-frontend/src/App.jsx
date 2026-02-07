import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

// Public pages
import Landing from "./pages/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";

// Protected pages
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import History from "./pages/History";
import NearbyServices from "./pages/NearbyServices";
import CatZone from "./pages/CatZone";

// ✅ Chatbot page (simple Chatbot.jsx)
import Chatbot from "./pages/Chatbot";

function App() {
  const [token, setToken] = useState(null);

  // Restore token on refresh
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

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = Boolean(token);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />

      <Routes>
        {/* ===== Public Routes ===== */}
        <Route
          path="/"
          element={<Landing isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* ===== Protected Routes ===== */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/predict"
          element={
            isAuthenticated ? (
              <Predict token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/history"
          element={
            isAuthenticated ? (
              <History token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/nearby-services"
          element={
            isAuthenticated ? <NearbyServices /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/catzone"
          element={
            isAuthenticated ? <CatZone /> : <Navigate to="/login" />
          }
        />

        {/* ===== Independent Chatbot Page ===== */}
        <Route
          path="/chatbot"
          element={
            isAuthenticated ? <Chatbot /> : <Navigate to="/login" />
          }
        />

        {/* ===== Fallback ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
