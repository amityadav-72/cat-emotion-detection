import EmotionBar from "./EmotionBar";
import "../App.css";

const emotionExplanation = {
  Happy: "Relaxed posture, open eyes, and neutral ears suggest happiness.",
  Angry: "Flattened ears, tense facial muscles, or narrowed eyes indicate aggression.",
  Relaxed: "Soft eyes and neutral facial features suggest calmness.",
  Sad: "Droopy posture and reduced facial activity suggest sadness.",
  Fearful: "Wide eyes and pulled-back ears indicate fear or stress.",
};

export default function ResultCard({ result }) {
  if (!result) return null;

  const explanation =
    emotionExplanation[result.emotion] ||
    "Facial features contributed to this prediction.";

  return (
    <div className="result-card">
      <h2>Prediction Result</h2>

      <p className="emotion">
        Emotion: <span>{result.emotion}</span>
      </p>

      <EmotionBar confidence={result.confidence} />

      {/* 🧠 Explanation */}
      <div className="explanation">
        <h4>Why this emotion?</h4>
        <p>{explanation}</p>
      </div>
    </div>
  );
}
