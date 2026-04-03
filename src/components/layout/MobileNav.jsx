import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ArrowLeftRight, Target, Heart, Compass, HandHeart, Trees, Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Hearth', icon: LayoutDashboard },
  { path: '/translator', label: 'Bridge', icon: ArrowLeftRight },
  { path: '/embers', label: 'Embers', icon: Flame },
  { path: '/canopy', label: 'Canopy', icon: Trees },
  { path: '/support', label: 'Grove', icon: HandHeart },
  { path: '/cultural-fit', label: 'Ecosystem', icon: Compass },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border z-50">
      <div className="flex items-center justify-between px-3 py-3">
        {/* Left: Clickable Hearth & Horizon Header */}
        <Link
          to="/"
          className="flex items-center gap-2 flex-1 min-w-0 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Compass className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-semibold text-sm text-foreground truncate">Hearth & Horizon</span>
        </Link>

        {/* Right: Navigation Icons */}
        <div className="flex gap-0.5 ml-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "h-9 w-9 rounded-lg flex items-center justify-center transition-all",
                  isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/20"
                )}
                title={item.label}
              >
                <item.icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}