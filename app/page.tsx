'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Menu,
  X,
  Dna,
  Target,
  PenTool,
  Paintbrush,
  BarChart3,
  Send,
  Zap,
  Clock,
  Sparkles,
  Layers,
  UserCircle,
  BriefcaseBusiness,
  Building2,
  ChevronDown
} from 'lucide-react';

/* ─────────────────────── ANIMATION VARIANTS ─────────────────────── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8, bounce: 0 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

/* ─────────────────────── DATA ─────────────────────── */
const MICRO_TOOLS = [
  {
    icon: Paintbrush,
    title: 'Create Visuals',
    price: '$1.99'
  },
  {
    icon: PenTool,
    title: 'Write Commercial Copy',
    price: '$1.99'
  },
  {
    icon: Dna,
    title: 'Extract Brand DNA',
    price: '$1.99'
  },
  {
    icon: Zap,
    title: 'Repurpose Content',
    price: '$1.99'
  }
];

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

const PRICING = (isYearly: boolean) => [
  {
    name: 'Entry Level',
    tagline: 'Single execution protocol.',
    price: '$6.99',
    period: '/run',
    cta: 'Initialize',
    featured: false,
    yearlyText: null,
    features: [
      '4 Static Visuals',
      '2 Animated Visuals',
      '4 Copy Variants',
      'Up to 3 Social Accounts',
      'Non-repeatable Execution',
    ],
  },
  {
    name: 'Regular Usage',
    tagline: 'Continuous structural automation.',
    price: isYearly ? '$4.99' : '$7.99',
    period: '/mo',
    cta: 'Subscribe',
    featured: true,
    yearlyText: isYearly ? 'Payable Yearly at $4.99/mo' : null,
    features: [
      '1 Campaign per Month',
      '4 Static / 2 Animated Assets',
      '4 Copy Variants Monthly',
      'Repeatable Swarm Logic',
      'Sentiment Analysis Feed',
    ],
  },
  {
    name: 'Agency Usage',
    tagline: 'Unrestricted orchestration limits.',
    price: isYearly ? '$369' : '$499',
    period: '/mo',
    cta: 'Contact Sales',
    featured: false,
    yearlyText: isYearly ? 'Payable Yearly at $369/mo' : null,
    features: [
      'Unlimited Campaigns',
      'Unlimited Social Accounts',
      'Multi-Brand DNA Architecture',
      'Full Asset Rights',
      'White-label Reporting',
      'Priority Agent Provisioning',
    ],
  },
];

export default function GatewayPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200">
      {/* ───────── NAVBAR ───────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-blue-600/90 backdrop-blur-md shadow-sm py-4 border-b border-blue-500'
        : 'bg-transparent py-6'
        }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-blue-600 text-lg shadow-sm">
              G
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Gravity.ai</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-100">
            <a href="#micro-tools" className="hover:text-white transition-colors">Micro-Tools</a>
            <a href="#orchestration" className="hover:text-white transition-colors">OS Orchestration</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/os" className="text-blue-100 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/os" className="bg-white text-blue-600 px-5 py-2.5 rounded hover:bg-slate-50 transition-colors shadow-sm inline-flex items-center gap-2 font-bold">
              Launch OS <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Burger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-600 border-t border-blue-500 px-6 py-6 space-y-4 shadow-lg absolute w-full top-full">
            <a href="#micro-tools" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">Micro-Tools</a>
            <a href="#orchestration" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">OS Orchestration</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">How it Works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">Pricing</a>
            <hr className="border-blue-500 my-2" />
            <Link href="/os" className="block text-white font-medium py-2">Sign In</Link>
            <Link href="/os" className="block text-center bg-white text-blue-600 py-3 rounded mt-2 font-bold shadow-sm">Launch OS</Link>
          </div>
        )}
      </nav>

      {/* ───────── THE $1.99 AGENCY (HERO: MICRO TOOLS) ───────── */}
      <section id="micro-tools" className="pt-40 pb-20 bg-blue-600 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/50 rounded-full blur-[100px] pointer-events-none" />

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
                  href="/os/micro"
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

      {/* ───────── AUTOMATED CAMPAIGN ORCHESTRATION ───────── */}
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

      {/* ───────── STRAIGHT-FORWARD LOGIC (SECTION 3) - LUMINOUS MESH ───────── */}
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

            {/* Neural Interactive Map (Graphical Representation) */}
            <div className="relative min-h-[400px] lg:min-h-[300px] w-full py-8">
              {/* Background SVG Connections (Desktop) */}
              <div className="absolute inset-0 hidden lg:block pointer-events-none opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-blue-500 stroke-[1.5]">
                  {/* Paths: DNA -> Strategist */}
                  <path id="path-dna" d="M150 150 H280" strokeDasharray="4 4" />
                  {/* Paths: Strategist -> Copy/Visual */}
                  <path id="path-copy" d="M380 150 Q450 150 500 80" strokeDasharray="4 4" />
                  <path id="path-visual" d="M380 150 Q450 150 500 220" strokeDasharray="4 4" />
                  {/* Paths: Copy/Visual -> Deployment */}
                  <path id="path-deploy-top" d="M600 80 Q650 150 720 150" strokeDasharray="4 4" />
                  <path id="path-deploy-bottom" d="M600 220 Q650 150 720 150" strokeDasharray="4 4" />
                  {/* Paths: Deployment -> Feedback */}
                  <path id="path-loop" d="M820 150 Q850 220 750 250 H250 Q150 250 150 150" strokeDasharray="4 4" className="stroke-indigo-400 opacity-50" />
                </svg>

                {/* --- SEQUENTIAL PROCESS PULSEPOCKETS --- */}
                {/* 1. DNA to Strategist */}
                <motion.div 
                  className="w-2 h-2 bg-blue-500 rounded-full blur-[3px] absolute"
                  animate={{ left: ['15%', '33%'], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
                />
                {/* 2. Strategist to Creatives */}
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
                {/* 3. Creatives to Deployment */}
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
                {/* 4. Deployment back to Loop */}
                <motion.div 
                  className="w-2 h-2 bg-indigo-400 rounded-full blur-[3px] absolute"
                  animate={{ left: ['72%', '75%', '25%', '15%'], top: ['50%', '83%', '83%', '50%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 7.5 }}
                />
              </div>

              {/* Agent Nodes Grid/Flow */}
              <div className="relative z-10 flex flex-wrap lg:flex-nowrap justify-between items-center gap-8 lg:gap-0 h-full pt-10 lg:pt-0">
                
                {/* 1. BRAND DNA (Input) */}
                <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-20">
                  <motion.div 
                    animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 25px rgba(59,130,246,0.3)', '0 0 0px rgba(59,130,246,0)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 relative"
                  >
                    <Dna size={28} />
                    <div className="absolute inset-0 rounded-2xl bg-blue-400/20 scale-125 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <h3 className="text-sm font-bold text-slate-800 text-center mb-1 leading-tight">{AGENTS[0].title}</h3>
                  <div className="absolute top-[80px] w-48 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[0].desc}</div>
                </div>

                {/* 2. STRATEGIST (Core) */}
                <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-30">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                    className="w-20 h-20 bg-blue-600 rounded-full shadow-lg shadow-blue-200 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform relative border-4 border-white"
                  >
                    <Target size={32} />
                    <div className="absolute inset-[-8px] rounded-full border border-blue-200 animate-pulse" />
                  </motion.div>
                  <h3 className="text-sm font-bold text-blue-600 text-center mb-1 uppercase tracking-widest leading-tight">{AGENTS[1].title}</h3>
                  <div className="absolute top-[100px] w-48 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[1].desc}</div>
                </div>

                {/* 3. CREATIVES (Fork) */}
                <div className="w-full lg:w-1/4 flex lg:flex-col items-center justify-center gap-12 lg:gap-20 order-last lg:order-none mt-8 lg:mt-0">
                  {/* Copy Agent */}
                  <div className="flex flex-col items-center group relative">
                    <motion.div 
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 3 }}
                      className="w-14 h-14 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300"
                    >
                      <PenTool size={24} />
                    </motion.div>
                    <h3 className="text-xs font-bold text-slate-700 mt-3">{AGENTS[2].title}</h3>
                    <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-40 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[2].desc}</div>
                  </div>
                  {/* Visual Agent */}
                  <div className="flex flex-col items-center group relative">
                    <motion.div 
                      animate={{ y: [0, 2, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 3.5 }}
                      className="w-14 h-14 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300"
                    >
                      <Paintbrush size={24} />
                    </motion.div>
                    <h3 className="text-xs font-bold text-slate-700 mt-3">{AGENTS[3].title}</h3>
                    <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-40 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[3].desc}</div>
                  </div>
                </div>

                {/* 4. DEPLOYMENT (Output) */}
                <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-20">
                  <motion.div 
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 6 }}
                    className="w-16 h-16 bg-white border border-slate-100 rounded-full shadow-sm flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300"
                  >
                    <Send size={28} />
                  </motion.div>
                  <h3 className="text-sm font-bold text-slate-800 text-center mb-1 leading-tight">{AGENTS[5].title}</h3>
                  <div className="absolute top-[80px] w-48 p-3 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-xl border border-white/10">{AGENTS[5].desc}</div>
                </div>

                {/* 5. FEEDBACK (Loop) */}
                <div className="w-1/2 md:w-1/3 lg:w-[15%] flex flex-col items-center group relative z-20">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 8 }}
                    className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                  >
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

      {/* ───────── BUILT FOR SCALE (SECTION 4) ───────── */}
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

      {/* ───────── PRICING ───────── */}
      <section id="pricing" className="py-24 px-6 bg-white border-t border-slate-200">
        <motion.div className="max-w-6xl mx-auto" variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <motion.h2 variants={FADE_UP} className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Transparent Licensing.</motion.h2>
              <motion.p variants={FADE_UP} className="text-slate-600 text-lg">Predictable pricing models for single runs or continuous orchestration.</motion.p>
            </div>
            <motion.div variants={FADE_UP} className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-sm font-medium shadow-sm">
              <button onClick={() => setIsYearly(false)} className={`px-5 py-2 rounded-md transition-all ${!isYearly ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Monthly</button>
              <button onClick={() => setIsYearly(true)} className={`px-5 py-2 rounded-md transition-all ${isYearly ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Yearly</button>
            </motion.div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {PRICING(isYearly).map((plan) => (
              <motion.div key={plan.name} variants={FADE_UP} className={`p-8 rounded-xl border relative overflow-hidden transition-all ${plan.featured ? 'border-blue-600 bg-blue-50/20 shadow-xl shadow-blue-900/5 -translate-y-2' : 'border-slate-200 bg-white shadow-sm'}`}>
                {plan.featured && <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />}
                <div className="mb-4"><h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3><p className="text-sm text-slate-500 mt-1">{plan.tagline}</p></div>
                <div className="mb-2 flex items-baseline gap-1"><span className="text-4xl font-bold text-slate-900 tracking-tight">{plan.price}</span><span className="text-slate-500 text-sm font-medium">{plan.period}</span></div>
                <div className="h-5 mb-6">{isYearly && plan.yearlyText && <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">{plan.yearlyText}</p>}</div>
                <Link href="/os" className={`block w-full py-3.5 rounded text-center font-medium text-sm mb-8 transition-colors ${plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-800 hover:shadow-sm'}`}>{plan.cta}</Link>
                <ul className="space-y-3">{plan.features.map((f) => (<li key={f} className="flex items-start gap-3 text-sm text-slate-600"><Check size={16} className={`shrink-0 mt-0.5 ${plan.featured ? 'text-blue-600' : 'text-slate-400'}`} />{f}</li>))}</ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="py-12 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2"><div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">G</div><span className="font-semibold text-slate-900 tracking-tight">Gravity.ai</span></div>
          <div className="flex gap-6 text-sm text-slate-500 font-medium"><a href="#" className="hover:text-slate-900 transition-colors">Documentation</a><a href="#" className="hover:text-slate-900 transition-colors">Privacy</a><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></div>
          <div className="text-sm text-slate-400">&copy; 2026 Gravity AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
