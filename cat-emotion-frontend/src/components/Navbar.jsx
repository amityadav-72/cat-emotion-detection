import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        🐱 <span>MeowMood</span>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </div>

      <ul className={`navbar-links ${open ? "active" : ""}`}>
        {!isAuthenticated ? (
          <>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
            <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
            <li><Link to="/predict" onClick={closeMenu}>Detect Emotion</Link></li>
            <li><Link to="/history" onClick={closeMenu}>History</Link></li>
            <li><Link to="/nearby-services" onClick={closeMenu}>Nearby Services</Link></li>
            <li><Link to="/catzone" onClick={closeMenu}>Cat Zone</Link></li>
            <li><Link to="/chatbot" onClick={closeMenu}>Chatbot</Link></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
