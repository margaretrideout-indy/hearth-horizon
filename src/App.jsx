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

  // 1. Fetch User Data from Cloud
  const { data: user, isLoading: authLoading, refetch: refetchUser } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  const isAdmin = user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const [sanctuaryState, setSanctuaryState] = useState({
    name: "Traveler",
    tier: "Seedling",
    journey: "Professional Transition",
    isAligned: false,
    pulses: [],
    resume: null,
    blueprints: [], 
  });

  // Sync state when user data arrives from cloud
  useEffect(() => {
    if (user && user.metadata?.vault) {
      setSanctuaryState(user.metadata.vault);
    }
  }, [user]);

  // 2. THE REFRESH LOGIC (For Pull-to-Refresh)
  const handleManualRefresh = async () => {
    // This forces React Query to fetch the 'me' query again from Base44
    await queryClient.invalidateQueries(['me']);
    await refetchUser();
  };

  // 3. THE CLOUD SYNC & DELETION LOGIC
  const forceSync = async (updates) => {
    // If updates is null, it's a "Delete All" signal
    const isDeletion = updates === null;
    
    const initialState = {
      name: "Traveler",
      tier: "Seedling",
      journey: "Professional Transition",
      isAligned: false,
      pulses: [],
      resume: null,
      blueprints: [], 
    };

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
    onRefresh: handleManualRefresh, // New function passed to YourHearth
    onResumeSync: handleResumeSync,
    effectiveTier: isAdmin ? 'Steward' : sanctuaryState.tier,
    activeLibraryTool,
    onSetLibraryTool: setActiveLibraryTool
  };

  return <HearthContext.Provider value={value}>{children}</HearthContext.Provider>;
}

// ... Rest of your App.jsx (LoadingScreen, ProtectedRoute, AppRoutes) remains the same
// Make sure to pass onRefresh to YourHearth inside AppRoutes:
// <YourHearth vault={vault} onSync={onSync} onRefresh={onRefresh} ... />