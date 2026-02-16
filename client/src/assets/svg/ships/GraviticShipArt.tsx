import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const GraviticShipArt: React.FC<Props> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Gravitic Ship"
  >
    {/* Outer energy ring - largest */}
    <ellipse
      cx="32"
      cy="36"
      rx="22"
      ry="6"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.25"
      strokeDasharray="3 2"
    />
    {/* Middle energy ring */}
    <ellipse
      cx="32"
      cy="34"
      rx="17"
      ry="4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.35"
      strokeDasharray="4 2"
    />
    {/* Inner energy ring */}
    <ellipse
      cx="32"
      cy="32"
      rx="12"
      ry="3.5"
      fill="currentColor"
      fillOpacity="0.05"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.5"
    />
    {/* Main hull - smooth organic teardrop shape */}
    <path
      d="M32 8C32 8 24 16 22 24C20.5 30 21 34 24 38C27 42 32 44 32 44C32 44 37 42 40 38C43 34 43.5 30 42 24C40 16 32 8 32 8Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Inner hull glow / canopy - organic shape */}
    <path
      d="M32 14C32 14 27 20 26 26C25.2 30 26 33 28 36C30 38.5 32 40 32 40C32 40 34 38.5 36 36C38 33 38.8 30 38 26C37 20 32 14 32 14Z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.4"
    />
    {/* Central consciousness / sensor eye */}
    <ellipse
      cx="32"
      cy="24"
      rx="4"
      ry="5"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Inner eye glow */}
    <ellipse cx="32" cy="24" rx="2" ry="3" fill="currentColor" fillOpacity="0.15" />
    {/* Core light */}
    <circle cx="32" cy="24" r="1" fill="currentColor" fillOpacity="0.6" />
    {/* Organic flowing lines - left */}
    <path
      d="M28 18C26 22 25 28 26 34"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      fill="none"
    />
    {/* Organic flowing lines - right */}
    <path
      d="M36 18C38 22 39 28 38 34"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      fill="none"
    />
    {/* Energy nodes on rings - floating points */}
    <circle cx="14" cy="34" r="1" fill="currentColor" fillOpacity="0.5" />
    <circle cx="50" cy="34" r="1" fill="currentColor" fillOpacity="0.5" />
    <circle cx="19" cy="32" r="0.8" fill="currentColor" fillOpacity="0.6" />
    <circle cx="45" cy="32" r="0.8" fill="currentColor" fillOpacity="0.6" />
    {/* Upper energy wisps */}
    <path
      d="M28 12C24 14 22 18 22 18"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M36 12C40 14 42 18 42 18"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      fill="none"
      strokeLinecap="round"
    />
    {/* Bottom gravitic field emanation */}
    <path
      d="M26 42C28 46 30 48 32 50C34 48 36 46 38 42"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.3"
      fill="none"
      strokeLinecap="round"
    />
    {/* Field glow beneath */}
    <ellipse cx="32" cy="48" rx="4" ry="2" fill="currentColor" fillOpacity="0.15" />
    <ellipse cx="32" cy="52" rx="2.5" ry="1.5" fill="currentColor" fillOpacity="0.08" />
    {/* Subtle energy particles */}
    <circle cx="18" cy="36" r="0.5" fill="currentColor" fillOpacity="0.3" />
    <circle cx="46" cy="36" r="0.5" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="36" r="0.4" fill="currentColor" fillOpacity="0.2" />
    <circle cx="52" cy="36" r="0.4" fill="currentColor" fillOpacity="0.2" />
    <circle cx="32" cy="54" r="0.5" fill="currentColor" fillOpacity="0.15" />
    {/* Top emanation point */}
    <circle cx="32" cy="8" r="0.8" fill="currentColor" fillOpacity="0.4" />
    <circle cx="32" cy="5" r="0.5" fill="currentColor" fillOpacity="0.2" />
  </svg>
);
