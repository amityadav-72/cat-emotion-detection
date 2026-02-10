import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} <strong>MeowMood</strong>. All rights reserved.
      </p>

      <p className="footer-sub">
        Built with ❤️ by{" "}
        <a
          href="https://github.com/amityadav-72"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Amit Kumar Yadav
        </a>
      </p>
    </footer>
  );
}
