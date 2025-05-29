import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * RideBookingScreen: Allows users to book rides by selecting a transportation mode (car, bike, minivan, etc.)
 * Minimalist card UI for each mode. Selected mode is highlighted, with confirmation shown.
 */
const TRANSPORT_MODES = [
  { icon: '🚘', label: 'Car' },
  { icon: '🚲', label: 'Bike' },
  { icon: '🚐', label: 'Minivan' },
  { icon: '🚌', label: 'Shuttle Bus' },
  { icon: '🛴', label: 'e-Scooter' },
  // Add more modes as needed
];

// PUBLIC_INTERFACE
function RideBookingScreen() {
  const [selected, setSelected] = useState(null);

  const handleSelect = idx => {
    setSelected(idx);
  };

  const selectedMode = selected !== null ? TRANSPORT_MODES[selected] : null;

  return (
    <div className="container" style={{ paddingTop: 90, paddingBottom: 70 }}>
      <section className="rounded-card" style={{ marginTop: 30, textAlign: 'center' }}>
        <h2 className="heading-1" style={{ marginBottom: 6 }}>
          Book Your Ride
        </h2>
        <div className="description" style={{ marginBottom: 16 }}>
          Choose your preferred transportation mode below.
        </div>
        <div style={{
          display: "flex",
          gap: 22,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "28px 0",
        }}>
          {TRANSPORT_MODES.map((mode, idx) => (
            <TransportModeCard
              key={mode.label}
              icon={mode.icon}
              label={mode.label}
              selected={selected === idx}
              onClick={() => handleSelect(idx)}
            />
          ))}
        </div>
        {selectedMode && (
          <div style={{
            marginTop: 18,
            color: "var(--accent)",
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: 1,
            background: 'rgba(0,168,150,0.06)',
            borderRadius: 14,
            padding: '11px 0',
          }}>
            <span style={{ fontSize: 22 }}>{selectedMode.icon}</span>
            {' '}
            You chose <span style={{ fontWeight: 700 }}>{selectedMode.label}</span>
          </div>
        )}
      </section>
    </div>
  );
}

// PUBLIC_INTERFACE
function TransportModeCard({ icon, label, selected, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className="rounded-card"
      style={{
        background: selected ? 'var(--accent)' : 'var(--card-bg)',
        color: selected ? '#fff' : 'var(--text-primary)',
        borderRadius: 16,
        minWidth: 88,
        minHeight: 92,
        maxWidth: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        cursor: 'pointer',
        boxShadow: selected ? '0 4px 18px rgba(0,168,150,0.11)' : 'var(--card-shadow)',
        border: selected ? '2.5px solid var(--accent)' : '1px solid var(--border-color)',
        fontWeight: 600,
        fontSize: 17.5,
        margin: 6,
        padding: 14,
        transition: 'box-shadow .17s, background .17s, border .17s',
        outline: selected ? '3px solid var(--accent)' : 'none',
      }}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span style={{
        fontSize: 13.5,
        color: selected ? '#fff' : 'var(--text-secondary)'
      }}>{label}</span>
    </button>
  );
}

export default RideBookingScreen;
