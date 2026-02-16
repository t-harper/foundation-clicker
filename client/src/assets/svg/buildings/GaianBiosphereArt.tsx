import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GaianBiosphereArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Gaian Biosphere">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Biodome */}
    <path d="M10 52 Q10 16 32 12 Q54 16 54 52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M10 52 Q10 16 32 12 Q54 16 54 52 Z" fill="currentColor" opacity="0.04" />

    {/* Dome segments */}
    <path d="M20 52 Q20 22 32 18" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
    <path d="M44 52 Q44 22 32 18" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
    <path d="M10 36 Q32 30 54 36" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />

    {/* Tree inside */}
    <line x1="32" y1="52" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    {/* Canopy */}
    <circle cx="32" cy="30" r="6" fill="currentColor" opacity="0.1" />
    <circle cx="28" cy="32" r="4" fill="currentColor" opacity="0.08" />
    <circle cx="36" cy="32" r="4" fill="currentColor" opacity="0.08" />

    {/* Small plants */}
    <line x1="20" y1="52" x2="20" y2="46" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    <circle cx="20" cy="45" r="2" fill="currentColor" opacity="0.06" />
    <line x1="44" y1="52" x2="44" y2="47" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    <circle cx="44" cy="46" r="1.8" fill="currentColor" opacity="0.06" />

    {level >= 2 && (
      <>
        {/* Water feature */}
        <path d="M14 50 Q22 48 30 50" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <path d="M34 50 Q42 48 50 50" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        {/* More vegetation */}
        <line x1="16" y1="52" x2="16" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="16" cy="43" r="2.5" fill="currentColor" opacity="0.06" />
        <line x1="48" y1="52" x2="48" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="48" cy="44" r="2" fill="currentColor" opacity="0.06" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Consciousness network glow */}
        <path d="M12 50 Q12 18 32 14 Q52 18 52 50" fill="currentColor" opacity="0.03" />
        {/* Bioluminescence */}
        <circle cx="24" cy="38" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="36" r="0.8" fill="currentColor" opacity="0.18" />
        <circle cx="32" cy="24" r="0.6" fill="currentColor" opacity="0.15" />
        <circle cx="18" cy="42" r="0.7" fill="currentColor" opacity="0.12" />
        <circle cx="46" cy="40" r="0.5" fill="currentColor" opacity="0.15" />
        {/* Life energy corona */}
        <path d="M14 50 Q14 20 32 16 Q50 20 50 50" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
      </>
    )}
  </svg>
);
