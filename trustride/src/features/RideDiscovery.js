import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * RideDiscovery home/dashboard for TrustRide: entry point for requesting/pooling rides.
 * Provides a modern UI: pickup and destination entry, location suggestion chips,
 * minimalist date/time scheduling (now/later flex), TrustRide card styling.
 */
const COMMON_LOCATIONS = [
  { label: "Campus", address: "Greenwood University Main Gate" },
  { label: "Office", address: "Downtown Tech Park, Block B" },
  { label: "Hostel", address: "Sunrise Hostel, West Wing" },
  { label: "Library", address: "Central City Library" },
];

const TIME_FLEX_OPTIONS = [15, 30];

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}
function getNextHalfHourISOTime() {
  // Returns "HH:MM" string for next 0/30 minute time
  const now = new Date();
  const min = now.getMinutes();
  now.setSeconds(0, 0);
  if (min < 30) {
    now.setMinutes(30);
  } else {
    now.setMinutes(0);
    now.setHours(now.getHours() + 1);
  }
  return now.toISOString().slice(11, 16);
}

export default function RideDiscovery() {
  // Input fields
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  // Quick chips: track last four used for suggestions (in real: recent search etc)
  const [recent, setRecent] = useState(["City Center Plaza", "Greenwood Sports Complex", "Main Bus Stand"]);

  // Date/Time scheduling
  const [scheduleType, setScheduleType] = useState("now"); // "now" or "later"
  const [scheduledDate, setScheduledDate] = useState(getTodayISO());
  const [scheduledTime, setScheduledTime] = useState(getNextHalfHourISOTime());
  const [timeFlex, setTimeFlex] = useState(TIME_FLEX_OPTIONS[0]);

  // Handlers for suggestion chips
  function handlePickupChip(addr) {
    setPickup(addr);
    rememberRecent(addr);
  }
  function handleDestChip(addr) {
    setDestination(addr);
    rememberRecent(addr);
  }
  function rememberRecent(addr) {
    setRecent(prev => !addr || prev.includes(addr) ? prev : [addr, ...prev.slice(0, 3)]);
  }
  // Swaps pickup/dest (small arrow shortcut)
  function swapPickupDest() {
    setPickup(destination);
    setDestination(pickup);
  }

  // UI main render
  return (
    <div style={{
      paddingTop: 22,
      paddingBottom: 22,
      maxWidth: 440,
      margin: "0 auto"
    }}>
      {/* Card: Pickup/Destination + Suggestions */}
      <section
        className="card"
        aria-label="Pickup & Destination"
        style={{
          marginBottom: 19,
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(0,119,182,0.05)",
          border: "1.5px solid var(--color-border)",
          padding: "24px 16px 19px 16px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{
          fontWeight: 700, fontSize: 18, color: "var(--color-primary)",
          display: "flex", alignItems: "center", gap: 8, marginBottom: 3
        }}>
          <span role="img" aria-label="car" style={{ fontSize: 20 }}>🚗</span>
          Where to?
        </div>

        {/* Suggestion chips */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 2
        }}>
          {/* Quick common locations */}
          {COMMON_LOCATIONS.map(loc =>
            <button
              key={loc.label}
              className="tr-chip"
              style={{
                background: "linear-gradient(90deg,#e3f3ff, #ecfcf7 92%)",
                color: "var(--color-accent)",
                border: "1.1px solid var(--color-border)",
                borderRadius: 17,
                fontWeight: 670,
                fontSize: 14.2,
                padding: "6px 17px",
                cursor: "pointer"
              }}
              onClick={() => handlePickupChip(loc.address)}
              type="button"
              tabIndex={0}
              aria-label={`Pickup: ${loc.label}`}
            >{loc.label}</button>
          )}
          {recent.map(addr =>
            <button
              key={addr}
              className="tr-chip"
              style={{
                background: "linear-gradient(90deg, #ecfcf7 65%, #e3f3ff 99%)",
                color: "var(--color-primary)",
                border: "1.1px solid var(--color-border)",
                fontWeight: 600,
                fontSize: 13.5,
                padding: "5px 13px",
                marginLeft: 0,
                marginRight: 0,
                opacity: 0.98,
                borderRadius: 17,
                cursor: "pointer"
              }}
              onClick={() => handleDestChip(addr)}
              type="button"
              tabIndex={0}
              aria-label={`Destination: ${addr}`}
              title="Recently used"
            >{addr.length < 22 ? addr : addr.slice(0, 20) + "…"}</button>
          )}
        </div>

        {/* Input Row: Pickup (icon), Swap, Destination (icon) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {/* Pickup */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 3,
            background: "#f8fafb",
            borderRadius: 8,
            border: "1.34px solid var(--color-border)",
            padding: "3px 0"
          }}>
            <span
              aria-label="pickup icon"
              style={{
                background: "#ecfcf7",
                color: "var(--color-accent)",
                borderRadius: 10,
                padding: "6px 9px 5px",
                fontSize: 20,
                marginLeft: 7, marginRight: 4,
                display: "inline-flex",
              }}
              role="img"
            >⬆️</span>
            <div style={{ flex: 1 }}>
              <label
                htmlFor="pickup-input"
                style={{
                  fontSize: 13.4, color: "var(--color-text-secondary)",
                  fontWeight: 600, display: "block", marginBottom: 1, letterSpacing: "0.04em"
                }}>Pickup</label>
              <input
                id="pickup-input"
                type="text"
                placeholder="Enter pickup point"
                className="input"
                autoComplete="off"
                autoFocus
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 9px",
                  fontSize: "1.05rem",
                  border: "none",
                  background: "none",
                  borderRadius: 6,
                  color: "var(--color-text-primary)"
                }}
              />
            </div>
            {/* Mini swap arrow - between fields */}
            <button
              onClick={swapPickupDest}
              aria-label="Swap pickup and destination"
              type="button"
              tabIndex={0}
              style={{
                background: "none", border: "none", padding: 0, margin: "0 4px",
                fontSize: 19, color: "#90bda1", cursor: "pointer", opacity: 0.70
              }}>⇅</button>
          </div>
          {/* Destination */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 0,
            background: "#f8fafb",
            borderRadius: 8,
            border: "1.33px solid var(--color-border)",
            padding: "3px 0"
          }}>
            <span
              aria-label="destination icon"
              style={{
                background: "#e3f3ff",
                color: "var(--color-primary)",
                borderRadius: 10,
                padding: "6px 9px 5px",
                fontSize: 20,
                marginLeft: 7, marginRight: 4,
                display: "inline-flex"
              }}
              role="img"
            >⬇️</span>
            <div style={{ flex: 1 }}>
              <label
                htmlFor="dest-input"
                style={{
                  fontSize: 13.4, color: "var(--color-text-secondary)",
                  fontWeight: 600, display: "block", marginBottom: 1, letterSpacing: "0.04em"
                }}>Destination</label>
              <input
                id="dest-input"
                type="text"
                placeholder="Enter destination"
                className="input"
                autoComplete="off"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 9px",
                  fontSize: "1.05rem",
                  border: "none",
                  background: "none",
                  borderRadius: 6,
                  color: "var(--color-text-primary)"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Card: Date/Time scheduling picker */}
      <section
        className="card"
        aria-label="Date & Time Selection"
        style={{
          marginBottom: 21,
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(0, 168, 150, 0.04)",
          border: "1.2px solid var(--color-border)",
          padding: "23px 16px 13px 16px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{
          fontWeight: 700, fontSize: 16.5, color: "var(--color-primary)",
          display: "flex", alignItems: "center", gap: 8
        }}>
          <span role="img" aria-label="clock" style={{ fontSize: 18 }}>⏰</span>
          Choose Time
        </div>
        {/* Type toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 4 }}>
          <label style={{
            fontWeight: 620, fontSize: 14.1, color: "var(--color-text-secondary)", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 7
          }}>
            <input
              type="radio"
              name="sched-time-type"
              checked={scheduleType === "now"}
              onChange={() => setScheduleType("now")}
              style={{ accentColor: "var(--color-accent)" }}
            /> Now
          </label>
          <label style={{
            fontWeight: 620, fontSize: 14.1, color: "var(--color-text-secondary)", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 7
          }}>
            <input
              type="radio"
              name="sched-time-type"
              checked={scheduleType === "later"}
              onChange={() => setScheduleType("later")}
              style={{ accentColor: "var(--color-primary)" }}
            /> Schedule later
          </label>
        </div>
        {/* Picker if later */}
        {scheduleType === "later" && (
          <div style={{ display: "flex", alignItems: "center", gap: 13, flexWrap: "wrap" }}>
            <label htmlFor="date-picker"
              style={{
                fontWeight: 500,
                fontSize: 13.4,
                color: "var(--color-muted)",
                marginRight: 3,
              }}>
              Date
            </label>
            <input
              id="date-picker"
              type="date"
              value={scheduledDate}
              min={getTodayISO()}
              onChange={e => setScheduledDate(e.target.value)}
              style={{
                border: "1.08px solid var(--color-border)",
                borderRadius: 7,
                padding: "7px 8px",
                fontSize: "1em",
                color: "var(--color-text-primary)",
                background: "#f8fafb",
                outline: "none",
                fontWeight: 500,
              }}
            />
            <label htmlFor="time-picker"
              style={{
                fontWeight: 500, fontSize: 13.4, color: "var(--color-muted)",
                marginLeft: 7, marginRight: 2
              }}>
              Time
            </label>
            <input
              id="time-picker"
              type="time"
              value={scheduledTime}
              onChange={e => setScheduledTime(e.target.value)}
              style={{
                border: "1.08px solid var(--color-border)",
                borderRadius: 7,
                padding: "7px 8px",
                fontSize: "1em",
                color: "var(--color-text-primary)",
                background: "#f8fafb",
                outline: "none",
                fontWeight: 500,
              }}
            />
            <div style={{ marginLeft: 10 }}>
              <span style={{ fontSize: 13.1, color: "var(--color-text-secondary)", marginRight: 4 }}>
                Flexibility:
              </span>
              {/* FLEX OPTION CHIPS */}
              {TIME_FLEX_OPTIONS.map(opt =>
                <button
                  key={opt}
                  type="button"
                  className="tr-chip"
                  style={{
                    padding: "4px 14px",
                    fontSize: 13.3,
                    color: timeFlex === opt ? "var(--color-accent)" : "var(--color-primary)",
                    background: timeFlex === opt ?
                      "linear-gradient(90deg, #ecfcf7 70%, #e3f3ff 99%)"
                      : "linear-gradient(90deg, #e3f3ff 70%, #ecfcf7 99%)",
                    border: "1px solid var(--color-border)",
                    marginLeft: 0,
                    marginRight: 4,
                    fontWeight: 600,
                    opacity: 1
                  }}
                  onClick={() => setTimeFlex(opt)}
                  tabIndex={0}
                  aria-label={`±${opt} min`}
                >±{opt} min</button>
              )}
            </div>
          </div>
        )}
        {scheduleType === "now" && (
          <div style={{
            color: "var(--color-muted)",
            fontWeight: 500,
            fontSize: 13.3,
            marginLeft: 2
          }}>
            Ride ASAP – A driver will be matched instantly.
          </div>
        )}
      </section>

      {/* Call to action (find rides, disabled if fields are blank) */}
      <div style={{
        display: "flex", gap: 0, justifyContent: "center", alignItems: "center"
      }}>
        <button
          className="btn btn-large"
          style={{
            minWidth: 165,
            fontWeight: 700,
            fontSize: "1.04rem",
            borderRadius: 11,
            background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
            boxShadow: "0 2px 8px rgba(0,119,182,0.10)",
            outline: "none"
          }}
          type="button"
          tabIndex={0}
          disabled={!pickup.trim() || !destination.trim()}
          onClick={() => {
            // In the actual app, would show search or next page. For now, just a dialog
            window.alert(
              `Find rides from:

• Pickup: ${pickup.trim()}
• Destination: ${destination.trim()}
• When: ${scheduleType === "now" ?
                "Now" : `${scheduledDate} ${scheduledTime} (±${timeFlex} min)`}

(This is a demo - booking not implemented)`
            );
            // Store these as 'recent' addresses
            rememberRecent(pickup.trim());
            rememberRecent(destination.trim());
          }}
        >
          Find available rides
        </button>
      </div>

      {/* Demo tip */}
      <div className="description" style={{
        marginTop: 18,
        fontSize: "0.97em",
        color: "var(--color-muted)",
        textAlign: "center"
      }}>
        Only verified users can see rides. For demo, enter any addresses.<br />
        (No map preview – just enter pickup & destination.)
      </div>
    </div>
  );
}
