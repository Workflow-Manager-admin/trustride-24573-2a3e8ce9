import React, { useState } from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Login: TrustRide institutional login screen.
 * Features:
 * - TrustRide (RideCircle) logo & tagline
 * - Input for institution/company email
 * - Domain verification (mock)
 * - Option for biometric login (placeholder)
 * - Modern blue/white/green theme, card layout, light mode
 */
const ALLOWED_DOMAINS = [
  "university.edu",
  "college.edu",
  "company.com",
  "trustrideschool.org",
  "trustridesafe.net"
];

function getDomain(email) {
  const match = email.match(/.+@(.+)$/);
  return match ? match[1].toLowerCase() : "";
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Optionally show "biometric login" if device supports WebAuthn (mock only)
  const [biometricAvailable] = useState(true);

  // PUBLIC_INTERFACE
  function handleLoginSubmit(e) {
    e.preventDefault();
    setError("");
    const domain = getDomain(email);
    if (!email || !/^[^@]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Please enter a valid institutional email.");
      return;
    }
    if (!ALLOWED_DOMAINS.includes(domain)) {
      setError(
        "This app is for verified institutions only. Email domain not recognized."
      );
      return;
    }
    setLoggingIn(true);
    // Simulate login delay, then call parent
    setTimeout(() => {
      setLoggingIn(false);
      onLogin?.({ email, domain, verified: true });
    }, 700);
  }

  return (
    <div className="hero" style={{ paddingTop: 90, minHeight: "80vh" }}>
      <div className="card" style={{ maxWidth: 400, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          marginBottom: 12
        }}>
          <span className="logo" aria-label="TrustRide Logo" style={{ fontSize: 28 }}>
            <span className="logo-symbol" role="img" aria-label="car" style={{ fontSize: 32 }}>🚗</span>
            TrustRide
          </span>
          <div className="subtitle" style={{ fontSize: 18 }}>
            <span style={{ color: "var(--color-accent)" }}>
              A safer, verified way to ride together
            </span>
          </div>
        </div>
        <form onSubmit={handleLoginSubmit} style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <label htmlFor="email" className="description" style={{ fontWeight: 600, marginBottom: 2 }}>
            Institutional Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="your.email@university.edu"
            style={{
              padding: "11px 12px",
              fontSize: "1.07rem",
              border: "1.5px solid var(--color-border)",
              borderRadius: 6,
              marginBottom: 2
            }}
            value={email}
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            disabled={loggingIn}
            required
          />
          {error && (
            <div style={{ color: "#e22b38", fontSize: "0.97em", fontWeight: 500, marginBottom: 6 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-large"
            style={{ marginTop: 4, minHeight: 44 }}
            disabled={loggingIn}
          >
            {loggingIn ? "Logging in..." : "Login"}
          </button>
          {biometricAvailable && (
            <button
              type="button"
              className="btn"
              style={{
                background: "#f4fbf9",
                color: "var(--color-accent)",
                border: "1.5px solid var(--color-accent)",
                marginTop: 4
              }}
              aria-label="Login with biometrics"
              tabIndex={0}
              // onClick={() => alert("Biometric login not implemented in mock.")}
              disabled
            >
              {/* Placeholder: use a fingerprint emoji or SVG */}
              <span role="img" aria-label="fingerprint" style={{ marginRight: 7 }}>🔒</span>
              Login with Biometrics
              <span style={{ fontSize: 11, marginLeft: 8, color: "#90bda1" }}>(Coming Soon)</span>
            </button>
          )}
        </form>
        <div className="description" style={{
          marginTop: 25,
          fontSize: "0.99em",
          textAlign: "center",
          color: "var(--color-muted)"
        }}>
          Only available to verified institutions:<br />
          <span style={{ fontSize: "0.92em" }}>
            {ALLOWED_DOMAINS.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}
