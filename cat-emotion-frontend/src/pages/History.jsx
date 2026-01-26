import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

export default function History({ token, onLogout }) {
  const [imageHistory, setImageHistory] = useState([]);
  const [audioHistory, setAudioHistory] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/image/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setImageHistory);

    fetch("http://127.0.0.1:8000/audio/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setAudioHistory);
  }, []);

  const exportCSV = (data, filename) => {
    if (!data.length) return;

    const headers = ["filename", "emotion", "confidence", "timestamp"];
    const rows = data.map(r =>
      headers.map(h => r[h] ?? "").join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderTable = (data) => (
    <table className="history-table">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Emotion</th>
          <th>Confidence</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((h, i) => (
          <tr key={i}>
            <td title={h.filename}>{h.filename}</td>
            <td>
              <span className="emotion-tag">{h.emotion}</span>
            </td>
            <td>{Math.round(h.confidence * 100)}%</td>
            <td>{new Date(h.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <Navbar isAuthenticated={true} onLogout={onLogout} />

      <div className="predict-page">
        <h1>Prediction History 📜</h1>
        <p className="subtitle">
          Your past image and audio emotion predictions
        </p>

        <div className="history-grid">
          {/* IMAGE HISTORY */}
          <div className="result-card">
            <div className="history-header">
              <h2 className="history-title">🖼️ Image Predictions</h2>
              <button
                className="icon-btn"
                onClick={() =>
                  exportCSV(imageHistory, "image_history.csv")
                }
              >
                ⬇️
              </button>
            </div>
            {renderTable(imageHistory)}
          </div>

          {/* AUDIO HISTORY */}
          <div className="result-card">
            <div className="history-header">
              <h2 className="history-title">🔊 Audio Predictions</h2>
              <button
                className="icon-btn"
                onClick={() =>
                  exportCSV(audioHistory, "audio_history.csv")
                }
              >
                ⬇️
              </button>
            </div>
            {renderTable(audioHistory)}
          </div>
        </div>
      </div>
    </>
  );
}
