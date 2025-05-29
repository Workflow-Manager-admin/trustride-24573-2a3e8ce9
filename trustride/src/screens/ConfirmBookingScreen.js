import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * ConfirmBookingScreen – Receives ride, booking, mode, and guardian details from navigation state.
 * Displays summary, allows payment selection, requires terms acceptance, and shows booking success.
 */
const MOCK_PAYMENTS = [
  { id: "upi", name: "UPI", icon: "🇮🇳" },
  { id: "card", name: "Credit Card", icon: "💳" },
  { id: "cash", name: "Cash", icon: "💵" }
];

const CONDUCT_TERMS = [
  "Respect your driver/host and fellow riders.",
  "No food, smoking, or loud music unless mutually agreed.",
  "Share route updates with guardian if enabled.",
  "Follow ride timings and safety instructions.",
];

// Util for fallback transport mode icon
function getModeIcon(mode) {
  switch ((mode || "").toLowerCase()) {
    case "bike": return "🚲";
    case "mini cab": return "🚕";
    case "prime cab": return "🚖";
    case "auto": return "🛺";
    default: return "🚘";
  }
}

// PUBLIC_INTERFACE
function ConfirmBookingScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  // All relevant navigation state
  const state = location.state || {};
  const {
    booking = {},
    ride = {},
    mode,
    modeIcon,
    guardianContact
  } = state;

  // Prefer these aliases for legacy/compat
  const selectedRide = state.selectedRide || ride || {};
  const pickup = state.pickup || booking.pickup || "";
  const destination = state.destination || booking.destination || "";
  const fare = selectedRide.price ?? "—";
  const eta = selectedRide.eta ?? "—";
  const driverName = selectedRide.driver ?? "";

  const rideMode = mode || state.mode || "Ride";
  const icon = modeIcon || getModeIcon(rideMode);

  // Local UI states
  const [payment, setPayment] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Simulate notification; after success, return to home
  function handleConfirm() {
    setSubmitting(true);
    setTimeout(() => {
      setConfirmed(true);
      setSubmitting(false);
      // In real app, trigger API call to book/unlock in backend + notify driver/host
    }, 1200);
  }
  function handleGoHome() {
    navigate("/", { replace: true });
  }

  // Booking success/notification state
  if (confirmed) {
    return (
      <div className="container" style={{ paddingTop: 94, paddingBottom: 76 }}>
        <section
          className="rounded-card"
          style={{
            maxWidth: 410,
            margin: "34px auto",
            textAlign: "center",
            paddingTop: 38,
            paddingBottom: 40
          }}
        >
          <span style={{ fontSize: 43, marginBottom: 17, color: "var(--accent)" }}>✅</span>
          <h2 className="heading-2" style={{ fontSize: 22, marginBottom: 10 }}>
            Ride Booked!
          </h2>
          <div style={{ color: "var(--text-secondary)", fontSize: 15.3, marginBottom: 9 }}>
            {driverName && <b style={{ color: "var(--primary)" }}>Driver: {driverName}</b>}
            <br />
            {guardianContact ? (
              <span style={{ color: "var(--accent)" }}>
                Guardian <span style={{ fontWeight: 700 }}>{guardianContact}</span> will receive ride updates.
              </span>
            ) : null}
            <br />
            <span style={{ color: "var(--text-secondary)" }}>Driver/Host Notified!</span>
          </div>
          <div style={{
            padding: "13px 0 4px 0",
            color: "var(--primary)",
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: "0.5px",
          }}>
            {icon} {rideMode}
            <br />
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>From:</span> {pickup}
            <br />
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>To:</span> {destination}
            <br />
            <span style={{ color: "var(--text-secondary)" }}>
              Fare: {fare !== "—" ? <>₹{fare}</> : "—"}
            </span>
          </div>
          <button
            className="btn btn-large"
            style={{ marginTop: 24, borderRadius: 22, minWidth: 118, fontWeight: 600, fontSize: 16.2 }}
            onClick={handleGoHome}
          >
            Return Home
          </button>
        </section>
      </div>
    );
  }

  // Main booking review & confirmation UI
  return (
    <div className="container" style={{ paddingTop: 92, paddingBottom: 72 }}>
      <section className="rounded-card" style={{ maxWidth: 434, margin: "32px auto" }}>
        {/* Ride header/summary */}
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 9 }}>
          <span role="img" style={{ fontSize: 31 }}>{icon}</span>
          <span className="heading-2" style={{ fontSize: 21, color: "var(--accent)" }}>
            Confirm Your Booking
          </span>
        </div>
        <div style={{
          background: "rgba(0,168,150,0.085)",
          borderRadius: 10,
          padding: "13px 10px",
          marginBottom: 13,
        }}>
          <div style={{ fontWeight: 700, fontSize: 17.2, color: "var(--primary)", marginBottom: 1 }}>
            {rideMode} Ride {driverName ? <span>with <span style={{ color: "var(--accent)" }}>{driverName}</span></span> : ""}
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: 14.5 }}>
            ETA: <b>{eta}</b> min | Fare: {fare !== "—" ? <>₹<b>{fare}</b></> : "—"}
          </div>
          <div style={{
            color: "var(--accent)",
            fontSize: 13.8,
            marginTop: 2,
            fontWeight: 500,
            lineHeight: 1.2,
          }}>
            Pickup: <span style={{ color: "var(--primary)" }}>{pickup || "N/A"}</span><br />
            Destination: <span style={{ color: "var(--primary)" }}>{destination || "N/A"}</span>
          </div>
          {guardianContact && (
            <div style={{
              color: "var(--accent)",
              background: "rgba(0,119,182,0.064)",
              padding: "5px 10px",
              borderRadius: 7,
              marginTop: 7,
              fontSize: 13.3,
            }}>
              <b>Guardian: {guardianContact}</b>
            </div>
          )}
        </div>
        {/* Payment method */}
        <div style={{ marginBottom: 15 }}>
          <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>
            Select Payment Method
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {MOCK_PAYMENTS.map(opt => (
              <button
                key={opt.id}
                type="button"
                className="btn"
                tabIndex={0}
                style={{
                  background: payment === opt.id ? "var(--accent)" : "var(--card-bg)",
                  color: payment === opt.id ? "#fff" : "var(--primary)",
                  borderRadius: 13,
                  fontSize: 15,
                  fontWeight: 600,
                  border: payment === opt.id ? "2.2px solid var(--accent)" : "1px solid var(--border-color)",
                  boxShadow: payment === opt.id ? "0 2px 9px rgba(0,168,150,0.07)" : "none",
                  outline: payment === opt.id ? "2.2px solid var(--accent)" : "none",
                  minWidth: 78,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "center",
                  padding: "8px 0",
                  cursor: "pointer"
                }}
                onClick={() => setPayment(opt.id)}
                aria-pressed={payment === opt.id}
              >
                <span style={{ fontSize: 22 }}>{opt.icon}</span>
                <span style={{ fontWeight: 600 }}>{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Terms agreement */}
        <div
          style={{
            background: "rgba(0,119,182,0.065)",
            borderRadius: 10,
            padding: "10px 10px 6px 10px",
            marginBottom: 9,
            border: "1px solid var(--border-color)",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{
                accentColor: "var(--accent)",
                width: 19,
                height: 19,
                marginRight: 4,
              }}
            />
            <span style={{ fontWeight: 500, fontSize: 14.4 }}>
              I agree to the TrustRide Conduct Terms
            </span>
          </label>
          <ul style={{ marginLeft: 26, marginTop: 0, paddingLeft: 15, fontSize: 13.5 }}>
            {CONDUCT_TERMS.map((line, idx) =>
              <li key={idx} style={{ marginBottom: 3 }}>{line}</li>
            )}
          </ul>
        </div>
        {/* Confirm button */}
        <div style={{ textAlign: "center", marginTop: 11 }}>
          <button
            className="btn btn-large"
            style={{
              borderRadius: 19,
              fontWeight: 700,
              fontSize: 16,
              minWidth: 140,
              background: payment && agreed && !submitting ? "var(--primary)" : "#bbb",
              color: "#fff",
              cursor: payment && agreed && !submitting ? "pointer" : "not-allowed",
              opacity: payment && agreed ? 1 : 0.75,
              marginBottom: 2,
              transition: "background .18s",
            }}
            disabled={!payment || !agreed || submitting}
            onClick={handleConfirm}
            type="button"
          >
            {submitting ? "Booking..." : "Confirm Ride"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmBookingScreen;
