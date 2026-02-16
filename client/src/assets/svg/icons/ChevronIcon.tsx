import React from 'react';

interface ChevronIconProps {
  className?: string;
  size?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const rotationMap: Record<string, number> = {
  down: 0,
  left: 90,
  up: 180,
  right: 270,
};

export const ChevronIcon: React.FC<ChevronIconProps> = ({
  className = '',
  size = 24,
  direction = 'down',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label={`chevron ${direction}`}
    style={{ transform: `rotate(${rotationMap[direction]}deg)` }}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
