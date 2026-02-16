import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const DreamProbeLabArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Dream Probe Lab">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Lab building */}
    <rect x="12" y="28" width="40" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="12" y="28" width="40" height="24" rx="1" fill="currentColor" opacity="0.06" />

    {/* Flat tech roof */}
    <line x1="10" y1="28" x2="54" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />

    {/* Sleep pod - oval */}
    <ellipse cx="32" cy="42" rx="10" ry="5" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    <ellipse cx="32" cy="42" rx="10" ry="5" fill="currentColor" opacity="0.06" />

    {/* Figure silhouette in pod */}
    <ellipse cx="32" cy="42" rx="4" ry="2" fill="currentColor" opacity="0.1" />

    {/* Brain scan display above */}
    <rect x="26" y="30" width="12" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
    {/* Brainwave */}
    <path d="M28 33 Q30 30 32 33 Q34 36 36 33" stroke="currentColor" strokeWidth="0.7" opacity="0.3" strokeLinecap="round" />

    {level >= 2 && (
      <>
        {/* Second sleep pod */}
        <ellipse cx="16" cy="42" rx="5" ry="3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <ellipse cx="16" cy="42" rx="2" ry="1" fill="currentColor" opacity="0.08" />
        {/* Third sleep pod */}
        <ellipse cx="48" cy="42" rx="5" ry="3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <ellipse cx="48" cy="42" rx="2" ry="1" fill="currentColor" opacity="0.08" />
        {/* Monitoring cables */}
        <line x1="21" y1="42" x2="22" y2="36" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
        <line x1="43" y1="42" x2="42" y2="36" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Dream visualization above - abstract shapes */}
        <circle cx="28" cy="20" r="3" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        <circle cx="36" cy="18" r="4" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
        <circle cx="32" cy="14" r="2.5" stroke="currentColor" strokeWidth="0.4" opacity="0.08" />
        {/* Dream connection line */}
        <path d="M32 30 Q30 24 28 20" stroke="currentColor" strokeWidth="0.3" opacity="0.12" strokeDasharray="1 1" />
        <path d="M32 30 Q34 24 36 18" stroke="currentColor" strokeWidth="0.3" opacity="0.12" strokeDasharray="1 1" />
        {/* Pod glow */}
        <ellipse cx="32" cy="42" rx="12" ry="6" fill="currentColor" opacity="0.04" />
        {/* Dream particles */}
        <circle cx="24" cy="16" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="14" r="0.6" fill="currentColor" opacity="0.15" />
      </>
    )}
  </svg>
);
