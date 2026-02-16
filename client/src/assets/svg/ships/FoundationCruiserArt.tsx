import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const FoundationCruiserArt: React.FC<Props> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Foundation Cruiser ship"
  >
    {/* Main hull - sleek elongated shape */}
    <path
      d="M26 12L32 4L38 12V48H26V12Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Pointed nose */}
    <path
      d="M29 12L32 4L35 12"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Bridge viewport */}
    <ellipse
      cx="32"
      cy="10"
      rx="2"
      ry="3"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="0.75"
    />
    {/* Left shield array - swept wing */}
    <path
      d="M26 20L8 30L8 36L26 32Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right shield array - swept wing */}
    <path
      d="M38 20L56 30L56 36L38 32Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left shield emitter */}
    <circle cx="10" cy="33" r="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.75" />
    {/* Right shield emitter */}
    <circle cx="54" cy="33" r="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.75" />
    {/* Shield lines left */}
    <path d="M12 33C16 28 22 26 26 24" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
    {/* Shield lines right */}
    <path d="M52 33C48 28 42 26 38 24" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
    {/* Hull panel lines */}
    <line x1="26" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
    <line x1="26" y1="28" x2="38" y2="28" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
    <line x1="26" y1="38" x2="38" y2="38" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
    {/* Central spine detail */}
    <line x1="32" y1="14" x2="32" y2="46" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Weapon turret top */}
    <rect x="29" y="16" width="6" height="3" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.75" />
    {/* Weapon turret bottom */}
    <rect x="29" y="36" width="6" height="3" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.75" />
    {/* Triple engine array */}
    <rect x="26" y="48" width="4" height="5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.75" />
    <rect x="30" y="48" width="4" height="5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.75" />
    <rect x="34" y="48" width="4" height="5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.75" />
    {/* Engine glow */}
    <rect x="27" y="53" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    <rect x="31" y="53" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.7" />
    <rect x="35" y="53" width="2" height="2" rx="0.5" fill="currentColor" fillOpacity="0.6" />
    {/* Running lights */}
    <circle cx="26" cy="14" r="0.75" fill="currentColor" fillOpacity="0.8" />
    <circle cx="38" cy="14" r="0.75" fill="currentColor" fillOpacity="0.8" />
    {/* Sensor dish */}
    <line x1="32" y1="4" x2="32" y2="1" stroke="currentColor" strokeWidth="0.75" />
    <path d="M30 2C30 1 34 1 34 2" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.7" />
  </svg>
);
