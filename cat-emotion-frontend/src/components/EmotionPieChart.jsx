import { Pie } from "react-chartjs-2";
import "./EmotionPieChart.css";

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
    title: "🖼️ Image Emotion Distribution",
    classes: IMAGE_CLASSES,
    colors: [
      "#6C63FF",
      "#8E8AFF",
      "#B3B0FF",
      "#D6D4FF",
      "#ECEBFF",
      "#C7C5FF",
      "#A5A2FF",
    ],
  },
  AUDIO: {
    title: "🔊 Audio Emotion Distribution",
    classes: AUDIO_CLASSES,
    colors: [
      "#EF476F",
      "#F06292",
      "#F78DA7",
      "#FBB1C4",
      "#FFD6E0",
      "#FFB3C6",
      "#FF8FAB",
      "#FF6F91",
      "#FF4D6D",
      "#FF2E63",
    ],
  },
};

export default function EmotionPieChart({ history, source }) {
  const theme = THEMES[source];

  const values = theme.classes.map(
    (cls) => history.filter((h) => h.emotion === cls).length
  );

  return (
    <div className="chart-card small-chart">
      <h3>{theme.title}</h3>

      <div className="pie-wrapper">
        <Pie
          data={{
            labels: theme.classes,
            datasets: [
              {
                data: values,
                backgroundColor: theme.colors,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } },
          }}
        />
      </div>
    </div>
  );
}
