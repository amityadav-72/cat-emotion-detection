import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} MeowMood · Built with 🐾 using AI
      </p>
      <p className="footer-sub">
        Cat Emotion Detection using Deep Learning
      </p>
    </footer>
  );
}
