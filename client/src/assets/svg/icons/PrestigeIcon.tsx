import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PrestigeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="prestige">
    {/* Central starburst */}
    <path
      d="M12 1L13.8 8.2L21 6.4L15.8 11.6L21 16.8L13.8 15L12 22.2L10.2 15L3 16.8L8.2 11.6L3 6.4L10.2 8.2L12 1Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {/* Inner circle - Seldon Plan symbol */}
    <circle cx="12" cy="11.6" r="3" stroke="currentColor" strokeWidth="1.2" />
    {/* Central dot */}
    <circle cx="12" cy="11.6" r="1" fill="currentColor" />
    {/* Outer radiating lines */}
    <path d="M12 1V3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M21 6.4L18.8 7.7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M21 16.8L18.8 15.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 22.2V19.7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M3 16.8L5.2 15.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M3 6.4L5.2 7.7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
