import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GalaxiaCoreArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Galaxia Core">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Base structure */}
    <rect x="20" y="38" width="24" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="20" y="38" width="24" height="14" rx="1" fill="currentColor" opacity="0.06" />

    {/* Central consciousness node */}
    <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="32" cy="24" r="6" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <circle cx="32" cy="24" r="3" fill="currentColor" opacity="0.2" />
    <circle cx="32" cy="24" r="1.5" fill="currentColor" opacity="0.4" />

    {/* Connection to base */}
    <line x1="28" y1="34" x2="26" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <line x1="36" y1="34" x2="38" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Outward consciousness threads */}
    <line x1="22" y1="24" x2="8" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <line x1="42" y1="24" x2="56" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <line x1="32" y1="14" x2="32" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <line x1="24" y1="18" x2="12" y2="10" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
    <line x1="40" y1="18" x2="52" y2="10" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />

    {/* Endpoint nodes */}
    <circle cx="8" cy="18" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="56" cy="18" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="32" cy="4" r="1.5" fill="currentColor" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* More consciousness threads */}
        <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.15" />
        <circle cx="52" cy="10" r="1" fill="currentColor" opacity="0.15" />
        {/* Amplifier wings */}
        <rect x="8" y="40" width="12" height="12" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <rect x="44" y="40" width="12" height="12" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full galactic consciousness field */}
        <circle cx="32" cy="24" r="18" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <circle cx="32" cy="24" r="26" stroke="currentColor" strokeWidth="0.2" opacity="0.04" />
        {/* Pulsing core */}
        <circle cx="32" cy="24" r="8" fill="currentColor" opacity="0.05" />
        {/* Distant consciousness nodes */}
        <circle cx="4" cy="28" r="0.8" fill="currentColor" opacity="0.15" />
        <circle cx="60" cy="28" r="0.8" fill="currentColor" opacity="0.15" />
        <circle cx="18" cy="4" r="0.6" fill="currentColor" opacity="0.12" />
        <circle cx="46" cy="4" r="0.6" fill="currentColor" opacity="0.12" />
      </>
    )}
  </svg>
);
