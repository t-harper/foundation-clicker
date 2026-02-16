import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const WormholeNexusArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Wormhole Nexus">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Portal ring - large torus shape */}
    <ellipse cx="32" cy="28" rx="20" ry="20" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="32" cy="28" rx="14" ry="14" stroke="currentColor" strokeWidth="1" opacity="0.4" />

    {/* Wormhole vortex inside */}
    <ellipse cx="32" cy="28" rx="10" ry="10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <ellipse cx="32" cy="28" rx="6" ry="6" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
    <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.3" />

    {/* Stabilizer pylons */}
    <rect x="8" y="42" width="6" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="11" y1="42" x2="14" y2="32" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <rect x="50" y="42" width="6" height="10" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="53" y1="42" x2="50" y2="32" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Additional stabilizers */}
        <line x1="32" y1="48" x2="32" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <rect x="28" y="48" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        {/* Energy feed lines */}
        <line x1="14" y1="44" x2="22" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
        <line x1="50" y1="44" x2="42" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Active wormhole swirl */}
        <path d="M22 28 Q26 22 32 20 Q38 22 42 28 Q38 34 32 36 Q26 34 22 28" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        {/* Spatial distortion */}
        <ellipse cx="32" cy="28" rx="22" ry="22" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
        {/* Portal glow */}
        <circle cx="32" cy="28" r="12" fill="currentColor" opacity="0.04" />
        {/* Space-time particles */}
        <circle cx="20" cy="16" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="44" cy="16" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="18" cy="36" r="0.5" fill="currentColor" opacity="0.12" />
        <circle cx="46" cy="36" r="0.6" fill="currentColor" opacity="0.15" />
      </>
    )}
  </svg>
);
