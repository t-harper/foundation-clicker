import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const FreighterDocksArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Freighter Docks">
    {/* Ground / dock platform */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <rect x="6" y="48" width="52" height="4" rx="0.5" fill="currentColor" opacity="0.04" />
    <rect x="6" y="48" width="52" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Docking bay 1 - large */}
    <path d="M12 48 V28 L24 24 V48" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <line x1="12" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {/* Docking bay 2 */}
    <path d="M28 48 V30 L40 26 V48" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <line x1="28" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {/* Ship silhouette in bay 1 */}
    <path d="M14 44 L18 38 L22 44" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <rect x="15" y="44" width="6" height="4" rx="0.3" fill="currentColor" opacity="0.08" />

    {/* Cargo crane */}
    <line x1="44" y1="48" x2="44" y2="20" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="44" y1="20" x2="56" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="50" y1="20" x2="50" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 1" />

    {level >= 2 && (
      <>
        {/* Ship silhouette in bay 2 */}
        <path d="M30 44 L34 36 L38 44" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <rect x="31" y="44" width="6" height="4" rx="0.3" fill="currentColor" opacity="0.08" />
        {/* Control tower */}
        <rect x="50" y="30" width="8" height="18" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <rect x="52" y="32" width="4" height="3" rx="0.2" fill="currentColor" opacity="0.1" />
        <rect x="52" y="37" width="4" height="3" rx="0.2" fill="currentColor" opacity="0.1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Guide lights on dock */}
        <circle cx="10" cy="48" r="0.8" fill="currentColor" opacity="0.4" />
        <circle cx="26" cy="48" r="0.8" fill="currentColor" opacity="0.4" />
        <circle cx="42" cy="48" r="0.8" fill="currentColor" opacity="0.4" />
        {/* Beacon on crane */}
        <circle cx="44" cy="18" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="44" cy="18" r="3" fill="currentColor" opacity="0.08" />
        {/* Tractor beam from crane */}
        <path d="M48 22 L46 32 L52 32 L50 22" fill="currentColor" opacity="0.04" />
      </>
    )}
  </svg>
);
