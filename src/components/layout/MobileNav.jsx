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
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-heading font-semibold text-sm">Hearth & Horizon</span>
        </div>
        <div className="flex gap-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive ? "bg-accent text-primary" : "text-muted-foreground"
                )}
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