import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const RawMaterialsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="raw materials">
    {/* Main crystal - large faceted shape */}
    <path
      d="M12 2L17 7L19 14L12 22L5 14L7 7L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Top facet lines */}
    <path d="M7 7H17" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    {/* Inner facet - left */}
    <path d="M7 7L12 12L5 14" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    {/* Inner facet - right */}
    <path d="M17 7L12 12L19 14" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    {/* Bottom facet */}
    <path d="M12 12V22" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    {/* Small crystal to the right */}
    <path
      d="M20 4L22 7L20 11L18 7L20 4Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Sparkle */}
    <path d="M3 3L3.5 4.5L5 5L3.5 5.5L3 7L2.5 5.5L1 5L2.5 4.5L3 3Z" fill="currentColor" />
  </svg>
);
