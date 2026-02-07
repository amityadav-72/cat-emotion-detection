import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import EmotionLineChart from "../components/EmotionLineChart";
import EmotionPieChart from "../components/EmotionPieChart";
import "../components/Dashboard.css";

/* Unified emotion mapping */
const EMOTION_MAP = {
  // AUDIO
  Angry: "Angry",
  Defence: "Angry",
  Fighting: "Angry",
  Happy: "Happy",
  HuntingMind: "Fearful",
  Mating: "Happy",
  MotherCall: "Fearful",
  Paining: "Sad",
  Resting: "Relaxed",
  Warning: "Fearful",

  // IMAGE
  angry: "Angry",
  happy: "Happy",
  normal: "Relaxed",
  sad: "Sad",
  scared: "Fearful",
  surprised: "Fearful",
};

/* Time filter options */
const FILTERS = {
  "24h": 1,
  "7d": 7,
  "15d": 15,
  "30d": 30,
};

export default function Dashboard({ token }) {
  const navigate = useNavigate();
  const [imageHistory, setImageHistory] = useState([]);
  const [audioHistory, setAudioHistory] = useState([]);
  const [filter, setFilter] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    Promise.all([
      fetch("http://127.0.0.1:8000/image/history", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),

      fetch("http://127.0.0.1:8000/audio/history", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    ])
      .then(([imageData, audioData]) => {
        setImageHistory(
          imageData.map((h) => ({
            ...h,
            emotion: EMOTION_MAP[h.emotion] || "Relaxed",
          }))
        );

        setAudioHistory(
          audioData.map((h) => ({
            ...h,
            emotion: EMOTION_MAP[h.emotion] || "Relaxed",
          }))
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  /* ⏱️ Filter logic */
  const applyFilter = (data) => {
    const days = FILTERS[filter];
    const now = new Date();
    return data.filter(
      (h) =>
        (now - new Date(h.timestamp)) / (1000 * 60 * 60 * 24) <= days
    );
  };

  const filteredImage = useMemo(
    () => applyFilter(imageHistory),
    [imageHistory, filter]
  );

  const filteredAudio = useMemo(
    () => applyFilter(audioHistory),
    [audioHistory, filter]
  );

  return (
    <>
      {/* HERO */}
      <section className="dashboard-hero">
        <h1>MeowMood Analytics 🐱</h1>
        <p>Image & Audio emotion insights with smart time filters</p>
      </section>

      <div className="dashboard-container">
        {/* FILTER */}
        <div className="dashboard-filter">
          <label>⏱️ Time Range:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="15d">Last 15 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {loading ? (
          <p className="dashboard-status">Loading analytics...</p>
        ) : (
          <>
            {/* IMAGE ANALYTICS */}
          <h2 className="dashboard-title">🖼️ Image Emotion Analysis</h2>
<div className="dashboard-grid">
  <EmotionLineChart history={filteredImage} source="IMAGE" />
  <EmotionPieChart history={filteredImage} source="IMAGE" />
</div>

<h2 className="dashboard-title">🔊 Audio Emotion Analysis</h2>
<div className="dashboard-grid">
  <EmotionLineChart history={filteredAudio} source="AUDIO" />
  <EmotionPieChart history={filteredAudio} source="AUDIO" />
</div>



            {/* NOTE */}
            <div className="dashboard-note">
              <h4>ℹ️ How analytics work</h4>
              <p>
                Image and audio predictions use different AI models. To keep
                insights simple and meaningful, emotions are mapped into a
                unified set (Happy, Relaxed, Sad, Angry, Fearful) before
                analytics are generated.
              </p>
            </div>
          </>
        )}

        {/* ACTIONS */}
        <section className="dashboard-actions">
          <button onClick={() => navigate("/history")}>
            View Full History
          </button>
          <button onClick={() => navigate("/nearby-services")}>
            Find Nearby Vet
          </button>
        </section>
      </div>

    </>
  );
}
