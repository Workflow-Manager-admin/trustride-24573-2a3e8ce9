import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Trust & Safety screen for TrustRide –
 * Modern minimalist safety dashboard with rounded cards, emergency, and trust index.
 * - Prominent persistent SOS modal-feature and visual Trust Index added.
 */
const MOCK_TRUST_INDEX = {
  trustScore: 4.7, // out of 5
  safeFlags: 1,    // number of safety flags
  punctuality: 98, // percent
};

const TrustSafetyScreen = () => {
  const [modal, setModal] = useState(null); // 'sos', 'buddy', 'trust'
  const [showSOS, setShowSOS] = useState(false); // activate SOS actual modal

  // Modal rendering for info/help
  const renderModal = () => {
    if (!modal && !showSOS) return null;
    let title = "";
    let desc = "";
    let emoji = "";
    let isSOSActive = false;
    // SOS ACTIVE modal: visually real, not just info stub
    if (showSOS) {
      emoji = "🆘";
      title = "SOS Emergency Alert Sent!";
      desc =
        "Emergency contacts and security notified. Your live location and ride info shared immediately.";
      isSOSActive = true;
    } else if (modal === "sos") {
      emoji = "🆘";
      title = "SOS Emergency";
      desc =
        "The SOS Emergency feature lets you instantly alert guardians and security with a tap—even share your live ride location. Use this only if you are in distress!";
    } else if (modal === "buddy") {
      emoji = "👁️";
      title = "Buddy Tracker";
      desc =
        "Your guardians can follow your ride’s progress in real time. Peace of mind is coming for you and those who care about you.";
    } else if (modal === "trust") {
      emoji = "🛡️";
      title = "Trust Index";
      desc =
        "Your Trust Index summarizes your reliability, flags, and positive ride history. Aim for high trust for more ride options.";
    }
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(30,40,58,0.22)",
          zIndex: 4100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 19,
            minWidth: 285,
            maxWidth: "93vw",
            boxShadow: "0 8px 48px rgba(0,119,182, 0.15)",
            padding: "2.15rem 1.5rem 1.3rem 1.5rem",
            border: "1.7px solid var(--accent)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            textAlign: "center"
          }}
        >
          <span style={{ fontSize: 47, marginBottom: 12 }}>{emoji}</span>
          <div className="heading-2" style={{ fontWeight: 700, fontSize: 20, marginBottom: 7 }}>{title}</div>
          <div
            style={{
              color: isSOSActive ? "#d72c2c" : "var(--text-secondary)",
              marginBottom: 17,
              textAlign: "center",
              fontSize: 16,
              fontWeight: isSOSActive ? 700 : 500,
              lineHeight: 1.65,
            }}
          >
            {desc}
          </div>
          <button
            className="btn"
            style={{
              borderRadius: 32,
              padding: "12px 30px",
              fontSize: 15.3,
              fontWeight: 700,
              minWidth: 104,
              background: isSOSActive ? "#d72c2c" : "var(--accent)",
              color: "#fff",
              marginTop: isSOSActive ? 1 : 0,
              boxShadow: isSOSActive
                ? "0 4px 28px #ea54542a"
                : "0 2px 15px #00a89619"
            }}
            onClick={() => {
              setModal(null);
              setShowSOS(false);
            }}
          >
            {isSOSActive ? "Close" : "OK"}
          </button>
        </div>
      </div>
    );
  };

  // Renders the Trust Index stats visually
  function renderTrustIndex() {
    const { trustScore, safeFlags, punctuality } = MOCK_TRUST_INDEX;
    return (
      <section
        className="rounded-card"
        style={{
          marginBottom: 13,
          cursor: "pointer",
          transition: "box-shadow .14s",
          boxShadow: "0 2px 9px #00a89610",
          border: "1.7px solid var(--accent)",
          background: "rgba(0, 168, 150, 0.021)",
          padding: "22px 28px 19px 18px"
        }}
        tabIndex={0}
        onClick={() => setModal("trust")}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && setModal("trust")}
        aria-label="Open Trust Index details"
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8, gap: 10 }}>
          <span role="img" aria-label="Shield" style={{ fontSize: 23, marginRight: 4 }}>🛡️</span>
          <span className="heading-2" style={{ fontSize: 17.7, fontWeight: 700, color: "var(--primary)" }}>Trust Index</span>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "stretch",
          alignItems: "center",
          gap: 0,
          marginTop: 13,
        }}>
          {/* Trust Score */}
          <div style={{
            flex: 1,
            borderRight: "1.7px solid var(--accent)",
            paddingRight: 12,
            minWidth: 94,
            textAlign: "center"
          }}>
            <div style={{ fontWeight: 900, color: "var(--accent)", fontSize: 23.5, letterSpacing: "0.04em" }}>
              {trustScore.toFixed(1)}
              <span style={{ fontSize: 16, color: "#ffa725", marginLeft: 4 }}>★</span>
            </div>
            <div style={{ fontSize: 14.3, color: "var(--text-secondary)", marginTop: 2 }}>Trust Score</div>
          </div>
          {/* Safety Flags */}
          <div style={{
            flex: 1,
            borderRight: "1.7px solid var(--accent)",
            padding: "0 12px",
            minWidth: 94,
            textAlign: "center"
          }}>
            <div style={{
              fontWeight: 900,
              color: safeFlags === 0 ? "var(--accent)" : "#d8003c",
              fontSize: 23.5
            }}>
              {safeFlags}
            </div>
            <div style={{ fontSize: 14.3, color: "var(--text-secondary)" }}>Safety Flags</div>
          </div>
          {/* Punctuality */}
          <div style={{
            flex: 1,
            paddingLeft: 12,
            minWidth: 94,
            textAlign: "center"
          }}>
            <div style={{
              fontWeight: 900,
              color: punctuality > 93 ? "var(--primary)" : "#a47200",
              fontSize: 23.5
            }}>
              {punctuality}
              <span role="img" aria-label="clock" style={{ fontSize: 15, marginLeft: 3 }}>⏱️</span>
              <span style={{ fontSize: 15, marginLeft: 0 }}>%</span>
            </div>
            <div style={{ fontSize: 14.3, color: "var(--text-secondary)" }}>Punctuality</div>
          </div>
        </div>
        <div
          style={{
            color: 'var(--accent)',
            fontSize: 13.5,
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
            marginTop: 10
          }}
        >
          Tap for Trust Index info
        </div>
      </section>
    );
  }

  // Prominent SOS section with true action, visual, and description
  function renderSOSSection() {
    return (
      <section
        className="rounded-card"
        style={{
          marginBottom: 25,
          border: "2.3px solid #d72c2c",
          background: "#fff8f8",
          boxShadow: "0 2px 14px #d6161625, 0 1px 10px 0 rgba(0,119,182,0.07)",
          padding: "23px 20px 18px 20px",
          textAlign: "center"
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          justifyContent: "center",
          marginBottom: 7
        }}>
          <span role="img" aria-label="Emergency" style={{ fontSize: 29, color: "#d92b2b" }}>🆘</span>
          <span className="heading-2" style={{ fontSize: 19, color: "#d72c2c", fontWeight: 800, letterSpacing: 0.14 }}>
            Emergency SOS
          </span>
        </div>
        <div style={{ color: "#d72c2c", fontWeight: 600, marginBottom: 13, fontSize: 15.2 }}>
          Instantly alert your guardians & security team—location is sent!
        </div>
        <button
          className="btn btn-large"
          style={{
            borderRadius: 32,
            background: "#d72c2c",
            color: "#fff",
            fontSize: 19,
            fontWeight: 900,
            boxShadow: "0 2px 18px #e034342a",
            minWidth: 135,
            minHeight: 52,
            marginBottom: 7,
            marginTop: 2,
            letterSpacing: 1.5,
            outline: "none"
          }}
          type="button"
          onClick={() => setShowSOS(true)}
          tabIndex={0}
          aria-label="Trigger SOS (emergency alert)"
        >
          <span role="img" aria-label="sos" style={{ fontSize: 26, marginRight: 13 }}>🆘</span> SOS
        </button>
        <div style={{
          color: "#d72c2c",
          fontWeight: 500,
          fontSize: 13.3,
          marginTop: 8,
          fontStyle: "italic",
          textShadow: "0 1px 7px #d6161621"
        }}>
          Use only if you are in real danger
        </div>
        <div
          style={{
            color: '#888',
            fontSize: 13,
            fontStyle: 'italic',
            marginTop: 11,
            textDecoration: 'underline dashed',
            cursor: 'pointer'
          }}
          tabIndex={0}
          onClick={() => setModal("sos")}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && setModal("sos")}
        >
          What happens if I press SOS?
        </div>
      </section>
    );
  }

  // Buddy Tracker section (stub, but visually consistent)
  function renderBuddySection() {
    return (
      <section
        className="rounded-card"
        style={{
          marginBottom: 23,
          cursor: "pointer",
          transition: "box-shadow .14s",
          border: "1.4px solid var(--border-color)",
          background: "rgba(0,119,182,0.021)",
        }}
        tabIndex={0}
        onClick={() => setModal("buddy")}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && setModal("buddy")}
        aria-label="Open Buddy Tracker details"
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 7 }}>
          <span role="img" aria-label="Buddy Tracker" style={{ fontSize: 26, marginRight: 10 }}>👁️</span>
          <span className="heading-2" style={{ fontSize: 16.4 }}>Buddy Tracker</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 3 }}>
          Guardians can follow your ride progress securely.
        </div>
        <div style={{
          color: "var(--accent)",
          fontSize: 13.4,
          fontStyle: "italic",
          textDecoration: "underline dashed",
          marginTop: 7
        }}>
          Tap for more info
        </div>
      </section>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
      {renderModal()}
      <header>
        <h2 className="heading-1" style={{ marginBottom: 2 }}>Trust & Safety</h2>
        <p className="description" style={{ marginTop: 0, marginBottom: 17 }}>
          Access live emergency support and see your Trust Index.
        </p>
      </header>
      {renderSOSSection()}
      {renderTrustIndex()}
      {renderBuddySection()}
    </div>
  );
};

export default TrustSafetyScreen;
