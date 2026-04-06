import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your components
import Dashboard from './Dashboard';
import PricingSection from './PricingSection';
import HearthInsights from './HearthInsights';

const App = () => {
  // Mock user state - in a real app, this comes from your Auth provider
  const [user, setUser] = useState({
    name: 'Margaret',
    tier: 'founder' // Options: 'seedling', 'hearthkeeper', 'steward', 'founder'
  });

  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    background: 'rgba(0,0,0,0.2)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontFamily: 'sans-serif'
  };

  const linkStyle = {
    color: '#2dd4bf',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
        
        {/* TOP NAVIGATION */}
        <nav style={navStyle}>
          <div style={{ marginRight: 'auto', fontWeight: 'bold', color: 'white' }}>
            Hearth & Horizon
          </div>
          <Link title="Dashboard" to="/" style={linkStyle}>Dashboard</Link>
          <Link title="Resources" to="/resources" style={linkStyle}>Hearth Insights</Link>
          <Link title="Membership" to="/join" style={linkStyle}>Membership</Link>
        </nav>

        {/* PAGE ROUTES */}
        <Routes>
          {/* The Dashboard is the Home page */}
          <Route path="/" element={<Dashboard user={user} />} />
          
          {/* The Resource Library / Knowledge Grove */}
          <Route path="/resources" element={<HearthInsights user={user} />} />
          
          {/* The Pricing / Join Page */}
          <Route path="/join" element={<PricingSection />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;