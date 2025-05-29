import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Trust & Safety screen for TrustRide –
 * Modern minimalist safety dashboard with rounded cards, emergency, and tracking stubs.
 */
const TrustSafetyScreen = () => (
  <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
    <header>
      <h2 className="heading-1" style={{ marginBottom: 2 }}>Trust & Safety</h2>
      <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
        Access real-time guardian tracking and safety tools for every ride.
      </p>
    </header>
    <section className="rounded-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span role="img" aria-label="Tracking" style={{ fontSize: 26, marginRight: 10 }}>👁️</span>
        <span className="heading-2">Buddy Tracker</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        Let guardians follow your ride progress securely.<br />
        <span style={{ fontStyle: 'italic' }}>Live ride-tracking coming soon.</span>
      </div>
    </section>
    <section className="rounded-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span role="img" aria-label="Emergency" style={{ fontSize: 26, marginRight: 10 }}>🆘</span>
        <span className="heading-2">Emergency Tools</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        <span style={{ fontWeight: 600 }}>SOS button</span> and fast safety response for your peace of mind.<br />
        <span style={{ fontStyle: 'italic' }}>Safety features will be enabled before launch.</span>
      </div>
    </section>
    <section className="rounded-card" style={{ marginBottom: 8 }}>
      <span role="img" aria-label="Shield" style={{ fontSize: 18, marginRight: 6 }}>🛡️</span>
      <span className="heading-2" style={{ fontSize: 17 }}>Trust Index (Beta)</span>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 6 }}>
        Reliability and community rating score will appear here.
      </div>
    </section>
  </div>
);

export default TrustSafetyScreen;
