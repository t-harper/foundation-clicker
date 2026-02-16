import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const MerchantHubArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Merchant Hub">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main warehouse */}
    <rect x="16" y="32" width="32" height="24" rx="1" fill="currentColor" opacity="0.1" />
    <rect x="16" y="32" width="32" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Warehouse roof - curved/barrel */}
    <path d="M14 32c0-6 8-10 18-10s18 4 18 10" fill="currentColor" opacity="0.1" />
    <path d="M14 32c0-6 8-10 18-10s18 4 18 10" stroke="currentColor" strokeWidth="1.5" />
    {/* Roof ribs */}
    <path d="M24 32c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
    {/* Cargo door */}
    <rect x="24" y="42" width="16" height="14" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="24" y="42" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1" />
    {/* Door segments */}
    <line x1="32" y1="42" x2="32" y2="56" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    <line x1="24" y1="49" x2="40" y2="49" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    {/* Crate by door */}
    <rect x="18" y="50" width="4" height="4" fill="currentColor" opacity="0.2" />
    <rect x="42" y="50" width="4" height="4" fill="currentColor" opacity="0.2" />
    {/* Loading platform */}
    <rect x="22" y="54" width="20" height="2" fill="currentColor" opacity="0.15" />

    {level >= 2 && (
      <>
        {/* Left connected warehouse */}
        <rect x="2" y="38" width="14" height="18" rx="1" fill="currentColor" opacity="0.08" />
        <rect x="2" y="38" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 38c0-4 3.5-7 8-7s8 3 8 7" fill="currentColor" opacity="0.08" />
        <path d="M1 38c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1" />
        <rect x="5" y="46" width="6" height="8" fill="currentColor" opacity="0.12" />
        <rect x="5" y="46" width="6" height="8" stroke="currentColor" strokeWidth="0.75" />
        {/* Right connected warehouse */}
        <rect x="48" y="38" width="14" height="18" rx="1" fill="currentColor" opacity="0.08" />
        <rect x="48" y="38" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M47 38c0-4 3.5-7 8-7s8 3 8 7" fill="currentColor" opacity="0.08" />
        <path d="M47 38c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1" />
        <rect x="52" y="46" width="6" height="8" fill="currentColor" opacity="0.12" />
        <rect x="52" y="46" width="6" height="8" stroke="currentColor" strokeWidth="0.75" />
        {/* Connecting walkways */}
        <rect x="14" y="40" width="4" height="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.75" />
        <rect x="46" y="40" width="4" height="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.75" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Massive complex tower */}
        <rect x="26" y="10" width="12" height="22" rx="1" fill="currentColor" opacity="0.06" />
        <rect x="26" y="10" width="12" height="22" rx="1" stroke="currentColor" strokeWidth="1.5" />
        {/* Tower windows */}
        <rect x="29" y="13" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="33" y="13" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="29" y="18" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="33" y="18" width="2" height="2" fill="currentColor" opacity="0.3" />
        {/* Tower spire */}
        <polygon points="28,10 36,10 32,4" fill="currentColor" opacity="0.15" />
        <polygon points="28,10 36,10 32,4" stroke="currentColor" strokeWidth="1" />
        {/* Signal beacon on top */}
        <circle cx="32" cy="4" r="1.5" fill="currentColor" opacity="0.4" />
        {/* Trade route lines emanating */}
        <line x1="4" y1="10" x2="26" y2="16" stroke="currentColor" strokeWidth="0.75" opacity="0.2" strokeDasharray="2 2" />
        <line x1="60" y1="10" x2="38" y2="16" stroke="currentColor" strokeWidth="0.75" opacity="0.2" strokeDasharray="2 2" />
        <line x1="10" y1="4" x2="28" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.15" strokeDasharray="2 2" />
        <line x1="54" y1="4" x2="36" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.15" strokeDasharray="2 2" />
        {/* Extra crates */}
        <rect x="2" y="52" width="3" height="3" fill="currentColor" opacity="0.2" />
        <rect x="59" y="52" width="3" height="3" fill="currentColor" opacity="0.2" />
      </>
    )}
  </svg>
);
