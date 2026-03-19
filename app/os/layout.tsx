import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950">
      {/* Sidebar transforms into Bottom Tab Bar on mobile automatically via CSS in the component */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full pb-32 md:pb-0 overflow-y-auto max-h-screen">
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
