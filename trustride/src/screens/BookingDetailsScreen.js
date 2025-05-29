import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * BookingDetailsScreen — gather pickup/destination, simulate ride search for selected mode, and show mock ride options.
 * 
 * Props (preferred):
 *   - transportMode: {icon, label} (from navigation state or prop)
 * 
 * If transportMode is not present as a prop, can fallback to navigation location.state.
 */
const MOCK_RIDES = {
  Bike: [
    { id: 1, driver: 'Rahul S.', price: 20, eta: 3 },
    { id: 2, driver: 'Anu M.', price: 18, eta: 5 }
  ],
  'Mini Cab': [
    { id: 3, driver: 'Ravi K.', price: 55, eta: 4 },
    { id: 4, driver: 'Pooja T.', price: 62, eta: 8 }
  ],
  'Prime Cab': [
    { id: 5, driver: 'Mayank J.', price: 80, eta: 2 },
    { id: 6, driver: 'Sneha D.', price: 90, eta: 6 }
  ],
  Auto: [
    { id: 7, driver: 'Govind A.', price: 30, eta: 4 },
    { id: 8, driver: 'Sunita G.', price: 27, eta: 7 }
  ]
};

function getIcon(mode) {
  switch (mode) {
    case 'Bike': return '🚲';
    case 'Mini Cab': return '🚕';
    case 'Prime Cab': return '🚖';
    case 'Auto': return '🛺';
    default: return '🚘';
  }
}

// PUBLIC_INTERFACE
function BookingDetailsScreen(props) {
  // Support both prop and navigation state for transportMode
  let transportMode = props.transportMode;
  if (!transportMode && window.history.state?.usr?.transportMode) {
    // react-router-dom v6 location.state as window.history.state.usr
    transportMode = window.history.state.usr.transportMode;
  }

  const modeLabel = transportMode?.label || transportMode || "Ride";
  const modeIcon = transportMode?.icon || getIcon(modeLabel);

  const [pickup, setPickup] = useState('');
  const [dest, setDest] = useState('');
  const [loading, setLoading] = useState(false);
  const [rides, setRides] = useState(null); // null = no search yet; array = results

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    if (!pickup.trim() || !dest.trim()) return;
    setLoading(true);
    setRides(null);
    // Simulate async "search"
    setTimeout(() => {
      // Use mocked rides for selected mode
      setRides(MOCK_RIDES[modeLabel] ? [...MOCK_RIDES[modeLabel]] : []);
      setLoading(false);
    }, 1100);
  }

  return (
    <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
      <section className="rounded-card" style={{ maxWidth: 440, margin: '24px auto 22px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 10 }}>
          <span role="img" style={{ fontSize: 32 }}>{modeIcon}</span>
          <span className="heading-1" style={{ fontSize: 26, margin: 0 }}>{modeLabel} — Booking</span>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15, margin: '17px 0' }}>
          <div>
            <label htmlFor="pickup" style={{ fontWeight: 600, fontSize: 15 }}>Pickup Location</label>
            <input
              type="text"
              id="pickup"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              placeholder="Enter pickup point"
              required
              style={{
                marginTop: 5,
                width: '100%',
                padding: '10px 13px',
                border: '1px solid var(--border-color)',
                borderRadius: 9,
                fontSize: 15.3,
                background: 'var(--background)',
              }}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="dest" style={{ fontWeight: 600, fontSize: 15 }}>Destination</label>
            <input
              type="text"
              id="dest"
              value={dest}
              onChange={e => setDest(e.target.value)}
              placeholder="Enter your destination"
              required
              style={{
                marginTop: 5,
                width: '100%',
                padding: '10px 13px',
                border: '1px solid var(--border-color)',
                borderRadius: 9,
                fontSize: 15.3,
                background: 'var(--background)',
              }}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="btn btn-large"
            style={{
              fontWeight: 600,
              fontSize: 15.8,
              borderRadius: 22,
              marginTop: 10,
              minWidth: 130,
              background: pickup.trim() && dest.trim() ? undefined : "#bbb",
              cursor: pickup.trim() && dest.trim() ? "pointer" : "not-allowed",
              opacity: pickup.trim() && dest.trim() ? 1 : 0.7,
            }}
            disabled={!pickup.trim() || !dest.trim() || loading}
          >
            {loading ? "Searching..." : "Find Rides"}
          </button>
        </form>
      </section>
      <section className="rounded-card" style={{ maxWidth: 560, margin: '0 auto', minHeight: 80 }}>
        <h3 className="heading-2" style={{ marginTop: 0, marginBottom: 10, fontSize: 19 }}>
          Ride Options
        </h3>
        {!rides && !loading && (
          <div style={{ color: "var(--text-secondary)", fontStyle: "italic", fontSize: 15.5 }}>
            Enter pickup and destination to see available rides.
          </div>
        )}
        {loading && (
          <div style={{ color: "var(--accent)", fontWeight: 600, margin: "8px 0", fontSize: 16 }}>
            Searching for rides near {pickup || 'your pickup'}...
          </div>
        )}
        {rides && !rides.length && (
          <div style={{
            color: "#c00",
            fontWeight: 600,
            margin: "12px 0 4px 0",
            fontSize: 15.5,
          }}>
            No rides found near {pickup}! Try another pickup location.
          </div>
        )}
        {rides && rides.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {rides.map(ride => (
              <div
                key={ride.id}
                style={{
                  background: 'rgba(0,168,150,0.07)',
                  border: '1.5px solid var(--accent)',
                  borderRadius: 13,
                  padding: '15px 13px 10px 13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  boxShadow: '0 2px 8px rgba(0,168,150,0.08)'
                }}
              >
                <div style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: 13,
                  width: 42,
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 25,
                  fontWeight: 700,
                }}>{modeIcon}</div>
                <div style={{ flex: 1, minWidth: 80 }}>
                  <div style={{ fontWeight: 700, fontSize: 16.1 }}>{ride.driver}</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 2 }}>
                    ETA: {ride.eta} min • <span style={{ color: 'var(--primary)' }}>₹{ride.price}</span>
                  </div>
                  <div style={{ color: 'var(--accent)', fontSize: 13.5, marginTop: 2 }}>Pickup: {pickup || 'N/A'}</div>
                  <div style={{ color: 'var(--primary)', fontSize: 13.5 }}>Destination: {dest || 'N/A'}</div>
                </div>
                <button
                  className="btn"
                  style={{
                    padding: '8px 12px',
                    fontSize: 14,
                    borderRadius: 11,
                    minWidth: 44,
                  }}
                  disabled
                  title="(Booking only in next milestone)"
                >Book</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BookingDetailsScreen;
