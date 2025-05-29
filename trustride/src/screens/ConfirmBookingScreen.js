import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * ConfirmBookingScreen – Receives ride, booking, mode, and guardian details from navigation state.
 * Displays summary, allows payment selection, requires terms acceptance, and shows booking success.
 */

// Mock payment options
const PAYMENT_OPTIONS = [
  { id: "upi", name: "UPI", icon: "🇮🇳" },
  { id: "card", name: "Credit Card", icon: "💳" },
  { id: "cash", name: "Cash", icon: "💵" },
];

// TrustRide code of conduct lines
const CONDUCT_TERMS = [
  "Respect your driver/host and fellow riders.",
  "No food, smoking, or loud music unless mutually agreed.",
  "Share route updates with guardian if enabled.",
  "Follow ride timings and safety instructions.",
];

// Utility: fallback mode icon
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

// PUBLIC_INTERFACE
function ConfirmBookingScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation state extraction
  const state = location.state || {};

  // Booking and ride data structure. Support multiple navigation patterns.
  const booking = state.booking || {};
  const ride = state.ride || state.selectedRide || {};
  const mode = state.mode || "Ride";
  const modeIcon = state.modeIcon || getModeIcon(mode);
  const guardianContact = typeof state.guardianContact === "string" && state.guardianContact.trim() ? state.guardianContact : null;
  // Fallbacks for pickup/destination - highest priority: explicit state > booking object
  const pickup = state.pickup || booking.pickup || "";
  const destination = state.destination || booking.destination || "";

  // Summary fields
  const fare = ride.price !== undefined ? ride.price : "—";
  const eta = ride.eta !== undefined ? ride.eta : "—";
  const driverName = ride.driver || "";

  // UI states
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitPending, setSubmitPending] = useState(false);
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  // PUBLIC_INTERFACE
  // Handles ride confirmation flow: disables, simulates backend, shows confirmation
  function handleConfirmBooking() {
    setSubmitPending(true);
    setTimeout(() => {
      setConfirmSuccess(true);
      setSubmitPending(false);
      // In production: Call backend, notify guardian, notify driver/host, etc.
    }, 1100);
  }

  // PUBLIC_INTERFACE
  // After confirmation, return to home
  function handleReturnHome() {
    navigate("/", { replace: true });
  }

  // UI: Show success confirmation if booked
  if (confirmSuccess) {
    return (
      <div className="container" style={{ paddingTop: 94, paddingBottom: 76 }}>
        <section
          className="rounded-card"
          style={{
            maxWidth: 410,
            margin: "34px auto",
            textAlign: "center",
            paddingTop: 38,
            paddingBottom: 40,
          }}
        >
          <span style={{ fontSize: 43, marginBottom: 17, color: "var(--accent)" }}>✅</span>
          <h2 className="heading-2" style={{ fontSize: 22, marginBottom: 10 }}>
            Ride Booked!
          </h2>
          <div style={{ color: "var(--text-secondary)", fontSize: 15.3, marginBottom: 9 }}>
            {driverName && <b style={{ color: "var(--primary)" }}>Driver: {driverName}</b>}
            <br />
            {guardianContact && (
              <span style={{ color: "var(--accent)" }}>
                Guardian <span style={{ fontWeight: 700 }}>{guardianContact}</span> will receive ride updates.
              </span>
            )}
            <br />
            <span style={{ color: "var(--text-secondary)" }}>Driver/Host Notified!</span>
          </div>
          <div
            style={{
              padding: "13px 0 4px 0",
              color: "var(--primary)",
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "0.5px",
            }}
          >
            {modeIcon} {mode}
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
            style={{
              marginTop: 24,
              borderRadius: 22,
              minWidth: 118,
              fontWeight: 600,
              fontSize: 16.2,
            }}
            onClick={handleReturnHome}
          >
            Return Home
          </button>
        </section>
      </div>
    );
  }

  // Main UI: Booking Summary, Payment, Terms, Confirm
  return (
    <div className="container" style={{ paddingTop: 92, paddingBottom: 72 }}>
      <section className="rounded-card" style={{ maxWidth: 434, margin: "32px auto" }}>
        {/* Ride Overview */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13,
            marginBottom: 9,
          }}
        >
          <span role="img" style={{ fontSize: 31 }}>
            {modeIcon}
          </span>
          <span className="heading-2" style={{ fontSize: 21, color: "var(--accent)" }}>
            Confirm Your Booking
          </span>
        </div>
        <div
          style={{
            background: "rgba(0,168,150,0.085)",
            borderRadius: 10,
            padding: "13px 10px",
            marginBottom: 13,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 17.2, color: "var(--primary)", marginBottom: 1 }}>
            {mode} Ride {driverName && <>with <span style={{ color: "var(--accent)" }}>{driverName}</span></>}
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: 14.5 }}>
            ETA: <b>{eta}</b> min | Fare: {fare !== "—" ? <>₹<b>{fare}</b></> : "—"}
          </div>
          <div
            style={{
              color: "var(--accent)",
              fontSize: 13.8,
              marginTop: 2,
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            Pickup: <span style={{ color: "var(--primary)" }}>{pickup || "N/A"}</span>
            <br />
            Destination: <span style={{ color: "var(--primary)" }}>{destination || "N/A"}</span>
          </div>
          {guardianContact && (
            <div
              style={{
                color: "var(--accent)",
                background: "rgba(0,119,182,0.064)",
                padding: "5px 10px",
                borderRadius: 7,
                marginTop: 7,
                fontSize: 13.3,
              }}
            >
              <b>Guardian: {guardianContact}</b>
            </div>
          )}
        </div>

        {/* Payment Selection */}
        <div style={{ marginBottom: 15 }}>
          <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>
            Select Payment Method
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {PAYMENT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className="btn"
                tabIndex={0}
                style={{
                  background: paymentMethod === option.id ? "var(--accent)" : "var(--card-bg)",
                  color: paymentMethod === option.id ? "#fff" : "var(--primary)",
                  borderRadius: 13,
                  fontSize: 15,
                  fontWeight: 600,
                  border: paymentMethod === option.id
                    ? "2.2px solid var(--accent)"
                    : "1px solid var(--border-color)",
                  boxShadow: paymentMethod === option.id
                    ? "0 2px 9px rgba(0,168,150,0.07)"
                    : "none",
                  outline: paymentMethod === option.id ? "2.2px solid var(--accent)" : "none",
                  minWidth: 78,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "center",
                  padding: "8px 0",
                  cursor: "pointer",
                }}
                onClick={() => setPaymentMethod(option.id)}
                aria-pressed={paymentMethod === option.id}
              >
                <span style={{ fontSize: 22 }}>{option.icon}</span>
                <span style={{ fontWeight: 600 }}>{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Terms of Conduct Checkbox */}
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
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
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
            {CONDUCT_TERMS.map((line, idx) => (
              <li key={idx} style={{ marginBottom: 3 }}>
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Confirm Button */}
        <div style={{ textAlign: "center", marginTop: 11 }}>
          <button
            className="btn btn-large"
            style={{
              borderRadius: 19,
              fontWeight: 700,
              fontSize: 16,
              minWidth: 140,
              background: paymentMethod && agreedToTerms && !submitPending ? "var(--primary)" : "#bbb",
              color: "#fff",
              cursor: paymentMethod && agreedToTerms && !submitPending ? "pointer" : "not-allowed",
              opacity: paymentMethod && agreedToTerms ? 1 : 0.75,
              marginBottom: 2,
              transition: "background .18s",
            }}
            disabled={!paymentMethod || !agreedToTerms || submitPending}
            onClick={handleConfirmBooking}
            type="button"
          >
            {submitPending ? "Booking..." : "Confirm Ride"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmBookingScreen;
