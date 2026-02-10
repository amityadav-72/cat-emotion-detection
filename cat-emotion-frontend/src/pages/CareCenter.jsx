import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";
import Footer from "../components/Footer";

const Community = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/community/ping`)
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2>Community</h2>
        <p>{msg}</p>
        <p>Future: posts, discussions, tips</p>
      </div>

    </>
  );
};

export default Community;
