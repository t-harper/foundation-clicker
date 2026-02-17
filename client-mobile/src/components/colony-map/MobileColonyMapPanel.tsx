import React, { useState, useRef, useCallback, useMemo } from 'react';
import { ERA_DEFINITIONS, UPGRADE_DEFINITIONS, Era, type BuildingKey } from '@foundation/shared';
import { useGameStore } from '@desktop/store';
import { MAP_SIZE, MAP_CENTER, RING_RADII, MAP_SLOTS } from '@desktop/components/colony-map/colony-map-layout';
import { SeldonVaultCenter } from '@desktop/components/colony-map/SeldonVaultCenter';
import { MapBuildingSlot } from '@desktop/components/colony-map/MapBuildingSlot';

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.0;
const INITIAL_ZOOM = 0.3;
const ZOOM_STEP = 0.1;

const ERAS = [Era.ReligiousDominance, Era.TradingExpansion, Era.PsychologicalInfluence, Era.GalacticReunification] as const;

export function MobileColonyMapPanel() {
  const buildings = useGameStore((s) => s.buildings);
  const upgrades = useGameStore((s) => s.upgrades);
  const currentEra = useGameStore((s) => s.currentEra);
  const setActiveTab = useGameStore((s) => s.setActiveTab);

  // Pan/zoom state
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Touch tracking refs
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef<number | null>(null);
  const pinchZoomStart = useRef(INITIAL_ZOOM);

  // Compute set of buildings with active upgrade multipliers
  const upgradedBuildings = useMemo(() => {
    const set = new Set<BuildingKey>();
    for (const us of upgrades) {
      if (!us.isPurchased) continue;
      const def = UPGRADE_DEFINITIONS[us.upgradeKey];
      if (!def) continue;
      for (const effect of def.effects) {
        if (effect.type === 'buildingMultiplier') {
          set.add(effect.building);
        }
      }
    }
    return set;
  }, [upgrades]);

  // Stats
  const totalBuilt = buildings.reduce((sum, b) => sum + b.count, 0);
  const totalUnlocked = buildings.filter((b) => b.isUnlocked).length;

  // Building state lookup
  const buildingByKey = useMemo(() => {
    const map = new Map<string, (typeof buildings)[number]>();
    for (const b of buildings) map.set(b.buildingKey, b);
    return map;
  }, [buildings]);

  // Compute distance between two touch points
  const getTouchDist = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Touch handlers for pan + pinch-to-zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Single finger: start pan
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStart.current = { ...pan };
      lastPinchDist.current = null;
    } else if (e.touches.length === 2) {
      // Two fingers: start pinch-to-zoom
      isDragging.current = false;
      lastPinchDist.current = getTouchDist(e.touches);
      pinchZoomStart.current = zoom;
    }
  }, [pan, zoom]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging.current) {
      // Single finger drag: pan
      setPan({
        x: panStart.current.x + (e.touches[0].clientX - dragStart.current.x),
        y: panStart.current.y + (e.touches[0].clientY - dragStart.current.y),
      });
    } else if (e.touches.length === 2 && lastPinchDist.current !== null) {
      // Pinch-to-zoom
      const currentDist = getTouchDist(e.touches);
      const scale = currentDist / lastPinchDist.current;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchZoomStart.current * scale));
      setZoom(newZoom);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    lastPinchDist.current = null;
  }, []);

  // Mouse handlers (for testing in browser)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({
      x: panStart.current.x + (e.clientX - dragStart.current.x),
      y: panStart.current.y + (e.clientY - dragStart.current.y),
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
  }, []);

  const handleResetView = useCallback(() => {
    setZoom(INITIAL_ZOOM);
    setPan({ x: 0, y: 0 });
  }, []);

  const navigateToBuildings = useCallback(() => {
    setActiveTab('buildings');
  }, [setActiveTab]);

  return (
    <div className="flex flex-col gap-3" style={{ height: 'calc(100vh - 220px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-display font-semibold text-[var(--era-text)]">Colony Map</h2>
          <p className="text-[11px] text-[var(--era-text)]/50">
            {totalBuilt} built, {totalUnlocked}/56 unlocked
          </p>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg border border-[var(--era-surface)] text-[var(--era-text)]/60 active:text-[var(--era-text)] active:bg-[var(--era-surface)]/50 text-base font-mono flex items-center justify-center touch-action-manipulation"
          >
            -
          </button>
          <span className="text-[11px] text-[var(--era-text)]/50 w-9 text-center font-mono">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg border border-[var(--era-surface)] text-[var(--era-text)]/60 active:text-[var(--era-text)] active:bg-[var(--era-surface)]/50 text-base font-mono flex items-center justify-center touch-action-manipulation"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="px-2 h-8 rounded-lg border border-[var(--era-surface)] text-[var(--era-text)]/60 active:text-[var(--era-text)] active:bg-[var(--era-surface)]/50 text-xs touch-action-manipulation"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Era legend (scrollable on small screens) */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-none text-[11px]">
        {ERAS.map((era) => {
          const eraDef = ERA_DEFINITIONS[era];
          const reached = era <= currentEra;
          return (
            <div key={era} className="flex items-center gap-1 shrink-0" style={{ opacity: reached ? 1 : 0.35 }}>
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: eraDef.themeColors.primary }}
              />
              <span className="text-[var(--era-text)]/70 whitespace-nowrap">{eraDef.name}</span>
            </div>
          );
        })}
      </div>

      {/* Map viewport with touch gestures */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden rounded-lg border border-[var(--era-surface)] bg-[var(--era-bg)]/60"
        style={{
          touchAction: 'none',
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
          width={MAP_SIZE}
          height={MAP_SIZE}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Era ring circles */}
          {ERAS.map((era) => {
            const eraDef = ERA_DEFINITIONS[era];
            const reached = era <= currentEra;
            return (
              <g key={`ring-${era}`}>
                <circle
                  cx={MAP_CENTER}
                  cy={MAP_CENTER}
                  r={RING_RADII[era]}
                  fill="none"
                  stroke={eraDef.themeColors.primary}
                  strokeWidth={1}
                  strokeDasharray="8 4"
                  opacity={reached ? 0.2 : 0.07}
                />
                {/* Era label at top of ring */}
                <text
                  x={MAP_CENTER}
                  y={MAP_CENTER - RING_RADII[era] - 10}
                  textAnchor="middle"
                  fill={eraDef.themeColors.primary}
                  opacity={reached ? 0.35 : 0.12}
                  fontSize={12}
                  fontFamily="system-ui, sans-serif"
                  fontWeight={500}
                  letterSpacing="0.05em"
                >
                  {eraDef.name.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Seldon Vault center */}
          <SeldonVaultCenter cx={MAP_CENTER} cy={MAP_CENTER} />

          {/* Building slots */}
          {MAP_SLOTS.map((slot) => (
            <MapBuildingSlot
              key={slot.buildingKey}
              buildingKey={slot.buildingKey}
              buildingState={buildingByKey.get(slot.buildingKey)}
              x={slot.x}
              y={slot.y}
              hasUpgrade={upgradedBuildings.has(slot.buildingKey)}
              onNavigate={navigateToBuildings}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
