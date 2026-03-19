'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Rocket, 
  Calendar, 
  BarChart3, 
  Terminal, 
  Dna, 
  FlaskConical,
  PlusCircle,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/os' },
  { icon: Rocket, label: 'Campaigns', href: '/os/campaigns' },
  { icon: Calendar, label: 'Calendar', href: '/os/calendar' },
  { icon: BarChart3, label: 'Analytics', href: '/os/analytics' },
  { icon: Terminal, label: 'Agent Logs', href: '/os/logs' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex w-72 h-screen bg-slate-900/50 border-r border-slate-800 flex-col p-6 sticky top-0">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-xl italic italic">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white italic">Gravity<span className="text-indigo-500 italic">.ai</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Command Center</p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </Link>
            );
          })}

          <div className="pt-8 space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Onboarding</p>
            <Link
              href="/os/onboard/brand"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === '/os/onboard/brand' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Brand Memory</span>
            </Link>
            <Link
              href="/os/onboard/product"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === '/os/onboard/product' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FlaskConical className="w-5 h-5" />
              <span className="font-medium">Product DNA</span>
            </Link>
          </div>
        </nav>

        <div className="mt-auto p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">AI Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Node Cluster Active</span>
          </div>
        </div>
      </aside>

      {/* --- MOBILE TAB BAR (iOS STYLE) --- */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-around px-4 shadow-2xl z-[9999]">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center gap-1 group">
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-indigo-500 text-white translate-y-[-12px] shadow-xl shadow-indigo-500/40 ring-4 ring-slate-950' : 'text-slate-500'}`}>
                <item.icon className="w-6 h-6" />
              </div>
              {!isActive && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{item.label.split(' ')[0]}</span>}
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-indigo-500 rounded-full" />
              )}
            </Link>
          );
        })}
        
        {/* Quick Launch / DNA Button for Mobile */}
        <Link href="/os/onboard/product" className="flex flex-col items-center gap-1">
          <div className={`p-2 rounded-xl ${pathname.includes('onboard') ? 'bg-pink-500 text-white translate-y-[-12px] shadow-xl shadow-pink-500/40 ring-4 ring-slate-950' : 'text-slate-500'}`}>
             <FlaskConical className="w-6 h-6" />
          </div>
          {!pathname.includes('onboard') && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">DNA</span>}
        </Link>
      </nav>
    </>
  );
}
