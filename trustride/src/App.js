import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import React, { useCallback } from 'react';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import HomeScreen from './screens/HomeScreen';
import EcoScoreScreen from './screens/EcoScoreScreen';
import TrustSafetyScreen from './screens/TrustSafetyScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import { useNavigate } from 'react-router-dom';

// Ride booking screen stub to redirect to after sign-in
function BookRideScreen() {
  return (
    <div className="container" style={{ paddingTop: 90, paddingBottom: 70 }}>
      <section className="rounded-card" style={{ marginTop: 30, textAlign: 'center' }}>
        <h2 className="heading-1" style={{ marginBottom: 6 }}>
          Choose Your Ride
        </h2>
        <div className="description" style={{ marginBottom: 16 }}>
          Select your preferred mode of transportation below.
        </div>
        <div style={{
          display: "flex",
          gap: 22,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "28px 0",
        }}>
          <TransportCard icon="🚌" label="Shuttle Bus" />
          <TransportCard icon="🚘" label="Carpool" />
          <TransportCard icon="🚴‍♂️" label="Bicycle" />
          <TransportCard icon="🛴" label="e-Scooter" />
          <TransportCard icon="🚶‍♂️" label="Walk" />
        </div>
        {/* Optionally, more details/options go here */}
      </section>
    </div>
  );
}
function TransportCard({icon, label}) {
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      minWidth: 88,
      minHeight: 92,
      maxWidth: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      cursor: 'pointer',
      boxShadow: 'var(--card-shadow)',
      border: '1px solid var(--border-color)',
      fontWeight: 600,
      fontSize: 17.5,
      margin: 6,
      padding: 14,
      transition: 'box-shadow .17s'
    }}>
      <span style={{fontSize: 32}}>{icon}</span>
      <span style={{fontSize: 13.5, color: 'var(--text-secondary)'}}>{label}</span>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * The TrustRide App main entry – minimalist, on-brand layout, routing, and navigation.
 */
function App() {
  // Allows navbar Sign In button to navigate (must use <Routes location> context)
  const navigate = useNavigate();
  const handleNavSignIn = useCallback(() => navigate('/sign-in'), [navigate]);

  return (
    <div className="app" style={{paddingBottom: 60}}>
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div className="logo">
              <span className="logo-symbol">🚗</span> TrustRide
            </div>
            <button className="btn" onClick={handleNavSignIn}>
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/eco-score" element={<EcoScoreScreen />} />
          <Route path="/trust-safety" element={<TrustSafetyScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/book-ride" element={<BookRideScreen />} />
        </Routes>
      </main>
      <BottomTabNavigation />
    </div>
  );
}

export default App;