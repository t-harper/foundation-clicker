import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const ConversionChamberArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Conversion Chamber">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Chamber structure - hexagonal */}
    <path d="M32 18 L48 28 L48 44 L32 52 L16 44 L16 28 Z" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M32 18 L48 28 L48 44 L32 52 L16 44 L16 28 Z" fill="currentColor" opacity="0.06" />

    {/* Inner chamber */}
    <path d="M32 26 L40 32 L40 40 L32 44 L24 40 L24 32 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {/* Central conversion point */}
    <circle cx="32" cy="36" r="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="32" cy="36" r="1.5" fill="currentColor" opacity="0.35" />

    {/* Energy conduits to center */}
    <line x1="24" y1="32" x2="28" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="40" y1="32" x2="36" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="32" y1="26" x2="32" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

    {level >= 2 && (
      <>
        {/* Power conduits from outside */}
        <line x1="8" y1="36" x2="16" y2="36" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <line x1="56" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        {/* Amplifier nodes */}
        <circle cx="8" cy="36" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <circle cx="56" cy="36" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {/* Top emitter */}
        <line x1="32" y1="18" x2="32" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <circle cx="32" cy="11" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Conversion field energy */}
        <path d="M32 26 L40 32 L40 40 L32 44 L24 40 L24 32 Z" fill="currentColor" opacity="0.06" />
        {/* Pulsing energy from center */}
        <circle cx="32" cy="36" r="8" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        <circle cx="32" cy="36" r="12" stroke="currentColor" strokeWidth="0.2" opacity="0.06" />
        {/* Mind-energy particles */}
        <circle cx="20" cy="30" r="0.6" fill="currentColor" opacity="0.25" />
        <circle cx="44" cy="30" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="26" cy="46" r="0.5" fill="currentColor" opacity="0.18" />
        <circle cx="38" cy="46" r="0.6" fill="currentColor" opacity="0.2" />
      </>
    )}
  </svg>
);
