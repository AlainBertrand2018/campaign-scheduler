import React from 'react';
import { HUB_THEME } from './Theme';

/**
 * BrandPyramid Component
 * Renders a visual representation of the brand hierarchy:
 * - Brand Soul (Top)
 * - Strategic Pillars (Middle)
 * - Signal Foundation (Bottom)
 */
export function BrandPyramid() {
  const levels = [
    { 
      label: '01. BRAND SOUL', 
      color: HUB_THEME.colors.primary, 
      width: '160px',
      desc: 'The immutable core purpose and driving mission.'
    },
    { 
      label: '02. STRATEGIC PILLARS', 
      color: HUB_THEME.colors.accent, 
      width: '280px',
      desc: 'Positioning, USP, and competitive differentiation.'
    },
    { 
      label: '03. SIGNAL FOUNDATION', 
      color: HUB_THEME.colors.secondary, 
      width: '420px',
      desc: 'Visuals, voice, and audience touchpoints.'
    }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      marginTop: '40px',
      position: 'relative'
    }}>
      {levels.map((level, i) => (
        <div key={i} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          marginBottom: i === levels.length - 1 ? 0 : '10px'
        }}>
          {/* Label Container */}
          <div style={{
            width: level.width,
            height: '50px',
            background: level.color,
            borderRadius: i === 0 ? '12px 12px 4px 4px' : (i === levels.length - 1 ? '4px 4px 12px 12px' : '4px'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: levels.length - i
          }}>
            <span style={{ 
              color: 'white', 
              fontSize: '11px', 
              fontWeight: 900, 
              letterSpacing: '0.1em',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {level.label}
            </span>
          </div>
          
          {/* Connector Dots if needed or small spacing */}
          {i < levels.length - 1 && (
            <div style={{ 
              width: '2px', 
              height: '10px', 
              background: HUB_THEME.colors.border,
              opacity: 0.5
            }} />
          )}
        </div>
      ))}

      {/* Narrative Sidebars (Absolute Positioned for Visual Flair) */}
      <div style={{
        position: 'absolute',
        left: '-180px',
        top: '20px',
        width: '150px',
        textAlign: 'right',
        opacity: 0.6
      }}>
        <div style={{ fontSize: '10px', fontWeight: 900, color: HUB_THEME.colors.primary, marginBottom: '5px' }}>ESSENCE</div>
        <div style={{ fontSize: '11px', color: HUB_THEME.colors.textDark, lineHeight: 1.4 }}>Primary Brand Narrative</div>
      </div>

      <div style={{
        position: 'absolute',
        right: '-180px',
        bottom: '20px',
        width: '150px',
        textAlign: 'left',
        opacity: 0.6
      }}>
        <div style={{ fontSize: '10px', fontWeight: 900, color: HUB_THEME.colors.accent, marginBottom: '5px' }}>OUTPUT</div>
        <div style={{ fontSize: '11px', color: HUB_THEME.colors.textDark, lineHeight: 1.4 }}>Multi-Channel Deployment</div>
      </div>
    </div>
  );
}
