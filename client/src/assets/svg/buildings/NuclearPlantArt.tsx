import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const NuclearPlantArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Nuclear Plant">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main reactor dome */}
    <path d="M22 56V36c0-1 0.5-2 1.5-2h17c1 0 1.5 1 1.5 2v20" fill="currentColor" opacity="0.15" />
    <path d="M22 56V36c0-1 0.5-2 1.5-2h17c1 0 1.5 1 1.5 2v20" stroke="currentColor" strokeWidth="1.5" />
    {/* Dome top */}
    <ellipse cx="32" cy="34" rx="10.5" ry="8" fill="currentColor" opacity="0.1" />
    <path d="M21.5 34c0-5.5 4.7-10 10.5-10s10.5 4.5 10.5 10" stroke="currentColor" strokeWidth="1.5" />
    {/* Reactor core glow */}
    <circle cx="32" cy="42" r="5" fill="currentColor" opacity="0.25" />
    <circle cx="32" cy="42" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="32" cy="42" r="1.5" fill="currentColor" opacity="0.6" />
    {/* Window slits */}
    <rect x="26" y="44" width="2" height="6" rx="0.5" fill="currentColor" opacity="0.3" />
    <rect x="36" y="44" width="2" height="6" rx="0.5" fill="currentColor" opacity="0.3" />

    {level >= 2 && (
      <>
        {/* Left cooling tower */}
        <path d="M6 56V42c0 0 0-4 4-4h2c4 0 4 4 4 4v14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 56V42c0 0 0-4 4-4h2c4 0 4 4 4 4v14" fill="currentColor" opacity="0.1" />
        {/* Steam from left tower */}
        <path d="M10 38c-1-3 0-5 1-7" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        <path d="M12 38c1-3 0-5-1-7" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        {/* Right cooling tower */}
        <path d="M48 56V42c0 0 0-4 4-4h2c4 0 4 4 4 4v14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M48 56V42c0 0 0-4 4-4h2c4 0 4 4 4 4v14" fill="currentColor" opacity="0.1" />
        {/* Steam from right tower */}
        <path d="M52 38c-1-3 0-5 1-7" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        <path d="M54 38c1-3 0-5-1-7" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        {/* Pipe connections */}
        <line x1="16" y1="50" x2="22" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="42" y1="50" x2="48" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Energy ring 1 */}
        <ellipse cx="32" cy="30" rx="18" ry="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Energy ring 2 */}
        <ellipse cx="32" cy="26" rx="14" ry="2.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        {/* Energy ring 3 */}
        <ellipse cx="32" cy="22" rx="10" ry="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Top energy beacon */}
        <line x1="32" y1="20" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <circle cx="32" cy="7" r="2.5" fill="currentColor" opacity="0.5" />
        <circle cx="32" cy="7" r="1.5" fill="currentColor" opacity="0.7" />
        {/* Radiating energy particles */}
        <circle cx="18" cy="28" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="46" cy="28" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="24" cy="22" r="0.8" fill="currentColor" opacity="0.3" />
        <circle cx="40" cy="22" r="0.8" fill="currentColor" opacity="0.3" />
      </>
    )}
  </svg>
);
