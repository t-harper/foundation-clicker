import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const ConsciousnessAmplifierArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Consciousness Amplifier">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Tower base */}
    <rect x="22" y="34" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="22" y="34" width="20" height="18" rx="1" fill="currentColor" opacity="0.06" />

    {/* Tower spire */}
    <path d="M26 34 L32 10 L38 34" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <path d="M26 34 L32 10 L38 34 Z" fill="currentColor" opacity="0.04" />

    {/* Amplifier core */}
    <circle cx="32" cy="24" r="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="32" cy="24" r="1.5" fill="currentColor" opacity="0.35" />

    {/* Consciousness waves expanding */}
    <circle cx="32" cy="24" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <circle cx="32" cy="24" r="14" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />

    {/* Base emitter nodes */}
    <circle cx="26" cy="44" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    <circle cx="38" cy="44" r="2" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Relay stations */}
        <rect x="8" y="40" width="8" height="12" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="16" y1="44" x2="22" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <rect x="48" y="40" width="8" height="12" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="48" y1="44" x2="42" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full consciousness field */}
        <circle cx="32" cy="24" r="22" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
        <circle cx="32" cy="24" r="28" stroke="currentColor" strokeWidth="0.2" opacity="0.04" />
        {/* Peak energy */}
        <line x1="32" y1="10" x2="32" y2="2" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        <circle cx="32" cy="2" r="2" fill="currentColor" opacity="0.15" />
        {/* Thought particles */}
        <circle cx="18" cy="18" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="46" cy="16" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="24" cy="12" r="0.5" fill="currentColor" opacity="0.12" />
        <circle cx="40" cy="10" r="0.7" fill="currentColor" opacity="0.18" />
      </>
    )}
  </svg>
);
