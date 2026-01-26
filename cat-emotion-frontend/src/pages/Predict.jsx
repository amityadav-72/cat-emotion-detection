import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import ResultCard from "../components/ResultCard";
import "../App.css";

export default function Predict({ token, onLogout }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- FILE SELECT ----------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setResult(null);
    setError("");

    // preview only for images
    if (selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  // ---------- PREDICT ----------
  const predict = async () => {
    if (!file) {
      setError("Please upload an image or audio file.");
      return;
    }

    let endpoint = "";
    let isImage = false;

    if (file.type.startsWith("image/")) {
      endpoint = "http://127.0.0.1:8000/image/predict";
      isImage = true;
    } else if (file.type.startsWith("audio/")) {
      endpoint = "http://127.0.0.1:8000/audio/predict";
    } else {
      setError("Unsupported file type.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      // normalize response
      setResult({
        emotion: isImage ? data.predicted_emotion : data.predicted_emotion,
        confidence: data.confidence,
        filename: data.filename || null,
        type: isImage ? "image" : "audio",
      });
    } catch {
      setError("Prediction failed. Try another file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={true} onLogout={onLogout} />

      <div className="predict-page">
        <h1>Cat Emotion Detection 🐱</h1>
        <p className="subtitle">
          Upload an image or audio file to detect your cat’s emotion.
        </p>

        {/* ===== UPLOAD ===== */}
        <div className="predict-card">
          <input
            type="file"
            accept="image/*,audio/*"
            onChange={handleFileChange}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="image-preview"
            />
          )}

          <button
            className="primary-btn"
            onClick={predict}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Predict Emotion"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        {/* ===== RESULT ===== */}
        {result && (
          <div className="result-card">
            <h2>Prediction Result</h2>

            {result.filename && (
              <p><b>File:</b> {result.filename}</p>
            )}

            <p className="emotion">
              Emotion: <span>{result.emotion}</span>
            </p>

            <p>
              Confidence: {Math.round(result.confidence * 100)}%
            </p>

            <p>
              Type: <b>{result.type.toUpperCase()}</b>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
