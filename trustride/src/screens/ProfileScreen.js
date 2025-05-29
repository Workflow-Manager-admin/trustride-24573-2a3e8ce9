import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Profile screen for TrustRide app –
 * Minimalist layout with rounded cards, profile, rides, emergency, and settings stubs.
 * Visual placeholders included for verified badge, emergency contacts, completed rides, and settings.
 * Now: all major sections are interactive (pop modal with stub info).
 */
const ProfileScreen = () => {
  const [modal, setModal] = useState(null); // 'verified', 'emergency', 'rides', 'settings'

  // Modal rendering for placeholder feature info
  const renderModal = () => {
    if (!modal) return null;
    let title = '';
    let desc = '';
    let emoji = '';
    if (modal === 'verified') {
      emoji = '✔️';
      title = 'Verified Badge';
      desc = "Your profile is institution verified. You'll see this badge once your email is confirmed by your university or company domain. All riders and drivers in TrustRide have verified credentials for maximum security.";
    } else if (modal === 'emergency') {
      emoji = '📞';
      title = 'Emergency Contacts';
      desc = 'Add trusted guardians, friends, or family members to be notified in case of emergencies. This feature will allow you to set up fast alerts and share real-time ride info with your chosen contacts.';
    } else if (modal === 'rides') {
      emoji = '🧾';
      title = 'Completed Rides & Ratings';
      desc = 'You will soon be able to view your ride history, download ride receipts, and track your community Trust Index based on your completed trips, punctuality, and feedback. Social rating system coming soon!';
    } else if (modal === 'settings') {
      emoji = '⚙️';
      title = 'Settings & Preferences';
      desc = 'All your notification preferences, emergency contacts, account management, and safety configuration options will be available in this section soon. Stay tuned for robust customization!';
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
            padding: '2.1rem 1.4rem 1.2rem 1.4rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 42, marginBottom: 11 }}>{emoji}</span>
          <div className="heading-2" style={{ fontWeight: 700, fontSize: '1.17rem', marginBottom: 8 }}>{title}</div>
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
        <h2 className="heading-1" style={{ marginBottom: 2 }}>Your Profile</h2>
        <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
          View and manage your account, rides, and safety preferences.
        </p>
      </header>
      {/* Profile summary card – Verified badge is now clickable */}
      <section className="rounded-card" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 22 }}>
        <div style={{
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: '50%',
          width: 68,
          height: 68,
          fontSize: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span role="img" aria-label="User">👤</span>
        </div>
        <div>
          <div className="heading-2" style={{ marginBottom: 4 }}>Student@your.institution.edu</div>
          <div
            style={{
              background: 'rgba(0,119,182,0.06)',
              color: 'var(--primary)',
              fontSize: 13.5,
              padding: '2px 14px',
              borderRadius: 14,
              width: 'fit-content',
              marginBottom: 4,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'box-shadow .14s',
              outline: 'none'
            }}
            tabIndex={0}
            role="button"
            aria-label="Verified badge details"
            onClick={() => setModal('verified')}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('verified')}
          >
            Verified
            <span role="img" aria-label="Verified Badge" style={{ marginLeft: 7, fontSize: 17 }}>✔️</span>
            <span style={{
              fontSize: 13, marginLeft: 7, textDecoration: 'underline dashed', color: 'var(--accent)', fontWeight: 500
            }}>info</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>ID: #TST9922</div>
        </div>
      </section>
      {/* Emergency contacts section - now clickable */}
      <section
        className="rounded-card"
        style={{ marginBottom: 22, cursor: 'pointer', outline: 'none', transition: 'box-shadow .14s' }}
        tabIndex={0}
        role="button"
        aria-label="Show emergency contacts info"
        onClick={() => setModal('emergency')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('emergency')}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span role="img" aria-label="Emergency Contacts" style={{ fontSize: 20, marginRight: 9 }}>📞</span>
          <span className="heading-2">Emergency Contacts</span>
        </div>
        {/* Placeholder contact list */}
        <div style={{
          background: 'rgba(0,168,150,0.07)',
          padding: '8px 13px',
          borderRadius: 11,
          fontSize: 14,
          color: 'var(--text-secondary)',
          marginBottom: 7
        }}>
          <div><b>Not set</b> – Set trusted guardian contacts in settings.</div>
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--accent)',
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
            marginTop: 3
          }}
        >
          Tap for emergency contacts info
        </div>
      </section>
      {/* Rides & Ratings Stub – clickable */}
      <section
        className="rounded-card"
        style={{ marginBottom: 22, cursor: 'pointer', outline: 'none', transition: 'box-shadow .14s' }}
        tabIndex={0}
        role="button"
        aria-label="Show completed rides and rating info"
        onClick={() => setModal('rides')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('rides')}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span role="img" aria-label="Ride History" style={{ fontSize: 22, marginRight: 10 }}>🧾</span>
          <span className="heading-2">Rides & Ratings</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Completed rides: <b>0</b><br />
          Trust Index: <b>Beta</b> – <span style={{ fontStyle: 'italic' }}>community rating coming soon</span>
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--accent)',
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
            marginTop: 5
          }}
        >
          Tap for ride history info
        </div>
      </section>
      {/* Settings/Preferences Card – clickable */}
      <section
        className="rounded-card"
        style={{ cursor: 'pointer', outline: 'none', transition: 'box-shadow .14s' }}
        tabIndex={0}
        role="button"
        aria-label="Open settings and preferences info"
        onClick={() => setModal('settings')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModal('settings')}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span role="img" aria-label="Settings" style={{ fontSize: 22, marginRight: 10 }}>⚙️</span>
          <span className="heading-2">Settings</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Manage notifications, guardian contacts, and emergency setup here.<br />
          <span style={{ fontStyle: 'italic' }}>Full settings coming soon.</span>
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--accent)',
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
            marginTop: 5
          }}
        >
          Tap for settings info
        </div>
      </section>
    </div>
  );
};

export default ProfileScreen;
