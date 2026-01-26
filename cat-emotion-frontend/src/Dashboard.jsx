import { useState, useEffect } from "react";
import Predict from "./Predict";

export default function Dashboard({ token, setToken, setPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState(null);

  /* 🔹 LOAD HISTORY ON LOGIN / REFRESH */
  useEffect(() => {
    const saved = localStorage.getItem("prediction_history");
    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);
      setLatest(parsed[0] || null);
    }
  }, []);

  /* 🔹 SAVE HISTORY WHENEVER IT CHANGES */
  useEffect(() => {
    localStorage.setItem(
      "prediction_history",
      JSON.stringify(history)
    );
  }, [history]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  const handlePredictionDone = (result) => {
    const record = {
      emotion: result.emotion,
      confidence: result.confidence,
      time: Date.now(),
    };

    setLatest(record);
    setHistory((prev) => [record, ...prev]);
  };

  return (
    <div className="dash-shell">
      {/* TOP BAR */}
      <header className="dash-topbar">
        <button
          className="dash-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div className="dash-brand">🐱 Cat Emotion Detection</div>

        <button className="dash-logout" onClick={logout}>
          Logout
        </button>
      </header>

      {/* BODY */}
      <div className="dash-layout">
        {/* SIDEBAR */}
        {sidebarOpen && (
          <aside className="dash-sidebar">
            <h3>History</h3>

            <select>
              <option>Latest → Oldest</option>
              <option>Oldest → Latest</option>
            </select>

            <select>
              <option>All Emotions</option>
              <option>Resting</option>
              <option>Warning</option>
            </select>

            {history.length === 0 && (
              <p style={{ opacity: 0.7 }}>No history yet</p>
            )}

            {history.map((h, i) => (
              <div key={i} className="dash-history-item">
                <b>{h.emotion}</b>
                <div className="dash-history-time">
                  {new Date(h.time).toLocaleString()}
                </div>
              </div>
            ))}
          </aside>
        )}

        {/* CENTER */}
        <main className="dash-content">
          <div className="dash-card">
            {latest ? (
              <>
                <h2>Latest Prediction</h2>

                <p><b>Emotion:</b> {latest.emotion}</p>
                <p>
                  <b>Confidence:</b>{" "}
                  {Math.round(latest.confidence * 100)}%
                </p>
                <p>
                  <b>Time:</b>{" "}
                  {new Date(latest.time).toLocaleString()}
                </p>

                <button
                  className="primary-btn"
                  style={{ marginTop: "16px" }}
                  onClick={() => setLatest(null)}
                >
                  New Prediction
                </button>
              </>
            ) : (
              <Predict
                token={token}
                onDone={handlePredictionDone}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
