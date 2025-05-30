import React from "react";

/**
 * PUBLIC_INTERFACE
 * TrustSafety Dashboard: TrustRide's safety hub.
 * Features:
 *  - Buddy Tracker: static status (mock map, guardians, ride in progress)
 *  - Emergency SOS button: prominent, themed, mock for demo
 *  - Trust Index: shows trust, behavior, punctuality (mock metrics)
 *  - Styling: Modern minimalist TrustRide blue/white/accent, cards, contemporary icons
 */
export default function TrustSafety() {
  // Mock Trust Metrics
  const trustMetrics = {
    trustScore: 92,
    rating: 4.8,
    flags: 0,
    punctuality: 98,
    rides: 47,
    lastFlag: "None"
  };

  // Buddy Tracker mock data
  const mockBuddies = [
    {
      name: "Priya S.",
      status: "On ride",
      icon: "🧑‍🦱",
      color: "#0077B6"
    },
    {
      name: "Fatima H.",
      status: "Idle",
      icon: "🧕",
      color: "#00A896"
    },
    {
      name: "Robin T.",
      status: "Pending",
      icon: "🧑‍🦰",
      color: "#b1c5df"
    }
  ];

  // Handler for mock SOS action
  function handleSOSClick() {
    window.alert(
      "🚨 Emergency SOS activated (Demo)

In the real app, guardians and TrustRide would be notified immediately."
    );
  }

  return (
    <div style={{ paddingTop: 28, paddingBottom: 28 }}>
      {/* Buddy Tracker Card */}
      <section
        className="card"
        aria-label="Buddy Tracker"
        style={{
          margin: "0 0 30px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 24px rgba(0, 119, 182, 0.07)",
          padding: "28px 20px 22px 20px",
          border: "1.2px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 9 }}>
          <span
            role="img"
            aria-label="buddy"
            style={{
              background: "linear-gradient(90deg, #eaf9ff, #e0faf7 93%)",
              color: "var(--color-primary)",
              fontSize: 26,
              borderRadius: 15,
              padding: "5px 9px",
              marginRight: 5,
              boxShadow: "0 1px 5px rgba(0, 168, 150, 0.09)",
              display: "inline-flex"
            }}
          >
            🧭
          </span>
          <span style={{
            fontWeight: 700, fontSize: "1.17em", color: "var(--color-text-primary)"
          }}>
            Buddy Tracker
          </span>
        </div>
        <div style={{ display: "flex", gap: 19, flexWrap: "wrap", marginBottom: 8 }}>
          {mockBuddies.map((buddy) => (
            <div
              key={buddy.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#f7fafd",
                border: "1.2px solid var(--color-border)",
                borderRadius: 14,
                padding: "10px 15px 7px",
                minWidth: 95,
                boxShadow: "0 1px 6px rgba(0,119,182,0.04)",
                marginBottom: 4
              }}
            >
              <span style={{ fontSize: 28, marginBottom: 3 }}>{buddy.icon}</span>
              <span style={{
                fontWeight: 600,
                fontSize: 16,
                color: buddy.color,
                marginBottom: 1
              }}>
                {buddy.name.split(" ")[0]}
              </span>
              <span style={{
                fontSize: 11,
                color: "#7891ad",
                fontWeight: 500
              }}>
                {buddy.status}
              </span>
            </div>
          ))}
        </div>
        {/* Buddy "mini-map" visual (mock) */}
        <div
          aria-label="Live Ride Map (mock)"
          style={{
            width: "100%",
            borderRadius: 16,
            background:
              "linear-gradient(120deg, #e3f3ff 65%, #e0faf7 99%)",
            minHeight: 54,
            marginTop: 6,
            marginBottom: 0,
            boxShadow: "0 1px 7px rgba(0,119,182,0.03)",
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "flex-end",
            padding: "12px 0 10px 12px",
            overflow: "hidden",
            border: "1px solid #eaf0f6"
          }}
        >
          {/* Map route mock graphic - minimalist dots and line */}
          <span
            style={{
              display: "inline-block",
              width: 34,
              height: 6,
              borderRadius: 6,
              background: "var(--color-primary)",
              marginRight: 8,
              marginLeft: 2
            }}
          ></span>
          <span
            style={{
              borderRadius: "50%",
              background: "var(--color-accent)",
              display: "inline-block",
              width: 16,
              height: 16,
              marginRight: 7
            }}
            aria-label="car"
          ></span>
          <span
            style={{
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              fontSize: 13,
              marginTop: 1
            }}
          >
            Greenwood Uni. ➜ Home
          </span>
        </div>
        <div className="description" style={{
          color: "var(--color-text-secondary)",
          fontSize: 13,
          marginTop: 8
        }}>
          <span style={{ color: "#00A896", fontWeight: 600 }}>Live:</span> Priya S. is sharing ride details with guardians.
        </div>
      </section>

      {/* Emergency SOS Button */}
      <section
        aria-label="Emergency SOS"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 35
        }}
      >
        <button
          className="btn btn-large"
          style={{
            background: "linear-gradient(90deg, #e22b38, #ff5e67)",
            color: "#fff",
            fontWeight: 740,
            fontSize: "1.21rem",
            padding: "16px 35px",
            borderRadius: 15,
            border: "none",
            boxShadow: "0 4px 18px rgba(226,43,56,0.13)",
            outline: "none",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            gap: 13,
            transition: "background 0.13s cubic-bezier(0.4,0,0.2,1)"
          }}
          onClick={handleSOSClick}
          aria-label="Emergency SOS"
          tabIndex={0}
        >
          <span role="img" aria-label="siren" style={{ fontSize: 30, marginRight: 2 }}>
            🚨
          </span>
          Emergency SOS
        </button>
      </section>

      {/* Trust Index Metrics Card */}
      <section
        className="card"
        aria-label="Trust Index"
        style={{
          margin: "0 auto",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 24px rgba(0, 119, 182, 0.07)",
          maxWidth: 490,
          border: "1.2px solid var(--color-border)",
          padding: "28px 24px 28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 11,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 8 }}>
          <span aria-label="shield" style={{ fontSize: 27, color: "var(--color-primary)", marginBottom: 1 }}>🛡️</span>
          <span style={{
            fontWeight: 800,
            fontSize: "1.18em",
            letterSpacing: "-0.5px",
            color: "var(--color-primary)"
          }}>
            Trust Index
          </span>
        </div>
        <div style={{
          display: "flex",
          gap: 15,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 10
        }}>
          <div style={{ textAlign: "center", minWidth: 98, marginRight: 11 }}>
            <div style={{
              fontWeight: 800,
              fontSize: 32,
              color: "#00A896",
              lineHeight: 1.2
            }}>
              {trustMetrics.trustScore}
            </div>
            <div style={{
              color: "var(--color-muted)",
              fontWeight: 600,
              fontSize: 13,
              marginTop: 0
            }}>
              Trust Score
            </div>
          </div>
          <div style={{
            flex: 1,
            minWidth: 120,
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}>
            <div style={{ fontWeight: 700, color: "#555", fontSize: 14, marginBottom: 2 }}>
              <span role="img" aria-label="star" style={{ color: "#FFD166", fontSize: 17, verticalAlign: "middle", marginRight: 4 }}>★</span>
              Ride Rating:{" "}
              <span style={{ color: "#0077B6", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                {trustMetrics.rating}
              </span>
            </div>
            <div style={{ fontWeight: 700, color: "#555", fontSize: 14, marginBottom: 2 }}>
              <span role="img" aria-label="clock" style={{ color: "#5dd7af", fontSize: 15, verticalAlign: "middle", marginRight: 4 }}>⏰</span>
              Punctuality:{" "}
              <span style={{ color: "#00A896", fontWeight: 700 }}>
                {trustMetrics.punctuality}%
              </span>
            </div>
            <div style={{ fontWeight: 700, color: "#555", fontSize: 14, marginBottom: 2 }}>
              <span role="img" aria-label="flag" style={{ color: "#e87272", fontSize: 15, verticalAlign: "middle", marginRight: 4 }}>⚑</span>
              Flags:{" "}
              <span style={{ color: trustMetrics.flags > 0 ? "#e87272" : "#00A896", fontWeight: 700 }}>
                {trustMetrics.flags}
              </span>
              {(trustMetrics.lastFlag && trustMetrics.lastFlag !== "None") && (
                <span style={{ color: "#e87272", fontWeight: 500, marginLeft: 6 }}>
                  ({trustMetrics.lastFlag})
                </span>
              )}
            </div>
            <div style={{ fontWeight: 700, color: "#555", fontSize: 14, marginBottom: 2 }}>
              <span role="img" aria-label="car" style={{ color: "#0077B6", fontSize: 16, verticalAlign: "middle", marginRight: 5 }}>🚗</span>
              Rides:{" "}
              <span style={{ color: "#0077B6", fontWeight: 700 }}>
                {trustMetrics.rides}
              </span>
            </div>
          </div>
        </div>
        <div className="description" style={{ color: "var(--color-text-secondary)", fontSize: 13, }}>
          Maintain a high trust score by riding safely, on time, and flagging any concerns.<br />
          <span style={{ color: "#00A896", fontWeight: 700 }}>
            Verified rides, community-driven trust.
          </span>
        </div>
      </section>
    </div>
  );
}
