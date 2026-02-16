import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const TradeEmbassyArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Trade Embassy">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main embassy building - elegant facade */}
    <rect x="14" y="24" width="36" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="24" width="36" height="28" rx="1" fill="currentColor" opacity="0.06" />

    {/* Flat cornice roof */}
    <line x1="12" y1="24" x2="52" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.4" />

    {/* Tall windows */}
    <rect x="18" y="28" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <rect x="26" y="28" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <rect x="34" y="28" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <rect x="42" y="28" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />

    {/* Grand double entrance */}
    <rect x="26" y="42" width="12" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="32" y1="42" x2="32" y2="52" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

    {/* Flag poles */}
    <line x1="18" y1="24" x2="18" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <path d="M18 16 L24 18 L18 20" fill="currentColor" opacity="0.2" />
    <line x1="46" y1="24" x2="46" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <path d="M46 16 L52 18 L46 20" fill="currentColor" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* Left garden/courtyard */}
        <rect x="4" y="44" width="10" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <circle cx="9" cy="42" r="2" fill="currentColor" opacity="0.08" />
        <line x1="9" y1="42" x2="9" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {/* Right garden/courtyard */}
        <rect x="50" y="44" width="10" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <circle cx="55" cy="42" r="2" fill="currentColor" opacity="0.08" />
        <line x1="55" y1="42" x2="55" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Diplomatic seal above entrance */}
        <circle cx="32" cy="39" r="2.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <circle cx="32" cy="39" r="1" fill="currentColor" opacity="0.25" />
        {/* Illuminated facade */}
        <rect x="15" y="25" width="34" height="16" rx="0.5" fill="currentColor" opacity="0.04" />
        {/* Flag glow */}
        <circle cx="21" cy="18" r="2" fill="currentColor" opacity="0.06" />
        <circle cx="49" cy="18" r="2" fill="currentColor" opacity="0.06" />
      </>
    )}
  </svg>
);
