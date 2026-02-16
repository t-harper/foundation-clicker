import React from 'react';
import { BUILDING_DEFINITIONS, ERA_DEFINITIONS, type BuildingKey, type BuildingState } from '@foundation/shared';
import { BUILDING_ART_MAP } from '../../assets/svg/buildings';

const SLOT_RADIUS = 36;
const ART_SIZE = 44;

interface MapBuildingSlotProps {
  buildingKey: BuildingKey;
  buildingState: BuildingState | undefined;
  x: number;
  y: number;
  hasUpgrade: boolean;
  onNavigate: () => void;
}

export const MapBuildingSlot: React.FC<MapBuildingSlotProps> = React.memo(
  ({ buildingKey, buildingState, x, y, hasUpgrade, onNavigate }) => {
    const isUnlocked = buildingState?.isUnlocked ?? false;
    const count = buildingState?.count ?? 0;

    if (!isUnlocked) return null;

    const def = BUILDING_DEFINITIONS[buildingKey];
    const eraDef = ERA_DEFINITIONS[def.era];
    const ArtComponent = BUILDING_ART_MAP[buildingKey];
    const isBuilt = count > 0;
    const level: 1 | 2 | 3 = count >= 50 ? 3 : count >= 10 ? 2 : 1;

    return (
      <g
        style={{ cursor: isBuilt ? 'pointer' : 'default' }}
        onClick={isBuilt ? onNavigate : undefined}
      >
        {/* Upgrade glow ring */}
        {hasUpgrade && isBuilt && (
          <circle
            cx={x}
            cy={y}
            r={SLOT_RADIUS + 6}
            fill={eraDef.themeColors.accent}
            opacity={0.15}
          />
        )}

        {/* Slot circle */}
        <circle
          cx={x}
          cy={y}
          r={SLOT_RADIUS}
          fill={isBuilt ? eraDef.themeColors.surface : 'none'}
          fillOpacity={isBuilt ? 0.6 : 0}
          stroke={eraDef.themeColors.primary}
          strokeWidth={isBuilt ? 1.5 : 1}
          strokeDasharray={isBuilt ? undefined : '4 3'}
          opacity={isBuilt ? 0.8 : 0.3}
        />

        {/* Building art via foreignObject */}
        <foreignObject
          x={x - ART_SIZE / 2}
          y={y - ART_SIZE / 2}
          width={ART_SIZE}
          height={ART_SIZE}
        >
          <div
            style={{
              width: ART_SIZE,
              height: ART_SIZE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: eraDef.themeColors.primary,
              opacity: isBuilt ? 1 : 0.25,
            }}
          >
            <ArtComponent size={ART_SIZE - 4} level={level} />
          </div>
        </foreignObject>

        {/* Count badge */}
        {isBuilt && (
          <>
            <circle
              cx={x + SLOT_RADIUS - 6}
              cy={y - SLOT_RADIUS + 6}
              r={12}
              fill={eraDef.themeColors.accent}
            />
            <text
              x={x + SLOT_RADIUS - 6}
              y={y - SLOT_RADIUS + 6}
              textAnchor="middle"
              dominantBaseline="central"
              fill={eraDef.themeColors.bg}
              fontSize={count >= 100 ? 9 : 11}
              fontWeight={700}
              fontFamily="system-ui, sans-serif"
            >
              {count}
            </text>
          </>
        )}

        {/* Name label */}
        <text
          x={x}
          y={y + SLOT_RADIUS + 16}
          textAnchor="middle"
          fill={eraDef.themeColors.text}
          opacity={isBuilt ? 0.7 : 0.3}
          fontSize={11}
          fontFamily="system-ui, sans-serif"
        >
          {def.name}
        </text>
      </g>
    );
  }
);

MapBuildingSlot.displayName = 'MapBuildingSlot';
