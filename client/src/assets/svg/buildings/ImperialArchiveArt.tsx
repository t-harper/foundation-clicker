import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const ImperialArchiveArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Imperial Archive">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Crumbling left pillar */}
    <rect x="12" y="28" width="6" height="28" fill="currentColor" opacity="0.12" />
    <rect x="12" y="28" width="6" height="28" stroke="currentColor" strokeWidth="1.5" />
    {/* Broken top of left pillar */}
    <polygon points="12,28 15,24 18,26 18,28" fill="currentColor" opacity="0.15" />
    <polygon points="12,28 15,24 18,26 18,28" stroke="currentColor" strokeWidth="1" />
    {/* Crumbling right pillar */}
    <rect x="46" y="32" width="6" height="24" fill="currentColor" opacity="0.12" />
    <rect x="46" y="32" width="6" height="24" stroke="currentColor" strokeWidth="1.5" />
    {/* Broken top of right pillar - more damaged */}
    <polygon points="46,32 48,28 52,30 52,32" fill="currentColor" opacity="0.15" />
    <polygon points="46,32 48,28 52,30 52,32" stroke="currentColor" strokeWidth="1" />
    {/* Fallen lintel / beam */}
    <rect x="16" y="36" width="32" height="3" rx="0.5" fill="currentColor" opacity="0.1" transform="rotate(-4 32 37)" />
    <rect x="16" y="36" width="32" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" transform="rotate(-4 32 37)" />
    {/* Center pillar stub */}
    <rect x="28" y="38" width="8" height="18" fill="currentColor" opacity="0.1" />
    <rect x="28" y="38" width="8" height="18" stroke="currentColor" strokeWidth="1.5" />
    {/* Rubble pieces */}
    <rect x="20" y="52" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.15" transform="rotate(15 22 54)" />
    <rect x="40" y="53" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.12" transform="rotate(-10 41 54)" />
    <circle cx="24" cy="55" r="1.5" fill="currentColor" opacity="0.1" />
    <circle cx="38" cy="54" r="1" fill="currentColor" opacity="0.1" />

    {level >= 2 && (
      <>
        {/* Restored section - new wall on left */}
        <rect x="6" y="30" width="8" height="26" fill="currentColor" opacity="0.08" />
        <rect x="6" y="30" width="8" height="26" stroke="currentColor" strokeWidth="1.5" />
        {/* Clean top line - restored */}
        <rect x="5" y="28" width="10" height="3" rx="0.5" fill="currentColor" opacity="0.12" />
        <rect x="5" y="28" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
        {/* Restored shelving / archive slots */}
        <line x1="7" y1="35" x2="13" y2="35" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="7" y1="39" x2="13" y2="39" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="7" y1="43" x2="13" y2="43" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="7" y1="47" x2="13" y2="47" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        {/* Restored section - right side */}
        <rect x="50" y="30" width="8" height="26" fill="currentColor" opacity="0.08" />
        <rect x="50" y="30" width="8" height="26" stroke="currentColor" strokeWidth="1.5" />
        <rect x="49" y="28" width="10" height="3" rx="0.5" fill="currentColor" opacity="0.12" />
        <rect x="49" y="28" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <line x1="51" y1="35" x2="57" y2="35" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="51" y1="39" x2="57" y2="39" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="51" y1="43" x2="57" y2="43" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="51" y1="47" x2="57" y2="47" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        {/* Scaffolding hint */}
        <line x1="18" y1="30" x2="18" y2="56" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
        <line x1="46" y1="30" x2="46" y2="56" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Fully restored grand archive - top structure */}
        <rect x="6" y="18" width="52" height="12" rx="1" fill="currentColor" opacity="0.06" />
        <rect x="6" y="18" width="52" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        {/* Grand pediment */}
        <polygon points="4,18 60,18 32,6" fill="currentColor" opacity="0.1" />
        <polygon points="4,18 60,18 32,6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Restored columns */}
        <rect x="20" y="18" width="3" height="38" fill="currentColor" opacity="0.15" />
        <rect x="30" y="18" width="3" height="38" fill="currentColor" opacity="0.15" />
        <rect x="40" y="18" width="3" height="38" fill="currentColor" opacity="0.15" />
        {/* Imperial seal at pediment center */}
        <circle cx="32" cy="13" r="3" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
        <circle cx="32" cy="13" r="1.5" fill="currentColor" opacity="0.35" />
        {/* Archive glow from interior */}
        <rect x="22" y="38" width="8" height="12" fill="currentColor" opacity="0.08" />
        <rect x="34" y="38" width="8" height="12" fill="currentColor" opacity="0.08" />
        {/* Decorative frieze */}
        <line x1="6" y1="22" x2="58" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="6" y1="26" x2="58" y2="26" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}
  </svg>
);
