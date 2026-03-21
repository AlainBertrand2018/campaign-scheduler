'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CopyVariant {
    headline: string;
    body: string;
    cta: string;
    framework: string;
}

interface CopywriterProps {
    variants: CopyVariant[];
}

export const CopywriterVisualizer: React.FC<CopywriterProps> = ({ variants }) => {
    return (
        <div className="swarm-card bg-black/40 border-2 border-indigo-500/20 shadow-2xl relative overflow-hidden group">
            <header className="flex justify-between items-center bg-indigo-500/5 -m-6 p-6 border-b border-indigo-500/10 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg">
                        ✍️
                    </div>
                    <div>
                        <span className="brand-label !text-indigo-400">Node 05: Persuasion Engine</span>
                        <h2 className="text-xl font-bold tracking-tight text-white italic transition-all">Commercial Copy Deck</h2>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {variants.map((v, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-indigo-400/30 transition-all hover:bg-white/[0.07]"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-black uppercase tracking-widest rounded">
                                Variant 0{i+1} / {v.framework}
                            </span>
                            <button className="text-[10px] text-slate-500 hover:text-white transition-colors">COPY</button>
                        </div>
                        
                        <h3 className="text-xl font-black text-white leading-tight mb-3">"{v.headline}"</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6 italic">{v.body}</p>
                        
                        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Selected CTA:</span>
                            <span className="text-xs font-black text-indigo-400 uppercase tracking-tighter">{v.cta}</span>
                        </div>
                    </motion.div>
                ))}

                <div className="md:col-span-2 mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-slate-500 font-medium max-w-sm">
                        Total ROI optimized for platform conversion. Delivered in <span className="text-white font-bold">PRO COPY DECK (PDF)</span> format.
                    </div>
                    <button className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-400 transition-all shadow-xl">
                        Download Copy Deck 📂
                    </button>
                </div>
            </div>
        </div>
    );
};
