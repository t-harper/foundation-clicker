import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const CommodityExchangeArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Commodity Exchange">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main exchange building */}
    <rect x="12" y="24" width="40" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="12" y="24" width="40" height="28" rx="1" fill="currentColor" opacity="0.06" />

    {/* Flat modernist roof */}
    <line x1="10" y1="24" x2="54" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />

    {/* Trading chart display */}
    <rect x="18" y="28" width="28" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    {/* Chart line - upward trend */}
    <path d="M20 40 L26 36 L30 38 L36 30 L42 32 L44 28" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Chart grid */}
    <line x1="18" y1="34" x2="46" y2="34" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
    <line x1="32" y1="28" x2="32" y2="42" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />

    {/* Entrance */}
    <rect x="28" y="46" width="8" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Ticker display on sides */}
        <rect x="14" y="44" width="12" height="3" rx="0.3" fill="currentColor" opacity="0.1" />
        <rect x="38" y="44" width="12" height="3" rx="0.3" fill="currentColor" opacity="0.1" />
        {/* Communication dishes on roof */}
        <circle cx="20" cy="22" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <circle cx="44" cy="22" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Holographic price display above roof */}
        <rect x="22" y="14" width="20" height="8" rx="0.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <path d="M24 20 L28 16 L32 18 L36 14 L40 16" stroke="currentColor" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
        {/* Data streams */}
        <line x1="32" y1="24" x2="32" y2="22" stroke="currentColor" strokeWidth="0.4" opacity="0.2" strokeDasharray="1 1" />
        {/* Glow on chart */}
        <rect x="19" y="29" width="26" height="12" rx="0.5" fill="currentColor" opacity="0.05" />
      </>
    )}
  </svg>
);
