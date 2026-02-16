import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showPercent?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function ProgressBar({
  value,
  max = 100,
  color,
  label,
  showPercent = false,
  className = '',
  size = 'md',
}: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const barColor = color || 'var(--era-accent)';
  const heightClass = size === 'sm' ? 'h-1.5' : 'h-3';

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <span className="text-xs text-[var(--era-text)]/70 truncate">{label}</span>
          )}
          {showPercent && (
            <span className="text-xs text-[var(--era-text)]/70 tabular-nums ml-2 shrink-0">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${heightClass} rounded-full bg-[var(--era-surface)] overflow-hidden`}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
}
