import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const ArmedMerchantArt: React.FC<Props> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Armed Merchant ship"
  >
    {/* Main hull - bulky cargo shape */}
    <path
      d="M20 16L32 6L44 16V46H20V16Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Reinforced nose */}
    <path
      d="M25 16L32 6L39 16"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Cockpit window */}
    <path
      d="M28 12L32 7L36 12V15H28V12Z"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Armor plating - horizontal lines */}
    <line x1="20" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    <line x1="20" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    <line x1="20" y1="36" x2="44" y2="36" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    {/* Reinforced cargo bay */}
    <rect
      x="22"
      y="22"
      width="20"
      height="16"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Cargo bay cross-braces */}
    <line x1="22" y1="22" x2="42" y2="38" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    <line x1="42" y1="22" x2="22" y2="38" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Left weapon pod */}
    <rect
      x="10"
      y="22"
      width="8"
      height="12"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left weapon barrel */}
    <line x1="14" y1="22" x2="14" y2="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="14" cy="15" r="1.5" fill="currentColor" fillOpacity="0.5" />
    {/* Right weapon pod */}
    <rect
      x="46"
      y="22"
      width="8"
      height="12"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right weapon barrel */}
    <line x1="50" y1="22" x2="50" y2="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="50" cy="15" r="1.5" fill="currentColor" fillOpacity="0.5" />
    {/* Left wing strut */}
    <path
      d="M20 26L10 28"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.6"
    />
    {/* Right wing strut */}
    <path
      d="M44 26L54 28"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.6"
    />
    {/* Engine block left */}
    <rect
      x="21"
      y="46"
      width="7"
      height="6"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Engine block right */}
    <rect
      x="36"
      y="46"
      width="7"
      height="6"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Engine glow left */}
    <rect x="22" y="52" width="5" height="3" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    {/* Engine glow right */}
    <rect x="37" y="52" width="5" height="3" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    {/* Side running lights */}
    <circle cx="20" cy="18" r="1" fill="currentColor" fillOpacity="0.7" />
    <circle cx="44" cy="18" r="1" fill="currentColor" fillOpacity="0.7" />
    {/* Antenna */}
    <line x1="32" y1="6" x2="32" y2="2" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="32" cy="1.5" r="0.75" fill="currentColor" fillOpacity="0.8" />
  </svg>
);
