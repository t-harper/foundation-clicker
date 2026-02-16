import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const ScoutShipArt: React.FC<Props> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Scout Ship"
  >
    {/* Main fuselage - elongated sleek body */}
    <path
      d="M32 4L36 16L37 40L34 48H30L27 40L28 16L32 4Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Elongated nose cone */}
    <path
      d="M30 16L32 4L34 16"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Cockpit canopy */}
    <ellipse
      cx="32"
      cy="14"
      rx="2.5"
      ry="5"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Cockpit highlight */}
    <ellipse cx="32" cy="13" rx="1.2" ry="3" fill="currentColor" fillOpacity="0.15" />
    {/* Left swept-back wing */}
    <path
      d="M28 24L8 42L10 44L27 36Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right swept-back wing */}
    <path
      d="M36 24L56 42L54 44L37 36Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left wing trailing edge detail */}
    <path
      d="M12 42L18 38"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.5"
    />
    {/* Right wing trailing edge detail */}
    <path
      d="M52 42L46 38"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.5"
    />
    {/* Left winglet / fin */}
    <path
      d="M10 42L7 46L10 44Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Right winglet / fin */}
    <path
      d="M54 42L57 46L54 44Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Dorsal spine */}
    <line x1="32" y1="18" x2="32" y2="40" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
    {/* Body panel lines */}
    <line x1="29" y1="20" x2="29" y2="38" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    <line x1="35" y1="20" x2="35" y2="38" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Single main engine */}
    <path
      d="M30 48L29 52L32 54L35 52L34 48"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Engine glow */}
    <ellipse cx="32" cy="54" rx="2" ry="1.5" fill="currentColor" fillOpacity="0.5" />
    {/* Engine exhaust trail */}
    <ellipse cx="32" cy="57" rx="1.2" ry="2" fill="currentColor" fillOpacity="0.2" />
    {/* Sensor array dots on nose */}
    <circle cx="31" cy="8" r="0.5" fill="currentColor" fillOpacity="0.7" />
    <circle cx="33" cy="8" r="0.5" fill="currentColor" fillOpacity="0.7" />
    <circle cx="32" cy="6" r="0.5" fill="currentColor" fillOpacity="0.7" />
    {/* Navigation lights */}
    <circle cx="9" cy="43" r="0.8" fill="currentColor" fillOpacity="0.8" />
    <circle cx="55" cy="43" r="0.8" fill="currentColor" fillOpacity="0.8" />
    {/* Tail light */}
    <circle cx="32" cy="50" r="0.6" fill="currentColor" fillOpacity="0.9" />
  </svg>
);
