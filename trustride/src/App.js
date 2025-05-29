import React, { useState, useEffect } from 'react';
import './App.css';
import BottomTabBar from './components/BottomTabBar';
import Login from './components/Login';
import RideResults from './features/RideResults';
import ConfirmRideBooking from './features/ConfirmRideBooking';

// PUBLIC_INTERFACE
function App() {
  // Manage login state
  const [user, setUser] = useState(null);

  // Navigation state (simulate routing)
  const [activeTab, setActiveTab] = useState('home');
  // RideResults page navigation state
  const [showRideResults, setShowRideResults] = useState(false);
  // Confirm booking page state: holds selected ride if a ride is chosen
  const [selectedRide, setSelectedRide] = useState(null);

  // Provide navigation for RideDiscovery → RideResults
  useEffect(() => {
    // Expose a handler globally for the feature to "navigate" to RideResults
    window._navigateToRideResults = () => {
      setShowRideResults(true);
      setSelectedRide(null);
    };
    return () => { window._navigateToRideResults = null; };
  }, []);

  // Handler to go from RideResults to ConfirmRideBooking
  const handleChooseRide = (ride) => {
    setShowRideResults(false);
    setSelectedRide(ride);
  };

  // Handler to go back from ConfirmRideBooking (returns to RideResults)
  const handleBackFromConfirm = () => {
    setSelectedRide(null);
    setShowRideResults(true);
  };

  // Handler after successful confirmation/booked ride (return to home tab after confirmation)
  const handleRideConfirmed = () => {
    setSelectedRide(null);
    setShowRideResults(false);
    setActiveTab('home');
  };

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

  // Show ConfirmRideBooking screen (when user has chosen a ride to book)
  if (selectedRide) {
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
            <ConfirmRideBooking
              ride={selectedRide}
              onConfirm={handleRideConfirmed}
              onBack={handleBackFromConfirm}
            />
          </div>
        </main>
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={tab => {
            setActiveTab(tab);
            setShowRideResults(false);
            setSelectedRide(null);
          }}
        />
      </div>
    );
  }

  // Handle RideResults special rendering
  if (showRideResults) {
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
            <RideResults
              onBack={() => setShowRideResults(false)}
              onChooseRide={handleChooseRide}
            />
          </div>
        </main>
        <BottomTabBar activeTab={activeTab} onTabChange={tab => {
          setActiveTab(tab);
          setShowRideResults(false);
          setSelectedRide(null);
        }} />
      </div>
    );
  }

  // Simple minimal page content for each tab, "home" triggers RideDiscovery which triggers RideResults
  function renderTabContent(tab) {
    switch (tab) {
      case 'home':
        // Ride Discovery & Pooling screen
        try {
          // Import RideDiscovery dynamically
          const RideDiscovery = require('./features/RideDiscovery').default;
          return <RideDiscovery />;
        } catch (e) {
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
        }
      case 'eco':
        // Could dynamically import EcoScore if desired
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
      case 'profile': {
        const Profile = require('./features/Profile').default;
        return <Profile />;
      }
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
      <BottomTabBar activeTab={activeTab} onTabChange={tab => {
        setActiveTab(tab);
        setShowRideResults(false);
        setSelectedRide(null);
      }} />
    </div>
  );
}

export default App;
