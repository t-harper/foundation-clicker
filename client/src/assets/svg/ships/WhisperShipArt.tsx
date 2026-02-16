import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const WhisperShipArt: React.FC<Props> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Whisper Ship"
  >
    {/* Main armored hull - heavy angular shape */}
    <path
      d="M26 10L32 4L38 10L40 20L42 42L38 50H26L22 42L24 20L26 10Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Armored nose wedge */}
    <path
      d="M28 12L32 4L36 12L34 14H30L28 12Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Bridge / command section */}
    <rect
      x="29"
      y="14"
      width="6"
      height="4"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Bridge viewport */}
    <rect x="30" y="15" width="4" height="2" rx="0.3" fill="currentColor" fillOpacity="0.2" />
    {/* Left heavy wing / weapon pylon */}
    <path
      d="M24 22L10 32L8 30L10 26L22 20Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right heavy wing / weapon pylon */}
    <path
      d="M40 22L54 32L56 30L54 26L42 20Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left weapon hardpoint - forward cannon */}
    <rect
      x="8"
      y="26"
      width="6"
      height="3"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Left cannon barrel */}
    <line x1="9" y1="27.5" x2="5" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Right weapon hardpoint - forward cannon */}
    <rect
      x="50"
      y="26"
      width="6"
      height="3"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Right cannon barrel */}
    <line x1="55" y1="27.5" x2="59" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Lower left weapon hardpoint */}
    <path
      d="M22 36L14 40L14 38L22 34Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Lower left turret */}
    <circle cx="13" cy="39" r="1.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.75" />
    {/* Lower right weapon hardpoint */}
    <path
      d="M42 36L50 40L50 38L42 34Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Lower right turret */}
    <circle cx="51" cy="39" r="1.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.75" />
    {/* Armor plate lines on hull */}
    <line x1="25" y1="20" x2="39" y2="20" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
    <line x1="24" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
    <line x1="23" y1="36" x2="41" y2="36" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
    {/* Center spine armor ridge */}
    <line x1="32" y1="14" x2="32" y2="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    {/* Engine block left */}
    <path
      d="M26 50L24 54L28 56L30 50"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Engine block center */}
    <path
      d="M30 50L30 56L34 56L34 50"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Engine block right */}
    <path
      d="M34 50L36 54L40 56L38 50"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Engine glow */}
    <rect x="25" y="56" width="4" height="2" rx="1" fill="currentColor" fillOpacity="0.5" />
    <rect x="30" y="56" width="4" height="2" rx="1" fill="currentColor" fillOpacity="0.6" />
    <rect x="35" y="56" width="4" height="2" rx="1" fill="currentColor" fillOpacity="0.5" />
    {/* Shield generator dome on top */}
    <ellipse cx="32" cy="22" rx="3" ry="1.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.75" />
    {/* Running lights */}
    <circle cx="24" cy="14" r="0.8" fill="currentColor" fillOpacity="0.8" />
    <circle cx="40" cy="14" r="0.8" fill="currentColor" fillOpacity="0.8" />
    {/* Forward targeting sensor */}
    <circle cx="32" cy="6" r="0.7" fill="currentColor" fillOpacity="0.9" />
  </svg>
);
