import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const ShipyardArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Shipyard">
    {/* Ground / platform line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main gantry structure */}
    <rect x="26" y="18" width="12" height="38" fill="currentColor" opacity="0.08" />
    <rect x="26" y="18" width="12" height="38" stroke="currentColor" strokeWidth="1.5" />
    {/* Gantry crane arm */}
    <rect x="16" y="16" width="32" height="4" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="16" y="16" width="32" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Vertical supports */}
    <line x1="18" y1="20" x2="18" y2="56" stroke="currentColor" strokeWidth="1.5" />
    <line x1="46" y1="20" x2="46" y2="56" stroke="currentColor" strokeWidth="1.5" />
    {/* Cross bracing */}
    <line x1="18" y1="20" x2="26" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="46" y1="20" x2="38" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Ship hull being built */}
    <path d="M28 46l4 8 4-8" fill="currentColor" opacity="0.2" />
    <path d="M28 46l4 8 4-8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M29 42l3-4 3 4" fill="currentColor" opacity="0.15" />
    <path d="M29 42l3-4 3 4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    {/* Crane hook */}
    <line x1="32" y1="16" x2="32" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M30 30c0 2 4 2 4 0" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {level >= 2 && (
      <>
        {/* Left bay */}
        <rect x="4" y="26" width="14" height="30" fill="currentColor" opacity="0.06" />
        <rect x="4" y="26" width="14" height="30" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="24" width="14" height="4" rx="1" fill="currentColor" opacity="0.12" />
        <rect x="4" y="24" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
        {/* Left ship silhouette */}
        <path d="M7 48l4 6 4-6" fill="currentColor" opacity="0.15" />
        <path d="M8 44l3-3 3 3" fill="currentColor" opacity="0.1" />
        {/* Right bay */}
        <rect x="46" y="26" width="14" height="30" fill="currentColor" opacity="0.06" />
        <rect x="46" y="26" width="14" height="30" stroke="currentColor" strokeWidth="1.5" />
        <rect x="46" y="24" width="14" height="4" rx="1" fill="currentColor" opacity="0.12" />
        <rect x="46" y="24" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
        {/* Right ship silhouette */}
        <path d="M49 48l4 6 4-6" fill="currentColor" opacity="0.15" />
        <path d="M50 44l3-3 3 3" fill="currentColor" opacity="0.1" />
        {/* Horizontal platform connecting bays */}
        <line x1="4" y1="36" x2="60" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Massive orbital ring */}
        <ellipse cx="32" cy="28" rx="28" ry="8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" fill="none" />
        <ellipse cx="32" cy="28" rx="28" ry="8" fill="currentColor" opacity="0.04" />
        {/* Inner ring */}
        <ellipse cx="32" cy="28" rx="22" ry="5" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        {/* Ring highlights / docking ports */}
        <circle cx="6" cy="30" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="58" cy="30" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="14" cy="22" r="1" fill="currentColor" opacity="0.25" />
        <circle cx="50" cy="22" r="1" fill="currentColor" opacity="0.25" />
        {/* Central beacon */}
        <line x1="32" y1="16" x2="32" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="32" cy="5" r="2" fill="currentColor" opacity="0.4" />
        {/* Construction sparks */}
        <circle cx="22" cy="42" r="0.8" fill="currentColor" opacity="0.5" />
        <circle cx="42" cy="40" r="0.8" fill="currentColor" opacity="0.5" />
        <circle cx="34" cy="34" r="0.6" fill="currentColor" opacity="0.4" />
      </>
    )}
  </svg>
);
