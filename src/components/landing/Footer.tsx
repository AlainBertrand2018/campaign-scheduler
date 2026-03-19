'use client';

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">G</div>
          <span className="font-semibold text-slate-900 tracking-tight">Gravity.ai</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500 font-medium">
          <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
        </div>
        <div className="text-sm text-slate-400">&copy; 2026 Gravity AI. All rights reserved.</div>
      </div>
    </footer>
  );
}
