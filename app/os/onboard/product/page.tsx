'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Dna, 
  FlaskConical, 
  Sparkles, 
  Mic2, 
  Eye, 
  CheckCircle2, 
  ArrowUpRight,
  Database,
  Trash2,
  Plus,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';

const DNA_CHUNKS = [
  { id: 1, type: 'trait', label: 'Communication Style', value: 'Authoritative, yet accessible', confidence: 98 },
  { id: 2, type: 'trait', label: 'Primary Archetype', value: 'The Visionary Explorer', confidence: 92 },
  { id: 3, type: 'claim', label: 'The Killer Hook', value: '11-Agent Autonomous Swarm', confidence: 99 },
  { id: 4, type: 'visual', label: 'Core Palette', value: 'Slate 950, Indigo 500, Rose 400', confidence: 88 },
];

const KILLER_CLAIMS = [
  { feature: "AI Orchestration", benefit: "Zero manual ops for campaign scaling" },
  { feature: "Multi-Agent QA", benefit: "99.9% brand consistency across platforms" },
  { feature: "Real-time Feedback", benefit: "Live sentiment adjustment every 12 hours" }
];

export default function DNALaboratory() {
  const [activeTab, setActiveTab] = useState('synthesis');
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-2xl">
             <FlaskConical className="w-8 h-8 text-pink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">DNA Laboratory</h1>
            <p className="text-slate-400 text-sm">Synthesized from URL: <span className="text-pink-400">spacex.com</span></p>
          </div>
        </div>
        <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all">
           <RefreshCw className="w-5 h-5 text-slate-400" />
        </button>
      </header>

      {/* Lab Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
         {[
           { label: 'Knowledge Points', value: '1,248', icon: <Database className="w-4 h-4" /> },
           { label: 'Agent Consensus', value: '96%', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
           { label: 'Traits Mapped', value: '42', icon: <Dna className="w-4 h-4 text-pink-400" /> },
           { label: 'Raw Documents', value: '12', icon: <ArrowUpRight className="w-4 h-4 text-slate-500" /> }
         ].map((stat, i) => (
           <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</span>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
           </div>
         ))}
      </div>

      {/* Synthesis Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Voice & Tone Matrix */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <Mic2 className="w-24 h-24 text-pink-500" />
           </div>
           
           <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-pink-400" />
                 Voice & Tone Matrix
              </h3>
              
              <div className="space-y-6">
                {DNA_CHUNKS.map((trait) => (
                  <div key={trait.id} className="space-y-2">
                     <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                        <span className="text-slate-400">{trait.label}</span>
                        <span className="text-pink-400">{trait.confidence}% Consensus</span>
                     </div>
                     <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:border-pink-500/30 transition-all shadow-inner">
                        <span className="text-lg font-medium">{trait.value}</span>
                        <MoreHorizontal className="w-5 h-5 text-slate-600" />
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Visual Identity DNA */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              Visual DNA
           </h3>
           
           <div className="space-y-4">
              <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                 <span className="text-[10px] font-bold text-slate-500 uppercase block mb-3">Aesthetic Keywords</span>
                 <div className="flex flex-wrap gap-2">
                   {['Minimal', 'Aerospace', 'High-Contrast', 'Dark Mode', 'Futuristic'].map(tag => (
                     <span key={tag} className="px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-[10px] font-bold">
                       {tag}
                     </span>
                   ))}
                 </div>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-slate-800">
                 <span className="text-[10px] font-bold text-slate-500 uppercase block mb-3">Color Extraction</span>
                 <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800" />
                    <div className="w-10 h-10 rounded-full bg-indigo-500" />
                    <div className="w-10 h-10 rounded-full bg-pink-500" />
                    <div className="w-10 h-10 rounded-full bg-white" />
                 </div>
              </div>
           </div>
        </div>

        {/* Product DNA Table */}
        <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
           <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">Product Claim Mapping</h3>
              <button className="flex items-center gap-2 text-xs font-bold text-pink-400 hover:bg-pink-500/5 px-3 py-1.5 rounded-lg border border-pink-500/20 transition-all">
                <Plus className="w-4 h-4" />
                Add Custom Claim
              </button>
           </div>
           
           <div className="overflow-x-auto min-h-[200px]">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-white/5 border-b border-slate-800">
                   <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Feature Extraction</th>
                   <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Target User Benefit</th>
                   <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right pr-10">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {KILLER_CLAIMS.map((claim, i) => (
                   <tr key={i} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors group">
                     <td className="px-6 py-4 font-medium text-slate-200">{claim.feature}</td>
                     <td className="px-6 py-4 text-slate-400">{claim.benefit}</td>
                     <td className="px-6 py-4 text-right pr-6">
                       <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-400">
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Floating Action Button for Lab */}
      <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50">
         <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/os/campaign/new')}
            className="w-full h-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 shadow-2xl shadow-pink-500/20 transition-all border border-pink-400/30"
         >
            <Sparkles className="w-6 h-6 animate-pulse" />
            Initialize Campaign Swarm
         </motion.button>
         <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-black">
           Brain DNA Memory: Fully Synthesized
         </p>
      </footer>
    </div>
  );
}
