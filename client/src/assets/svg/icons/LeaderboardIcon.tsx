import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function LeaderboardIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Leaderboard"
    >
      {/* Trophy cup icon */}
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 5H5a1 1 0 0 0-1 1v1a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 5h2a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 13v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 16h6v4H9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
