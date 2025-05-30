import React from "react";

/**
 * PUBLIC_INTERFACE
 * RideDetailsCard displays summarized ride information (time, institution, gender, seats, verification/safety cue)
 * and a button to request/join/book the ride.
 *
 * @param {Object} props
 * @param {Object} props.ride - Mock ride data object
 * @param {Function} props.onBook - Callback when user wants to book/request this ride
 */
function formatTime(dt) {
  // Accepts Date|string, returns human-friendly time (e.g., "Today 13:30" or "Tomorrow 09:15")
  const rideDate = new Date(dt);
  const now = new Date();
  const dateString =
    rideDate.toDateString() === now.toDateString()
      ? "Today"
      : rideDate.toDateString() ===
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toDateString()
      ? "Tomorrow"
      : rideDate.toLocaleDateString();
  const timeStr = rideDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${dateString} ${timeStr}`;
}

export default function RideDetailsCard({ ride, onBook }) {
  // Minimal verification/safety style cues (mock, always shows "Verified ◉ Safe")
  return (
    <section
      className="card ride-details-card"
      style={{
        margin: "22px 0",
        boxShadow: "0 2px 14px rgba(0,119,182,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        borderRadius: "var(--radius-main)",
        border: "1.5px solid var(--color-border)",
        padding: "24px 18px",
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 2 }}>
        {/* Visual verification badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontWeight: 600,
            color: "var(--color-accent)",
            fontSize: "1.07em",
            letterSpacing: "-0.7px",
            padding: "4px 10px",
            background: "#f4fbf9",
            border: "1.2px solid var(--color-accent)",
            borderRadius: 20,
            marginRight: 10,
            gap: 7,
          }}
        >
          {/* Shield/checkmark */}
          <span style={{ fontSize: 18, marginRight: 3 }} aria-label="verified" role="img">
            🛡️
          </span>
          Verified
        </span>
        {/* May display more badges: gender-lock, eco, etc. */}
        {ride.genderPref && (
          <span
            style={{
              background: ride.genderPref === "female" ? "#ffeaea" : "#eaf9ff",
              color: ride.genderPref === "female" ? "#e87272" : "#009ee8",
              padding: "4px 13px",
              borderRadius: 18,
              fontWeight: 500,
              fontSize: 14,
              border: "1px solid var(--color-border)",
              marginRight: 7,
              letterSpacing: "-0.25px",
            }}
          >
            {ride.genderPref === "female" ? "Women Only" : "Open"}
          </span>
        )}
      </header>
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <section style={{ flex: 1, minWidth: 190 }}>
          <div className="description" style={{ fontWeight: 500, color: "var(--color-muted)" }}>
            Departure
          </div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "var(--color-text-primary)",
              marginBottom: 2,
            }}
          >
            {/* Departure time formatted nicely */}
            <span aria-label="departure time">{formatTime(ride.time)}</span>
          </div>
          <div
            style={{
              fontSize: 15,
              color: "var(--color-text-secondary)",
              fontWeight: 500,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "98%",
            }}
            title={ride.institution}
          >
            <span role="img" aria-label="institution" style={{ marginRight: 6, fontSize: 15 }}>
              🎓
            </span>
            {ride.institution}
          </div>
        </section>
        <section style={{ minWidth: 108 }}>
          <div className="description" style={{ fontWeight: 500, color: "var(--color-muted)" }}>
            Seats
          </div>
          <div style={{ fontWeight: 600, fontSize: 18, color: "var(--color-accent)" }}>
            {ride.seatsAvailable} / {ride.totalSeats}
          </div>
        </section>
        <section style={{ minWidth: 90 }}>
          <div className="description" style={{ fontWeight: 500, color: "var(--color-muted)" }}>
            Driver
          </div>
          <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
            {/* Could use initials or avatar in real app */}
            {ride.driverName}
          </div>
        </section>
      </div>
      <footer style={{ marginTop: 6 }}>
        <button
          className="btn"
          style={{
            minWidth: 122,
            fontWeight: 600,
            fontSize: "1.04rem",
            borderRadius: 10,
            background: ride.seatsAvailable > 0
              ? "linear-gradient(90deg, var(--color-primary), var(--color-accent))"
              : "#e2e2e2",
            color: ride.seatsAvailable > 0 ? "#fff" : "#a9a9a9",
            cursor: ride.seatsAvailable > 0 ? "pointer" : "not-allowed",
            boxShadow: ride.seatsAvailable > 0 ? "0 2px 8px rgba(0,119,182,0.09)" : "none",
            transition: "background 0.18s cubic-bezier(0.4,0,0.2,1)",
          }}
          disabled={ride.seatsAvailable <= 0}
          onClick={() => ride.seatsAvailable > 0 && onBook?.(ride)}
        >
          {ride.seatsAvailable > 0 ? "Book Ride" : "Full"}
        </button>
        <span
          style={{
            fontSize: 13,
            color: "#75b48a",
            marginLeft: 16,
            fontWeight: 500,
            verticalAlign: "middle",
          }}
          aria-label="Safety guaranteed"
        >
          <span style={{ fontSize: 17, marginRight: 3 }} role="img" aria-label="trust">
            🔒
          </span>
          Safe
        </span>
      </footer>
    </section>
  );
}
