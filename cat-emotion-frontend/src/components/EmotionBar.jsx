import "./EmotionBar.css";

export default function EmotionBar({ confidence = {} }) {
  const emotions = Object.entries(confidence);

  if (emotions.length === 0) return null;

  return (
    <div className="emotion-bar">
      {emotions.map(([emotion, value]) => {
        const percentage = Math.round(value * 100);

        return (
          <div key={emotion} className="emotion-row">
            <div className="emotion-label">
              <span>{emotion}</span>
              <span>{percentage}%</span>
            </div>

            <div className="bar">
              <div
                className={`fill ${emotion.toLowerCase()}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
