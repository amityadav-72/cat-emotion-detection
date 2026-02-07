import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// ✅ IMPORT IMAGE FROM src/assets
import catImage from "../assets/cat-image.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="landing-hero">
        <div className="landing-text">
          <h1>
            Understand <span>Your Cat’s Emotions</span> with AI 🐱
          </h1>

          <p>
            MeowMood uses advanced deep learning and computer vision
            to analyze cat images and sounds, helping you understand
            how your cat truly feels.
          </p>

          <div className="landing-buttons">
            <button
              className="cta-primary"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

            <button
              className="cta-secondary"
              onClick={() => navigate("/register")}
            >
              Create Free Account
            </button>
          </div>
        </div>

        <div className="landing-image">
          <img
            src={catImage}
            alt="AI analyzing cat emotion"
          />
        </div>
      </section>

      {/* ===== WHY ===== */}
      <section className="how-section">
        <h2>Why MeowMood?</h2>

        <div className="how-grid">
          <div className="how-card">
            <h3>🧠 AI Powered</h3>
            <p>
              Built using CNN models trained on real cat facial
              expressions and vocal patterns.
            </p>
          </div>

          <div className="how-card">
            <h3>⚡ Fast & Accurate</h3>
            <p>
              Get emotion predictions in seconds with confidence
              scores for better clarity.
            </p>
          </div>

          <div className="how-card">
            <h3>🔐 Secure</h3>
            <p>
              Your uploads and prediction history stay private and
              secure.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-section" style={{ background: "#f8fafc" }}>
        <h2>How It Works</h2>

        <div className="how-grid">
          <div className="how-card">
            <span>1</span>
            <h3>Upload</h3>
            <p>Upload an image or audio clip of your cat.</p>
          </div>

          <div className="how-card">
            <span>2</span>
            <h3>AI Analysis</h3>
            <p>Our model analyzes facial cues or vocal patterns.</p>
          </div>

          <div className="how-card">
            <span>3</span>
            <h3>Result</h3>
            <p>Receive emotion prediction with confidence score.</p>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="landing-cta">
        <div className="landing-cta-inner">
          <h2>Start Understanding Your Cat Today 🐾</h2>
          <p>
            Join MeowMood and discover what your cat is trying to tell you.
          </p>

          <button
            className="cta-primary"
            onClick={() => navigate("/login")}
          >
            Try MeowMood Now
          </button>
        </div>
      </section>
    </>
  );
};

export default Landing;
