import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Dashboard from './pages/Dashboard';
import SkillTranslator from './pages/SkillTranslator';
import GapAnalyzer from './pages/GapAnalyzer';
import IdentityAnchor from './pages/IdentityAnchor';
import CulturalFit from './pages/CulturalFit';
import AppLayout from './components/layout/AppLayout';
import Support from './pages/Support';
import Canopy from './pages/Canopy';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Embers from './pages/Embers';
import AdminDashboard from './pages/AdminDashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/translator" element={<SkillTranslator />} />
        <Route path="/gap-analyzer" element={<GapAnalyzer />} />
        <Route path="/identity-anchor" element={<IdentityAnchor />} />
        <Route path="/cultural-fit" element={<CulturalFit />} />
        <Route path="/support" element={<Support />} />
        <Route path="/canopy" element={<Canopy />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route path="/embers" element={<Embers />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App