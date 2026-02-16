import React, { useEffect, useRef, useState } from 'react';
import { formatNumber } from '../../utils/format';

export interface NumberDisplayProps {
  value: number;
  format?: 'short' | 'full' | 'scientific';
  prefix?: string;
  suffix?: string;
  className?: string;
  animate?: boolean;
}

export function NumberDisplay({
  value,
  format = 'short',
  prefix,
  suffix,
  className = '',
  animate = false,
}: NumberDisplayProps) {
  const [flash, setFlash] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (animate && prevValueRef.current !== value) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 400);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
    prevValueRef.current = value;
  }, [value, animate]);

  const formatted = formatNumber(value, format);

  return (
    <span
      className={[
        'tabular-nums inline-block',
        flash ? 'animate-value-flash' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {prefix && <span>{prefix}</span>}
      {formatted}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
