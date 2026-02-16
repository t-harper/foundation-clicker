import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const FoundationBankArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Foundation Bank">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Steps */}
    <rect x="14" y="48" width="36" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />

    {/* Main building */}
    <rect x="16" y="26" width="32" height="22" rx="0.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="16" y="26" width="32" height="22" rx="0.5" fill="currentColor" opacity="0.06" />

    {/* Classical pediment */}
    <path d="M14 26 L32 16 L50 26" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />

    {/* Columns */}
    <line x1="22" y1="26" x2="22" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="32" y1="26" x2="32" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="42" y1="26" x2="42" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />

    {/* Credit symbol (C with line) */}
    <path d="M35 34 Q31 30 27 34 Q27 38 31 38" stroke="currentColor" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
    <line x1="28" y1="32" x2="34" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
    <line x1="28" y1="36" x2="34" y2="36" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />

    {/* Vault door at base */}
    <circle cx="32" cy="44" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <circle cx="32" cy="44" r="1" fill="currentColor" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* Left secure wing */}
        <rect x="4" y="34" width="12" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="10" y1="38" x2="10" y2="44" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
        {/* Right secure wing */}
        <rect x="48" y="34" width="12" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="54" y1="38" x2="54" y2="44" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Pediment glow */}
        <path d="M18 26 L32 18 L46 26" fill="currentColor" opacity="0.05" />
        {/* Security field */}
        <rect x="15" y="25" width="34" height="24" rx="1" stroke="currentColor" strokeWidth="0.3" opacity="0.15" strokeDasharray="4 2" />
        {/* Beacon on pediment */}
        <circle cx="32" cy="16" r="1.5" fill="currentColor" opacity="0.35" />
        <circle cx="32" cy="16" r="3" fill="currentColor" opacity="0.08" />
      </>
    )}
  </svg>
);
