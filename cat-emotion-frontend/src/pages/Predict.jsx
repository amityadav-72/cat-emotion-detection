import { useState } from "react";
import "../components/Predict.css";

export default function Predict({ token }) {
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageResult, setImageResult] = useState(null);
  const [audioResult, setAudioResult] = useState(null);

  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const [error, setError] = useState("");

  /* ===== IMAGE ===== */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageResult(null);
    setError("");
  };

  const predictImage = async () => {
    if (!imageFile) {
      setError("Please upload an image.");
      return;
    }

    setLoadingImage(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/image/predict", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setImageResult(data);
    } catch {
      setError("Image prediction failed.");
    } finally {
      setLoadingImage(false);
    }
  };

  /* ===== AUDIO ===== */
  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
    setAudioResult(null);
    setError("");
  };

  const predictAudio = async () => {
    if (!audioFile) {
      setError("Please upload an audio file.");
      return;
    }

    setLoadingAudio(true);

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/audio/predict", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setAudioResult(data);
    } catch {
      setError("Audio prediction failed.");
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <div className="predict-wrapper">
      <h1>Cat Emotion Detection 🐱</h1>
      <p className="predict-subtitle">
        Upload an image or audio file to detect your cat’s emotion.
      </p>

      <div className="predict-grid">
        {/* IMAGE CARD */}
        <div className="predict-card">
          <h2>🖼️ Image Emotion</h2>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
            />
          )}

          <button onClick={predictImage} disabled={loadingImage}>
            {loadingImage ? "Analyzing..." : "Predict Image Emotion"}
          </button>

          {imageResult && (
            <div className="result-box">
              <p><b>Emotion:</b> {imageResult.predicted_emotion}</p>
              <p>
                <b>Confidence:</b>{" "}
                {Math.round(imageResult.confidence * 100)}%
              </p>
            </div>
          )}
        </div>

        {/* AUDIO CARD */}
        <div className="predict-card">
          <h2>🔊 Audio Emotion</h2>

          <input type="file" accept="audio/*" onChange={handleAudioChange} />

          <button onClick={predictAudio} disabled={loadingAudio}>
            {loadingAudio ? "Analyzing..." : "Predict Audio Emotion"}
          </button>

          {audioResult && (
            <div className="result-box">
              <p><b>Emotion:</b> {audioResult.predicted_emotion}</p>
              <p>
                <b>Confidence:</b>{" "}
                {Math.round(audioResult.confidence * 100)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {error && <p className="predict-error">{error}</p>}
    </div>
  );
}
