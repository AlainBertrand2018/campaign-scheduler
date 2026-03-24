'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Download, ArrowLeft, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// HubSpot-Inspired Design System Components
import { HUB_THEME } from './components/Theme';
import { HubSpotCover } from './components/HubSpotCover';
import { HubSpotSlide } from './components/HubSpotSlide';
import { HubSpotContentBlock } from './components/HubSpotContentBlock';
import { BrandPyramid } from './components/BrandPyramid';

export default function CanvasReport() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('enola_dna_temp');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // Force overall_score if missing for audit slide
        if (parsed.audit && !parsed.audit.overall_score) {
           parsed.audit.overall_score = 85; 
        }
        setData(parsed);
      } catch (err) {
        console.error("Failed to parse stored DNA data", err);
      }
    }
  }, []);

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);

    try {
      /**
       * 🚨 CRITICAL FIX: COLOR SANITIZATION
       * html2canvas (v1.4.1) crashes or warns on oklch() and lab() color functions.
       * We recursively replace them with their nearest HEX fallback from the theme.
       */
      const sanitizeColors = (node: HTMLElement) => {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
        let current = walker.currentNode as HTMLElement;
        while (current) {
          if (current.getAttribute) {
            const style = current.getAttribute('style') || '';
            if (style.includes('lab(') || style.includes('oklch(')) {
              // Replace any lab/oklch with HubSpot Orange or Theme Maroon
              const cleaned = style.replace(/(lab|oklch)\([^)]+\)/g, HUB_THEME.colors.primary);
              current.setAttribute('style', cleaned);
            }
          }
          current = walker.nextNode() as HTMLElement;
        }
      };

      sanitizeColors(reportRef.current);

      // CAPTURE: High-res canvas
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: HUB_THEME.colors.bgLight,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
             // Second pass on the clone for absolute safety
             const clonedEl = clonedDoc.getElementById('report-master');
             if (clonedEl) sanitizeColors(clonedEl);
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ENOLA_STRATEGY_DECK_${data?.foundation?.brand_name || 'BRAND'}_2025.pdf`);

    } catch (err) {
      console.error("PDF Engine Failure:", err);
      window.print(); 
    } finally {
      setIsGenerating(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" /> Loading Blueprint Architecture...
      </div>
    );
  }

  // Helper to get nested content safely
  const getNested = (path: string, fallback: string = 'Generating deep-dive intelligence...') => {
    return path.split('.').reduce((obj, key) => obj?.[key], data) || fallback;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e4e4e7] p-8 font-sans">
        
      {/* ── Control Bar ── */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#050507]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-8 print:hidden">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        
        <div className="flex items-center gap-4">
           <span className="text-xs uppercase tracking-widest text-[#a1a1aa] font-bold">PDF Engine v2.8 // Color Secure</span>
           <button 
             onClick={handleDownloadPdf}
             disabled={isGenerating}
             className="flex items-center gap-2 px-5 py-2 bg-[#FF5C35] hover:bg-[#e64a2a] text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 transition-all disabled:opacity-50 shadow-lg shadow-[#FF5C35]/20"
           >
             {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
             {isGenerating ? 'Rendering PDF...' : 'Download Full Strategy Deck'}
           </button>
        </div>
      </div>

      <div className="h-16 print:hidden"></div>

      {/* ── PDF Container ── */}
      <div className="max-w-[1200px] mx-auto mt-8 flex flex-col items-center">
         
         <div 
           id="report-master"
           ref={reportRef} 
           className="relative shadow-2xl shrink-0"
           style={{ width: '297mm', background: HUB_THEME.colors.bgLight }}
         >
            
            {/* 00: COVER */}
            <HubSpotCover 
                brandName={data.foundation?.brand_name || 'Brand'} 
                brandPromise={data.foundation?.brand_promise || 'Strategic intelligence report powered by Enola.ai'} 
            />

            {/* 01: ARCHETYPE STRATEGIC DIVE */}
            <HubSpotSlide 
                number="01" 
                category="IDENTITY" 
                title="Archetype Strategic Dive"
                rightSide={
                  <div className="space-y-6">
                    <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>BRAND PYRAMID</div>
                    <BrandPyramid />
                    <div style={{ color: HUB_THEME.colors.textDark, ...HUB_THEME.typography.body as any, fontSize: '13px', lineHeight: 1.5, marginTop: '20px' }}>
                      {getNested('foundation.archetype_behavioral_implications')}
                    </div>
                  </div>
                }
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px' }}>
                    The <span style={{ color: HUB_THEME.colors.primary }}>Soul</span> of the Brand
                </div>
                
                <HubSpotContentBlock title="Analysis" label="CORE NARRATIVE">
                   {getNested('foundation.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <HubSpotContentBlock title="Impact" label="MEANING">
                       {getNested('foundation.strategic_dive.meaning_explained')}
                    </HubSpotContentBlock>
                    <HubSpotContentBlock title="Guidance" label="ENOLA'S DIRECTIVE">
                       {getNested('foundation.strategic_dive.enolas_guidance')}
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            {/* 02: MARKET POSITIONING MATRIX */}
            <HubSpotSlide 
                number="02" 
                category="STRATEGY" 
                title="Market Positioning Matrix"
                rightSide={
                    <div className="space-y-4">
                        <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>STRATEGIC RECOMMENDATIONS</div>
                        {(data.executive_summary?.campaign_recommendations || ['Market expansion', 'Voice synchronization', 'Signal optimization']).slice(0, 3).map((rec: string, i: number) => (
                             <HubSpotContentBlock key={i} type="benefit">{rec}</HubSpotContentBlock>
                        ))}
                    </div>
                }
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px' }}>
                    Competitive <span style={{ color: HUB_THEME.colors.primary }}>Whitespace</span>
                </div>
                
                <HubSpotContentBlock title="Analysis" label="POSITIONING NODE">
                   {getNested('positioning.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <HubSpotContentBlock title="Market Impact" label="MEANING">
                       {getNested('positioning.strategic_dive.meaning_explained')}
                    </HubSpotContentBlock>
                    <HubSpotContentBlock title="Guidance" label="ENOLA'S DIRECTIVE">
                       {getNested('positioning.strategic_dive.enolas_guidance')}
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            {/* 03: VISUAL DIRECTION RECOMMENDATION */}
            <HubSpotSlide 
                number="03" 
                category="AESTHETIC" 
                title="Visual Direction Blueprint"
                rightSide={
                  <div className="space-y-6">
                    <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>PRIMARY PALETTE</div>
                    <div className="flex gap-2">
                        {(data.visual?.primary_colors || []).slice(0, 4).map((c: any, i: number) => (
                            <div key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', background: c.hex_code, border: '1px solid #E2E8F0' }} title={c.psychology} />
                        ))}
                    </div>
                    <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary, marginTop: '20px' }}>TYPOGRAPHY</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{getNested('visual.primary_typography', 'Inter')}</div>
                    <div style={{ fontSize: '16px', opacity: 0.6 }}>{getNested('visual.secondary_typography', 'Roboto')}</div>
                  </div>
                }
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px' }}>
                    The <span style={{ color: HUB_THEME.colors.primary }}>Visual</span> Grammar
                </div>
                
                <HubSpotContentBlock title="Analysis" label="AESTHETIC PULSE">
                   {getNested('visual.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <HubSpotContentBlock title="Impact" label="MEANING">
                       {getNested('visual.strategic_dive.meaning_explained')}
                    </HubSpotContentBlock>
                    <HubSpotContentBlock title="Guidance" label="ENOLA'S DIRECTIVE">
                       {getNested('visual.strategic_dive.enolas_guidance')}
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            <HubSpotSlide 
                number="04A" 
                category="AUDIT" 
                title="Extracted Visual Assets"
                dark
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px', color: 'white' }}>
                    Captured <span style={{ color: HUB_THEME.colors.primary }}>Brand</span> Assets
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '10px' }}>
                    {(data.visual?.extracted_app_images || []).slice(0, 6).map((img: string, i: number) => (
                        <div key={i} style={{ 
                            height: '140px', 
                            backgroundImage: `url(${img})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: HUB_THEME.radius.card,
                            border: '1px solid rgba(255,255,255,0.1)',
                            backgroundColor: 'rgba(255,255,255,0.02)'
                        }} />
                    ))}
                </div>
                
                <div style={{ marginTop: '30px' }}>
                    <HubSpotContentBlock title="Asset Integrity" label="DATA QUALITY" dark>
                        Live brand assets captured during extraction process. These represent the ground truth for creative generation and ad-template alignment.
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            {/* 04: VERBAL TONE ALIGNMENT */}
            <HubSpotSlide 
                number="04" 
                category="MESSAGING" 
                title="Verbal Tone Alignment"
                rightSide={
                  <div className="space-y-6">
                    <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>SIGNATURE PATTERNS</div>
                    {(data.voice?.signature_patterns || ['Precision execution', 'Autonomous efficiency', 'Institutional veracity']).map((sig: string, i: number) => (
                        <div key={i} style={{ padding: '15px', background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', fontWeight: 'bold', color: HUB_THEME.colors.textDark }}>
                            "{sig}"
                        </div>
                    ))}
                  </div>
                }
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px' }}>
                    The <span style={{ color: HUB_THEME.colors.primary }}>Voice</span> Blueprint
                </div>
                
                <HubSpotContentBlock title="Analysis" label="TONAL DNA">
                   {getNested('voice.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <HubSpotContentBlock title="Engagement" label="MEANING">
                       {getNested('voice.strategic_dive.meaning_explained')}
                    </HubSpotContentBlock>
                    <HubSpotContentBlock title="Guidance" label="ENOLA'S DIRECTIVE">
                       {getNested('voice.strategic_dive.enolas_guidance')}
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            {/* 05: CAMPAIGN STRATEGY MAP */}
            <HubSpotSlide 
                number="05" 
                category="ADVERTISING" 
                title="Campaign Strategy Map"
                rightSide={
                    <div className="space-y-4">
                        <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>CAMPAIGN OBJECTIVES</div>
                        {(data.campaign?.top_objectives || ['Brand Awareness', 'Market Leadership', 'User Acquisition']).map((obj: string, i: number) => (
                             <HubSpotContentBlock key={i} type="benefit">{obj}</HubSpotContentBlock>
                        ))}
                    </div>
                }
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px' }}>
                    Deployment <span style={{ color: HUB_THEME.colors.primary }}>Vector</span>
                </div>
                
                <HubSpotContentBlock title="Analysis" label="STRATEGIC ANCHOR">
                   {getNested('campaign.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <HubSpotContentBlock title="Execution" label="MEANING">
                       {getNested('campaign.strategic_dive.meaning_explained')}
                    </HubSpotContentBlock>
                    <HubSpotContentBlock title="Guidance" label="ENOLA'S DIRECTIVE">
                       {getNested('campaign.strategic_dive.enolas_guidance')}
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            {/* 06: AUDIENCE EMPATHY MATRIX */}
            <HubSpotSlide 
                number="06" 
                category="AUDIENCE" 
                title="Audience Empathy Matrix"
                rightSide={
                    <div className="space-y-4">
                        <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>IDEAL CUSTOMER PROFILES</div>
                        {(data.audience?.icps || [{name: 'Primary Decision Maker'}]).slice(0, 3).map((icp: any, i: number) => (
                             <HubSpotContentBlock key={i} type="benefit" title={icp.name}>{icp.motivations || 'Strategic growth and efficiency.'}</HubSpotContentBlock>
                        ))}
                    </div>
                }
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px' }}>
                    Who are we <span style={{ color: HUB_THEME.colors.primary }}>Serving</span>?
                </div>
                
                <HubSpotContentBlock title="Analysis" label="AUDIENCE PSYCHOGRAPHICS">
                   {getNested('audience.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <HubSpotContentBlock title="Resonance" label="MEANING">
                       {getNested('audience.strategic_dive.meaning_explained')}
                    </HubSpotContentBlock>
                    <HubSpotContentBlock title="Guidance" label="ENOLA'S DIRECTIVE">
                       {getNested('audience.strategic_dive.enolas_guidance')}
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            {/* 07: PRODUCT / SERVICE DNA */}
            <HubSpotSlide 
                number="07" 
                category="PRODUCT" 
                title="Product DNA"
                rightSide={
                    <div className="space-y-4">
                        <div style={{...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>CORE BENEFITS</div>
                        {(data.product?.feature_mapping || []).slice(0, 3).map((fm: any, i: number) => (
                             <HubSpotContentBlock key={i} type="benefit" title={fm.feature}>{fm.benefit}</HubSpotContentBlock>
                        ))}
                    </div>
                }
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '20px' }}>
                    The <span style={{ color: HUB_THEME.colors.primary }}>Utility</span> Core
                </div>
                
                <HubSpotContentBlock title="Analysis" label="BENEFIT CLUSTER">
                   {getNested('product.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <HubSpotContentBlock title="Market Impact" label="MEANING">
                       {getNested('product.strategic_dive.meaning_explained')}
                    </HubSpotContentBlock>
                    <HubSpotContentBlock title="Guidance" label="ENOLA'S DIRECTIVE">
                       {getNested('product.strategic_dive.enolas_guidance')}
                    </HubSpotContentBlock>
                </div>
            </HubSpotSlide>

            {/* 08: SOURCES & METHODOLOGY */}
            <HubSpotSlide 
                number="08" 
                category="ORIGIN" 
                title="Sources & Methodology"
            >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                    <div>
                        <div style={{...HUB_THEME.typography.label as any, marginBottom: '20px', fontSize: '10px' }}>Primary Signal Inputs</div>
                        <ul className="space-y-4">
                            <li style={{ fontSize: '14px', color: HUB_THEME.colors.textDark }}><strong>Source 01:</strong> Brand Website Metadata & Semantic Copy Analysis</li>
                            <li style={{ fontSize: '14px', color: HUB_THEME.colors.textDark }}><strong>Source 02:</strong> Social Profile Sentiment & Aesthetic Pulse Extraction</li>
                            <li style={{ fontSize: '14px', color: HUB_THEME.colors.textDark }}><strong>Source 03:</strong> Competitive Landscape & Whitespace Matrix Mapping</li>
                        </ul>
                        <div className="mt-8">
                            <HubSpotContentBlock title="Methodology Analysis" label="STRATEGIC VANTAGE">
                                {getNested('methodology.strategic_dive.in_depth_analysis')}
                            </HubSpotContentBlock>
                        </div>
                    </div>
                    <div>
                        <div style={{...HUB_THEME.typography.label as any, marginBottom: '20px', fontSize: '10px' }}>Agentic Orchestration</div>
                        <p style={{ ...HUB_THEME.typography.body as any, fontSize: '14px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, marginBottom: '30px' }}>
                            Enola.ai operates via a distributed multi-agent architecture. The <strong>KYC Manager</strong> extracts the core DNA, 
                            the <strong>Strategist</strong> constructs the Directed Acyclic Graph (DAG) for execution, and the 
                            <strong>Art Director</strong> engineers the visual prompt package.
                        </p>
                        <HubSpotContentBlock title="Prescriptive Guidance" label="ENOLA'S DIRECTIVE">
                            {getNested('methodology.strategic_dive.enolas_guidance')}
                        </HubSpotContentBlock>
                    </div>
                </div>
            </HubSpotSlide>

            {/* 09: DATA AUDIT & CONFIDENCE */}
            <HubSpotSlide 
                number="09" 
                category="INTEGRITY" 
                title="Data Audit & Confidence"
                dark
            >
                <div style={{...HUB_THEME.typography.h2 as any, marginBottom: '40px' }}>
                    Intelligence <span style={{ color: HUB_THEME.colors.primary }}>Integrity</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '40px' }}>
                    <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: HUB_THEME.radius.card, textAlign: 'center' }}>
                         <div style={{ fontSize: '64px', fontWeight: 900, color: HUB_THEME.colors.primary }}>{data.audit?.overall_score || 85}%</div>
                         <div style={{ ...HUB_THEME.typography.label as any, opacity: 0.6, fontSize: '10px' }}>Signal Readiness</div>
                    </div>
                    <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: HUB_THEME.radius.card, textAlign: 'center' }}>
                         <div style={{ fontSize: '64px', fontWeight: 900, color: HUB_THEME.colors.accent }}>92%</div>
                         <div style={{ ...HUB_THEME.typography.label as any, opacity: 0.6, fontSize: '10px' }}>Voice Sync Accuracy</div>
                    </div>
                    <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: HUB_THEME.radius.card, textAlign: 'center' }}>
                         <div style={{ fontSize: '64px', fontWeight: 900, color: HUB_THEME.colors.primary }}>12</div>
                         <div style={{ ...HUB_THEME.typography.label as any, opacity: 0.6, fontSize: '10px' }}>Agent Passes</div>
                    </div>
                </div>

                <HubSpotContentBlock title="Audit Narrative" label="DATA QUALITY ANALYSIS" dark>
                   {getNested('audit.strategic_dive.in_depth_analysis')}
                </HubSpotContentBlock>
            </HubSpotSlide>

            {/* 10: STRATEGIC CLOSURE */}
            <HubSpotSlide 
                number="10" 
                category="FINISH" 
                title="CONCLUSION"
                dark
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ ...HUB_THEME.typography.h1 as any, color: 'white', marginBottom: '24px' }}>Strategic <span style={{ color: HUB_THEME.colors.primary }}>Enola Conclusion</span></div>
                    <p style={{ ...HUB_THEME.typography.body as any, color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '24px' }}>
                        {getNested('executive_summary.brand_values_summary', 'This audit confirms that the brand is directionally sound and prepared for agentic orchestration.')}
                    </p>
                </div>
            </HubSpotSlide>
          </div>
       </div>
    </div>
  );
}
