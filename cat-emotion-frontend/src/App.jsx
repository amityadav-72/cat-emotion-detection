import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Predict from "./Predict";

export default function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);

  // 🔐 Protect predict page
  if (page === "predict" && !token) {
    setPage("login");
    return null;
  }

  if (page === "login") {
    return <Login setPage={setPage} setToken={setToken} />;
  }

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  if (page === "predict") {
    return <Predict token={token} setPage={setPage} setToken={setToken} />;
  }

  return null;
}
