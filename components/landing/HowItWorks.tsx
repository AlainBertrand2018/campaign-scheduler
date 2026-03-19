'use client';

import { motion, Variants } from 'framer-motion';
import { Dna, Target, PenTool, Paintbrush, BarChart3, Send } from 'lucide-react';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8, bounce: 0 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const AGENTS = [
  {
    icon: Dna,
    title: 'Brand DNA Parser',
    desc: 'Extracts structural guidelines, tone, and visual identity from ingested documentation.',
  },
  {
    icon: Target,
    title: 'Strategist Kernel',
    desc: 'Defines target audiences, platform selection, and campaign blueprints.',
  },
  {
    icon: PenTool,
    title: 'Copy Generator',
    desc: 'Produces multi-variant, platform-native textual content with automated character constraints.',
  },
  {
    icon: Paintbrush,
    title: 'Visual Synthesizer',
    desc: 'Designs optimized image outputs aligned with strict brand specifications.',
  },
  {
    icon: BarChart3,
    title: 'Feedback Ingestor',
    desc: 'Parses live engagement metrics to inform future generation waves.',
  },
  {
    icon: Send,
    title: 'Deployment Node',
    desc: 'Handles API routing and scheduled dispatch to external social networks.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="min-h-screen flex flex-col justify-center py-24 bg-[#F8FAFC] relative overflow-hidden border-y border-slate-200">
      <motion.div 
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="max-w-6xl mx-auto px-6 relative z-10"
        variants={STAGGER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-24">
          <div className="mb-16 max-w-4xl text-center mx-auto">
            <motion.h2 variants={FADE_UP} className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">Straight-forward Logic.</motion.h2>
            <motion.p variants={FADE_UP} className="text-slate-600 text-lg lg:whitespace-nowrap">A systematic approach to content generation. From raw data to published assets.</motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-slate-200">
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-1/3" animate={{ left: ['-30%', '130%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
            </div>
            {[
              { step: 'Phase 01', title: 'Data Ingestion', desc: 'Upload brand guidelines. The system constructs a precise DNA profile.' },
              { step: 'Phase 02', title: 'Agent Orchestration', desc: 'Specialized models collaborate to draft copy and design visuals.' },
              { step: 'Phase 03', title: 'Approval & Deployment', desc: 'Review the generated campaign. Approve to schedule posts.' }
            ].map((s, i) => (
              <motion.div key={s.step} variants={FADE_UP} className="relative pt-12 items-center flex flex-col text-center group">
                <motion.div className="w-12 h-12 bg-white/80 backdrop-blur-md border border-white rounded-full flex items-center justify-center font-bold text-blue-600 shadow-lg absolute top-0 z-10" animate={{ scale: [1, 1.1, 1], borderColor: ['#ffffff', '#3b82f6', '#ffffff'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 1 }}>{i + 1}</motion.div>
                <div className="text-xs font-bold text-slate-400 mb-2 tracking-wider uppercase">{s.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm px-4">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <hr className="border-slate-200/60 mb-24" />

        <div>
          <div className="mb-12 max-w-2xl">
            <motion.h2 variants={FADE_UP} className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">Agent Architecture.</motion.h2>
            <motion.p variants={FADE_UP} className="text-slate-600 text-lg">Six specialized models, working in parallel to synthesize your campaign.</motion.p>
          </div>

          {/* Neural Interactive Map */}
          <div className="relative min-h-[400px] lg:min-h-[300px] w-full py-8">
            <div className="absolute inset-0 hidden lg:block pointer-events-none opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-blue-500 stroke-[1.5]">
                <path id="path-dna" d="M150 150 H280" strokeDasharray="4 4" />
                <path id="path-copy" d="M380 150 Q450 150 500 80" strokeDasharray="4 4" />
                <path id="path-visual" d="M380 150 Q450 150 500 220" strokeDasharray="4 4" />
                <path id="path-deploy-top" d="M600 80 Q650 150 720 150" strokeDasharray="4 4" />
                <path id="path-deploy-bottom" d="M600 220 Q650 150 720 150" strokeDasharray="4 4" />
                <path id="path-loop" d="M820 150 Q850 220 750 250 H250 Q150 250 150 150" strokeDasharray="4 4" className="stroke-indigo-400 opacity-50" />
              </svg>
              <motion.div 
                className="w-2 h-2 bg-blue-500 rounded-full blur-[3px] absolute"
                animate={{ left: ['15%', '33%'], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
              />
              <motion.div 
                className="w-2 h-2 bg-blue-400 rounded-full blur-[3px] absolute"
                animate={{ left: ['36%', '55%'], top: ['50%', '24%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              />
              <motion.div 
                className="w-2 h-2 bg-blue-400 rounded-full blur-[3px] absolute"
                animate={{ left: ['36%', '55%'], top: ['50%', '76%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              />
              <motion.div 
                className="w-2 h-2 bg-emerald-400 rounded-full blur-[3px] absolute"
                animate={{ left: ['57%', '72%'], top: ['24%', '50%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              />
              <motion.div 
                className="w-2 h-2 bg-emerald-400 rounded-full blur-[3px] absolute"
                animate={{ left: ['57%', '72%'], top: ['76%', '50%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 5.5 }}
              />
              <motion.div 
                className="w-2 h-2 bg-indigo-400 rounded-full blur-[3px] absolute"
                animate={{ left: ['72%', '75%', '25%', '15%'], top: ['50%', '83%', '83%', '50%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 7.5 }}
              />
            </div>

            <div className="relative z-10 flex flex-wrap lg:flex-nowrap justify-between items-center gap-8 lg:gap-0 h-full pt-10 lg:pt-0">
              <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-20">
                <motion.div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 relative">
                  <Dna size={28} />
                </motion.div>
                <h3 className="text-sm font-bold text-slate-800 text-center mb-1 leading-tight">{AGENTS[0].title}</h3>
                <div className="absolute top-[80px] w-48 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[0].desc}</div>
              </div>

              <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-30">
                <motion.div className="w-20 h-20 bg-blue-600 rounded-full shadow-lg shadow-blue-200 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform relative border-4 border-white">
                  <Target size={32} />
                  <div className="absolute inset-[-8px] rounded-full border border-blue-200 animate-pulse" />
                </motion.div>
                <h3 className="text-sm font-bold text-blue-600 text-center mb-1 uppercase tracking-widest leading-tight">{AGENTS[1].title}</h3>
                <div className="absolute top-[100px] w-48 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[1].desc}</div>
              </div>

              <div className="w-full lg:w-1/4 flex lg:flex-col items-center justify-center gap-12 lg:gap-20 order-last lg:order-none mt-8 lg:mt-0">
                <div className="flex flex-col items-center group relative">
                  <motion.div className="w-14 h-14 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    <PenTool size={24} />
                  </motion.div>
                  <h3 className="text-xs font-bold text-slate-700 mt-3">{AGENTS[2].title}</h3>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-40 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[2].desc}</div>
                </div>
                <div className="flex flex-col items-center group relative">
                  <motion.div className="w-14 h-14 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    <Paintbrush size={24} />
                  </motion.div>
                  <h3 className="text-xs font-bold text-slate-700 mt-3">{AGENTS[3].title}</h3>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-40 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[3].desc}</div>
                </div>
              </div>

              <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-20">
                <motion.div className="w-16 h-16 bg-white border border-slate-100 rounded-full shadow-sm flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Send size={28} />
                </motion.div>
                <h3 className="text-sm font-bold text-slate-800 text-center mb-1 leading-tight">{AGENTS[5].title}</h3>
                <div className="absolute top-[80px] w-48 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[5].desc}</div>
              </div>

              <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-20">
                <motion.div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <BarChart3 size={28} />
                </motion.div>
                <h3 className="text-sm font-bold text-slate-800 text-center mb-1 leading-tight">{AGENTS[4].title}</h3>
                <div className="absolute top-[80px] w-48 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[4].desc}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
