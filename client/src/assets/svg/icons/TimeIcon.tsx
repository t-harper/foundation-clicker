import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const TimeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="time">
    {/* Clock face */}
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    {/* Hour hand */}
    <path
      d="M12 6V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Minute hand */}
    <path
      d="M12 12L16 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Center dot */}
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    {/* Hour markers */}
    <path d="M12 3V4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M21 12H19.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 21V19.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M3 12H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
