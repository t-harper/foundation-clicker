import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ColonyMapIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="colony map">
    {/* Outer ring */}
    <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* Middle ring */}
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    {/* Inner ring */}
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    {/* Center vault dot */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
    {/* Building dots on outer ring */}
    <circle cx="12" cy="1.5" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="21" cy="8" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="18.5" cy="18.5" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="5.5" cy="18.5" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="3" cy="8" r="1" fill="currentColor" opacity="0.5" />
    {/* Building dots on middle ring */}
    <circle cx="12" cy="5" r="0.8" fill="currentColor" opacity="0.6" />
    <circle cx="17" cy="14.5" r="0.8" fill="currentColor" opacity="0.6" />
    <circle cx="7" cy="14.5" r="0.8" fill="currentColor" opacity="0.6" />
  </svg>
);
