import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GenericBuildingArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Building">
    {/* Ground */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main structure */}
    <rect x="16" y="28" width="32" height="28" rx="2" fill="currentColor" opacity="0.12" />
    <rect x="16" y="28" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />

    {/* Roof */}
    <path d="M12 28L32 14L52 28" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 28L32 14L52 28" fill="currentColor" opacity="0.08" />

    {/* Door */}
    <rect x="27" y="44" width="10" height="12" rx="1" fill="currentColor" opacity="0.25" />
    <circle cx="35" cy="50" r="1" fill="currentColor" opacity="0.5" />

    {/* Windows */}
    <rect x="20" y="32" width="6" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
    <rect x="38" y="32" width="6" height="6" rx="0.5" fill="currentColor" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* Extra wing left */}
        <rect x="4" y="40" width="12" height="16" rx="1" fill="currentColor" opacity="0.1" />
        <rect x="4" y="40" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="7" y="44" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.2" />
        {/* Extra wing right */}
        <rect x="48" y="40" width="12" height="16" rx="1" fill="currentColor" opacity="0.1" />
        <rect x="48" y="40" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="54" y="44" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Tower/spire */}
        <rect x="28" y="6" width="8" height="8" rx="1" fill="currentColor" opacity="0.15" />
        <rect x="28" y="6" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
        {/* Beacon */}
        <circle cx="32" cy="4" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="32" cy="4" r="1" fill="currentColor" opacity="0.7" />
        {/* Energy lines */}
        <line x1="24" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="20" x2="52" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </>
    )}
  </svg>
);
