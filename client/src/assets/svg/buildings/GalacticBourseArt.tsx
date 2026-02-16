import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GalacticBourseArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Galactic Bourse">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Circular exchange floor */}
    <ellipse cx="32" cy="42" rx="22" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="32" cy="42" rx="22" ry="10" fill="currentColor" opacity="0.05" />

    {/* Walls rising from ellipse */}
    <line x1="10" y1="42" x2="10" y2="28" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="54" y1="42" x2="54" y2="28" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

    {/* Dome roof */}
    <path d="M10 28 Q10 14 32 12 Q54 14 54 28" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <path d="M10 28 Q10 14 32 12 Q54 14 54 28 Z" fill="currentColor" opacity="0.04" />

    {/* Trading pit circles */}
    <ellipse cx="32" cy="42" rx="10" ry="5" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    <ellipse cx="32" cy="42" rx="4" ry="2" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Central display pillar */}
    <line x1="32" y1="40" x2="32" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />

    {/* Ticker board */}
    <rect x="26" y="24" width="12" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <path d="M28 28 L30 26 L33 27 L36 25" stroke="currentColor" strokeWidth="0.6" opacity="0.3" strokeLinecap="round" />

    {level >= 2 && (
      <>
        {/* Left trading terminal */}
        <rect x="14" y="38" width="6" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        {/* Right trading terminal */}
        <rect x="44" y="38" width="6" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        {/* Dome ribs */}
        <path d="M22 28 Q22 18 32 16" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <path d="M42 28 Q42 18 32 16" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Holographic galaxy display above */}
        <circle cx="32" cy="10" r="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="32" cy="10" r="1" fill="currentColor" opacity="0.3" />
        {/* Projection beams */}
        <line x1="29" y1="24" x2="30" y2="13" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        <line x1="35" y1="24" x2="34" y2="13" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        {/* Trading floor glow */}
        <ellipse cx="32" cy="42" rx="18" ry="8" fill="currentColor" opacity="0.04" />
        {/* Data points */}
        <circle cx="20" cy="36" r="0.6" fill="currentColor" opacity="0.3" />
        <circle cx="44" cy="36" r="0.6" fill="currentColor" opacity="0.3" />
      </>
    )}
  </svg>
);
