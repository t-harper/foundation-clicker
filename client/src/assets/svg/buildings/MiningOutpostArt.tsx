import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const MiningOutpostArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Mining Outpost">
    {/* Ground with pit edge */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Mine headframe - A-frame structure */}
    <path d="M24 52 L32 20 L40 52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <line x1="27" y1="40" x2="37" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="28.5" y1="34" x2="35.5" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {/* Pulley wheel at top */}
    <circle cx="32" cy="22" r="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="32" cy="22" r="0.8" fill="currentColor" opacity="0.4" />

    {/* Cable going down */}
    <line x1="32" y1="25" x2="32" y2="52" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

    {/* Mine entrance */}
    <path d="M26 52 L26 44 Q26 42 32 42 Q38 42 38 44 L38 52" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M26 52 L26 44 Q26 42 32 42 Q38 42 38 44 L38 52 Z" fill="currentColor" opacity="0.12" />

    {/* Ore cart */}
    <rect x="42" y="48" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <circle cx="44" cy="52" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="48" cy="52" r="1" fill="currentColor" opacity="0.3" />
    {/* Cart tracks */}
    <line x1="38" y1="52" x2="52" y2="52" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* Left ore pile */}
        <path d="M8 52 Q10 46 16 48 Q20 46 22 52" fill="currentColor" opacity="0.1" />
        <path d="M8 52 Q10 46 16 48 Q20 46 22 52" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        {/* Right processing shed */}
        <rect x="46" y="38" width="12" height="14" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="46" y1="38" x2="52" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="52" y1="34" x2="58" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Drill bit at depth */}
        <line x1="32" y1="52" x2="32" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <path d="M30 56 L32 60 L34 56" fill="currentColor" opacity="0.2" />
        {/* Sparks from mining */}
        <circle cx="30" cy="54" r="0.8" fill="currentColor" opacity="0.3" />
        <circle cx="35" cy="55" r="0.6" fill="currentColor" opacity="0.25" />
        {/* Beacon light on headframe */}
        <circle cx="32" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="32" cy="18" r="3" fill="currentColor" opacity="0.08" />
      </>
    )}
  </svg>
);
