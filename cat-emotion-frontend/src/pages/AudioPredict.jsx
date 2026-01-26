import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

export default function AudioPredict({ token, onLogout }) {
  const [audio, setAudio] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch audio history
  const fetchHistory = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/audio/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        setHistory(await res.json());
      }
    } catch {}
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const predictAudio = async () => {
    if (!audio) {
      setError("Please upload an audio file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", audio);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/audio/predict",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error();

      setResult(data);
      fetchHistory();
    } catch {
      setError("Audio prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={true} onLogout={onLogout} />

      <div className="predict-page">
        <h1>Cat Audio Emotion Detection 🔊🐱</h1>

        <div className="predict-card">
          <input type="file" accept="audio/*" onChange={handleAudioChange} />

          <button className="primary-btn" onClick={predictAudio}>
            {loading ? "Analyzing..." : "Predict Audio Emotion"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        {result && (
          <div className="result-card">
            <h2>Result</h2>
            <p><b>Emotion:</b> {result.predicted_emotion}</p>
            <p><b>Confidence:</b> {Math.round(result.confidence * 100)}%</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="result-card">
            <h2>History</h2>
            {history.map((h, i) => (
              <p key={i}>
                {h.filename} → {h.emotion} ({Math.round(h.confidence * 100)}%)
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
