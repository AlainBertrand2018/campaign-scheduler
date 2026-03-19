'use client';

import { CalendarClock } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold italic tracking-tight">Campaign Calendar</h1>
        <p className="text-slate-400 mt-2">Visual timeline of scheduled social drops and approvals.</p>
      </header>

      <div className="card-premium min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
        <div className="p-6 bg-brand-secondary/10 rounded-full text-brand-secondary">
          <CalendarClock size={48} />
        </div>
        <div>
          <h2 className="text-xl font-bold italic">Dynamic Scheduler Hub</h2>
          <p className="text-slate-500 max-w-sm mx-auto mt-2">
            The multi-channel temporal alignment engine is currently being optimized.
          </p>
        </div>
      </div>
    </div>
  );
}
