import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const SolarianYachtArt: React.FC<Props> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Solarian Yacht ship"
  >
    {/* Main hull - elegant teardrop shape */}
    <path
      d="M32 4C28 4 24 10 24 18V42C24 46 28 50 32 50C36 50 40 46 40 42V18C40 10 36 4 32 4Z"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Inner hull accent */}
    <path
      d="M32 8C29 8 27 12 27 18V38C27 42 29 44 32 44C35 44 37 42 37 38V18C37 12 35 8 32 8Z"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.4"
    />
    {/* Viewport - large organic eye shape */}
    <ellipse
      cx="32"
      cy="14"
      rx="3"
      ry="4"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="0.75"
    />
    {/* Left energy fin - sweeping organic curve */}
    <path
      d="M24 16C18 18 10 26 8 36C8 38 10 38 12 36C16 30 20 24 24 22"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left fin energy veins */}
    <path d="M22 20C18 24 14 30 12 34" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
    <path d="M20 22C16 26 12 32 10 36" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Right energy fin - sweeping organic curve */}
    <path
      d="M40 16C46 18 54 26 56 36C56 38 54 38 52 36C48 30 44 24 40 22"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Right fin energy veins */}
    <path d="M42 20C46 24 50 30 52 34" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
    <path d="M44 22C48 26 52 32 54 36" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Energy nodes on fins */}
    <circle cx="14" cy="30" r="1.5" fill="currentColor" fillOpacity="0.5" />
    <circle cx="50" cy="30" r="1.5" fill="currentColor" fillOpacity="0.5" />
    <circle cx="10" cy="35" r="1" fill="currentColor" fillOpacity="0.4" />
    <circle cx="54" cy="35" r="1" fill="currentColor" fillOpacity="0.4" />
    {/* Hull organic detail lines */}
    <path d="M28 20C28 28 28 36 30 42" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    <path d="M36 20C36 28 36 36 34 42" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Central energy core */}
    <ellipse
      cx="32"
      cy="30"
      rx="2.5"
      ry="3"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.6"
    />
    {/* Energy core inner glow */}
    <ellipse cx="32" cy="30" rx="1" ry="1.5" fill="currentColor" fillOpacity="0.4" />
    {/* Engine - organic exhaust */}
    <ellipse
      cx="32"
      cy="50"
      rx="4"
      ry="2"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="0.75"
    />
    {/* Engine glow */}
    <ellipse cx="32" cy="52" rx="3" ry="2" fill="currentColor" fillOpacity="0.5" />
    <ellipse cx="32" cy="54" rx="2" ry="1.5" fill="currentColor" fillOpacity="0.3" />
    {/* Tip sensor */}
    <circle cx="32" cy="4" r="1" fill="currentColor" fillOpacity="0.6" />
  </svg>
);
