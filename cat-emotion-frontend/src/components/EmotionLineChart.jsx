import { Line } from "react-chartjs-2";
import "./EmotionLineChart.css";

/* Class definitions */
const IMAGE_CLASSES = [
  "Angry",
  "Disgusted",
  "Happy",
  "Normal",
  "Sad",
  "Scared",
  "Surprised",
];

const AUDIO_CLASSES = [
  "Angry",
  "Defence",
  "Fighting",
  "Happy",
  "HuntingMind",
  "Mating",
  "MotherCall",
  "Paining",
  "Resting",
  "Warning",
];

const THEMES = {
  IMAGE: {
    title: "🖼️ Image Emotion Confidence",
    color: "#6C63FF",
    classes: IMAGE_CLASSES,
  },
  AUDIO: {
    title: "🔊 Audio Emotion Occurrence",
    color: "#EF476F",
    classes: AUDIO_CLASSES,
  },
};

export default function EmotionLineChart({ history, source }) {
  const theme = THEMES[source];
  const labels = theme.classes;

  let values = [];

  if (source === "IMAGE") {
    // IMAGE → average confidence
    values = labels.map((cls) => {
      const vals = history
        .filter((h) => h.emotion === cls)
        .map((h) => h.confidence * 100);
      if (!vals.length) return 0;
      return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    });
  }

  if (source === "AUDIO") {
    // AUDIO → occurrence %
    const total = history.length || 1;
    values = labels.map((cls) =>
      Math.round(
        (history.filter((h) => h.emotion === cls).length / total) * 100
      )
    );
  }

  return (
    <div className="chart-card small-chart">
      <h3>{theme.title}</h3>

      <div className="chart-wrapper">
        <Line
          data={{
            labels,
            datasets: [
              {
                label:
                  source === "IMAGE"
                    ? "Avg Confidence (%)"
                    : "Occurrence (%)",
                data: values,
                borderColor: theme.color,
                backgroundColor: theme.color,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { min: 0, max: 100 },
            },
          }}
        />
      </div>
    </div>
  );
}
