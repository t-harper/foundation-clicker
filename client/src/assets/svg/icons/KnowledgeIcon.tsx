import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const KnowledgeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="knowledge">
    {/* Left page */}
    <path
      d="M2 4C2 4 5 3 8 3C9.5 3 11 3.3 12 4C13 3.3 14.5 3 16 3C19 3 22 4 22 4V19C22 19 19 18 16 18C14.5 18 13 18.3 12 19C11 18.3 9.5 18 8 18C5 18 2 19 2 19V4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Center spine */}
    <path
      d="M12 4V19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Left page lines */}
    <path d="M5 7H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 10H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 13H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    {/* Right page lines */}
    <path d="M15 7H19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M15 10H19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M15 13H19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
