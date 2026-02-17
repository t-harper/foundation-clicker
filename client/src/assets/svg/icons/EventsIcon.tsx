import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const EventsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="events">
    {/* Scroll body */}
    <path
      d="M6 3C5 3 4 4 4 5V19C4 20 5 21 6 21H18C19 21 20 20 20 19V5C20 4 19 3 18 3H6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Top scroll curl */}
    <path
      d="M4 5C4 4 5 3 6 3H18C19 3 20 4 20 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Text lines */}
    <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Decision star/marker */}
    <circle cx="16.5" cy="16.5" r="2" fill="currentColor" opacity="0.6" />
  </svg>
);
