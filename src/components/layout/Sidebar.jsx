import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Heart, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  HandHeart, 
  Trees, 
  Flame, 
  BookOpen,
  Binoculars 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

const STANDALONE = { path: '/dashboard', label: 'Your Hearth', icon: LayoutDashboard };

const NAV_GROUPS = [
  {
    label: 'COMMUNITY',
    items: [
      { path: '/support', label: 'The Grove', icon: HandHeart },
      { path: '/embers', label: 'The Embers', icon: Flame },
      { path: '/library', label: 'The Library', icon: BookOpen },
    ],
  },
  {
    label: 'TRANSITION',
    items: [
      { path: '/canopy', label: 'The Canopy', icon: Trees },
      { path: '/translator', label: 'The Linguistic Bridge', icon: ArrowLeftRight },
      { path: '/gap-analyzer', label: 'Horizon Scan', icon: Binoculars },
      { path: '/cultural-fit', label: 'Ecosystem Alignment', icon: Compass },
      { path: '/audit', label: 'The Rootwork', icon: Heart },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  const userTier = user?.subscription_tier || 'Seedling';

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full z-40 transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
      style={{
        background: 'hsla(280, 40%, 18%, 0.15)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRight: '1px solid hsla(280, 30%, 40%, 0.18)',
      }}
    >
      {/* Brand Header */}
      <Link
        to="/dashboard"
        className="flex items-center gap-3 border-b border-sidebar-border/40 hover:opacity-80 transition-opacity"
        style={{ padding: '12px 16px' }}
      >
        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
          <Compass className="w-4 h-4 text-orange-400" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-bold text-white truncate font-heading tracking-tight">
              Hearth & Horizon
            </h1>
            <p className="text-[10px] text-gray-500 font-medium truncate uppercase tracking-widest">
              {userTier}
            </p>
          </div>
        )}
      </Link>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 custom-scrollbar">
        <div className="px-3">
          <Link
            to={STANDALONE.path}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
              location.pathname === STANDALONE.path
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            )}
          >
            <STANDALONE.icon className={cn(
              "w-5 h-5 shrink-0",
              location.pathname === STANDALONE.path ? "text-orange-400" : "group-hover:text-gray-200"
            )} />
            {!collapsed && <span className="text-sm font-medium">{STANDALONE.label}</span>}
          </Link>
        </div>

        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="px-3 space-y-1">
            {!collapsed && (
              <h2 className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                {group.label}
              </h2>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                    location.pathname === item.path
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 shrink-0",
                    location.pathname === item.path ? "text-orange-400" : "group-hover:text-gray-200"
                  )} />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border/40 space-y-2">
        <button
          onClick={() => base44.auth.logout()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full group"
        >
          <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-1" />
          {!collapsed && <span className="text-sm font-medium text-left">Logout</span>}
        </button>

        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full py-2 text-gray-500 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}