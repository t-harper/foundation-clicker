import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const CreditsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="credits">
    {/* Outer coin circle */}
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    {/* Inner rim */}
    <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1" />
    {/* Letter C for Credits */}
    <path
      d="M14.5 8.5C13.8 7.9 12.9 7.5 12 7.5C10.1 7.5 8.5 9.1 8.5 11C8.5 11.3 8.5 11.7 8.5 12C8.5 12.3 8.5 12.7 8.5 13C8.5 14.9 10.1 16.5 12 16.5C12.9 16.5 13.8 16.1 14.5 15.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Small decorative dots on the coin rim */}
    <circle cx="12" cy="3" r="0.7" fill="currentColor" />
    <circle cx="12" cy="21" r="0.7" fill="currentColor" />
    <circle cx="3" cy="12" r="0.7" fill="currentColor" />
    <circle cx="21" cy="12" r="0.7" fill="currentColor" />
  </svg>
);
