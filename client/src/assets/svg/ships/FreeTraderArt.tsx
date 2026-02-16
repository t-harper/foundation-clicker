import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const FreeTraderArt: React.FC<Props> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Free Trader ship"
  >
    {/* Main hull - boxy cargo shape */}
    <path
      d="M22 18L32 8L42 18V44H22V18Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Nose cone */}
    <path
      d="M27 18L32 8L37 18"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Cockpit window */}
    <path
      d="M29 14L32 10L35 14V17H29V14Z"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Cargo bay section - center hull detail */}
    <rect
      x="24"
      y="24"
      width="16"
      height="14"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="2 1"
    />
    {/* Cargo bay divider lines */}
    <line x1="32" y1="24" x2="32" y2="38" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    <line x1="24" y1="31" x2="40" y2="31" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    {/* Left stubby wing */}
    <path
      d="M22 28L12 34L12 40L22 38Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right stubby wing */}
    <path
      d="M42 28L52 34L52 40L42 38Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left wing strut */}
    <line x1="14" y1="36" x2="20" y2="33" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
    {/* Right wing strut */}
    <line x1="50" y1="36" x2="44" y2="33" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
    {/* Engine block left */}
    <rect
      x="23"
      y="44"
      width="6"
      height="6"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Engine block right */}
    <rect
      x="35"
      y="44"
      width="6"
      height="6"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Engine glow left */}
    <rect x="24" y="50" width="4" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    {/* Engine glow right */}
    <rect x="36" y="50" width="4" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    {/* Hull panel lines */}
    <line x1="22" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
    <line x1="22" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
    {/* Side running lights */}
    <circle cx="22" cy="20" r="1" fill="currentColor" fillOpacity="0.7" />
    <circle cx="42" cy="20" r="1" fill="currentColor" fillOpacity="0.7" />
    {/* Antenna */}
    <line x1="32" y1="8" x2="32" y2="4" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="32" cy="3.5" r="0.75" fill="currentColor" fillOpacity="0.8" />
  </svg>
);
