import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import GlobalFooter from './GlobalFooter';
import { cn } from '@/lib/utils';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isEmbers = location.pathname === '/embers';

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300",
          isEmbers ? "h-screen overflow-hidden" : "min-h-screen",
          "pt-16 md:pt-0",
          collapsed ? "md:ml-16" : "md:ml-64"
        )}
        style={{ maxWidth: '100vw', overflowX: 'hidden' }}
      >
        <div
          className={cn(
            isEmbers
              ? "p-4 md:p-8 h-full"
              : "p-4 md:p-8 max-w-6xl mx-auto pb-32 lg:pb-8"
          )}
          style={{ maxWidth: '100vw', overflowX: 'hidden' }}
        >
          <Outlet />
          {!isEmbers && <GlobalFooter />}
        </div>
      </main>
    </div>
  );
}