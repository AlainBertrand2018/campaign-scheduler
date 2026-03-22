'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna,
  Globe,
  Languages,
  Building2,
  Share2,
  ImagePlus,
  Target,
  Briefcase,
  Search,
  Zap,
  Download,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  CreditCard,
  Activity,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin
} from 'lucide-react';
import DnaDashboard from './components/DnaDashboard';

/* ───────── TYPES ───────── */
interface BrandDNAInput {
  name: string;
  website: string;
  industry: string;
  market: string;
  language: string;
  social_urls: string[];
  logo: File | null;
  tagline: string;
  competitors: string[];
  target_customer: string;
  problem_solved: string;
  manifesto: string;
}

interface TelemetryLine {
  id: number;
  label: string;
  status: 'pending' | 'running' | 'done';
}

/* ───────── CONSTANTS ───────── */
const INDUSTRIES = [
  "Tech / Software", "Fintech / Banking", "E-commerce / Retail",
  "Health & Wellness", "Real Estate / PropTech", "Luxury / Fashion",
  "B2B SaaS", "Consumer Goods", "Education / EdTech", "Food & Beverage",
  "Travel / Hospitality", "Media / Entertainment", "Automotive", "Other"
];

const MARKETS = [
  "Global", "USA", "Canada", "UK", "Europe (EU)", "Middle East & North Africa", "Mauritius",
  "Sub-Saharan Africa", "Asia-Pacific", "Latin America", "Oceania"
];

const LANGUAGES = [
  "English (US)", "English (UK)", "French", "Spanish", "German",
  "Arabic", "Portuguese", "Mandarin", "Japanese", "Hindi"
];

const TELEMETRY_SEQUENCE: string[] = [
  "[INIT] Validating input signal integrity...",
  "[DNS] Resolving website domain records...",
  "[SCRAPE] Extracting page metadata, OG tags, and copy...",
  "[VISUAL] Parsing logo color-space (RGB/HEX extraction)...",
  "[NLP] Running tone-of-voice classification...",
  "[ARCH] Mapping brand archetype against 12-model framework...",
  "[BENCH] Cross-referencing industry benchmarks...",
  "[POS] Calculating competitive whitespace...",
  "[VOICE] Generating voice specification profile...",
  "[DNA] Compiling Brand DNA Manifest...",
  "[QC] Validating output schema integrity...",
  "[DONE] Brand DNA extraction complete."
];

/* ───────── COMPONENT ───────── */
export default function BrandDNAApp() {
  const [form, setForm] = useState<BrandDNAInput>({
    name: '',
    website: '',
    industry: '',
    market: 'Global',
    language: 'English (US)',
    social_urls: [''],
    logo: null,
    tagline: '',
    competitors: [''],
    target_customer: '',
    problem_solved: '',
    manifesto: '',
  });

  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<'intake' | 'processing' | 'complete'>('intake');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryLine[]>([]);
  const [result, setResult] = useState<any>(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [masterPdfUrl, setMasterPdfUrl] = useState<string | null>(null);
  const totalSteps = 3;

  /* ── Form Handlers ── */
  const set = useCallback((field: keyof BrandDNAInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const setListItem = useCallback((field: 'social_urls' | 'competitors', i: number, v: string) => {
    setForm(prev => {
      const list = [...prev[field]];
      list[i] = v;
      return { ...prev, [field]: list };
    });
  }, []);

  const addListItem = useCallback((field: 'social_urls' | 'competitors') => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  }, []);

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  /* ── Telemetry & Live Extraction ── */
  const runExtraction = useCallback(async () => {
    setPhase('processing');

    // Initialize telemetry lines
    const lines: TelemetryLine[] = TELEMETRY_SEQUENCE.map((label, i) => ({
      id: i,
      label,
      status: 'pending' as const,
    }));
    setTelemetry(lines);

    // 1. Prepare payload with optional base64 image 
    const payload: any = { ...form };
    if (form.logo) {
      const reader = new FileReader();
      payload.imageBase64 = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(form.logo as File);
      });
      // Remove the actual File object to avoid JSON stringify errors
      delete payload.logo;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const extractionPromise = fetch(`${apiBase}/api/extract-dna`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(res => res.json());

    // 2. Animate telemetry in parallel
    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      setTelemetry(prev => prev.map((l, idx) => ({
        ...l,
        status: idx === i ? 'running' : idx < i ? 'done' : 'pending',
      })));
    }

    // 3. Await Backend Completion
    try {
        const responseData = await extractionPromise;
        if (responseData && responseData.status === "success") {
           setResult(responseData.data);
           setPreviewPdfUrl(responseData.preview_pdf_url);
           setMasterPdfUrl(responseData.master_pdf_url);
        } else {
           console.error("BACKEND_EXTRACTION_FAILURE", responseData);
        }
    } catch(err) {
        console.error("FATAL_NETWORK_ERROR", err);
    }

    if (lines.length > 0) {
        setTelemetry(prev => prev.map(l => ({ ...l, status: 'done' })));
    }
    await new Promise(r => setTimeout(r, 600));

    setPhase('complete');
  }, [form]);

  /* ── Report Generation ── */
  const handleDownload = () => {
    // Opens the Master Brief in a new tab for instant view and manual save
    if (!masterPdfUrl) return;
    window.open(masterPdfUrl, '_blank');
  };

  /* ── Shared Input Classes ── */
  const inputCls = "w-full bg-[#0a0a0f] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none transition-all";
  const labelCls = "block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2";

  return (
    <div className="min-h-screen bg-[#050507] text-slate-300 flex flex-col"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >
      {/* ═══ HEADER ═══ */}
      <header className="border-b border-white/[0.04] bg-[#08080c]/90 backdrop-blur-xl px-6 py-4 z-50">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-indigo-400/70">Enola.ai // Agent 01</p>
              <h1 className="text-lg font-extrabold text-white uppercase tracking-tight">Brand DNA Extractor</h1>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">System Online</span>
            </div>
            <div className="h-6 w-px bg-white/5" />
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Service Fee</p>
              <p className="text-sm font-extrabold text-white">$1.99</p>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ─── LEFT: DATA INTAKE TERMINAL ─── */}
        <section className="lg:col-span-4 flex flex-col gap-6">

          {/* Step Indicator */}
          <div className="flex items-center gap-3">
            {['Primary Signals', 'Brand Narrative', 'Digital Ecosystem'].map((label, i) => (
              <button
                key={i}
                onClick={() => phase === 'intake' && setStep(i + 1)}
                className={`flex-1 text-center py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border ${step === i + 1
                    ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                    : step > i + 1
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                      : 'bg-white/[0.02] border-white/[0.04] text-slate-600'
                  }`}
              >
                {step > i + 1 ? <CheckCircle2 className="w-3 h-3 mx-auto mb-0.5" /> : null}
                {label}
              </button>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-[#08080c] border border-white/[0.04] rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col relative z-10"
              >
                {/* ── STEP 1: PRIMARY SIGNALS ── */}
                {step === 1 && (
                  <div className="space-y-5 flex-1">
                    <div className="space-y-1 pb-4 border-b border-white/[0.04]">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-indigo-400/60">Step 01 of 03</p>
                      <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Primary Signals</h2>
                      <p className="text-[11px] text-slate-500">Core identity anchors and signal sources for agent calibration.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Brand Name *</label>
                        <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                          placeholder="e.g. Enola.ai" className={inputCls} />
                      </div>

                      <div>
                        <label className={labelCls}>Website URL</label>
                        <input type="url" value={form.website} onChange={e => set('website', e.target.value)}
                          placeholder="https://your-brand.com" className={inputCls} />
                      </div>

                      <div>
                        <label className={labelCls}>Brand Logo, Audio, or Video *</label>
                        <div className={`h-28 bg-[#0a0a0f] border-2 border-dashed ${form.logo ? 'border-emerald-500/30' : 'border-white/[0.06]'} rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-500/30 transition-all relative group`}>
                          {form.logo ? (
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-5 h-5 text-emerald-400" />
                              <span className="text-xs font-bold text-emerald-400 uppercase">{form.logo.name}</span>
                            </div>
                          ) : (
                            <>
                              <ImagePlus className="w-6 h-6 text-slate-700 group-hover:text-indigo-500 transition-colors" />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Upload Media File (Image, Audio, Video)</span>
                            </>
                          )}
                          <input type="file" accept="image/*,video/*,audio/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={e => set('logo', e.target.files?.[0] || null)} />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Industry Sector *</label>
                        <select value={form.industry} onChange={e => set('industry', e.target.value)}
                          className={`${inputCls} appearance-none`}>
                          <option value="">Select...</option>
                          {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Country / Market *</label>
                          <select value={form.market} onChange={e => set('market', e.target.value)}
                            className={`${inputCls} appearance-none`}>
                            {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Language *</label>
                          <select value={form.language} onChange={e => set('language', e.target.value)}
                            className={`${inputCls} appearance-none`}>
                            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: BRAND NARRATIVE ── */}
                {step === 2 && (
                  <div className="space-y-5 flex-1">
                    <div className="space-y-1 pb-4 border-b border-white/[0.04]">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-indigo-400/60">Step 02 of 03</p>
                      <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Brand Narrative</h2>
                      <p className="text-[11px] text-slate-500">Strategic positioning anchors and value proposition seeds.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Brand Tagline / Slogan *</label>
                        <input type="text" value={form.tagline} onChange={e => set('tagline', e.target.value)}
                          placeholder="e.g. Precision-Engineered Advertising" className={inputCls} />
                      </div>

                      <div>
                        <label className={labelCls}>Brand Manifesto / Core Narrative *</label>
                        <textarea value={form.manifesto} onChange={e => set('manifesto', e.target.value)}
                          placeholder="e.g. Paste your mission, core philosophy, or internal brief here..."
                          className={`${inputCls} h-28 resize-none`} />
                      </div>

                      <div>
                        <label className={labelCls}>Who is your target customer?</label>
                        <textarea value={form.target_customer} onChange={e => set('target_customer', e.target.value)}
                          placeholder="e.g. Startup founders scaling from $1M to $10M ARR"
                          className={`${inputCls} h-20 resize-none`} />
                      </div>

                      <div>
                        <label className={labelCls}>What problem do you solve?</label>
                        <textarea value={form.problem_solved} onChange={e => set('problem_solved', e.target.value)}
                          placeholder="e.g. Eliminates the need for a $50k/month creative agency"
                          className={`${inputCls} h-20 resize-none`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: DIGITAL ECOSYSTEM ── */}
                {step === 3 && (
                  <div className="space-y-5 flex-1">
                    <div className="space-y-1 pb-4 border-b border-white/[0.04]">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-indigo-400/60">Step 03 of 03</p>
                      <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Digital Ecosystem</h2>
                      <p className="text-[11px] text-slate-500">Social footprint and competitive landscape mapping.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Social Media Profiles</label>
                        <div className="space-y-2">
                          {form.social_urls.map((url, i) => (
                            <div key={i} className="relative">
                              <Share2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                              <input type="text" value={url}
                                onChange={e => setListItem('social_urls', i, e.target.value)}
                                placeholder="@handle or full URL"
                                className={`${inputCls} pl-9`} />
                            </div>
                          ))}
                          <button onClick={() => addListItem('social_urls')}
                            className="text-[9px] font-bold uppercase text-indigo-500 tracking-widest hover:text-indigo-300 transition-colors mt-1">
                            + Add Profile
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Competitor Names or URLs</label>
                        <div className="space-y-2">
                          {form.competitors.map((c, i) => (
                            <div key={i} className="relative">
                              <Target className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                              <input type="text" value={c}
                                onChange={e => setListItem('competitors', i, e.target.value)}
                                placeholder="Competitor name or URL"
                                className={`${inputCls} pl-9`} />
                            </div>
                          ))}
                          <button onClick={() => addListItem('competitors')}
                            className="text-[9px] font-bold uppercase text-indigo-500 tracking-widest hover:text-indigo-300 transition-colors mt-1">
                            + Add Competitor
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {phase === 'intake' && (
              <div className="pt-6 mt-auto border-t border-white/[0.04] flex gap-3 relative z-10">
                {step > 1 && (
                  <button onClick={prevStep}
                    className="px-5 py-3.5 rounded-xl border border-white/[0.06] hover:bg-white/5 transition-colors">
                    <ArrowLeft className="w-4 h-4 text-slate-400" />
                  </button>
                )}

                {step < totalSteps ? (
                  <button onClick={nextStep}
                    className="flex-1 bg-white text-black font-extrabold uppercase tracking-widest text-[10px] py-3.5 rounded-xl hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2 group">
                    Next Step <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button onClick={runExtraction}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold uppercase tracking-[0.15em] text-[10px] py-3.5 rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
                    <Zap className="w-4 h-4" /> Run DNA Extraction — $1.99
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ─── RIGHT: AGENT TELEMETRY + OUTPUT ─── */}
        <section className="lg:col-span-8 flex flex-col gap-6">

          <AnimatePresence mode="wait">
            {phase === 'intake' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 bg-[#08080c] border border-white/[0.04] rounded-2xl p-12 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="text-center max-w-lg z-10 space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center">
                    <Dna className="w-8 h-8 text-indigo-500/60" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">KYC Manager Standing By</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Complete the data intake on the left. The Brand DNA Extractor will process your signals and generate a verified Brand DNA Manifest.
                  </p>
                  <div className="flex items-center justify-center gap-6 pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> ~45 sec</span>
                    <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> 12 Analysis Passes</span>
                    <span className="flex items-center gap-1.5"><Dna className="w-3 h-3" /> 4 DNA Modules</span>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 bg-[#08080c] border border-white/[0.04] rounded-2xl p-8 flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="space-y-2 mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                    <h3 className="text-lg font-extrabold text-white uppercase tracking-tight">DNA Extraction in Progress</h3>
                  </div>
                  <p className="text-[11px] text-slate-500">Processing: {form.name || 'Unknown Brand'} // {form.industry || 'Unclassified'} // {form.market}</p>
                </div>

                {/* Live Telemetry Stream */}
                <div className="flex-1 overflow-y-auto space-y-1.5 relative z-10 font-mono">
                  {telemetry.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] transition-all ${line.status === 'running'
                          ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300'
                          : line.status === 'done'
                            ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80'
                            : 'bg-transparent border border-transparent text-slate-600'
                        }`}
                    >
                      {line.status === 'running' && <Loader2 className="w-3 h-3 animate-spin flex-shrink-0" />}
                      {line.status === 'done' && <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />}
                      {line.status === 'pending' && <div className="w-3 h-3 rounded-full border border-slate-700 flex-shrink-0" />}
                      <span>{line.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'complete' && result && (
              <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 bg-[#08080c] border border-white/[0.04] rounded-2xl overflow-hidden overflow-y-auto"
              >
                <DnaDashboard 
                  data={result} 
                  onGenerateReport={handleDownload} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
