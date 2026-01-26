import { useState } from "react";

export default function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    setMsg("");
    setError("");

    // Basic validation (safe)
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Account created successfully 🎉");
        setTimeout(() => setPage("login"), 1200);
      } else {
        setError(data.detail || "Registration failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={register}>
          Register
        </button>

        {msg && <p className="message">{msg}</p>}
        {error && <p className="error">{error}</p>}

        <div className="link">
          Already have an account?{" "}
          <button className="text-btn" onClick={() => setPage("login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
