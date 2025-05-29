import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Trust & Safety screen for TrustRide –
 * Modern minimalist safety dashboard with rounded cards, emergency, and tracking stubs.
 * Key features visually demarcated by separated cards.
 */
const TrustSafetyScreen = () => (
  <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
    <header>
      <h2 className="heading-1" style={{ marginBottom: 2 }}>Trust & Safety</h2>
      <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
        Access real-time guardian tracking and safety tools for every ride.
      </p>
    </header>
    {/* Buddy Tracker stub */}
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
    {/* Emergency Tools section */}
    <section className="rounded-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span role="img" aria-label="Emergency" style={{ fontSize: 26, marginRight: 10 }}>🆘</span>
        <span className="heading-2">Emergency Tools</span>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 10,
        marginTop: 8
      }}>
        {/* Placeholder for SOS Button */}
        <button className="btn" style={{
          borderRadius: 32,
          background: 'var(--accent)',
          fontSize: 17,
          fontWeight: 700,
          padding: '10px 30px',
        }}>
          SOS
        </button>
        <span style={{
          color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic'
        }}>
          Safety features will be enabled before launch.
        </span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        <span style={{ fontWeight: 600 }}>SOS button</span> and fast safety response for your peace of mind.
      </div>
    </section>
    {/* Trust Index area */}
    <section className="rounded-card" style={{ marginBottom: 8 }}>
      <span role="img" aria-label="Shield" style={{ fontSize: 20, marginRight: 6 }}>🛡️</span>
      <span className="heading-2" style={{ fontSize: 17 }}>Trust Index (Beta)</span>
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: 15,
        marginTop: 6,
        border: '1px dashed var(--accent)',
        padding: '7px 0 7px 10px',
        borderRadius: 9,
        background: 'rgba(0,119,182,0.03)',
        marginTop: 13
      }}>
        Reliability and community rating score will appear here.
      </div>
    </section>
  </div>
);

export default TrustSafetyScreen;
