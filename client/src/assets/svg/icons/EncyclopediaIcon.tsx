import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const EncyclopediaIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="encyclopedia">
    {/* Open book base */}
    <path
      d="M2 5C2 5 5 4 8 4C9.5 4 11 4.3 12 5C13 4.3 14.5 4 16 4C19 4 22 5 22 5V20C22 20 19 19 16 19C14.5 19 13 19.3 12 20C11 19.3 9.5 19 8 19C5 19 2 20 2 20V5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Center spine */}
    <path d="M12 5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Globe on right page */}
    <circle cx="17" cy="10.5" r="3" stroke="currentColor" strokeWidth="1" />
    {/* Globe equator */}
    <ellipse cx="17" cy="10.5" rx="3" ry="1.2" stroke="currentColor" strokeWidth="0.8" />
    {/* Globe meridian */}
    <ellipse cx="17" cy="10.5" rx="1.2" ry="3" stroke="currentColor" strokeWidth="0.8" />
    {/* Text lines on left page */}
    <path d="M5 8H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 10.5H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 13H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 15.5H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    {/* Text below globe */}
    <path d="M15 15H19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M15.5 17H18.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
