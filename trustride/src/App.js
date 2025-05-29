import React from 'react';
import './App.css';
// PUBLIC_INTERFACE
function App() {
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
      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Your trusted, institution-ready ride sharing platform.</div>
            <h1 className="title">Welcome to TrustRide</h1>
            <div className="description">
              RideCircle is a secure, verified ride-pooling app for students & professionals.
              Verified communities, real-time guardians, <b>eco-impact</b> at every journey.
            </div>
            <button className="btn btn-large">Get Started</button>
          </div>
        </div>
      </main>
      {/* Footer or tab navigation goes here in further steps */}
    </div>
  );
}

export default App;