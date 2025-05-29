import React, { useState } from 'react';
import './App.css';
import BottomTabBar from './components/BottomTabBar';
import Login from './components/Login';

// PUBLIC_INTERFACE
function App() {
  // Manage login state
  const [user, setUser] = useState(null);

  // Navigation state (simulate routing)
  const [activeTab, setActiveTab] = useState('home');

  // Show Login until an institution-verified user logs in
  if (!user || !user.verified) {
    return (
      <div className="app">
        <nav className="navbar" role="navigation">
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="logo" aria-label="TrustRide Logo">
              <span className="logo-symbol">🚗</span>
              TrustRide
            </span>
          </div>
        </nav>
        <main style={{ flex: 1 }}>
          <div className="container">
            <Login onLogin={setUser} />
          </div>
        </main>
      </div>
    );
  }

  // Simple minimal page content for each tab
  function renderTabContent(tab) {
    switch (tab) {
      case 'home':
        return (
          <div className="hero">
            <div className="subtitle">Your trusted, institution-ready ride sharing platform.</div>
            <h1 className="title">Welcome to TrustRide</h1>
            <div className="description">
              RideCircle is a secure, verified ride-pooling app for students & professionals.
              Verified communities, real-time guardians, <b>eco-impact</b> at every journey.
            </div>
            <button className="btn btn-large">Get Started</button>
          </div>
        );
      case 'eco':
        return (
          <div className="hero">
            <div className="subtitle">Your Eco Impact</div>
            <h1 className="title">Eco Score</h1>
            <div className="description">
              View your carbon savings, ride history, and compete on your institution's leaderboard!
            </div>
          </div>
        );
      case 'safety':
        return (
          <div className="hero">
            <div className="subtitle">Safety, Verification, Trust</div>
            <h1 className="title">Trust &amp; Safety</h1>
            <div className="description">
              Track rides in real-time, connect with guardians, use the SOS feature, and monitor your Trust Index.
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="hero">
            <div className="subtitle">Your TrustRide Profile</div>
            <h1 className="title">Profile</h1>
            <div className="description">
              See your verified institution status, rides, ratings, and safety configuration in one place.
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="app">
      <nav className="navbar" role="navigation">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="logo" aria-label="TrustRide Logo">
            <span className="logo-symbol">🚗</span>
            TrustRide
          </span>
        </div>
      </nav>
      <main style={{ flex: 1 }}>
        <div className="container">{renderTabContent(activeTab)}</div>
      </main>
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;