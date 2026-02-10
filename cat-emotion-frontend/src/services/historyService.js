export async function fetchFullHistory(token) {
  const [image, audio] = await Promise.all([
    fetch("http://127.0.0.1:8000/image/history", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

    fetch("http://127.0.0.1:8000/audio/history", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),
  ]);

  return [...image, ...audio].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
}
