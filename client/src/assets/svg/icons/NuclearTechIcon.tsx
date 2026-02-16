import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const NuclearTechIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="nuclear tech">
    {/* Nucleus */}
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    {/* Orbit 1 - horizontal ellipse */}
    <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="currentColor" strokeWidth="1.3" />
    {/* Orbit 2 - tilted ellipse (60 degrees) */}
    <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="currentColor" strokeWidth="1.3" transform="rotate(60 12 12)" />
    {/* Orbit 3 - tilted ellipse (120 degrees) */}
    <ellipse cx="12" cy="12" rx="9.5" ry="4" stroke="currentColor" strokeWidth="1.3" transform="rotate(120 12 12)" />
    {/* Electron 1 */}
    <circle cx="21" cy="12" r="1.2" fill="currentColor" />
    {/* Electron 2 */}
    <circle cx="7.5" cy="19.8" r="1.2" fill="currentColor" />
    {/* Electron 3 */}
    <circle cx="7.5" cy="4.2" r="1.2" fill="currentColor" />
  </svg>
);
