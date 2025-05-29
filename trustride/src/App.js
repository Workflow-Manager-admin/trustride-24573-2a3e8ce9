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
 * 
 * Routing flow:
 *   - "/sign-in" (SignInScreen) → on successful sign-in navigates to "/book-ride"
 *   - "/book-ride" (RideBookingScreen) → user selects transport mode, taps Continue,
 *     navigates to "/booking-details" with the chosen mode passed via router state.
 *   - "/booking-details" (BookingDetailsScreen) receives selected mode from navigation state
 *     and renders booking info accordingly.
 *   - Other static app screens remain as-is.
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

          {/* Ride booking flow:
              /book-ride shows RideBookingScreen;
              RideBookingScreen navigates to /booking-details with mode in navigation state;
              BookingDetailsScreen gets mode from state. */}
          <Route path="/book-ride" element={<RideBookingScreen />} />
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
