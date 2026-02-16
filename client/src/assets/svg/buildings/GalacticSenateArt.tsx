import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const GalacticSenateArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Galactic Senate">
    {/* Ground line */}
    <rect x="4" y="56" width="56" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Main senate chamber - domed circular */}
    <ellipse cx="32" cy="56" rx="18" ry="4" fill="currentColor" opacity="0.1" />
    <rect x="14" y="36" width="36" height="20" rx="2" fill="currentColor" opacity="0.1" />
    <rect x="14" y="36" width="36" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    {/* Dome */}
    <path d="M14 36c0-10 8-18 18-18s18 8 18 18" fill="currentColor" opacity="0.08" />
    <path d="M14 36c0-10 8-18 18-18s18 8 18 18" stroke="currentColor" strokeWidth="1.5" />
    {/* Dome ribs */}
    <path d="M22 36c0-7 4.5-13 10-13s10 6 10 13" stroke="currentColor" strokeWidth="0.75" opacity="0.2" fill="none" />
    <line x1="32" y1="18" x2="32" y2="36" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
    {/* Entrance columns */}
    <rect x="18" y="38" width="2" height="18" fill="currentColor" opacity="0.2" />
    <rect x="26" y="38" width="2" height="18" fill="currentColor" opacity="0.2" />
    <rect x="36" y="38" width="2" height="18" fill="currentColor" opacity="0.2" />
    <rect x="44" y="38" width="2" height="18" fill="currentColor" opacity="0.2" />
    {/* Grand entrance */}
    <path d="M28 56v-8a4 4 0 0 1 8 0v8" fill="currentColor" opacity="0.12" />
    <path d="M28 56v-8a4 4 0 0 1 8 0v8" stroke="currentColor" strokeWidth="1" />
    {/* Steps */}
    <rect x="16" y="54" width="32" height="2" fill="currentColor" opacity="0.08" />

    {level >= 2 && (
      <>
        {/* Left annex chamber */}
        <rect x="2" y="42" width="12" height="14" rx="1" fill="currentColor" opacity="0.07" />
        <rect x="2" y="42" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 42c0-5 2.7-9 6-9s6 4 6 9" fill="currentColor" opacity="0.06" />
        <path d="M2 42c0-5 2.7-9 6-9s6 4 6 9" stroke="currentColor" strokeWidth="1" />
        {/* Right annex chamber */}
        <rect x="50" y="42" width="12" height="14" rx="1" fill="currentColor" opacity="0.07" />
        <rect x="50" y="42" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 42c0-5 2.7-9 6-9s6 4 6 9" fill="currentColor" opacity="0.06" />
        <path d="M50 42c0-5 2.7-9 6-9s6 4 6 9" stroke="currentColor" strokeWidth="1" />
        {/* Connecting corridors */}
        <rect x="12" y="46" width="4" height="4" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.75" />
        <rect x="48" y="46" width="4" height="4" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.75" />
        {/* Interior seating arcs (semicircular rows) */}
        <path d="M20 48a12 6 0 0 1 24 0" stroke="currentColor" strokeWidth="0.5" opacity="0.25" fill="none" />
        <path d="M22 46a10 5 0 0 1 20 0" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
        <path d="M24 44a8 4 0 0 1 16 0" stroke="currentColor" strokeWidth="0.5" opacity="0.15" fill="none" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Galaxy-spanning hologram above dome */}
        <ellipse cx="32" cy="14" rx="22" ry="8" stroke="currentColor" strokeWidth="0.75" opacity="0.2" fill="none" />
        <ellipse cx="32" cy="14" rx="22" ry="8" fill="currentColor" opacity="0.03" />
        {/* Spiral galaxy shape */}
        <path d="M22 14c2-4 8-6 12-4s6 6 2 8-10 1-12-2" stroke="currentColor" strokeWidth="0.75" opacity="0.3" fill="none" />
        <path d="M36 12c2 3 0 6-3 6s-5-2-4-4" stroke="currentColor" strokeWidth="0.5" opacity="0.25" fill="none" />
        {/* Galaxy core */}
        <circle cx="32" cy="14" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="32" cy="14" r="1" fill="currentColor" opacity="0.5" />
        {/* Holographic projection beams */}
        <line x1="28" y1="22" x2="24" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="36" y1="22" x2="40" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="32" y1="20" x2="32" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        {/* Star points around galaxy */}
        <circle cx="12" cy="10" r="0.8" fill="currentColor" opacity="0.25" />
        <circle cx="52" cy="10" r="0.8" fill="currentColor" opacity="0.25" />
        <circle cx="18" cy="6" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="46" cy="6" r="0.6" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="4" r="0.5" fill="currentColor" opacity="0.3" />
        <circle cx="8" cy="16" r="0.5" fill="currentColor" opacity="0.15" />
        <circle cx="56" cy="16" r="0.5" fill="currentColor" opacity="0.15" />
        {/* Grand spire atop dome */}
        <line x1="32" y1="18" x2="32" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </>
    )}
  </svg>
);
