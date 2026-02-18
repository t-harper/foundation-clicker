import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function StatsIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Statistics"
    >
      <path d="M4 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
