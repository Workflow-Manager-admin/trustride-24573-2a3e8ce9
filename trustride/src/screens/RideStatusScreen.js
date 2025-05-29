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

  // Emergency features: Fake Call, Silent SOS, Ride Deviation Alert states
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showSilentSOS, setShowSilentSOS] = useState(false);
  const [showDeviation, setShowDeviation] = useState(false);
  const [showToast, setShowToast] = useState(null);

  // Modal lock
  useModalLock(showChat || showCall || showFakeCall || showSilentSOS || showDeviation);

  // Toast for quick feedback
  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(null), 2100);
    return () => clearTimeout(t);
  }, [showToast]);

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

  // Handler for persistent SOS button
  function handleSOS() {
    setShowSOS(true);
    // In production: trigger backend notification
  }
  function handleCloseSOS() { setShowSOS(false); }

  // Return to Home/Book new ride
  function handleBackHome() { navigate("/", { replace: true }); }

  // Emergency button style
  const emergBtnStyle = {
    minWidth: 109,
    minHeight: 44,
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 32,
    border: "none",
    boxShadow: "0 1.5px 8px #0077B609",
    outline: "none",
    background: "var(--background)",
    color: "var(--primary)",
    transition: "background .12s,color .12s",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer",
    padding: "8.5px 20px",
  };

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

      {/* Emergency Safety Features */}
      <section className="rounded-card" style={{ ...sectionCardStyle, textAlign: 'center', border: '2px solid var(--accent)', background: 'rgba(0,168,150,0.028)' }}>
        <div className="heading-2" style={{ marginBottom: 7, fontSize: 17, color: "var(--accent)", fontWeight: 700, letterSpacing: 0.1 }}>
          Emergency Safety Tools
        </div>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 14, marginBottom: 8
        }}>
          <button
            type="button"
            style={{ ...emergBtnStyle, background: "#e9f8fc", color: "#0078c2" }}
            onClick={() => setShowFakeCall(true)}
            aria-label="Trigger Fake Call"
            tabIndex={0}
          >
            <span role="img" aria-label="Fake Call" style={{ fontSize: 19 }}>📱</span>
            Fake Call
          </button>
          <button
            type="button"
            style={{ ...emergBtnStyle, background: "#f5fcf7", color: "#00A896" }}
            onClick={() => setShowSilentSOS(true)}
            aria-label="Send Silent SOS"
            tabIndex={0}
          >
            <span role="img" aria-label="Silent SOS" style={{ fontSize: 19 }}>🤫</span>
            Silent SOS
          </button>
          <button
            type="button"
            style={{ ...emergBtnStyle, background: "#fcf5eb", color: "#b49a00" }}
            onClick={() => setShowDeviation(true)}
            aria-label="Alert Ride Deviation"
            tabIndex={0}
          >
            <span role="img" aria-label="Deviation Alert" style={{ fontSize: 19 }}>⚠️</span>
            Ride Deviation
          </button>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 13.7, fontStyle: "italic", marginTop: 4 }}>
          These features help you discreetly manage emergencies and alert for deviations in route.
        </div>
      </section>
      {/* Toast/Modal Section for Emergency Buttons */}
      {showChat && <ChatModal driverName={driverName} onClose={() => setShowChat(false)} />}
      {showCall && <CallModal driverName={driverName} onClose={() => setShowCall(false)} />}

      {/* Emergency: Fake Call Modal */}
      {showFakeCall && (
        <ModalPopup
          emoji="📱"
          title="Fake Call Incoming"
          description="A fake call ring plays (mock)—handset vibrates. Use this as a discreet pretext in distress. No real call is placed."
          actionName="Dismiss"
          onClose={() => {
            setShowFakeCall(false);
            setShowToast("Fake Call popup was shown for emergency privacy.");
          }}
        />
      )}
      {/* Emergency: Silent SOS Modal */}
      {showSilentSOS && (
        <ModalPopup
          emoji="🤫"
          title="Silent SOS Sent"
          description="A silent SOS alert was sent to guardians and security (mocked)—driver is not notified. Your location is shared for your safety."
          actionName="OK"
          onClose={() => {
            setShowSilentSOS(false);
            setShowToast("Silent SOS alert (mock) triggered.");
          }}
        />
      )}
      {/* Emergency: Ride Deviation Alert Modal */}
      {showDeviation && (
        <ModalPopup
          emoji="⚠️"
          title="Route Deviation Alert"
          description="Your chosen contacts are alerted about a route deviation. They will track your vehicle for safety (mock demonstration)."
          actionName="Understood"
          onClose={() => {
            setShowDeviation(false);
            setShowToast("Ride Deviation alert shown (mocked).");
          }}
        />
      )}
      {/* Emergency feature toast popup for emergency buttons */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: 98,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            color: "var(--primary)",
            borderRadius: 10,
            padding: "12px 26px",
            fontWeight: 700,
            fontSize: 16,
            boxShadow: "0 8px 44px rgba(0,168,150,0.17)",
            border: "2px solid var(--accent)",
            zIndex: 9005,
            transition: "opacity .22s",
            opacity: showToast ? 1 : 0,
            pointerEvents: "none"
          }}>
          {showToast}
        </div>
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
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ModalPopup – Generic, minimalist modal for emergency feature illustrations.
 * Used for Fake Call, Silent SOS, Ride Deviation in RideStatusScreen.
 */
function ModalPopup({ emoji, title, description, actionName = "Close", onClose }) {
  useModalLock(true);
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9100,
        left: 0, top: 0, width: "100vw", height: "100vh",
        background: "rgba(30,40,58,0.20)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 21,
          minWidth: 280,
          maxWidth: "92vw",
          boxShadow: "0 6px 40px rgba(0,168,150, 0.19)",
          padding: "2.1rem 1.4rem 1.25rem 1.4rem",
          border: "2px solid var(--accent)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative"
        }}
      >
        <span style={{ fontSize: 41, marginBottom: 13 }}>{emoji}</span>
        <div className="heading-2" style={{ fontWeight: 700, fontSize: 19, marginBottom: 7, color: "var(--primary)" }}>{title}</div>
        <div style={{ color: "var(--text-secondary)", marginBottom: 18, textAlign: "center", fontSize: 15.5 }}>
          {description}
        </div>
        <button
          className="btn"
          style={{
            borderRadius: 22, padding: "12px 36px", fontSize: 15,
            fontWeight: 700, background: "var(--accent)", color: "#fff", minWidth: 96
          }}
          onClick={onClose}
        >
          {actionName}
        </button>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ChatModal – Simulates a secure ride chat UI (mock only, no backend)
 * Shows message exchange between user and driver, allows user to send "messages"
 */
function ChatModal({ driverName = "Driver", onClose }) {
  const [messages, setMessages] = React.useState([
    { user: "driver", text: `Hi, I'm on my way!` },
    { user: "self", text: `Okay, see you soon.` },
  ]);
  const [input, setInput] = React.useState("");
  // Modal background scroll lock
  useModalLock(true);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { user: "self", text: input.trim() }]);
    setInput("");
    // Simulate driver response after a slight delay
    setTimeout(() => {
      if (Math.random() > 0.6) {
        setMessages(msgs =>
          [...msgs, { user: "driver", text: Math.random() > 0.5 ? "Almost there!" : "Let me know if you have questions." }]
        );
      }
    }, 1200);
  }

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 5001, background: "rgba(20, 38, 60, 0.2)", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Ride chat dialog"
    >
      <div
        style={{
          background: "#fff", borderRadius: 19, width: "94vw", maxWidth: 395, minHeight: 320,
          boxShadow: "0 5px 30px #0077B61A", padding: "1.6rem 1.2rem 1.24rem 1.2rem",
          display: "flex", flexDirection: "column", alignItems: "stretch", position: "relative"
        }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 7, gap: 12 }}>
          <span role="img" aria-label="chat" style={{ fontSize: 28 }}>💬</span>
          <div className="heading-2" style={{ fontWeight: 600, fontSize: 18.5, color: "var(--primary)" }}>
            Chat with {driverName}
          </div>
          <button
            className="btn"
            style={{
              position: "absolute", top: 10, right: 12, fontWeight: 700, fontSize: 15,
              background: "var(--accent)", color: "#fff", borderRadius: 15, padding: "2px 15px"
            }}
            aria-label="Close chat"
            onClick={onClose}
            tabIndex={0}
            type="button"
          >×</button>
        </div>
        <div style={{
          flex: 1, minHeight: 120, maxHeight: 210, overflowY: "auto",
          marginBottom: 11, marginTop: 2, background: "rgba(0,119,182,0.068)",
          borderRadius: 10, padding: "5px 6px",
          border: "1px solid var(--border-color)"
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 7,
                display: "flex",
                justifyContent: msg.user === "self" ? "flex-end" : "flex-start"
              }}>
              <span style={{
                background: msg.user === "self" ? "var(--primary)" : "var(--accent)",
                color: "#fff",
                borderRadius: "13px",
                padding: "7px 13px",
                fontWeight: 500,
                fontSize: 14.7,
                maxWidth: 210,
                wordBreak: "break-word",
                boxShadow: msg.user === "self"
                  ? "0 2px 15px #0077B619"
                  : "0 2px 8px #00A89616",
                marginLeft: msg.user === "self" ? 28 : 0,
                marginRight: msg.user === "self" ? 0 : 28
              }}>{msg.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message…"
            style={{
              flex: 1,
              padding: "9px 11px",
              borderRadius: 9,
              border: "1.2px solid var(--border-color)",
              fontSize: 15.4,
              background: "var(--background)"
            }}
            autoFocus
            aria-label="Type message"
          />
          <button
            className="btn"
            style={{
              borderRadius: 12, fontWeight: 600,
              background: "var(--primary)",
              color: "#fff", minWidth: 54, fontSize: 14,
              opacity: input.trim() ? 1 : 0.55,
              cursor: input.trim() ? "pointer" : "not-allowed"
            }}
            type="submit"
            disabled={!input.trim()}
          >Send</button>
        </form>
        <div style={{
          color: "var(--text-secondary)",
          fontStyle: "italic",
          fontSize: 12.5,
          margin: "5px 0 0 1px"
        }}>
          Messages are end-to-end encrypted (mocked).
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * CallModal – Simulates a secure ride call dialog (mock only)
 * Shows driver call UI, ongoing call indicator, and basic hang up.
 */
function CallModal({ driverName = "Driver", onClose }) {
  // Call timer
  const [seconds, setSeconds] = React.useState(0);
  // Lock scroll
  useModalLock(true);

  React.useEffect(() => {
    const timer = setInterval(() => setSeconds(sec => sec + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 5001, background: "rgba(20,38,60,0.22)", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Ride call dialog"
    >
      <div
        style={{
          background: "#fff", borderRadius: 19, width: "92vw", maxWidth: 340, minHeight: 230,
          boxShadow: "0 7px 33px #00A89624", padding: "1.5rem 1.1rem 1.25rem 1.1rem",
          display: "flex", flexDirection: "column", alignItems: "center", position: "relative"
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
          <span role="img" aria-label="call" style={{ fontSize: 30 }}>📞</span>
          <div className="heading-2" style={{ fontWeight: 700, fontSize: 18, color: "var(--accent)" }}>
            Calling {driverName}
          </div>
          <button
            className="btn"
            style={{
              position: "absolute", top: 10, right: 13, fontWeight: 700, fontSize: 15,
              background: "var(--primary)", color: "#fff", borderRadius: 14, padding: "2px 13px"
            }}
            aria-label="Hang up call"
            onClick={onClose}
            tabIndex={0}
            type="button"
          >×</button>
        </div>
        <div style={{
          width: 74, height: 74, borderRadius: "50%", margin: "18px 0 7px 0",
          background: "rgba(0,168,150,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 37, color: "var(--primary)", boxShadow: "0 4px 18px #0077B61b"
        }}>
          <span role="img" aria-label="driver avatar">🧑‍✈️</span>
        </div>
        <div style={{
          fontWeight: 600, fontSize: 16, color: "var(--text-secondary)", marginBottom: 3
        }}>
          Ongoing call…
        </div>
        <div style={{ fontSize: 14.2, fontWeight: 700, color: "var(--accent)", marginBottom: 12 }}>
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
        </div>
        <button
          className="btn"
          style={{
            borderRadius: 16, fontWeight: 600, background: "#d40037", color: "#fff",
            minWidth: 80, fontSize: 15
          }}
          onClick={onClose}
          tabIndex={0}
          type="button"
        >
          Hang up
        </button>
        <div style={{
          color: "var(--text-secondary)", fontSize: 12, marginTop: 8, fontStyle: "italic"
        }}>
          Calls are encrypted (mocked).
        </div>
      </div>
    </div>
  );
}

export default RideStatusScreen;
