import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * ConfirmBookingScreen – Final booking review, payment selection, terms agreement, and simulated confirmation
 * Receives booking-state (mode, fare, eta, pickup, destination, guardianContact, ride) from navigation state.
 * Displays details, lets user pick payment, agree to terms, and confirm ride. Simulates confirmation & notification.
 */

const MOCK_PAYMENTS = [
  { id: "upi", name: "UPI", icon: "🇮🇳" },
  { id: "card", name: "Card", icon: "💳" },
  { id: "cash", name: "Cash", icon: "💵" },
];

const CONDUCT_TERMS = [
  "Respect your driver/host and fellow riders.",
  "No food, smoking, or loud music unless mutually agreed.",
  "Share route updates with guardian if enabled.",
  "Adhere to ride timings and safety instructions.",
];

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

  // Accept state passed from previous screens (guardian/ride/mode info)
  const state = location.state || {};
  const {
    selectedRide,
    pickup,
    destination,
    mode,
    modeIcon,
    guardianContact,
  } = state;

  // Ride details: fallback to safe mock if missing
  const ride = selectedRide || {};
  const fare = ride.price ?? "—";
  const eta = ride.eta ?? "—";
  const modeStr = mode || "Ride";
  const icon = modeIcon || getModeIcon(modeStr);

  const [payment, setPayment] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Handle Confirm Ride (simulate async with timeout)
  function handleConfirm() {
    setSubmitting(true);
    setTimeout(() => {
      setConfirmed(true);
      setSubmitting(false);
      // Simulate sending notification to driver/host (mock effect only)
      // In prod: trigger API call or websocket etc
    }, 1400);
  }

  // Return to home after booking
  function handleGoHome() {
    navigate("/", { replace: true });
  }

  // Show ride success state/modal
  if (confirmed) {
    return (
      <div className="container" style={{ paddingTop: 94, paddingBottom: 78 }}>
        <section
          className="rounded-card"
          style={{
            maxWidth: 410,
            margin: "32px auto",
            textAlign: "center",
            paddingTop: 40,
            paddingBottom: 42,
          }}
        >
          <span style={{ fontSize: 41, marginBottom: 15, display: "inline-block", color: "var(--accent)" }}>✅</span>
          <h2 className="heading-2" style={{ fontSize: 22, marginBottom: 10 }}>
            Ride Booked Successfully!
          </h2>
          <div style={{ color: "var(--text-secondary)", fontSize: 15.3, marginBottom: 11 }}>
            Your booking is confirmed. <br />
            <b style={{ color: "var(--primary)" }}>{ride.driver ? <>Driver: {ride.driver}</> : null}</b>
            {guardianContact ? (
              <>
                <br />
                <span style={{ color: "var(--accent)" }}>
                  Your guardian will receive ride updates.
                </span>
              </>
            ) : null}
            <br />
            <b>Driver/Host Notified!</b>
          </div>
          <div style={{
            padding: "14px 0 3px 0",
            color: "var(--primary)",
            letterSpacing: "1px",
            fontWeight: 600,
            fontSize: 16,
          }}>
            {icon} {modeStr}
            {pickup && (
              <>
                <br />
                <span style={{ color: "var(--accent)", fontWeight: 500 }}>From: </span>
                {pickup}
              </>
            )}
            {destination && (
              <>
                <br />
                <span style={{ color: "var(--accent)", fontWeight: 500 }}>To: </span>
                {destination}
              </>
            )}
            {fare !== "—" && (
              <>
                <br />
                <span style={{ color: "var(--text-secondary)" }}>Fare: ₹{fare}</span>
              </>
            )}
          </div>
          <button
            className="btn btn-large"
            style={{
              marginTop: 24,
              borderRadius: 22,
              padding: "12px 32px",
              fontWeight: 600,
              minWidth: 120,
            }}
            onClick={handleGoHome}
          >
            Return Home
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 92, paddingBottom: 74 }}>
      <section className="rounded-card" style={{ maxWidth: 420, margin: "32px auto 22px auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 12 }}>
          <span role="img" style={{ fontSize: 31 }}>{icon}</span>
          <span className="heading-2" style={{ fontSize: 20, color: "var(--accent)" }}>
            Review & Confirm Ride
          </span>
        </div>
        <div style={{
          background: "rgba(0,168,150,0.08)",
          borderRadius: 10,
          padding: "14px 10px",
          marginBottom: 13,
        }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: "var(--primary)", marginBottom: 2 }}>
            {modeStr} Ride {ride.driver ? <span>with <span style={{ color: "var(--accent)" }}>{ride.driver}</span></span> : ""}
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: 14.5 }}>
            ETA: <b>{eta} min</b>{" | "}Fare: {fare !== "—" ? <>₹<b>{fare}</b></> : "—"}
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
              background: "rgba(0,119,182,0.07)",
              padding: "5px 10px",
              borderRadius: 8,
              marginTop: 7,
              fontSize: 13,
            }}>
              Guardian contact set: <b>{guardianContact}</b>
            </div>
          )}
        </div>
        {/* Payment selection */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>
            Select Payment Method
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            {MOCK_PAYMENTS.map((opt) => (
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
                  outline: payment === opt.id ? "2.5px solid var(--accent)" : "none",
                  minWidth: 78,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  justifyContent: "center",
                  padding: "9px 0",
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
        {/* Rules agreement */}
        <div
          style={{
            background: "rgba(0,119,182,0.065)",
            borderRadius: 10,
            padding: "11px 10px 5px 10px",
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
            <span style={{ fontWeight: 500, fontSize: 14.6 }}>
              I agree to the TrustRide Conduct Terms
            </span>
          </label>
          <ul style={{ marginLeft: 26, marginTop: 0, paddingLeft: 15, fontSize: 13.7 }}>
            {CONDUCT_TERMS.map((line, idx) =>
              <li key={idx} style={{ marginBottom: 3 }}>{line}</li>
            )}
          </ul>
        </div>
        <div style={{ textAlign: "center", marginTop: 13 }}>
          <button
            className="btn btn-large"
            style={{
              borderRadius: 20,
              fontWeight: 700,
              fontSize: 16.1,
              minWidth: 154,
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
