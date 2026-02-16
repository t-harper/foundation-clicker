import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const AchievementsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="achievements">
    {/* Trophy cup */}
    <path
      d="M7 4H17V10C17 13.3 14.8 16 12 16C9.2 16 7 13.3 7 10V4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left handle */}
    <path
      d="M7 6H5C4 6 3 7 3 8.5C3 10 4 11 5 11H7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right handle */}
    <path
      d="M17 6H19C20 6 21 7 21 8.5C21 10 20 11 19 11H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Stem */}
    <path d="M12 16V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Base */}
    <path
      d="M8 19H16V21H8V19Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Star on trophy */}
    <path
      d="M12 7L12.9 9.3L15.3 9.3L13.4 10.7L14.1 13L12 11.6L9.9 13L10.6 10.7L8.7 9.3L11.1 9.3L12 7Z"
      fill="currentColor"
    />
    {/* Top rim */}
    <path d="M7 4H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
