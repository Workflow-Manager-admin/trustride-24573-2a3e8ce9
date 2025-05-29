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

  // UI minimalist filter bar, card grid, empty state if none
  return (
    <div style={{ paddingTop: 16, paddingBottom: 28 }}>
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
