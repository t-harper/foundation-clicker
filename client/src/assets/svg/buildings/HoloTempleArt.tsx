import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const HoloTempleArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Holo-Temple">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Temple steps */}
    <rect x="14" y="48" width="36" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <rect x="18" y="44" width="28" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Main temple body */}
    <rect x="20" y="28" width="24" height="16" rx="0.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="20" y="28" width="24" height="16" rx="0.5" fill="currentColor" opacity="0.06" />

    {/* Columns */}
    <line x1="23" y1="28" x2="23" y2="44" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="30" y1="28" x2="30" y2="44" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="34" y1="28" x2="34" y2="44" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="41" y1="28" x2="41" y2="44" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

    {/* Pediment */}
    <path d="M18 28 L32 18 L46 28" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />

    {/* Holographic projector dome */}
    <circle cx="32" cy="22" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <circle cx="32" cy="22" r="1" fill="currentColor" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Left wing */}
        <rect x="6" y="34" width="14" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <path d="M6 34 L13 28 L20 34" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        {/* Right wing */}
        <rect x="44" y="34" width="14" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <path d="M44 34 L51 28 L58 34" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Holographic projection above temple */}
        <path d="M28 18 L32 6 L36 18" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <circle cx="32" cy="6" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <circle cx="32" cy="6" r="2" fill="currentColor" opacity="0.1" />
        {/* Hologram rays */}
        <line x1="30" y1="20" x2="26" y2="10" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        <line x1="34" y1="20" x2="38" y2="10" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        {/* Glow around dome */}
        <circle cx="32" cy="22" r="5" fill="currentColor" opacity="0.06" />
      </>
    )}
  </svg>
);
