import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const AtomicForgeArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Atomic Forge">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main forge structure - heavy industrial */}
    <rect x="16" y="26" width="32" height="26" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="16" y="26" width="32" height="26" rx="1" fill="currentColor" opacity="0.06" />

    {/* Forge chimney */}
    <rect x="38" y="12" width="8" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

    {/* Central reactor core */}
    <circle cx="32" cy="38" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <circle cx="32" cy="38" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <circle cx="32" cy="38" r="1.5" fill="currentColor" opacity="0.4" />

    {/* Electron orbits */}
    <ellipse cx="32" cy="38" rx="8" ry="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" transform="rotate(45 32 38)" />
    <ellipse cx="32" cy="38" rx="8" ry="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" transform="rotate(-45 32 38)" />

    {/* Input chute */}
    <path d="M16 34 L10 30 L10 38 L16 34" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Output platform */}
        <rect x="48" y="40" width="10" height="12" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="48" y1="46" x2="58" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {/* Cooling system */}
        <rect x="6" y="42" width="10" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <path d="M9 45 Q11 47 9 49" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <path d="M13 45 Q11 47 13 49" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Energy beam from chimney */}
        <line x1="42" y1="12" x2="42" y2="4" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <circle cx="42" cy="3" r="2" fill="currentColor" opacity="0.15" />
        {/* Core glow */}
        <circle cx="32" cy="38" r="10" fill="currentColor" opacity="0.06" />
        {/* Heat particles */}
        <circle cx="28" cy="30" r="0.6" fill="currentColor" opacity="0.3" />
        <circle cx="36" cy="32" r="0.5" fill="currentColor" opacity="0.25" />
        <circle cx="24" cy="34" r="0.4" fill="currentColor" opacity="0.2" />
      </>
    )}
  </svg>
);
