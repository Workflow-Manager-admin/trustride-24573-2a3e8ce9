import React, { useCallback } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import BottomTabNavigation from './navigation/BottomTabNavigation';
import HomeScreen from './screens/HomeScreen';
import EcoScoreScreen from './screens/EcoScoreScreen';
import TrustSafetyScreen from './screens/TrustSafetyScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import RideBookingScreen from './screens/RideBookingScreen';
import BookingDetailsScreen from './screens/BookingDetailsScreen';

/**
 * PUBLIC_INTERFACE
 * The TrustRide App main entry – minimalist, on-brand layout, routing, and navigation.
 */
function AppContainer() {
  const navigate = useNavigate();
  const handleNavSignIn = useCallback(() => navigate('/sign-in'), [navigate]);

  return (
    <div className="app" style={{ paddingBottom: 60 }}>
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

          {/* Ride booking start. /book-ride presents RideBookingScreen */}
          <Route path="/book-ride" element={<RideBookingScreen />} />

          {/* Sequential booking details screen. BookingDetailsScreen will read mode from navigation state */}
          <Route path="/booking-details" element={<BookingDetailsScreen />} />
        </Routes>
      </main>
      <BottomTabNavigation />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
}

export default App;
