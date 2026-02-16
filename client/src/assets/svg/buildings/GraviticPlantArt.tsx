import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GraviticPlantArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Gravitic Plant">
    {/* Ground shadow (structure floats) */}
    <ellipse cx="32" cy="58" rx="16" ry="3" fill="currentColor" opacity="0.15" />

    {/* Floating main structure */}
    <rect x="20" y="28" width="24" height="18" rx="2" fill="currentColor" opacity="0.1" />
    <rect x="20" y="28" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    {/* Upper section - tapered */}
    <polygon points="22,28 42,28 38,20 26,20" fill="currentColor" opacity="0.12" />
    <polygon points="22,28 42,28 38,20 26,20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Central gravity core */}
    <circle cx="32" cy="34" r="5" fill="currentColor" opacity="0.08" />
    <circle cx="32" cy="34" r="5" stroke="currentColor" strokeWidth="1" />
    <circle cx="32" cy="34" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="32" cy="34" r="1.5" fill="currentColor" opacity="0.35" />
    {/* Anti-gravity emitters on bottom */}
    <line x1="24" y1="46" x2="24" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="32" y1="46" x2="32" y2="54" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    <line x1="40" y1="46" x2="40" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Small glow at emitter tips */}
    <circle cx="24" cy="52" r="1" fill="currentColor" opacity="0.25" />
    <circle cx="32" cy="54" r="1.2" fill="currentColor" opacity="0.3" />
    <circle cx="40" cy="52" r="1" fill="currentColor" opacity="0.25" />
    {/* Side panels */}
    <rect x="22" y="30" width="4" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
    <rect x="38" y="30" width="4" height="6" rx="0.5" fill="currentColor" opacity="0.2" />

    {level >= 2 && (
      <>
        {/* Left gravity well */}
        <circle cx="12" cy="38" r="6" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        <circle cx="12" cy="38" r="4" stroke="currentColor" strokeWidth="0.75" opacity="0.25" fill="none" />
        <circle cx="12" cy="38" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="12" cy="38" r="1" fill="currentColor" opacity="0.35" />
        {/* Distortion lines left */}
        <path d="M6 34c2 1 2 3 0 4" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <path d="M18 34c-2 1-2 3 0 4" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {/* Right gravity well */}
        <circle cx="52" cy="38" r="6" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        <circle cx="52" cy="38" r="4" stroke="currentColor" strokeWidth="0.75" opacity="0.25" fill="none" />
        <circle cx="52" cy="38" r="2" fill="currentColor" opacity="0.2" />
        <circle cx="52" cy="38" r="1" fill="currentColor" opacity="0.35" />
        {/* Distortion lines right */}
        <path d="M46 34c2 1 2 3 0 4" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <path d="M58 34c-2 1-2 3 0 4" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        {/* Energy conduits connecting wells to core */}
        <line x1="18" y1="38" x2="20" y2="36" stroke="currentColor" strokeWidth="0.75" opacity="0.3" strokeDasharray="2 1" />
        <line x1="46" y1="38" x2="44" y2="36" stroke="currentColor" strokeWidth="0.75" opacity="0.3" strokeDasharray="2 1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Space-warping effect - curved grid lines */}
        <path d="M4 20c10 6 18 16 28 16s18-10 28-16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" fill="none" />
        <path d="M4 28c10 4 18 12 28 12s18-8 28-12" stroke="currentColor" strokeWidth="0.5" opacity="0.12" fill="none" />
        <path d="M4 44c10-4 18-12 28-12s18 8 28 12" stroke="currentColor" strokeWidth="0.5" opacity="0.12" fill="none" />
        <path d="M4 52c10-6 18-16 28-16s18 10 28 16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" fill="none" />
        {/* Vertical warp lines */}
        <path d="M20 8c0 10 -4 18 -4 28s4 18 4 28" stroke="currentColor" strokeWidth="0.5" opacity="0.1" fill="none" />
        <path d="M44 8c0 10 4 18 4 28s-4 18-4 28" stroke="currentColor" strokeWidth="0.5" opacity="0.1" fill="none" />
        {/* Intensified core glow */}
        <circle cx="32" cy="34" r="8" fill="currentColor" opacity="0.06" />
        <circle cx="32" cy="34" r="12" fill="currentColor" opacity="0.03" />
        {/* Gravitational lensing points */}
        <circle cx="32" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="10" cy="28" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="54" cy="28" r="1" fill="currentColor" opacity="0.2" />
        {/* Floating debris / captured matter */}
        <rect x="14" y="22" width="2" height="2" fill="currentColor" opacity="0.15" transform="rotate(30 15 23)" />
        <rect x="48" y="22" width="2" height="2" fill="currentColor" opacity="0.15" transform="rotate(-20 49 23)" />
        <circle cx="8" cy="46" r="0.8" fill="currentColor" opacity="0.15" />
        <circle cx="56" cy="46" r="0.8" fill="currentColor" opacity="0.15" />
      </>
    )}
  </svg>
);
