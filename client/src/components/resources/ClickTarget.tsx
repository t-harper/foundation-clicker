import React, { useState, useCallback, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { ResourceKey } from '@foundation/shared';
import { useGameStore, selectClickValue, selectClickResourceYields } from '../../store';
import { click } from '../../api';
import { NumberDisplay } from '../common';
import { ClickIcon } from '../../assets/svg/icons';
import { formatNumber } from '../../utils/format';

interface FloatingNumber {
  id: number;
  value: number;
  x: number;
  y: number;
  label?: string;
  colorClass: string;
}

const RESOURCE_LABELS: Record<ResourceKey, string> = {
  credits: 'credits',
  knowledge: 'knowledge',
  influence: 'influence',
  nuclearTech: 'nuclear tech',
  rawMaterials: 'materials',
};

const RESOURCE_FLOAT_COLORS: Record<ResourceKey, string> = {
  credits: 'text-yellow-400',
  knowledge: 'text-blue-400',
  influence: 'text-purple-400',
  nuclearTech: 'text-green-400',
  rawMaterials: 'text-amber-600',
};

let floatingIdCounter = 0;

export function ClickTarget() {
  const addClick = useGameStore((s) => s.addClick);
  const setResources = useGameStore((s) => s.setResources);
  const totalClicks = useGameStore((s) => s.totalClicks);
  const clickValue = useGameStore(selectClickValue);
  const bonusYields = useGameStore(useShallow(selectClickResourceYields));
  const addNotification = useGameStore((s) => s.addNotification);

  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [burstParticles, setBurstParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      // Optimistic local update
      const hasBonusYields = Object.keys(bonusYields).length > 0;
      addClick(clickValue, hasBonusYields ? bonusYields : undefined);

      // Floating number animation
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newFloats: FloatingNumber[] = [];

        // Credit float
        const creditId = ++floatingIdCounter;
        newFloats.push({ id: creditId, value: clickValue, x, y, colorClass: RESOURCE_FLOAT_COLORS.credits });

        // Bonus resource floats (staggered vertically)
        let offset = 1;
        for (const [resource, amount] of Object.entries(bonusYields)) {
          if (!amount) continue;
          const bonusId = ++floatingIdCounter;
          newFloats.push({
            id: bonusId,
            value: amount,
            x: x + 20,
            y: y + offset * 22,
            label: RESOURCE_LABELS[resource as ResourceKey],
            colorClass: RESOURCE_FLOAT_COLORS[resource as ResourceKey],
          });
          offset++;
        }

        setFloatingNumbers((prev) => [...prev, ...newFloats]);
        setTimeout(() => {
          const ids = new Set(newFloats.map((f) => f.id));
          setFloatingNumbers((prev) => prev.filter((fn) => !ids.has(fn.id)));
        }, 1000);
      }

      // Visual feedback
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 100);

      // Burst particles
      const particles = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return {
          id: floatingIdCounter + 1000 + i,
          x: Math.cos(angle) * 40,
          y: Math.sin(angle) * 40,
        };
      });
      setBurstParticles(particles);
      setTimeout(() => setBurstParticles([]), 600);

      // Server sync
      try {
        const result = await click(1);
        const currentResources = { ...useGameStore.getState().resources };
        currentResources.credits = result.newCredits;
        if (result.bonusResources) {
          for (const [resource, amount] of Object.entries(result.bonusResources)) {
            if (amount !== undefined) {
              currentResources[resource as ResourceKey] = Math.max(
                currentResources[resource as ResourceKey],
                amount
              );
            }
          }
        }
        setResources(currentResources);
      } catch (err) {
        addNotification({
          message: 'Click sync failed, will retry on next save.',
          type: 'warning',
        });
      }
    },
    [addClick, clickValue, bonusYields, setResources, addNotification],
  );

  const bonusEntries = Object.entries(bonusYields).filter(([, v]) => v && v > 0);

  return (
    <div className="flex flex-col items-center gap-6 w-full" ref={containerRef}>
      {/* Title */}
      <div className="text-center">
        <h2 className="text-lg font-display font-semibold text-[var(--era-primary)]">
          The Vault
        </h2>
        <p className="text-xs text-[var(--era-text)]/50 mt-1">
          Tap to generate credits
        </p>
      </div>

      {/* Click button */}
      <div className="relative">
        <button
          type="button"
          onClick={handleClick}
          className={[
            'relative w-40 h-40 rounded-full',
            'bg-gradient-to-br from-[var(--era-accent)] via-[var(--era-primary)] to-[var(--era-accent)]',
            'border-4 border-[var(--era-accent)]/60',
            'shadow-[0_0_15px_color-mix(in_srgb,var(--era-accent)_30%,transparent)]',
            'hover:shadow-[0_0_30px_color-mix(in_srgb,var(--era-accent)_40%,transparent)]',
            'transition-all duration-150',
            'focus:outline-none focus:ring-4 focus:ring-[var(--era-accent)]/30',
            'active:scale-95',
            'cursor-pointer select-none',
            isPressed ? 'scale-90' : 'scale-100',
          ].join(' ')}
          aria-label={`Click to earn ${formatNumber(clickValue, 'short')} credits`}
        >
          {/* Inner ring */}
          <div className="absolute inset-3 rounded-full border-2 border-[var(--era-bg)]/30 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <ClickIcon className="w-10 h-10 text-[var(--era-bg)]" />
              <span className="text-lg font-bold text-[var(--era-bg)] tabular-nums">
                +{formatNumber(clickValue, 'short')}
              </span>
            </div>
          </div>

          {/* Ripple + energy ring on click */}
          {isPressed && <div className="click-ripple" />}
          {isPressed && <div className="energy-ring" />}

          {/* Burst particles */}
          {burstParticles.map((p) => (
            <div
              key={p.id}
              className="click-burst"
              style={{
                '--burst-x': `${p.x}px`,
                '--burst-y': `${p.y}px`,
                left: '50%',
                top: '50%',
                marginLeft: '-2px',
                marginTop: '-2px',
              } as React.CSSProperties}
            />
          ))}
        </button>

        <div className="click-target-idle-ring" />

        {/* Floating numbers */}
        {floatingNumbers.map((fn) => (
          <span
            key={fn.id}
            className={`absolute text-lg font-bold pointer-events-none animate-float-up ${fn.colorClass}`}
            style={{
              left: fn.x,
              top: fn.y,
            }}
          >
            +{formatNumber(fn.value, 'short')}{fn.label ? ` ${fn.label}` : ''}
          </span>
        ))}
      </div>

      {/* Total clicks */}
      <div className="text-center">
        <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide">
          Total Clicks
        </span>
        <NumberDisplay
          value={totalClicks}
          format="full"
          animate
          className="block text-sm font-semibold text-[var(--era-text)]/70 mt-0.5"
        />
      </div>

      {/* Click value display */}
      <div className="text-center px-4 py-2 rounded-md bg-[var(--era-surface)]/50 border border-[var(--era-primary)]/20">
        <span className="text-xs text-[var(--era-text)]/50">Per Click: </span>
        <span className="text-sm font-semibold text-[var(--era-accent)]">
          {formatNumber(clickValue, 'short')} credits
        </span>
        {bonusEntries.map(([resource, amount]) => (
          <span
            key={resource}
            className={`text-sm font-semibold ml-2 ${RESOURCE_FLOAT_COLORS[resource as ResourceKey]}`}
          >
            +{formatNumber(amount!, 'short')} {RESOURCE_LABELS[resource as ResourceKey]}
          </span>
        ))}
      </div>
    </div>
  );
}
