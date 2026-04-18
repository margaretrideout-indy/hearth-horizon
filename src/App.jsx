import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

import AppLayout from './components/layout/AppLayout';
import YourHearth from './pages/YourHearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy'; 
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';
import EmbersChat from './pages/EmbersChat'; 
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact'; 

const queryClient = new QueryClient();
const ADMIN_EMAIL = "margaretpardy@gmail.com"; 

const HearthContext = createContext();

export function useHearth() {
  const context = useContext(HearthContext);
  if (!context) throw new Error("useHearth must be used within a HearthProvider");
  return context;
}

function HearthProvider({ children }) {
  const queryClient = useQueryClient();

  // 1. AUTH & CLOUD DATA FETCHING
  const { data: user, isLoading: authLoading, refetch: refetchUser } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  const isAdmin = user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const initialState = {
    name: "Traveler",
    tier: "Seedling",
    journey: "Professional Transition",
    isAligned: false,
    pulses: [],
    resume: null,
    blueprints: [], 
  };

  const [sanctuaryState, setSanctuaryState] = useState(initialState);

  // Sync state when user data arrives from the Cloud
  useEffect(() => {
    if (user && user.metadata?.vault) {
      setSanctuaryState(user.metadata.vault);
    }
  }, [user]);

  // 2. REFRESH LOGIC (For Native Pull-to-Refresh)
  const handleManualRefresh = async () => {
    await queryClient.invalidateQueries(['me']);
    await refetchUser();
  };

  // 3. CLOUD SYNC & DELETION LOGIC
  const forceSync = async (updates) => {
    // If updates is null, we are performing the mandatory "Account Deletion" wipe
    const isDeletion = updates === null;
    const newState = isDeletion ? initialState : { ...sanctuaryState, ...updates };
    
    setSanctuaryState(newState);

    if (user?.id) {
      try {
        await base44.user.update(user.id, {
          metadata: {
            ...user.metadata,
            vault: newState
          }
        });
      } catch (err) {
        console.error("Cloud sync failed", err);
      }
    }
  };

  const handleResumeSync = (file) => {
    forceSync({
      isAligned: true,
      resume: {
        name: file?.name || "Uploaded Document",
        lastSynced: new Date().toISOString()
      }
    });
  };

  const [activeLibraryTool, setActiveLibraryTool] = useState(null);

  const value = {
    user,
    isAdmin,
    authLoading,
    vault: sanctuaryState,
    onSync: forceSync,
    onRefresh: handleManualRefresh,
    onResumeSync: handleResumeSync,
    effectiveTier: isAdmin ? 'Steward' : sanctuaryState.tier,
    activeLibraryTool,
    onSetLibraryTool: setActiveLibraryTool
  };

  return <HearthContext.Provider value={value}>{children}</HearthContext.Provider>;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0A080D] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AdminRoute({ children }) {
  const { user, isAdmin, authLoading } = useHearth();
  if (authLoading) return <LoadingScreen />;
  if (!user || !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function ProtectedRoute({ children }) {
  const { user, authLoading } = useHearth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkVipStatus = async () => {
      if (!user || user.subscription_tier === 'Hearthkeeper' || user.subscription_tier === 'Steward') return;
      try {
        const vouchers = await base44.entities.VoucherPool.list();
        const myVipTicket = vouchers.find(v => v.claimed_by?.toLowerCase() === user.email?.toLowerCase() && v.status === 'available');
        if (myVipTicket) {
          await base44.user.update(user.id, { subscription_tier: 'Hearthkeeper' });
          await base44.entities.VoucherPool.update(myVipTicket.id, { 
            status: 'claimed',
            claimed_date: new Date().toISOString()
          });
          queryClient.invalidateQueries(['me']);
        }
      } catch (error) {
        console.error("Sanctuary VIP check issue", error);
      }
    };
    if (user) checkVipStatus();
  }, [user, queryClient]);

  if (authLoading) return <LoadingScreen />;
  if (!user) return <Navigate to="/grove" replace />;
  return children;
}

function AppRoutes() {
  const { isAdmin, vault, onSync, onRefresh, onResumeSync, effectiveTier } = useHearth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A080D] text-white selection:bg-teal-500/30 font-sans">
      <Routes>
        {/* --- ADMIN --- */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard vault={vault} onSync={onSync} />
          </AdminRoute>
        } />
        
        {/* --- PUBLIC ACCESS --- */}
        <Route path="/" element={<GroveTiers vault={vault} onSync={onSync} isAdmin={isAdmin} />} />
        <Route path="/grove" element={<GroveTiers vault={vault} onSync={onSync} isAdmin={isAdmin} />} />
        
        <Route path="/horizon" element={
          <AppLayout currentTier={effectiveTier}>
            <Canopy vault={vault} onSync={onSync} isAdmin={isAdmin} userTier={effectiveTier} />
          </AppLayout>
        } />

        <Route path="/library" element={
          <AppLayout currentTier={effectiveTier}>
            <Library vault={vault} onSync={onSync} isAdmin={isAdmin} />
          </AppLayout>
        } />
        
        <Route path="/launch" element={<Navigate to="/horizon" replace />} />
        <Route path="/canopy" element={<Navigate to="/horizon" replace />} />

        {/* --- PROTECTED ACCESS --- */}
        <Route path="/hearth" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <YourHearth 
                vault={vault} 
                onSync={onSync} 
                onRefresh={onRefresh}
                onResumeSync={onResumeSync}
                isAdmin={isAdmin}
                onNavigateToLibrary={() => navigate('/library')}
                onNavigateToEmbers={() => navigate('/embers')}
                onNavigateToHorizon={() => navigate('/horizon')}
              />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/alignment" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <CulturalFit vault={vault} onSync={onSync} isAdmin={isAdmin} />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/embers" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <EmbersChat isAdmin={isAdmin} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/contact" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <Contact />
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
      <HearthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </HearthProvider>
    </QueryClientProvider>
  );
}