import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const VaultOfKnowledgeArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Vault of Knowledge">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Vault structure - heavy rectangular base */}
    <rect x="14" y="28" width="36" height="28" rx="2" fill="currentColor" opacity="0.12" />
    <rect x="14" y="28" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
    {/* Vault door - large circle */}
    <circle cx="32" cy="44" r="9" fill="currentColor" opacity="0.08" />
    <circle cx="32" cy="44" r="9" stroke="currentColor" strokeWidth="1.5" />
    {/* Inner door ring */}
    <circle cx="32" cy="44" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    {/* Door handle / wheel spokes */}
    <line x1="32" y1="38" x2="32" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="26" y1="44" x2="38" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="28" y1="40" x2="36" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="36" y1="40" x2="28" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Center hub */}
    <circle cx="32" cy="44" r="2" fill="currentColor" opacity="0.4" />
    {/* Heavy lintel */}
    <rect x="12" y="26" width="40" height="4" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="12" y="26" width="40" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />

    {level >= 2 && (
      <>
        {/* Ornate frame - outer border */}
        <rect x="10" y="22" width="44" height="34" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Corner ornaments */}
        <rect x="8" y="20" width="6" height="6" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="8" y="20" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="50" y="20" width="6" height="6" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="50" y="20" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="8" y="50" width="6" height="6" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="8" y="50" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <rect x="50" y="50" width="6" height="6" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="50" y="50" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Decorative lines along top */}
        <line x1="16" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        {/* Side pillars */}
        <rect x="10" y="26" width="4" height="30" fill="currentColor" opacity="0.1" />
        <rect x="50" y="26" width="4" height="30" fill="currentColor" opacity="0.1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Radiating light beams from vault center */}
        <line x1="32" y1="44" x2="4" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="32" y1="44" x2="60" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="32" y1="44" x2="10" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <line x1="32" y1="44" x2="54" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <line x1="32" y1="44" x2="20" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.12" />
        <line x1="32" y1="44" x2="44" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.12" />
        <line x1="32" y1="44" x2="32" y2="4" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        {/* Glow halo around vault door */}
        <circle cx="32" cy="44" r="12" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
        <circle cx="32" cy="44" r="15" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        {/* Sacred symbol above */}
        <polygon points="32,8 29,14 35,14" fill="currentColor" opacity="0.3" />
        <polygon points="32,8 29,14 35,14" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="32" cy="12" r="1" fill="currentColor" opacity="0.5" />
      </>
    )}
  </svg>
);
