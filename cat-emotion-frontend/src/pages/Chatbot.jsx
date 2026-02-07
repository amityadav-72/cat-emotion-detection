import { useState } from "react";
import "../components/Chatbot.css";
import Footer from "../components/Footer";

const API_BASE = "http://127.0.0.1:8000";

// 🐱 Predefined quick questions
const QUICK_QUESTIONS = [
  "What should I feed my cat?",
  "How often should I vaccinate my cat?",
  "Why is my cat not eating?",
  "How to take care of a kitten?",
  "Signs my cat is sick",
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm CatCare AI 🐱 Ask me anything about cats!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "Sorry, I couldn't understand that 😿",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Server error. Please try again later 🐾",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="catbot-container">
        {/* Header */}
        <div className="catbot-header">🐱 CatCare Chatbot</div>

        {/* Messages */}
        <div className="catbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="msg bot typing">Typing…</div>}
        </div>

        {/* Quick Questions */}
        <div className="quick-questions bottom">
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
              className="quick-btn"
              onClick={() => sendMessage(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="catbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={loading}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
