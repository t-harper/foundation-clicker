import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const AuraManufactoryArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Aura Manufactory">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Factory base */}
    <rect x="16" y="32" width="32" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="16" y="32" width="32" height="20" rx="1" fill="currentColor" opacity="0.06" />

    {/* Aura device core at top */}
    <circle cx="32" cy="28" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <circle cx="32" cy="28" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    <circle cx="32" cy="28" r="1.5" fill="currentColor" opacity="0.4" />

    {/* Concentric aura rings emanating */}
    <circle cx="32" cy="28" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <circle cx="32" cy="28" r="16" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />

    {/* Support pillars */}
    <line x1="24" y1="32" x2="24" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="40" y1="32" x2="40" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Assembly line */}
    <line x1="20" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    {/* Devices on assembly line */}
    <circle cx="26" cy="44" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <circle cx="38" cy="44" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* Left calibration bay */}
        <rect x="6" y="38" width="10" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <circle cx="11" cy="44" r="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="11" cy="44" r="1" fill="currentColor" opacity="0.15" />
        {/* Right packaging area */}
        <rect x="48" y="38" width="10" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <rect x="50" y="42" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
        <rect x="54" y="42" width="3" height="3" rx="0.3" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Intense aura field */}
        <circle cx="32" cy="28" r="20" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
        {/* Core glow */}
        <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.06" />
        {/* Floating energy motes */}
        <circle cx="20" cy="22" r="0.7" fill="currentColor" opacity="0.25" />
        <circle cx="44" cy="22" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="26" cy="16" r="0.6" fill="currentColor" opacity="0.15" />
        <circle cx="38" cy="18" r="0.8" fill="currentColor" opacity="0.2" />
      </>
    )}
  </svg>
);
