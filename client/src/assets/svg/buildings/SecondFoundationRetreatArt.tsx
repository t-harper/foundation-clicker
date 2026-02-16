import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const SecondFoundationRetreatArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Second Foundation Retreat">
    {/* Ground - Star's End landscape */}
    <path d="M4 52 Q16 48 32 50 Q48 52 60 48" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Hidden compound - partially underground */}
    <path d="M16 50 V34 Q16 28 32 26 Q48 28 48 34 V50" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M16 50 V34 Q16 28 32 26 Q48 28 48 34 V50 Z" fill="currentColor" opacity="0.06" />

    {/* Dome structure */}
    <path d="M20 34 Q20 22 32 20 Q44 22 44 34" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M20 34 Q20 22 32 20 Q44 22 44 34 Z" fill="currentColor" opacity="0.04" />

    {/* Entrance - hidden */}
    <rect x="28" y="44" width="8" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Stars above (Star's End) */}
    <circle cx="12" cy="10" r="1.2" fill="currentColor" opacity="0.3" />
    <circle cx="52" cy="8" r="1" fill="currentColor" opacity="0.25" />
    <circle cx="32" cy="6" r="1.5" fill="currentColor" opacity="0.35" />
    <circle cx="22" cy="14" r="0.6" fill="currentColor" opacity="0.15" />
    <circle cx="44" cy="12" r="0.8" fill="currentColor" opacity="0.2" />

    {/* Mind symbol */}
    <ellipse cx="32" cy="36" rx="4" ry="2.5" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    <circle cx="32" cy="36" r="1" fill="currentColor" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Underground wings */}
        <rect x="8" y="40" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <line x1="16" y1="44" x2="20" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="48" y="40" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <line x1="48" y1="44" x2="44" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Psychic field around retreat */}
        <path d="M12 50 Q12 16 32 14 Q52 16 52 50" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        {/* Dome glow */}
        <path d="M22 34 Q22 24 32 22 Q42 24 42 34" fill="currentColor" opacity="0.05" />
        {/* Star connections */}
        <line x1="32" y1="20" x2="32" y2="8" stroke="currentColor" strokeWidth="0.2" opacity="0.08" strokeDasharray="1 2" />
        {/* Wisdom particles */}
        <circle cx="26" cy="28" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="38" cy="26" r="0.5" fill="currentColor" opacity="0.15" />
      </>
    )}
  </svg>
);
