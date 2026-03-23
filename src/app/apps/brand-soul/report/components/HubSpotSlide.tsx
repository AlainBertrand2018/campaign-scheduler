import React from 'react';
import { HUB_THEME } from './Theme';

interface HubSpotSlideProps {
  number: string;
  category: string;
  title: string;
  children: React.ReactNode;
  rightSide?: React.ReactNode;
  dark?: boolean;
}

export function HubSpotSlide({ number, category, title, children, rightSide, dark = false }: HubSpotSlideProps) {
  const bg = dark ? HUB_THEME.colors.secondary : HUB_THEME.colors.bgLight;
  const textColor = dark ? HUB_THEME.colors.white : HUB_THEME.colors.textDark;
  
  return (
    <div style={{
      width: '297mm',
      height: '210mm',
      background: bg,
      color: textColor,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 60px'
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '30px',
        borderBottom: `2px solid ${dark ? 'rgba(255,255,255,0.05)' : '#E2E8F0'}`,
        paddingBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ 
            ...HUB_THEME.typography.h1 as any,
            fontSize: '56px',
            opacity: 0.1,
            fontWeight: '900',
            color: dark ? 'white' : 'black'
          }}>{number}</span>
          <div>
            <div style={{ ...HUB_THEME.typography.label as any, color: HUB_THEME.colors.primary }}>{category}</div>
            <h2 style={{ ...HUB_THEME.typography.h3 as any, margin: 0, fontWeight: 900 }}>{title}</h2>
          </div>
        </div>
        <div style={{
            ...HUB_THEME.typography.label as any,
            background: HUB_THEME.colors.primary,
            color: 'white',
            padding: '8px 20px',
            borderRadius: HUB_THEME.radius.pill,
            fontSize: '10px'
        }}>
            Strategic Intel • Enola.ai
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: rightSide ? '1fr 400px' : '1fr', gap: '60px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {children}
        </div>
        
        {rightSide && (
          <div style={{
            background: dark ? 'rgba(255,255,255,0.05)' : 'white',
            borderRadius: HUB_THEME.radius.card,
            padding: '30px',
            border: dark ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${HUB_THEME.colors.border}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {rightSide}
          </div>
        )}
      </div>

      {/* Footer Grid Style */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '60px',
        right: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.4,
        fontSize: '9px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        <div>2025 Autonomous Brand Intelligence • Enola.ai</div>
        <div>Page {number} • confidential blueprint</div>
      </div>
    </div>
  );
}
