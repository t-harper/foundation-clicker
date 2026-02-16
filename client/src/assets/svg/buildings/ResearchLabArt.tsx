import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const ResearchLabArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Research Lab">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main building body */}
    <rect x="18" y="36" width="28" height="20" rx="1" fill="currentColor" opacity="0.12" />
    <rect x="18" y="36" width="28" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Roof */}
    <polygon points="16,36 48,36 46,32 18,32" fill="currentColor" opacity="0.2" />
    <polygon points="16,36 48,36 46,32 18,32" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Antenna mast */}
    <line x1="32" y1="32" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
    <line x1="28" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1" />
    <line x1="29" y1="24" x2="35" y2="24" stroke="currentColor" strokeWidth="1" />
    <circle cx="32" cy="15" r="1.5" fill="currentColor" opacity="0.6" />
    {/* Windows */}
    <rect x="22" y="40" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="30" y="40" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="38" y="40" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
    {/* Door */}
    <rect x="29" y="48" width="6" height="8" rx="0.5" fill="currentColor" opacity="0.2" />
    <rect x="29" y="48" width="6" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" />

    {level >= 2 && (
      <>
        {/* Left wing */}
        <rect x="6" y="42" width="12" height="14" rx="1" fill="currentColor" opacity="0.1" />
        <rect x="6" y="42" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="5,42 19,42 18,39 7,39" fill="currentColor" opacity="0.15" />
        <polygon points="5,42 19,42 18,39 7,39" stroke="currentColor" strokeWidth="1" />
        <rect x="9" y="46" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
        {/* Right wing */}
        <rect x="46" y="42" width="12" height="14" rx="1" fill="currentColor" opacity="0.1" />
        <rect x="46" y="42" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="45,42 59,42 57,39 47,39" fill="currentColor" opacity="0.15" />
        <polygon points="45,42 59,42 57,39 47,39" stroke="currentColor" strokeWidth="1" />
        <rect x="52" y="46" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
        {/* Connecting corridors */}
        <rect x="14" y="48" width="4" height="4" fill="currentColor" opacity="0.08" />
        <rect x="14" y="48" width="4" height="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="46" y="48" width="4" height="4" fill="currentColor" opacity="0.08" />
        <rect x="46" y="48" width="4" height="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Observatory dome */}
        <path d="M24 32c0-7 3.5-13 8-13s8 6 8 13" fill="currentColor" opacity="0.1" />
        <path d="M24 32c0-7 3.5-13 8-13s8 6 8 13" stroke="currentColor" strokeWidth="1.5" />
        {/* Dome slit / telescope */}
        <line x1="32" y1="19" x2="32" y2="26" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        {/* Telescope tube extending */}
        <line x1="32" y1="22" x2="26" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="25" cy="11" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Star / signal indicators */}
        <circle cx="14" cy="10" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="50" cy="8" r="0.8" fill="currentColor" opacity="0.4" />
        <circle cx="8" cy="18" r="0.6" fill="currentColor" opacity="0.3" />
        <circle cx="56" cy="14" r="0.7" fill="currentColor" opacity="0.35" />
        {/* Satellite dish on right wing */}
        <path d="M52 39c-3-2-3-6 0-8" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
        <line x1="52" y1="35" x2="56" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </>
    )}
  </svg>
);
