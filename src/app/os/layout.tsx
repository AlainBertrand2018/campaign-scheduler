import React from 'react';

/**
 * PRODUCTION MICROTOOL LAYOUT
 * Abolished all Sidebar/Dashboard navigation.
 * Total Immersive Protocol: 2026 Shift
 */
export default function IdentityLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* 
          Dashboard Sidebar & Campaign Controls abolished per 
          NON-NEGOTIABLE IMMERSIVE ROLE.
      */}
      <main className="w-full h-full">
          {children}
      </main>
    </div>
  );
}
