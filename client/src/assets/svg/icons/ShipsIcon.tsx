import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ShipsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="ships">
    {/* Main ship body - sleek pointed shape */}
    <path
      d="M2 12L8 8.5V6L12 4L22 12L12 20L8 18V15.5L2 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Cockpit window */}
    <path
      d="M14 10L18 12L14 14"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Upper wing fin */}
    <path
      d="M8 8.5L4 4L10 7"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {/* Lower wing fin */}
    <path
      d="M8 15.5L4 20L10 17"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {/* Engine thrust lines */}
    <path d="M6 11H3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M6 12H1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M6 13H3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    {/* Center line */}
    <path d="M8 12H12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
