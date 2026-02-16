import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const SurvivalShelterArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Survival Shelter">
    {/* Ground */}
    <line x1="8" y1="52" x2="56" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main quonset hut - arched roof */}
    <path d="M18 52 V40 Q18 28 32 28 Q46 28 46 40 V52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M18 52 V40 Q18 28 32 28 Q46 28 46 40 V52 Z" fill="currentColor" opacity="0.08" />

    {/* Door */}
    <rect x="28" y="42" width="8" height="10" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />

    {/* Ribs on hut */}
    <path d="M24 52 V38 Q24 31 32 31 Q40 31 40 38 V52" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Ventilation pipe */}
    <line x1="38" y1="32" x2="38" y2="24" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <ellipse cx="38" cy="23" rx="2" ry="1" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Left lean-to extension */}
        <path d="M8 52 V44 L18 40 V52" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M8 52 V44 L18 40 V52 Z" fill="currentColor" opacity="0.05" />
        {/* Right storage pod */}
        <path d="M46 52 V42 Q46 38 50 38 Q54 38 54 42 V52" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Cargo crate */}
        <rect x="10" y="47" width="5" height="5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Antenna with blinking light */}
        <line x1="32" y1="28" x2="32" y2="18" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <circle cx="32" cy="17" r="1.5" fill="currentColor" opacity="0.5" />
        {/* Power conduit lines */}
        <line x1="46" y1="44" x2="54" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 1" />
        {/* Light glow from door */}
        <ellipse cx="32" cy="50" rx="6" ry="3" fill="currentColor" opacity="0.06" />
      </>
    )}
  </svg>
);
