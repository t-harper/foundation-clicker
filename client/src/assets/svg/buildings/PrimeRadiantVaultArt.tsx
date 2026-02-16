import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const PrimeRadiantVaultArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Prime Radiant Vault">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Underground vault outline */}
    <rect x="12" y="28" width="40" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="12" y="28" width="40" height="24" rx="2" fill="currentColor" opacity="0.06" />

    {/* Vault ceiling */}
    <path d="M12 28 Q12 22 32 20 Q52 22 52 28" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <path d="M12 28 Q12 22 32 20 Q52 22 52 28 Z" fill="currentColor" opacity="0.03" />

    {/* Prime Radiant device - floating sphere */}
    <circle cx="32" cy="36" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="32" cy="36" r="3" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
    <circle cx="32" cy="36" r="1" fill="currentColor" opacity="0.5" />

    {/* Mathematical equation traces around device */}
    <path d="M22 34 Q26 30 30 34" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <path d="M34 38 Q38 42 42 38" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Pedestal */}
    <rect x="28" y="44" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <line x1="32" y1="42" x2="32" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Access corridor */}
    <rect x="28" y="48" width="8" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Data display panels on walls */}
        <rect x="14" y="32" width="6" height="10" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <line x1="15" y1="35" x2="19" y2="35" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <line x1="15" y1="37" x2="18" y2="37" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <line x1="15" y1="39" x2="19" y2="39" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <rect x="44" y="32" width="6" height="10" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <line x1="45" y1="35" x2="49" y2="35" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <line x1="45" y1="37" x2="48" y2="37" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <line x1="45" y1="39" x2="49" y2="39" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full holographic Seldon Plan display */}
        <circle cx="32" cy="36" r="10" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        {/* Equation traces floating */}
        <path d="M18 30 L22 32 L20 28" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <path d="M44 32 L42 36 L46 34" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        {/* Core glow */}
        <circle cx="32" cy="36" r="8" fill="currentColor" opacity="0.06" />
        {/* Radiant particles */}
        <circle cx="24" cy="32" r="0.5" fill="currentColor" opacity="0.25" />
        <circle cx="40" cy="34" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="28" cy="28" r="0.4" fill="currentColor" opacity="0.18" />
        <circle cx="36" cy="44" r="0.5" fill="currentColor" opacity="0.15" />
      </>
    )}
  </svg>
);
