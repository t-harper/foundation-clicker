import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const SolarArrayArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Solar Array">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Center panel support */}
    <line x1="32" y1="52" x2="32" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

    {/* Main solar panel - angled */}
    <rect x="18" y="26" width="28" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" transform="rotate(-10 32 32)" />
    <rect x="18" y="26" width="28" height="12" rx="1" fill="currentColor" opacity="0.06" transform="rotate(-10 32 32)" />

    {/* Panel grid lines */}
    <line x1="25" y1="26" x2="24" y2="38" stroke="currentColor" strokeWidth="0.4" opacity="0.25" transform="rotate(-10 32 32)" />
    <line x1="32" y1="26" x2="32" y2="38" stroke="currentColor" strokeWidth="0.4" opacity="0.25" transform="rotate(-10 32 32)" />
    <line x1="39" y1="26" x2="40" y2="38" stroke="currentColor" strokeWidth="0.4" opacity="0.25" transform="rotate(-10 32 32)" />
    <line x1="18" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="0.4" opacity="0.25" transform="rotate(-10 32 32)" />

    {/* Base foot */}
    <rect x="28" y="50" width="8" height="2" rx="0.5" fill="currentColor" opacity="0.15" />

    {level >= 2 && (
      <>
        {/* Left smaller panel */}
        <line x1="14" y1="52" x2="14" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <rect x="8" y="32" width="12" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" transform="rotate(-10 14 36)" />
        <rect x="8" y="32" width="12" height="8" rx="0.5" fill="currentColor" opacity="0.04" transform="rotate(-10 14 36)" />
        {/* Right smaller panel */}
        <line x1="50" y1="52" x2="50" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <rect x="44" y="32" width="12" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" transform="rotate(-10 50 36)" />
        <rect x="44" y="32" width="12" height="8" rx="0.5" fill="currentColor" opacity="0.04" transform="rotate(-10 50 36)" />
        {/* Connection wires */}
        <line x1="20" y1="48" x2="28" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
        <line x1="36" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Sun energy lines coming down */}
        <line x1="26" y1="12" x2="28" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="32" y1="10" x2="32" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <line x1="38" y1="12" x2="36" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {/* Energy glow on panel */}
        <rect x="20" y="27" width="24" height="10" rx="1" fill="currentColor" opacity="0.06" transform="rotate(-10 32 32)" />
        {/* Power indicator */}
        <circle cx="32" cy="48" r="1.5" fill="currentColor" opacity="0.35" />
      </>
    )}
  </svg>
);
