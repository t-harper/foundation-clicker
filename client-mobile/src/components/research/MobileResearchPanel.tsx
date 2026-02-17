import React, { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '@desktop/store';
import { ACTIVITY_DEFINITIONS, HERO_DEFINITIONS, ERA_DEFINITIONS, EVENT_DEFINITIONS, Era } from '@foundation/shared';
import { getHeroes } from '@desktop/api/heroes';
import { getActivities } from '@desktop/api/activities';
import { getInventory } from '@desktop/api/inventory';
import { MobileActivityCard } from './MobileActivityCard';
import { MobileHeroCard } from './MobileHeroCard';
import { MobileInventoryPanel } from './MobileInventoryPanel';

type ResearchSubTab = 'projects' | 'missions' | 'inventory' | 'heroes';

export function MobileResearchPanel() {
  const [subTab, setSubTab] = useState<ResearchSubTab>('projects');
  const [loaded, setLoaded] = useState(false);

  const currentEra = useGameStore((s) => s.currentEra);
  const heroes = useGameStore((s) => s.heroes);
  const activities = useGameStore((s) => s.activities);
  const activeActivities = useGameStore((s) => s.activeActivities);
  const inventory = useGameStore((s) => s.inventory);
  const activeConsumable = useGameStore((s) => s.activeConsumable);
  const eventHistory = useGameStore((s) => s.eventHistory);
  const setHeroes = useGameStore((s) => s.setHeroes);
  const setActivities = useGameStore((s) => s.setActivities);
  const setActiveActivities = useGameStore((s) => s.setActiveActivities);
  const setInventory = useGameStore((s) => s.setInventory);
  const setActiveConsumable = useGameStore((s) => s.setActiveConsumable);

  // Load data on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [heroesRes, activitiesRes, inventoryRes] = await Promise.all([
          getHeroes(),
          getActivities(),
          getInventory(),
        ]);

        if (cancelled) return;

        setHeroes(heroesRes.heroes);
        setActivities(activitiesRes.activities);
        setActiveActivities(activitiesRes.activeActivities);
        setInventory(inventoryRes.inventory);
        setActiveConsumable(inventoryRes.activeConsumable);
        setLoaded(true);
      } catch {
        // Silently fail - data will be loaded on next mount
      }
    }

    void load();
    return () => { cancelled = true; };
  }, [setHeroes, setActivities, setActiveActivities, setInventory, setActiveConsumable]);

  // Activity completions map for quick lookup
  const completionMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const a of activities) {
      map.set(a.activityKey, a.timesCompleted);
    }
    return map;
  }, [activities]);

  // Filter activities by type and era
  const getFilteredActivities = (type: 'research' | 'mission') => {
    return Object.values(ACTIVITY_DEFINITIONS)
      .filter((def) => def.type === type && def.era === currentEra)
      .sort((a, b) => a.era - b.era || a.durationSeconds - b.durationSeconds);
  };

  const projects = getFilteredActivities('research');
  const missions = getFilteredActivities('mission');

  // Busy hero set
  const busyHeroKeys = new Set(activeActivities.map((a) => a.heroKey));

  // Heroes discovered in previous runs (via event heroReward) but not currently unlocked
  const discoveredHeroKeys = useMemo(() => {
    const completedEventKeys = new Set(eventHistory.map((e) => e.eventKey));
    const discovered = new Set<string>();
    for (const [eventKey, def] of Object.entries(EVENT_DEFINITIONS)) {
      if (def.heroReward && completedEventKeys.has(eventKey)) {
        discovered.add(def.heroReward);
      }
    }
    return discovered;
  }, [eventHistory]);

  // Hero counts
  const unlockedHeroes = heroes.filter((h) => h.unlockedAt !== null);
  const currentEraHeroes = unlockedHeroes.filter((h) => {
    const def = HERO_DEFINITIONS[h.heroKey];
    return def && def.era === currentEra;
  });
  const idleHeroes = currentEraHeroes.filter((h) => !busyHeroKeys.has(h.heroKey));

  const SUB_TABS: { key: ResearchSubTab; label: string; count?: number }[] = [
    { key: 'projects', label: 'Projects', count: projects.length },
    { key: 'missions', label: 'Missions', count: missions.length },
    { key: 'inventory', label: 'Inventory', count: inventory.length },
    { key: 'heroes', label: 'Heroes', count: unlockedHeroes.length },
  ];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">
          Research &amp; Missions
        </h2>
        <span className="text-[11px] text-[var(--era-text)]/40">
          {idleHeroes.length}/{currentEraHeroes.length} idle
        </span>
      </div>

      {/* Horizontal scrollable sub-tab bar */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none -mx-3 px-3 pb-1 border-b border-[var(--era-surface)]/30">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setSubTab(tab.key)}
            className={[
              'shrink-0 px-3 py-2 text-sm font-medium rounded-t transition-colors touch-action-manipulation',
              subTab === tab.key
                ? 'text-[var(--era-accent)] border-b-2 border-[var(--era-accent)]'
                : 'text-[var(--era-text)]/40 active:text-[var(--era-text)]/70',
            ].join(' ')}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1 text-[10px] opacity-50">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {!loaded ? (
        <div className="text-center py-12 text-[var(--era-text)]/40">
          <p className="animate-pulse">Loading research data...</p>
        </div>
      ) : (
        <>
          {subTab === 'projects' && (
            <MobileActivityList
              activities={projects}
              completionMap={completionMap}
              emptyMessage="No research projects available yet."
            />
          )}

          {subTab === 'missions' && (
            <MobileActivityList
              activities={missions}
              completionMap={completionMap}
              emptyMessage="No missions available yet."
            />
          )}

          {subTab === 'inventory' && (
            <MobileInventoryPanel
              inventory={inventory}
              activeConsumable={activeConsumable}
            />
          )}

          {subTab === 'heroes' && (
            <MobileHeroList
              heroes={heroes}
              currentEra={currentEra}
              busyHeroKeys={busyHeroKeys}
              activeActivities={activeActivities}
              discoveredHeroKeys={discoveredHeroKeys}
            />
          )}
        </>
      )}
    </div>
  );
}

function MobileActivityList({
  activities,
  completionMap,
  emptyMessage,
}: {
  activities: typeof ACTIVITY_DEFINITIONS[string][];
  completionMap: Map<string, number>;
  emptyMessage: string;
}) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-10 text-[var(--era-text)]/40">
        <p className="text-base">{emptyMessage}</p>
        <p className="text-xs mt-2">Unlock heroes through events to begin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.map((def) => (
        <MobileActivityCard
          key={def.key}
          activityKey={def.key}
          timesCompleted={completionMap.get(def.key) ?? 0}
        />
      ))}
    </div>
  );
}

function MobileHeroList({
  heroes,
  currentEra,
  busyHeroKeys,
  activeActivities,
  discoveredHeroKeys,
}: {
  heroes: import('@foundation/shared').HeroState[];
  currentEra: Era;
  busyHeroKeys: Set<string>;
  activeActivities: import('@foundation/shared').ActiveActivity[];
  discoveredHeroKeys: Set<string>;
}) {
  // Show heroes for current era and below
  const visibleHeroes = heroes.filter((h) => {
    const def = HERO_DEFINITIONS[h.heroKey];
    return def && def.era <= currentEra;
  });

  if (visibleHeroes.length === 0) {
    return (
      <div className="text-center py-10 text-[var(--era-text)]/40">
        <p className="text-base">No heroes discovered yet.</p>
        <p className="text-xs mt-2">Play through story events to unlock heroes.</p>
      </div>
    );
  }

  // Group by era
  const groups = new Map<Era, typeof visibleHeroes>();
  for (const hero of visibleHeroes) {
    const def = HERO_DEFINITIONS[hero.heroKey];
    if (!def) continue;
    const list = groups.get(def.era) ?? [];
    list.push(hero);
    groups.set(def.era, list);
  }

  return (
    <div className="space-y-5">
      {Array.from(groups.entries()).map(([era, heroList]) => {
        const eraDef = ERA_DEFINITIONS[era];
        return (
          <section key={era}>
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: eraDef.themeColors.primary }}
              >
                Era {era}: {eraDef.name}
              </h3>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: `${eraDef.themeColors.primary}30` }}
              />
            </div>
            <div className="space-y-2">
              {heroList.map((hero) => {
                const activity = activeActivities.find((a) => a.heroKey === hero.heroKey);
                return (
                  <MobileHeroCard
                    key={hero.heroKey}
                    heroState={hero}
                    isBusy={busyHeroKeys.has(hero.heroKey)}
                    assignedActivity={activity?.activityKey}
                    isPreviousEra={era < currentEra}
                    wasDiscovered={discoveredHeroKeys.has(hero.heroKey)}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
