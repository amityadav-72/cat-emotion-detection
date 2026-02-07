import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
import Chatbot from "./pages/Chatbot";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40vh" }}>
        Loading...
      </div>
    );
  }

  const isAuthenticated = Boolean(user);

  return (
    <BrowserRouter>
      {/* ✅ Layout wrapper */}
      <div className="app-layout">
        <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />

        {/* 🔄 Main content */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* ===== Public Routes ===== */}
            <Route
              path="/"
              element={<Landing isAuthenticated={isAuthenticated} />}
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
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
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/predict"
              element={
                isAuthenticated ? <Predict /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/history"
              element={
                isAuthenticated ? <History /> : <Navigate to="/login" />
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

            <Route
              path="/chatbot"
              element={
                isAuthenticated ? <Chatbot /> : <Navigate to="/login" />
              }
            />

            {/* ===== Fallback ===== */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* ✅ Footer appears on ALL pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
