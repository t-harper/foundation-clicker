import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const CargoWarehouseArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Cargo Warehouse">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main warehouse - barrel/quonset shape */}
    <path d="M12 52 V34 Q12 22 32 22 Q52 22 52 34 V52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M12 52 V34 Q12 22 32 22 Q52 22 52 34 V52 Z" fill="currentColor" opacity="0.05" />

    {/* Rib lines */}
    <path d="M22 52 V32 Q22 24 32 24" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
    <path d="M42 52 V32 Q42 24 32 24" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />

    {/* Large cargo door */}
    <rect x="24" y="36" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <line x1="32" y1="36" x2="32" y2="52" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Stacked containers inside visible through door */}
    <rect x="26" y="42" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="33" y="42" width="5" height="5" rx="0.3" fill="currentColor" opacity="0.1" />
    <rect x="29" y="37" width="6" height="5" rx="0.3" fill="currentColor" opacity="0.08" />

    {level >= 2 && (
      <>
        {/* Left container stack */}
        <rect x="4" y="42" width="7" height="5" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <rect x="4" y="47" width="7" height="5" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <rect x="5" y="37" width="5" height="5" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {/* Right container stack */}
        <rect x="53" y="42" width="7" height="5" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <rect x="53" y="47" width="7" height="5" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        {/* Loading crane arm */}
        <line x1="52" y1="22" x2="58" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="58" y1="16" x2="58" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.25" strokeDasharray="2 1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Inventory scanner beam */}
        <line x1="24" y1="36" x2="40" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="1 2" />
        {/* Status lights on building */}
        <circle cx="18" cy="34" r="1" fill="currentColor" opacity="0.35" />
        <circle cx="46" cy="34" r="1" fill="currentColor" opacity="0.35" />
        {/* Ambient light from interior */}
        <rect x="25" y="37" width="14" height="14" rx="0.5" fill="currentColor" opacity="0.04" />
      </>
    )}
  </svg>
);
