import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Eco Score screen for TrustRide –
 * Enhanced: shows user's eco score at top, displays leaderboard with user's rank highlighted,
 * and marks poor ranks as 'Demotion Zone' in bold red for bottom 20%.
 */
const MOCK_USER = {
  name: 'You',
  avatar: '👤',
  co2Saved: 37.4, // kg
  rideCount: 12,
  avgPerRide: 3.12,
};

const MOCK_LEADERBOARD = [
  { name: 'Yash P.', avatar: '🌿', co2Saved: 61.1 },
  { name: 'Megha T.', avatar: '🚲', co2Saved: 58.3 },
  { name: 'Arjun M.', avatar: '🌱', co2Saved: 54.7 },
  { name: 'Ananya S.', avatar: '🛺', co2Saved: 48.6 },
  { name: 'YOU', avatar: '👤', co2Saved: MOCK_USER.co2Saved }, // user is 5th
  { name: 'Rahul K.', avatar: '🚕', co2Saved: 27.5 },
  { name: 'Sneha C.', avatar: '🚗', co2Saved: 25.1 },
  { name: 'David W.', avatar: '🚘', co2Saved: 19.7 },
  { name: 'Priya G.', avatar: '🚖', co2Saved: 17.5 },
  { name: 'Aditi R.', avatar: '🚍', co2Saved: 10.2 },
  { name: 'Sahil D.', avatar: '🛵', co2Saved: 5.8 },
  { name: 'Divya M.', avatar: '🚌', co2Saved: 3.2 },
];

const EcoScoreScreen = () => {
  const [modal, setModal] = useState(null); // 'eco', 'leaderboard'

  // Compute leaderboard with ranking logic and user highlight
  const leaderboard = MOCK_LEADERBOARD.map((entry, i) => ({
    ...entry, rank: i + 1,
    isUser: entry.name.toLowerCase() === 'you' || entry.name.toUpperCase() === 'YOU',
  }));

  const userRankIndex = leaderboard.findIndex(e => e.isUser);
  const userDemotionZone =
    userRankIndex === -1
      ? false
      : (userRankIndex >= Math.floor(leaderboard.length * 0.8));

  // Modal rendering (kept as before)
  const renderModal = () => {
    if (!modal) return null;
    let title = '';
    let desc = '';
    let emoji = '';
    if (modal === 'eco') {
      emoji = '🌱';
      title = 'Eco Impact Details';
      desc = 'Track detailed statistics of your carbon footprint—see your CO₂ savings by ride, and visualize your contributions. This section will soon let you explore your eco history and personalized suggestions for greater impact!';
    } else if (modal === 'leaderboard') {
      emoji = '🏆';
      title = 'Eco Leaderboard';
      desc = 'Compete with your institution’s best eco-riders! The leaderboard highlights the top carbon-savers, with badges and rewards coming soon. Stay tuned!';
    }
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,40,58,0.18)',
          zIndex: 4000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 18,
            minWidth: 290,
            maxWidth: '94vw',
            boxShadow: '0 6px 40px rgba(0,119,182, 0.12)',
            padding: '2.1rem 1.4rem 1.2rem 1.4rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
          <span style={{ fontSize: 44, marginBottom: 11 }}>{emoji}</span>
          <div className="heading-2" style={{ fontWeight: 700, fontSize: '1.31rem', marginBottom: 8 }}>{title}</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center', fontSize: 16 }}>
            {desc}
          </div>
          <button
            className="btn"
            style={{ borderRadius: 32, padding: '11px 32px', fontSize: 15 }}
            onClick={() => setModal(null)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // Quick minimalist stat card UI
  function renderScoreStats() {
    const statStyle = {
      flex: 1,
      minWidth: 92,
      textAlign: 'center',
      borderRight: '1.5px solid var(--border-color)',
      padding: '0 8px'
    };
    const lastStatStyle = {
      ...statStyle,
      borderRight: 'none'
    };
    return (
      <section
        className="rounded-card"
        style={{
          maxWidth: 440,
          margin: "0 auto 24px auto",
          marginBottom: 24,
          padding: "24px 17px 18px 17px",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 0,
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ ...statStyle, paddingLeft: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 18.5, color: 'var(--accent)', lineHeight: 1.25, marginBottom: 3 }}>
            {MOCK_USER.co2Saved} kg
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14.2 }}>CO₂ Saved</div>
        </div>
        <div style={statStyle}>
          <div style={{ fontWeight: 700, fontSize: 18.5, color: 'var(--primary)', lineHeight: 1.2, marginBottom: 3 }}>
            {MOCK_USER.rideCount}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14.2 }}>Rides</div>
        </div>
        <div style={lastStatStyle}>
          <div style={{ fontWeight: 700, fontSize: 18.5, color: 'var(--accent)', lineHeight: 1.2, marginBottom: 3 }}>
            {MOCK_USER.avgPerRide} kg
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14.2, whiteSpace: 'nowrap' }}>Avg / Ride</div>
        </div>
      </section>
    );
  }

  // Minimalist TrustRide leaderboard
  function renderLeaderboard() {
    const demotionThreshold = Math.floor(leaderboard.length * 0.8);
    return (
      <section
        className="rounded-card"
        style={{
          marginBottom: 16,
          padding: "23px 10px 14px 10px",
          maxWidth: 470,
          marginLeft: "auto",
          marginRight: "auto",
          background: "#fafcff",
          boxShadow: "var(--card-shadow)",
        }}
        tabIndex={0}
        aria-label="View eco leaderboard"
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 9 }}>
          <span role="img" aria-label="Leaderboard" style={{ fontSize: 24, marginRight: 10 }}>🏆</span>
          <span className="heading-2" style={{ fontWeight: 700, fontSize: 18.5 }}>Eco Leaderboard</span>
        </div>
        <div style={{
          color: 'var(--text-secondary)',
          fontSize: 14.3,
          fontStyle: 'italic',
          marginBottom: 13,
        }}>
          Rankings for top eco-savers in your institution.
        </div>
        <div style={{
          marginTop: 2,
          marginBottom: 9,
          border: '1px dashed var(--accent)',
          borderRadius: 10,
          padding: 0,
          overflow: 'hidden',
          boxShadow: "0 2px 12px #00A89606"
        }}>
          {/* Leaderboard list */}
          {leaderboard.length === 0 ? (
            <div style={{
              color: "#c00",
              fontWeight: 700,
              padding: "13px 0",
              fontSize: 15.5,
              textAlign: "center"
            }}>
              Leaderboard data unavailable.
            </div>
          ) : (
            leaderboard.map((entry, idx) => {
              // Determine entry is in demotion zone
              const isDemotion = idx >= demotionThreshold;
              const isUser = entry.isUser;
              return (
                <div
                  key={entry.name + entry.co2Saved}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: isUser
                      ? "linear-gradient(90deg, var(--accent) 10%, #baffe2 100%)"
                      : isDemotion
                        ? "rgba(220,20,60,0.045)"
                        : idx === 0
                          ? "rgba(0,168,150,0.045)"
                          : "#fff",
                    color: isUser ? "#003C52" : (isDemotion ? "#ba1212" : "var(--text-primary)"),
                    fontWeight: isUser ? 700 : 500,
                    fontSize: 15.2,
                    padding: "10px 6px",
                    borderBottom: idx !== leaderboard.length - 1
                      ? '1px solid var(--border-color)'
                      : "none",
                    borderLeft: isUser
                      ? "6px solid var(--primary)"
                      : isDemotion
                        ? "6px solid #ff3549"
                        : "4px solid transparent",
                    borderRadius: isUser || isDemotion ? 10 : 0,
                    outline: isUser
                      ? "2.2px solid var(--primary)"
                      : isDemotion
                        ? "2.2px solid #ef0018"
                        : "none",
                    boxShadow: isUser
                      ? "0 1px 7px #00a89629"
                      : "none",
                    margin: isUser ? "2px 7px" : "0"
                  }}
                  aria-label={
                    isUser
                      ? "Your leaderboard rank"
                      : isDemotion
                        ? "Demotion zone rank"
                        : "Leaderboard rank"
                  }
                >
                  <div style={{
                    fontWeight: 900,
                    fontSize: 17,
                    width: 41,
                    textAlign: 'right',
                    paddingRight: 7,
                    color: isDemotion ? "#b40a2e" : (isUser ? "var(--primary)" : "#8bd6b7"),
                  }}>
                    {entry.rank}
                  </div>
                  <div style={{
                    width: 36,
                    height: 36,
                    fontSize: 23,
                    borderRadius: "50%",
                    background: isUser ? "#fff" : "rgba(0,168,150,0.09)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    marginLeft: 3,
                  }}>
                    {entry.avatar}
                  </div>
                  <div style={{ flex: 1, fontWeight: isUser ? 800 : 600, letterSpacing: isUser ? ".02rem" : 0 }}>
                    {isUser ? "You" : entry.name}
                  </div>
                  <div style={{ minWidth: 80, textAlign: 'right', color: isUser ? "var(--accent)" : "var(--text-secondary)" }}>
                    {entry.co2Saved} kg
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* Demotion zone label if user in demotion zone */}
        {userDemotionZone && (
          <div
            style={{
              color: "#e03636",
              fontWeight: 800,
              fontSize: 15.6,
              padding: "11px 0 1px 0",
              textAlign: "center",
              letterSpacing: "0.08rem",
              background: "#fff5f5",
              borderRadius: 10,
              marginTop: 9,
              marginBottom: 0,
              border: "2px solid #e03636"
            }}
            aria-label="Demotion zone warning"
          >
            ⚠️ <span style={{ color: "#c00", fontWeight: 800 }}>Demotion Zone</span> – Your eco rank is too low, increase activity to avoid demotion!
          </div>
        )}
        {/* Info link */}
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--accent)',
            marginTop: 8,
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
            textAlign: "center",
            cursor: "pointer"
          }}
          onClick={() => setModal('leaderboard')}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModal('leaderboard')}
        >
          Details & rewards info
        </div>
      </section>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 84, paddingBottom: 70 }}>
      {renderModal()}
      <header>
        <h2 className="heading-1" style={{ marginBottom: 2 }}>Eco Score</h2>
        <p className="description" style={{ marginTop: 0, marginBottom: 18 }}>
          Track your positive environmental impact through shared rides.
        </p>
      </header>
      {/* User's Eco Stats */}
      {renderScoreStats()}
      {/* Eco-impact Section */}
      <section
        className="rounded-card"
        style={{
          marginBottom: 24,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'box-shadow .14s',
        }}
        tabIndex={0}
        onClick={() => setModal('eco')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModal('eco')}
        aria-label="See eco impact details"
      >
        <span role="img" aria-label="Leaf" style={{ fontSize: 38, display: 'block', marginBottom: 7 }}>🌱</span>
        <div className="heading-2" style={{ marginBottom: 6 }}>Your Carbon Savings</div>
        <div style={{ fontWeight: 700, fontSize: 25, color: 'var(--accent)', marginBottom: 10 }}>
          {MOCK_USER.co2Saved} kg CO₂ saved
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic' }}>
          You’ve completed {MOCK_USER.rideCount} rides so far.
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: 'var(--accent)',
            marginTop: 6,
            fontStyle: 'italic',
            textDecoration: 'underline dashed',
          }}
        >
          Tap for details
        </div>
      </section>
      {/* Leaderboard Section w/ user highlight and demotion zone */}
      {renderLeaderboard()}
    </div>
  );
};

export default EcoScoreScreen;
