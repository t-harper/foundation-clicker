import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const MallowTradingHouseArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Mallow Trading House">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Grand multi-story building */}
    <rect x="14" y="18" width="36" height="34" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="18" width="36" height="34" rx="1" fill="currentColor" opacity="0.06" />

    {/* Floor separators */}
    <line x1="14" y1="28" x2="50" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="14" y1="38" x2="50" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Penthouse / top floor */}
    <rect x="20" y="12" width="24" height="6" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <rect x="20" y="12" width="24" height="6" rx="0.5" fill="currentColor" opacity="0.04" />

    {/* Windows - upper floor */}
    <rect x="18" y="20" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="26" y="20" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="34" y="20" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="42" y="20" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />

    {/* Windows - middle floor */}
    <rect x="18" y="30" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="26" y="30" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="34" y="30" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="42" y="30" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />

    {/* Grand entrance with awning */}
    <rect x="26" y="42" width="12" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="24" y1="42" x2="40" y2="42" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Left luxury garden */}
        <rect x="4" y="44" width="10" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <path d="M7 44 Q9 40 11 44" fill="currentColor" opacity="0.08" />
        {/* Right luxury garden */}
        <rect x="50" y="44" width="10" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <path d="M53 44 Q55 40 57 44" fill="currentColor" opacity="0.08" />
        {/* Decorative cornice */}
        <path d="M14 18 Q32 14 50 18" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Rooftop beacon */}
        <line x1="32" y1="12" x2="32" y2="6" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <circle cx="32" cy="5" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="5" r="4" fill="currentColor" opacity="0.06" />
        {/* Wealth glow from penthouse */}
        <rect x="21" y="13" width="22" height="4" rx="0.3" fill="currentColor" opacity="0.06" />
        {/* Holographic sign */}
        <rect x="22" y="8" width="20" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      </>
    )}
  </svg>
);
