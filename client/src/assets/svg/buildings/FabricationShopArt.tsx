import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const FabricationShopArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Fabrication Shop">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main factory building */}
    <rect x="12" y="28" width="30" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="12" y="28" width="30" height="24" rx="1" fill="currentColor" opacity="0.06" />

    {/* Sawtooth roof */}
    <path d="M12 28 L20 20 L20 28 L28 20 L28 28 L36 20 L36 28 L42 22 L42 28" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {/* Gear symbol on building */}
    <circle cx="27" cy="40" r="5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="27" cy="40" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    {/* Gear teeth */}
    <line x1="27" y1="34" x2="27" y2="35.5" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
    <line x1="27" y1="44.5" x2="27" y2="46" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
    <line x1="21" y1="40" x2="22.5" y2="40" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
    <line x1="31.5" y1="40" x2="33" y2="40" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />

    {/* Loading bay */}
    <rect x="34" y="42" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Output conveyor and products */}
        <line x1="42" y1="48" x2="54" y2="48" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <rect x="46" y="45" width="4" height="3" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        <rect x="52" y="45" width="4" height="3" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        {/* Input side */}
        <rect x="6" y="36" width="6" height="10" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="6" y1="41" x2="12" y2="41" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Robotic arm */}
        <path d="M16 32 L18 36 L22 34" stroke="currentColor" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
        <circle cx="22" cy="34" r="1" fill="currentColor" opacity="0.3" />
        {/* Energy lines on roof */}
        <line x1="20" y1="20" x2="20" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="20" cy="15" r="1" fill="currentColor" opacity="0.3" />
        <line x1="28" y1="20" x2="28" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="28" cy="15" r="1" fill="currentColor" opacity="0.3" />
        {/* Production sparks */}
        <circle cx="35" cy="36" r="0.5" fill="currentColor" opacity="0.3" />
        <circle cx="38" cy="38" r="0.4" fill="currentColor" opacity="0.25" />
      </>
    )}
  </svg>
);
