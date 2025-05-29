import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
// SVGs for custom markers (blue car, green home pointer for style), fallback to default
const carSVG = encodeURIComponent(
  `<svg width="42" height="42" xmlns="http://www.w3.org/2000/svg"><circle cx="21" cy="21" r="21" fill="#00A896"/><text x="13.5" y="28" font-size="22" font-family="Arial,sans-serif" fill="#fff" font-weight="bold">🚗</text></svg>`
);
const pickupSVG = encodeURIComponent(
  `<svg width="42" height="42" xmlns="http://www.w3.org/2000/svg"><circle cx="21" cy="21" r="21" fill="#0077B6"/><text x="9" y="29" font-size="25" font-family="Arial,sans-serif" fill="#fff" font-weight="bold">📍</text></svg>`
);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const carIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,${carSVG}`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [1, -28],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [38, 38]
});
const userIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,${pickupSVG}`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [1, -24],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [38, 38]
});
// Fix for missing default marker icons in leaflet
/**
 * PUBLIC_INTERFACE
 * RideStatus: Displays ride status, estimated pickup, and a real map with live mock driver location and route.
 */
export default function RideStatus({ ride, onSOS }) {
  // Use mock data if no ride passed
  const mockRide = {
    driver: "Priya Shah",
    vehicle: "Hyundai Verna - Blue",
    depPoint: "Greenwood University Main Gate",
    estPickup: new Date(Date.now() + 6 * 60000), // 6 min demo/prompt
    driverLatLng: [19.103, 72.87],               // sample "on the way" location
    pickupLatLng: [19.1167, 72.8333],            // fixed mock pickup (Mumbai)
  };
  const r = ride || mockRide;

  // For "Arriving in X min" logic
  const timeDiff = Math.max(1, Math.ceil((new Date(r.estPickup) - new Date())/60000));
  const timeStr = timeDiff <= 1
    ? "Arriving now"
    : `Arriving in ${timeDiff} min`;

  // (optional) Use 'en route' line or animated marker here if desired
  const route = [r.driverLatLng, r.pickupLatLng];

  // Responsive map height for mobile
  const getMapHeight = () =>
    window.innerWidth < 420 ? 180 : 210;

  // Format as '08:45 PM' string
  function fmtClock(dt) {
    return new Date(dt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  // Handler for SOS
  function handleSOS() {
    if (onSOS) return onSOS();
    window.alert(
      "SOS Emergency activated (Demo). In production, guardians and support would be notified immediately."
    );
  }

  // Style for ETA display
  const etaBoxStyle = {
    margin: "18px auto 8px",
    fontWeight: 850,
    fontSize: "1.33rem",
    color: "var(--color-accent)",
    background: "linear-gradient(90deg, #ecfcf7 70%, #eaf9ff 100%)",
    borderRadius: 13,
    border: "2px solid var(--color-accent)",
    boxShadow: "0 2.5px 11px #a7f2eb33",
    padding: "10px 18px 7px 14px",
    textAlign: "center",
    letterSpacing: "0.7px",
    display: "inline-block",
    lineHeight: 1.2,
  };

  // Main component render
  return (
    <div style={{ paddingTop: 48, paddingBottom: 30, maxWidth: 430, margin: "0 auto" }}>
      {/* Status Card */}
      <section
        className="card"
        style={{
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 23px rgba(0,168,150,0.09)",
          border: "2.2px solid var(--color-accent)",
          padding: "34px 22px 19px 22px",
          marginBottom: 18,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 7,
          textAlign: "center",
        }}
      >
        <div className="subtitle" style={{ color: "var(--color-accent)", fontWeight: 700, marginBottom: 1 }}>
          Ride Status
        </div>
        <span
          style={{
            fontWeight: 800,
            color: "var(--color-accent)",
            fontSize: 21,
            padding: "5px 17px",
            background: "#ecfcf7",
            border: "1.5px solid var(--color-accent)",
            borderRadius: 19,
            marginBottom: 5,
            textTransform: "uppercase"
          }}
        >
          En Route
        </span>
        <div className="description" style={{ color: "var(--color-text-secondary)", fontSize: 15 }}>
          Your verified driver is on the way!
        </div>
        {/* PROMINENT ETA */}
        <div
          aria-live="polite"
          aria-atomic="true"
          style={etaBoxStyle}
        >
          {timeStr} &middot;&nbsp;
          <span style={{ color: "var(--color-primary)", fontWeight: 800, marginLeft: 4, letterSpacing: ".6px" }}>
            {fmtClock(r.estPickup)}
          </span>
        </div>
        <div
          style={{
            marginTop: 2,
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 15,
              background: "#eaf9ff",
              color: "var(--color-primary)",
              borderRadius: 11,
              padding: "2px 11px",
              fontWeight: 700,
              border: "1.2px solid var(--color-border)",
            }}
            aria-label="Driver"
          >
            Driver: {r.driver}
          </span>
          <span
            style={{
              fontSize: 13.2,
              background: "#f4fbf9",
              color: "#00A896",
              borderRadius: 11,
              padding: "2px 10px",
              fontWeight: 600,
              border: "1.2px solid var(--color-border)",
            }}
            aria-label="Vehicle"
          >
            {r.vehicle}
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--color-muted)",
            marginTop: 5,
            marginBottom: 0,
            fontWeight: 500,
          }}
        >
          Pickup Point: <span style={{ color: "#0077B6" }}>{r.depPoint}</span>
        </div>
      </section>

      {/* Map Card */}
      <section
        className="card"
        style={{
          borderRadius: "var(--radius-main)",
          border: "1.2px solid var(--color-border)",
          background: "#f8fafb",
          boxShadow: "0 1.5px 10px rgba(0,119,182,0.045)",
          padding: "19px 13px 13px 13px",
          marginBottom: 22,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            color: "var(--color-primary)",
            fontSize: 17,
            marginBottom: 10,
            textAlign: "center",
            letterSpacing: "-0.3px"
          }}
        >
          <span style={{marginRight: 7, fontSize: 23}}>🗺️</span>
          Live Map: Driver & Route
        </div>
        <div style={{
          width: "100%",
          maxWidth: 370,
          height: getMapHeight(),
          margin: "0 auto",
          borderRadius: 17,
          overflow: "hidden",
          border: "1.5px solid var(--color-accent)",
          boxShadow: "0 2px 14px #b9efe945"
        }}>
          <MapContainer
            center={r.driverLatLng}
            zoom={14}
            scrollWheelZoom={false}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 120,
              borderRadius: 17,
              border: "none"
            }}
            dragging={true}
            doubleClickZoom={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={18}
              attribution="&copy; OpenStreetMap contributors"
            />
            {/* Driver marker (car icon) */}
            <Marker position={r.driverLatLng} icon={carIcon}>
              <Popup>
                Driver: {r.driver} <br />
                {r.vehicle}
              </Popup>
            </Marker>
            {/* Pickup marker (blue pin) */}
            <Marker position={r.pickupLatLng} icon={userIcon}>
              <Popup>
                Pickup: {r.depPoint}
              </Popup>
            </Marker>
            {/* Route polyline */}
            <Polyline positions={route} pathOptions={{
              color: "#00A896",
              weight: 7,
              opacity: 0.75,
              dashArray: "5 11"
            }} />
          </MapContainer>
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 13.3,
            color: "#75b48a",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Driver is currently en route to your pickup.<br />
          Track progress live on the map.
        </div>
      </section>

      {/* SOS Button Section */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 37,
        }}
      >
        <button
          className="btn btn-large"
          style={{
            background: "linear-gradient(90deg, #e22b38, #ff5e67)",
            color: "#fff",
            fontWeight: 740,
            fontSize: "1.16rem",
            padding: "16px 38px",
            borderRadius: 15,
            border: "none",
            boxShadow: "0 4px 18px rgba(226,43,56,0.10)",
            outline: "none",
            letterSpacing: "0.6px",
            display: "flex",
            alignItems: "center",
            gap: 13,
            transition: "background 0.16s cubic-bezier(0.4,0,0.2,1)"
          }}
          onClick={handleSOS}
          aria-label="Emergency SOS"
          tabIndex={0}
        >
          Emergency SOS
        </button>
      </section>
    </div>
  );
}
