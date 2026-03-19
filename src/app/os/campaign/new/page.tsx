'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  Rocket, 
  Target, 
  Calendar, 
  Layers, 
  FileText,
  CheckCircle2,
  Clock,
  Layout
} from 'lucide-react';

const STEPS = [
  {
    id: 'intro',
    title: "New Campaign",
    subtitle: "Define your objective and let the agents do the heavy lifting.",
    icon: <Rocket className="w-12 h-12 text-pink-400" />
  },
  {
    id: 'basics',
    title: "The Campaign Spark",
    subtitle: "Give your campaign a name.",
    fields: [
      { name: 'title', label: 'Campaign Title', placeholder: 'Q4 Product Launch', icon: <Layout className="w-5 h-5" /> }
    ]
  },
  {
    id: 'objective',
    title: "The Mission",
    subtitle: "What is your primary goal?",
    options: ['Engagement', 'Lead Generation', 'Direct Sales', 'Brand Awareness', 'Educational', 'Trend Hijacking']
  },
  {
    id: 'target',
    title: "The Target",
    subtitle: "Who are we aiming for?",
    fields: [
      { name: 'target_audience', label: 'Audience Segment', placeholder: 'SaaS Founders, 25-45', icon: <Target className="w-5 h-5" /> }
    ]
  },
  {
    id: 'brief',
    title: "The Strategy Brief",
    subtitle: "Any specific directions for the agents?",
    type: 'textarea'
  },
  {
    id: 'timeline',
    title: "The Timeline",
    subtitle: "How many weeks should this run?",
    options: ['1 Week', '2 Weeks', '1 Month', 'Ongoing']
  },
  {
    id: 'orchestrating',
    title: "Assembling Swarm",
    subtitle: "The Strategist is building your blueprint and spawning agents...",
    isFinal: true
  }
];

export default function NewCampaign() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    objective: '',
    target_audience: '',
    brief: '',
    timeline: ''
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const activeStep = STEPS[currentStep];

  // Auto redirect on final step
  useEffect(() => {
    if (activeStep.isFinal) {
      const timer = setTimeout(() => router.push('/os/campaign/review'), 4500);
      return () => clearTimeout(timer);
    }
  }, [activeStep.isFinal, router]);

  return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col overflow-hidden z-[9999]">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-900">
        <motion.div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        {currentStep > 0 && !activeStep.isFinal && (
          <button onClick={handleBack} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-400" />
          </button>
        )}
        <div className="flex-1 text-center pr-10">
           <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
             {activeStep.isFinal ? 'Orchestrating' : `Campaign Step ${currentStep + 1}`}
           </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 relative px-6 flex flex-col justify-center max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full space-y-8"
          >
            {/* Step Icon */}
            <div className="flex justify-center mb-4">
              {activeStep.isFinal ? (
                <div className="relative mt-8">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-32 h-32 rounded-full bg-pink-500/20 absolute -top-4 -left-4 blur-3xl"
                  />
                  <Layers className="w-16 h-16 text-pink-400 relative z-10 animate-pulse" />
                </div>
              ) : (
                activeStep.icon || (
                  <div className="w-20 h-20 rounded-3xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 shadow-2xl shadow-pink-500/5">
                    <Target className="w-10 h-10 text-pink-400" />
                  </div>
                )
              )}
            </div>

            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold tracking-tight">{activeStep.title}</h1>
              <p className="text-slate-400 text-lg leading-relaxed">{activeStep.subtitle}</p>
            </div>

            {/* Inputs & Glassbox */}
            <div className="space-y-4 pt-4">
              {activeStep.isFinal ? (
                <TerminalStream />
              ) : (
                <>
                  {activeStep.fields?.map((field) => (
                    <div key={field.name} className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors">
                        {field.icon}
                      </div>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={(formData as any)[field.name]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-5 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/50 transition-all placeholder:text-slate-600"
                      />
                    </div>
                  ))}

                  {activeStep.options && (
                    <div className="grid grid-cols-1 gap-3">
                      {activeStep.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFormData({ ...formData, [activeStep.id]: option });
                            handleNext();
                          }}
                          className={`flex items-center justify-between p-5 rounded-2xl border text-lg font-medium transition-all ${
                            (formData as any)[activeStep.id] === option 
                            ? 'bg-pink-500 text-white border-pink-400 shadow-xl shadow-pink-500/20 ring-2 ring-pink-500/20' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800/50'
                          }`}
                        >
                          {option}
                          {(formData as any)[activeStep.id] === option && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeStep.id === 'brief' && (
                    <textarea
                      placeholder="Tell the agents something crucial..."
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      rows={6}
                      className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-4 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/50 transition-all placeholder:text-slate-600 resize-none"
                    />
                  )}
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <footer className="p-6 pb-12 max-w-lg mx-auto w-full">
        {!activeStep.isFinal && !activeStep.options && (
          <button
            onClick={handleNext}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-2xl shadow-pink-500/20"
          >
            {currentStep === 0 ? "Unlock Campaign" : "Next Step"}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {activeStep.isFinal && (
          <div className="flex flex-col items-center gap-4 py-4">
             <div className="flex items-center gap-3 text-pink-400 font-medium">
               <Clock className="w-5 h-5 animate-spin-slow" />
               Campaign Blueprint Pending
             </div>
             <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: '100%' }} 
                 transition={{ duration: 4.5 }} 
                 className="bg-pink-500 h-full" 
               />
             </div>
          </div>
        )}
      </footer>
    </div>
  );
}

const CAMPAIGN_LOGS = [
  "[Strategist] Initiating Directed Acyclic Graph planning...",
  "[Strategist] Ingesting client objective: Engagement / Lead Gen...",
  "[Architect] Correlating Brand DNA resonance factors...",
  "[Architect] Extracting product metadata against competitor matrix...",
  "[Orchestrator] Provisioning Audience Persona Agent...",
  "[Orchestrator] Provisioning Copy Agent...",
  "[Orchestrator] Provisioning Visual Direction Agent...",
  "[System] Spawning node isolated instances...",
  "[Success] Blueprint compiled. Submitting to pipeline."
];

function TerminalStream() {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        if (prev.length < CAMPAIGN_LOGS.length) {
          return [...prev, CAMPAIGN_LOGS[prev.length]];
        }
        clearInterval(interval);
        return prev;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-md border border-pink-500/20 rounded-xl p-4 font-mono text-xs overflow-y-auto h-48 shadow-inner shadow-pink-500/5 mt-8 flex flex-col justify-end">
      {logs.map((log, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="mb-2 flex gap-2"
        >
          <span className="text-pink-500">{'>'}</span>
          <span className={log.includes('[Success]') ? 'text-green-400' : 'text-slate-300'}>{log}</span>
        </motion.div>
      ))}
      {logs.length < CAMPAIGN_LOGS.length && (
        <div className="flex gap-2">
          <span className="text-pink-500">{'>'}</span>
          <div className="w-2 h-3.5 bg-pink-500 animate-pulse mt-0.5" />
        </div>
      )}
    </div>
  );
}
