import React from "react";

/**
 * PUBLIC_INTERFACE
 * EcoScore: TrustRide's Eco Score Tracker UI.
 * Features:
 *  - Carbon saved (mock metric, large and themed)
 *  - Ride history table/list (mock data)
 *  - Leaderboard for eco-savers (mock, visually engaging)
 * Styling: Minimalist, modern cards, prominent green/blue, clean layout.
 */

const mockEcoScore = {
  carbonSavedKg: 73.4,
  rides: [
    {
      date: "2024-05-25",
      from: "Greenwood University",
      to: "City Center",
      distanceKm: 12.7,
      carbonSaved: 2.2,
      ecoPoints: 8,
      id: "r1",
    },
    {
      date: "2024-05-23",
      from: "Greenwood University",
      to: "Mall",
      distanceKm: 8.0,
      carbonSaved: 1.3,
      ecoPoints: 5,
      id: "r2",
    },
    {
      date: "2024-05-21",
      from: "Library",
      to: "Hostel",
      distanceKm: 2.7,
      carbonSaved: 0.5,
      ecoPoints: 2,
      id: "r3",
    },
    {
      date: "2024-05-19",
      from: "Central College",
      to: "Greenwood University",
      distanceKm: 16.5,
      carbonSaved: 3.1,
      ecoPoints: 9,
      id: "r4",
    },
    {
      date: "2024-05-18",
      from: "City Center",
      to: "Central College",
      distanceKm: 6.2,
      carbonSaved: 1.1,
      ecoPoints: 4,
      id: "r5",
    }
  ],
  leaderboard: [
    { rank: 1, name: "Fatima H.", ecoScore: 91.1 },
    { rank: 2, name: "Robin T.", ecoScore: 87.3 },
    { rank: 3, name: "Alice W.", ecoScore: 78.6 },
    { rank: 4, name: "You", ecoScore: 73.4, highlight: true },
    { rank: 5, name: "Priya S.", ecoScore: 69.2 }
  ]
};

// Util: format float values for display
function fmt(val) {
  return val % 1 === 0 ? val : val.toFixed(1);
}

export default function EcoScore() {
  return (
    <div style={{ paddingTop: 28, paddingBottom: 32 }}>
      {/* Carbon Saved Card */}
      <section
        className="card"
        aria-label="Carbon Saved"
        style={{
          margin: "0 0 28px 0",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 26,
          boxShadow: "0 2px 24px rgba(0, 168, 150, 0.04)",
          border: "1.2px solid var(--color-border)",
          borderRadius: "var(--radius-main)",
          padding: "30px 22px 28px 26px",
        }}
      >
        <span
          role="img"
          aria-label="leaf"
          style={{
            color: "var(--color-accent)",
            backgroundColor: "#ecfcf7",
            fontSize: 43,
            borderRadius: "50%",
            padding: "13px 15px 10px 15px",
            marginRight: 7,
            marginBottom: 0,
            border: "1.5px solid var(--color-accent)",
            boxShadow: "0 1px 9px 0 #f4fbf9"
          }}
        >
          🍃
        </span>
        <div style={{ flex: 1, minWidth: 120 }}>
          <div
            style={{
              color: "var(--color-accent)",
              fontWeight: 750,
              fontSize: 37,
              lineHeight: 1.13,
              letterSpacing: "-2px"
            }}
          >
            {fmt(mockEcoScore.carbonSavedKg)}<span style={{ fontSize: 22, color: "#66bfa7", fontWeight: 500 }}>kg</span>
          </div>
          <div style={{ color: "var(--color-muted)", fontSize: 17, fontWeight: 600 }}>Total CO₂ Saved</div>
          <div style={{ color: "var(--color-text-secondary)", fontWeight: 500, fontSize: 14 }}>
            By riding & pooling, you helped the planet!
          </div>
        </div>
      </section>

      {/* Ride History Card */}
      <section
        className="card"
        aria-label="Ride History"
        style={{
          margin: "0 0 29px 0",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 18px rgba(0,119,182,0.045)",
          padding: "22px 14px 18px 19px",
          border: "1.1px solid var(--color-border)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 19, color: "var(--color-primary)", marginBottom: 13, display: "flex", alignItems: "center", gap: 10 }}>
          <span role="img" aria-label="ride" style={{ fontSize: 24, marginBottom: 2 }}>🚗</span>
          Ride History
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 15,
            color: "var(--color-text-primary)"
          }}>
            <thead>
              <tr>
                <th style={{ fontWeight: 600, color: "var(--color-muted)", textAlign: "left", padding: "6px 10px 6px 3px", fontSize: 13 }}>Date</th>
                <th style={{ fontWeight: 600, color: "var(--color-muted)", textAlign: "left", padding: "6px 7px", fontSize: 13 }}>From</th>
                <th style={{ fontWeight: 600, color: "var(--color-muted)", textAlign: "left", padding: "6px 7px", fontSize: 13 }}>To</th>
                <th style={{ fontWeight: 600, color: "var(--color-muted)", textAlign: "center", padding: "6px 9px", fontSize: 13 }}>Distance (km)</th>
                <th style={{ fontWeight: 600, color: "var(--color-accent)", textAlign: "center", padding: "6px 10px 6px 6px", fontSize: 13 }}>CO₂ Saved</th>
                <th style={{ fontWeight: 600, color: "var(--color-primary)", textAlign: "center", padding: "6px 7px", fontSize: 13 }}>Points</th>
              </tr>
            </thead>
            <tbody>
              {mockEcoScore.rides.map((ride) => (
                <tr key={ride.id} style={{ borderBottom: "1px solid #f2f8fa" }}>
                  <td style={{ padding: "7px 7px 5px 3px", minWidth: 68 }}>{ride.date}</td>
                  <td style={{ padding: "7px 6px", minWidth: 104 }}>{ride.from}</td>
                  <td style={{ padding: "7px 6px", minWidth: 104 }}>{ride.to}</td>
                  <td style={{ padding: "7px 3px", color: "#2da3a8", textAlign: "center", minWidth: 45 }}>{fmt(ride.distanceKm)}</td>
                  <td style={{ padding: "7px 3px", color: "#23b85c", fontWeight: 700, textAlign: "center", minWidth: 45 }}>
                    {fmt(ride.carbonSaved)}kg
                  </td>
                  <td style={{ padding: "7px 3px", color: "#0077B6", fontWeight: 700, textAlign: "center", minWidth: 31 }}>
                    {ride.ecoPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Eco Leaderboard Card */}
      <section
        className="card"
        aria-label="Eco Leaderboard"
        style={{
          margin: "0 auto",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 24px rgba(0, 168, 150, 0.06)",
          border: "1.2px solid var(--color-border)",
          maxWidth: 455,
          padding: "30px 24px 26px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 10 }}>
          <span aria-label="leaderboard" style={{ fontSize: 25, color: "#00A896" }}>🏆</span>
          <span style={{
            fontWeight: 800,
            fontSize: "1.18em",
            letterSpacing: "-0.4px",
            color: "#00A896"
          }}>
            Eco Leaderboard
          </span>
        </div>
        <div style={{ marginBottom: 4, color: "var(--color-muted)", fontWeight: 600, fontSize: 13 }}>
          Top eco-savers from your institution's rides
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {mockEcoScore.leaderboard.map((entry) => (
            <li
              key={entry.rank}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: entry.highlight ? "linear-gradient(90deg, #f4fbf9 65%, #f2fdfa 99%)" : (entry.rank === 1 ? "#e9fff7" : "none"),
                borderRadius: 12,
                padding: "11px 13px",
                fontWeight: entry.highlight ? 700 : (entry.rank === 1 ? 600 : 520),
                color: entry.highlight ? "var(--color-primary)" : (entry.rank === 1 ? "#23b85c" : "var(--color-text-primary)"),
                fontSize: entry.highlight ? 17 : 16,
                marginBottom: entry.rank !== mockEcoScore.leaderboard.length ? 7 : 0,
                boxShadow: entry.highlight ? "0 1px 9px rgba(0,168,150,0.12)" : "none"
              }}
            >
              <span style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontWeight: entry.highlight ? 800 : 700
              }}>
                <span style={{
                  display: "inline-block",
                  fontSize: entry.rank === 1 ? 19 : 16,
                  color: entry.rank === 1 ? "#28ad78" : "#8caacd",
                  marginRight: 4,
                  fontWeight: 640
                }}>
                  {entry.rank}
                </span>
                <span>
                  {entry.name === "You" ? <span style={{
                    background: "linear-gradient(90deg, #00a896 60%, #23b85c 100%)",
                    borderRadius: 10,
                    color: "#fff",
                    padding: "1px 10px",
                    fontSize: 14,
                    marginRight: 3
                  }}>You</span> : entry.name}
                </span>
                {entry.rank === 1 && (
                  <span role="img" aria-label="crown" style={{ fontSize: 17, marginLeft: 4 }}>👑</span>
                )}
              </span>
              <span style={{
                fontWeight: entry.highlight ? 850 : 700,
                color: entry.highlight ? "#00A896" : "#0077B6",
                fontVariantNumeric: "tabular-nums",
                fontSize: entry.highlight ? 17 : 15.7,
                letterSpacing: "-0.4px"
              }}>
                {fmt(entry.ecoScore)}
              </span>
            </li>
          ))}
        </ol>
        <div className="description" style={{ marginTop: 9, fontSize: 13, color: "#6cbfa7", fontWeight: 600 }}>
          Climb by pooling more rides, or organizing carpools!
        </div>
      </section>
    </div>
  );
}
