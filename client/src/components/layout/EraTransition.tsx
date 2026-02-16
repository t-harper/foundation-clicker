import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store';
import { ERA_DEFINITIONS } from '@foundation/shared';
import type { Era } from '@foundation/shared';

export function EraTransition() {
  const currentEra = useGameStore((s) => s.currentEra);
  const eraDef = ERA_DEFINITIONS[currentEra];

  const prevEraRef = useRef<Era>(currentEra);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (prevEraRef.current !== currentEra) {
      setTransitioning(true);
      prevEraRef.current = currentEra;

      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentEra]);

  return (
    <div
      className={[
        'flex flex-col items-center gap-1 px-4 py-3 rounded-lg border transition-all duration-700',
        transitioning
          ? 'border-[var(--era-accent)] bg-[var(--era-accent)]/10 shadow-lg shadow-[var(--era-accent)]/20 scale-105'
          : 'border-[var(--era-surface)] bg-[var(--era-surface)]/30',
        `era-${currentEra}`,
      ].join(' ')}
      role="status"
      aria-label={`Current era: ${eraDef.name}`}
    >
      <span
        className={[
          'text-xs uppercase tracking-widest font-semibold transition-colors duration-700',
          transitioning ? 'text-[var(--era-accent)]' : 'text-[var(--era-primary)]/70',
        ].join(' ')}
      >
        Current Era
      </span>
      <h2
        className={[
          'text-lg font-display font-bold tracking-wide transition-colors duration-700',
          transitioning ? 'text-[var(--era-accent)] animate-pulse' : 'text-[var(--era-primary)]',
        ].join(' ')}
      >
        {eraDef.name}
      </h2>
      <p className="text-xs text-center text-[var(--era-text)]/50 max-w-xs leading-relaxed">
        {eraDef.description}
      </p>
    </div>
  );
}
