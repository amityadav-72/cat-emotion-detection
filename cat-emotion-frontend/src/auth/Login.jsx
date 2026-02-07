import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuthLogin from "./OAuthLogin";


export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setError("");

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        // ✅ STORE TOKEN
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);

        // ✅ STORE USERNAME (THIS FIXES "ANONYMOUS")
        localStorage.setItem("username", username);

        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Login</h2>

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

        <button className="primary-btn" onClick={login}>
          Login
        </button>

        {error && <p className="error">{error}</p>}

        <div style={{ margin: "20px 0", textAlign: "center", color: "#888" }}>
          — OR —
        </div>

        <OAuthLogin />

        <div className="link" style={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <button
            className="text-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
