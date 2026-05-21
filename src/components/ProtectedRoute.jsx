import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'authed' | 'guest'

  useEffect(() => {
    base44.auth.isAuthenticated().then((authed) => {
      setStatus(authed ? 'authed' : 'guest');
    });
  }, []);

  if (status === 'checking') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0A080D]">
        <div className="w-6 h-6 rounded-full border-2 border-teal-500/30 border-t-teal-500 animate-spin" />
      </div>
    );
  }

  if (status === 'guest') {
    return <Navigate to="/grove" replace />;
  }

  return children;
}