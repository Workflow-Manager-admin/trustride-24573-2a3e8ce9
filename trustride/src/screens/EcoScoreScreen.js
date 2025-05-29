import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Eco Score screen for TrustRide –
 * Minimalist container with rounded cards, eco metrics, leaderboard stubs, all visually demarcated.
 * Now: leaderboard and eco-impact sections are clickable with informative modals for future expansion.
 */
const EcoScoreScreen = () => {
  const [modal, setModal] = useState(null); // 'eco', 'leaderboard'

  // Modal rendering
  const renderModal = () => {
    if (!modal) return null;
    let title = '';
    let desc = '';
    let emoji = '';
    if (modal === 'eco') {
      emoji = '🌱';
      title = 'Eco Impact Details';
      desc = 'Track detailed statistics of your carbon footprint—see your CO₂ savings by ride, and visualize your contributions. This section will soon let you explore your eco history and personalized suggestions for greater impact!';
    } else if (modal === 'leaderboard') {
      emoji = '🏆';
      title = 'Eco Leaderboard';
      desc = 'Compete with friends and your institution’s best eco-riders! The leaderboard will highlight the top carbon-savers at your organization, with badges and rewards coming soon. Stay tuned!';
    }
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,40,58,0.18)',
          zIndex: 4000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 18,
            minWidth: 290,
            maxWidth: '94vw',
            boxShadow: '0 6px 40px rgba(0,119,182, 0.12)',
            padding: '2.1rem 1.4rem 1.2rem 1.4rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
          <span style={{ fontSize: 44, marginBottom: 11 }}>{emoji}</span>
          <div className="heading-2" style={{ fontWeight: 700, fontSize: '1.31rem', marginBottom: 8 }}>{title}</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center', fontSize: 16 }}>
            {desc}
          </div>
          <button
            className="btn"
            style={{ borderRadius: 32, padding: '11px 32px', fontSize: 15 }}
            onClick={() => setModal(null)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
      {renderModal()}
      <header>
        <h2 className="heading-1" style={{ marginBottom: 2 }}>Eco Score</h2>
        <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
          Track your positive environmental impact through shared rides.
        </p>
      </header>
      {/* Eco-impact Section: clickable */}
      <section
        className="rounded-card"
        style={{
          marginBottom: 24,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'box-shadow .14s',
        }}
        tabIndex={0}
        onClick={() => setModal('eco')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModal('eco')}
        aria-label="See eco impact details (coming soon)"
      >
        <span role="img" aria-label="Leaf" style={{ fontSize: 38, display: 'block', marginBottom: 7 }}>🌱</span>
        <div className="heading-2" style={{ marginBottom: 6 }}>Your Carbon Savings</div>
        {/* Placeholder for CO₂ metric */}
        <div style={{ fontWeight: 700, fontSize: 25, color: 'var(--accent)', marginBottom: 10 }}>
          0 kg CO₂ saved
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic' }}>
          Ride more to improve your eco rank!
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--accent)',
            marginTop: 6,
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
          }}
        >
          Tap for details
        </div>
      </section>
      {/* Leaderboard Section: clickable */}
      <section
        className="rounded-card"
        style={{ marginBottom: 16, cursor: 'pointer', transition: 'box-shadow .14s' }}
        tabIndex={0}
        onClick={() => setModal('leaderboard')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModal('leaderboard')}
        aria-label="View eco leaderboard (coming soon)"
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span role="img" aria-label="Leaderboard" style={{ fontSize: 24, marginRight: 10 }}>🏆</span>
          <span className="heading-2">Eco Leaderboard</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic', marginTop: 8 }}>
          Rankings for top eco-savers at your institution will show here.
        </div>
        <div style={{
          border: '1px dashed var(--accent)',
          borderRadius: '10px',
          padding: '10px 5px',
          textAlign: 'center',
          marginTop: 12,
          color: 'var(--text-secondary)',
          fontSize: 15
        }}>
          Leaderboard placeholder – coming soon!
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--accent)',
            marginTop: 7,
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
          }}
        >
          Tap for leaderboard
        </div>
      </section>
    </div>
  );
};

export default EcoScoreScreen;
