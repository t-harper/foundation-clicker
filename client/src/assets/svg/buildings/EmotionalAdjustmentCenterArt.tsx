import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const EmotionalAdjustmentCenterArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Emotional Adjustment Center">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Serene building - soft curves */}
    <path d="M14 52 V30 Q14 24 32 22 Q50 24 50 30 V52" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <path d="M14 52 V30 Q14 24 32 22 Q50 24 50 30 V52 Z" fill="currentColor" opacity="0.05" />

    {/* Brainwave pattern on facade */}
    <path d="M20 36 Q24 32 28 36 Q32 40 36 36 Q40 32 44 36" stroke="currentColor" strokeWidth="1" opacity="0.35" strokeLinecap="round" />

    {/* Meditation alcove entrance */}
    <path d="M26 52 V44 Q26 40 32 40 Q38 40 38 44 V52" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M26 52 V44 Q26 40 32 40 Q38 40 38 44 V52 Z" fill="currentColor" opacity="0.06" />

    {/* Calming light */}
    <circle cx="32" cy="44" r="2" fill="currentColor" opacity="0.12" />

    {level >= 2 && (
      <>
        {/* Left treatment pod */}
        <path d="M6 52 V40 Q6 36 10 36 Q14 36 14 40" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <circle cx="10" cy="42" r="2" fill="currentColor" opacity="0.06" />
        {/* Right treatment pod */}
        <path d="M58 52 V40 Q58 36 54 36 Q50 36 50 40" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <circle cx="54" cy="42" r="2" fill="currentColor" opacity="0.06" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Psychic emanation waves */}
        <path d="M24 22 Q32 16 40 22" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <path d="M20 20 Q32 12 44 20" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
        <path d="M16 18 Q32 8 48 18" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        {/* Inner glow */}
        <ellipse cx="32" cy="36" rx="14" ry="8" fill="currentColor" opacity="0.04" />
        {/* Calming particles */}
        <circle cx="22" cy="30" r="0.8" fill="currentColor" opacity="0.2" />
        <circle cx="42" cy="28" r="0.6" fill="currentColor" opacity="0.15" />
        <circle cx="32" cy="26" r="0.7" fill="currentColor" opacity="0.18" />
      </>
    )}
  </svg>
);
