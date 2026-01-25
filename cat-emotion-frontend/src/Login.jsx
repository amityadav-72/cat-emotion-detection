import { useState } from "react";

export default function Login({ setPage, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const res = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.access_token) {
      setToken(data.access_token);
      setPage("predict");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Login</h2>

        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="primary-btn" onClick={login}>Login</button>

        {error && <p className="error">{error}</p>}

        <div className="link">
          Don’t have an account?{" "}
          <button className="text-btn" onClick={() => setPage("register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
