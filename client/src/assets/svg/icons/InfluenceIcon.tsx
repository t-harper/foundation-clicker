import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const InfluenceIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="influence">
    {/* Central mind dot */}
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    {/* Inner wave ring */}
    <path
      d="M12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="2.5 2.5"
    />
    {/* Middle wave ring */}
    <path
      d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="3.5 2.5"
    />
    {/* Outer wave ring */}
    <path
      d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12C1.5 17.8 6.2 22.5 12 22.5C17.8 22.5 22.5 17.8 22.5 12C22.5 6.2 17.8 1.5 12 1.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="4 3"
    />
    {/* Radiating lines from center */}
    <path d="M12 9.5V5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M14.1 10.2L17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M9.9 10.2L7 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M14.1 13.8L17 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M9.9 13.8L7 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 14.5V18.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
