import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const MissionaryChapelArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Missionary Chapel">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main chapel body */}
    <rect x="18" y="32" width="28" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="18" y="32" width="28" height="20" rx="1" fill="currentColor" opacity="0.06" />

    {/* Peaked roof */}
    <path d="M16 32 L32 18 L48 32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <path d="M16 32 L32 18 L48 32 Z" fill="currentColor" opacity="0.04" />

    {/* Atom symbol on front (religion of science) */}
    <circle cx="32" cy="40" r="4" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <ellipse cx="32" cy="40" rx="4" ry="2" stroke="currentColor" strokeWidth="0.5" opacity="0.25" transform="rotate(60 32 40)" />
    <ellipse cx="32" cy="40" rx="4" ry="2" stroke="currentColor" strokeWidth="0.5" opacity="0.25" transform="rotate(-60 32 40)" />
    <circle cx="32" cy="40" r="1" fill="currentColor" opacity="0.4" />

    {/* Door */}
    <rect x="29" y="46" width="6" height="6" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {/* Spire/steeple */}
    <line x1="32" y1="18" x2="32" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {level >= 2 && (
      <>
        {/* Side alcoves */}
        <rect x="10" y="38" width="8" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <rect x="46" y="38" width="8" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        {/* Windows on sides */}
        <ellipse cx="14" cy="42" rx="2" ry="3" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <ellipse cx="50" cy="42" rx="2" ry="3" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Glowing spire top */}
        <circle cx="32" cy="9" r="2.5" fill="currentColor" opacity="0.15" />
        <circle cx="32" cy="9" r="1.2" fill="currentColor" opacity="0.4" />
        {/* Radiating light from spire */}
        <line x1="32" y1="6" x2="32" y2="3" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
        <line x1="28" y1="8" x2="26" y2="6" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="36" y1="8" x2="38" y2="6" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        {/* Warm glow from windows */}
        <ellipse cx="24" cy="38" rx="2" ry="3" fill="currentColor" opacity="0.08" />
        <ellipse cx="40" cy="38" rx="2" ry="3" fill="currentColor" opacity="0.08" />
      </>
    )}
  </svg>
);
