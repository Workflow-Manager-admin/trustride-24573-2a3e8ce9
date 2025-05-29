import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Trust & Safety screen for TrustRide –
 * Modern minimalist safety dashboard with rounded cards, emergency, and tracking stubs.
 * Key features visually demarcated by separated cards.
 * SOS Button, Buddy Tracker, and Trust Index are now interactable with informative modals as placeholders.
 */
const TrustSafetyScreen = () => {
  const [modal, setModal] = useState(null); // 'sos', 'buddy', 'trust'

  // Modal rendering for placeholder feature info
  const renderModal = () => {
    if (!modal) return null;
    let title = '';
    let desc = '';
    let emoji = '';
    if (modal === 'sos') {
      emoji = '🆘';
      title = 'SOS Emergency';
      desc = "The SOS Emergency feature will let you instantly alert your guardians and university security in case of distress—even share your real-time ride location. Stay tuned for this safety-first update!";
    } else if (modal === 'buddy') {
      emoji = '👁️';
      title = 'Buddy Tracker';
      desc = "Soon, your selected guardians will be able to follow your ride’s progress in real time. Peace of mind is coming for you and those who care about you.";
    } else if (modal === 'trust') {
      emoji = '🛡️';
      title = 'Trust Index';
      desc = "Your Trust Index will summarize your reliability, community endorsements, and positive ride history. We’re building this feature to strengthen community trust!";
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
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 18,
            minWidth: 290,
            maxWidth: '94vw',
            boxShadow: '0 6px 40px rgba(0,119,182, 0.12)',
            padding: '2.2rem 1.6rem 1.2rem 1.6rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 43, marginBottom: 11 }}>{emoji}</span>
          <div className="heading-2" style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 8 }}>{title}</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center', fontSize: 16 }}>
            {desc}
          </div>
          <button
            className="btn"
            style={{ borderRadius: 32, padding: '10px 32px', fontSize: 15 }}
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
        <h2 className="heading-1" style={{ marginBottom: 2 }}>Trust & Safety</h2>
        <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
          Access real-time guardian tracking and safety tools for every ride.
        </p>
      </header>
      {/* Buddy Tracker stub - now interacable */}
      <section
        className="rounded-card"
        style={{ marginBottom: 24, cursor: 'pointer', transition: 'box-shadow .14s' }}
        tabIndex={0}
        onClick={() => setModal('buddy')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('buddy')}
        aria-label="Open Buddy Tracker details (coming soon)"
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span role="img" aria-label="Tracking" style={{ fontSize: 26, marginRight: 10 }}>👁️</span>
          <span className="heading-2">Buddy Tracker</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Let guardians follow your ride progress securely.<br />
          <span style={{ fontStyle: 'italic' }}>Live ride-tracking coming soon.</span>
        </div>
        <div
          style={{
            color: 'var(--accent)',
            fontSize: 13.5,
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
            marginTop: 7
          }}
        >
          Tap for details
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
          {/* SOS Button - now opens info modal */}
          <button
            className="btn"
            style={{
              borderRadius: 32,
              background: 'var(--accent)',
              fontSize: 17,
              fontWeight: 700,
              padding: '10px 30px',
            }}
            type="button"
            onClick={() => setModal('sos')}
            tabIndex={0}
            aria-label="Open SOS emergency info (coming soon)"
          >
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
      {/* Trust Index area - now interacable */}
      <section
        className="rounded-card"
        style={{ marginBottom: 8, cursor: 'pointer', transition: 'box-shadow .14s' }}
        tabIndex={0}
        onClick={() => setModal('trust')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('trust')}
        aria-label="Open Trust Index details (coming soon)"
      >
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
        <div
          style={{
            color: 'var(--accent)',
            fontSize: 13.5,
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
            marginTop: 7
          }}
        >
          Tap for details
        </div>
      </section>
    </div>
  );
};

export default TrustSafetyScreen;
