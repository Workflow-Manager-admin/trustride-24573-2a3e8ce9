import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomTabNavigation.css';

/**
 * PUBLIC_INTERFACE
 * Bottom tab navigation bar for TrustRide app.
 * Shows Home, Eco Score, Trust & Safety, Profile navigation.
 */
const BottomTabNavigation = () => {
  return (
    <nav className="bottom-tab-nav">
      <NavLink to="/" end className="tab-link">
        <span role="img" aria-label="Home">🏠</span>
        <span>Home</span>
      </NavLink>
      <NavLink to="/eco-score" className="tab-link">
        <span role="img" aria-label="Eco score">🌱</span>
        <span>Eco Score</span>
      </NavLink>
      <NavLink to="/trust-safety" className="tab-link">
        <span role="img" aria-label="Trust and safety">🛡️</span>
        <span>Trust & Safety</span>
      </NavLink>
      <NavLink to="/profile" className="tab-link">
        <span role="img" aria-label="Profile">👤</span>
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomTabNavigation;
