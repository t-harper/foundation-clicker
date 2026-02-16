import React from 'react';

interface SeldonVaultCenterProps {
  cx: number;
  cy: number;
}

export const SeldonVaultCenter: React.FC<SeldonVaultCenterProps> = ({ cx, cy }) => (
  <g>
    {/* Outer glow */}
    <circle cx={cx} cy={cy} r={60} fill="currentColor" opacity={0.04} className="colony-vault-pulse" />
    {/* Concentric rings */}
    <circle cx={cx} cy={cy} r={45} fill="none" stroke="currentColor" strokeWidth={0.5} opacity={0.12} />
    <circle cx={cx} cy={cy} r={30} fill="none" stroke="currentColor" strokeWidth={0.8} opacity={0.18} />
    <circle cx={cx} cy={cy} r={18} fill="currentColor" opacity={0.06} />
    <circle cx={cx} cy={cy} r={18} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.3} />
    {/* Inner dome */}
    <circle cx={cx} cy={cy} r={8} fill="currentColor" opacity={0.15} />
    <circle cx={cx} cy={cy} r={8} fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.5} />
    {/* Core */}
    <circle cx={cx} cy={cy} r={4} fill="currentColor" opacity={0.4} />
    {/* Label */}
    <text
      x={cx}
      y={cy + 78}
      textAnchor="middle"
      fill="currentColor"
      opacity={0.4}
      fontSize={16}
      fontFamily="system-ui, sans-serif"
      fontWeight={500}
      letterSpacing="0.1em"
    >
      SELDON VAULT
    </text>
  </g>
);
