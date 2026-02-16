import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const HydroponicsFarmArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Hydroponics Farm">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Greenhouse - glass dome shape */}
    <path d="M16 52 V38 Q16 24 32 24 Q48 24 48 38 V52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M16 52 V38 Q16 24 32 24 Q48 24 48 38 V52 Z" fill="currentColor" opacity="0.05" />

    {/* Glass panel lines */}
    <line x1="32" y1="24" x2="32" y2="52" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <path d="M22 52 V34 Q22 27 32 27" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <path d="M42 52 V34 Q42 27 32 27" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />

    {/* Plant rows inside */}
    <line x1="22" y1="48" x2="22" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="22" cy="43" r="2" fill="currentColor" opacity="0.15" />
    <line x1="28" y1="48" x2="28" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="28" cy="41" r="2.5" fill="currentColor" opacity="0.15" />
    <line x1="36" y1="48" x2="36" y2="43" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="36" cy="42" r="2" fill="currentColor" opacity="0.15" />
    <line x1="42" y1="48" x2="42" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="42" cy="43" r="1.8" fill="currentColor" opacity="0.15" />

    {/* Growing trays */}
    <line x1="19" y1="48" x2="45" y2="48" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Left wing greenhouse */}
        <path d="M6 52 V42 Q6 36 12 36 L16 36" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M6 52 V42 Q6 36 12 36 L16 36 V52 Z" fill="currentColor" opacity="0.03" />
        {/* Right wing greenhouse */}
        <path d="M58 52 V42 Q58 36 52 36 L48 36" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M58 52 V42 Q58 36 52 36 L48 36 V52 Z" fill="currentColor" opacity="0.03" />
        {/* Extra plants */}
        <line x1="10" y1="48" x2="10" y2="44" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <circle cx="10" cy="43" r="1.5" fill="currentColor" opacity="0.12" />
        <line x1="54" y1="48" x2="54" y2="44" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <circle cx="54" cy="43" r="1.5" fill="currentColor" opacity="0.12" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* UV grow lights */}
        <circle cx="26" cy="32" r="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="38" cy="32" r="1.5" fill="currentColor" opacity="0.25" />
        {/* Light beams down */}
        <line x1="26" y1="33" x2="24" y2="42" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="26" y1="33" x2="28" y2="42" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="38" y1="33" x2="36" y2="42" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="38" y1="33" x2="40" y2="42" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        {/* Nutrient flow indicator */}
        <path d="M20 50 Q32 49 44 50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
      </>
    )}
  </svg>
);
