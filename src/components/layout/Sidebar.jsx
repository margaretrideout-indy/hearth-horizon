import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Target, 
  Heart, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  HandHeart, 
  Trees, 
  Flame, 
  Lock, 
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
    ],
  },
];

const ALLOWED_TIERS = ['Hearthkeeper', 'Steward', 'Patron'];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  const userTier = user?.subscription_tier || 'Seedling';
  const hasFullAccess = ALLOWED_TIERS.includes(userTier);

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
      <Link
        to="/dashboard"
        className="flex items-center gap-3 border-b border-sidebar-border/40 hover:opacity-80 transition-opacity"
        style={{ padding: '12px 16px' }}
      >
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Compass className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <h1 className="font-heading font-semibold text-lg text-white leading-tight truncate">Hearth & Horizon</h1>
            <p className="text-[10px] text-sidebar-foreground/50 tracking-widest truncate">Your sanctuary</p>
          </div>
        )}
      </Link>

      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <div style={{ marginBottom: '24px' }}>
          {(() => {
            const item = STANDALONE;
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                className={`flex items-center gap-3 rounded-xl transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
                style={{
                  padding: '10px 12px',
                  background: isActive ? 'hsla(183, 80%, 38%, 0.12)' : 'transparent',
                  boxShadow: isActive ? '0 0 12px 0 hsla(183, 80%, 38%, 0.25), inset 0 0 0 1px hsla(183, 80%, 38%, 0.2)' : 'none',
                  color: isActive ? 'hsl(183, 80%, 75%)' : 'hsla(270, 15%, 75%, 0.7)',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'hsla(183, 80%, 38%, 0.07)'; e.currentTarget.style.color = 'hsl(270, 20%, 92%)'; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'hsla(270, 15%, 75%, 0.7)'; }}}
              >
                <span className="flex items-center justify-center flex-shrink-0 rounded-lg" style={{ padding: '12px', width: '20px', height: '20px' }}>
                  <item.icon style={{ width: '20px', height: '20px', color: isActive ? 'hsl(183, 80%, 55%)' : 'inherit', filter: isActive ? 'drop-shadow(0 0 4px hsla(183, 80%, 55%, 0.6))' : 'none', flexShrink: 0 }} />
                </span>
                {!collapsed && <span className="text-sm font-medium leading-tight">{item.label}</span>}
              </Link>
            );
          })()}
        </div>

        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label} style={{ marginBottom: gi < NAV_GROUPS.length - 1 ? '24px' : 0 }}>
            {!collapsed && (
              <p
                className="px-3 mb-2 font-medium tracking-widest"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'hsl(280, 65%, 72%)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {group.label}
              </p>
            )}

            <div className="space-y-0.5">
              {group.items.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 rounded-xl transition-all duration-200 group',
                      collapsed ? 'justify-center' : '',
                    )}
                    style={{
                      padding: '10px 12px',
                      background: isActive
                        ? 'hsla(183, 80%, 38%, 0.12)'
                        : 'transparent',
                      boxShadow: isActive
                        ? '0 0 12px 0 hsla(183, 80%, 38%, 0.25), inset 0 0 0 1px hsla(183, 80%, 38%, 0.2)'
                        : 'none',
                      color: isActive ? 'hsl(183, 80%, 75%)' : 'hsla(270, 15%, 75%, 0.7)',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'hsla(183, 80%, 38%, 0.07)';
                        e.currentTarget.style.color = 'hsl(270, 20%, 92%)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'hsla(270, 15%, 75%, 0.7)';
                      }
                    }}
                  >
                    <span
                      className="flex items-center justify-center flex-shrink-0 rounded-lg"
                      style={{
                        padding: '12px',
                        width: '20px',
                        height: '20px',
                      }}
                    >
                      <item.icon
                        style={{
                          width: '20px',
                          height: '20px',
                          color: isActive ? 'hsl(183, 80%, 55%)' : 'inherit',
                          filter: isActive ? 'drop-shadow(0 0 4px hsla(183, 80%, 55%, 0.6))' : 'none',
                          flexShrink: 0,
                        }}
                      />
                    </span>
                    {!collapsed && (
                      <span className="flex-1 text-sm font-medium leading-tight">{item.label}</span>
                    )}
                    {!collapsed && item.path === '/gap-analyzer' && !hasFullAccess && (
                      <Lock className="w-3 h-3 opacity-40 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-sidebar-border/30 space-y-1">
        <button
          onClick={() => base44.auth.logout()}
          className={cn(
            'flex items-center gap-3 rounded-xl w-full transition-all duration-200',
            'text-sidebar-foreground/40 hover:text-white hover:bg-sidebar-accent/40',
            collapsed ? 'justify-center' : ''
          )}
          style={{ padding: '10px 12px' }}
        >
          <LogOut style={{ width: '20px', height: '20px', flexShrink: 0 }} />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full py-2 rounded-lg text-sidebar-foreground/30 hover:text-white hover:bg-sidebar-accent/30 transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}