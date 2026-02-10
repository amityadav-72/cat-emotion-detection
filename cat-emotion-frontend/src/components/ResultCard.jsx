import EmotionBar from "./EmotionBar";
import "./ResultCard.css";

const emotionExplanation = {
  Happy: "Relaxed posture, open eyes, and neutral ears suggest happiness.",
  Angry: "Flattened ears, tense facial muscles, or narrowed eyes indicate aggression.",
  Relaxed: "Soft eyes and neutral facial features suggest calmness.",
  Sad: "Droopy posture and reduced facial activity suggest sadness.",
  Fearful: "Wide eyes and pulled-back ears indicate fear or stress.",
};

export default function ResultCard({ result }) {
  // Fallback for Dashboard (no prediction yet)
  const data = result || {
    emotion: "Relaxed",
    confidence: {
      Happy: 0.2,
      Angry: 0.05,
      Relaxed: 0.6,
      Sad: 0.1,
      Fearful: 0.05,
    },
  };

  const explanation =
    emotionExplanation[data.emotion] ||
    "Facial features contributed to this prediction.";

  return (
    <div className="result-card">
      <h3 className="result-title">🐱 Emotion Detected</h3>

      <div className="emotion-highlight">
        {data.emotion}
      </div>

      <EmotionBar confidence={data.confidence} />

      <div className="explanation">
        <h4>Why this emotion?</h4>
        <p>{explanation}</p>
      </div>
    </div>
  );
}
