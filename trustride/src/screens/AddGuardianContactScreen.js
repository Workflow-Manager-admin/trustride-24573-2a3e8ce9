import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * AddGuardianContactScreen – Prompts rider to add an optional guardian contact before booking confirmation.
 * User can add a phone/email or tap "Not Required" to skip. Proceeds to ConfirmBookingScreen.
 */
function AddGuardianContactScreen() {
  const [guardian, setGuardian] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Get previous booking data (ride, mode, etc.) from navigation state if present:
  const prevState = location.state || {};

  // Validates minimal phone or email for guardian
  function isValidGuardian(val) {
    if (!val) return false;
    // Simple: phone (10-15 digits, may allow '+'), or email (rudimentary regex)
    const phoneOk = /^\+?\d{10,15}$/.test(val.trim());
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val.trim());
    return phoneOk || emailOk;
  }

  // User adds a guardian contact, proceeds to confirmation
  function handleContinue(e) {
    e.preventDefault();
    setError("");
    if (!isValidGuardian(guardian)) {
      setError("Provide a valid phone number or email for your guardian contact.");
      return;
    }
    // In prod: Save guardian contact in account/profile, session, or ride context.
    // For now: Pass along to next confirm screen in navigation state.
    // Always preserve selectedRide, pickup, destination, and mode
    // Guardian can be null or the valid contact
    navigate("/confirm-booking", {
      state: {
        ...prevState,
        guardianContact: guardian || null,
        // Optionally group main "booking" info for clarity
        booking: {
          pickup: prevState.pickup,
          destination: prevState.destination,
        },
        ride: prevState.selectedRide,
        mode: prevState.mode,
        modeIcon: prevState.modeIcon,
      },
    });
  }

  // User opts to skip guardian contact
  function handleSkip() {
    navigate("/confirm-booking", {
      state: {
        ...prevState,
        guardianContact: null,
        booking: {
          pickup: prevState.pickup,
          destination: prevState.destination,
        },
        ride: prevState.selectedRide,
        mode: prevState.mode,
        modeIcon: prevState.modeIcon,
      },
    });
  }

  return (
    <div className="container" style={{ paddingTop: 86, paddingBottom: 70 }}>
      <section
        className="rounded-card"
        style={{
          marginTop: 32,
          maxWidth: 440,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span role="img" aria-label="Guardian" style={{ fontSize: 27 }}>
            👤
          </span>
          <span className="heading-2" style={{ fontSize: 20 }}>
            Add Guardian Contact
          </span>
        </div>
        <p className="description" style={{ fontSize: 15.5, marginBottom: 18 }}>
          For your safety, optionally add a trusted guardian/friend to be notified about this ride. You may skip this step if not needed.
        </p>
        <form
          style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 10 }}
          onSubmit={handleContinue}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="Guardian phone or email"
            value={guardian}
            onChange={e => setGuardian(e.target.value)}
            style={{
              padding: "11px 13px",
              border: "1px solid var(--border-color)",
              borderRadius: 9,
              fontSize: 15.5,
              background: "var(--background)",
              marginBottom: 5,
            }}
            autoFocus
          />
          <button
            type="submit"
            className="btn btn-large"
            style={{
              borderRadius: 20,
              fontSize: 16,
              fontWeight: 700,
              minWidth: 120,
              background: guardian.trim() && isValidGuardian(guardian) ? undefined : "#bbb",
              cursor: guardian.trim() && isValidGuardian(guardian) ? "pointer" : "not-allowed",
              opacity: guardian.trim() ? 1 : 0.6,
              marginBottom: 5,
            }}
            disabled={!guardian.trim() || !isValidGuardian(guardian)}
          >
            Save & Continue
          </button>
          {error && (
            <div style={{ color: "#c00", fontWeight: 600, fontSize: 14 }}>
              {error}
            </div>
          )}
        </form>
        <div style={{ textAlign: "center", marginTop: 26 }}>
          <button
            className="btn"
            style={{
              background: "var(--accent)",
              color: "#fff",
              borderRadius: 20,
              fontWeight: 600,
              fontSize: 15,
              padding: "8px 30px",
              minWidth: 100,
              marginBottom: 2,
            }}
            type="button"
            onClick={handleSkip}
          >
            Not Required
          </button>
          <div style={{ color: "var(--text-secondary)", fontSize: 13.2, marginTop: 2 }}>
            You can always add guardians from your profile later.
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddGuardianContactScreen;
