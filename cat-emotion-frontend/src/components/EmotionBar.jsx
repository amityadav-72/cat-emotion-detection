import "../App.css";

export default function EmotionBar({ confidence }) {
  const percentage = Math.round(confidence * 100);

  return (
    <div className="confidence">
      Confidence: {percentage}%
      <div className="bar">
        <div
          className="fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
