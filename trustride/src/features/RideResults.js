import React from "react";

/**
 * PUBLIC_INTERFACE
 * RideResults: Page listing ride pool matches after a ride search.
 * Shows: Driver name, Departure time, ETA, Price, Trust Index, Eco Score (mock data).
 * Minimalist card list, TrustRide branding (blue/accent/white, soft cards).
 *
 * Now supports "Choose Ride" for booking: calls onChooseRide(ride) when selected.
 *
 * @param {function} onBack - Called to return to previous page.
 * @param {function} onChooseRide - Called with (ride) when user selects a ride to book.
 */
const mockRides = [
  {
    id: "ride-1",
    driver: "Priya Shah",
    departure: new Date(Date.now() + 60 * 60000), // 1 hour from now
    eta: new Date(Date.now() + 90 * 60000), // e.g., 1.5hrs from now, set as Date
    price: 210,
    trustIndex: 95,
    ecoScore: 28,
  },
  {
    id: "ride-2",
    driver: "Fatima Hossain",
    departure: new Date(Date.now() + 100 * 60000), // 1h40m
    eta: new Date(Date.now() + 130 * 60000),
    price: 180,
    trustIndex: 91,
    ecoScore: 32,
  },
  {
    id: "ride-3",
    driver: "Robin Thomas",
    departure: new Date(Date.now() + 30 * 60000), // 30min
    eta: new Date(Date.now() + 70 * 60000),
    price: 150,
    trustIndex: 88,
    ecoScore: 23,
  },
];

// Format time for card display (12-hour with AM/PM)
function fmtTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

// PUBLIC_INTERFACE
export default function RideResults({ onBack, onChooseRide }) {
  return (
    <div style={{ paddingTop: 38, paddingBottom: 33, maxWidth: 460, margin: "0 auto" }}>
      <header style={{ marginBottom: 29 }}>
        <div className="subtitle" style={{ color: "var(--color-accent)", fontWeight: 700, marginBottom: 4 }}>
          Rides Found
        </div>
        <h1 className="title" style={{ fontSize: 25, margin: 0, lineHeight: 1.27 }}>
          Available Ride Pools
        </h1>
        <div className="description" style={{ color: "var(--color-text-secondary)", fontSize: 16, marginTop: 4 }}>
          Trusted carpools with verified drivers. Book your ride below.
        </div>
      </header>
      {mockRides.map(ride => (
        <section
          key={ride.id}
          className="card"
          style={{
            margin: "0 0 20px 0",
            boxShadow: "0 2px 14px rgba(0,119,182,0.06)",
            border: "1.5px solid var(--color-border)",
            borderRadius: "var(--radius-main)",
            padding: "22px 16px 16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 13,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                background: "#eaf9ff",
                borderRadius: "50%",
                color: "var(--color-primary)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                fontSize: 23,
                width: 38,
                height: 38,
                justifyContent: "center",
                marginRight: 10,
                border: "1.6px solid var(--color-border)",
              }}
              aria-label="driver"
            >
              {ride.driver.split(" ").map(n => n[0]).join("").toUpperCase()}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17.5, color: "var(--color-primary)" }}>
                {ride.driver}
              </div>
              <span style={{
                color: "var(--color-accent)", fontWeight: 650, fontSize: 13.2,
                background: "#ecfcf7", padding: "1.4px 9px", borderRadius: 10, marginLeft: 3
              }}>
                Verified Driver
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 19, flexWrap: "wrap" }}>
            <InfoBox
              icon="⏰"
              label="Departs"
              value={fmtTime(ride.departure)}
              color="var(--color-primary)"
            />
            <InfoBox
              icon="🕓"
              label="ETA"
              value={fmtTime(ride.eta)}
              color="var(--color-accent)"
            />
            <InfoBox
              icon="💸"
              label="Fare"
              value={
                <span>
                  <span style={{ fontWeight: 650, color: "#00A896" }}>₹{ride.price.toLocaleString("en-IN")}</span>
                  <span style={{
                    color: "#7ec9c9", fontWeight: 520, fontSize: 13.5, marginLeft: 2
                  }}>
                    /seat
                  </span>
                </span>
              }
            />
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            flexWrap: "wrap"
          }}>
            <ScoreBox
              label="Trust Index"
              value={ride.trustIndex}
              icon="🛡️"
              color="var(--color-accent)"
              barColor="#00A896"
              max={100}
            />
            <ScoreBox
              label="Eco Score"
              value={ride.ecoScore}
              icon="🍃"
              color="var(--color-primary)"
              barColor="#0077B6"
              max={34}
            />
          </div>
          <div style={{ marginTop: 9, display: "flex", gap: 18, alignItems: "center" }}>
            <button
              className="btn"
              style={{
                minWidth: 112,
                fontWeight: 700,
                fontSize: "1.05rem",
                borderRadius: 10,
                background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,119,182,0.12)",
                outline: "none"
              }}
              type="button"
              onClick={() => onChooseRide && onChooseRide(ride)}
              aria-label={`Choose ride with ${ride.driver}`}
            >
              Choose Ride
            </button>
          </div>
        </section>
      ))}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
        <button
          className="btn"
          style={{
            color: "var(--color-primary)",
            background: "#f4fbf9",
            fontWeight: 650,
            border: "1.5px solid var(--color-primary)",
            marginTop: 10,
            borderRadius: 10,
            minWidth: 100
          }}
          type="button"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
      <div className="description" style={{ marginTop: 22, color: "var(--color-muted)", fontSize: 13, textAlign: "center" }}>
        This is mock data for demo only.
      </div>
    </div>
  );
}

/**
 * InfoBox for simple stat. Ensures consistency for fare display.
 */
function InfoBox({ icon, label, value, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", flexDirection: "column", gap: 2,
      minWidth: 68
    }}>
      <span style={{
        fontSize: 22, fontWeight: 700, color
      }}>{icon}</span>
      <span style={{
        fontWeight: 600, fontSize: 14.1, color: "var(--color-text-secondary)"
      }}>{label}</span>
      <span style={{
        fontWeight: 700, fontSize: 16.1, color: "var(--color-primary)"
      }}>{value}</span>
    </div>
  );
}

// Sub-component: ScoreBox for Trust Index and Eco
function ScoreBox({ label, value, max, icon, color, barColor }) {
  const pct = Math.max(Math.min((value / max) * 100, 100), 0);
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "flex-start",
      background: "#f7fafd",
      border: "1.2px solid var(--color-border)",
      borderRadius: 11,
      padding: "8px 16px 10px 10px",
      minWidth: 128,
      gap: 1
    }}>
      <span style={{
        fontWeight: 650, fontSize: 13.2, color
      }}>
        {icon} <b>{label}</b>
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          fontWeight: 800, fontSize: 18, color: barColor, minWidth: 28
        }}>{value}</span>
        <div style={{
          background: "#e0f9ef", borderRadius: 7,
          width: 62, height: 8, overflow: "hidden", marginTop: 0
        }}>
          <div style={{
            width: `${pct}%`, height: 8,
            background: `linear-gradient(90deg, ${barColor}, #c8f9f1 99%)`,
            borderRadius: 7,
            transition: "width 0.32s"
          }} ></div>
        </div>
      </div>
    </div>
  );
}
