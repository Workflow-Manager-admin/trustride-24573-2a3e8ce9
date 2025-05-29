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
  if (success) {
    return (
      <div
        style={{
          paddingTop: 44,
          paddingBottom: 35,
          maxWidth: 435,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        aria-live="polite"
      >
        <section
          className="card"
          style={{
            background: "#fff",
            borderRadius: "var(--radius-main)",
            boxShadow: "0 2px 18px rgba(0,119,182,0.09)",
            border: "1.6px solid var(--color-border)",
            padding: "38px 28px",
            marginBottom: 22,
            marginTop: 12,
            width: "100%",
            maxWidth: 420,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span
            className="logo-symbol"
            aria-label="TrustRide"
            style={{
              fontSize: 40,
              color: "var(--color-accent)",
              marginBottom: 8,
              marginTop: -5,
              display: "inline-block",
              transform: "rotate(-14deg)",
              letterSpacing: -1,
            }}
          >🚗</span>
          <div
            className="subtitle"
            style={{
              fontWeight: 800,
              color: "var(--color-accent)",
              fontSize: 20,
              letterSpacing: -0.5,
              marginBottom: 2,
            }}
          >
            Booking Confirmed
          </div>
          <h2
            className="title"
            style={{
              fontSize: "2.1rem",
              fontWeight: 800,
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: "0 0 5px 0",
              lineHeight: 1.2,
            }}
          >
            Your TrustRide is Ready!
          </h2>
          <div
            className="description"
            style={{
              fontSize: 16.5,
              color: "var(--color-text-secondary)",
              maxWidth: 310,
              margin: "0 auto 5px",
              fontWeight: 500,
            }}
          >
            Thank you! Your ride is confirmed and your seat is reserved.
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 15,
              alignItems: "center",
              background: "#f8fafb",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              boxShadow: "0 1.4px 12px rgba(0,168,150,0.03)",
              padding: "19px 6px",
              marginTop: 8,
              marginBottom: 6,
            }}
          >
            {/* Prominent summary of ride details */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: 2,
              }}
            >
              {ride.driver} (Verified Driver)
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 22,
                marginBottom: 3,
              }}
            >
              <StatBox
                icon="⏰"
                label="Departure"
                value={
                  <span>
                    {formatDate(ride.departure)}
                    {" "}
                    {formatTime(ride.departure)}
                  </span>
                }
                color="var(--color-primary)"
              />
              <StatBox
                icon="💸"
                label="Fare"
                value={
                  <span>
                    <span style={{ fontWeight: 800, color: "#00A896", fontSize: 17 }}>
                      ₹{typeof ride.price === "number" ? ride.price.toLocaleString("en-IN") : ride.price}
                    </span>
                    <span
                      style={{
                        color: "#7ec9c9",
                        fontWeight: 500,
                        fontSize: 13.2,
                        marginLeft: 2,
                      }}
                    >
                      /seat
                    </span>
                  </span>
                }
                color="#00A896"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 14,
                marginBottom: 0,
              }}
            >
              <Badge
                label="Trust Index"
                value={ride.trustIndex}
                icon="🛡️"
                color="var(--color-accent)"
              />
              <Badge
                label="Eco Score"
                value={ride.ecoScore}
                icon="🍃"
                color="var(--color-primary)"
              />
            </div>
          </div>
          <div
            className="description"
            style={{
              color: "var(--color-accent)",
              fontWeight: 740,
              fontSize: 17,
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            🎉 You're all set!
          </div>
          <div
            className="description"
            style={{
              marginTop: 13,
              marginBottom: 0,
              fontSize: 14.5,
              color: "var(--color-text-secondary)",
            }}
          >
            <div style={{ marginBottom: 2 }}>
              <strong>Instructions:</strong>
            </div>
            <ul
              style={{
                listStyle: "disc inside",
                margin: 0,
                padding: 0,
                textAlign: "left",
                color: "var(--color-text-secondary)",
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.4,
                maxWidth: 320,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <li>
                Arrive <b>on time</b> at the pickup point.
              </li>
              <li>
                Contact your driver <b>{ride.driver}</b> if needed.
              </li>
              <li>
                <span style={{ color: "#00A896" }}>
                  For support or changes, contact TrustRide support.
                </span>
              </li>
            </ul>
          </div>
        </section>
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
          padding: "22px 18px 20px 18px",
          background: "#fafdfc",
          border: "1.4px solid var(--color-border)",
          boxShadow: "0 3px 16px rgba(0, 168, 150, 0.045)",
        }}
        aria-label="Ride Conduct Agreement"
      >
        <div style={{
          fontWeight: 740,
          fontSize: 17.2,
          color: "var(--color-accent)",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          letterSpacing: "-0.02em"
        }}>
          <span role="img" aria-label="rules">📃</span>
          Passenger Conduct Agreement
        </div>
        <div className="description"
          style={{
            fontSize: 15.6,
            color: "var(--color-text-secondary)",
            fontWeight: 500,
            marginBottom: 11,
            lineHeight: 1.5
          }}
        >
          To confirm a ride, you must agree to abide by the following community rules:
        </div>
        <ol style={{ margin: 0, paddingLeft: 22, color: "var(--color-text-secondary)", fontSize: 15.1, fontWeight: 500 }}>
          {DEFAULT_RULES.map((rule, idx) => (
            <li key={idx} style={{ marginBottom: 3 }}>{rule}</li>
          ))}
        </ol>
        <div style={{ marginTop: 19, display: "flex", alignItems: "center", gap: 8 }}>
          <input
            id="accept-rules-checkbox"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed((a) => !a)}
            style={{
              width: 21,
              height: 21,
              accentColor: "var(--color-accent)"
            }}
          />
          <label
            htmlFor="accept-rules-checkbox"
            style={{
              fontWeight: 650,
              fontSize: 15.5,
              color: "var(--color-accent)",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            I have read and <u>agree to follow</u> these rules
          </label>
        </div>
        {!agreed && (
          <div
            style={{
              color: "#e22b38",
              fontWeight: 600,
              fontSize: 13.2,
              marginTop: 6,
              background: "#fff7f8",
              padding: "4px 12px",
              borderRadius: 8,
              maxWidth: 355
            }}
            aria-live="polite"
          >
            You must accept the rules to proceed with the booking.
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
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {paymentMethods.map((m, idx) => (
                <label
                  key={m}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    gap: 9,
                    fontSize: 15
                  }}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={m}
                    checked={selectedPayment === m}
                    onChange={(e) => {
                      setSelectedPayment(e.target.value);
                      setTouchedPayment(true);
                    }}
                    style={{
                      accentColor: "var(--color-accent)",
                      width: 18, height: 18,
                      marginRight: 8
                    }}
                    required
                  />
                  {m}
                </label>
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
    </div>
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
