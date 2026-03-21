'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisualVariant {
    variant_id: string;
    image_url: string;
    headline: string;
    description: string;
    style_label: string;
}

interface NanoBananaProps {
    variants: VisualVariant[];
}

export const NanoBananaVisualizer: React.FC<NanoBananaProps> = ({ variants: initialVariants }) => {
    const [variants, setVariants] = useState(initialVariants);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTextUpdate = (index: number, field: 'headline' | 'description', value: string) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };

    const activeVariant = variants[activeIndex];

    return (
        <div className="swarm-card bg-black/40 border-2 border-yellow-500/20 shadow-2xl overflow-hidden relative group">
            <header className="flex justify-between items-center bg-yellow-500/5 -m-6 p-6 border-b border-yellow-500/10 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black text-xl font-black">
                        🍌
                    </div>
                    <div>
                        <span className="brand-label !text-yellow-500">Node 04: Visual Execution</span>
                        <h2 className="text-xl font-bold tracking-tight">Nano Banana Engine</h2>
                    </div>
                </div>
                <div className="flex gap-2">
                    {variants.map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${activeIndex === i ? 'bg-yellow-400 scale-125' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[500px]">
                {/* Visual Preview Area */}
                <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-inner group/preview">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeVariant.variant_id}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <img 
                                src={activeVariant.image_url} 
                                alt={activeVariant.style_label}
                                className="w-full h-full object-cover opacity-60"
                            />
                            
                            {/* LIVE OVERLAY LAYER */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="max-w-lg space-y-4"
                                >
                                    <span className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded">
                                        {activeVariant.style_label}
                                    </span>
                                    <h3 
                                        className="text-4xl font-black leading-tight tracking-tighter text-white drop-shadow-2xl"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleTextUpdate(activeIndex, 'headline', e.currentTarget.innerText)}
                                    >
                                        {activeVariant.headline}
                                    </h3>
                                    <p 
                                        className="text-lg text-slate-200 leading-relaxed font-medium"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleTextUpdate(activeIndex, 'description', e.currentTarget.innerText)}
                                    >
                                        {activeVariant.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-yellow-400 opacity-0 group-hover/preview:opacity-100 transition-opacity bg-black/60 px-2 py-1 rounded">
                        LIVE EDIT ENABLED / 4000x4000px
                    </div>
                </div>

                {/* Variants Selection Sidebar */}
                <div className="lg:col-span-4 space-y-4 h-full overflow-y-auto pr-2">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">Select Style Variant</h4>
                    {variants.map((v, i) => (
                        <button 
                            key={v.variant_id}
                            onClick={() => setActiveIndex(i)}
                            className={`w-full p-4 rounded-2xl border transition-all text-left flex gap-4 ${activeIndex === i ? 'bg-yellow-400/10 border-yellow-400/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                        >
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                                <img src={v.image_url} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center overflow-hidden">
                                <span className={`text-[9px] font-black uppercase ${activeIndex === i ? 'text-yellow-400' : 'text-slate-500'}`}>
                                    Style 0{i+1}
                                </span>
                                <h5 className="text-[13px] font-bold truncate">{v.style_label}</h5>
                                <p className="text-[11px] opacity-40 truncate">{v.headline}</p>
                            </div>
                        </button>
                    ))}
                    
                    <button className="w-full mt-8 py-5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all flex items-center justify-center gap-2">
                        Download All Assets (ZIP) <span>📥</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
