import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Eco Score screen for TrustRide –
 * Modern minimalist container, rounded cards, eco metrics and leaderboard stubs.
 */
const EcoScoreScreen = () => (
  <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
    <header>
      <h2 className="heading-1" style={{ marginBottom: 2 }}>Eco Score</h2>
      <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
        Track your positive environmental impact through shared rides.
      </p>
    </header>
    <section className="rounded-card" style={{ marginBottom: 24, textAlign: 'center' }}>
      <span role="img" aria-label="Leaf" style={{ fontSize: 38, display: 'block', marginBottom: 7 }}>🌱</span>
      <div className="heading-2" style={{ marginBottom: 6 }}>Your Carbon Savings</div>
      <div style={{ fontWeight: 700, fontSize: 25, color: 'var(--accent)', marginBottom: 10 }}>
        0 kg CO₂ saved
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic' }}>
        Ride more to improve your eco rank!
      </div>
    </section>
    <section className="rounded-card" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span role="img" aria-label="Leaderboard" style={{ fontSize: 24, marginRight: 10 }}>🏆</span>
        <span className="heading-2">Eco Leaderboard</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic', marginTop: 8 }}>
        Rankings for top eco-savers at your institution will show here.
      </div>
    </section>
  </div>
);

export default EcoScoreScreen;
