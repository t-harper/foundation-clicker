import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const ShieldGeneratorArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Shield Generator">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Generator base - heavy hexagonal */}
    <rect x="18" y="44" width="28" height="12" rx="2" fill="currentColor" opacity="0.12" />
    <rect x="18" y="44" width="28" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    {/* Generator core housing */}
    <rect x="24" y="34" width="16" height="12" rx="1" fill="currentColor" opacity="0.1" />
    <rect x="24" y="34" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Core */}
    <circle cx="32" cy="40" r="4" fill="currentColor" opacity="0.15" />
    <circle cx="32" cy="40" r="4" stroke="currentColor" strokeWidth="1" />
    <circle cx="32" cy="40" r="2" fill="currentColor" opacity="0.3" />
    {/* Vent lines on base */}
    <line x1="20" y1="48" x2="26" y2="48" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    <line x1="20" y1="51" x2="26" y2="51" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    <line x1="38" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    <line x1="38" y1="51" x2="44" y2="51" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    {/* Antenna / emitter on top */}
    <line x1="32" y1="34" x2="32" y2="26" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="29,28 35,28 32,24" fill="currentColor" opacity="0.2" />
    <polygon points="29,28 35,28 32,24" stroke="currentColor" strokeWidth="1" />

    {level >= 2 && (
      <>
        {/* Energy field - shield arc */}
        <path d="M8 56c0-18 10.7-34 24-34s24 16 24 34" stroke="currentColor" strokeWidth="1.5" opacity="0.25" fill="none" />
        {/* Inner field line */}
        <path d="M14 56c0-14 8-28 18-28s18 14 18 28" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />
        {/* Field shimmer points */}
        <circle cx="12" cy="40" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="52" cy="40" r="1" fill="currentColor" opacity="0.2" />
        <circle cx="18" cy="30" r="0.8" fill="currentColor" opacity="0.25" />
        <circle cx="46" cy="30" r="0.8" fill="currentColor" opacity="0.25" />
        {/* Side emitter pylons */}
        <rect x="6" y="48" width="4" height="8" rx="0.5" fill="currentColor" opacity="0.1" />
        <rect x="6" y="48" width="4" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <line x1="8" y1="48" x2="8" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <rect x="54" y="48" width="4" height="8" rx="0.5" fill="currentColor" opacity="0.1" />
        <rect x="54" y="48" width="4" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <line x1="56" y1="48" x2="56" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full planetary shield dome */}
        <path d="M2 58c0-26 13.4-50 30-50s30 24 30 50" stroke="currentColor" strokeWidth="1.5" opacity="0.2" fill="none" />
        <path d="M2 58c0-26 13.4-50 30-50s30 24 30 50" fill="currentColor" opacity="0.03" />
        {/* Shield hex pattern */}
        <polygon points="32,10 24,16 24,26 32,32 40,26 40,16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" fill="none" />
        <polygon points="20,20 14,24 14,32 20,36 26,32 26,24" stroke="currentColor" strokeWidth="0.5" opacity="0.1" fill="none" />
        <polygon points="44,20 38,24 38,32 44,36 50,32 50,24" stroke="currentColor" strokeWidth="0.5" opacity="0.1" fill="none" />
        {/* Shield energy crackle */}
        <path d="M10 24l3-2-1 4 3-1" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <path d="M54 24l-3-2 1 4-3-1" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        {/* Intense core glow */}
        <circle cx="32" cy="40" r="6" fill="currentColor" opacity="0.1" />
        <circle cx="32" cy="40" r="8" fill="currentColor" opacity="0.05" />
        {/* Top shield apex glow */}
        <circle cx="32" cy="8" r="2" fill="currentColor" opacity="0.25" />
        <circle cx="32" cy="8" r="1" fill="currentColor" opacity="0.4" />
      </>
    )}
  </svg>
);
