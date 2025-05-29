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

/** FEEDBACK & RATING ADDITION **/

/**
 * PUBLIC_INTERFACE
 * RideStatus: TrustRide live status screen.
 * Now arranges ETA, ride status, and SOS in a horizontal row above the map.
 * Feedback rating is always reliably shown at the bottom when ride is complete.
 */

export default function RideStatus({ ride, onSOS }) {
  // SOS modal state and feedback states
  const [showSOSModal, setShowSOSModal] = useState(false);

  // Feedback: only show on ride completion
  const rideIsComplete = ride && (ride.status === "complete" || ride.complete);
  const [selectedRating, setSelectedRating] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Navigation: redirect to home after feedback
  function goHome() {
    if (typeof window !== "undefined" && window.dispatchEvent) {
      if (typeof window._navigateToHome === "function") {
        window._navigateToHome();
      } else {
        window.location.reload();
      }
    }
  }
  function handleRating(idx) {
    setSelectedRating(idx);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      goHome();
    }, 2000);
  }
  const FEEDBACK_EMOJIS = [
    { emoji: "😡", label: "Very Bad" },
    { emoji: "🙁", label: "Bad" },
    { emoji: "😐", label: "Okay" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😍", label: "Excellent" },
  ];

  // Mock ride fallback
  const mockRide = {
    driver: "Priya Shah",
    vehicle: "Hyundai Verna - Blue",
    depPoint: "Greenwood University Main Gate",
    driverLatLng: [19.103, 72.87],
    pickupLatLng: [19.1167, 72.8333],
  };

  // ETA logic
  const etaMins = useMemo(() => {
    if (ride && ride.estPickup) {
      const minFromNow = Math.max(1, Math.ceil((new Date(ride.estPickup) - new Date()) / 60000));
      return minFromNow;
    } else {
      return Math.floor(6 + Math.random() * 7);
    }
  }, [ride && ride.estPickup]);
  const estPickup = useMemo(() => {
    if (ride && ride.estPickup) return new Date(ride.estPickup);
    const now = new Date();
    now.setSeconds(0, 0);
    now.setMinutes(now.getMinutes() + etaMins);
    return now;
  }, [ride && ride.estPickup, etaMins]);
  const r = { ...mockRide, ...(ride || {}), estPickup };
  const timeDiff = Math.max(1, Math.ceil((new Date(r.estPickup) - new Date()) / 60000));
  const clockStr = new Date(r.estPickup).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  // Map logic
  const route = [r.driverLatLng, r.pickupLatLng];
  const getMapHeight = () => window.innerWidth < 420 ? 180 : 210;

  // SOS
  function handleSOS() {
    if (onSOS) return onSOS();
    setShowSOSModal(true);
  }
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

  // Styles for the new horizontal status row
  const statusRowStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: "11px",
    width: "100%",
    maxWidth: 430,
    margin: "0 auto 19px auto",
    paddingTop: 30,
    paddingBottom: 8,
    flexWrap: "wrap",
  };
  const statusEtaBox = {
    flex: "1 1 120px",
    minWidth: 110,
    margin: 0,
    fontWeight: 900,
    fontSize: "1.38rem",
    color: "var(--color-accent)",
    background: "linear-gradient(90deg, #faffeb 60%, #eaf9ff 100%)",
    borderRadius: 15,
    border: "2px solid var(--color-accent)",
    boxShadow: "0 2px 11px #a7f2eb18",
    padding: "11px 11px",
    textAlign: "center",
    letterSpacing: ".7px",
    lineHeight: 1.13,
    textShadow: "0 1.5px 4px #00A89610",
    animation: "pulseEtaTime 1.1s infinite alternate",
    transition: "background 0.2s"
  };
  const statusRideState = {
    flex: "1 1 120px",
    minWidth: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px"
  };
  const statusRideText = {
    fontWeight: 800,
    fontSize: "1.11rem",
    color: "var(--color-accent)",
    background: "#ecfcf7",
    borderRadius: 16,
    padding: "4px 15px",
    border: "1.4px solid var(--color-accent)",
    textTransform: "uppercase",
    marginBottom: 1,
    letterSpacing: ".06em"
  };
  const statusSOS = {
    flex: "1 1 110px",
    minWidth: 102,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const etaPulseKeyframesStyle = `
    @keyframes pulseEtaTime {
      0% { box-shadow: 0 0 0 rgba(0,168,150,0.09); background-size: 100% 100%; }
      100% { box-shadow: 0 4px 14px 2px #a7f2eb34; background-size: 115% 110%; }
    }
  `;

  // Main render (horizontal status row at top, map, ride details, then feedback at bottom if complete)
  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: rideIsComplete ? "82vh" : "78vh",
        background: "transparent",
        position: "relative"
      }}
    >
      <style>{etaPulseKeyframesStyle}</style>
      <SOSSafetyModal open={showSOSModal} onClose={() => setShowSOSModal(false)} />

      {/* -------- Top Horizontal Ride Status Row -------- */}
      <section
        aria-label="Ride Info Status Row"
        style={statusRowStyles}
      >
        {/* ETA */}
        <div style={statusEtaBox} aria-live="polite" aria-atomic="true">
          {timeDiff <= 1
            ? (<span>Arriving now<br />
                <span style={{
                  display: "inline-block",
                  marginTop: 4,
                  fontWeight: 800,
                  color: "#129083",
                  fontSize: ".94em",
                  background: "rgba(0,168,150,0.075)", padding: "3px 8px", borderRadius: 9,
                  border: "1px solid #00A896",
                  verticalAlign: "middle"
                }}>
                  &#x23F1; {clockStr}
                </span>
            </span>)
            : (<span>ETA <span style={{ color: "var(--color-primary)", fontWeight: 900 }}>{timeDiff} min</span>
                <br />
                <span style={{
                  display: "inline-block",
                  marginTop: 4,
                  fontWeight: 800,
                  color: "#129083",
                  fontSize: ".96em",
                  background: "rgba(0,168,150,0.07)", padding: "4px 10px", borderRadius: 9,
                  border: "1px solid #00A896",
                  verticalAlign: "middle"
                }}>
                  &#x23F1; {clockStr}
                </span>
            </span>)
          }
        </div>
        {/* Ride Status Text */}
        <div style={statusRideState}>
          <div style={statusRideText}>{rideIsComplete ? "Complete" : "En Route"}</div>
          <div style={{
            fontSize: 13.1,
            color: "var(--color-text-secondary)",
            fontWeight: 600,
            letterSpacing: ".01em"
          }}>
            {rideIsComplete ? "Ride ended" : "Driver en route"}
          </div>
        </div>
        {/* SOS Button */}
        <div style={statusSOS}>
          <button
            className="btn btn-large"
            style={{
              background: "linear-gradient(90deg, #e22b38, #ff5e67)",
              color: "#fff",
              fontWeight: 750,
              fontSize: "1.06rem",
              padding: "12px 14px",
              borderRadius: 12,
              border: "none",
              minWidth: 100,
              boxShadow: "0 3px 13px rgba(226,43,56,0.10)",
              outline: "none",
              letterSpacing: "0.7px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.12s cubic-bezier(0.4,0,0.2,1)"
            }}
            onClick={handleSOS}
            aria-label="Emergency SOS"
            tabIndex={0}
          >
            <span role="img" aria-label="siren" style={{ fontSize: 21, marginRight: 5 }}>🚨</span>
            SOS
          </button>
        </div>
      </section>

      {/* -------- Live Map Card -------- */}
      <section
        className="card"
        aria-label="Live Map"
        style={{
          borderRadius: "var(--radius-main)",
          border: "1.2px solid var(--color-border)",
          background: "#f8fafb",
          boxShadow: "0 1.5px 10px rgba(0,119,182,0.045)",
          padding: "18px 10px 13px 10px",
          marginBottom: rideIsComplete ? 32 : 30,
          marginTop: 0,
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
            marginBottom: 9,
            textAlign: "center",
            letterSpacing: "-0.3px"
          }}
        >
          <span style={{ marginRight: 7, fontSize: 22 }}>🗺️</span>
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

      {/* -------- Feedback Section fixed at bottom when ride is complete -------- */}
      {rideIsComplete && (
        <section
          aria-label="Feedback"
          style={{
            width: "100%",
            background: "none",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: 300,
            padding: "24px 0 0 0",
            backgroundColor: "rgba(255,255,255,0.91)",
            boxShadow: "0 -2px 12px 0 #b9efe94c"
          }}
        >
          <div
            style={{
              maxWidth: 430,
              width: "100%",
              margin: "auto",
              background: "#fff",
              borderTopLeftRadius: 23,
              borderTopRightRadius: 23,
              borderTop: "2px solid var(--color-border)",
              minHeight: 110,
              boxShadow: "0 -2px 16px #b9efe93a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "19px 12px 11px 12px"
            }}
          >
            {!showThankYou ? (
              <>
                <div style={{
                  marginBottom: 7,
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  fontSize: 16.5
                }}>
                  How was your ride?
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 14,
                    marginBottom: 6,
                    marginTop: 0
                  }}
                  aria-label="Rate your ride"
                  role="radiogroup"
                >
                  {FEEDBACK_EMOJIS.map((item, idx) => (
                    <button
                      key={item.label}
                      type="button"
                      aria-label={item.label}
                      aria-checked={selectedRating === idx}
                      role="radio"
                      tabIndex={0}
                      onClick={() => handleRating(idx)}
                      style={{
                        background: selectedRating === idx ? "linear-gradient(90deg, #eaf9ff 92%, #f7fafd 100%)" : "#fff",
                        border: selectedRating === idx
                          ? "2.3px solid var(--color-accent)"
                          : "2px solid var(--color-border)",
                        borderRadius: 15,
                        fontSize: 32,
                        padding: "8px 11px 7px 11px",
                        outline: "none",
                        transition: "border 0.16s, background 0.16s",
                        boxShadow: selectedRating === idx ? "0 1.5px 7px #ecfcf7" : "none",
                        cursor: "pointer",
                        filter: selectedRating === idx ? "none" : "grayscale(0.11)",
                        position: "relative",
                        minWidth: 45
                      }}
                    >
                      <span aria-hidden="true">{item.emoji}</span>
                    </button>
                  ))}
                </div>
                <div style={{
                  fontSize: 13.2,
                  color: "var(--color-muted)",
                  fontWeight: 500,
                  marginTop: 2,
                  minHeight: 16
                }}>
                  {selectedRating !== null &&
                    <>Selected: <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>{FEEDBACK_EMOJIS[selectedRating].label}</span></>
                  }
                </div>
              </>
            ) : (
              <div
                style={{
                  margin: "11px 0 2px 0",
                  padding: "18px 11px",
                  borderRadius: 15,
                  background: "linear-gradient(90deg,#f4fbf9 60%,#eaf9ff 100%)",
                  color: "#00A896",
                  fontWeight: 800,
                  fontSize: 18,
                  textAlign: "center",
                  border: "1.3px solid var(--color-border)",
                  boxShadow: "0 2.5px 14px #b9efe934",
                  minWidth: 140,
                  maxWidth: 250,
                  letterSpacing: "-0.03em"
                }}
                aria-live="polite"
                tabIndex={-1}
              >
                Thank you for your feedback!
                <div style={{
                  color: "#45566E",
                  marginTop: 4,
                  fontWeight: 600,
                  fontSize: 14.8
                }}>
                  Redirecting to Home...
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
