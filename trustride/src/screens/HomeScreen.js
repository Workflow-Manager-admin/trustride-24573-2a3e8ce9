import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Main Home screen for TrustRide app –
 * Ride Discovery & Pooling container with rounded cards and minimalist, modern design,
 * now stubbing key areas: login, ride search, and discovery controls.
 */
const HomeScreen = () => (
  <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
    <header>
      <h2 className="heading-1" style={{ marginBottom: 2 }}>Discover Rides</h2>
      <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
        Find and share rides with your trusted community.
      </p>
    </header>

    {/* Placeholder for login (for unauthenticated session) */}
    <section className="rounded-card" style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
      <span role="img" aria-label="login" style={{ fontSize: 28, marginRight: 12 }}>🔑</span>
      <div>
        <div className="heading-2" style={{ marginBottom: 2 }}>Welcome to TrustRide</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic' }}>
          Sign in with your institution email to start pooling rides.
        </div>
        <button className="btn" style={{ marginTop: 10, minWidth: 120, fontSize: 15, borderRadius: '22px' }}>
          Login / Sign Up
        </button>
      </div>
    </section>

    <section className="rounded-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span role="img" aria-label="Search" style={{ fontSize: 26, marginRight: 10 }}>🔎</span>
        <span className="heading-2">Search for a Ride</span>
      </div>
      <p className="description" style={{ marginBottom: 12 }}>
        Quickly find matching ride pools by date, time, institution or preferences.
      </p>
      {/* Placeholder for future filter/search UI */}
      <div
        style={{
          background: 'rgba(0,168,150,0.06)',
          borderRadius: '9px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          fontSize: 15,
          fontStyle: 'italic',
        }}>
        Ride search and filter UI coming soon!
      </div>
    </section>

    <section className="rounded-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span role="img" aria-label="Ride list" style={{ fontSize: 26, marginRight: 10 }}>🚌</span>
        <span className="heading-2">Available Ride Pools</span>
      </div>
      {/* Placeholder: Mock list of ride cards */}
      <div style={{
        border: '1px dashed var(--accent)',
        borderRadius: 14,
        padding: '14px',
        color: 'var(--text-secondary)',
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',
        background: 'rgba(0,119,182,0.025)'
      }}>
        No ride pools yet. Be the first to offer or join a ride!
      </div>
    </section>
  </div>
);

export default HomeScreen;
