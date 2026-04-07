import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// Layouts & Pages
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import SkillTranslator from './pages/SkillTranslator';
import Canopy from './pages/Canopy';
import CulturalFit from './pages/CulturalFit';
import Rootwork from './pages/HorizonAudit';
import Support from './pages/Support';
import Embers from './pages/Embers';

const ProtectedRoute = ({ element }) => {
  const { data: user, isLoading, isError } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => base44.auth.me(),
    retry: false,
    staleTime: Infinity
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#1C1622]">
        <div className="animate-pulse text-orange-400 font-heading italic tracking-widest text-lg">
          Loading the Hearth...
        </div>
      </div>
    );
  }

  if (isError || !user) {
    base44.auth.redirectToLogin(window.location.href);
    return null;
  }

  return element;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route element={<AppLayout />}>
        {/* Main Member Home */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        
        {/* Transition Tools */}
        <Route path="/translator" element={<ProtectedRoute element={<SkillTranslator />} />} />
        <Route path="/canopy" element={<ProtectedRoute element={<Canopy />} />} />
        <Route path="/cultural-fit" element={<ProtectedRoute element={<CulturalFit />} />} />
        <Route path="/audit" element={<ProtectedRoute element={<Rootwork />} />} />
        
        {/* Support & Community */}
        <Route path="/support" element={<ProtectedRoute element={<Support />} />} />
        <Route path="/embers" element={<ProtectedRoute element={<Embers />} />} />
        
        {/* Redirects */}
        <Route path="/gap-analyzer" element={<Navigate to="/audit" replace />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}