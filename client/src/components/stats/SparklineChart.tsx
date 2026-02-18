import React from 'react';

interface SparklineChartProps {
  data: { x: number; y: number }[];
  width?: number;
  height?: number;
  color?: string;
  showArea?: boolean;
  className?: string;
  label?: string;
}

export function SparklineChart({
  data,
  width = 300,
  height = 80,
  color = 'var(--era-accent)',
  showArea = true,
  className = '',
  label,
}: SparklineChartProps) {
  if (data.length < 2) {
    return (
      <div className={`${className}`}>
        {label && <span className="text-xs text-[var(--era-text)]/50 mb-1 block">{label}</span>}
        <div className="text-xs text-[var(--era-text)]/30 h-[60px] flex items-center justify-center">
          Collecting data...
        </div>
      </div>
    );
  }

  const minY = Math.min(...data.map((d) => d.y));
  const maxY = Math.max(...data.map((d) => d.y));
  const minX = data[0].x;
  const maxX = data[data.length - 1].x;
  const rangeY = maxY - minY || 1;
  const rangeX = maxX - minX || 1;
  const padding = 4;
  const w = width - padding * 2;
  const h = height - padding * 2;

  const points = data.map((d) => ({
    x: padding + ((d.x - minX) / rangeX) * w,
    y: padding + h - ((d.y - minY) / rangeY) * h,
  }));

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = `${points[0].x},${padding + h} ${linePoints} ${points[points.length - 1].x},${padding + h}`;

  return (
    <div className={className}>
      {label && <span className="text-xs text-[var(--era-text)]/50 mb-1 block">{label}</span>}
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={label || 'Chart'}
      >
        {showArea && <polygon points={areaPoints} fill={color} opacity="0.12" />}
        <polyline
          points={linePoints}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
