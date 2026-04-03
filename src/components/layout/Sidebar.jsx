import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, Target, Heart, Compass,
  ChevronLeft, ChevronRight, LogOut, HandHeart, Trees, Flame
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { cn } from '@/lib/utils';

const NAV_GROUPS = [
  {
    label: 'home',
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/embers', label: 'The Embers', icon: Flame },
      { path: '/canopy', label: 'The Canopy', icon: Trees },
    ],
  },
  {
    label: 'translation',
    items: [
      { path: '/translator', label: 'The Linguistic Bridge', icon: ArrowLeftRight },
      { path: '/gap-analyzer', label: 'The Bridge Builder', icon: Target },
    ],
  },
  {
    label: 'community',
    items: [
      { path: '/support', label: 'The Grove', icon: HandHeart },
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
        background: 'hsla(280, 25%, 10%, 0.10)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRight: '1px solid hsl(280 18% 20%)',
      }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Compass className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-heading font-semibold text-lg text-white leading-tight">Hearth & Horizon</h1>
            <p className="text-[10px] text-sidebar-foreground/60 tracking-widest">Your sanctuary</p>
          </div>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto space-y-6">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.label}>
            {/* Group label — hidden when collapsed */}
            {!collapsed && (
              <p
                className="px-3 mb-2 text-sidebar-foreground/40 uppercase"
                style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
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
                      'flex items-center gap-3 rounded-lg transition-all duration-200 group',
                      collapsed ? 'justify-center' : '',
                      isActive
                        ? 'bg-sidebar-accent text-white'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white'
                    )}
                    style={{ padding: '12px' }}
                  >
                    <item.icon
                      className={cn(
                        'flex-shrink-0 transition-colors',
                        isActive
                          ? 'text-sidebar-primary'
                          : 'text-sidebar-foreground/50 group-hover:text-sidebar-primary'
                      )}
                      style={{ width: '20px', height: '20px' }}
                    />
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

      {/* Toggle & Logout */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => base44.auth.logout()}
          className={cn(
            'flex items-center gap-3 rounded-lg text-sidebar-foreground/50 hover:text-white hover:bg-sidebar-accent/50 transition-all w-full',
            collapsed ? 'justify-center' : ''
          )}
          style={{ padding: '12px' }}
        >
          <LogOut style={{ width: '20px', height: '20px' }} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full py-2 rounded-lg text-sidebar-foreground/40 hover:text-white hover:bg-sidebar-accent/50 transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}