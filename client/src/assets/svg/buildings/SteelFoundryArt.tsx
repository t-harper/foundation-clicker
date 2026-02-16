import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const SteelFoundryArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Steel Foundry">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main building */}
    <rect x="14" y="30" width="26" height="22" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="30" width="26" height="22" rx="1" fill="currentColor" opacity="0.06" />

    {/* Smokestack */}
    <rect x="34" y="14" width="6" height="38" rx="0.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <rect x="34" y="14" width="6" height="38" rx="0.5" fill="currentColor" opacity="0.04" />

    {/* Smoke */}
    <path d="M37 14 Q35 10 37 7 Q39 4 37 1" stroke="currentColor" strokeWidth="0.8" opacity="0.2" strokeLinecap="round" />

    {/* Furnace opening - glowing */}
    <rect x="18" y="42" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <rect x="19" y="43" width="8" height="6" rx="0.5" fill="currentColor" opacity="0.2" />

    {/* Anvil shape */}
    <path d="M20 38 L24 36 L28 38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Second smokestack */}
        <rect x="42" y="22" width="5" height="30" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <path d="M44.5 22 Q43 18 44.5 15" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />
        {/* Storage bins */}
        <rect x="6" y="42" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="6" y1="47" x2="14" y2="47" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {/* Conveyor belt */}
        <line x1="6" y1="44" x2="14" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Molten glow from furnace */}
        <ellipse cx="23" cy="48" rx="8" ry="3" fill="currentColor" opacity="0.08" />
        {/* Sparks */}
        <circle cx="30" cy="40" r="0.6" fill="currentColor" opacity="0.35" />
        <circle cx="26" cy="37" r="0.5" fill="currentColor" opacity="0.3" />
        <circle cx="18" cy="39" r="0.4" fill="currentColor" opacity="0.25" />
        {/* Heat shimmer lines */}
        <path d="M35 10 Q36 8 35 6" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <path d="M39 12 Q40 10 39 8" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      </>
    )}
  </svg>
);
