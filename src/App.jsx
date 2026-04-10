import AdminDashboard from './pages/AdminDashboard';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// Components & Layout
import AppLayout from './components/layout/AppLayout';
import YourHearth from './pages/YourHearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';

const queryClient = new QueryClient();

function ProtectedRoute({ children }) {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  useEffect(() => {
    const checkVipStatus = async () => {
      if (!user || user.subscription_tier === 'Hearthkeeper' || user.subscription_tier === 'Steward') return;

      try {
        const vouchers = await window.base44.entities.VoucherPool.list();
        const myVipTicket = vouchers.find(v => v.claimed_by?.toLowerCase() === user.email?.toLowerCase() && v.status === 'available');

        if (myVipTicket) {
          await window.base44.entities.User.update(user.id, { subscription_tier: 'Hearthkeeper' });
          await window.base44.entities.VoucherPool.update(myVipTicket.id, { 
            status: 'claimed',
            claimed_date: new Date().toISOString()
          });
          queryClient.invalidateQueries(['me']);
        }
      } catch (error) {
        console.error("Sanctuary VIP check encountered an issue", error);
      }
    };

    if (user) checkVipStatus();
  }, [user, queryClient]);

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

  return children;
}

function AppRoutes() {
  const [sanctuaryState, setSanctuaryState] = useState(() => {
    const saved = localStorage.getItem('vault_reset_final');
    return saved ? JSON.parse(saved) : {
      name: "Traveler",
      tier: "Free",
      journey: "Professional Transition",
      isAligned: false,
      pulses: [],
      resume: null,
    };
  });

  useEffect(() => {
    localStorage.setItem('vault_reset_final', JSON.stringify(sanctuaryState));
  }, [sanctuaryState]);

  const handleResumeSync = (file) => {
    setSanctuaryState(prev => ({
      ...prev,
      resume: {
        name: file.name,
        lastSynced: new Date().toISOString()
      }
    }));
  };

  const forceSync = (updates) => setSanctuaryState(prev => ({ ...prev, ...updates }));

  return (
    <div className="min-h-screen bg-[#0F0A15] text-white selection:bg-teal-500/30 font-sans">
      <Routes>
        <Route path="/admin" element={<AdminDashboard vault={sanctuaryState} onSync={forceSync} />} />
        
        {/* GROVE/LANDING: No Layout wrapping here, so no Nav appears */}
        <Route path="/" element={<GroveRoute><GroveTiers vault={sanctuaryState} onSync={forceSync} /></GroveRoute>} />
        <Route path="/grove" element={<GroveRoute><GroveTiers vault={sanctuaryState} onSync={forceSync} /></GroveRoute>} />
        
        {/* APP JOURNEY: Everything inside AppLayout will show the new Nav */}
        <Route path="/hearth" element={
          <ProtectedRoute>
            <AppLayout currentTier={sanctuaryState.tier}>
              <YourHearth vault={sanctuaryState} onSync={forceSync} onResumeSync={handleResumeSync} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/alignment" element={
          <ProtectedRoute>
            <AppLayout currentTier={sanctuaryState.tier}>
              <CulturalFit vault={sanctuaryState} onSync={forceSync} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/canopy" element={
          <ProtectedRoute>
            <AppLayout currentTier={sanctuaryState.tier}>
              <Canopy vault={sanctuaryState} onSync={forceSync} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/library" element={
          <ProtectedRoute>
            <AppLayout currentTier={sanctuaryState.tier}>
              <Library vault={sanctuaryState} />
            </AppLayout>
          </ProtectedRoute>
        } />

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