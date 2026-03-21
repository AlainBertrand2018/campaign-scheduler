'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  BrainCircuit, 
  Search, 
  ShieldCheck, 
  Terminal, 
  Fingerprint, 
  Scan, 
  Eye, 
  Database,
  Globe,
  Activity
} from 'lucide-react';
import Image from 'next/image';

interface SwarmIntelligenceHubProps {
  status: 'idle' | 'synthesizing' | 'orchestrating' | 'executing' | 'ready' | 'error';
  logs: any[];
  targetName?: string;
  targetUrl?: string;
  onRetry?: () => void;
}

export default function SwarmIntelligenceHub({ status, logs, targetName, targetUrl, onRetry }: SwarmIntelligenceHubProps) {
  const [currentView, setCurrentView] = useState<'scan' | 'logo' | 'moodboard' | 'dna'>('scan');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-cycle through the visual discovery views during synthesis
  useEffect(() => {
    if (status === 'synthesizing' || status === 'orchestrating') {
      const interval = setInterval(() => {
        setCurrentView(prev => {
          if (prev === 'scan') return 'logo';
          if (prev === 'logo') return 'moodboard';
          if (prev === 'moodboard') return 'dna';
          return 'scan';
        });
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Scroll to bottom of logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 selection:bg-indigo-500/20">
      
      {/* 1. Large Graphical Discovery Pane */}
      <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-950 border-2 border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/5 group">
        
        {/* Main Visual Carousel (The Visual Scraper) */}
        <AnimatePresence mode="wait">
          {currentView === 'scan' && (
            <motion.div 
               key="scan" 
               initial={{ opacity: 0, scale: 1.1 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, filter: 'blur(10px)' }}
               className="absolute inset-0"
            >
               <Image 
                 src="/swarm/scanned_website.png" 
                 alt="Scanning Website..." 
                 fill 
                 className="object-cover opacity-60 mix-blend-screen"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-indigo-500/10" />
               <div className="absolute top-6 left-6 flex items-center gap-3">
                  <Scan className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Targeting Index Graph...</span>
               </div>
            </motion.div>
          )}

          {currentView === 'logo' && (
            <motion.div 
               key="logo" 
               initial={{ opacity: 0, scale: 1.1 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, filter: 'blur(10px)' }}
               className="absolute inset-0"
            >
               <Image 
                 src="/swarm/logo_analysis.png" 
                 alt="Logo Analysis..." 
                 fill 
                 className="object-cover opacity-60 mix-blend-screen"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-indigo-500/10" />
               <div className="absolute top-6 left-6 flex items-center gap-3">
                  <Fingerprint className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Extracting Identity Constants...</span>
               </div>
            </motion.div>
          )}

          {currentView === 'moodboard' && (
            <motion.div 
               key="moodboard" 
               initial={{ opacity: 0, scale: 1.1 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, filter: 'blur(10px)' }}
               className="absolute inset-0"
            >
               <Image 
                 src="/swarm/moodboard.png" 
                 alt="Visual Synthesis..." 
                 fill 
                 className="object-cover opacity-60 mix-blend-screen"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-indigo-500/10" />
               <div className="absolute top-6 left-6 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Synthesising Aesthetic DNA...</span>
               </div>
            </motion.div>
          )}

          {currentView === 'dna' && (
            <motion.div 
               key="dna" 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl"
            >
               {/* 🧬 Double Helix Animation Wrapper */}
               <div className="relative w-64 h-64 flex items-center justify-center">
                  <DNAHelix />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                     <BrainCircuit className="w-12 h-12 text-indigo-400 animate-pulse mb-3" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Neural Sync</span>
                     <span className="text-[8px] text-slate-500 uppercase font-bold mt-1">Status: Stable</span>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
        
        {/* Dynamic Status Badges */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
           <div className="flex gap-2">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 backdrop-blur-md">
                <Globe size={12} className="text-indigo-400" /> Cluster #A1
             </span>
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 backdrop-blur-md">
                <Database size={12} className="text-indigo-400" /> Vector: 4,231
             </span>
           </div>
           <div className="px-3 py-1 bg-indigo-600 rounded-lg text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-600/30">
              <Zap size={12} fill="currentColor" /> {status.toUpperCase()}
           </div>
        </div>
      </div>

      {/* 2. Intelligence Stream (Logs) */}
      <div className="flex flex-col h-full space-y-4">
        <header className="flex flex-col gap-2 border-b border-white/5 pb-4">
           <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] flex items-center gap-3">
                 <Terminal size={14} /> Intelligence Feed
              </h3>
              <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
           </div>
           {(targetName || targetUrl) && (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                <span className="text-[9px] font-black text-white uppercase tracking-tighter truncate max-w-[120px]">
                  {targetName || 'Anonymous'}
                </span>
                <span className="text-slate-700 font-mono text-[9px]">|</span>
                <span className="text-[9px] font-mono text-slate-500 truncate lowercase">
                  {targetUrl || 'Internal Trace'}
                </span>
             </div>
           )}
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 bg-slate-900/50 border border-white/5 rounded-3xl p-6 font-mono text-[11px] overflow-y-auto space-y-4 scroll-smooth min-h-[350px] scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-indigo-500/20"
        >
          {logs.map((log, i) => (
            <motion.div 
              key={log.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 leading-relaxed"
            >
              <span className={`shrink-0 font-bold ${
                log.type === 'success' ? 'text-emerald-500' : 
                log.type === 'error' ? 'text-rose-500' : 'text-indigo-500'
              }`}>
                [{log.agent}]
              </span>
              <span className="text-slate-400 break-words">{log.message}</span>
            </motion.div>
          ))}
          
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex flex-col items-center gap-4 text-center"
            >
               <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Swarm Sync Disrupted</span>
               {onRetry && (
                 <button 
                  onClick={onRetry}
                  className="px-6 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-rose-500/20 hover:scale-105 transition-all"
                 >
                   System Reboot
                 </button>
               )}
            </motion.div>
          )}

          {(status === 'synthesizing' || status === 'orchestrating' || status === 'executing') && (
            <div className="flex items-center gap-2 text-indigo-400/50">
               <span className="animate-bounce">...</span>
               <span className="text-[10px] uppercase font-black tracking-widest">Awaiting insight from Swarm</span>
            </div>
          )}
        </div>
        
        {/* Agent Activity Grid */}
        <div className="grid grid-cols-4 gap-2">
           {['DNA', 'Copy', 'Visual', 'Enola'].map(agent => (
             <div key={agent} className="bg-slate-950 border border-white/5 p-3 rounded-2xl flex flex-col items-center gap-2 opacity-50 group hover:opacity-100 transition-all cursor-crosshair">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Activity size={14} />
                </div>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{agent} Node</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

// 🧬 CSS/Framer-Motion Enhanced DNA Helix Visualizer
function DNAHelix() {
  return (
    <div className="flex items-center gap-1.5 h-32 relative">
       {[...Array(12)].map((_, i) => (
         <motion.div 
           key={i}
           animate={{ 
             height: [20, 100, 20],
             opacity: [0.1, 0.5, 0.1]
           }}
           transition={{ 
             repeat: Infinity, 
             duration: 2, 
             delay: i * 0.1,
             ease: "easeInOut" 
           }}
           className="w-1 bg-indigo-500/30 rounded-full"
         />
       ))}
    </div>
  );
}
