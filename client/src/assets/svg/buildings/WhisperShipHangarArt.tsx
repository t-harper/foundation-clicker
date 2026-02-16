import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const WhisperShipHangarArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Whisper Ship Hangar">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Concealed hangar - recessed into ground */}
    <path d="M10 52 V38 L14 34 L50 34 L54 38 V52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M10 52 V38 L14 34 L50 34 L54 38 V52 Z" fill="currentColor" opacity="0.06" />

    {/* Blast doors */}
    <line x1="32" y1="34" x2="32" y2="52" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="14" y1="34" x2="50" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />

    {/* Stealth ship silhouette inside */}
    <path d="M22 44 L32 38 L42 44" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <path d="M24 44 L32 40 L40 44 Z" fill="currentColor" opacity="0.06" />
    {/* Ship wings */}
    <line x1="26" y1="43" x2="20" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="38" y1="43" x2="44" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Camouflage surface pattern (roof) */}
    <line x1="10" y1="34" x2="6" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    <line x1="54" y1="34" x2="58" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />

    {level >= 2 && (
      <>
        {/* Second hangar bay */}
        <rect x="6" y="44" width="8" height="8" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <path d="M8 48 L10 46 L12 48" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        {/* Maintenance area */}
        <rect x="50" y="44" width="8" height="8" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        {/* Concealment overhead */}
        <path d="M8 34 Q32 30 56 34" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Stealth field shimmer */}
        <rect x="12" y="35" width="40" height="16" rx="0.5" fill="currentColor" opacity="0.03" />
        {/* Covert landing lights (dim) */}
        <circle cx="18" cy="52" r="0.6" fill="currentColor" opacity="0.25" />
        <circle cx="32" cy="52" r="0.6" fill="currentColor" opacity="0.25" />
        <circle cx="46" cy="52" r="0.6" fill="currentColor" opacity="0.25" />
        {/* Ship engine glow */}
        <circle cx="32" cy="44" r="2" fill="currentColor" opacity="0.08" />
        {/* Scanning beam */}
        <line x1="32" y1="34" x2="32" y2="28" stroke="currentColor" strokeWidth="0.4" opacity="0.15" strokeDasharray="1 2" />
      </>
    )}
  </svg>
);
