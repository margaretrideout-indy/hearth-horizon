import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// Page Imports
import YourHearth from './pages/YourHearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';

const queryClient = new QueryClient();

// Protected route - redirects to /grove if not logged in
function ProtectedRoute({ children }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0A15] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/grove" replace />;
  return children;
}

// Grove page - redirects to /hearth if already logged in
function GroveRoute({ children }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0A15] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return <Navigate to="/hearth" replace />;
  return children;
}

function AppRoutes() {
  const [sanctuaryState, setSanctuaryState] = useState(() => {
    const saved = localStorage.getItem('vault_reset_final');
    return saved ? JSON.parse(saved) : {
      name: "Traveler",
      tier: "Free",
      journey: "Classroom to New Horizon",
      isAligned: false,
      pulses: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('vault_reset_final', JSON.stringify(sanctuaryState));
  }, [sanctuaryState]);

  const forceSync = (updates) => setSanctuaryState(prev => ({ ...prev, ...updates }));

  return (
    <div className="min-h-screen bg-[#0F0A15] text-white selection:bg-teal-500/30 font-sans">
      <Routes>
        <Route path="/" element={<GroveTiers vault={sanctuaryState} onSync={forceSync} />} />
        <Route path="/grove" element={<GroveTiers vault={sanctuaryState} onSync={forceSync} />} />
        <Route path="/hearth" element={<ProtectedRoute><YourHearth vault={sanctuaryState} onSync={forceSync} /></ProtectedRoute>} />
        <Route path="/alignment" element={<ProtectedRoute><CulturalFit vault={sanctuaryState} onSync={forceSync} /></ProtectedRoute>} />
        <Route path="/canopy" element={<ProtectedRoute><Canopy vault={sanctuaryState} onSync={forceSync} /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library vault={sanctuaryState} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}