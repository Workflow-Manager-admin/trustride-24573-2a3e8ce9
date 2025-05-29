import React from "react";
import "./BottomTabBar.css"; // Scoped or global, depending on setup

/**
 * PUBLIC_INTERFACE
 * BottomTabBar: Minimalist, responsive bottom navigation with TrustRide branding.
 * Tabs: Home, Eco Score, Trust & Safety, Profile. Uses SVG icons (inline) for each.
 * @param {Object} props
 * @param {string} props.activeTab - The key of the currently selected tab
 * @param {function} props.onTabChange - Called with new tab key when a tab is selected
 */
export default function BottomTabBar({ activeTab, onTabChange }) {
  const TABS = [
    {
      key: "home",
      label: "Home",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
          <path
            d="M3.5 10.5L11 4l7.5 6.5M5 9.5v7a1.5 1.5 0 001.5 1.5h2A1.5 1.5 0 0010 18v-3a1 1 0 011-1h0a1 1 0 011 1v3a1.5 1.5 0 001.5 1.5h2A1.5 1.5 0 0017 16.5v-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "eco",
      label: "Eco Score",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
          <path
            d="M11 18c5.7-1.7 8-6.2 8-13v0s-4.3-1.3-8 2.5C7.3 3.7 3 5 3 5s0 0 0 0c0 6.8 2.3 11.3 8 13zm0-9v5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.52"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "safety",
      label: "Trust & Safety",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
          <path
            d="M11 19c6-2.1 7-6.6 7-10V5l-7-3-7 3v4c0 3.4 1 7.9 7 10zm0-8v.01M11 12a1 1 0 10-2 0 1 1 0 002 0z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "profile",
      label: "Profile",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
          <circle
            cx="11"
            cy="8.5"
            r="3.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.38"
          />
          <path
            d="M18.38 16.2C16.92 14.18 14.23 13 11 13s-5.92 1.18-7.38 3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.38"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-tab-bar" aria-label="Main">
      <ul className="bottom-tab-bar__list">
        {TABS.map((tab) => (
          <li
            className={
              "bottom-tab-bar__item" +
              (activeTab === tab.key ? " bottom-tab-bar__item--active" : "")
            }
            key={tab.key}
          >
            {/* eslint-disable-next-line */}
            <button
              className="bottom-tab-bar__button"
              tabIndex="0"
              aria-current={activeTab === tab.key ? "page" : undefined}
              aria-label={tab.label}
              onClick={() => onTabChange(tab.key)}
              type="button"
            >
              <span
                className="bottom-tab-bar__icon"
                aria-hidden="true"
                style={{
                  color:
                    activeTab === tab.key
                      ? "var(--color-primary)"
                      : "var(--color-muted)",
                }}
              >
                {tab.icon}
              </span>
              <span className="bottom-tab-bar__label">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
