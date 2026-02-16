import React from 'react';

interface Props {
  className?: string;
}

export const TerminusSkyline: React.FC<Props> = ({ className = '' }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 200"
    preserveAspectRatio="xMidYMax slice"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Terminus city skyline"
  >
    {/* Horizon / ground plane */}
    <rect x="0" y="160" width="800" height="40" fill="currentColor" fillOpacity="0.08" />
    <line x1="0" y1="160" x2="800" y2="160" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

    {/* Far background buildings - low opacity silhouettes */}
    <rect x="20" y="120" width="30" height="40" fill="currentColor" fillOpacity="0.06" />
    <rect x="55" y="110" width="20" height="50" fill="currentColor" fillOpacity="0.06" />
    <rect x="80" y="125" width="35" height="35" fill="currentColor" fillOpacity="0.06" />
    <rect x="130" y="115" width="25" height="45" fill="currentColor" fillOpacity="0.06" />
    <rect x="160" y="130" width="40" height="30" fill="currentColor" fillOpacity="0.06" />
    <rect x="220" y="118" width="28" height="42" fill="currentColor" fillOpacity="0.06" />
    <rect x="260" y="128" width="32" height="32" fill="currentColor" fillOpacity="0.06" />
    <rect x="530" y="122" width="30" height="38" fill="currentColor" fillOpacity="0.06" />
    <rect x="570" y="115" width="22" height="45" fill="currentColor" fillOpacity="0.06" />
    <rect x="600" y="130" width="35" height="30" fill="currentColor" fillOpacity="0.06" />
    <rect x="650" y="120" width="28" height="40" fill="currentColor" fillOpacity="0.06" />
    <rect x="690" y="128" width="40" height="32" fill="currentColor" fillOpacity="0.06" />
    <rect x="740" y="118" width="25" height="42" fill="currentColor" fillOpacity="0.06" />

    {/* Mid buildings - functional low Terminus architecture */}
    {/* Left cluster */}
    <rect x="10" y="130" width="35" height="30" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="50" y="118" width="25" height="42" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="80" y="135" width="40" height="25" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="125" y="122" width="30" height="38" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="160" y="140" width="45" height="20" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="210" y="128" width="28" height="32" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="243" y="135" width="35" height="25" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="283" y="125" width="22" height="35" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />

    {/* Right cluster */}
    <rect x="490" y="132" width="32" height="28" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="527" y="120" width="28" height="40" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="560" y="138" width="38" height="22" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="603" y="126" width="25" height="34" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="633" y="140" width="40" height="20" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="678" y="130" width="30" height="30" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="713" y="136" width="35" height="24" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    <rect x="753" y="128" width="28" height="32" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />

    {/* Foreground prominent buildings - higher opacity */}
    {/* Foundation HQ - slightly taller, center-left */}
    <rect x="310" y="105" width="40" height="55" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
    {/* Foundation HQ windows */}
    <rect x="315" y="110" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="323" y="110" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="331" y="110" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="315" y="118" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="323" y="118" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="331" y="118" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="315" y="126" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="323" y="126" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    <rect x="331" y="126" width="5" height="4" fill="currentColor" fillOpacity="0.1" />
    {/* Foundation HQ door */}
    <rect x="324" y="148" width="12" height="12" fill="currentColor" fillOpacity="0.15" />

    {/* Encyclopedia Tower - tallest spire, center */}
    <rect x="380" y="50" width="20" height="110" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.25" />
    {/* Encyclopedia Tower spire top */}
    <path d="M378 50L390 20L402 50" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.25" />
    {/* Tower beacon */}
    <circle cx="390" cy="22" r="2" fill="currentColor" fillOpacity="0.4" />
    <circle cx="390" cy="22" r="4" fill="currentColor" fillOpacity="0.08" />
    {/* Tower windows - vertical strip */}
    <rect x="386" y="55" width="8" height="3" fill="currentColor" fillOpacity="0.12" />
    <rect x="386" y="62" width="8" height="3" fill="currentColor" fillOpacity="0.12" />
    <rect x="386" y="69" width="8" height="3" fill="currentColor" fillOpacity="0.12" />
    <rect x="386" y="76" width="8" height="3" fill="currentColor" fillOpacity="0.12" />
    <rect x="386" y="83" width="8" height="3" fill="currentColor" fillOpacity="0.12" />
    <rect x="386" y="90" width="8" height="3" fill="currentColor" fillOpacity="0.12" />
    <rect x="386" y="97" width="8" height="3" fill="currentColor" fillOpacity="0.12" />
    {/* Tower antenna array */}
    <line x1="390" y1="20" x2="390" y2="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.3" />
    <line x1="386" y1="30" x2="382" y2="24" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
    <line x1="394" y1="30" x2="398" y2="24" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />

    {/* Trading post - wide, low building next to tower */}
    <rect x="410" y="120" width="60" height="40" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
    {/* Trading post roof detail */}
    <path d="M410 120L440 108L470 120" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
    {/* Trading post loading bays */}
    <rect x="415" y="142" width="10" height="18" fill="currentColor" fillOpacity="0.12" />
    <rect x="430" y="142" width="10" height="18" fill="currentColor" fillOpacity="0.12" />
    <rect x="445" y="142" width="10" height="18" fill="currentColor" fillOpacity="0.12" />
    <rect x="460" y="142" width="6" height="18" fill="currentColor" fillOpacity="0.12" />

    {/* Power plant - industrial with chimney */}
    <rect x="355" y="125" width="20" height="35" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.18" />
    {/* Chimney */}
    <rect x="360" y="110" width="6" height="15" fill="currentColor" fillOpacity="0.17" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.18" />

    {/* Small scattered building lights */}
    <circle cx="62" cy="125" r="0.8" fill="currentColor" fillOpacity="0.25" />
    <circle cx="140" cy="130" r="0.8" fill="currentColor" fillOpacity="0.2" />
    <circle cx="225" cy="135" r="0.8" fill="currentColor" fillOpacity="0.22" />
    <circle cx="295" cy="132" r="0.8" fill="currentColor" fillOpacity="0.18" />
    <circle cx="540" cy="128" r="0.8" fill="currentColor" fillOpacity="0.24" />
    <circle cx="615" cy="133" r="0.8" fill="currentColor" fillOpacity="0.2" />
    <circle cx="695" cy="137" r="0.8" fill="currentColor" fillOpacity="0.22" />
    <circle cx="765" cy="135" r="0.8" fill="currentColor" fillOpacity="0.18" />

    {/* Ground level details - road lines */}
    <line x1="0" y1="170" x2="350" y2="170" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
    <line x1="420" y1="170" x2="800" y2="170" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
    <line x1="0" y1="180" x2="800" y2="180" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />

    {/* Stars above skyline - a few for atmosphere */}
    <circle cx="50" cy="15" r="0.8" fill="currentColor" fillOpacity="0.2" />
    <circle cx="180" cy="8" r="0.6" fill="currentColor" fillOpacity="0.15" />
    <circle cx="320" cy="12" r="0.7" fill="currentColor" fillOpacity="0.18" />
    <circle cx="500" cy="6" r="0.8" fill="currentColor" fillOpacity="0.2" />
    <circle cx="650" cy="14" r="0.6" fill="currentColor" fillOpacity="0.15" />
    <circle cx="750" cy="10" r="0.7" fill="currentColor" fillOpacity="0.18" />
  </svg>
);
