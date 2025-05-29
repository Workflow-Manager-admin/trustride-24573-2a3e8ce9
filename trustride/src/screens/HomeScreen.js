import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Main Home screen for TrustRide app –
 * Ride Discovery & Pooling container with rounded cards and minimalist, modern design,
 * now stubbing key areas: login, ride search, and discovery controls.
 */
const HomeScreen = () => {
  const [modal, setModal] = useState(null); // 'login', 'discover', 'book'
  const navigate = useNavigate();

  // Handler for Login button
  const handleLogin = () => {
    navigate('/sign-in');
  };

  // Handler for Discover Ride button
  const handleDiscover = () => {
    setModal('discover');
    // In real app: navigate('/discover') or ride search page.
  };

  // Handler for Book Ride button
  const handleBook = () => {
    setModal('book');
    // In real app: navigate('/book') or booking form page.
  };

  // Modal rendering
  const renderModal = () => {
    if (!modal) return null;
    let title = '';
    let desc = '';
    let emoji = '';
    if (modal === 'login') {
      emoji = '🔑';
      title = 'Login / Sign Up';
      desc = 'Institutional login feature coming soon! You’ll be able to sign in with your email.';
    } else if (modal === 'discover') {
      emoji = '🔎';
      title = 'Ride Discovery';
      desc = 'Browse and filter available rides: This feature will soon let you search all active ride pools and filter by your preferences!';
    } else if (modal === 'book') {
      emoji = '🚌';
      title = 'Book a Ride';
      desc = 'Ride booking features coming soon. Users will be able to select, join, or offer rides here!';
    }
    return (
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
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
            maxWidth: '90vw',
            boxShadow: '0 6px 40px rgba(0,119,182, 0.12)',
            padding: '2.2rem 1.6rem 1.2rem 1.6rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
          <span style={{ fontSize: 46, marginBottom: 10 }}>{emoji}</span>
          <div className="heading-2" style={{ fontWeight: 700, fontSize: '1.33rem', marginBottom: 8 }}>{title}</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center', fontSize: 16 }}>
            {desc}
          </div>
          <button className="btn" style={{ borderRadius: 32, padding: '11px 32px', fontSize: 15 }}
            onClick={() => setModal(null)}>
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
        <h2 className="heading-1" style={{ marginBottom: 2 }}>Discover Rides</h2>
        <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
          Find and share rides with your trusted community.
        </p>
      </header>

      {/* Login (for unauthenticated session) */}
      <section className="rounded-card" style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span role="img" aria-label="login" style={{ fontSize: 28, marginRight: 12 }}>🔑</span>
        <div>
          <div className="heading-2" style={{ marginBottom: 2 }}>Welcome to TrustRide</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic' }}>
            Sign in with your institution email to start pooling rides.
          </div>
          <button
            className="btn"
            style={{ marginTop: 10, minWidth: 120, fontSize: 15, borderRadius: '22px' }}
            onClick={handleLogin}
            tabIndex={0}
            type="button"
          >
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
        {/* Discover Ride - Make this main action with a button */}
        <div style={{ marginBottom: 17, marginTop: 10, textAlign: 'center' }}>
          <button
            className="btn btn-large"
            style={{
              fontSize: 16,
              borderRadius: 23,
              minWidth: 180,
              fontWeight: 600,
              margin: "auto"
            }}
            onClick={handleDiscover}
            tabIndex={0}
            type="button"
          >
            Discover Ride
          </button>
        </div>
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
        {/* Book Ride action & Mock list of ride cards */}
        <div style={{
          marginBottom: 12,
          marginTop: 0,
          textAlign: 'center'
        }}>
          <button
            className="btn btn-large"
            style={{
              fontSize: 16,
              borderRadius: 23,
              minWidth: 160,
              fontWeight: 600,
              margin: "auto"
            }}
            onClick={handleBook}
            tabIndex={0}
            type="button"
          >
            Book Ride
          </button>
        </div>
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
};

export default HomeScreen;
