import React from 'react';

interface Props {
  className?: string;
}

export const StarField: React.FC<Props> = ({ className = '' }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Star field background"
  >
    <defs>
      <radialGradient id="starfield-bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.03" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background nebula glow */}
    <rect width="800" height="600" fill="url(#starfield-bg)" />

    {/* Dim background stars - tiny, low opacity */}
    <circle cx="23" cy="18" r="0.8" fill="currentColor" opacity="0.15" />
    <circle cx="67" cy="45" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="112" cy="89" r="0.7" fill="currentColor" opacity="0.18" />
    <circle cx="156" cy="23" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="198" cy="134" r="0.8" fill="currentColor" opacity="0.14" />
    <circle cx="245" cy="67" r="0.6" fill="currentColor" opacity="0.16" />
    <circle cx="289" cy="178" r="0.7" fill="currentColor" opacity="0.11" />
    <circle cx="334" cy="45" r="0.5" fill="currentColor" opacity="0.13" />
    <circle cx="378" cy="201" r="0.8" fill="currentColor" opacity="0.17" />
    <circle cx="423" cy="112" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="467" cy="234" r="0.7" fill="currentColor" opacity="0.15" />
    <circle cx="512" cy="56" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="556" cy="289" r="0.8" fill="currentColor" opacity="0.14" />
    <circle cx="601" cy="145" r="0.6" fill="currentColor" opacity="0.16" />
    <circle cx="645" cy="312" r="0.7" fill="currentColor" opacity="0.11" />
    <circle cx="689" cy="78" r="0.5" fill="currentColor" opacity="0.13" />
    <circle cx="734" cy="356" r="0.8" fill="currentColor" opacity="0.17" />
    <circle cx="778" cy="189" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="45" cy="401" r="0.7" fill="currentColor" opacity="0.15" />
    <circle cx="89" cy="445" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="134" cy="489" r="0.8" fill="currentColor" opacity="0.14" />
    <circle cx="178" cy="534" r="0.6" fill="currentColor" opacity="0.16" />
    <circle cx="223" cy="378" r="0.7" fill="currentColor" opacity="0.11" />
    <circle cx="267" cy="423" r="0.5" fill="currentColor" opacity="0.13" />
    <circle cx="312" cy="467" r="0.8" fill="currentColor" opacity="0.17" />
    <circle cx="356" cy="512" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="401" cy="356" r="0.7" fill="currentColor" opacity="0.15" />
    <circle cx="445" cy="401" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="489" cy="445" r="0.8" fill="currentColor" opacity="0.14" />
    <circle cx="534" cy="489" r="0.6" fill="currentColor" opacity="0.16" />
    <circle cx="578" cy="534" r="0.7" fill="currentColor" opacity="0.11" />
    <circle cx="623" cy="378" r="0.5" fill="currentColor" opacity="0.13" />
    <circle cx="667" cy="423" r="0.8" fill="currentColor" opacity="0.17" />
    <circle cx="712" cy="467" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="756" cy="512" r="0.7" fill="currentColor" opacity="0.15" />

    {/* Medium stars - slightly larger, moderate opacity */}
    <circle cx="95" cy="156" r="1.0" fill="currentColor" opacity="0.25" />
    <circle cx="210" cy="289" r="1.1" fill="currentColor" opacity="0.22" />
    <circle cx="340" cy="134" r="1.0" fill="currentColor" opacity="0.28" />
    <circle cx="450" cy="478" r="1.2" fill="currentColor" opacity="0.2" />
    <circle cx="580" cy="223" r="1.0" fill="currentColor" opacity="0.26" />
    <circle cx="700" cy="534" r="1.1" fill="currentColor" opacity="0.22" />
    <circle cx="150" cy="512" r="1.0" fill="currentColor" opacity="0.24" />
    <circle cx="380" cy="378" r="1.2" fill="currentColor" opacity="0.2" />
    <circle cx="520" cy="89" r="1.0" fill="currentColor" opacity="0.27" />
    <circle cx="660" cy="267" r="1.1" fill="currentColor" opacity="0.23" />
    <circle cx="45" cy="334" r="1.0" fill="currentColor" opacity="0.25" />
    <circle cx="780" cy="445" r="1.2" fill="currentColor" opacity="0.21" />
    <circle cx="270" cy="556" r="1.0" fill="currentColor" opacity="0.26" />
    <circle cx="490" cy="312" r="1.1" fill="currentColor" opacity="0.22" />
    <circle cx="130" cy="267" r="1.0" fill="currentColor" opacity="0.24" />

    {/* Brighter notable stars - larger with glow, twinkling classes */}
    <circle className="star-twinkle-1" cx="178" cy="89" r="1.8" fill="currentColor" opacity="0.5" />
    <circle className="star-twinkle-1" cx="178" cy="89" r="3" fill="currentColor" opacity="0.1" />

    <circle className="star-twinkle-2" cx="423" cy="178" r="2.0" fill="currentColor" opacity="0.55" />
    <circle className="star-twinkle-2" cx="423" cy="178" r="3.5" fill="currentColor" opacity="0.12" />

    <circle className="star-twinkle-3" cx="645" cy="112" r="1.6" fill="currentColor" opacity="0.45" />
    <circle className="star-twinkle-3" cx="645" cy="112" r="2.8" fill="currentColor" opacity="0.08" />

    <circle className="star-twinkle-1" cx="312" cy="423" r="2.2" fill="currentColor" opacity="0.5" />
    <circle className="star-twinkle-1" cx="312" cy="423" r="4" fill="currentColor" opacity="0.1" />

    <circle className="star-twinkle-2" cx="556" cy="356" r="1.5" fill="currentColor" opacity="0.48" />
    <circle className="star-twinkle-2" cx="556" cy="356" r="2.5" fill="currentColor" opacity="0.1" />

    <circle className="star-twinkle-3" cx="89" cy="534" r="1.8" fill="currentColor" opacity="0.52" />
    <circle className="star-twinkle-3" cx="89" cy="534" r="3" fill="currentColor" opacity="0.1" />

    <circle className="star-twinkle-1" cx="734" cy="289" r="2.0" fill="currentColor" opacity="0.5" />
    <circle className="star-twinkle-1" cx="734" cy="289" r="3.5" fill="currentColor" opacity="0.12" />

    <circle className="star-twinkle-2" cx="489" cy="534" r="1.7" fill="currentColor" opacity="0.46" />
    <circle className="star-twinkle-2" cx="489" cy="534" r="3" fill="currentColor" opacity="0.09" />

    {/* Prominent bright stars with cross-shine effect */}
    <g className="star-twinkle-3">
      <circle cx="267" cy="234" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="267" cy="234" r="5" fill="currentColor" opacity="0.08" />
      <line x1="261" y1="234" x2="273" y2="234" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="267" y1="228" x2="267" y2="240" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </g>

    <g className="star-twinkle-1">
      <circle cx="623" cy="478" r="2.8" fill="currentColor" opacity="0.65" />
      <circle cx="623" cy="478" r="5.5" fill="currentColor" opacity="0.08" />
      <line x1="616" y1="478" x2="630" y2="478" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="623" y1="471" x2="623" y2="485" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </g>

    <g className="star-twinkle-2">
      <circle cx="756" cy="56" r="2.2" fill="currentColor" opacity="0.55" />
      <circle cx="756" cy="56" r="4.5" fill="currentColor" opacity="0.07" />
      <line x1="750" y1="56" x2="762" y2="56" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <line x1="756" y1="50" x2="756" y2="62" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    </g>

    {/* Additional scattered dim stars for density */}
    <circle cx="34" cy="234" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="78" cy="312" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="123" cy="378" r="0.5" fill="currentColor" opacity="0.09" />
    <circle cx="167" cy="445" r="0.7" fill="currentColor" opacity="0.14" />
    <circle cx="212" cy="178" r="0.5" fill="currentColor" opacity="0.11" />
    <circle cx="256" cy="112" r="0.6" fill="currentColor" opacity="0.13" />
    <circle cx="301" cy="534" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="345" cy="267" r="0.7" fill="currentColor" opacity="0.15" />
    <circle cx="389" cy="89" r="0.5" fill="currentColor" opacity="0.09" />
    <circle cx="434" cy="556" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="478" cy="156" r="0.5" fill="currentColor" opacity="0.11" />
    <circle cx="523" cy="423" r="0.7" fill="currentColor" opacity="0.14" />
    <circle cx="567" cy="45" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="612" cy="512" r="0.6" fill="currentColor" opacity="0.13" />
    <circle cx="656" cy="178" r="0.5" fill="currentColor" opacity="0.09" />
    <circle cx="701" cy="156" r="0.7" fill="currentColor" opacity="0.15" />
    <circle cx="745" cy="401" r="0.5" fill="currentColor" opacity="0.11" />
    <circle cx="12" cy="567" r="0.6" fill="currentColor" opacity="0.12" />
    <circle cx="56" cy="178" r="0.5" fill="currentColor" opacity="0.1" />
    <circle cx="101" cy="45" r="0.7" fill="currentColor" opacity="0.14" />
  </svg>
);
