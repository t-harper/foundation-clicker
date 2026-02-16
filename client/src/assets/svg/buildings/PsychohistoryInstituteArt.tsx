import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const PsychohistoryInstituteArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Psychohistory Institute">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main building - angular modern design */}
    <rect x="14" y="30" width="36" height="26" rx="1" fill="currentColor" opacity="0.1" />
    <rect x="14" y="30" width="36" height="26" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Sloped modern roof */}
    <polygon points="12,30 52,30 48,24 16,24" fill="currentColor" opacity="0.15" />
    <polygon points="12,30 52,30 48,24 16,24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Equation display window - large central */}
    <rect x="20" y="34" width="24" height="10" rx="1" fill="currentColor" opacity="0.08" />
    <rect x="20" y="34" width="24" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
    {/* Mathematical symbols / equations on window */}
    <path d="M23 37l3 3-3 3" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
    <line x1="28" y1="38" x2="34" y2="38" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    <line x1="28" y1="40" x2="32" y2="40" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    <circle cx="38" cy="39" r="2" stroke="currentColor" strokeWidth="0.75" opacity="0.3" fill="none" />
    <path d="M37 37l2 4" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    {/* Door */}
    <rect x="28" y="48" width="8" height="8" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="28" y="48" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
    {/* Steps */}
    <rect x="26" y="54" width="12" height="2" fill="currentColor" opacity="0.1" />

    {level >= 2 && (
      <>
        {/* Computation array - left wing */}
        <rect x="2" y="36" width="12" height="20" rx="1" fill="currentColor" opacity="0.08" />
        <rect x="2" y="36" width="12" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" />
        {/* Server rack lines */}
        <line x1="4" y1="40" x2="12" y2="40" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="4" y1="43" x2="12" y2="43" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="4" y1="46" x2="12" y2="46" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="4" y1="49" x2="12" y2="49" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        {/* Status lights */}
        <circle cx="5" cy="41.5" r="0.8" fill="currentColor" opacity="0.5" />
        <circle cx="5" cy="44.5" r="0.8" fill="currentColor" opacity="0.4" />
        <circle cx="5" cy="47.5" r="0.8" fill="currentColor" opacity="0.5" />
        {/* Computation array - right wing */}
        <rect x="50" y="36" width="12" height="20" rx="1" fill="currentColor" opacity="0.08" />
        <rect x="50" y="36" width="12" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="52" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="52" y1="43" x2="60" y2="43" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="52" y1="46" x2="60" y2="46" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="52" y1="49" x2="60" y2="49" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <circle cx="59" cy="41.5" r="0.8" fill="currentColor" opacity="0.5" />
        <circle cx="59" cy="44.5" r="0.8" fill="currentColor" opacity="0.4" />
        <circle cx="59" cy="47.5" r="0.8" fill="currentColor" opacity="0.5" />
        {/* Connecting data conduits */}
        <line x1="12" y1="44" x2="14" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="1 1" />
        <line x1="50" y1="44" x2="52" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="1 1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Holographic display projecting upward */}
        <path d="M24 24l8-16 8 16" fill="currentColor" opacity="0.06" />
        <path d="M24 24l8-16 8 16" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Holographic data streams */}
        <line x1="28" y1="20" x2="28" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        <line x1="32" y1="18" x2="32" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <line x1="36" y1="20" x2="36" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        {/* Floating equation symbols */}
        <text x="29" y="16" fontSize="4" fill="currentColor" opacity="0.4" fontFamily="monospace">&#x03A3;</text>
        <text x="33" y="12" fontSize="3" fill="currentColor" opacity="0.3" fontFamily="monospace">&#x03C0;</text>
        {/* Prime radiant glow */}
        <circle cx="32" cy="8" r="3" fill="currentColor" opacity="0.15" />
        <circle cx="32" cy="8" r="2" fill="currentColor" opacity="0.25" />
        <circle cx="32" cy="8" r="1" fill="currentColor" opacity="0.4" />
        {/* Data flow particles */}
        <circle cx="10" cy="32" r="0.6" fill="currentColor" opacity="0.35" />
        <circle cx="54" cy="32" r="0.6" fill="currentColor" opacity="0.35" />
        <circle cx="26" cy="6" r="0.5" fill="currentColor" opacity="0.3" />
        <circle cx="38" cy="6" r="0.5" fill="currentColor" opacity="0.3" />
      </>
    )}
  </svg>
);
