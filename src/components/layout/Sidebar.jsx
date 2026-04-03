import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, Target, Heart, Compass,
  ChevronLeft, ChevronRight, LogOut, HandHeart, Trees, Flame
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { cn } from '@/lib/utils';

const STANDALONE = { path: '/', label: 'Your Hearth', icon: LayoutDashboard };

const NAV_GROUPS = [
  {
    label: 'community',
    items: [
      { path: '/support', label: 'The Grove', icon: HandHeart },
      { path: '/embers', label: 'The Embers', icon: Flame },
    ],
  },
  {
    label: 'transition',
    items: [
      { path: '/canopy', label: 'The Canopy', icon: Trees },
      { path: '/translator', label: 'The Linguistic Bridge', icon: ArrowLeftRight },
      { path: '/gap-analyzer', label: 'The Bridge Builder', icon: Target },
      { path: '/identity-anchor', label: 'The Rootwork', icon: Heart },
      { path: '/cultural-fit', label: 'Ecosystem Alignment', icon: Compass },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

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
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border/40">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Compass className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-heading font-semibold text-lg text-white leading-tight">Hearth & Horizon</h1>
            <p className="text-[10px] text-sidebar-foreground/50 tracking-widest">Your sanctuary</p>
          </div>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        {/* Standalone: Your Hearth */}
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
            {/* Group label */}
            {!collapsed && (
              <p
                className="px-3 mb-2 font-medium tracking-widest"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: 'hsla(280, 60%, 72%, 0.7)',
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
                      <span className="text-sm font-medium leading-tight">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout + Collapse */}
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