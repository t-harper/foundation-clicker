import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GraviticFoundryArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Gravitic Foundry">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Foundry base - heavy industrial */}
    <rect x="12" y="34" width="40" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="12" y="34" width="40" height="18" rx="1" fill="currentColor" opacity="0.06" />

    {/* Gravity manipulation field (floating material) */}
    <rect x="24" y="18" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <rect x="24" y="18" width="16" height="8" rx="1" fill="currentColor" opacity="0.1" />

    {/* Levitation lines */}
    <line x1="28" y1="26" x2="26" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
    <line x1="36" y1="26" x2="38" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
    <line x1="32" y1="26" x2="32" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />

    {/* Gravity emitters on foundry */}
    <circle cx="22" cy="38" r="2" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
    <circle cx="42" cy="38" r="2" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />

    {/* Output chute */}
    <rect x="38" y="46" width="8" height="6" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Second floating material */}
        <rect x="14" y="22" width="8" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <line x1="18" y1="28" x2="18" y2="34" stroke="currentColor" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 1" />
        <rect x="42" y="20" width="10" height="7" rx="0.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <line x1="47" y1="27" x2="47" y2="34" stroke="currentColor" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 1" />
        {/* Cooling system */}
        <rect x="6" y="42" width="6" height="10" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Gravity distortion field */}
        <ellipse cx="32" cy="28" rx="18" ry="10" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        <ellipse cx="32" cy="28" rx="22" ry="14" stroke="currentColor" strokeWidth="0.2" opacity="0.06" />
        {/* Material glow */}
        <rect x="25" y="19" width="14" height="6" rx="1" fill="currentColor" opacity="0.06" />
        {/* Sparks / forging particles */}
        <circle cx="30" cy="32" r="0.6" fill="currentColor" opacity="0.3" />
        <circle cx="35" cy="30" r="0.5" fill="currentColor" opacity="0.25" />
        <circle cx="27" cy="28" r="0.4" fill="currentColor" opacity="0.2" />
      </>
    )}
  </svg>
);
