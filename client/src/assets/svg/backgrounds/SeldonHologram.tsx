import React from 'react';

interface Props {
  className?: string;
  animated?: boolean;
}

export const SeldonHologram: React.FC<Props> = ({ className = '', animated = true }) => (
  <svg
    width="200"
    height="320"
    viewBox="0 0 200 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Hari Seldon hologram"
  >
    <defs>
      {/* Holographic glow gradient */}
      <radialGradient id="seldon-glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
        <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
      </radialGradient>

      {/* Scanline pattern */}
      <pattern id="seldon-scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="4" y2="0" stroke="#60a5fa" strokeWidth="0.5" opacity="0.15" />
      </pattern>

      {/* Figure clip path */}
      <clipPath id="seldon-clip">
        <ellipse cx="100" cy="160" rx="60" ry="140" />
      </clipPath>
    </defs>

    {/* Background glow */}
    <ellipse cx="100" cy="160" rx="80" ry="150" fill="url(#seldon-glow)" />

    {/* Holographic base platform */}
    <ellipse
      cx="100"
      cy="295"
      rx="55"
      ry="8"
      fill="#3b82f6"
      opacity="0.25"
      className={animated ? 'seldon-base-pulse' : ''}
    />

    {/* Figure group with scanline overlay */}
    <g className={animated ? 'seldon-flicker' : ''} opacity="0.85">
      {/* Head */}
      <ellipse cx="100" cy="55" rx="18" ry="22" stroke="#60a5fa" strokeWidth="1.2" opacity="0.7" />
      {/* Eye line */}
      <line x1="90" y1="50" x2="95" y2="50" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
      <line x1="105" y1="50" x2="110" y2="50" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />

      {/* Neck */}
      <line x1="100" y1="77" x2="100" y2="90" stroke="#60a5fa" strokeWidth="1.2" opacity="0.6" />

      {/* Shoulders and torso */}
      <path
        d="M100 90 L70 105 L70 170 L85 180 L100 200 L115 180 L130 170 L130 105 Z"
        stroke="#60a5fa"
        strokeWidth="1.2"
        fill="#3b82f6"
        fillOpacity="0.08"
        opacity="0.7"
      />

      {/* Robe fold lines */}
      <line x1="85" y1="110" x2="88" y2="170" stroke="#60a5fa" strokeWidth="0.6" opacity="0.4" />
      <line x1="100" y1="100" x2="100" y2="195" stroke="#60a5fa" strokeWidth="0.6" opacity="0.4" />
      <line x1="115" y1="110" x2="112" y2="170" stroke="#60a5fa" strokeWidth="0.6" opacity="0.4" />

      {/* Left arm - raised gesturing */}
      <path
        d="M70 105 L50 130 L45 125"
        stroke="#60a5fa"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Right arm - resting */}
      <path
        d="M130 105 L145 140 L140 145"
        stroke="#60a5fa"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Lower robe / legs */}
      <path
        d="M85 180 L80 280 L90 285 L100 200 L110 285 L120 280 L115 180"
        stroke="#60a5fa"
        strokeWidth="1.2"
        fill="#3b82f6"
        fillOpacity="0.05"
        opacity="0.6"
      />

      {/* Robe bottom hem */}
      <path
        d="M75 280 L80 285 L90 288 L100 290 L110 288 L120 285 L125 280"
        stroke="#60a5fa"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </g>

    {/* Scanline overlay */}
    <rect
      x="20"
      y="20"
      width="160"
      height="280"
      fill="url(#seldon-scanlines)"
      clipPath="url(#seldon-clip)"
      className={animated ? 'seldon-scan-drift' : ''}
    />

    {/* Noise / interference lines */}
    {animated && (
      <g className="seldon-interference">
        <line x1="40" y1="120" x2="160" y2="120" stroke="#93c5fd" strokeWidth="0.8" opacity="0" />
        <line x1="30" y1="200" x2="170" y2="200" stroke="#93c5fd" strokeWidth="0.5" opacity="0" />
        <line x1="50" y1="70" x2="150" y2="70" stroke="#93c5fd" strokeWidth="0.6" opacity="0" />
      </g>
    )}

    {/* CSS animations via style element */}
    <style>{`
      .seldon-flicker {
        animation: seldon-flicker-anim 4s ease-in-out infinite;
      }

      .seldon-base-pulse {
        animation: seldon-base-anim 3s ease-in-out infinite;
      }

      .seldon-scan-drift {
        animation: seldon-scan-anim 6s linear infinite;
      }

      .seldon-interference line {
        animation: seldon-glitch-anim 8s step-end infinite;
      }

      .seldon-interference line:nth-child(2) {
        animation-delay: 3s;
      }

      .seldon-interference line:nth-child(3) {
        animation-delay: 5.5s;
      }

      @keyframes seldon-flicker-anim {
        0%, 100% { opacity: 0.85; }
        5% { opacity: 0.75; }
        6% { opacity: 0.9; }
        50% { opacity: 0.85; }
        52% { opacity: 0.7; }
        53% { opacity: 0.88; }
        80% { opacity: 0.85; }
      }

      @keyframes seldon-base-anim {
        0%, 100% { opacity: 0.25; }
        50% { opacity: 0.4; }
      }

      @keyframes seldon-scan-anim {
        0% { transform: translateY(0); }
        100% { transform: translateY(4px); }
      }

      @keyframes seldon-glitch-anim {
        0%, 100% { opacity: 0; }
        10% { opacity: 0.6; }
        11% { opacity: 0; }
      }
    `}</style>
  </svg>
);
