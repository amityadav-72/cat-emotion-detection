import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "../components/History.css";

export default function History() {
  const auth = getAuth();

  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.warn("User not logged in");
        return;
      }

      // 🔥 THIS IS THE FIX
      const token = await user.getIdToken();
      console.log("🔥 History token:", token);

      try {
        const [imageRes, audioRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/image/history", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://127.0.0.1:8000/audio/history", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const imageData = await imageRes.json();
        const audioData = await audioRes.json();

        const taggedImage = imageData.map((h) => ({
          ...h,
          type: "IMAGE",
        }));

        const taggedAudio = audioData.map((h) => ({
          ...h,
          type: "AUDIO",
        }));

        const merged = [...taggedImage, ...taggedAudio].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setHistory(merged);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory =
    filter === "ALL"
      ? history
      : history.filter((h) => h.type === filter);

  const exportCSV = () => {
    if (!filteredHistory.length) return;

    const headers = ["filename", "type", "emotion", "confidence", "timestamp"];
    const rows = filteredHistory.map((r) =>
      headers.map((h) => r[h] ?? "").join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "prediction_history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="history-wrapper">
      <h1>Prediction History 📜</h1>
      <p className="history-subtitle">
        Complete timeline of your image and audio emotion predictions
      </p>

      <div className="history-card">
        <div className="history-header">
          <h2>All Predictions</h2>

          <div className="history-actions">
            <div className="select-wrapper">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="IMAGE">Image</option>
                <option value="AUDIO">Audio</option>
              </select>
            </div>

            <button onClick={exportCSV}>⬇️ Export</button>
          </div>
        </div>

        {!filteredHistory.length ? (
          <p className="history-empty">No predictions found.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Type</th>
                <th>Emotion</th>
                <th>Confidence</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((h, i) => (
                <tr key={i}>
                  <td title={h.filename}>{h.filename || "—"}</td>

                  <td>
                    <span className={`type-tag ${h.type.toLowerCase()}`}>
                      {h.type}
                    </span>
                  </td>

                  <td>
                    <span className="emotion-tag">{h.emotion}</span>
                  </td>

                  <td>
                    {h.type === "IMAGE"
                      ? `${Math.round(h.confidence * 100)}%`
                      : "—"}
                  </td>

                  <td>{new Date(h.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
