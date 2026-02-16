import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const RefineryComplexArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Refinery Complex">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Distillation column 1 (tall) */}
    <rect x="20" y="12" width="8" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="20" y="12" width="8" height="40" rx="4" fill="currentColor" opacity="0.05" />

    {/* Distillation column 2 (medium) */}
    <rect x="32" y="20" width="7" height="32" rx="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <rect x="32" y="20" width="7" height="32" rx="3.5" fill="currentColor" opacity="0.04" />

    {/* Connecting pipes */}
    <line x1="28" y1="24" x2="32" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="28" y1="36" x2="32" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4" />

    {/* Tank segments (horizontal lines) */}
    <line x1="20" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="20" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="20" y1="42" x2="28" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Base platform */}
    <rect x="16" y="48" width="28" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Column 3 (short) */}
        <rect x="42" y="30" width="6" height="22" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="39" y1="38" x2="42" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        {/* Storage tank */}
        <ellipse cx="10" cy="44" rx="6" ry="4" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <rect x="4" y="44" width="12" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        {/* Pipe from column to tank */}
        <path d="M20 44 L16 44 L16 46 L10 46" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Flare stack */}
        <line x1="52" y1="52" x2="52" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <path d="M50 28 Q52 22 54 28" fill="currentColor" opacity="0.2" />
        <circle cx="52" cy="24" r="2" fill="currentColor" opacity="0.1" />
        {/* Steam/vapor */}
        <path d="M24 12 Q23 8 24 5" stroke="currentColor" strokeWidth="0.5" opacity="0.15" strokeLinecap="round" />
        <path d="M35.5 20 Q34 16 35.5 13" stroke="currentColor" strokeWidth="0.4" opacity="0.12" strokeLinecap="round" />
        {/* Processing glow */}
        <rect x="21" y="26" width="6" height="12" rx="3" fill="currentColor" opacity="0.06" />
      </>
    )}
  </svg>
);
