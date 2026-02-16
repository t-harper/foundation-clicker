import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BuildingsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="buildings">
    {/* Main building */}
    <path
      d="M3 21V6L10 3V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Second building */}
    <path
      d="M10 21V8H18V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Tower / antenna */}
    <path
      d="M18 21V5H21V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Antenna on tower */}
    <path d="M19.5 5V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="19.5" cy="1.5" r="0.7" fill="currentColor" />
    {/* Ground line */}
    <path d="M1 21H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Windows - main building */}
    <rect x="5" y="8" width="1.8" height="2" rx="0.3" fill="currentColor" />
    <rect x="5" y="12" width="1.8" height="2" rx="0.3" fill="currentColor" />
    <rect x="5" y="16" width="1.8" height="2" rx="0.3" fill="currentColor" />
    {/* Windows - second building */}
    <rect x="12" y="10.5" width="1.8" height="2" rx="0.3" fill="currentColor" />
    <rect x="15" y="10.5" width="1.8" height="2" rx="0.3" fill="currentColor" />
    <rect x="12" y="14.5" width="1.8" height="2" rx="0.3" fill="currentColor" />
    <rect x="15" y="14.5" width="1.8" height="2" rx="0.3" fill="currentColor" />
    {/* Door */}
    <rect x="13" y="18" width="2.5" height="3" rx="0.3" fill="currentColor" />
  </svg>
);
