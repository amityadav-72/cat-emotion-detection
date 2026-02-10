import "../App.css";

export default function UploadCard({
  preview,
  loading,
  error,
  onImageChange,
  onPredict
}) {
  return (
    <div className="predict-card">
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
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
        onClick={onPredict}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Predict Emotion"}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
