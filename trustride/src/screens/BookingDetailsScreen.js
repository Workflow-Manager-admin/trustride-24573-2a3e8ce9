import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * BookingDetailsScreen — gathers pickup/destination, renders selected mode, and lists mock available rides (incl. price).
 * Reads mode from navigation state or props.
 */
const MOCK_RIDES = {
  Bike: [
    { id: 1, driver: 'Rahul S.', price: 20, eta: 3 },
    { id: 2, driver: 'Anu M.', price: 18, eta: 5 },
  ],
  'Mini Cab': [
    { id: 3, driver: 'Ravi K.', price: 55, eta: 4 },
    { id: 4, driver: 'Pooja T.', price: 62, eta: 8 },
  ],
  'Prime Cab': [
    { id: 5, driver: 'Mayank J.', price: 80, eta: 2 },
    { id: 6, driver: 'Sneha D.', price: 90, eta: 6 },
  ],
  Auto: [
    { id: 7, driver: 'Govind A.', price: 30, eta: 4 },
    { id: 8, driver: 'Sunita G.', price: 27, eta: 7 },
  ],
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
  // Get transportMode from props (preferred), or from navigation state
  const location = useLocation();
  let transportMode = props.transportMode;
  if (!transportMode && location && location.state && location.state.transportMode) {
    transportMode = location.state.transportMode;
  }
  // Fallback for legacy access
  if (!transportMode && window.history.state?.usr?.transportMode) {
    transportMode = window.history.state.usr.transportMode;
  }

  // Normalize mode label/icon support
  const modeLabel = transportMode?.label || transportMode || "Ride";
  const modeIcon = transportMode?.icon || getIcon(modeLabel);

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [rides, setRides] = useState(null);
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  function handleSearch(e) {
    e.preventDefault();
    if (!pickup.trim() || !destination.trim()) return;
    setLoading(true);
    setRides(null);
    setTimeout(() => {
      setRides(MOCK_RIDES[modeLabel] ? [...MOCK_RIDES[modeLabel]] : []);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
      {/* Selected mode header */}
      <section className="rounded-card" style={{ maxWidth: 440, margin: '24px auto 22px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 10 }}>
          <span role="img" style={{ fontSize: 32 }}>{modeIcon}</span>
          <span className="heading-1" style={{ fontSize: 26, margin: 0 }}>{modeLabel} — Booking</span>
        </div>
        {/* Pickup/Dest Inputs & Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: 15, margin: '17px 0' }}>
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
            <label htmlFor="destination" style={{ fontWeight: 600, fontSize: 15 }}>Destination</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={e => setDestination(e.target.value)}
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
              background: pickup.trim() && destination.trim() ? undefined : "#bbb",
              cursor: pickup.trim() && destination.trim() ? "pointer" : "not-allowed",
              opacity: pickup.trim() && destination.trim() ? 1 : 0.7,
            }}
            disabled={!pickup.trim() || !destination.trim() || loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>
      {/* Ride Results */}
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
            Searching rides near <span style={{ fontWeight: 700 }}>{pickup || 'your pickup'}</span>...
          </div>
        )}
        {rides && rides.length === 0 && (
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
                  <div style={{ color: 'var(--primary)', fontSize: 13.5 }}>Destination: {destination || 'N/A'}</div>
                </div>
                <button
                  className="btn"
                  style={{
                    padding: '8px 12px',
                    fontSize: 14,
                    borderRadius: 11,
                    minWidth: 44,
                  }}
                  // On click, check if guardian contact is set (stub: always false), go to /add-guardian-contact with current booking data
                  onClick={() => {
                    // In a real app: check user/session state for guardian, or allow passing down.
                    // For now, always require prompt.
                    window.scrollTo(0,0); // UX: scroll to top
                    // Pass ride context via navigation state for next screen
                    const nav = require('react-router-dom').useNavigate?.() || null;
                    // Fallback for direct invocation if static analysis blocks import:
                    if (nav) {
                      nav('/add-guardian-contact', {
                        state: {
                          selectedRide: ride,
                          pickup,
                          destination,
                          mode: modeLabel,
                          modeIcon: modeIcon
                        }
                      });
                    } else {
                      window.location.href = '/add-guardian-contact'; // fallback, loses state
                    }
                  }}
                  title="Proceed to add guardian contact"
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
