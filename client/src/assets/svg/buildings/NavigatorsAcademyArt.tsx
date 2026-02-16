import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const NavigatorsAcademyArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Navigators Academy">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main building */}
    <rect x="14" y="30" width="36" height="22" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="30" width="36" height="22" rx="1" fill="currentColor" opacity="0.06" />

    {/* Observatory dome on roof */}
    <path d="M24 30 Q24 20 32 18 Q40 20 40 30" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <path d="M24 30 Q24 20 32 18 Q40 20 40 30 Z" fill="currentColor" opacity="0.04" />

    {/* Compass rose / star chart symbol */}
    <circle cx="32" cy="40" r="6" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    {/* Cardinal points */}
    <line x1="32" y1="33" x2="32" y2="35" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="32" y1="45" x2="32" y2="47" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="25" y1="40" x2="27" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="37" y1="40" x2="39" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    {/* Diagonal points */}
    <line x1="27.5" y1="35.5" x2="28.5" y2="36.5" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="36.5" y1="35.5" x2="35.5" y2="36.5" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="27.5" y1="44.5" x2="28.5" y2="43.5" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    <line x1="36.5" y1="44.5" x2="35.5" y2="43.5" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

    {/* Entrance */}
    <rect x="29" y="48" width="6" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />

    {level >= 2 && (
      <>
        {/* Left wing - classroom */}
        <rect x="4" y="36" width="10" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <rect x="6" y="38" width="2" height="2" rx="0.2" fill="currentColor" opacity="0.1" />
        <rect x="6" y="42" width="2" height="2" rx="0.2" fill="currentColor" opacity="0.1" />
        {/* Right wing - simulation room */}
        <rect x="50" y="36" width="10" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <circle cx="55" cy="44" r="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Star chart hologram above dome */}
        <circle cx="28" cy="12" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="36" cy="10" r="0.8" fill="currentColor" opacity="0.25" />
        <circle cx="32" cy="8" r="1.2" fill="currentColor" opacity="0.35" />
        <circle cx="25" cy="8" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="39" cy="14" r="0.7" fill="currentColor" opacity="0.2" />
        {/* Connecting star lines */}
        <line x1="28" y1="12" x2="32" y2="8" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <line x1="32" y1="8" x2="36" y2="10" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        {/* Dome glow */}
        <path d="M26 30 Q26 22 32 20 Q38 22 38 30" fill="currentColor" opacity="0.05" />
      </>
    )}
  </svg>
);
