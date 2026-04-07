import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Dashboard from './pages/Dashboard';
import YourHearth from './pages/YourHearth';
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
import Contact from './pages/Contact';
import InstallApp from './pages/InstallApp';
import Gateway from './pages/Gateway';
import HorizonAudit from './pages/HorizonAudit';
import ForestGuide from './pages/ForestGuide';
import HorizonSynthesis from './pages/HorizonSynthesis';

// Component to protect routes that require authentication
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    import('@/api/base44Client').then(m => {
      m.base44.auth.redirectToLogin(window.location.href);
    });
    return null;
  }

  return element;
};

const PUBLIC_PATHS = ['/'];

const AuthenticatedApp = () => {
  const { isLoadingPublicSettings } = useAuth();
  const location = useLocation();

  // Only block rendering with a spinner for non-public routes
  if (isLoadingPublicSettings && !PUBLIC_PATHS.includes(location.pathname)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render the main app with public home and protected member areas
  return (
    <Routes>
      {/* Public gateway — no sidebar/layout */}
      <Route path="/" element={<Gateway />} />

      <Route element={<AppLayout />}>
        
        {/* Protected core pages */}
        <Route path="/hearth" element={<ProtectedRoute element={<YourHearth />} />} />
        <Route path="/translator" element={<ProtectedRoute element={<SkillTranslator />} />} />
        <Route path="/audit" element={<ProtectedRoute element={<HorizonAudit />} />} />
        <Route path="/synthesis" element={<ProtectedRoute element={<HorizonSynthesis />} />} />

        {/* Other member pages — accessible once logged in */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/gap-analyzer" element={<ProtectedRoute element={<GapAnalyzer />} />} />
        <Route path="/identity-anchor" element={<ProtectedRoute element={<IdentityAnchor />} />} />
        <Route path="/cultural-fit" element={<ProtectedRoute element={<CulturalFit />} />} />
        <Route path="/support" element={<ProtectedRoute element={<Support />} />} />
        <Route path="/canopy" element={<ProtectedRoute element={<Canopy />} />} />
        <Route path="/embers" element={<ProtectedRoute element={<Embers />} />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/guide" element={<ProtectedRoute element={<ForestGuide />} />} />

        {/* Public pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/install" element={<InstallApp />} />
        
        {/* Payment routes - public but only triggered after auth */}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
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