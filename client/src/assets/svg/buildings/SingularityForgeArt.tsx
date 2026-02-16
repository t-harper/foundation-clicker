import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const SingularityForgeArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Singularity Forge">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Forge containment structure */}
    <rect x="14" y="28" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="28" width="36" height="24" rx="2" fill="currentColor" opacity="0.06" />

    {/* Singularity - black hole center */}
    <circle cx="32" cy="22" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="32" cy="22" r="5" fill="currentColor" opacity="0.2" />
    <circle cx="32" cy="22" r="2" fill="currentColor" opacity="0.4" />

    {/* Accretion disk */}
    <ellipse cx="32" cy="22" rx="12" ry="4" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Containment arms */}
    <line x1="18" y1="28" x2="22" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="46" y1="28" x2="42" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.4" />

    {/* Material output */}
    <rect x="26" y="46" width="12" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Power conduits */}
        <rect x="6" y="36" width="8" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="14" y1="42" x2="18" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="50" y="36" width="8" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="50" y1="42" x2="46" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {/* Additional containment ring */}
        <circle cx="32" cy="22" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Gravitational lensing effect */}
        <ellipse cx="32" cy="22" rx="16" ry="6" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <ellipse cx="32" cy="22" rx="14" ry="10" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
        {/* Hawking radiation */}
        <circle cx="22" cy="16" r="0.6" fill="currentColor" opacity="0.25" />
        <circle cx="42" cy="18" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="26" cy="12" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="38" cy="14" r="0.4" fill="currentColor" opacity="0.18" />
        {/* Core intensity */}
        <circle cx="32" cy="22" r="6" fill="currentColor" opacity="0.06" />
      </>
    )}
  </svg>
);
