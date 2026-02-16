import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const MindShieldArrayArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Mind Shield Array">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Central emitter pylon */}
    <rect x="28" y="24" width="8" height="28" rx="0.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="28" y="24" width="8" height="28" rx="0.5" fill="currentColor" opacity="0.06" />

    {/* Emitter top */}
    <path d="M26 24 L32 16 L38 24" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="32" cy="20" r="2" fill="currentColor" opacity="0.25" />

    {/* Shield arc */}
    <path d="M10 42 Q10 10 32 8 Q54 10 54 42" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />

    {/* Side emitters */}
    <rect x="12" y="40" width="6" height="12" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M12 40 L15 36 L18 40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <rect x="46" y="40" width="6" height="12" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M46 40 L49 36 L52 40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {level >= 2 && (
      <>
        {/* Outer emitters */}
        <rect x="4" y="44" width="5" height="8" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
        <path d="M4 44 L6.5 40 L9 44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <rect x="55" y="44" width="5" height="8" rx="0.3" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
        <path d="M55 44 L57.5 40 L60 44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        {/* Connection lines */}
        <line x1="18" y1="46" x2="28" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
        <line x1="46" y1="46" x2="36" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 1" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full shield dome */}
        <path d="M6 48 Q6 4 32 2 Q58 4 58 48" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
        {/* Shield shimmer points */}
        <circle cx="16" cy="20" r="0.8" fill="currentColor" opacity="0.2" />
        <circle cx="48" cy="20" r="0.8" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="6" r="1" fill="currentColor" opacity="0.25" />
        <circle cx="22" cy="12" r="0.6" fill="currentColor" opacity="0.15" />
        <circle cx="42" cy="12" r="0.6" fill="currentColor" opacity="0.15" />
        {/* Central glow */}
        <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.08" />
      </>
    )}
  </svg>
);
