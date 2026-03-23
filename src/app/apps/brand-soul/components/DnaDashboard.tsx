'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  MessageSquare, 
  Target, 
  Award,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { Variants, Transition } from 'framer-motion';

interface Props {
  data: any;
  onGenerateReport: (type?: 'master' | 'deck') => void;
}

export default function DnaDashboard({ data, onGenerateReport }: Props) {
  if (!data) return null;

  const { foundation, visual, voice, positioning, campaign, audit, product } = data;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1, 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      } as Transition
    })
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e4e4e7] p-4 md:p-8 font-sans selection:bg-[#3b82f6]/30">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent">
            {foundation?.brand_name || 'Enola AI Profile'}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-[#71717a]">
             <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181b] border border-[#27272a] text-xs font-medium uppercase tracking-wider">
               {foundation?.brand_maturity || 'Brand Profile'}
             </span>
             <span className="text-sm border-l border-[#27272a] pl-4 italic">
               "{foundation?.brand_promise || 'Strategic Intelligence Powered by Enola'}"
             </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => onGenerateReport()}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-extrabold rounded-2xl hover:bg-[#d4d4d8] active:scale-95 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.15)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Download size={20} className="animate-bounce" />
            <span className="uppercase tracking-widest text-xs">View High-Impact Strategy Deck</span>
          </button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 1. Brand Personality & Story (Col 1-8) */}
        <motion.div 
          custom={0} variants={cardVariants} initial="hidden" animate="visible"
          className="md:col-span-8 p-8 rounded-3xl bg-[#121214] border border-[#1e1e21] shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
             <Shield size={160} strokeWidth={0.5} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-[#3b82f6]" size={22} />
            <h2 className="text-lg font-semibold tracking-wide text-white uppercase">Brand Personality & Narrative</h2>
          </div>
          <p className="text-lg text-[#d4d4d8] leading-relaxed max-w-3xl">
            {foundation?.personality_scores?.commentary || 'Analysis pending extraction.'}
          </p>
          <div className="mt-8 pt-8 border-t border-[#1e1e21]">
             <p className="text-[#a1a1aa] italic leading-relaxed">
               {foundation?.brand_story?.split('\n')[0] || 'Primary brand story context.'}
             </p>
          </div>
        </motion.div>

        {/* 2. Readiness Score (Col 9-12) */}
        <motion.div 
          custom={1} variants={cardVariants} initial="hidden" animate="visible"
          className="md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-[#121214] to-[#0a0a0b] border border-[#1e1e21] flex flex-col justify-center text-center overflow-hidden relative"
        >
          <div className="mb-4 text-[#a1a1aa] text-xs font-bold uppercase tracking-[0.2em]">Readiness Score</div>
          <div className="relative inline-block mx-auto mb-6">
             <svg className="w-32 h-32 transform -rotate-90">
                <circle className="text-[#18181b]" strokeWidth="6" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                <circle 
                  className="text-[#3b82f6]" strokeWidth="6" 
                  strokeDasharray={364} 
                  strokeDashoffset={364 - (364 * (audit?.overall_score || 80)) / 100} 
                  strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" 
                />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{audit?.overall_score || 85}</span>
                <span className="text-sm text-[#71717a] ml-0.5 mb-2">%</span>
             </div>
          </div>
          <p className="text-sm text-[#a1a1aa] mb-6 px-4">
             {audit?.scoring_benchmark_explanation || 'High probability for campaign success based on signal alignment.'}
          </p>
          <div className="bg-[#18181b] rounded-2xl p-4 text-left border border-[#27272a]">
             <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 size={14} className="mt-0.5 text-[#3b82f6] shrink-0" />
                <span className="text-[#d4d4d8]"><b className="text-white">Source Quality:</b> {audit?.data_quality_indicators || 'Strong'}</span>
             </div>
             <div className="flex items-start gap-2 text-xs mt-3">
                <Target size={14} className="mt-0.5 text-[#3b82f6] shrink-0" />
                <span className="text-[#d4d4d8]"><b className="text-white">Top Objective:</b> {campaign?.top_objectives?.[0] || 'Brand Awareness'}</span>
             </div>
          </div>
        </motion.div>

        {/* 3. Color Palette (Col 1-4) */}
        <motion.div 
          custom={2} variants={cardVariants} initial="hidden" animate="visible"
          className="md:col-span-4 p-8 rounded-3xl bg-[#121214] border border-[#1e1e21]"
        >
          <div className="flex items-center gap-3 mb-8">
            <Palette className="text-[#3b82f6]" size={20} />
            <h2 className="text-lg font-semibold tracking-wide text-white uppercase">Color Palette</h2>
          </div>
          <div className="flex flex-col gap-6">
            {(visual?.extracted_app_colors?.slice(0, 3).length > 0 ? visual.extracted_app_colors.slice(0, 3) : ['#3b82f6', '#121214', '#ffffff']).map((color: string, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl shadow-lg border border-white/10" 
                  style={{ backgroundColor: color }}
                />
                <div>
                   <div className="text-xs font-bold text-[#71717a] uppercase mb-1">
                     {i === 0 ? 'Primary' : i === 1 ? 'Secondary' : 'Accent'}
                   </div>
                   <div className="text-lg font-mono text-white tabular-nums">{color.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4. Typography (Col 5-8) */}
        <motion.div 
          custom={3} variants={cardVariants} initial="hidden" animate="visible"
          className="md:col-span-4 p-8 rounded-3xl bg-[#121214] border border-[#1e1e21]"
        >
          <div className="flex items-center gap-3 mb-8">
            <Type className="text-[#3b82f6]" size={20} />
            <h2 className="text-lg font-semibold tracking-wide text-white uppercase">Typography</h2>
          </div>
          <div className="space-y-8">
             <div className="p-6 bg-[#18181b] rounded-2xl border border-[#27272a] group hover:border-[#3b82f6]/50 transition-colors">
                <div className="text-4xl mb-3 flex items-baseline gap-2">
                   <span className="text-white">Aa</span>
                   <span className="text-sm text-[#71717a] font-mono whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                     {visual?.primary_typography || 'Inter'}
                   </span>
                </div>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                   Used for headlines and primary brand statements. Projects authority and clarity.
                </p>
             </div>
             <div className="flex items-center justify-between px-2">
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-[#71717a] uppercase">Secondary Family</span>
                   <span className="text-sm text-white font-medium">{visual?.secondary_typography || 'Serif'}</span>
                </div>
                <div className="text-2xl text-[#3b82f6]/50">Abc</div>
             </div>
          </div>
        </motion.div>

        {/* 5. Imagery Gallery (Col 9-12) */}
        <motion.div 
          custom={4} variants={cardVariants} initial="hidden" animate="visible"
          className="md:col-span-4 p-8 rounded-3xl bg-[#121214] border border-[#1e1e21]"
        >
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-[#3b82f6]" size={20} />
            <h2 className="text-lg font-semibold tracking-wide text-white uppercase">Visual Assets</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
             {visual?.extracted_app_images?.slice(0, 3).length > 0 ? (
               visual.extracted_app_images.slice(0, 3).map((url: string, i: number) => (
                 <div key={i} className={`rounded-xl overflow-hidden border border-[#27272a] ${i === 0 ? 'col-span-2' : ''}`}>
                    <img src={url} alt="Brand Signal" className="w-full h-24 object-cover" />
                 </div>
               ))
             ) : (
               <>
                 <div className="col-span-2 h-32 rounded-xl bg-[#18181b] flex items-center justify-center border border-dashed border-[#27272a]">
                   <span className="text-xs text-[#52525b]">No images extracted</span>
                 </div>
                 <div className="h-24 rounded-xl bg-[#18181b] border border-dashed border-[#27272a]" />
                 <div className="h-24 rounded-xl bg-[#18181b] border border-dashed border-[#27272a]" />
               </>
             )}
          </div>
        </motion.div>

        {/* 6. Voice & Positioning (Col 1-12 full width) */}
        <motion.div 
          custom={5} variants={cardVariants} initial="hidden" animate="visible"
          className="md:col-span-12 p-10 rounded-3xl bg-[#121214] border border-[#1e1e21] shadow-2xl overflow-hidden relative"
        >
          <div className="absolute bottom-0 right-0 p-12 opacity-[0.05] pointer-events-none">
             <MessageSquare size={200} strokeWidth={0.5} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Tone & Signature */}
            <div className="space-y-8">
               <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={16} className="text-[#3b82f6]" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Brand Tone</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(voice?.five_word_summary || 'Professional, Clear, Robust, Direct, Effective').split(',').map((word: string, i: number) => (
                       <span key={i} className="px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-[#d4d4d8]">
                         {word.trim()}
                       </span>
                    ))}
                  </div>
               </div>
               
               <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={16} className="text-[#3b82f6]" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Signature Expressions</span>
                  </div>
                  <ul className="space-y-3">
                     {[
                       foundation?.brand_promise || 'Quality provided.',
                       foundation?.mission || 'Mission pending.',
                       foundation?.vision || 'Vision pending.'
                     ].slice(0, 3).map((exp, i) => (
                       <li key={i} className="flex gap-3 text-sm text-[#a1a1aa]">
                         <span className="text-[#3b82f6] italic">{i === 0 ? '"' : i === 1 ? '•' : '✓'}</span>
                         <span>{exp}</span>
                       </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Value Proposition */}
            <div className="md:col-span-2">
               <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield size={16} className="text-[#3b82f6]" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Strategic Value Proposition</span>
                  </div>
                  <p className="text-xl md:text-2xl text-white font-medium leading-snug">
                    {product?.value_canvas_analysis || product?.value_canvas?.jobs_to_be_done?.[0] || 'Value proposition under development.'}
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Primary Differentiator', val: positioning?.competitors?.[0]?.differentiation || 'Market Position' },
                    { label: 'Emotional Hook', val: product?.feature_mapping?.[0]?.emotional_outcome || 'User Trust' },
                    { label: 'Audience Fit', val: foundation?.usp_strength_analysis || 'Balanced' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-[#18181b] border border-[#27272a] rounded-2xl">
                       <div className="text-[10px] font-bold text-[#71717a] uppercase mb-1 tracking-wider">{item.label}</div>
                       <div className="text-sm text-[#d4d4d8] font-medium leading-tight">{item.val}</div>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Footer / Citation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center text-[#52525b] text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4"
      >
        <div className="h-px w-10 bg-[#1e1e21]" />
        Generated by Enola.ai Director Engine — 2026.03.22
        <div className="h-px w-10 bg-[#1e1e21]" />
      </motion.div>
    </div>
  );
}
