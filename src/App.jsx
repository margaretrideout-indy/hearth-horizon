import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

// Component to protect routes that require authentication
const ProtectedRoute = ({ element, requiredAuth = true }) => {
  const { isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (requiredAuth && !isAuthenticated) {
    navigateToLogin();
    return null;
  }

  return element;
};

const AuthenticatedApp = () => {
  const { isLoadingPublicSettings } = useAuth();

  // Only show loading spinner while checking app public settings
  // Auth state loads in the background for protected routes
  if (isLoadingPublicSettings) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render the main app with public home and protected member areas
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public route - accessible to everyone */}
        <Route path="/" element={<YourHearth />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredAuth={true} />} />
        <Route path="/translator" element={<ProtectedRoute element={<SkillTranslator />} requiredAuth={true} />} />
        <Route path="/gap-analyzer" element={<ProtectedRoute element={<GapAnalyzer />} requiredAuth={true} />} />
        <Route path="/identity-anchor" element={<ProtectedRoute element={<IdentityAnchor />} requiredAuth={true} />} />
        <Route path="/cultural-fit" element={<ProtectedRoute element={<CulturalFit />} requiredAuth={true} />} />
        <Route path="/support" element={<ProtectedRoute element={<Support />} requiredAuth={true} />} />
        <Route path="/canopy" element={<ProtectedRoute element={<Canopy />} requiredAuth={true} />} />
        <Route path="/embers" element={<ProtectedRoute element={<Embers />} requiredAuth={true} />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requiredAuth={true} />} />
        
        {/* Public contact page */}
        <Route path="/contact" element={<Contact />} />
        
        {/* Public install app guide */}
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