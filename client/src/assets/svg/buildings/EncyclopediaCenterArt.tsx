import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const EncyclopediaCenterArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Encyclopedia Center">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main building with columns */}
    <rect x="16" y="30" width="32" height="26" fill="currentColor" opacity="0.1" />
    <rect x="16" y="30" width="32" height="26" stroke="currentColor" strokeWidth="1.5" />
    {/* Pediment / triangular roof */}
    <polygon points="14,30 50,30 32,18" fill="currentColor" opacity="0.15" />
    <polygon points="14,30 50,30 32,18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Columns */}
    <rect x="19" y="30" width="2" height="26" fill="currentColor" opacity="0.25" />
    <rect x="27" y="30" width="2" height="26" fill="currentColor" opacity="0.25" />
    <rect x="35" y="30" width="2" height="26" fill="currentColor" opacity="0.25" />
    <rect x="43" y="30" width="2" height="26" fill="currentColor" opacity="0.25" />
    {/* Column caps */}
    <rect x="18" y="29" width="4" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="26" y="29" width="4" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="34" y="29" width="4" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="42" y="29" width="4" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
    {/* Central door */}
    <rect x="28" y="44" width="8" height="12" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="28" y="44" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
    {/* Book / scroll symbol above door */}
    <rect x="30" y="36" width="4" height="5" rx="0.5" fill="currentColor" opacity="0.35" />
    <line x1="31" y1="37" x2="31" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <line x1="33" y1="37" x2="33" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

    {level >= 2 && (
      <>
        {/* Left expanded wing */}
        <rect x="4" y="38" width="12" height="18" fill="currentColor" opacity="0.08" />
        <rect x="4" y="38" width="12" height="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="38" x2="16" y2="38" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="42" width="2" height="12" fill="currentColor" opacity="0.2" />
        <rect x="12" y="42" width="2" height="12" fill="currentColor" opacity="0.2" />
        {/* Right expanded wing */}
        <rect x="48" y="38" width="12" height="18" fill="currentColor" opacity="0.08" />
        <rect x="48" y="38" width="12" height="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="48" y1="38" x2="60" y2="38" stroke="currentColor" strokeWidth="1.5" />
        <rect x="50" y="42" width="2" height="12" fill="currentColor" opacity="0.2" />
        <rect x="55" y="42" width="2" height="12" fill="currentColor" opacity="0.2" />
        {/* Connecting archways */}
        <path d="M14 42a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M46 42a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Grand dome on top */}
        <path d="M22 30c0-8 4.5-16 10-16s10 8 10 16" fill="currentColor" opacity="0.08" />
        <path d="M22 30c0-8 4.5-16 10-16s10 8 10 16" stroke="currentColor" strokeWidth="1.5" />
        {/* Dome ribs */}
        <path d="M27 30c0-6 2.2-12 5-12s5 6 5 12" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        {/* Spire */}
        <line x1="32" y1="14" x2="32" y2="4" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="30,6 34,6 32,2" fill="currentColor" opacity="0.5" />
        {/* Light emanating from spire */}
        <line x1="32" y1="4" x2="26" y2="2" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="32" y1="4" x2="38" y2="2" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="32" y1="4" x2="24" y2="6" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
        <line x1="32" y1="4" x2="40" y2="6" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
        {/* Decorative frieze line */}
        <line x1="16" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="44" x2="16" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="48" y1="44" x2="60" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </>
    )}
  </svg>
);
