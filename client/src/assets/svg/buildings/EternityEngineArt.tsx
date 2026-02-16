import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const EternityEngineArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Eternity Engine">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Base platform */}
    <rect x="18" y="44" width="28" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="18" y="44" width="28" height="8" rx="1" fill="currentColor" opacity="0.06" />

    {/* Infinity loop / lemniscate shape */}
    <path d="M16 28 Q16 16 26 16 Q32 16 32 24 Q32 16 38 16 Q48 16 48 28 Q48 40 38 40 Q32 40 32 32 Q32 40 26 40 Q16 40 16 28 Z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <path d="M16 28 Q16 16 26 16 Q32 16 32 24 Q32 16 38 16 Q48 16 48 28 Q48 40 38 40 Q32 40 32 32 Q32 40 26 40 Q16 40 16 28 Z" fill="currentColor" opacity="0.04" />

    {/* Central nexus point */}
    <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.25" />
    <circle cx="32" cy="28" r="1.5" fill="currentColor" opacity="0.45" />

    {/* Support pillars */}
    <line x1="26" y1="40" x2="24" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="38" y1="40" x2="40" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Temporal field rings */}
        <circle cx="32" cy="28" r="18" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
        {/* Power conduits */}
        <rect x="6" y="38" width="10" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="16" y1="42" x2="20" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="48" y="38" width="10" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="48" y1="42" x2="44" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full temporal field */}
        <circle cx="32" cy="28" r="24" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
        <circle cx="32" cy="28" r="30" stroke="currentColor" strokeWidth="0.2" opacity="0.04" />
        {/* Eternity glow */}
        <circle cx="32" cy="28" r="5" fill="currentColor" opacity="0.08" />
        {/* Transcendence particles */}
        <circle cx="10" cy="20" r="0.7" fill="currentColor" opacity="0.2" />
        <circle cx="54" cy="22" r="0.6" fill="currentColor" opacity="0.15" />
        <circle cx="32" cy="6" r="0.8" fill="currentColor" opacity="0.18" />
        <circle cx="16" cy="10" r="0.5" fill="currentColor" opacity="0.12" />
        <circle cx="48" cy="10" r="0.5" fill="currentColor" opacity="0.12" />
        {/* Time streams */}
        <path d="M20 22 Q26 18 32 22" stroke="currentColor" strokeWidth="0.3" opacity="0.08" strokeDasharray="1 2" />
        <path d="M32 34 Q38 38 44 34" stroke="currentColor" strokeWidth="0.3" opacity="0.08" strokeDasharray="1 2" />
      </>
    )}
  </svg>
);
