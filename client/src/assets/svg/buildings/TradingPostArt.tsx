import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const TradingPostArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Trading Post">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Simple booth / stall structure */}
    <rect x="18" y="38" width="28" height="18" rx="1" fill="currentColor" opacity="0.1" />
    <rect x="18" y="38" width="28" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Awning / canopy */}
    <path d="M14 38l4-8h28l4 8" fill="currentColor" opacity="0.15" />
    <path d="M14 38l4-8h28l4 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Awning scallop detail */}
    <path d="M14 38c3-2 5 0 7-1s4 1 7-1 5 1 8-1c3 2 5-1 8 1s4-1 6 1" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Counter / display shelf */}
    <rect x="20" y="44" width="24" height="2" fill="currentColor" opacity="0.25" />
    {/* Goods on display */}
    <rect x="22" y="41" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="27" y="41" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
    <rect x="32" y="41" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="37" y="41" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
    {/* Support posts */}
    <line x1="18" y1="38" x2="18" y2="56" stroke="currentColor" strokeWidth="1.5" />
    <line x1="46" y1="38" x2="46" y2="56" stroke="currentColor" strokeWidth="1.5" />

    {level >= 2 && (
      <>
        {/* Left covered stall */}
        <rect x="4" y="42" width="14" height="14" rx="1" fill="currentColor" opacity="0.08" />
        <rect x="4" y="42" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 42l3-5h12l3 5" fill="currentColor" opacity="0.12" />
        <path d="M2 42l3-5h12l3 5" stroke="currentColor" strokeWidth="1" />
        <rect x="7" y="45" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
        <rect x="12" y="45" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
        {/* Right covered stall */}
        <rect x="46" y="42" width="14" height="14" rx="1" fill="currentColor" opacity="0.08" />
        <rect x="46" y="42" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M44 42l3-5h12l3 5" fill="currentColor" opacity="0.12" />
        <path d="M44 42l3-5h12l3 5" stroke="currentColor" strokeWidth="1" />
        <rect x="49" y="45" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
        <rect x="54" y="45" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
        {/* Overhead banner / sign */}
        <rect x="22" y="28" width="20" height="3" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="22" y="28" width="20" height="3" rx="1" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Grand bazaar arches across top */}
        <path d="M4 42c0-8 6-16 14-16" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M60 42c0-8-6-16-14-16" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        {/* Grand canopy arch */}
        <path d="M4 26c0 0 12-14 28-14s28 14 28 14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Hanging lanterns */}
        <line x1="16" y1="18" x2="16" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <circle cx="16" cy="23" r="1.5" fill="currentColor" opacity="0.35" />
        <line x1="32" y1="12" x2="32" y2="16" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <circle cx="32" cy="17" r="1.5" fill="currentColor" opacity="0.35" />
        <line x1="48" y1="18" x2="48" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <circle cx="48" cy="23" r="1.5" fill="currentColor" opacity="0.35" />
        {/* Decorative flags */}
        <polygon points="24,26 24,20 28,23" fill="currentColor" opacity="0.25" />
        <polygon points="40,26 40,20 36,23" fill="currentColor" opacity="0.25" />
        {/* Crate details below */}
        <rect x="6" y="52" width="4" height="4" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5" />
        <rect x="54" y="52" width="4" height="4" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5" />
      </>
    )}
  </svg>
);
