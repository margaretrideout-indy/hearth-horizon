import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// We've added the full relative path and extension to be 100% clear
import Dashboard from './Dashboard.jsx';
import PricingSection from './PricingSection.jsx';
import HearthInsights from './HearthInsights.jsx';

const App = () => {
  const [user, setUser] = useState({
    name: 'Margaret',
    tier: 'founder' 
  });

  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    background: 'rgba(0,0,0,0.5)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontFamily: 'sans-serif',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)'
  };

  const linkStyle = {
    color: '#2dd4bf',
    padding: '8px 12px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
        
        <nav style={navStyle}>
          <div style={{ marginRight: 'auto', fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
            Hearth & Horizon
          </div>
          <Link to="/" style={linkStyle}>Dashboard</Link>
          <Link to="/resources" style={linkStyle}>Insights</Link>
          <Link to="/join" style={linkStyle}>Membership</Link>
        </nav>

        <div style={{ paddingTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/resources" element={<HearthInsights user={user} />} />
            <Route path="/join" element={<PricingSection />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
};

export default App;