import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GalaxiaBeaconArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Galaxia Beacon">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Beacon tower - tall and sleek */}
    <path d="M28 52 L30 18 L34 18 L36 52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M28 52 L30 18 L34 18 L36 52 Z" fill="currentColor" opacity="0.06" />

    {/* Beacon emitter at top */}
    <circle cx="32" cy="14" r="5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="32" cy="14" r="2.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <circle cx="32" cy="14" r="1" fill="currentColor" opacity="0.5" />

    {/* Signal rings */}
    <circle cx="32" cy="14" r="9" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <circle cx="32" cy="14" r="14" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />

    {/* Support fins */}
    <line x1="28" y1="44" x2="20" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="36" y1="44" x2="44" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.4" />

    {/* Base platform */}
    <rect x="22" y="48" width="20" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Power relay stations */}
        <rect x="8" y="42" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="16" y1="46" x2="28" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="48" y="42" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="48" y1="46" x2="36" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full Galaxia signal field */}
        <circle cx="32" cy="14" r="20" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
        <circle cx="32" cy="14" r="26" stroke="currentColor" strokeWidth="0.2" opacity="0.04" />
        {/* Intense core glow */}
        <circle cx="32" cy="14" r="6" fill="currentColor" opacity="0.06" />
        {/* Signal particles reaching outward */}
        <circle cx="12" cy="8" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="52" cy="10" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="20" cy="4" r="0.7" fill="currentColor" opacity="0.18" />
        <circle cx="44" cy="2" r="0.5" fill="currentColor" opacity="0.12" />
        {/* Vertical energy beam */}
        <line x1="32" y1="9" x2="32" y2="2" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
      </>
    )}
  </svg>
);
