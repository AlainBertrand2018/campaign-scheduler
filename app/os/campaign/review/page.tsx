'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Send, 
  MessageSquare, 
  Eye, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  MoreVertical,
  Edit3,
  Lock,
  Unlock
} from 'lucide-react';
import { useCampaignStore } from '@/lib/store/useCampaignStore';

const DUMMY_VARIANTS = [
  {
    id: 1,
    persona: "Tech-Savvy Founders",
    copy: "Stop burning time on manual campaigns. Gravity.ai uses an 11-agent swarm to orchestrate your growth while you sleep.",
    visual_prompt: "Cinematic close-up of a sleek, floating chrome orb in a deep-space nebula, reflecting distant stars. Photorealistic, 8k.",
    qa_score: 98,
    platform: "Twitter/X"
  },
  {
    id: 2,
    persona: "Creative Directors",
    copy: "The muscle your creativity deserves. Meet the AI swarm that handles the ops so you can handle the soul.",
    visual_prompt: "Abstract visualization of colorful light trails forming a human silhouette, vibrant purple and pink hues, glassmorphism style.",
    qa_score: 94,
    platform: "LinkedIn"
  }
];

export default function CampaignReview() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const { user } = useCampaignStore();
  const router = useRouter();

  const isGated = user.tier === 'none';
  const currentVariant = DUMMY_VARIANTS[activeVariant];

  const handleApprove = () => {
    if (isGated) {
      router.push('/os/pricing');
      return;
    }
    
    setIsApproving(true);
    setTimeout(() => {
       router.push('/os/calendar');
    }, 2000);
  };

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Intervention UI</h1>
          <p className="text-slate-400 text-sm">Reviewing: <span className="text-indigo-400 font-medium">Q4 Growth Wave</span></p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-400">Strategist Optimized</span>
        </div>
      </header>

      {/* Blueprint Overview */}
      <section className="mb-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex gap-4 items-start">
        <div className="p-3 bg-indigo-500/10 rounded-xl">
           <TrendingUp className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Strategist's Blueprint</h3>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
             Focused on high-intent conversions. Using a 2-stage multi-variant approach targeting SaaS decision makers across X and LinkedIn.
          </p>
        </div>
      </section>

      {/* Variant Toggle (Mobile Horizontal Scroll-ish) */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {DUMMY_VARIANTS.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(i)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              activeVariant === i 
              ? 'bg-white text-black border-white' 
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'
            }`}
          >
            Variant {v.id}: {v.persona}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeVariant}
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.02 }}
           transition={{ duration: 0.2 }}
           className="space-y-6"
        >
          {/* Main Creative Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* QA Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">QA Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold">{currentVariant.qa_score}</span>
                <span className="text-[10px] text-slate-500 font-bold">% Score</span>
              </div>
            </div>

            {/* Platform Tag */}
            <div className="px-6 pt-6">
               <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 {currentVariant.platform}
               </span>
            </div>

            {/* Copy Display */}
            <div className="p-6 relative">
               <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                 <MessageSquare className="w-3 h-3" />
                 Copy Agent Output
               </h4>
               <div className={`transition-all duration-700 ${isGated ? 'blur-md select-none pointer-events-none' : ''}`}>
                 <p className="text-xl font-medium leading-relaxed italic">
                   "{currentVariant.copy}"
                 </p>
               </div>
               {isGated && (
                 <div className="absolute inset-0 flex items-center justify-center pt-8">
                    <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
                       <Lock className="w-3.5 h-3.5 text-pink-500" />
                       <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Locked Output</span>
                    </div>
                 </div>
               )}
            </div>

            {/* Visual Direction Display */}
            <div className="p-6 pt-0 relative">
               <div className={`p-4 bg-black/40 rounded-2xl border border-slate-800/50 transition-all duration-700 ${isGated ? 'blur-sm select-none pointer-events-none' : ''}`}>
                  <h4 className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    Visual Direction Brief
                  </h4>
                  <p className="text-sm text-slate-400 italic">
                    {currentVariant.visual_prompt}
                  </p>
               </div>
               {isGated && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-lg text-[8px] font-black text-indigo-400 uppercase tracking-[0.3em] rotate-12 pointer-events-none opacity-40 select-none">
                      GRAVITY.AI PREVIEW
                    </div>
                 </div>
               )}
            </div>

            {/* Actions on Variant */}
            <div className="p-4 border-t border-slate-800 bg-white/5 flex gap-2">
               <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all">
                  <Edit3 className="w-4 h-4" />
                  Nudge Agent
               </button>
               <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all">
                  <RotateCcw className="w-4 h-4" />
                  Regenerate
               </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Persistent Approval Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent z-[100]">
        <div className="max-w-md mx-auto flex gap-3">
          <button 
             onClick={() => router.push('/os')}
             className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-xl"
          >
             <XCircle className="w-6 h-6" />
          </button>
          <button 
             onClick={handleApprove}
             disabled={isApproving}
             className={`flex-1 h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all disabled:opacity-50 ${
               isGated 
               ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-pink-500/20' 
               : 'bg-indigo-500 text-white shadow-indigo-500/20'
             }`}
          >
            {isApproving ? (
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 animate-spin" />
                Scheduling...
              </div>
            ) : isGated ? (
              <div className="flex items-center gap-2">
                 <Unlock className="w-5 h-5" />
                 Unlock Full Swarm
              </div>
            ) : (
              <div className="flex items-center gap-2">
                 Approve & Schedule
                 <Send className="w-5 h-5 flex-shrink-0" />
              </div>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
