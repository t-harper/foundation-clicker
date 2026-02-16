import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const StellarHarvesterArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Stellar Harvester">
    {/* Star being harvested */}
    <circle cx="32" cy="14" r="8" fill="currentColor" opacity="0.12" />
    <circle cx="32" cy="14" r="5" fill="currentColor" opacity="0.08" />
    <circle cx="32" cy="14" r="3" fill="currentColor" opacity="0.15" />

    {/* Harvester arms curving around star */}
    <path d="M14 30 Q14 10 24 8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <path d="M50 30 Q50 10 40 8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />

    {/* Energy collection dish / scoop */}
    <path d="M14 30 L14 46" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M50 30 L50 46" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />

    {/* Central processing structure */}
    <rect x="20" y="38" width="24" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="20" y="38" width="24" height="14" rx="1" fill="currentColor" opacity="0.06" />

    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Energy conduit from arms to processor */}
    <line x1="14" y1="42" x2="20" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <line x1="50" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Core */}
    <circle cx="32" cy="44" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    <circle cx="32" cy="44" r="1" fill="currentColor" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Secondary collector */}
        <path d="M8 36 Q6 18 18 12" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <path d="M56 36 Q58 18 46 12" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        {/* Storage tanks */}
        <rect x="6" y="46" width="8" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <rect x="50" y="46" width="8" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Star corona */}
        <circle cx="32" cy="14" r="12" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        {/* Energy flow lines */}
        <line x1="28" y1="20" x2="26" y2="38" stroke="currentColor" strokeWidth="0.4" opacity="0.12" strokeDasharray="2 2" />
        <line x1="36" y1="20" x2="38" y2="38" stroke="currentColor" strokeWidth="0.4" opacity="0.12" strokeDasharray="2 2" />
        {/* Solar flare particles */}
        <circle cx="22" cy="10" r="0.6" fill="currentColor" opacity="0.25" />
        <circle cx="42" cy="10" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="4" r="0.7" fill="currentColor" opacity="0.15" />
      </>
    )}
  </svg>
);
