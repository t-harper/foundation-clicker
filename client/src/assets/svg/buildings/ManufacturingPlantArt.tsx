import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const ManufacturingPlantArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Manufacturing Plant">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main factory */}
    <rect x="10" y="28" width="34" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="10" y="28" width="34" height="24" rx="1" fill="currentColor" opacity="0.06" />

    {/* Smokestacks */}
    <rect x="14" y="14" width="5" height="14" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <rect x="24" y="18" width="5" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <rect x="34" y="16" width="5" height="12" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {/* Smoke wisps */}
    <path d="M16.5 14 Q15 10 16.5 7" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />
    <path d="M26.5 18 Q25 14 26.5 11" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />
    <path d="M36.5 16 Q35 12 36.5 9" stroke="currentColor" strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />

    {/* Windows row */}
    <rect x="14" y="32" width="3" height="3" rx="0.3" fill="currentColor" opacity="0.15" />
    <rect x="20" y="32" width="3" height="3" rx="0.3" fill="currentColor" opacity="0.15" />
    <rect x="26" y="32" width="3" height="3" rx="0.3" fill="currentColor" opacity="0.15" />
    <rect x="32" y="32" width="3" height="3" rx="0.3" fill="currentColor" opacity="0.15" />

    {/* Loading bay */}
    <rect x="36" y="42" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Warehouse extension */}
        <rect x="44" y="36" width="14" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <rect x="44" y="36" width="14" height="16" rx="0.5" fill="currentColor" opacity="0.03" />
        {/* Conveyor to warehouse */}
        <line x1="44" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        {/* Cargo stacks */}
        <rect x="48" y="44" width="4" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <rect x="48" y="40" width="4" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="54" y="44" width="3" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Powered up stacks */}
        <circle cx="16.5" cy="12" r="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="26.5" cy="16" r="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="36.5" cy="14" r="1.5" fill="currentColor" opacity="0.25" />
        {/* Energy conduit on roof */}
        <line x1="10" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 2" />
        {/* Production glow */}
        <rect x="12" y="38" width="30" height="8" rx="0.5" fill="currentColor" opacity="0.04" />
      </>
    )}
  </svg>
);
