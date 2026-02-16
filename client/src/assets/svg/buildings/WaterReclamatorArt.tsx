import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const WaterReclamatorArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Water Reclamator">
    {/* Ground */}
    <line x1="8" y1="52" x2="56" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Central condenser tower */}
    <rect x="26" y="22" width="12" height="30" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="26" y="22" width="12" height="30" rx="1" fill="currentColor" opacity="0.06" />

    {/* Moisture collection fins */}
    <line x1="22" y1="26" x2="26" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="22" y1="32" x2="26" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="22" y1="38" x2="26" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="42" y1="26" x2="38" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="42" y1="32" x2="38" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="42" y1="38" x2="38" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {/* Collection basin at bottom */}
    <path d="M22 48 Q22 52 32 52 Q42 52 42 48" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

    {/* Water droplet symbol */}
    <path d="M32 28 Q34 32 32 35 Q30 32 32 28 Z" fill="currentColor" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Left collection tank */}
        <rect x="10" y="40" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="15" y1="44" x2="15" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        {/* Right collection tank */}
        <rect x="44" y="40" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Connecting pipes */}
        <line x1="20" y1="46" x2="26" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="38" y1="46" x2="44" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Atmospheric sensor on top */}
        <line x1="32" y1="22" x2="32" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <circle cx="32" cy="13" r="2" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
        <circle cx="32" cy="13" r="0.8" fill="currentColor" opacity="0.4" />
        {/* Condensation effect */}
        <circle cx="24" cy="30" r="1" fill="currentColor" opacity="0.15" />
        <circle cx="40" cy="34" r="1.2" fill="currentColor" opacity="0.12" />
        <circle cx="23" cy="42" r="0.8" fill="currentColor" opacity="0.15" />
        {/* Water level in basin */}
        <path d="M24 49 Q28 47 32 49 Q36 51 40 49" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </>
    )}
  </svg>
);
