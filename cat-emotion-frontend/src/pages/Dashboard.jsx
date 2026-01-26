import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar isAuthenticated={true} onLogout={onLogout} />

      {/* ===== HERO ===== */}
      <section className="dashboard-hero">
        <h1>Welcome to MeowMood 🐱</h1>
        <p>
          An AI-powered system to understand your cat’s emotions using
          image and audio analysis.
        </p>

        <button
          className="primary-btn dashboard-btn"
          onClick={() => navigate("/predict")}
        >
          Start Emotion Detection
        </button>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="dashboard-features">
        <div className="dashboard-card">
          🖼️🔊
          <h3>Image & Audio Input</h3>
          <p>
            Upload a cat image or audio file — the system automatically
            detects the type.
          </p>
        </div>

        <div className="dashboard-card">
          🧠
          <h3>AI Emotion Analysis</h3>
          <p>
            Deep learning models analyze facial expressions or sound patterns
            to predict emotions.
          </p>
        </div>

        <div className="dashboard-card">
          📜
          <h3>Prediction History</h3>
          <p>
            View your past image and audio predictions with confidence scores.
          </p>
          <button
            className="secondary"
            onClick={() => navigate("/history")}
          >
            View History
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
