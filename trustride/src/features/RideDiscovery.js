import React, { useState } from "react";
import RideDetailsCard from "./RideDetailsCard";

/**
 * PUBLIC_INTERFACE
 * RideDiscovery: Home tab to browse institution ride pools (rounded cards, filters, booking interaction).
 * Features:
 *  - Filter bar (institution, soon: gender, time)
 *  - List available ride pools (mock data)
 *  - Card UI, minimalist/modern, verification/safety visual cues
 *  - Book/Request ride interaction (mock)
 */
const MOCK_RIDES = [
  {
    id: "a1",
    time: new Date(Date.now() + 60 * 60 * 1000), // +1h
    institution: "Greenwood University",
    genderPref: "female",
    seatsAvailable: 2,
    totalSeats: 4,
    driverName: "Alice W.",
    verificationLevel: "verified",
  },
  {
    id: "b2",
    time: new Date(Date.now() + 2.3 * 60 * 60 * 1000), // +2h20m
    institution: "Central College",
    genderPref: "any",
    seatsAvailable: 1,
    totalSeats: 3,
    driverName: "Brian P.",
    verificationLevel: "verified",
  },
  {
    id: "c3",
    time: new Date(Date.now() + 4.4 * 60 * 60 * 1000), // +4h25m
    institution: "Greenwood University",
    genderPref: "any",
    seatsAvailable: 0,
    totalSeats: 4,
    driverName: "Priya S.",
    verificationLevel: "verified",
  },
  {
    id: "d4",
    time: new Date(Date.now() + 5.9 * 60 * 60 * 1000),
    institution: "City Business School",
    genderPref: "female",
    seatsAvailable: 3,
    totalSeats: 4,
    driverName: "Fatima H.",
    verificationLevel: "verified",
  },
  {
    id: "e5",
    time: new Date(Date.now() + 9 * 60 * 60 * 1000),
    institution: "Central College",
    genderPref: "any",
    seatsAvailable: 2,
    totalSeats: 3,
    driverName: "Robin T.",
    verificationLevel: "verified",
  },
];

/**
 * Utility to get unique list of institutions.
 */
function getInstitutions(rides) {
  const unique = Array.from(new Set(rides.map((r) => r.institution)));
  unique.sort();
  return unique;
}

export default function RideDiscovery() {
  const [selectedInstitution, setSelectedInstitution] = useState("All");
  const [rides, setRides] = useState(MOCK_RIDES);

  // Pickup & Destination state
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  // For demonstration, pinning address via map is a placeholder (not interactive)
  // Would use lat/lng and address resolution in real implementation

  const institutions = ["All", ...getInstitutions(rides)];

  const filteredRides =
    selectedInstitution === "All"
      ? rides
      : rides.filter((r) => r.institution === selectedInstitution);

  // PUBLIC_INTERFACE
  function handleBook(ride) {
    // In a real app, open details/modal or perform booking; here show an alert
    window.alert(
      `You've requested to join this ride:

• Institution: ${ride.institution}
• Driver: ${ride.driverName}
• Departure: ${new Date(
        ride.time
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}

A confirmation will be sent (mock).`
    );
  }

  // UI minimalist filter bar, Pickup/Destination inputs, card grid, empty state if none
  return (
    <div style={{ paddingTop: 16, paddingBottom: 28, maxWidth: 480, margin: "0 auto" }}>
      {/* Pickup/Destination input section */}
      <section
        className="card"
        aria-label="Pickup and Destination Entry"
        style={{
          margin: "0 0 18px 0",
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 14px rgba(0,119,182,0.06)",
          border: "1.5px solid var(--color-border)",
          padding: "22px 14px 22px 14px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 17, color: "var(--color-primary)", marginBottom: 5, display: "flex", gap: 8, alignItems: "center" }}>
          <span role="img" aria-label="car" style={{ fontSize: 18, marginRight: 1 }}>🚗</span>
          Enter Pickup & Destination
        </div>
        {/* Input fields & map placeholder, minimalistic UI */}
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {/* Pickup Field with icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 2,
            background: "#f8fafb",
            borderRadius: 8,
            border: "1.35px solid var(--color-border)",
            padding: "2px 0"
          }}>
            <span
              aria-label="pickup icon"
              style={{
                background: "#ecfcf7",
                color: "var(--color-accent)",
                borderRadius: 10,
                padding: "6px 8px 5px",
                fontSize: 22,
                display: "inline-flex",
                marginLeft: 6,
                marginRight: 2
              }}
              role="img"
            >
              ⬆️
            </span>
            <div style={{ flex: 1 }}>
              <label
                htmlFor="pickup-address"
                style={{
                  fontSize: 13.7,
                  color: "var(--color-text-secondary)",
                  fontWeight: 600,
                  marginBottom: 1,
                  letterSpacing: "0.2px",
                  display: "block"
                }}
              >
                Pickup
              </label>
              <input
                id="pickup-address"
                type="text"
                className="input"
                placeholder="Enter pickup address or drop a pin"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  fontSize: "1.06rem",
                  border: "none",
                  borderRadius: 7,
                  background: "none",
                  color: "var(--color-text-primary)"
                }}
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                autoComplete="off"
                autoFocus
              />
            </div>
            {/* Future: pin button on map */}
            <span
              aria-label="map pin placeholder"
              style={{
                color: "#00A896",
                marginRight: 13,
                marginLeft: 4,
                fontSize: 22,
                opacity: 0.86
              }}
              role="img"
              title="Pin on map (coming soon)"
            >
              📍
            </span>
          </div>
          {/* Destination Field with icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 2,
            background: "#f8fafb",
            borderRadius: 8,
            border: "1.35px solid var(--color-border)",
            padding: "2px 0"
          }}>
            <span
              aria-label="destination icon"
              style={{
                background: "#e3f3ff",
                color: "var(--color-primary)",
                borderRadius: 10,
                padding: "6px 8px 5px",
                fontSize: 22,
                display: "inline-flex",
                marginLeft: 6,
                marginRight: 2
              }}
              role="img"
            >
              ⬇️
            </span>
            <div style={{ flex: 1 }}>
              <label
                htmlFor="dest-address"
                style={{
                  fontSize: 13.7,
                  color: "var(--color-text-secondary)",
                  fontWeight: 600,
                  marginBottom: 1,
                  letterSpacing: "0.2px",
                  display: "block"
                }}
              >
                Destination
              </label>
              <input
                id="dest-address"
                type="text"
                className="input"
                placeholder="Enter destination address or drop a pin"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  fontSize: "1.06rem",
                  border: "none",
                  borderRadius: 7,
                  background: "none",
                  color: "var(--color-text-primary)"
                }}
                value={destination}
                onChange={e => setDestination(e.target.value)}
                autoComplete="off"
              />
            </div>
            {/* Future: pin button on map */}
            <span
              aria-label="map pin placeholder"
              style={{
                color: "#0077B6",
                marginRight: 13,
                marginLeft: 4,
                fontSize: 22,
                opacity: 0.86
              }}
              role="img"
              title="Pin on map (coming soon)"
            >
              📍
            </span>
          </div>
          {/* Map placeholder: future enhancement */}
          <div
            style={{
              background: "linear-gradient(90deg, #e3f3ff 65%, #e0faf7 99%)",
              border: "1.3px dashed var(--color-accent)",
              borderRadius: 14,
              minHeight: 74,
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#90bda1",
              fontWeight: 600,
              fontSize: 14.7,
            }}
            aria-label="Map location picker (placeholder)"
          >
            <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 9 }}>
              <span role="img" aria-label="location pin" style={{ fontSize: 23, marginRight: 6 }}>🗺️</span>
              Pick location on map (coming soon)
              <span style={{ color: "var(--color-muted)", fontWeight: 500, fontSize: 13, marginLeft: 8 }}>
                (Map support coming soon)
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div
        role="region"
        aria-label="Ride Pool Filters"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
          marginTop: 5,
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <label
          htmlFor="inst-filter"
          className="description"
          style={{
            fontWeight: 600,
            fontSize: "1.01em",
            color: "var(--color-text-secondary)",
            marginRight: 7,
          }}
        >
          Institution:
        </label>
        <select
          id="inst-filter"
          style={{
            fontSize: "1.04em",
            border: "1.3px solid var(--color-border)",
            borderRadius: 7,
            padding: "7px 16px 7px 11px",
            background: "#f8fafb",
            color: "var(--color-text-primary)",
            outline: "none",
            fontWeight: 500,
            transition: "border 0.14s",
          }}
          value={selectedInstitution}
          onChange={(e) => setSelectedInstitution(e.target.value)}
        >
          {institutions.map((inst) => (
            <option value={inst} key={inst}>
              {inst}
            </option>
          ))}
        </select>
        {/* In future: gender filter, time filter */}
      </div>

      {/* List of available ride pools */}
      {filteredRides.length === 0 ? (
        <div
          className="description"
          style={{
            marginTop: 38,
            color: "var(--color-muted)",
            textAlign: "center",
            fontSize: "1.09em",
          }}
        >
          No ride pools found for this filter.<br />
          Try another institution or check back soon!
        </div>
      ) : (
        filteredRides.map((ride) => (
          <RideDetailsCard key={ride.id} ride={ride} onBook={handleBook} />
        ))
      )}
    </div>
  );
}
