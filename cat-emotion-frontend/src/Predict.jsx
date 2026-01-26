import { useState } from "react";

export default function Predict({ token, onDone }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predict = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/audio/predict", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.detail || "Prediction failed");
        return;
      }

      onDone({
        emotion: data.predicted_emotion || data.emotion,
        confidence: data.confidence,
      });
    } catch {
      setLoading(false);
      setError("Server error. Please try again.");
    }
  };

  return (
    <>
      <h2>Emotion Prediction</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="primary-btn"
        disabled={!file || loading}
        onClick={predict}
      >
        {loading ? "Predicting..." : "Predict Emotion"}
      </button>

      {error && <p className="error">{error}</p>}
    </>
  );
}
