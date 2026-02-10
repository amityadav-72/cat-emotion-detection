import { useState } from "react";
import API_BASE_URL from "../services/api";
import MapView from "../components/MapView";
import Footer from "../components/Footer";
import { FaDirections } from "react-icons/fa";
import "../components/NearbyServices.css";

/* ================= SERVICE TYPES ================= */
const SERVICE_TYPES = [
  { label: "All", value: "all" },
  { label: "Veterinary", value: "veterinary" },
  { label: "Pet Shop", value: "pet" },
  { label: "Grooming", value: "pet_grooming" },
  { label: "Shelter", value: "animal_shelter" },
  { label: "Boarding", value: "animal_boarding" },
];

export default function NearbyServices() {
  const [services, setServices] = useState([]);
  const [mode, setMode] = useState("auto");
  const [place, setPlace] = useState("");
  const [serviceType, setServiceType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const [location, setLocation] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
  });

  /* ================= FETCH SERVICES ================= */
  const fetchServices = async (lat, lon) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/location/all?lat=${lat}&lon=${lon}`
      );
      const data = await res.json();

      const filtered =
        serviceType === "all"
          ? data
          : data.filter((s) =>
              Object.values(s.category || {}).includes(serviceType)
            );

      setServices(filtered);
      setLocation({ latitude: lat, longitude: lon });
      setSelectedService(null);
    } catch {
      setError("Failed to load nearby services.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTO LOCATION ================= */
  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchServices(pos.coords.latitude, pos.coords.longitude),
      () => setError("Location permission denied.")
    );
  };

  /* ================= MANUAL SEARCH ================= */
  const manualSearch = async () => {
    if (!place.trim()) {
      setError("Enter a city or area.");
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );
      const data = await res.json();

      if (!data.length) {
        setError("Location not found.");
        return;
      }

      fetchServices(data[0].lat, data[0].lon);
    } catch {
      setError("Failed to search location.");
    }
  };

  /* ================= SEARCH HANDLER ================= */
  const handleSearch = () => {
    mode === "auto" ? detectLocation() : manualSearch();
  };

  return (
    <>
      <div className="nearby-wrapper">
        {/* ================= SEARCH BAR ================= */}
        <div className="search-toolbar">
          <div className="search-toolbar-inner">
            <div className="mode-toggle">
              <label>
                <input
                  type="radio"
                  checked={mode === "auto"}
                  onChange={() => {
                    setMode("auto");
                    setPlace("");
                  }}
                />
                Use My Location
              </label>

              <label>
                <input
                  type="radio"
                  checked={mode === "manual"}
                  onChange={() => setMode("manual")}
                />
                Manual
              </label>
            </div>

            {mode === "manual" && (
              <input
                className="search-input"
                placeholder="Enter city or area"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            )}

            <select
              className="select-box"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              {SERVICE_TYPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <button
              className="primary-btn"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {/* ================= CONTENT ================= */}
        <div className="content-grid">
          <div className="map-container">
            <MapView
              services={services}
              lat={location.latitude}
              lon={location.longitude}
              selectedService={selectedService}
            />
          </div>

          <div className="results-container">
            {loading && <p className="info-text">Loading services...</p>}
            {!loading && services.length === 0 && (
              <p className="info-text">No services found.</p>
            )}

            {services.map((s, i) => (
              <div
                key={i}
                className={`service-card ${
                  selectedService?.name === s.name ? "selected" : ""
                }`}
                onClick={() => setSelectedService(s)}
              >
                <div>
                  <h4>{s.name || "Unnamed Place"}</h4>
                  <p>
                    {Object.values(s.category || {})
                      .filter((v) => typeof v === "string")
                      .slice(0, 2)
                      .join(" • ")}
                  </p>
                </div>

                <button
                  className="navigate-btn"
                  title="Show Route"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(s);
                  }}
                >
                  <FaDirections size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
