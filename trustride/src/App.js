import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import BottomTabNavigation from './navigation/BottomTabNavigation';
import HomeScreen from './screens/HomeScreen';
import EcoScoreScreen from './screens/EcoScoreScreen';
import TrustSafetyScreen from './screens/TrustSafetyScreen';
import ProfileScreen from './screens/ProfileScreen';

/**
 * PUBLIC_INTERFACE
 * The TrustRide App main entry – minimalist, on-brand layout, routing, and navigation.
 */
function App() {
  return (
    <Router>
      <div className="app" style={{paddingBottom: 60}}>
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
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/eco-score" element={<EcoScoreScreen />} />
            <Route path="/trust-safety" element={<TrustSafetyScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
        <BottomTabNavigation />
      </div>
    </Router>
  );
}

export default App;