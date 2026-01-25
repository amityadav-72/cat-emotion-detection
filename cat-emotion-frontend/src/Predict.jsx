import { useState } from "react";

export default function Predict({ token, setPage, setToken }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const predict = async () => {
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
    setResult(data);
  };

  const logout = () => {
    setToken(null);
    setPage("login");
  };

  return (
    <>
      <header className="topbar">
        <div className="brand">🐱 Cat Emotion Detection</div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      <div className="page">
        <div className="card">
          <h2>Emotion Prediction</h2>

          <input
            type="file"
            accept="audio/*,.wav,.mp3,.mpeg,.mpga,.m4a,.aac,.ogg,.flac,.webm"
            onChange={e => setFile(e.target.files[0])}
          />

          <button className="primary-btn" disabled={!file} onClick={predict}>
            Predict Emotion
          </button>

          {result && (
            <div className="result">
              <p><b>Emotion:</b> {result.predicted_emotion}</p>
              {result.confidence !== undefined && (
                <p><b>Confidence:</b> {Math.round(result.confidence * 100)}%</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
