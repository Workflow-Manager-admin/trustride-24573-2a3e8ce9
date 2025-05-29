import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Profile screen for TrustRide app –
 * Minimalist layout with rounded cards, profile, rides, and settings stubs.
 */
const ProfileScreen = () => (
  <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
    <header>
      <h2 className="heading-1" style={{ marginBottom: 2 }}>Your Profile</h2>
      <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
        View and manage your account, rides, and safety preferences.
      </p>
    </header>
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
        <div style={{
          background: 'rgba(0,119,182,0.06)',
          color: 'var(--primary)',
          fontSize: 13.5,
          padding: '2px 14px',
          borderRadius: 14,
          width: 'fit-content',
          marginBottom: 4,
          fontWeight: 600,
        }}>
          Verified
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>ID: #TST9922</div>
      </div>
    </section>
    <section className="rounded-card" style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span role="img" aria-label="Ride History" style={{ fontSize: 22, marginRight: 10 }}>🧾</span>
        <span className="heading-2">Rides & Ratings</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        Completed rides: <b>0</b><br />
        Trust Index: <b>Beta</b> – <span style={{ fontStyle: 'italic' }}>community rating coming soon</span>
      </div>
    </section>
    <section className="rounded-card">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span role="img" aria-label="Settings" style={{ fontSize: 22, marginRight: 10 }}>⚙️</span>
        <span className="heading-2">Settings</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        Manage notifications, guardian contacts, and emergency setup here.<br />
        <span style={{ fontStyle: 'italic' }}>Full settings coming soon.</span>
      </div>
    </section>
  </div>
);

export default ProfileScreen;
