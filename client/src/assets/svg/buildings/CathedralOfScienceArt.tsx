import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const CathedralOfScienceArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Cathedral of Science">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Base platform */}
    <rect x="10" y="48" width="44" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Main cathedral body */}
    <rect x="18" y="24" width="28" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="18" y="24" width="28" height="24" rx="1" fill="currentColor" opacity="0.06" />

    {/* Grand dome */}
    <path d="M20 24 Q20 12 32 10 Q44 12 44 24" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <path d="M20 24 Q20 12 32 10 Q44 12 44 24 Z" fill="currentColor" opacity="0.04" />

    {/* Dome ribs */}
    <path d="M28 24 Q28 14 32 12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    <path d="M36 24 Q36 14 32 12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />

    {/* Central spire */}
    <line x1="32" y1="10" x2="32" y2="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {/* Rose window */}
    <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="32" y1="27" x2="32" y2="37" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    <line x1="27" y1="32" x2="37" y2="32" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />

    {/* Grand entrance */}
    <path d="M28 48 L28 42 Q28 39 32 39 Q36 39 36 42 L36 48" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {level >= 2 && (
      <>
        {/* Left tower */}
        <rect x="10" y="28" width="8" height="20" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <path d="M10 28 L14 22 L18 28" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        {/* Right tower */}
        <rect x="46" y="28" width="8" height="20" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <path d="M46 28 L50 22 L54 28" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        {/* Buttresses */}
        <line x1="18" y1="36" x2="14" y2="44" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <line x1="46" y1="36" x2="50" y2="44" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Spire beacon */}
        <circle cx="32" cy="3" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="3" r="4" fill="currentColor" opacity="0.06" />
        {/* Light beams from dome */}
        <line x1="28" y1="14" x2="24" y2="6" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        <line x1="36" y1="14" x2="40" y2="6" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        {/* Tower lights */}
        <circle cx="14" cy="23" r="1" fill="currentColor" opacity="0.35" />
        <circle cx="50" cy="23" r="1" fill="currentColor" opacity="0.35" />
        {/* Rose window glow */}
        <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.06" />
      </>
    )}
  </svg>
);
