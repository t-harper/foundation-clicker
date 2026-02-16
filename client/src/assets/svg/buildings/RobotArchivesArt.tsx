import React from 'react';

interface BuildingArtProps {
  className?: string;
  size?: number;
  level?: 1 | 2 | 3;
}

export const RobotArchivesArt: React.FC<BuildingArtProps> = ({ className = '', size = 64, level = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Robot Archives">
    {/* Ground */}
    <line x1="6" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Main archive structure */}
    <rect x="14" y="22" width="36" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="22" width="36" height="30" rx="2" fill="currentColor" opacity="0.06" />

    {/* Data storage racks (horizontal lines) */}
    <line x1="18" y1="28" x2="46" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="18" y1="33" x2="46" y2="33" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="18" y1="38" x2="46" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="18" y1="43" x2="46" y2="43" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Robot head/eye symbol (R. Daneel) */}
    <circle cx="32" cy="14" r="5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="30" cy="13" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="34" cy="13" r="1.5" fill="currentColor" opacity="0.3" />
    <line x1="29" y1="17" x2="35" y2="17" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Connection to building */}
    <line x1="32" y1="19" x2="32" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

    {/* Status lights on racks */}
    <circle cx="20" cy="30" r="0.7" fill="currentColor" opacity="0.25" />
    <circle cx="20" cy="35" r="0.7" fill="currentColor" opacity="0.25" />
    <circle cx="20" cy="40" r="0.7" fill="currentColor" opacity="0.25" />

    {level >= 2 && (
      <>
        {/* Left data wing */}
        <rect x="4" y="30" width="10" height="22" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="6" y1="36" x2="12" y2="36" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="6" y1="41" x2="12" y2="41" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="6" y1="46" x2="12" y2="46" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        {/* Right data wing */}
        <rect x="50" y="30" width="10" height="22" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="52" y1="36" x2="58" y2="36" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="52" y1="41" x2="58" y2="41" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="52" y1="46" x2="58" y2="46" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      </>
    )}

    {level >= 3 && (
      <>
        {/* Daneel's eyes glow */}
        <circle cx="30" cy="13" r="2.5" fill="currentColor" opacity="0.06" />
        <circle cx="34" cy="13" r="2.5" fill="currentColor" opacity="0.06" />
        {/* Data streams */}
        <line x1="32" y1="22" x2="32" y2="48" stroke="currentColor" strokeWidth="0.3" opacity="0.1" strokeDasharray="1 2" />
        {/* Archive glow */}
        <rect x="16" y="24" width="32" height="26" rx="1" fill="currentColor" opacity="0.03" />
        {/* Floating data particles */}
        <circle cx="24" cy="26" r="0.5" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="31" r="0.4" fill="currentColor" opacity="0.15" />
        <circle cx="36" cy="46" r="0.5" fill="currentColor" opacity="0.18" />
      </>
    )}
  </svg>
);
