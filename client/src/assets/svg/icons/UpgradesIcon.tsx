import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const UpgradesIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="upgrades">
    {/* Outer circle */}
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    {/* Upward arrow */}
    <path
      d="M12 17V7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 11L12 6L16 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small sparkle lines */}
    <path d="M18 5L19.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M20 7L21.5 6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M19 9L20.5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
