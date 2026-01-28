export default function OAuthLogin() {
  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/oauth/google/login";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#4285F4",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Login with Google
    </button>
  );
}
