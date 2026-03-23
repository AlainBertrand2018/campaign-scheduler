import React from 'react';
import { HUB_THEME } from './Theme';

interface HubSpotContentBlockProps {
  label?: string;
  title?: string;
  children: React.ReactNode;
  dark?: boolean;
  type?: 'default' | 'benefit';
}

export function HubSpotContentBlock({ label, title, children, dark = false, type = 'default' }: HubSpotContentBlockProps) {
  const textColor = dark ? 'white' : HUB_THEME.colors.textDark;
  const subColor = dark ? 'rgba(255,255,255,0.6)' : 'rgba(51, 26, 38, 0.6)';

  if (type === 'benefit') {
    return (
      <div style={{
        padding: '20px',
        borderLeft: `4px solid ${HUB_THEME.colors.primary}`,
        background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(255, 92, 53, 0.03)',
        marginBottom: '15px'
      }}>
        {title && <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '5px' }}>{title}</div>}
        <div style={{ fontSize: '14px', lineHeight: 1.5, opacity: 0.8 }}>{children}</div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      {label && <div style={{ ...HUB_THEME.typography.label as any, fontSize: '10px', color: HUB_THEME.colors.primary, marginBottom: '8px' }}>{label}</div>}
      {title && <h3 style={{ ...HUB_THEME.typography.h3 as any, fontSize: '22px', marginBottom: '12px', color: textColor }}>{title}</h3>}
      <div style={{ ...HUB_THEME.typography.body as any, fontSize: '15px', color: subColor, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}
