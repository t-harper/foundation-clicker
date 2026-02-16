import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const FoundationHeadquartersArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Foundation Headquarters">
    {/* Ground */}
    <line x1="2" y1="52" x2="62" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Grand platform */}
    <rect x="6" y="48" width="52" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Main HQ - grand multi-tier */}
    <rect x="14" y="24" width="36" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="24" width="36" height="24" rx="1.5" fill="currentColor" opacity="0.06" />

    {/* Upper tier */}
    <rect x="20" y="16" width="24" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <rect x="20" y="16" width="24" height="8" rx="1" fill="currentColor" opacity="0.04" />

    {/* Crown tier */}
    <rect x="26" y="10" width="12" height="6" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {/* Spire */}
    <line x1="32" y1="10" x2="32" y2="4" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <circle cx="32" cy="3" r="1.5" fill="currentColor" opacity="0.35" />

    {/* Grand columns */}
    <line x1="18" y1="24" x2="18" y2="48" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    <line x1="26" y1="24" x2="26" y2="48" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    <line x1="38" y1="24" x2="38" y2="48" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    <line x1="46" y1="24" x2="46" y2="48" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

    {/* Grand entrance */}
    <path d="M28 48 V40 Q28 37 32 37 Q36 37 36 40 V48" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {level >= 2 && (
      <>
        {/* Left wing */}
        <rect x="2" y="32" width="12" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <line x1="2" y1="32" x2="8" y2="26" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <line x1="8" y1="26" x2="14" y2="32" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        {/* Right wing */}
        <rect x="50" y="32" width="12" height="16" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <line x1="50" y1="32" x2="56" y2="26" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <line x1="56" y1="26" x2="62" y2="32" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Spire beacon */}
        <circle cx="32" cy="3" r="3" fill="currentColor" opacity="0.08" />
        {/* Illuminated facade */}
        <rect x="15" y="25" width="34" height="22" rx="1" fill="currentColor" opacity="0.03" />
        {/* Light beams from spire */}
        <line x1="30" y1="4" x2="26" y2="0" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        <line x1="34" y1="4" x2="38" y2="0" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        {/* Window glow */}
        <rect x="22" y="18" width="4" height="3" rx="0.2" fill="currentColor" opacity="0.08" />
        <rect x="28" y="18" width="4" height="3" rx="0.2" fill="currentColor" opacity="0.08" />
        <rect x="36" y="18" width="4" height="3" rx="0.2" fill="currentColor" opacity="0.08" />
      </>
    )}
  </svg>
);
