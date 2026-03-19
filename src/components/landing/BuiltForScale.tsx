'use client';

import { motion, Variants } from 'framer-motion';
import { UserCircle, BriefcaseBusiness, Building2 } from 'lucide-react';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8, bounce: 0 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function BuiltForScale() {
  return (
    <section id="audiences" className="py-24 bg-white border-b border-slate-200">
      <motion.div className="max-w-6xl mx-auto px-6" variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <div className="mb-16 max-w-2xl">
          <motion.h2 variants={FADE_UP} className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Built for your scale.</motion.h2>
          <motion.p variants={FADE_UP} className="text-slate-600 text-lg">Whether you need one asset today, or a thousand campaigns tomorrow.</motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div variants={FADE_UP} className="p-8 bg-white rounded-xl shadow-sm border border-slate-200/60">
            <div className="w-12 h-12 bg-blue-50 rounded text-blue-600 flex items-center justify-center mb-6"><UserCircle size={24} /></div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">One-Shot Creators</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Unbundled micro-tools on a pay-as-you-go basis.</p>
          </motion.div>
          <motion.div variants={FADE_UP} className="p-8 bg-white rounded-xl border-t-4 border-blue-600 shadow-md">
            <div className="w-12 h-12 bg-blue-50 rounded text-blue-600 flex items-center justify-center mb-6"><BriefcaseBusiness size={24} /></div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">SMEs & Founders</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Automate your entire month of social content.</p>
          </motion.div>
          <motion.div variants={FADE_UP} className="p-8 bg-white rounded-xl shadow-sm border border-slate-200/60">
            <div className="w-12 h-12 bg-blue-50 rounded text-blue-600 flex items-center justify-center mb-6"><Building2 size={24} /></div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Agencies</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Manage multiple client identities effortlessly.</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
