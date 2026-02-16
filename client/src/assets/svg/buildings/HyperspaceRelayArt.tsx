import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const HyperspaceRelayArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Hyperspace Relay">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Base platform */}
    <rect x="22" y="50" width="20" height="6" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="22" y="50" width="20" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Tower shaft */}
    <rect x="28" y="18" width="8" height="32" fill="currentColor" opacity="0.08" />
    <rect x="28" y="18" width="8" height="32" stroke="currentColor" strokeWidth="1.5" />
    {/* Antenna mast */}
    <line x1="32" y1="18" x2="32" y2="8" stroke="currentColor" strokeWidth="2" />
    {/* Crossbars on antenna */}
    <line x1="28" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="1.5" />
    <line x1="29" y1="16" x2="35" y2="16" stroke="currentColor" strokeWidth="1" />
    {/* Antenna tip */}
    <circle cx="32" cy="7" r="2" fill="currentColor" opacity="0.4" />
    {/* Support struts */}
    <line x1="22" y1="50" x2="28" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="42" y1="50" x2="36" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* Horizontal bands on tower */}
    <line x1="28" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    <line x1="28" y1="38" x2="36" y2="38" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Left dish */}
        <path d="M10 24c0-6 4-10 8-8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none" />
        <path d="M12 22c0-4 2.5-6 5-5" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none" />
        <line x1="18" y1="16" x2="28" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Left dish mount */}
        <circle cx="18" cy="16" r="2" fill="currentColor" opacity="0.25" />
        {/* Right dish */}
        <path d="M54 24c0-6-4-10-8-8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none" />
        <path d="M52 22c0-4-2.5-6-5-5" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none" />
        <line x1="46" y1="16" x2="36" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Right dish mount */}
        <circle cx="46" cy="16" r="2" fill="currentColor" opacity="0.25" />
        {/* Additional array elements */}
        <line x1="24" y1="10" x2="28" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="40" y1="10" x2="36" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="24" cy="10" r="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="10" r="1.5" fill="currentColor" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Energy beacon - concentric signal waves */}
        <circle cx="32" cy="7" r="6" stroke="currentColor" strokeWidth="0.75" opacity="0.35" fill="none" />
        <circle cx="32" cy="7" r="10" stroke="currentColor" strokeWidth="0.75" opacity="0.25" fill="none" />
        <circle cx="32" cy="7" r="14" stroke="currentColor" strokeWidth="0.75" opacity="0.15" fill="none" />
        {/* Vertical energy beam upward */}
        <line x1="32" y1="7" x2="32" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <line x1="30" y1="7" x2="28" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="34" y1="7" x2="36" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        {/* Energy glow on main tip */}
        <circle cx="32" cy="7" r="3.5" fill="currentColor" opacity="0.2" />
        {/* Ambient energy particles */}
        <circle cx="16" cy="6" r="0.8" fill="currentColor" opacity="0.3" />
        <circle cx="48" cy="6" r="0.8" fill="currentColor" opacity="0.3" />
        <circle cx="8" cy="16" r="0.6" fill="currentColor" opacity="0.25" />
        <circle cx="56" cy="16" r="0.6" fill="currentColor" opacity="0.25" />
        {/* Base energy hum */}
        <ellipse cx="32" cy="50" rx="16" ry="2" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
      </>
    )}
  </svg>
);
