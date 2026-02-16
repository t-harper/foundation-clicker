import React from 'react';

interface Props {
  className?: string;
}

export const GalaxyMap: React.FC<Props> = ({ className = '' }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 400"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Galaxy map"
  >
    <defs>
      {/* Central core glow */}
      <radialGradient id="galaxy-core" cx="50%" cy="50%" r="12%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
      {/* Wider galaxy glow */}
      <radialGradient id="galaxy-halo" cx="50%" cy="50%" r="45%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
        <stop offset="60%" stopColor="currentColor" stopOpacity="0.03" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Overall galaxy halo */}
    <circle cx="200" cy="200" r="180" fill="url(#galaxy-halo)" />

    {/* Spiral arm 1 - sweeping from center clockwise, upper-right */}
    <path
      d="M200 200 C220 185 250 170 280 165 C310 160 340 168 355 180 C370 192 372 210 365 228 C358 246 340 260 318 268"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeOpacity="0.12"
      strokeLinecap="round"
    />
    <path
      d="M200 200 C218 188 245 175 275 170 C305 165 332 172 348 182 C364 192 367 208 360 224"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeOpacity="0.2"
      strokeLinecap="round"
    />
    {/* Arm 1 stars/dots */}
    <circle cx="230" cy="183" r="1.2" fill="currentColor" opacity="0.25" />
    <circle cx="255" cy="173" r="0.8" fill="currentColor" opacity="0.2" />
    <circle cx="280" cy="167" r="1.0" fill="currentColor" opacity="0.22" />
    <circle cx="305" cy="165" r="0.9" fill="currentColor" opacity="0.18" />
    <circle cx="325" cy="170" r="1.1" fill="currentColor" opacity="0.2" />
    <circle cx="345" cy="180" r="0.8" fill="currentColor" opacity="0.15" />
    <circle cx="358" cy="195" r="1.0" fill="currentColor" opacity="0.18" />
    <circle cx="365" cy="215" r="0.7" fill="currentColor" opacity="0.12" />
    <circle cx="355" cy="240" r="0.9" fill="currentColor" opacity="0.14" />
    <circle cx="338" cy="258" r="0.7" fill="currentColor" opacity="0.1" />

    {/* Spiral arm 2 - opposite of arm 1, lower-left */}
    <path
      d="M200 200 C180 215 150 230 120 235 C90 240 60 232 45 220 C30 208 28 190 35 172 C42 154 60 140 82 132"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeOpacity="0.12"
      strokeLinecap="round"
    />
    <path
      d="M200 200 C182 212 155 225 125 230 C95 235 68 228 52 218 C36 208 33 192 40 176"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeOpacity="0.2"
      strokeLinecap="round"
    />
    {/* Arm 2 stars/dots */}
    <circle cx="170" cy="217" r="1.2" fill="currentColor" opacity="0.25" />
    <circle cx="145" cy="227" r="0.8" fill="currentColor" opacity="0.2" />
    <circle cx="120" cy="233" r="1.0" fill="currentColor" opacity="0.22" />
    <circle cx="95" cy="235" r="0.9" fill="currentColor" opacity="0.18" />
    <circle cx="75" cy="230" r="1.1" fill="currentColor" opacity="0.2" />
    <circle cx="55" cy="222" r="0.8" fill="currentColor" opacity="0.15" />
    <circle cx="42" cy="208" r="1.0" fill="currentColor" opacity="0.18" />
    <circle cx="35" cy="190" r="0.7" fill="currentColor" opacity="0.12" />
    <circle cx="38" cy="168" r="0.9" fill="currentColor" opacity="0.14" />
    <circle cx="55" cy="148" r="0.7" fill="currentColor" opacity="0.1" />

    {/* Spiral arm 3 - upper-left secondary arm */}
    <path
      d="M200 200 C185 180 175 155 172 130 C169 105 178 80 192 68 C206 56 224 55 242 62 C260 69 275 84 282 105"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeOpacity="0.09"
      strokeLinecap="round"
    />
    <path
      d="M200 200 C188 183 179 160 177 138 C175 116 182 95 194 82 C206 69 222 66 238 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeOpacity="0.15"
      strokeLinecap="round"
    />
    {/* Arm 3 stars */}
    <circle cx="190" cy="175" r="0.9" fill="currentColor" opacity="0.2" />
    <circle cx="180" cy="152" r="0.7" fill="currentColor" opacity="0.16" />
    <circle cx="175" cy="130" r="0.8" fill="currentColor" opacity="0.14" />
    <circle cx="178" cy="108" r="0.7" fill="currentColor" opacity="0.12" />
    <circle cx="186" cy="88" r="0.9" fill="currentColor" opacity="0.14" />
    <circle cx="200" cy="72" r="0.6" fill="currentColor" opacity="0.1" />
    <circle cx="218" cy="64" r="0.8" fill="currentColor" opacity="0.12" />
    <circle cx="238" cy="66" r="0.6" fill="currentColor" opacity="0.08" />

    {/* Spiral arm 4 - lower-right secondary arm */}
    <path
      d="M200 200 C215 220 225 245 228 270 C231 295 222 320 208 332 C194 344 176 345 158 338 C140 331 125 316 118 295"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeOpacity="0.09"
      strokeLinecap="round"
    />
    <path
      d="M200 200 C212 217 221 240 223 262 C225 284 218 305 206 318 C194 331 178 334 162 328"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeOpacity="0.15"
      strokeLinecap="round"
    />
    {/* Arm 4 stars */}
    <circle cx="210" cy="225" r="0.9" fill="currentColor" opacity="0.2" />
    <circle cx="220" cy="248" r="0.7" fill="currentColor" opacity="0.16" />
    <circle cx="225" cy="270" r="0.8" fill="currentColor" opacity="0.14" />
    <circle cx="222" cy="292" r="0.7" fill="currentColor" opacity="0.12" />
    <circle cx="214" cy="312" r="0.9" fill="currentColor" opacity="0.14" />
    <circle cx="200" cy="328" r="0.6" fill="currentColor" opacity="0.1" />
    <circle cx="182" cy="336" r="0.8" fill="currentColor" opacity="0.12" />
    <circle cx="162" cy="334" r="0.6" fill="currentColor" opacity="0.08" />

    {/* Galactic core - bright center */}
    <circle cx="200" cy="200" r="45" fill="url(#galaxy-core)" />
    <circle cx="200" cy="200" r="8" fill="currentColor" fillOpacity="0.35" />
    <circle cx="200" cy="200" r="4" fill="currentColor" fillOpacity="0.5" />
    <circle cx="200" cy="200" r="2" fill="currentColor" fillOpacity="0.7" />

    {/* Inner bulge stars around core */}
    <circle cx="212" cy="195" r="1.0" fill="currentColor" opacity="0.3" />
    <circle cx="188" cy="205" r="1.0" fill="currentColor" opacity="0.3" />
    <circle cx="205" cy="212" r="0.8" fill="currentColor" opacity="0.25" />
    <circle cx="195" cy="188" r="0.8" fill="currentColor" opacity="0.25" />
    <circle cx="215" cy="208" r="0.7" fill="currentColor" opacity="0.2" />
    <circle cx="185" cy="192" r="0.7" fill="currentColor" opacity="0.2" />
    <circle cx="208" cy="185" r="0.9" fill="currentColor" opacity="0.28" />
    <circle cx="192" cy="215" r="0.9" fill="currentColor" opacity="0.28" />

    {/* Scattered field stars */}
    <circle cx="320" cy="100" r="0.5" fill="currentColor" opacity="0.06" />
    <circle cx="80" cy="300" r="0.5" fill="currentColor" opacity="0.06" />
    <circle cx="350" cy="320" r="0.4" fill="currentColor" opacity="0.05" />
    <circle cx="50" cy="80" r="0.4" fill="currentColor" opacity="0.05" />
    <circle cx="300" cy="50" r="0.5" fill="currentColor" opacity="0.06" />
    <circle cx="100" cy="350" r="0.5" fill="currentColor" opacity="0.06" />
    <circle cx="370" cy="150" r="0.4" fill="currentColor" opacity="0.05" />
    <circle cx="30" cy="250" r="0.4" fill="currentColor" opacity="0.05" />
    <circle cx="340" cy="260" r="0.5" fill="currentColor" opacity="0.06" />
    <circle cx="60" cy="140" r="0.5" fill="currentColor" opacity="0.06" />

    {/* Notable star system markers - Terminus, Trantor, etc. could be highlighted */}
    {/* Terminus position - outer periphery */}
    <circle cx="340" cy="265" r="2" fill="currentColor" fillOpacity="0.3" />
    <circle cx="340" cy="265" r="4" fill="currentColor" fillOpacity="0.06" />

    {/* Trantor position - near galactic center */}
    <circle cx="208" cy="192" r="1.8" fill="currentColor" fillOpacity="0.35" />
    <circle cx="208" cy="192" r="3.5" fill="currentColor" fillOpacity="0.08" />
  </svg>
);
