import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ResearchIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="research">
    {/* Flask body */}
    <path
      d="M9 3V10L4 19C3.5 20 4.2 21 5.3 21H18.7C19.8 21 20.5 20 20 19L15 10V3"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {/* Flask top */}
    <path d="M8 3H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    {/* Liquid level */}
    <path d="M7 15H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Bubbles */}
    <circle cx="10" cy="17" r="0.8" fill="currentColor" opacity="0.6" />
    <circle cx="13" cy="16" r="0.6" fill="currentColor" opacity="0.4" />
    {/* Star/discovery accent */}
    <path d="M17.5 5L18.3 6.8L20.3 7L18.8 8.3L19.2 10.3L17.5 9.3L15.8 10.3L16.2 8.3L14.7 7L16.7 6.8L17.5 5Z" fill="currentColor" opacity="0.5" />
  </svg>
);
