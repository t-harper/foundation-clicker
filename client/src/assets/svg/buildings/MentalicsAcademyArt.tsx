import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const MentalicsAcademyArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Mentalics Academy">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Temple base - stepped platform */}
    <rect x="12" y="52" width="40" height="4" fill="currentColor" opacity="0.1" />
    <rect x="12" y="52" width="40" height="4" stroke="currentColor" strokeWidth="1" />
    <rect x="16" y="48" width="32" height="4" fill="currentColor" opacity="0.08" />
    <rect x="16" y="48" width="32" height="4" stroke="currentColor" strokeWidth="1" />
    {/* Main temple body - tapered/pyramid shape */}
    <polygon points="20,48 44,48 40,24 24,24" fill="currentColor" opacity="0.1" />
    <polygon points="20,48 44,48 40,24 24,24" stroke="currentColor" strokeWidth="1.5" />
    {/* Central eye / mind symbol */}
    <ellipse cx="32" cy="36" rx="6" ry="4" fill="currentColor" opacity="0.08" />
    <ellipse cx="32" cy="36" rx="6" ry="4" stroke="currentColor" strokeWidth="1" />
    <circle cx="32" cy="36" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="32" cy="36" r="1" fill="currentColor" opacity="0.5" />
    {/* Capstone */}
    <polygon points="24,24 40,24 32,16" fill="currentColor" opacity="0.15" />
    <polygon points="24,24 40,24 32,16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Entrance */}
    <rect x="28" y="44" width="8" height="4" rx="1" fill="currentColor" opacity="0.15" />
    <path d="M28 44a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="1" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Left meditation garden */}
        <path d="M4 56c0-4 3-6 6-8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M8 56c0-3 2-5 4-6" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <circle cx="10" cy="46" r="3" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        <circle cx="10" cy="46" r="1" fill="currentColor" opacity="0.25" />
        {/* Left meditation stones */}
        <circle cx="6" cy="54" r="1.5" fill="currentColor" opacity="0.15" />
        <circle cx="10" cy="53" r="1" fill="currentColor" opacity="0.12" />
        {/* Right meditation garden */}
        <path d="M60 56c0-4-3-6-6-8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M56 56c0-3-2-5-4-6" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <circle cx="54" cy="46" r="3" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
        <circle cx="54" cy="46" r="1" fill="currentColor" opacity="0.25" />
        {/* Right meditation stones */}
        <circle cx="58" cy="54" r="1.5" fill="currentColor" opacity="0.15" />
        <circle cx="54" cy="53" r="1" fill="currentColor" opacity="0.12" />
        {/* Zen garden paths */}
        <path d="M12 54c2-1 4 0 6-1s4 0 5 1" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <path d="M42 54c2-1 4 0 6-1s4 0 5 1" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Psychic energy aura - concentric rings around temple */}
        <ellipse cx="32" cy="36" rx="20" ry="14" stroke="currentColor" strokeWidth="0.75" opacity="0.15" fill="none" />
        <ellipse cx="32" cy="36" rx="16" ry="10" stroke="currentColor" strokeWidth="0.75" opacity="0.2" fill="none" />
        <ellipse cx="32" cy="36" rx="12" ry="7" stroke="currentColor" strokeWidth="0.75" opacity="0.25" fill="none" />
        {/* Energy rising from capstone */}
        <line x1="32" y1="16" x2="32" y2="4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="30" y1="14" x2="26" y2="4" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        <line x1="34" y1="14" x2="38" y2="4" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        {/* Third eye / crown beacon */}
        <circle cx="32" cy="4" r="2.5" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="4" r="1.5" fill="currentColor" opacity="0.35" />
        {/* Floating psychic particles */}
        <circle cx="16" cy="20" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="48" cy="20" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="8" cy="30" r="0.8" fill="currentColor" opacity="0.25" />
        <circle cx="56" cy="30" r="0.8" fill="currentColor" opacity="0.25" />
        <circle cx="22" cy="10" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="42" cy="10" r="0.6" fill="currentColor" opacity="0.2" />
      </>
    )}
  </svg>
);
