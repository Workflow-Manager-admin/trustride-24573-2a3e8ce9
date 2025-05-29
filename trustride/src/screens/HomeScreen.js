import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Main Home screen for TrustRide app –
 * Ride Discovery & Pooling container with rounded cards and minimalist, modern design.
 */
const HomeScreen = () => (
  <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
    <header>
      <h2 className="heading-1" style={{ marginBottom: 2 }}>Discover Rides</h2>
      <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
        Find and share rides with your trusted community.
      </p>
    </header>
    <section className="rounded-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span role="img" aria-label="Search" style={{ fontSize: 26, marginRight: 10 }}>🔎</span>
        <span className="heading-2">Search for a ride</span>
      </div>
      <p className="description">
        Quickly find matching ride pools by date, time, institution or preferences here.
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
          marginTop: 8,
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
      <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic', marginTop: 10 }}>
        No ride pools yet. Be the first to offer or join a ride!
      </div>
    </section>
  </div>
);

export default HomeScreen;
