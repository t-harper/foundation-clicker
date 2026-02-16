import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const PropagandaNetworkArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Propaganda Network">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Central broadcast tower */}
    <line x1="32" y1="52" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    {/* Tower crossbars */}
    <line x1="28" y1="26" x2="36" y2="26" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="29" y1="34" x2="35" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <line x1="30" y1="42" x2="34" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />

    {/* Antenna at top */}
    <circle cx="32" cy="14" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="32" cy="14" r="0.8" fill="currentColor" opacity="0.4" />

    {/* Broadcast waves */}
    <path d="M26 14 Q22 10 18 14" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
    <path d="M38 14 Q42 10 46 14" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />

    {/* Base building */}
    <rect x="22" y="44" width="20" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <rect x="22" y="44" width="20" height="8" rx="0.5" fill="currentColor" opacity="0.06" />

    {level >= 2 && (
      <>
        {/* Network nodes - connected buildings */}
        <circle cx="10" cy="40" r="3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <circle cx="10" cy="40" r="1" fill="currentColor" opacity="0.15" />
        <line x1="13" y1="40" x2="22" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />

        <circle cx="54" cy="38" r="3" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <circle cx="54" cy="38" r="1" fill="currentColor" opacity="0.15" />
        <line x1="51" y1="38" x2="42" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />

        {/* Upper relay */}
        <circle cx="14" cy="24" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <line x1="16" y1="24" x2="28" y2="20" stroke="currentColor" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 2" />
        <circle cx="50" cy="22" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        <line x1="48" y1="22" x2="36" y2="18" stroke="currentColor" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 2" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Full broadcast field */}
        <path d="M22 14 Q16 6 10 14" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        <path d="M42 14 Q48 6 54 14" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        {/* Signal pulse */}
        <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        <circle cx="32" cy="14" r="10" stroke="currentColor" strokeWidth="0.2" opacity="0.06" />
        {/* Tower glow */}
        <line x1="32" y1="16" x2="32" y2="44" stroke="currentColor" strokeWidth="3" opacity="0.03" />
        {/* Node glow */}
        <circle cx="10" cy="40" r="5" fill="currentColor" opacity="0.04" />
        <circle cx="54" cy="38" r="5" fill="currentColor" opacity="0.04" />
      </>
    )}
  </svg>
);
