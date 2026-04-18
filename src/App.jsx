import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
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

  const { data: user, isLoading: authLoading, refetch: refetchUser } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  const isAdmin = useMemo(() => {
    return user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  }, [user]);

  const initialState = {
    name: "Traveler",
    tier: "Seedling",
    journey: "Professional Transition",
    isAligned: false,
    pulses: [],
    resume: null,
    blueprints: [], 
    email: ""
  };

  const [sanctuaryState, setSanctuaryState] = useState(initialState);

  useEffect(() => {
    if (user) {
      const cloudVault = user.metadata?.vault || {};
      setSanctuaryState(prev => ({
        ...prev,
        ...cloudVault,
        email: user.email
      }));
    }
  }, [user]);

  const effectiveTier = useMemo(() => {
    if (isAdmin) return 'Steward';
    return sanctuaryState.tier || 'Seedling';
  }, [isAdmin, sanctuaryState.tier]);

  const handleManualRefresh = async () => {
    await queryClient.invalidateQueries(['me']);
    await refetchUser();
  };

  const forceSync = async (updates) => {
    const isDeletion = updates === null;
    const newState = isDeletion ? initialState : { ...sanctuaryState, ...updates };
    setSanctuaryState(newState);
    if (user?.id) {
      try {
        await base44.user.update(user.id, {
          metadata: { ...user.metadata, vault: newState }
        });
      } catch (err) { console.error("Cloud sync failed", err); }
    }
  };

  const handleResumeSync = (file) => {
    forceSync({
      isAligned: true,
      resume: { name: file?.name || "Uploaded Document", lastSynced: new Date().toISOString() }
    });
  };

  const [activeLibraryTool, setActiveLibraryTool] = useState(null);

  const value = {
    user, isAdmin, authLoading, vault: sanctuaryState,
    onSync: forceSync, onRefresh: handleManualRefresh,
    onResumeSync: handleResumeSync, effectiveTier,
    activeLibraryTool, onSetLibraryTool: setActiveLibraryTool
  };

  return <HearthContext.Provider value={value}>{children}</HearthContext.Provider>;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0A080D] flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black italic">Waking the Forest...</p>
    </div>
  );
}

function AdminRoute({ children }) {
  const { user, isAdmin, authLoading } = useHearth();
  if (authLoading) return <LoadingScreen />;
  if (!user || !isAdmin) return <Navigate to="/" replace />;
  return children;
}

// We simplified this to prevent the "Margaret Bounce"
function ProtectedRoute({ children }) {
  const { user, authLoading, isAdmin } = useHearth();
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
        <Route path="/admin" element={<AdminRoute><AdminDashboard vault={vault} onSync={onSync} isAdmin={isAdmin} /></AdminRoute>} />
        
        <Route path="/" element={<GroveTiers vault={vault} onSync={onSync} isAdmin={isAdmin} />} />
        <Route path="/grove" element={<GroveTiers vault={vault} onSync={onSync} isAdmin={isAdmin} />} />
        
        {/* CORE FEATURES - Protected by AppLayout UI locks, not Route redirects */}
        <Route path="/horizon" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <Canopy vault={vault} onSync={onSync} isAdmin={isAdmin} userTier={effectiveTier} />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/library" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <Library vault={vault} onSync={onSync} isAdmin={isAdmin} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/hearth" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <YourHearth vault={vault} onSync={onSync} onRefresh={onRefresh} onResumeSync={onResumeSync} isAdmin={isAdmin}
                onNavigateToLibrary={() => navigate('/library')} onNavigateToEmbers={() => navigate('/embers')} onNavigateToHorizon={() => navigate('/horizon')}
              />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/alignment" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <CulturalFit vault={vault} onSync={onSync} isAdmin={isAdmin} userTier={effectiveTier} />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/embers" element={
          <ProtectedRoute>
            <AppLayout currentTier={effectiveTier}>
              <EmbersChat isAdmin={isAdmin} vault={vault} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/contact" element={<ProtectedRoute><AppLayout currentTier={effectiveTier}><Contact /></AppLayout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HearthProvider>
        <Router><AppRoutes /></Router>
      </HearthProvider>
    </QueryClientProvider>
  );
}