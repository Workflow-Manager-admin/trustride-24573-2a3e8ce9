import React from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * The TrustRide App main entry – minimalist, on-brand landing UI and theming.
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div className="logo">
              <span className="logo-symbol">🚗</span> TrustRide
            </div>
            <button className="btn">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Secure. Eco-Friendly. Institution Verified.</div>
            <h1 className="title">Welcome to TrustRide</h1>
            <div className="description">
              A trusted and secure ride-pooling app for students and professionals.<br />
              <span style={{ color: "var(--accent)", fontWeight: 500 }}>
                Safe, verified, and eco-conscious shared journeys start here.
              </span>
            </div>
            <button className="btn btn-large">Get Started</button>
            <div style={{height: 8}} />
            <div className="rounded-card" style={{ maxWidth: 350, margin: '0 auto', marginTop: 20, fontSize: '0.98rem', color: "var(--text-secondary)", boxShadow: "var(--card-shadow)" }}>
              <div className="heading-2" style={{marginBottom: 4}}>Why TrustRide?</div>
              <ul style={{margin: 0, padding: '0 0 0 1.2em', textAlign: 'left', fontSize: '0.98em', listStyle: "disc"}}>
                <li>Verified email sign up for real community trust</li>
                <li>Real-time guardian tracking & safety dashboard</li>
                <li>Track your eco impact and ride history</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;