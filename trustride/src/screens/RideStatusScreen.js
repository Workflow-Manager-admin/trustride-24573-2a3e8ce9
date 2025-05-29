import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * RideStatusScreen — shows ride status (Scheduled/In Progress), estimated time, live (mock) driver tracker, and safety tools.
 * Features:
 *  - Displays ride status as "Scheduled" and auto-transitions to "In Progress" (with notification).
 *  - Prominent visual notification when ride starts.
 *  - Shows booking, ride, and guardian details from navigation state robustly.
 *  - Mock driver/vehicle animated tracker with ETA.
 *  - If guardian is set, activates Buddy Safety—shows info that guardian has been notified and mock live GPS feed.
 *  - Persistent always-visible circular SOS button (bottom-right, always "sticky").
 *  - Safety-first, readable UI, visually consistent with app.
 */

// Helper: fallback icon for each mode
function getModeIcon(mode) {
  switch ((mode || "").toLowerCase()) {
    case "bike":
      return "🚲";
    case "mini cab":
      return "🚕";
    case "prime cab":
      return "🚖";
    case "auto":
      return "🛺";
    default:
      return "🚘";
  }
}

// Mock driving animation route (simple for demo)
const MOCK_ROUTE = [
  { x: 20, y: 80 },
  { x: 38, y: 70 },
  { x: 54, y: 65 },
  { x: 70, y: 54 },
  { x: 78, y: 43 },
  { x: 88, y: 37 },
];

const DRIVER_ICONS = ["🚕", "🛺", "🚖", "🚲", "🚘", "🚌"];

// PUBLIC_INTERFACE
function RideStatusScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  // Robust extraction of details from navigation state
  const state = location.state || {};
  const ride = state.ride || state.selectedRide || {};
  const booking = state.booking || {};
  const pickup =
    state.pickup || booking.pickup || (booking && booking.pickup) || "";
  const destination =
    state.destination ||
    booking.destination ||
    (booking && booking.destination) ||
    "";
  const mode = state.mode || state.transportMode || "Ride";
  const modeIcon = state.modeIcon || getModeIcon(mode);
  const guardianContact =
    (state.guardianContact && typeof state.guardianContact === "string" && state.guardianContact.trim()) ||
    null;
  const driverName =
    ride && typeof ride === "object" && typeof ride.driver === "string"
      ? ride.driver
      : "Driver";
  const fare =
    ride && typeof ride === "object" && ride.price !== undefined
      ? ride.price
      : "—";
  const etaMinutes =
    ride && typeof ride === "object" && typeof ride.eta === "number"
      ? ride.eta
      : 7;

  // Ride status: "Scheduled" initially, "Enroute" after delay
  const [rideStatus, setRideStatus] = useState("Scheduled");
  // Mock driver animation progress
  const [driverProgress, setDriverProgress] = useState(0);
  // SOS alert modal
  const [showSOS, setShowSOS] = useState(false);

  // Animate driver progress every 2 sec (mocked to ETA arrival)
  useEffect(() => {
    let timer;
    if (rideStatus === "Scheduled" && driverProgress === 0) {
      timer = setTimeout(() => {
        setRideStatus("Enroute 🚗");
      }, 2200);
    }
    if (driverProgress < MOCK_ROUTE.length - 1) {
      timer = setTimeout(() => {
        setDriverProgress((p) => Math.min(MOCK_ROUTE.length - 1, p + 1));
      }, Math.max(1000, (etaMinutes * 60 * 1000) / MOCK_ROUTE.length));
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [rideStatus, driverProgress, etaMinutes]);

  // Main: Section/card styling helper
  const sectionCardStyle = {
    background: "var(--card-bg)",
    borderRadius: 17,
    boxShadow: "var(--card-shadow)",
    marginBottom: 22,
    padding: "1.2rem 1.1rem 1.2rem 1.1rem",
    border: "1px solid var(--border-color)",
    maxWidth: 470,
    marginLeft: "auto",
    marginRight: "auto",
  };

  // PUBLIC_INTERFACE
  // Handler for persistent SOS button
  function handleSOS() {
    setShowSOS(true);
    // In production: trigger backend notification
  }
  function handleCloseSOS() { setShowSOS(false); }

  // PUBLIC_INTERFACE
  // Return to Home/Book new ride
  function handleBackHome() { navigate("/", { replace: true }); }

  // Compose main details
  return (
    <div
      className="container"
      style={{ paddingTop: 84, paddingBottom: 84, minHeight: "93vh", position: "relative" }}
    >
      {/* Modal for SOS (shown only if SOS pressed) */}
      {showSOS && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(30,40,58,0.22)",
            zIndex: 5000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 19,
              boxShadow: "0 8px 44px rgba(220,18,18, 0.13)",
              maxWidth: 340,
              width: "92vw",
              padding: "2.1rem 1.4rem 1.35rem 1.4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <span role="img" aria-label="SOS" style={{ fontSize: 55, marginBottom: 11, color: "var(--accent)" }}>🆘</span>
            <div className="heading-2" style={{ fontSize: 19.5, color: "var(--primary)", marginBottom: 7, fontWeight: 700 }}>
              SOS Alert Sent!
            </div>
            <div style={{ color: "#d52f2f", fontWeight: 600, fontSize: 15.2, marginBottom: 9 }}>
              Emergency contacts and security notified.<br />Your live location was shared.
            </div>
            <button
              className="btn btn-large"
              style={{ borderRadius: 24, minWidth: 110, fontWeight: 600, fontSize: 15, background: "var(--accent)" }}
              onClick={handleCloseSOS}
            >Close</button>
          </div>
        </div>
      )}

      {/* Section: Ride Status & Details */}
      <section style={sectionCardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 9 }}>
          <span role="img" style={{ fontSize: 30 }}>{modeIcon}</span>
          <span className="heading-2" style={{ fontSize: 21, color: "var(--primary)", fontWeight: 700 }}>Ride Status</span>
        </div>
        <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: 16, marginBottom: 7 }}>
          {rideStatus === "Scheduled" ? "Scheduled 🚦" : rideStatus}
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 4 }}>
          <b>Pickup:</b> <span style={{ color: "var(--primary)" }}>{pickup || "N/A"}</span>
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 4 }}>
          <b>Destination:</b> <span style={{ color: "var(--primary)" }}>{destination || "N/A"}</span>
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          <b>Driver:</b> <span style={{ color: "var(--accent)" }}>{driverName}</span>
          {" • "}
          ETA: <span style={{ color: "var(--primary)" }}>{etaMinutes} min</span>
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 2 }}>
          <b>Fare:</b> {fare !== "—" ? <>₹{fare}</> : "—"}
        </div>
      </section>

      {/* Section: Mock Live Tracker */}
      <section style={{ ...sectionCardStyle, textAlign: "center" }}>
        <div className="heading-2" style={{ marginBottom: 12, fontSize: 17, color: "var(--accent)" }}>
          Live Driver Location
        </div>
        <div style={{ width: 220, height: 110, margin: "0 auto 7px auto", position: "relative", background: "rgba(0,168,150,0.06)", borderRadius: 14 }}>
          {/* Mock tracker "map" — simple SVG/Canvas for demo */}
          <svg width="220" height="110" style={{ display: "block" }}>
            {/* Route line */}
            <polyline
              points={MOCK_ROUTE.map(p => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#00A896"
              strokeWidth="3"
              opacity="0.38"
            />
            {/* Plot start (pickup) */}
            <circle cx={MOCK_ROUTE[0].x} cy={MOCK_ROUTE[0].y} r="7"
              fill="#0077B6"
              stroke="#fff"
              strokeWidth="2"
            />
            <text x={MOCK_ROUTE[0].x - 3} y={MOCK_ROUTE[0].y - 12} fontSize="13" fill="#0077B6">
              P
            </text>
            {/* Plot end (dest) */}
            <circle cx={MOCK_ROUTE.at(-1).x} cy={MOCK_ROUTE.at(-1).y} r="7"
              fill="#00A896"
              stroke="#fff"
              strokeWidth="2"
            />
            <text x={MOCK_ROUTE.at(-1).x - 7} y={MOCK_ROUTE.at(-1).y + 25} fontSize="13" fill="#00A896">
              D
            </text>
            {/* Animate driver icon */}
            <text
              fontSize="25"
              x={MOCK_ROUTE[driverProgress].x - 13}
              y={MOCK_ROUTE[driverProgress].y + 8}
              style={{
                filter: "drop-shadow(0 2px 4px #0077B690)",
                transition: "x, y .5s"
              }}
            >
              {DRIVER_ICONS[driverProgress % DRIVER_ICONS.length]}
            </text>
          </svg>
          <div style={{
            position: "absolute",
            left: MOCK_ROUTE[driverProgress].x + 19,
            top: MOCK_ROUTE[driverProgress].y - 2,
            color: "var(--primary)",
            fontSize: 13.5
          }}>
            {driverName}
          </div>
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, fontStyle: "italic", marginTop: 6 }}>
          {rideStatus === "Scheduled" ? "Driver is on the way to pickup." : "Enroute to destination..."}
        </div>
      </section>

      {/* Section: Buddy Safety (Guardian) */}
      {guardianContact && (
        <section style={sectionCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span role="img" aria-label="Buddy safety" style={{ fontSize: 25, color: "var(--accent)" }}>👁️‍🗨️</span>
            <span className="heading-2" style={{ fontSize: 16, color: "var(--accent)", fontWeight: 600 }}>
              Buddy Safety Activated
            </span>
          </div>
          <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14.5 }}>
            Guardian <span style={{ color: "var(--primary)" }}>{guardianContact}</span> notified with live ride details.
          </div>
          {/* Mock GPS feed panel */}
          <div
            style={{
              background: "rgba(0,168,150,0.09)",
              border: "1.5px dashed var(--accent)",
              borderRadius: 13,
              margin: "13px 0 3px 0",
              padding: "10px 11px",
              fontSize: 13.7,
              color: "var(--primary)",
              fontStyle: "italic",
            }}>
            <span style={{ fontWeight: 700, color: "var(--primary)" }}>Live GPS feed (mock):</span>{" "}
            {rideStatus === "Scheduled"
              ? "Guardian can see your location (en route to pickup)"
              : "Guardian sees you as enroute to destination"}
            <br />
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>
              Last update: {new Date().toLocaleTimeString().slice(0,5)}
            </span>
          </div>
        </section>
      )}

      {/* Persistent/floating SOS */}
      <button
        className="btn"
        style={{
          position: "fixed",
          right: 26, bottom: 32,
          zIndex: 500,
          borderRadius: "50%",
          width: 68, height: 68,
          fontSize: 28,
          fontWeight: 900,
          background: "var(--accent)",
          boxShadow: "0 4px 32px rgba(220,18,18, 0.12),0 1px 12px 0 rgba(0,119,182,0.06)",
          color: "#fff",
          border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          outline: "none",
          transition: "box-shadow .12s, background .17s",
        }}
        onClick={handleSOS}
        aria-label="Trigger SOS emergency alert"
        tabIndex={0}
        type="button"
      >
        🆘
      </button>

      {/* Go Home / Book new ride after ride finished */}
      {/* 
      <div style={{textAlign:"center", marginTop:26}}>
        <button className="btn" style={{borderRadius:16, minWidth:100}} onClick={handleBackHome}>Done / Back Home</button>
      </div>
      */}
    </div>
  );
}

export default RideStatusScreen;
