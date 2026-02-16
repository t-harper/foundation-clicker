import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const SpeakersSanctumArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Speakers Sanctum">
    {/* Ground */}
    <line x1="4" y1="52" x2="60" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Circular chamber */}
    <ellipse cx="32" cy="42" rx="24" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="32" cy="42" rx="24" ry="10" fill="currentColor" opacity="0.05" />

    {/* Walls */}
    <line x1="8" y1="42" x2="8" y2="26" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="56" y1="42" x2="56" y2="26" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

    {/* Low dome */}
    <path d="M8 26 Q8 18 32 16 Q56 18 56 26" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />

    {/* Inner circle - speakers' table */}
    <ellipse cx="32" cy="40" rx="10" ry="4" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />

    {/* Seated figure positions (dots) */}
    <circle cx="22" cy="40" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="28" cy="37" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="36" cy="37" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="42" cy="40" r="1.5" fill="currentColor" opacity="0.2" />
    <circle cx="32" cy="44" r="1.5" fill="currentColor" opacity="0.2" />

    {/* Central symbol - eye of mind */}
    <ellipse cx="32" cy="30" rx="4" ry="2.5" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <circle cx="32" cy="30" r="1" fill="currentColor" opacity="0.35" />

    {level >= 2 && (
      <>
        {/* Outer seating arc */}
        <ellipse cx="32" cy="42" rx="18" ry="7" stroke="currentColor" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 2" />
        {/* Access corridors */}
        <rect x="28" y="48" width="8" height="4" rx="0.3" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Psychic field visualization */}
        <circle cx="32" cy="36" r="16" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <circle cx="32" cy="36" r="20" stroke="currentColor" strokeWidth="0.2" opacity="0.05" />
        {/* Dome glow */}
        <path d="M12 26 Q12 20 32 18 Q52 20 52 26" fill="currentColor" opacity="0.04" />
        {/* Mind connection lines between speakers */}
        <line x1="22" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="0.3" opacity="0.1" strokeDasharray="1 2" />
        <line x1="28" y1="37" x2="36" y2="37" stroke="currentColor" strokeWidth="0.3" opacity="0.1" strokeDasharray="1 2" />
        {/* Wisdom particles */}
        <circle cx="18" cy="28" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="46" cy="28" r="0.5" fill="currentColor" opacity="0.15" />
      </>
    )}
  </svg>
);
