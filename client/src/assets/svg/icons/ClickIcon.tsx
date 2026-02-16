import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ClickIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="click">
    {/* Pointer hand / cursor */}
    <path
      d="M9 3.5V14L12.3 11.2L14.5 17L16.5 16.2L14.3 10.4L18 10.4L9 3.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Click effect - radiating lines */}
    <path d="M4 4L6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M4 10H6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M13 3H13V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    {/* Click ring */}
    <path
      d="M5 1.5C3.5 2.5 2.5 3.5 1.5 5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Small impact dots */}
    <circle cx="2" cy="8" r="0.7" fill="currentColor" />
    <circle cx="8" cy="1" r="0.7" fill="currentColor" />
  </svg>
);
