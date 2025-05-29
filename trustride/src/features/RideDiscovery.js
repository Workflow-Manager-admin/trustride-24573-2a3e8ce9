import React, { useState } from "react";
import RideDetailsCard from "./RideDetailsCard";

/* MapPicker: Minimalist, brand-aligned static mock map component for pinning Pickup/Destination.
   API: 
      - onLocationChange({ type: "pickup"|"destination", lat, lng, address })
      - Expects current positions via props.
      - Click map to place/move pin.
*/
function MapPicker({
  pickupLatLng,
  destLatLng,
  onLocationChange,
  style = {},
}) {
  // Internal for simulating draggable markers
  const [activePin, setActivePin] = useState(null); // "pickup" | "destination" | null

  // Mock: Center, bounds, and display element style (not actual geocoordinates)
  const MAP_WIDTH = 340, MAP_HEIGHT = 170;
  // Center of the "map"
  const CENTER = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 + 6 };
  // Pin positions in component coords: default, else use state/props
  const pickupXY = pickupLatLng
    ? {
        x: pickupLatLng._mockX ?? MAP_WIDTH / 3.2,
        y: pickupLatLng._mockY ?? MAP_HEIGHT / 2.6,
      }
    : { x: MAP_WIDTH / 3.2, y: MAP_HEIGHT / 2.6 };
  const destXY = destLatLng
    ? {
        x: destLatLng._mockX ?? (MAP_WIDTH * 2.2) / 3,
        y: destLatLng._mockY ?? (MAP_HEIGHT * 2) / 3 + 10,
      }
    : { x: (MAP_WIDTH * 2.2) / 3, y: (MAP_HEIGHT * 2) / 3 + 10 };

  // Handles placing or moving a pin on click
  function handleMapClick(e) {
    // Place whichever pin is active; default to pickup if none
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    if (activePin === "pickup" || (!activePin && !pickupLatLng)) {
      onLocationChange?.({
        type: "pickup",
        lat: 37.77 + (x - CENTER.x) * 0.0006,
        lng: -122.4 + (y - CENTER.y) * 0.0006,
        address: "", // Could reverse geocode
        _mockX: x,
        _mockY: y,
      });
    } else if (activePin === "destination" || (!activePin && !destLatLng)) {
      onLocationChange?.({
        type: "destination",
        lat: 37.78 + (x - CENTER.x) * 0.0006,
        lng: -122.38 + (y - CENTER.y) * 0.0006,
        address: "",
        _mockX: x,
        _mockY: y,
      });
    }
  }

  // UI: Minimal "map" mock with two possible draggable pins; map is non-real but visually matches style.
  return (
    <div
      aria-label="Map picker for selecting pickup/destination"
      style={{
        ...style,
        border: "1.3px solid var(--color-accent)",
        borderRadius: 14,
        overflow: "hidden",
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        background: "linear-gradient(120deg, #e3f3ff 65%, #e0faf7 99%)",
        boxShadow: "0 1px 9px rgba(0,168,150,0.07)",
        position: "relative",
        margin: "0 auto 0 0",
        cursor: "crosshair",
        userSelect: "none"
      }}
      onClick={handleMapClick}
      tabIndex={0}
    >
      {/* Mock geography - muted grid lines */}
      <svg
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity: 0.18,
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#d7f5f3" />
        {[1, 2, 3, 4].map((ix) => (
          <line
            key={"vl" + ix}
            x1={ix * MAP_WIDTH / 5}
            y1={0}
            x2={ix * MAP_WIDTH / 5}
            y2={MAP_HEIGHT}
            stroke="#8ad2cd"
            strokeDasharray="6,3"
            strokeWidth="1.2"
          />
        ))}
        {[1, 2].map((iy) => (
          <line
            key={"hl" + iy}
            y1={iy * MAP_HEIGHT / 3}
            x1={0}
            y2={iy * MAP_HEIGHT / 3}
            x2={MAP_WIDTH}
            stroke="#8ad2cd"
            strokeDasharray="8,3"
            strokeWidth="1"
          />
        ))}
      </svg>
      {/* Pins: Pickup (green), Destination (blue). Order: dest under pickup. */}
      {/* Destination pin */}
      <Pin
        label="Destination"
        color="var(--color-primary)"
        bg="#e3f3ff"
        xy={destXY}
        active={activePin === "destination"}
        onClick={e => {
          e.stopPropagation();
          setActivePin("destination");
        }}
      />
      {/* Pickup pin */}
      <Pin
        label="Pickup"
        color="var(--color-accent)"
        bg="#ecfcf7"
        xy={pickupXY}
        active={activePin === "pickup"}
        onClick={e => {
          e.stopPropagation();
          setActivePin("pickup");
        }}
      />
      {/* Legend and instructions (bottom right, minimalist) */}
      <div
        style={{
          position: "absolute",
          right: 12,
          bottom: 4,
          fontSize: 13.5,
          color: "var(--color-text-secondary)",
          background: "rgba(255,255,255,0.85)",
          borderRadius: 8,
          padding: "1.5px 9px",
          fontWeight: 500,
          zIndex: 99,
        }}
      >
        <span
          style={{
            color: "var(--color-accent)",
            marginRight: 3,
            fontWeight: 700,
          }}
        >
          •
        </span>
        Pickup
        <span
          style={{
            margin: "0 7px 0 10px",
            color: "#00A896",
            fontSize: 11.5,
          }}
        >
          |
        </span>
        <span
          style={{
            color: "var(--color-primary)",
            marginRight: 3,
            fontWeight: 700,
          }}
        >
          •
        </span>
        Destination
      </div>
      <div
        style={{
          position: "absolute",
          left: 7,
          bottom: 7,
          fontSize: 13.1,
          color: "#90bda1",
          fontWeight: 600,
          zIndex: 99,
          opacity: 0.8
        }}
      >
        Click to move active pin
      </div>
    </div>
  );
}

// Pin: visual for either pickup/destination in the mock map
function Pin({ label, color, bg, xy, active, onClick }) {
  return (
    <button
      style={{
        position: "absolute",
        left: xy.x - 18,
        top: xy.y - 32,
        width: 36,
        height: 42,
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        outline: "none",
        cursor: "pointer",
        zIndex: 10,
      }}
      aria-label={`Move ${label} pin`}
      tabIndex={0}
      onClick={onClick}
    >
      <span
        style={{
          display: "inline-block",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: bg,
          border: `2.5px solid ${color}`,
          boxShadow: active
            ? `0 0 0 2.5px ${color}44`
            : "0 2.5px 12px #b1dfcd80",
          fontSize: 22,
          color,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: "36px",
          transition: "box-shadow 0.18s",
        }}
      >
        {label === "Pickup" ? "⬆️" : "⬇️"}
      </span>
      {/* Small caption for accessibility */}
      <div
        style={{
          marginTop: -1,
          fontSize: 11.1,
          color: color,
          fontWeight: 600,
          background: "none",
          textShadow: "0 1px 2px #fff, 0 0px 1px #ddd",
          opacity: active ? 1 : 0.65,
        }}
      >
        {label}
      </div>
    </button>
  );
}

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

  // Pickup & Destination state (now enhanced for map pin support)
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  // Store pin mock map states: {lat, lng, address, _mockX, _mockY}
  const [pickupLatLng, setPickupLatLng] = useState(undefined);
  const [destLatLng, setDestLatLng] = useState(undefined);

  // Commonly visited/used addresses (in real app: fetched/tracked; here: mock)
  const COMMON_LOCATIONS = [
    { label: "Campus", address: "Greenwood University Hostel Gate" },
    { label: "Office", address: "Downtown Tech Park, Block B" },
    { label: "Hostel", address: "Sunrise Hostel, West Wing" },
    { label: "Library", address: "Central City Library" },
  ];
  // Simple in-memory 'recent' demo; in real app, would persist
  const [recentAddresses, setRecentAddresses] = useState([
    "City Center Plaza",
    "Greenwood Sports Complex",
    "Main Bus Stand",
  ]);

  // Add address to recent (called after user sets one as pickup/dest)
  function addRecentAddress(addr) {
    if (!addr || recentAddresses.includes(addr)) return;
    setRecentAddresses((prev) => [
      addr,
      ...prev.slice(0, 3).filter((a) => a !== addr)
    ]);
  }

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

  // Handle MapPicker location updates
  function handleMapLocationChange(loc) {
    if (loc.type === "pickup") {
      setPickupLatLng(loc);
      setPickup(""); // Could trigger reverse-geocode for address string
    } else if (loc.type === "destination") {
      setDestLatLng(loc);
      setDestination("");
    }
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
          gap: 8, // slightly less vertical gap for a tighter look w/ suggestions
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 17, color: "var(--color-primary)", marginBottom: 5, display: "flex", gap: 8, alignItems: "center" }}>
          <span role="img" aria-label="car" style={{ fontSize: 18, marginRight: 1 }}>🚗</span>
          Enter Pickup & Destination
        </div>

        {/* SUGGESTION CHIPS UI */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 9,
            marginBottom: 7,
            marginTop: 4,
          }}
          aria-label="Common location suggestions"
        >
          {COMMON_LOCATIONS.map(loc => (
            <button
              key={loc.label}
              className="tr-chip"
              type="button"
              style={{
                background: "linear-gradient(90deg, #e3f3ff, #ecfcf7 99%)",
                color: "var(--color-accent)",
                border: "1.1px solid var(--color-border)",
                borderRadius: 17,
                fontWeight: 670,
                fontSize: 14.2,
                padding: "6px 17px",
                marginRight: 0,
                outline: "none",
                cursor: "pointer",
                boxShadow: "0 1.7px 7px rgba(0,168,150,0.03)",
                letterSpacing: "-0.06px",
                lineHeight: 1,
                transition: "background 0.13s",
              }}
              onClick={() => {
                setPickup(loc.address);
                addRecentAddress(loc.address);
              }}
              tabIndex={0}
              aria-label={`Set pickup: ${loc.label}`}
            >
              {loc.label}
            </button>
          ))}
          {recentAddresses.length > 0 &&
            recentAddresses.map(addr => (
              <button
                key={addr}
                className="tr-chip"
                type="button"
                style={{
                  background: "linear-gradient(90deg, #ecfcf7 65%, #e3f3ff 99%)",
                  color: "var(--color-primary)",
                  border: "1.1px solid var(--color-border)",
                  borderRadius: 17,
                  fontWeight: 600,
                  fontSize: 13.5,
                  padding: "5px 13px",
                  marginRight: 0,
                  outline: "none",
                  cursor: "pointer",
                  opacity: 0.98,
                  lineHeight: 1,
                  marginLeft: 0,
                }}
                onClick={() => {
                  setDestination(addr);
                  addRecentAddress(addr);
                }}
                tabIndex={0}
                aria-label={`Set destination: ${addr}`}
                title="Recently used"
              >
                {addr.length < 22 ? addr : addr.slice(0, 20) + "…"}
              </button>
            ))
          }
        </div>

        {/* Input fields & integrated map mock, minimalist UI */}
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
            {/* Pin picker: active when clicking map or in future on this button */}
            <span
              aria-label="toggle pickup pin"
              style={{
                color: "#00A896",
                marginRight: 13,
                marginLeft: 4,
                fontSize: 22,
                opacity: 0.86,
                cursor: "pointer"
              }}
              role="img"
              title="Pin on map"
              tabIndex={0}
              onClick={() => {
                // In a real app, focus the pickup pin on the map
                document.activeElement.blur();
              }}
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
            {/* Pin picker: as with pickup */}
            <span
              aria-label="toggle destination pin"
              style={{
                color: "#0077B6",
                marginRight: 13,
                marginLeft: 4,
                fontSize: 22,
                opacity: 0.86,
                cursor: "pointer"
              }}
              role="img"
              title="Pin on map"
              tabIndex={0}
              onClick={() => {
                document.activeElement.blur();
              }}
            >
              📍
            </span>
          </div>
          {/* MapPicker (interactive) */}
          <div style={{ marginTop: 7, marginBottom: 2, display: "flex", justifyContent: "center" }}>
            <MapPicker
              pickupLatLng={pickupLatLng}
              destLatLng={destLatLng}
              onLocationChange={handleMapLocationChange}
            />
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
