import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ConfirmRideBooking: Displays all passed ride details for user confirmation,
 * presents a clear, visible section with ride conduct rules,
 * and requires the user to check an agreement box before enabling the confirm button.
 * All UI is minimalist and styled with TrustRide's brand guidelines.
 * Prepares state management for conduct acceptance and confirmation.
 *
 * @param {Object} props
 * @param {Object} props.ride - The selected ride details object (driver, fare, schedule, etc.)
 * @param {function} props.onConfirm - Called after user confirms the booking.
 * @param {function} props.onBack - Called when user cancels or wishes to go back.
 */
const DEFAULT_RULES = [
  "Respect your driver and fellow passengers at all times.",
  "No eating, smoking, or drinking alcohol during the ride.",
  "Maintain appropriate noise levels - headphones for music/calls.",
  "Be punctual at the pickup point.",
  "TrustRide is a verified community. Report issues to support promptly.",
];
/**
 * Payment method icon SVGs (minimalist to match theme, self-contained)
 */
const PAYMENT_METHOD_ICONS = {
  UPI: (
    <svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {/* UPI styled triangle (motif) */}
      <polygon points="16,40 42,8 26,8 8,40" fill="#00A896" />
      <rect x="16" y="36" width="19" height="4" rx="2" fill="#0077B6" />
    </svg>
  ),
  Cash: (
    <svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="8" y="14" width="32" height="20" rx="6" fill="#F4FBF9" stroke="#00A896" strokeWidth="2"/>
      <circle cx="24" cy="24" r="6" fill="#00A896" opacity="0.7"/>
      <text x="24" y="27" textAnchor="middle" fontSize="10" fill="#0077B6" fontWeight="700">₹</text>
    </svg>
  ),
  Card: (
    <svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="8" y="14" width="32" height="20" rx="6" fill="#ecfcf7" stroke="#0077B6" strokeWidth="2"/>
      <rect x="13" y="28" width="10" height="3" rx="1.5" fill="#00A896" />
      <rect x="30" y="28" width="7" height="3" rx="1.5" fill="#00A896" opacity="0.55"/>
      <rect x="8" y="20" width="32" height="4" fill="#00A896" opacity="0.13"/>
    </svg>
  )
};
// Example payment methods — in real app these would come from backend/ride object
const DEFAULT_PAYMENT_METHODS = ["UPI", "Cash", "Card"];

function formatTime(time) {
  const d = new Date(time);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(time) {
  const d = new Date(time);
  return d.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
}

// PUBLIC_INTERFACE
export default function ConfirmRideBooking({ ride, onConfirm, onBack }) {
  // Local state: Checkbox for rules, feedback on confirm interaction
  const [agreed, setAgreed] = useState(false);
  // New: Explicit review/confirmation for ETA and Fare (14.7hr/AMPM awareness)
  const [etaFareReviewed, setEtaFareReviewed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Payment method selection state
  // Use ride.paymentMethods if available, else default to all
  const paymentMethods = (ride && Array.isArray(ride.paymentMethods) && ride.paymentMethods.length > 0)
    ? ride.paymentMethods
    : DEFAULT_PAYMENT_METHODS;
  const multiplePayments = paymentMethods.length > 1;
  const [selectedPayment, setSelectedPayment] = useState(
    multiplePayments ? "" : paymentMethods[0] // required if multiple, else defaulted/disabled
  );
  const [touchedPayment, setTouchedPayment] = useState(false);

  // Format time in 12-hour AM/PM for ETA block, fallback to string
  function formatTime12AMPM(time) {
    if (!time) return "N/A";
    const d = new Date(time);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  if (!ride) {
    // Defensive: No ride selected
    return (
      <div style={{ paddingTop: 50, textAlign: "center" }}>
        <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: 22, marginBottom: 18 }}>
          No ride selected
        </div>
        <button
          className="btn"
          style={{
            background: "#f4fbf9",
            color: "var(--color-accent)",
            border: "1.3px solid var(--color-accent)",
            fontWeight: 650,
            borderRadius: 11,
            minWidth: 100
          }}
          type="button"
          tabIndex={0}
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function handleConfirm() {
    setTouchedPayment(true);
    // If multi and not picked, do not proceed
    if (multiplePayments && !selectedPayment) return;
    setSubmitting(true);
    // Simulate a booking request (in a real app, async API here)
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      // onConfirm is called with paymentMethod info (can be expanded as API evolves)
      onConfirm && onConfirm({ paymentMethod: selectedPayment || paymentMethods[0] });
    }, 1100);
  }

  // Show full confirmation replacement after booking success
  // NEW: Instead of static confirmation, immediately show RideStatus page after a short success flash
  const [redirectToRideStatus, setRedirectToRideStatus] = useState(false);
  React.useEffect(() => {
    if (success) {
      // Show success for a short moment, then "redirect" to RideStatus
      const t = setTimeout(() => setRedirectToRideStatus(true), 1000);
      return () => clearTimeout(t);
    }
  }, [success]);

  if (redirectToRideStatus && ride) {
    // Dynamically import RideStatus to avoid circular imports
    const RideStatus = require('./RideStatus').default;
    return <RideStatus ride={ride} />;
  }

  if (success) {
    // Quick visible confirmation, then proceed to RideStatus automatically.
    return (
      <div
        style={{
          paddingTop: 77,
          paddingBottom: 60,
          maxWidth: 420,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        aria-live="polite"
      >
        <span
          className="logo-symbol"
          aria-label="TrustRide"
          style={{
            fontSize: 54,
            color: "var(--color-accent)",
            marginBottom: 19,
            marginTop: -11,
            display: "inline-block",
            transform: "rotate(-16deg)",
            letterSpacing: -1.5,
            userSelect: "none",
          }}
        >
          🚗
        </span>
        <div
          className="subtitle"
          style={{
            fontWeight: 870,
            color: "var(--color-accent)",
            fontSize: 23,
            letterSpacing: "-1px",
            marginBottom: 6,
            marginTop: 6,
            userSelect: "none",
          }}
        >
          Booking Confirmed!
        </div>
        <div
          className="description"
          style={{
            background: "linear-gradient(90deg, #f4fbf9 60%, #eaf9ff 100%)",
            fontWeight: 800,
            color: "#00A896",
            fontSize: 18.5,
            margin: "9px 0 10px 0",
            padding: "15px 11px",
            borderRadius: 13,
            border: "1.4px solid var(--color-border)",
            boxShadow: "0 2.5px 12px 0 rgba(0,168,150,0.05)",
            textAlign: "center",
            lineHeight: 1.45,
            letterSpacing: "-0.5px",
          }}
        >
          Your ride is scheduled — loading live status...
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: 18,
            color: "#75b48a",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Redirecting you to live ride status...
        </div>
      </div>
    );
  }

  // Modern TrustRide card layout (default: pre-confirm UI)
  return (
    <div style={{ paddingTop: 44, paddingBottom: 35, maxWidth: 435, margin: "0 auto" }}>
      <header style={{ marginBottom: 23, textAlign: "center" }}>
        <div className="subtitle" style={{ color: "var(--color-accent)", fontWeight: 700, marginBottom: 3 }}>
          Booking Confirmation
        </div>
        <h1 className="title" style={{ fontSize: "2rem", margin: 0 }}>
          Confirm Your Ride
        </h1>
        <div className="description" style={{ color: "var(--color-muted)", marginTop: 3, fontSize: 15.5 }}>
          Please review ETA, fare, ride details, and agree to conduct rules before booking.
        </div>
      </header>

      {/* ---------- ETA & Fare Review Card (MANDATORY REVIEW STEP) ---------- */}
      <section
        className="card"
        aria-label="Review ETA & Fare"
        style={{
          borderRadius: "var(--radius-main)",
          border: "2.5px solid var(--color-accent)",
          boxShadow: "0 6px 24px rgba(0,168,150,0.10)",
          marginBottom: 19,
          background: "#f4fbf9",
          padding: "22px 17px 17px 19px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          animation: !etaFareReviewed ? "pulse-accent 1.5s infinite alternate" : "none"
        }}
      >
        <style>
          {`
            @keyframes pulse-accent {
              0% { box-shadow: 0 0 0 rgba(0,168,150,0.05);}
              100% { box-shadow: 0 0 18px 2px rgba(0,168,150,0.11);}
            }
          `}
        </style>
        <div style={{
          fontWeight: 800,
          fontSize: 17.3,
          color: "var(--color-accent)",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 7,
          letterSpacing: "-0.03em",
          paddingBottom: 2
        }}>
          <span role="img" aria-label="review">🔎</span>
          <span>
            Please <b>review and confirm</b> your <span style={{ color: "var(--color-primary)" }}>Estimated Time of Arrival (12-hour clock, AM/PM)</span> and <span style={{ color: "#00A896" }}>fare</span>
          </span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 2
        }}>
          {/* ETA */}
          <StatBox
            icon="🕓"
            label="ETA (12-hour AM/PM)"
            value={
              ride.eta
                ? formatTime12AMPM(ride.eta)
                : (typeof ride.eta === 'string' ? ride.eta : "N/A")
            }
            color="var(--color-accent)"
          />
          {/* Fare */}
          <StatBox
            icon="💸"
            label="Fare"
            value={
              <span>
                <span style={{
                  fontWeight: 800,
                  color: "#00A896",
                  fontSize: 18
                }}>
                  ₹{typeof ride.price === "number" ? ride.price.toLocaleString("en-IN") : ride.price}
                </span>
                <span style={{
                  color: "#7ec9c9",
                  fontWeight: 500,
                  fontSize: 13.2,
                  marginLeft: 2
                }}>/seat</span>
              </span>
            }
            color="#00A896"
          />
        </div>
        <div style={{
          marginTop: 13,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          <input
            id="review-eta-fare-checkbox"
            type="checkbox"
            checked={etaFareReviewed}
            onChange={() => setEtaFareReviewed((prev) => !prev)}
            style={{
              width: 20,
              height: 20,
              accentColor: "var(--color-accent)",
              outline: "1.8px solid var(--color-accent)"
            }}
          />
          <label
            htmlFor="review-eta-fare-checkbox"
            style={{
              fontWeight: 740,
              fontSize: 15.8,
              color: etaFareReviewed ? "var(--color-accent)" : "#8da2a8",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            I have <span style={{textDecoration: "underline dotted"}}>reviewed and acknowledge</span> the ETA and Fare information above.
          </label>
        </div>
        {!etaFareReviewed && (
          <div
            style={{
              color: "#e22b38",
              fontWeight: 600,
              fontSize: 13.3,
              marginTop: 2,
              marginLeft: 2,
              background: "#fff7f8",
              padding: "4px 11px",
              borderRadius: 7,
              maxWidth: 370
            }}
            aria-live="polite"
          >
            Please review and confirm ETA & Fare (above) to continue: this step is required before booking.
          </div>
        )}
      </section>

      {/* Ride Details Summary (unmodified for secondary context) */}
      <section
        className="card"
        style={{
          marginBottom: 22,
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(0,119,182,0.06)",
          border: "1.5px solid var(--color-border)",
          padding: "25px 18px 19px 21px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <span
            style={{
              background: "#eaf9ff",
              borderRadius: "50%",
              color: "var(--color-primary)",
              fontWeight: 700,
              fontSize: 22,
              width: 38,
              height: 38,
              minWidth: 38,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.38px solid var(--color-border)",
              marginRight: 10,
            }}
            aria-label="driver"
          >
            {ride.driver.split(" ").map((n) => n[0]).join("").toUpperCase()}
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17.5, color: "var(--color-primary)" }}>
              Driver: {ride.driver}
            </div>
            <div style={{ color: "var(--color-accent)", fontWeight: 600, fontSize: 13, marginTop: 1 }}>
              Verified & Rated
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 19, flexWrap: "wrap", marginBottom: 7 }}>
          <StatBox
            icon="⏰"
            label="Departure"
            value={
              <span>
                {formatDate(ride.departure)}
                <span style={{ margin: "0 2px" }} />
                {formatTime(ride.departure)}
              </span>
            }
            color="var(--color-primary)"
          />
          <StatBox
            icon="🕓"
            label="ETA"
            value={
              typeof ride.eta === 'string'
                ? ride.eta
                : (ride.eta instanceof Date
                    ? formatTime(ride.eta)
                    : (ride.eta ? String(ride.eta) : 'N/A')
                  )
            }
            color="var(--color-accent)"
          />
          <StatBox
            icon="💸"
            label="Fare"
            value={
              <span>
                <span style={{ fontWeight: 800, color: "#00A896", fontSize: 17 }}>
                  ₹{typeof ride.price === "number" ? ride.price.toLocaleString("en-IN") : ride.price}
                </span>
                <span style={{ color: "#7ec9c9", fontWeight: 500, fontSize: 13.2, marginLeft: 2 }}>/seat</span>
              </span>
            }
            color="#00A896"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Badge label="Trust Index" value={ride.trustIndex} icon="🛡️" color="var(--color-accent)" />
          <Badge label="Eco Score" value={ride.ecoScore} icon="🍃" color="var(--color-primary)" />
        </div>
      </section>
      {/* Conduct Agreement - moved above payment, visually prominent */}
      <section
        className="card"
        style={{
          marginBottom: 23,
          borderRadius: "var(--radius-main)",
          padding: "24px 18px 18px 18px",
          background: "#fafdfe",
          border: "1.55px solid var(--color-border)",
          boxShadow: "0 3px 18px rgba(0, 168, 150, 0.050)",
        }}
        aria-label="Ride Conduct Agreement"
      >
        <div
          style={{
            fontWeight: 750,
            fontSize: 17.7,
            color: "var(--color-accent)",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            letterSpacing: "-0.02em",
          }}
        >
          <span role="img" aria-label="rules" style={{ fontSize: 24, marginRight: 2 }}>📃</span>
          Conduct Agreement
        </div>
        <div className="description"
          style={{
            fontSize: 15.7,
            color: "var(--color-text-secondary)",
            fontWeight: 600,
            marginBottom: 13,
            lineHeight: 1.6
          }}
        >
          Please read and agree to these conduct rules to complete your booking:
        </div>
        <ol style={{
          margin: 0,
          paddingLeft: 24,
          color: "var(--color-text-secondary)",
          fontSize: 15,
          fontWeight: 510,
          marginBottom: 0,
          lineHeight: 1.36
        }}>
          {DEFAULT_RULES.map((rule, idx) => (
            <li key={idx} style={{ marginBottom: 3 }}>{rule}</li>
          ))}
        </ol>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <input
            id="accept-rules-checkbox"
            name="accept-rules-checkbox"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed((a) => !a)}
            style={{
              width: 21,
              height: 21,
              accentColor: "var(--color-accent)",
              outline: agreed ? "2px solid var(--color-accent)" : undefined,
            }}
            aria-required="true"
            aria-checked={agreed}
            tabIndex={0}
          />
          <label
            htmlFor="accept-rules-checkbox"
            style={{
              fontWeight: 680,
              fontSize: 15.65,
              color: agreed ? "var(--color-accent)" : "#8da8ad",
              cursor: "pointer",
              userSelect: "none",
              outline: "none"
            }}
          >
            <span>
              I have read and <u>agree to follow</u> all conduct rules above
              <span style={{ color: "#e22b38", marginLeft: 4, fontWeight: 400 }} aria-hidden={!(!agreed)}>
                {(!agreed) ? "*" : ""}
              </span>
            </span>
          </label>
        </div>
        {!agreed && (
          <div
            style={{
              color: "#d32242",
              fontWeight: 650,
              fontSize: 13.6,
              marginTop: 7,
              background: "#fff7f8",
              padding: "7px 14px",
              borderRadius: 7,
              maxWidth: 370
            }}
            role="alert"
            aria-live="polite"
          >
            Please accept conduct rules to enable booking.
          </div>
        )}
      </section>
      {/* Payment Method Selection UI */}
      <section
        className="card"
        style={{
          marginBottom: 22,
          borderRadius: "var(--radius-main)",
          border: "1.4px solid var(--color-border)",
          background: "#fff",
          boxShadow: "0 1px 10px rgba(0,168,150,0.04)",
          padding: "19px 19px 12px 17px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-start"
        }}
        aria-label="Payment Method Selection"
      >
        <div style={{ fontWeight: 700, fontSize: 16.3, color: "var(--color-primary)", marginBottom: 7, display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="payment" style={{ fontSize: 17 }}>💳</span>
          Select Payment Method
        </div>
        {multiplePayments ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 22,
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 4,
                marginBottom: 3,
                flexWrap: "wrap"
              }}
              role="radiogroup"
              aria-label="Payment method options"
            >
              {paymentMethods.map((m) => (
                <PaymentMethodIconButton
                  key={m}
                  method={m}
                  icon={PAYMENT_METHOD_ICONS[m] || <span>{m[0]}</span>}
                  selected={selectedPayment === m}
                  setSelected={() => {
                    setSelectedPayment(m);
                    setTouchedPayment(true);
                  }}
                  label={m}
                />
              ))}
            </div>
            {touchedPayment && !selectedPayment && (
              <div style={{ color: "#e22b38", fontSize: 13.2, fontWeight: 500, marginTop: 4 }}>
                Please select a payment method to continue.
              </div>
            )}
          </>
        ) : (
          <div style={{ fontWeight: 600, color: "var(--color-muted)", fontSize: 15.1 }}>
            {PAYMENT_METHOD_ICONS[paymentMethods[0]]}
            {paymentMethods[0]} (only available)
          </div>
        )}
      </section>
      {/* Confirm action area */}
      <div style={{ display: "flex", justifyContent: "center", gap: 19 }}>
        <button
          className="btn"
          style={{
            color: "var(--color-primary)",
            background: "#f4fbf9",
            fontWeight: 650,
            border: "1.5px solid var(--color-primary)",
            borderRadius: 10,
            minWidth: 100
          }}
          type="button"
          onClick={onBack}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          className="btn btn-large"
          style={{
            background: etaFareReviewed && agreed && (!multiplePayments || !!selectedPayment)
              ? "linear-gradient(90deg, var(--color-primary), var(--color-accent))"
              : "#e8eeee",
            color: etaFareReviewed && agreed && (!multiplePayments || !!selectedPayment) ? "#fff" : "#aac7c6",
            fontWeight: 700,
            fontSize: "1.09rem",
            borderRadius: 10,
            minWidth: 160,
            boxShadow: etaFareReviewed && agreed && (!multiplePayments || !!selectedPayment)
              ? "0 2px 8px rgba(0,119,182,0.10)"
              : "none",
            outline: "none",
            transition: "background 0.18s cubic-bezier(0.4,0,0.2,1)",
            cursor: etaFareReviewed && agreed && (!multiplePayments || !!selectedPayment) ? "pointer" : "not-allowed"
          }}
          type="button"
          disabled={
            !etaFareReviewed || !agreed ||
            submitting || success ||
            (multiplePayments && !selectedPayment)
          }
          aria-disabled={
            !etaFareReviewed || !agreed ||
            submitting || success ||
            (multiplePayments && !selectedPayment)
          }
          onClick={handleConfirm}
        >
          {submitting ? "Booking..." : success ? "Confirmed!" : "Confirm Booking"}
        </button>
      </div>
      <div className="description" style={{
        marginTop: 23,
        fontSize: 13,
        color: "#9fb3c8",
        textAlign: "center"
      }}>
        Your seat is reserved. For any changes or cancellations, contact TrustRide support.
      </div>
      {/* --- Inline: Payment icon button component for accessible payment row --- */}
      {/* This must go below to be available for render above */}
      <style>
      {`
        .tr-pm-row-btn {
          border: 2.4px solid var(--color-border);
          background: #fafdfe;
          border-radius: 17px;
          padding: 9px 12px;
          margin: 0;
          outline: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: border-color 0.17s, background 0.17s;
          box-shadow: 0 1.5px 9px rgba(0,168,150,0.04);
          position: relative;
          min-width: 44px;
          min-height: 44px;
        }
        .tr-pm-row-btn[aria-checked="true"], .tr-pm-row-btn:focus-visible {
          border: 2.4px solid var(--color-accent);
          z-index: 2;
        }
        .tr-pm-row-btn:hover,
        .tr-pm-row-btn:active {
          border: 2.4px solid var(--color-primary);
          background: #ecfcf7;
        }
        .tr-pm-row-btn .pm-tooltip {
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 104%;
          transform: translateX(-50%);
          opacity: 0;
          background: #053b3eef;
          color: #f4fbf9;
          font-size: 14px;
          font-weight: 700;
          border-radius: 10px;
          padding: 6px 12px;
          white-space: nowrap;
          z-index: 99;
          transition: opacity 0.16s;
          box-shadow: 0 3px 14px #65c3f630;
        }
        .tr-pm-row-btn:focus .pm-tooltip, .tr-pm-row-btn:active .pm-tooltip,
        .tr-pm-row-btn:hover .pm-tooltip, .tr-pm-row-btn.touch-tooltip .pm-tooltip  {
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 580px) {
          .tr-pm-row-btn {
            min-width: 38px;
            min-height: 38px;
            padding: 7px 6px;
          }
        }
      `}
      </style>
    </div>
  );
}

// Payment method icon button – tooltip/overlay on hover, focus, tap. Accessible.
function PaymentMethodIconButton({ method, icon, selected, setSelected, label }) {
  // For accessibility: handle both keyboard focus and mouse/tap/touch for tooltip.
  const [showTooltip, setShowTooltip] = React.useState(false);
  // Touch handler for mobile: show tooltip briefly on tap and select
  const handleTouchStart = (e) => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 800); // show for 800ms
    setSelected();
    // prevent double-activation
    e.preventDefault();
  };
  return (
    <button
      type="button"
      className={`tr-pm-row-btn${showTooltip ? ' touch-tooltip' : ''}`}
      role="radio"
      aria-checked={selected}
      aria-label={label}
      aria-describedby={method + "-desc"}
      tabIndex={0}
      onClick={setSelected}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={handleTouchStart}
      style={{
        borderColor: selected ? "var(--color-accent)" : "var(--color-border)",
        background: selected ? "#e3f3ff" : "#fafdfe"
      }}
    >
      <span aria-hidden="true">
        {icon}
      </span>
      <span
        id={method + "-desc"}
        className="pm-tooltip"
        role="tooltip"
        aria-live="polite"
        style={{ opacity: showTooltip || selected ? 1 : undefined, zIndex: 10 }}
      >
        {label}
      </span>
    </button>
  );
}

// Compact stat box for schedule/fare display
function StatBox({ icon, label, value, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: 80,
        gap: 1,
        marginRight: 7
      }}
    >
      <span style={{ fontSize: 21, fontWeight: 700, color }}>{icon}</span>
      <span style={{
        fontWeight: 600,
        fontSize: 13.3,
        color: "var(--color-text-secondary)"
      }}>
        {label}
      </span>
      <span style={{
        fontWeight: 700,
        fontSize: 16.1,
        color: "var(--color-primary)"
      }}>
        {value}
      </span>
    </div>
  );
}

// Small badge for Trust Index / Eco Score
function Badge({ label, value, icon, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "#f7fafd",
        border: `1.2px solid var(--color-border)`,
        borderRadius: 11,
        padding: "7px 15px 7px 10px",
        minWidth: 70,
        fontSize: 14.2,
        fontWeight: 650,
        color
      }}
    >
      {icon} {label}: <span style={{
        marginLeft: 3,
        fontWeight: 820,
        color,
        fontSize: 15
      }}>{value}</span>
    </div>
  );
}
