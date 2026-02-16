import React from 'react';

interface AdminIconProps {
  className?: string;
  size?: number;
}

export function AdminIcon({ className = '', size = 24 }: AdminIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Admin"
    >
      <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7l-9-5z" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
