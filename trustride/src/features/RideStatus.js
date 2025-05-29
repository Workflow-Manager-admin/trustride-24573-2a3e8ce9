import React, { useMemo, useState } from "react";
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

// PUBLIC_INTERFACE
// RIDE STATUS COMPONENT, vertical arrangement of pickup ETA, ride status, map, and SOS button with modals
export default function RideStatus({ ride, onSOS }) {
  // For the inline SOS modal demo
  const [showSOSModal, setShowSOSModal] = useState(false);

  // Mock ride if none is passed
  const mockRide = {
    driver: "Priya Shah",
    vehicle: "Hyundai Verna - Blue",
    depPoint: "Greenwood University Main Gate",
    driverLatLng: [19.103, 72.87],
    pickupLatLng: [19.1167, 72.8333],
  };

  // Calculate ETA minutes: use real value if provided, else mock (6-12 min)
  const etaMins = useMemo(() => {
    if (ride && ride.estPickup) {
      const minFromNow = Math.max(1, Math.ceil((new Date(ride.estPickup) - new Date()) / 60000));
      return minFromNow;
    } else {
      return Math.floor(6 + Math.random() * 7); // 6-12 min
    }
  }, [ride && ride.estPickup]);

  // Calculate the estimated pickup time object
  const estPickup = useMemo(() => {
    if (ride && ride.estPickup) return new Date(ride.estPickup);
    const now = new Date();
    now.setSeconds(0, 0);
    now.setMinutes(now.getMinutes() + etaMins);
    return now;
  }, [ride && ride.estPickup, etaMins]);

  const r = {
    ...mockRide,
    ...(ride || {}),
    estPickup
  };

  // Time difference for ETA
  const timeDiff = Math.max(1, Math.ceil((new Date(r.estPickup) - new Date()) / 60000));
  const clockStr = new Date(r.estPickup).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  // Prominently styled ETA box (branded, pulsing)
  const etaBoxStyle = {
    margin: "0 auto 24px",
    fontWeight: 900,
    fontSize: "2.1rem",
    color: "var(--color-accent)",
    background: "linear-gradient(90deg, #faffeb 60%, #eaf9ff 100%)",
    borderRadius: 20,
    border: "2.7px solid var(--color-accent)",
    boxShadow: "0 8px 33px #a7f2eb25",
    padding: "18px 28px 16px 24px",
    textAlign: "center",
    letterSpacing: ".9px",
    display: "block",
    lineHeight: 1.22,
    textShadow: "0 2px 4px #00A89611",
    animation: "pulseEtaTime 1.2s infinite alternate",
    zIndex: 13,
    position: "relative",
    transition: "background 0.2s"
  };
  const etaPulseKeyframesStyle = `
    @keyframes pulseEtaTime {
      0% { box-shadow: 0 0 0 rgba(0,168,150,0.09); background-size: 100% 100%; }
      100% { box-shadow: 0 6px 21px 5px #a7f2eb44; background-size: 120% 115%; }
    }
  `;

  // Map route
  const route = [r.driverLatLng, r.pickupLatLng];

  // Responsive map height helper
  const getMapHeight = () => window.innerWidth < 420 ? 180 : 210;

  // SOS click handler: open modal
  function handleSOS() {
    if (onSOS) return onSOS();
    setShowSOSModal(true);
  }

  // Renders the modal for SOS confirmation
  function SOSSafetyModal({ open, onClose }) {
    if (!open) return null;
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Emergency SOS"
        tabIndex={-1}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 12000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.17)",
        }}
        onClick={onClose}
      >
        <div
          className="card"
          style={{
            minWidth: 320,
            maxWidth: 380,
            background: "#fff",
            border: "2.4px solid #e22b38",
            borderRadius: 23,
            boxShadow: "0 12px 42px #e22b3842",
            padding: "33px 22px 28px 24px",
            textAlign: "center",
            position: "relative",
            outline: "none",
          }}
          onClick={e => e.stopPropagation()}
        >
          <span
            role="img"
            aria-label="Siren"
            style={{
              fontSize: 56,
              marginBottom: 15,
              color: "#e22b38",
              filter: "drop-shadow(0 0 9px #e22b3855)",
              transform: "rotate(-13deg)",
              display: "inline-block",
              background: "linear-gradient(90deg, #ffeaea, #fff1f1 97%)",
              borderRadius: "50%",
              padding: "9px 16px 7px",
              border: "1.4px solid #e22b38",
              boxShadow: "0 1px 9px 0 #f4fbf9"
            }}
          >🚨</span>
          <h2 style={{
            color: "#e22b38",
            fontWeight: 800,
            fontSize: "1.5rem",
            margin: "0 0 13px 0",
            letterSpacing: "-0.8px"
          }}>SOS Emergency Activated</h2>
          <div className="description" style={{ color: "#e22b38", fontWeight: 660, fontSize: 15, marginBottom: 12 }}>
            Your guardians and TrustRide support will be immediately notified.<br />
            Live status & location shared. Please stay calm, help is on the way.
          </div>
          <div style={{ color: "#8da8ad", fontSize: 13.1, marginBottom: 20 }}>
            (This is a demo: no real notifications sent.)
          </div>
          <button
            autoFocus
            className="btn"
            style={{
              color: "#e22b38",
              background: "#fff",
              border: "2px solid #e22b38",
              borderRadius: 10,
              fontWeight: 700,
              minWidth: 120,
              fontSize: 16,
              marginTop: 7
            }}
            onClick={onClose}
            aria-label="Dismiss and return"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  // Main render: vertical stack, minimalist, with enhanced section spacing
  return (
    <div style={{
      paddingTop: 38,
      paddingBottom: 34,
      maxWidth: 430,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 0
    }}>
      <style>{etaPulseKeyframesStyle}</style>
      <SOSSafetyModal open={showSOSModal} onClose={() => setShowSOSModal(false)} />

      {/* 1. Estimated Pickup Time */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={etaBoxStyle}
      >
        {timeDiff <= 1
          ? (<span>Arriving now <span style={{
            marginLeft: 9,
            fontWeight: 800,
            color: "#129083",
            fontSize: "1rem",
            background: "rgba(0,168,150,0.09)", padding: "5px 13px", borderRadius: 12,
            border: "1.1px solid #00A896",
            boxShadow: "0 1px 8px #b9efe925",
            verticalAlign: "middle"
          }}>
            &#x23F1; {clockStr}
          </span></span>)
          : (<span>Arriving in <span style={{ color: "var(--color-primary)", fontWeight: 900 }}>{timeDiff} min</span>
            <span style={{
              marginLeft: 11,
              fontWeight: 800,
              color: "#129083",
              fontSize: "1.09rem",
              background: "rgba(0,168,150,0.09)", padding: "5px 13px", borderRadius: 12,
              border: "1.1px solid #00A896",
              boxShadow: "0 1px 8px #b9efe925",
              verticalAlign: "middle"
            }}>
              &#x23F1; {clockStr}
            </span>
          </span>)
        }
      </div>

      {/* 2. Ride Status Section */}
      <section
        className="card"
        aria-label="Ride Status"
        style={{
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 23px rgba(0,168,150,0.09)",
          border: "2px solid var(--color-accent)",
          padding: "28px 20px 15px 20px",
          marginBottom: 19,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 9,
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
            textTransform: "uppercase",
            letterSpacing: ".1em",
            boxShadow: "0 1.5px 10px #acfff440"
          }}
        >
          En Route
        </span>
        <div className="description" style={{ color: "var(--color-text-secondary)", fontSize: 15 }}>
          Your verified driver is on the way!
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

      {/* 3. Live Map Card */}
      <section
        className="card"
        aria-label="Live Map"
        style={{
          borderRadius: "var(--radius-main)",
          border: "1.2px solid var(--color-border)",
          background: "#f8fafb",
          boxShadow: "0 1.5px 10px rgba(0,119,182,0.045)",
          padding: "18px 10px 13px 10px",
          marginBottom: 25,
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
          <span style={{ marginRight: 7, fontSize: 23 }}>🗺️</span>
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
            {/* Driver marker */}
            <Marker position={r.driverLatLng} icon={carIcon}>
              <Popup>
                Driver: {r.driver} <br />
                {r.vehicle}
              </Popup>
            </Marker>
            {/* Pickup marker */}
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

      {/* 4. SOS Button as bottom card-style group */}
      <section
        aria-label="Emergency SOS"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 0,
        }}
      >
        <button
          className="btn btn-large"
          style={{
            background: "linear-gradient(90deg, #e22b38, #ff5e67)",
            color: "#fff",
            fontWeight: 750,
            fontSize: "1.13rem",
            padding: "15px 38px",
            borderRadius: 15,
            border: "none",
            boxShadow: "0 4px 18px rgba(226,43,56,0.11)",
            outline: "none",
            letterSpacing: "0.7px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            transition: "background 0.12s cubic-bezier(0.4,0,0.2,1)"
          }}
          onClick={handleSOS}
          aria-label="Emergency SOS"
          tabIndex={0}
        >
          <span role="img" aria-label="siren" style={{ fontSize: 26, marginRight: 6 }}>🚨</span>
          Emergency SOS
        </button>
      </section>
    </div>
  );
}
