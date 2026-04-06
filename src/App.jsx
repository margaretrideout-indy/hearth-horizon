import React, { useState } from 'react';

// --- 1. SIDEBAR NAVIGATION ---
const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'insights', label: 'Hearth Insights', icon: '🕯️' },
    { id: 'membership', label: 'The Grove', icon: '🌲' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div style={{
      width: '280px', height: '100vh', background: '#1c1921', 
      borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', 
      flexDirection: 'column', padding: '40px 20px', position: 'fixed', left: 0, top: 0
    }}>
      <div style={{ fontWeight: '900', fontSize: '1.4rem', color: 'white', marginBottom: '50px', paddingLeft: '15px' }}>
        Hearth <span style={{ color: '#2dd4bf' }}>&</span> Horizon
      </div>
      
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentPage(item.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '15px', padding: '15px',
            borderRadius: '12px', border: 'none', cursor: 'pointer', marginBottom: '10px',
            background: currentPage === item.id ? 'rgba(45, 212, 191, 0.1)' : 'transparent',
            color: currentPage === item.id ? '#2dd4bf' : '#94a3b8',
            transition: '0.2s', textAlign: 'left', fontWeight: '700'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

// --- 2. DASHBOARD PAGE ---
const Dashboard = () => (
  <div style={{ maxWidth: '900px', margin: '0 auto' }}>
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)', padding: '60px 50px', borderRadius: '40px', 
      border: '1px solid rgba(45, 212, 191, 0.2)', marginBottom: '30px'
    }}>
      <h1 style={{ fontSize: '4.5rem', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1', color: 'white', margin: '0 0 15px 0' }}>
        Welcome back, Margaret.
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#a0aec0', maxWidth: '500px', lineHeight: '1.6' }}>
        Your transition to the tech sector is a bridge built on 13 years of expertise.
      </p>
      
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px',
        background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(45,212,191,0.2)', marginTop: '20px'
      }}>
        <span style={{ color: '#2dd4bf', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '0.05em' }}>FOUNDER TIER</span>
      </div>
    </div>

    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h3 style={{ color: '#2dd4bf', marginBottom: '10px' }}>Ready to cross the bridge?</h3>
      <p style={{ color: '#a0aec0', marginBottom: '25px' }}>Upload your latest CV to begin the linguistic translation into tech data roles.</p>
      <button style={{ 
        background: '#14b8a6', color: '#1c1921', border: 'none', padding: '14px 30px', 
        borderRadius: '12px', fontWeight: '900', cursor: 'pointer' 
      }}>
        Start Translation →
      </button>
    </div>
  </div>
);

// --- 3. MAIN APP ENGINE ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div style={{ 
      minHeight: '100vh', background: '#1c1921', color: 'white', 
      fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex' 
    }}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main style={{ flex: 1, marginLeft: '280px', padding: '60px' }}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'insights' && <div style={{padding: '40px'}}><h1>Hearth Insights</h1></div>}
        {currentPage === 'membership' && <div style={{padding: '40px'}}><h1>The Grove</h1></div>}
        {currentPage === 'settings' && <div style={{padding: '40px'}}><h1>Settings</h1></div>}
      </main>
    </div>
  );
}