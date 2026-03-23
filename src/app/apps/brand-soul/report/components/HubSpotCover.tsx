import React from 'react';
import { HUB_THEME } from './Theme';

interface HubSpotCoverProps {
  brandName: string;
  brandPromise: string;
}

export function HubSpotCover({ brandName, brandPromise }: HubSpotCoverProps) {
  return (
    <div style={{
      width: '297mm',
      height: '210mm',
      background: HUB_THEME.colors.secondary,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '100px',
      color: 'white'
    }}>
      {/* Decorative Diagonal Path (HubSpot-ish) */}
      <div style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: '800px',
          height: '800px',
          background: HUB_THEME.colors.primary,
          borderRadius: '200px',
          transform: 'rotate(45deg)',
          opacity: 0.1
      }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          ...HUB_THEME.typography.label as any,
          color: HUB_THEME.colors.primary,
          marginBottom: '30px'
        }}>
          Enola.ai • 2025 Intelligence Report
        </div>
        
        <h1 style={{
          ...HUB_THEME.typography.h1 as any,
          fontSize: '110px',
          maxWidth: '900px',
          marginBottom: '40px'
        }}>
          Brand <span style={{ color: HUB_THEME.colors.primary }}>{brandName}</span> Strategy Vector
        </h1>
        
        <p style={{
          ...HUB_THEME.typography.body as any,
          fontSize: '28px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '700px',
          lineHeight: '1.4'
        }}>
          {brandPromise}
        </p>
        
        <div style={{
          marginTop: '100px',
          display: 'flex',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div style={{
            padding: '20px 40px',
            border: `1px solid rgba(255,255,255,0.2)`,
            borderRadius: HUB_THEME.radius.card
          }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '5px' }}>Date Issued</div>
            <div style={{ fontSize: '18px', fontWeight: 900 }}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
          </div>
          
          <div style={{
            ...HUB_THEME.typography.label as any,
            fontSize: '12px',
            opacity: 0.5
          }}>
            #ENOLA_STRATEGY_DECK_V2
          </div>
        </div>
      </div>
    </div>
  );
}
