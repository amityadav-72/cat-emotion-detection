import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

export default function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);

  // restore session on refresh
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      setPage("dashboard");
    }
  }, []);

  // persist token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  if (page === "login") {
    return <Login setPage={setPage} setToken={setToken} />;
  }

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  // ✅ ALWAYS render dashboard when logged in
  return (
    <Dashboard
      token={token}
      setToken={setToken}
      setPage={setPage}
    />
  );
}
