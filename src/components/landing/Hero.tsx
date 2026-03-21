'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, Paintbrush, PenTool, Dna, Zap } from 'lucide-react';
import { SchedulingPulse } from './SchedulingPulse';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8, bounce: 0 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const BananaIcon = ({ size = 20, className = "" }) => (
  <span style={{ fontSize: `${size}px` }} className={className}>🍌</span>
);

export const MICRO_TOOLS = [
  {
    icon: Dna,
    title: 'Extract Brand DNA',
    price: '$1.99',
    href: '#'
  },
  {
    icon: PenTool,
    title: 'Write Commercial Copy',
    price: '$1.99',
    href: '#'
  },
  {
    icon: Paintbrush,
    title: 'Create Visual Brief',
    price: '$1.99',
    href: '#'
  },
  {
    icon: BananaIcon as any,
    title: 'Generate Ad Visuals',
    price: '$1.99',
    href: '#'
  }
];

export function Hero() {
  return (
    <section id="micro-tools" className="pt-40 pb-20 bg-blue-600 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Background Scheduling Animation */}
      <SchedulingPulse />

      <motion.div
        className="w-full relative z-10 text-center flex flex-col items-center"
        variants={STAGGER}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={FADE_UP} className="mb-14 px-4 sm:px-6 w-full max-w-[1400px] mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
            No Subscriptions required
          </span>
          <h1 className="text-4xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
            Need to advertise on Social Media? <br />
            <span className="text-blue-200 block mt-4 drop-shadow-sm">Create your assets for only $1.99</span>
          </h1>
          <p className="text-blue-100 text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Immediate, unbundled content generation using automated Agentic Workflows.<br />
            Describe your goal, and pay only for exactly what you need.
            <span className="text-white font-bold block mt-3">Save Time, Save Money and Post Like a Boss!</span>
          </p>
        </motion.div>

        <motion.div variants={FADE_UP} className="w-full max-w-[1400px] mx-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4">
          <div className="flex flex-nowrap items-center justify-start lg:justify-center gap-6 py-12 min-w-max">
            {MICRO_TOOLS.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group relative flex items-center gap-3.5 bg-white/5 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 border border-white/20 hover:border-white pl-3.5 pr-7 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-11 h-11 shrink-0 bg-white/20 group-hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors">
                  <tool.icon size={20} className="text-white group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="text-left py-0.5 pr-2">
                  <div className="font-bold text-sm lg:text-base leading-tight tracking-tight mb-0.5 whitespace-nowrap">{tool.title}</div>
                  <div className="text-[10px] font-bold text-blue-200 group-hover:text-blue-600 transition-colors uppercase tracking-[0.2em] whitespace-nowrap">
                    {tool.price} / Run
                  </div>
                </div>
                <div className="absolute right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600">
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div variants={FADE_UP} className="mt-8 text-center pt-8 border-t border-white/10 max-w-lg mx-auto w-full">
          <a href="#orchestration" className="text-blue-200 hover:text-white transition-colors font-semibold inline-flex flex-col items-center gap-2 group uppercase tracking-widest text-xs">
            Need more than a single shot?
            <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform opacity-70 group-hover:opacity-100" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
