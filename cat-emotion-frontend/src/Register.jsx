import { useState } from "react";

export default function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const register = async () => {
    const res = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.message) {
      setMsg("Account created successfully");
      setTimeout(() => setPage("login"), 1000);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>

        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="primary-btn" onClick={register}>Register</button>

        {msg && <p className="message">{msg}</p>}

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
