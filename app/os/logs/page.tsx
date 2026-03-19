'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  UserSearch, 
  PenTool, 
  Eye, 
  Activity,
  Zap,
  BrainCircuit,
  MessagesSquare,
  Play,
  ShieldCheck,
  Layout
} from 'lucide-react';
import { useCampaignStore } from '@/lib/store/useCampaignStore';

const AGENTS = [
  { id: 'brand dna', name: 'DNA Agent', icon: <BrainCircuit className="w-4 h-4" />, color: 'text-indigo-400' },
  { id: 'strategist', name: 'Strategist', icon: <Activity className="w-4 h-4" />, color: 'text-pink-400' },
  { id: 'copy', name: 'Copy Agent', icon: <PenTool className="w-4 h-4" />, color: 'text-purple-400' },
  { id: 'qa', name: 'Creative QA', icon: <ShieldCheck className="w-4 h-4" />, color: 'text-emerald-400' },
];

export default function SwarmLogs() {
  const { swarm, runInitialSynthesis, resetLogs } = useCampaignStore();
  
  const handleTrigger = async () => {
    console.log('[UI_TRIGGER] Manual Test Wave initiated.');
    // Clear old logs first so we see the fresh wave
    resetLogs();
    await runInitialSynthesis();
  };

  const isAgentActive = (agentId: string) => {
    if (swarm.status === 'idle') return false;
    // Simple mapping of status to active agents
    if (swarm.status === 'synthesizing' && agentId === 'brand dna') return true;
    if (swarm.status === 'orchestrating' && (agentId === 'strategist' || agentId === 'copy' || agentId === 'qa')) return true;
    return false;
  };

  return (
    <div className="pb-32 max-w-5xl mx-auto px-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pt-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl relative">
             <Terminal className="w-8 h-8 text-indigo-400" />
             {swarm.status !== 'idle' && (
               <motion.div 
                 animate={{ opacity: [1, 0, 1] }} 
                 transition={{ repeat: Infinity, duration: 1.5 }}
                 className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" 
               />
             )}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Swarm Command Center</h1>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Activity className={`w-3 h-3 ${swarm.status !== 'idle' ? 'animate-pulse text-emerald-400' : ''}`} />
              {swarm.status === 'idle' ? 'System Standby' : `Swarm State: ${swarm.status.toUpperCase()}`}
            </p>
          </div>
        </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={resetLogs}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              CLEAR FEED
            </button>
            <button 
              onClick={handleTrigger}
              disabled={swarm.status === 'synthesizing' || swarm.status === 'orchestrating'}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 font-bold hover:scale-105 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              <Play size={16} fill="currentColor" />
              <span>{swarm.status === 'ready' ? 'RERUN WAVE' : 'TRIGGER TEST WAVE'}</span>
            </button>
          </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Active Agents Column */}
        <aside className="space-y-6">
           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Neural Nodes</h3>
           <div className="space-y-3">
             {AGENTS.map((agent) => {
               const active = isAgentActive(agent.id);
               return (
                <div key={agent.id} className={`p-4 bg-slate-900 border ${active ? 'border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'border-slate-800'} rounded-2xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform ${agent.color}`}>
                        {agent.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{agent.name}</p>
                        <p className={`text-[10px] uppercase font-bold tracking-tighter ${active ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {active ? 'Active' : 'Standby'}
                        </p>
                      </div>
                    </div>
                    {active && (
                       <div className="flex gap-0.5">
                          <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-indigo-500 rounded-full" />
                          <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-indigo-500 rounded-full" />
                          <motion.div animate={{ height: [12, 8, 12] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-indigo-500 rounded-full" />
                       </div>
                    )}
                </div>
               );
             })}
           </div>

           <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Orchestra Health</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Latency</span>
                  <span className="text-emerald-400">22ms</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: swarm.status === 'idle' ? '5%' : '85%' }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
           </div>
        </aside>

        {/* Live Logs Column */}
        <main className="lg:col-span-3 space-y-4">
           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Intelligence Stream / Internal Monologue</h3>
           <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[600px] flex flex-col font-mono relative">
              {/* Terminal Title Bar */}
              <div className="px-5 py-3 bg-slate-800/50 flex items-center justify-between border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-[10px] text-slate-500 flex items-center gap-2 italic">
                  <Cpu className="w-3 h-3" />
                  swarm-node-cluster-v1.26
                </span>
              </div>

              {/* Log Stream */}
              <div className="p-6 space-y-4 flex-1 overflow-y-auto max-h-[650px] scroll-smooth">
                <AnimatePresence initial={false}>
                  {swarm.logs.length === 0 ? (
                    <div className="h-full py-32 flex flex-col items-center justify-center text-white/10 italic">
                      <Terminal className="w-16 h-16 mb-4 opacity-5" />
                      <p className="text-sm">Initiate trigger to establish node connection...</p>
                    </div>
                  ) : (
                    swarm.logs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 group"
                      >
                        <span className="text-slate-600 shrink-0 text-[10px] mt-1">[{log.timestamp}]</span>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                               log.type === 'agent' ? 'bg-indigo-500/10 text-indigo-400' :
                               log.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                               log.type === 'error' ? 'bg-rose-500/10 text-rose-400' :
                               log.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                               'text-slate-500'
                             }`}>
                               {log.agent}
                             </span>
                          </div>
                          <p className={`text-xs ${
                             log.type === 'error' ? 'text-rose-300' :
                             log.type === 'success' ? 'text-emerald-100' :
                             'text-slate-300'
                          } group-hover:text-white transition-colors`}>
                            {log.message}
                          </p>
                          {log.detail && (
                            <p className="text-[10px] text-slate-500 italic max-w-lg">
                              {log.detail}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
                
                {swarm.status !== 'idle' && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-indigo-500 mt-2"
                  />
                )}
              </div>

              {/* Interactive Command Input */}
              <div className="p-4 bg-black/40 border-t border-white/[0.05] flex items-center gap-4">
                 <div className="text-indigo-500 font-bold text-xs">$</div>
                 <input 
                   type="text" 
                   placeholder="Inject desiderata into active swarm..." 
                   className="bg-transparent border-none outline-none flex-1 text-xs text-indigo-300 placeholder:text-slate-700 font-mono"
                 />
                 <MessagesSquare className="w-5 h-5 text-slate-600 hover:text-indigo-400 cursor-pointer" />
              </div>
           </div>
        </main>
      </div>

      {/* Mini-Map / Global Orchestrator Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center pointer-events-none">
         <motion.div 
           initial={{ y: 100 }}
           animate={{ y: 0 }}
           className="bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 p-6 rounded-[2.5rem] flex items-center gap-10 pointer-events-auto"
         >
            <div className="flex items-center gap-6">
               <div className="flex -space-x-3">
                  {AGENTS.map((agent) => (
                    <div 
                      key={agent.id}
                      className={`w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold transition-all ${
                        isAgentActive(agent.id) ? 'bg-indigo-500 scale-110 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-slate-800 text-slate-600'
                      }`}
                    >
                      {agent.name[0]}
                    </div>
                  ))}
               </div>
               <div className="text-xs">
                  <span className="text-slate-100 font-bold block">
                    {swarm.status === 'idle' ? 'Ready for Wave' : 'Node Cluster Active'}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {[1,2,3].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ 
                            opacity: swarm.status === 'idle' ? 0.2 : [0.2, 1, 0.2],
                            scale: swarm.status === 'idle' ? 1 : [1, 1.2, 1]
                          }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        />
                      ))}
                    </div>
                    <span className="text-slate-500 text-[10px] uppercase font-black">Sync Protocol v4</span>
                  </div>
               </div>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-800" />
            
            <div className="flex items-center gap-3">
              <button className="p-3 bg-slate-800 text-slate-200 rounded-2xl hover:bg-slate-700 transition-all">
                <ShieldCheck className="w-5 h-5" />
              </button>
              <button 
                onClick={() => window.open('/os/campaign/review')}
                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all"
              >
                <Layout className="w-4 h-4" />
                DASHBOARD
              </button>
            </div>
         </motion.div>
      </footer>
    </div>
  );
}
