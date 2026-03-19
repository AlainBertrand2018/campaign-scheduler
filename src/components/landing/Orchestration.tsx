'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Clock, Layers, Sparkles } from 'lucide-react';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8, bounce: 0 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function Orchestration() {
  return (
    <section id="orchestration" className="min-h-screen flex flex-col justify-center py-24 bg-white border-b border-slate-200 relative">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={STAGGER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="max-w-2xl">
            <motion.h2 variants={FADE_UP} className="text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-slate-900 mb-6">
              Automated Campaign <span className="text-blue-600">Orchestration.</span>
            </motion.h2>
            <motion.p variants={FADE_UP} className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Upload your brand DNA. Review AI-generated creative. Approve and schedule. The entire marketing workflow, unified by specialized agents for continuous output.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/os" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                Initialize Swarm <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded font-medium hover:bg-slate-50 transition-colors text-center shadow-sm">
                View Architecture
              </a>
            </motion.div>
          </div>

          <motion.div variants={FADE_UP} className="relative border border-slate-200 bg-white rounded-xl shadow-2xl p-4 hidden lg:block overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10" />
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-200" /><div className="w-3 h-3 rounded-full bg-slate-200" /><div className="w-3 h-3 rounded-full bg-slate-200" /></div>
              <div className="text-xs text-slate-400 font-mono ml-4 text-center">app.gravity.ai/os</div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><div className="h-4 w-32 bg-slate-100 rounded" /><div className="h-6 w-20 bg-emerald-50 text-emerald-600 rounded text-[10px] flex items-center justify-center font-bold">APPROVED</div></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 h-32 flex flex-col justify-end"><div className="h-2 w-full bg-slate-200 rounded mb-2" /><div className="h-2 w-2/3 bg-slate-200 rounded" /></div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 h-32 flex flex-col justify-end relative overflow-hidden"><div className="absolute inset-0 bg-blue-50/50" /><div className="h-2 w-5/6 bg-blue-200 rounded mb-2 relative z-10" /><div className="h-2 w-1/2 bg-blue-200 rounded relative z-10" /></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: 'Extreme Time-Saving', desc: 'Condense three days of work into a single click.' },
            { icon: Layers, title: 'Your Brand... YOUR VOICE', desc: 'No "prompt engineering" required. Pure brand DNA.' },
            { icon: Sparkles, title: 'Agency Standard', desc: 'Premium outputs that look highly intentional.' }
          ].map((adv, i) => {
            const Icon = adv.icon;
            return (
              <motion.div key={i} variants={FADE_UP} className="p-8 bg-slate-50/50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                <Icon size={28} className="text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{adv.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{adv.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
