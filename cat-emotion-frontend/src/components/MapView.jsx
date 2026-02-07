import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

/* ================= FIX DEFAULT MARKER ICON ================= */
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -36],
});

L.Marker.prototype.options.icon = DefaultIcon;

/* ================= RECENTER MAP ================= */
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 13, { animate: true });
  }, [lat, lon, map]);

  return null;
};

/* ================= ROUTE HANDLER (FIXED) ================= */
const RouteHandler = ({ from, to }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    // Remove previous route
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    // Add new route only if destination exists
    if (from && to) {
      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(from.lat, from.lon),
          L.latLng(to.lat, to.lon),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
        lineOptions: {
          styles: [{ color: "#2279eb", weight: 4 }],
        },
      }).addTo(map);
    }

    // Cleanup on unmount
    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [from, to, map]);

  return null;
};

/* ================= MAIN MAP ================= */
const MapView = ({ services = [], lat, lon, selectedService }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <RecenterMap lat={lat} lon={lon} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* USER LOCATION */}
      <Marker position={[lat, lon]}>
        <Popup>
          <strong>Your Location</strong>
        </Popup>
      </Marker>

      {/* SERVICE MARKERS */}
      {services.map((s, index) => (
        <Marker key={index} position={[s.lat, s.lon]}>
          <Popup>
            <strong>{s.name || "Unnamed Place"}</strong>
            <br />
            {Object.values(s.category || {}).join(", ")}
          </Popup>
        </Marker>
      ))}

      {/* ONLY ONE ROUTE AT A TIME */}
      {selectedService && (
        <RouteHandler
          from={{ lat, lon }}
          to={{ lat: selectedService.lat, lon: selectedService.lon }}
        />
      )}
    </MapContainer>
  );
};

export default MapView;
