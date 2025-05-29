import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Simple utility: Scroll modal backgrounds lock
function useModalLock(open) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
}
/**
 * PUBLIC_INTERFACE
 * RideStatusScreen — shows ride status (Scheduled/In Progress), estimated time, live (mock) driver tracker, and safety tools.
 * Features:
 *  - Displays ride status as "Scheduled" and auto-transitions to "In Progress" (with notification).
 *  - Prominent visual notification when ride starts, which auto-dismisses or can be manually dismissed.
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

  // Ride status: "Scheduled" initially, "In Progress" after delay (simulate driver started)
  const [rideStatus, setRideStatus] = useState("Scheduled");
  // State to show ride start notification (visual modal/banner)
  const [showRideStartNotif, setShowRideStartNotif] = useState(false);
  // Banner visual state: for dismiss animation/transition
  const [showBanner, setShowBanner] = useState(false);

  // Mock driver animation progress
  const [driverProgress, setDriverProgress] = useState(0);

  // SOS alert modal
  const [showSOS, setShowSOS] = useState(false);

  // Chat/call modals
  const [showChat, setShowChat] = useState(false);
  const [showCall, setShowCall] = useState(false);

  // Ride start status simulation timer
  useEffect(() => {
    let startStatusTimer;
    if (rideStatus === "Scheduled") {
      startStatusTimer = setTimeout(() => {
        setRideStatus("In Progress 🚗");
        setShowRideStartNotif(true);
        setShowBanner(true);
      }, 2000);
    }
    return () => startStatusTimer && clearTimeout(startStatusTimer);
    // eslint-disable-next-line
  }, [rideStatus]);

  // Dismiss ride start notification after X seconds (auto-close)
  useEffect(() => {
    let notifTimer;
    if (showRideStartNotif) {
      notifTimer = setTimeout(() => {
        setShowBanner(false); // animate/dismiss
        setTimeout(() => setShowRideStartNotif(false), 350);
      }, 3500);
    }
    return () => notifTimer && clearTimeout(notifTimer);
  }, [showRideStartNotif]);

  // Manual notification/banner dismiss
  function handleManuallyDismiss() {
    setShowBanner(false);
    setTimeout(() => setShowRideStartNotif(false), 350);
  }

  // Animate driver progress every N seconds (mocked to ETA arrival)
  useEffect(() => {
    let timer;
    if (driverProgress < MOCK_ROUTE.length - 1) {
      timer = setTimeout(() => {
        setDriverProgress((p) => Math.min(MOCK_ROUTE.length - 1, p + 1));
      }, Math.max(1000, (etaMinutes * 60 * 1000) / MOCK_ROUTE.length));
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [driverProgress, etaMinutes]);

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

      {/* Prominent ride-start banner/modal/notification */}
      {showRideStartNotif && (
        <div
          style={{
            position: "fixed",
            top: "16vh",
            left: 0,
            width: "100vw",
            zIndex: 4000,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none"
          }}
          role="alert"
          tabIndex={-1}
          aria-live="assertive"
        >
          <div
            style={{
              background: "#fff",
              border: "2.5px solid var(--accent)",
              borderRadius: 22,
              boxShadow: "0 8px 44px rgba(0,168,150, 0.18)",
              padding: "1.3rem 2.1rem 1.13rem 2.0rem",
              display: "flex",
              alignItems: "center",
              gap: 18,
              minWidth: 290,
              maxWidth: "90vw",
              fontWeight: 700,
              fontSize: 18,
              color: "var(--primary)",
              opacity: showBanner ? 1 : 0,
              transform: showBanner ? "translateY(0px)" : "translateY(-36px)",
              pointerEvents: "auto",
              transition: "opacity .33s, transform .32s cubic-bezier(.77,.12,.33,1.15)"
            }}
          >
            <span role="img" aria-label="Ride started" style={{ fontSize: 43, marginRight: 2 }}>🚗</span>
            <span>
              Ride <span style={{ color: "var(--accent)" }}>In Progress</span> — Your journey has begun!
              <div style={{ fontWeight: 500, color: "var(--text-secondary)", fontSize: 15, marginTop: 5 }}>
                Fasten your seatbelt. Safe travels! 🚦
              </div>
            </span>
            <button
              className="btn"
              style={{
                fontSize: 15,
                fontWeight: 700,
                minWidth: 35,
                minHeight: 35,
                borderRadius: 22,
                background: "var(--primary)",
                color: "#fff",
                marginLeft: 18,
                padding: "6px 15px",
                alignSelf: "flex-start",
                boxShadow: "0 1px 7px rgba(0,119,182,0.09)",
                outline: "none",
                border: "none",
                cursor: "pointer",
                pointerEvents: "auto"
              }}
              tabIndex={0}
              type="button"
              aria-label="Dismiss ride started notification"
              onClick={handleManuallyDismiss}
            >
              ×
            </button>
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
        {/* Chat and Call Buttons */}
        <div style={{ display: "flex", gap: 21, justifyContent: "center", marginTop: 19 }}>
          <button
            className="btn"
            style={{
              borderRadius: 22,
              minWidth: 92,
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "0 2px 9px #0077B609"
            }}
            onClick={() => setShowChat(true)}
            type="button"
            tabIndex={0}
            aria-label="Open driver chat"
          >
            <span role="img" aria-label="chat" style={{ fontSize: 20 }}>💬</span>
            Chat
          </button>
          <button
            className="btn"
            style={{
              borderRadius: 22,
              minWidth: 92,
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 2px 9px #00A89609"
            }}
            onClick={() => setShowCall(true)}
            type="button"
            tabIndex={0}
            aria-label="Call driver"
          >
            <span role="img" aria-label="call" style={{ fontSize: 20 }}>📞</span>
            Call
          </button>
        </div>
      </section>

      {/* Section: Mock Live Tracker */}
      <section style={{ ...sectionCardStyle, textAlign: "center" }}>
        <div className="heading-2" style={{ marginBottom: 12, fontSize: 17, color: "var(--accent)" }}>
          Live Route Tracker
        </div>
        <div style={{ width: 252, height: 120, margin: "0 auto 10px auto", position: "relative", background: "rgba(0,168,150,0.06)", borderRadius: 17, border: "1px solid var(--accent)", boxShadow: "0 4px 16px rgba(0,119,182,0.08)" }}>
          {/* Stylized route map/diagram as SVG */}
          <svg width="252" height="120" style={{ display: "block" }}>
            {/* Route line */}
            <polyline
              points={MOCK_ROUTE.map(p => `${p.x+16},${p.y+7}`).join(" ")}
              fill="none"
              stroke="#00A896"
              strokeWidth="3.2"
              opacity="0.45"
              strokeDasharray="8 4"
            />
            {/* Start (pickup) */}
            <circle cx={MOCK_ROUTE[0].x+16} cy={MOCK_ROUTE[0].y+7} r="11"
              fill="#fff"
              stroke="#0077B6"
              strokeWidth="2.3"
              style={{filter: "drop-shadow(0 2px 7px #00679822)"}}
            />
            <text x={MOCK_ROUTE[0].x+12} y={MOCK_ROUTE[0].y + 13} fontSize="17" fill="#0077B6" fontWeight="bold">🏁</text>
            {/* Label "Pickup" */}
            <text x={MOCK_ROUTE[0].x-7} y={MOCK_ROUTE[0].y+1} fontSize="12" fill="#0077B6" fontWeight="600">Pickup</text>
            {/* End (destination) */}
            <circle cx={MOCK_ROUTE.at(-1).x+16} cy={MOCK_ROUTE.at(-1).y+7} r="11"
              fill="#fff"
              stroke="#00A896"
              strokeWidth="2.3"
              style={{filter: "drop-shadow(0 2px 7px #018d6e22)"}}
            />
            <text x={MOCK_ROUTE.at(-1).x+7} y={MOCK_ROUTE.at(-1).y+22} fontSize="17" fill="#00A896" fontWeight="bold">🏁</text>
            <text x={MOCK_ROUTE.at(-1).x+1} y={MOCK_ROUTE.at(-1).y+36} fontSize="12" fill="#00A896" fontWeight="600">Dest.</text>
            {/* Animated driver icon on path */}
            <g>
              <circle
                cx={MOCK_ROUTE[driverProgress].x+16}
                cy={MOCK_ROUTE[driverProgress].y+7}
                r="13"
                fill="#FFD700"
                stroke="#fac500"
                strokeWidth="1.7"
                style={{ filter: "drop-shadow(0 4px 12px #FFD70030)" }}
              />
              <text
                fontSize="26"
                x={MOCK_ROUTE[driverProgress].x + 5}
                y={MOCK_ROUTE[driverProgress].y + 19}
                style={{
                  filter: "drop-shadow(0 1px 3px #3332)",
                  userSelect: "none",
                  pointerEvents: "none",
                  transition: "x, y .62s"
                }}
              >{DRIVER_ICONS[driverProgress % DRIVER_ICONS.length]}</text>
            </g>
          </svg>
          {/* Info overlays: driver and eta */}
          <div style={{
            position: "absolute",
            left: `${MOCK_ROUTE[driverProgress].x + 44}px`,
            top: `${MOCK_ROUTE[driverProgress].y - 8}px`,
            minWidth: 78,
            background: "#fff",
            borderRadius: 9,
            boxShadow: "0 2px 12px #0077B610",
            border: "1px solid var(--accent)",
            color: "var(--primary)",
            fontWeight: 700,
            fontSize: 14,
            padding: "5px 8px",
            textAlign: "left"
          }}>
            <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 600 }}>
              <span role="img" aria-label="Driver" style={{ fontSize: 18, marginRight: 3 }}>{modeIcon}</span>
              Driver
            </span>
            <br />
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>{driverName}</span>
            <br />
            <span style={{ color: "var(--primary)", fontWeight: 400, fontSize: 12.5 }}>
              ETA: <b>{Math.max(0, etaMinutes - Math.floor((driverProgress/(MOCK_ROUTE.length-1))*etaMinutes))} min</b>
            </span>
          </div>
          {/* Pickup icon left of map */}
          <span role="img" aria-label="Pickup" style={{
            position: "absolute",
            left: 0,
            top: MOCK_ROUTE[0].y-2,
            fontSize: 29,
            color: "#0077B6",
            filter: "drop-shadow(0 1px 4px #0077B616)"
          }}>📍</span>
          {/* Destination icon right of map */}
          <span role="img" aria-label="Dest" style={{
            position: "absolute",
            right: 3,
            top: MOCK_ROUTE.at(-1).y+2,
            fontSize: 28,
            color: "#00A896",
            filter: "drop-shadow(0 1px 4px #00A89616)"
          }}>🏠</span>
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13.2, fontStyle: "italic", marginTop: 7 }}>
          {rideStatus === "Scheduled"
            ? "Driver is on the way to pickup. Tracking live route…"
            : "Enroute to destination, tracking in real time…"}
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
