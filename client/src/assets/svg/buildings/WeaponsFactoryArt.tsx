import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const WeaponsFactoryArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Weapons Factory">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main bunker-like factory */}
    <rect x="10" y="30" width="34" height="22" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="10" y="30" width="34" height="22" rx="1" fill="currentColor" opacity="0.06" />

    {/* Reinforced roof */}
    <line x1="8" y1="30" x2="46" y2="30" stroke="currentColor" strokeWidth="2" opacity="0.5" />

    {/* Heavy blast door */}
    <rect x="22" y="40" width="12" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="28" y1="40" x2="28" y2="52" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    {/* Warning stripes */}
    <line x1="22" y1="42" x2="34" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Targeting reticle symbol */}
    <circle cx="28" cy="35" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    <line x1="28" y1="31" x2="28" y2="33" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="28" y1="37" x2="28" y2="39" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="24" y1="35" x2="26" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="30" y1="35" x2="32" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

    {/* Ventilation */}
    <rect x="12" y="32" width="6" height="2" rx="0.3" fill="currentColor" opacity="0.12" />
    <rect x="12" y="36" width="6" height="2" rx="0.3" fill="currentColor" opacity="0.12" />

    {level >= 2 && (
      <>
        {/* Armory tower */}
        <rect x="44" y="22" width="12" height="30" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <rect x="44" y="22" width="12" height="30" rx="0.5" fill="currentColor" opacity="0.03" />
        {/* Tower slits */}
        <rect x="48" y="26" width="4" height="1.5" rx="0.2" fill="currentColor" opacity="0.15" />
        <rect x="48" y="32" width="4" height="1.5" rx="0.2" fill="currentColor" opacity="0.15" />
        <rect x="48" y="38" width="4" height="1.5" rx="0.2" fill="currentColor" opacity="0.15" />
        {/* Perimeter fence */}
        <line x1="4" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Radar dish on tower */}
        <path d="M46 22 Q50 16 54 22" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="50" y1="22" x2="50" y2="18" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {/* Energy glow from facility */}
        <rect x="11" y="31" width="32" height="20" rx="0.5" fill="currentColor" opacity="0.04" />
        {/* Sparks from production */}
        <circle cx="36" cy="34" r="0.5" fill="currentColor" opacity="0.3" />
        <circle cx="38" cy="36" r="0.4" fill="currentColor" opacity="0.25" />
        <circle cx="15" cy="44" r="0.4" fill="currentColor" opacity="0.2" />
      </>
    )}
  </svg>
);
