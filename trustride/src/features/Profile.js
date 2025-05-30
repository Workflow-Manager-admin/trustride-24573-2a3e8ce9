import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Profile: TrustRide Profile & Settings screen.
 * Features:
 * - Verified ID tag, institution/email
 * - Ride stats card: rides, ratings, trust, eco score
 * - Notification Preferences: toggles (UI only, not wired)
 * - Guardian Contacts (UI only): view/add/edit mock
 * - Emergency Setup: display status, mock setup button
 * - Minimalist, modern, card-grouped presentation, TrustRide color scheme
 */

const mockUser = {
  name: "Jane Doe",
  email: "jane.doe@university.edu",
  institution: "Greenwood University",
  verified: true,
  trustScore: 92,
  rating: 4.8,
  rides: 32,
  ecoScore: 73.4,
  guardians: [
    { name: "Fatima H.", relation: "Mother", phone: "+1 555-2102" },
    { name: "Priya S.", relation: "Guardian", phone: "+1 555-3921" }
  ],
  notifications: {
    rideAlerts: true,
    safety: true,
    newFeatures: false
  },
  emergencySetup: true
};

export default function Profile() {
  // Use local UI state for toggles (not persistent)
  const [notif, setNotif] = useState({ ...mockUser.notifications });

  // PUBLIC_INTERFACE
  function handleToggle(field) {
    setNotif(n => ({ ...n, [field]: !n[field] }));
  }

  return (
    <div style={{ paddingTop: 28, paddingBottom: 30 }}>
      {/* Verified ID Card */}
      <section
        className="card"
        aria-label="Verified Identity"
        style={{
          margin: "0 0 27px 0",
          display: "flex",
          alignItems: "flex-start",
          gap: 22,
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 18px rgba(0,119,182,0.06)",
          padding: "26px 24px 24px 26px",
          border: "1.2px solid var(--color-border)"
        }}
      >
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontWeight: 700,
          color: "#fff",
          fontSize: 23,
          background: "linear-gradient(90deg, #0077B6, #00A896)",
          borderRadius: "50%",
          width: 54,
          height: 54,
          justifyContent: "center"
        }}>
          <span style={{ fontSize: 28, marginRight: 0 }} aria-label="profile photo" role="img">🧑‍🎓</span>
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 21, color: "var(--color-primary)", lineHeight: 1.25 }}>
            {mockUser.name}
            {mockUser.verified && (
              <span style={{
                marginLeft: 9, fontSize: 13, fontWeight: 700, color: "var(--color-accent)",
                background: "#ecfcf7", borderRadius: 12, padding: "3px 10px", verticalAlign: "middle",
                border: "1px solid var(--color-accent)", marginBottom: 2, marginRight: 6
              }}>
                <span style={{ fontSize: 15, marginRight: 3 }} role="img" aria-label="verified">🛡️</span>
                Verified
              </span>
            )}
          </div>
          <div style={{ fontSize: 15, color: "var(--color-text-secondary)", fontWeight: 600, marginBottom: 2 }}>
            {mockUser.institution}
          </div>
          <div className="description" style={{ fontSize: 14.2, color: "var(--color-muted)", fontWeight: 500 }}>
            {mockUser.email}
          </div>
        </div>
      </section>

      {/* Ride Stats Card */}
      <section
        className="card"
        aria-label="Ride Statistics"
        style={{
          margin: "0 0 27px 0",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: 0,
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(0,119,182,0.044)",
          padding: "23px 14px 12px 21px",
          border: "1.13px solid var(--color-border)",
          justifyContent: "space-between"
        }}
      >
        <div style={{ flex: "0 0 90px", textAlign: "center", borderRight: "1px solid #f0f6f8", marginRight: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 28, color: "#00A896" }}>{mockUser.rides}</div>
          <div style={{ color: "var(--color-muted)", fontSize: 13.8, fontWeight: 590 }}>Rides</div>
        </div>
        <div style={{ flex: "0 0 90px", textAlign: "center", borderRight: "1px solid #f0f6f8", marginRight: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 28, color: "#0077B6", fontVariantNumeric: "tabular-nums" }}>{mockUser.rating.toFixed(1)}</div>
          <div style={{ color: "var(--color-muted)", fontSize: 13.8, fontWeight: 590 }}>Rating ★</div>
        </div>
        <div style={{ flex: "0 0 90px", textAlign: "center", borderRight: "1px solid #f0f6f8", marginRight: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 28, color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>{mockUser.trustScore}</div>
          <div style={{ color: "var(--color-muted)", fontSize: 13.8, fontWeight: 590 }}>Trust</div>
        </div>
        <div style={{ flex: "0 0 95px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 28, color: "#00A896", fontVariantNumeric: "tabular-nums" }}>{mockUser.ecoScore}</div>
          <div style={{ color: "var(--color-muted)", fontSize: 13.8, fontWeight: 590 }}>Eco Score</div>
        </div>
      </section>

      {/* Notification Preferences Card */}
      <section
        className="card"
        aria-label="Profile Notification Preferences"
        style={{
          margin: "0 0 27px 0",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(0,119,182,0.044)",
          padding: "23px 29px 18px 23px",
          border: "1.11px solid var(--color-border)"
        }}
      >
        <div style={{ fontWeight: 650, fontSize: 16, color: "var(--color-primary)", marginBottom: 6 }}>
          <span role="img" aria-label="bell" style={{ marginRight: 7, fontSize: 18 }}>🔔</span>
          Notifications
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 9, fontSize: 15 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={notif.rideAlerts}
              onChange={() => handleToggle("rideAlerts")}
              style={{ accentColor: "var(--color-primary)" }}
            />
            Ride Alerts & Confirmations
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={notif.safety}
              onChange={() => handleToggle("safety")}
              style={{ accentColor: "var(--color-accent)" }}
            />
            Safety and TrustCircle Updates
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={notif.newFeatures}
              onChange={() => handleToggle("newFeatures")}
              style={{ accentColor: "#9fb3c8" }}
            />
            New Features & Tips
          </label>
        </div>
        <div className="description" style={{ color: "var(--color-muted)", fontSize: 13, marginTop: 8, marginLeft: 2 }}>
          These preferences are locally managed for demo. In a real app, changes would update your account server-side.
        </div>
      </section>

      {/* Guardian Contacts Card */}
      <section
        className="card"
        aria-label="Guardian Contacts"
        style={{
          margin: "0 0 27px 0",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(0,168,150,0.040)",
          padding: "23px 26px 18px 24px",
          border: "1.09px solid var(--color-border)"
        }}
      >
        <div style={{ fontWeight: 650, fontSize: 16, color: "var(--color-primary)", marginBottom: 5 }}>
          <span role="img" aria-label="guardians" style={{ marginRight: 7, fontSize: 18 }}>🧑‍🤝‍🧑</span>
          Guardian Contacts
        </div>
        <div style={{ marginTop: 7, marginBottom: 2 }}>
          {mockUser.guardians.map((g, idx) => (
            <div key={g.name + idx} style={{
              display: "flex", alignItems: "center", padding: "7px 0",
              borderBottom: idx !== mockUser.guardians.length - 1 ? "1px solid #f2f8fa" : "none",
              gap: 12, fontSize: 15
            }}>
              <span style={{ fontWeight: 700, color: idx % 2 ? "var(--color-accent)" : "var(--color-primary)" }}>
                {g.name}
              </span>
              <span style={{
                color: "#9fb3c8",
                fontWeight: 500,
                fontSize: 14,
                marginLeft: 1
              }}>
                ({g.relation})
              </span>
              <span style={{
                color: "#0cb4a1",
                background: "#ebfdf8",
                borderRadius: 9,
                padding: "2px 8px",
                fontSize: 13,
                marginLeft: 8,
                fontWeight: 600
              }}>
                {g.phone}
              </span>
              <span style={{
                marginLeft: "auto", fontSize: 13, color: "#a8bbc3",
                background: "#f4fbf9", borderRadius: 9, padding: "2px 10px", fontWeight: 550
              }}>
                Edit
              </span>
            </div>
          ))}
          {/* In real app: add/edit contact actions. Here: mock only */}
        </div>
        <button
          className="btn"
          style={{
            marginTop: 13, fontSize: 15, fontWeight: 600, borderRadius: 12, background: "#f4fbf9", color: "var(--color-accent)",
            border: "1.4px solid var(--color-accent)", minWidth: 135
          }}
          type="button"
          tabIndex={0}
          disabled
        >
          + Add Guardian <span style={{ fontSize: 11, marginLeft: 6 }}>(Demo)</span>
        </button>
        <div className="description" style={{ color: "var(--color-muted)", fontSize: 13, marginTop: 7, marginLeft: 2 }}>
          Guardians receive ride and emergency notifications in the real app.
        </div>
      </section>

      {/* Emergency Setup Card */}
      <section
        className="card"
        aria-label="Emergency Setup"
        style={{
          margin: "0 0 15px 0",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(226,43,56,0.045)",
          padding: "22px 19px 15px 20px",
          border: "1.06px solid var(--color-border)",
          display: "flex", alignItems: "center", gap: 15, maxWidth: 470
        }}
      >
        <span role="img" aria-label="siren" style={{
          background: "linear-gradient(90deg, #ffeaea, #fff1f1 97%)",
          color: "#e22b38", fontWeight: 700, fontSize: 28,
          borderRadius: "50%", padding: "10px 15px 7px 15px", border: "1.4px solid #e22b38",
          boxShadow: "0 1px 9px 0 #f4fbf9"
        }}>🚨</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 700, color: "#e22b38", fontSize: 16, marginBottom: 1
          }}>
            Emergency Contact Setup
            {mockUser.emergencySetup &&
              <span style={{
                color: "#0cb4a1", background: "#ecfcf7", borderRadius: 9,
                fontWeight: 600, marginLeft: 9, fontSize: 12, padding: "3.2px 11px"
              }}>
                Active
              </span>
            }
          </div>
          <div style={{
            color: "var(--color-text-secondary)",
            fontSize: 13.3, marginTop: 0, fontWeight: 500
          }}>
            In emergencies, your guardians and TrustRide are notified instantly.
          </div>
        </div>
        <button
          className="btn"
          style={{
            background: mockUser.emergencySetup
              ? "linear-gradient(90deg,#f4fbf9,#eaf9ff 90%)" : "linear-gradient(90deg,#e22b38,#ff5e67)",
            color: mockUser.emergencySetup ? "#7ec9c9" : "#fff",
            fontWeight: 650, fontSize: 14.5, borderRadius: 8,
            border: "1.2px solid #e22b38",
            minWidth: 88, marginLeft: 7
          }}
          type="button"
          tabIndex={0}
          disabled={mockUser.emergencySetup}
        >
          {mockUser.emergencySetup ? "Setup Complete" : "Setup"}
        </button>
      </section>
    </div>
  );
}
