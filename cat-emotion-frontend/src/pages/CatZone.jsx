import { useEffect, useState } from "react";
import "../components/CatZone.css";
import Footer from "../components/Footer";

const API_BASE = "http://127.0.0.1:8000";

export default function CatZone() {
  /* ================= AUTH ================= */
  const username = localStorage.getItem("username") || "Anonymous";

  /* ================= STATE ================= */
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("Unknown");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ================= TIME FORMAT ================= */
  const formatPostTime = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt + "Z");

    const diffMs = now - postDate;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMin / 60);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHr < 24) return `${diffHr} hours ago`;

    return postDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  /* ================= FETCH POSTS ================= */
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/community/catzone/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  /* ================= DETECT LOCATION ================= */
  const detectLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state ||
            "Unknown";

          setLocation(city);
        } catch {
          setLocation("Unknown");
        }
      },
      () => setLocation("Unknown")
    );
  };

  useEffect(() => {
    fetchPosts();
    detectLocation();
  }, []);

  /* ================= IMAGE PICK ================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= CREATE POST ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !image) {
      alert("Caption and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/community/catzone/post`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      setPosts((prev) => [data, ...prev]);

      setCaption("");
      setImage(null);
      setPreview(null);
      setShowModal(false);
    } catch (err) {
      console.error("Post failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE POST ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    await fetch(
      `${API_BASE}/community/catzone/post/${id}`,
      { method: "DELETE" }
    );

    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="catzone-wrapper">
        {/* ================= FEED ================= */}
        <div className="cat-feed-grid">
          {posts.length === 0 && (
            <p className="empty-feed">No posts yet 🐾</p>
          )}

          {posts.map((post) => (
            <div className="cat-card" key={post.id}>
              <div className="cat-card-header">
                <div>
                  <strong>{post.username}</strong>
                  {post.location && <span>{post.location}</span>}
                  <span className="post-time">
                    {formatPostTime(post.created_at)}
                  </span>
                </div>

                {post.username === username && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post.id)}
                    title="Delete post"
                  >
                    🗑
                  </button>
                )}
              </div>

              <img
                src={`${API_BASE}/${post.image_path}`}
                alt="Cat post"
                className="cat-card-image"
                loading="lazy"
              />

              <div className="cat-card-footer">
                <p>{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ADD BUTTON ================= */}
        <button
          className="add-post-btn"
          onClick={() => setShowModal(true)}
          title="Create post"
        >
          +
        </button>

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

              <h3>Create a Cat Post 🐱</h3>

              <form onSubmit={handleSubmit}>
                <textarea
                  placeholder="What's your cat feeling?"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="image-preview"
                  />
                )}

                <button type="submit" disabled={loading}>
                  {loading ? "Posting..." : "Post"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

    </>
  );
}
