import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const TerraformingEngineArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Terraforming Engine">
    {/* Barren ground being transformed */}
    <path d="M4 52 Q20 50 32 52 Q44 54 60 50" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Massive engine structure */}
    <rect x="18" y="20" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="18" y="20" width="28" height="32" rx="2" fill="currentColor" opacity="0.06" />

    {/* Gravity beam projector at top */}
    <path d="M22 20 L32 10 L42 20" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="32" cy="16" r="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="32" cy="16" r="1" fill="currentColor" opacity="0.4" />

    {/* Terrain modification beam (downward) */}
    <path d="M28 52 L26 58 L38 58 L36 52" fill="currentColor" opacity="0.06" />
    <line x1="30" y1="52" x2="28" y2="58" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
    <line x1="34" y1="52" x2="36" y2="58" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />

    {/* Engine intake vents */}
    <rect x="20" y="24" width="4" height="2" rx="0.3" fill="currentColor" opacity="0.15" />
    <rect x="20" y="28" width="4" height="2" rx="0.3" fill="currentColor" opacity="0.15" />
    <rect x="40" y="24" width="4" height="2" rx="0.3" fill="currentColor" opacity="0.15" />
    <rect x="40" y="28" width="4" height="2" rx="0.3" fill="currentColor" opacity="0.15" />

    {/* Processing core */}
    <circle cx="32" cy="36" r="6" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    <circle cx="32" cy="36" r="2" fill="currentColor" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* Left atmospheric processor */}
        <rect x="6" y="30" width="10" height="22" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="11" y1="30" x2="11" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {/* Right material injector */}
        <rect x="48" y="30" width="10" height="22" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="53" y1="30" x2="53" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {/* New vegetation emerging */}
        <line x1="8" y1="52" x2="8" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="8" cy="47" r="1.5" fill="currentColor" opacity="0.06" />
        <line x1="56" y1="50" x2="56" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="56" cy="45" r="1.5" fill="currentColor" opacity="0.06" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Atmospheric glow */}
        <rect x="19" y="21" width="26" height="30" rx="2" fill="currentColor" opacity="0.04" />
        {/* Beam intensity */}
        <line x1="32" y1="52" x2="32" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        {/* Transformation particles */}
        <circle cx="14" cy="48" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="46" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="24" cy="56" r="0.4" fill="currentColor" opacity="0.12" />
        <circle cx="40" cy="58" r="0.5" fill="currentColor" opacity="0.12" />
        {/* Top energy */}
        <circle cx="32" cy="10" r="2" fill="currentColor" opacity="0.08" />
      </>
    )}
  </svg>
);
