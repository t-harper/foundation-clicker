import React, { useState, useEffect, useMemo } from 'react';
import type { GameState } from '@foundation/shared';
import {
  BUILDING_DEFINITIONS,
  UPGRADE_DEFINITIONS,
  ACHIEVEMENT_DEFINITIONS,
  HERO_DEFINITIONS,
  ERA_DEFINITIONS,
  Era,
} from '@foundation/shared';
import { TabGroup } from '../common';
import {
  getAdminUserState,
  setUserResources,
  setUserEra,
  setUserPrestige,
  setUserBuilding,
  setUserUpgrade,
  deleteUserShip,
  grantUserAchievement,
  revokeUserAchievement,
  grantUserHero,
  revokeUserHero,
  cancelUserActivity,
} from '../../api/admin';

interface UserDetailTabProps {
  userId: number;
  username: string;
  onBack: () => void;
}

const SUB_TABS = [
  { key: 'resources', label: 'Resources' },
  { key: 'prestige', label: 'Prestige' },
  { key: 'buildings', label: 'Buildings' },
  { key: 'upgrades', label: 'Upgrades' },
  { key: 'ships', label: 'Ships' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'research', label: 'Research' },
];

export function UserDetailTab({ userId, username, onBack }: UserDetailTabProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [subTab, setSubTab] = useState('resources');

  async function loadState() {
    try {
      setLoading(true);
      const s = await getAdminUserState(userId);
      setState(s);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load state');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadState(); }, [userId]);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 2000);
  };

  if (loading || !state) {
    return (
      <div className="text-center py-12 text-[var(--era-text)]/40">
        <p className="animate-pulse">Loading user state...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} className="px-3 py-1.5 rounded text-sm bg-[var(--era-surface)]/30 hover:bg-[var(--era-surface)]/50 transition-colors">
          Back
        </button>
        <h3 className="text-lg font-semibold">
          {username} <span className="text-[var(--era-text)]/40 text-sm font-normal">#{userId}</span>
        </h3>
      </div>

      {error && (
        <div className="px-4 py-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
          <button type="button" onClick={() => setError(null)} className="ml-2 underline">dismiss</button>
        </div>
      )}
      {success && (
        <div className="px-4 py-2 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          {success}
        </div>
      )}

      <TabGroup tabs={SUB_TABS} activeTab={subTab} onTabChange={setSubTab} />

      <div className="mt-4">
        {subTab === 'resources' && (
          <ResourcesEditor
            state={state}
            userId={userId}
            onSave={() => { showSuccess('Resources updated'); void loadState(); }}
            onError={setError}
          />
        )}
        {subTab === 'prestige' && (
          <PrestigeEditor
            state={state}
            userId={userId}
            onSave={() => { showSuccess('Prestige updated'); void loadState(); }}
            onError={setError}
          />
        )}
        {subTab === 'buildings' && (
          <BuildingsEditor
            state={state}
            userId={userId}
            onSave={() => { showSuccess('Building updated'); void loadState(); }}
            onError={setError}
          />
        )}
        {subTab === 'upgrades' && (
          <UpgradesEditor
            state={state}
            userId={userId}
            onSave={() => { showSuccess('Upgrade updated'); void loadState(); }}
            onError={setError}
          />
        )}
        {subTab === 'ships' && (
          <ShipsEditor
            state={state}
            userId={userId}
            onSave={() => { showSuccess('Ship deleted'); void loadState(); }}
            onError={setError}
          />
        )}
        {subTab === 'achievements' && (
          <AchievementsEditor
            state={state}
            userId={userId}
            onSave={() => { showSuccess('Achievement updated'); void loadState(); }}
            onError={setError}
          />
        )}
        {subTab === 'research' && (
          <ResearchEditor
            state={state}
            userId={userId}
            onSave={() => { showSuccess('Updated'); void loadState(); }}
            onError={setError}
          />
        )}
      </div>
    </div>
  );
}

// --- Sub-editors ---

function ResourcesEditor({ state, userId, onSave, onError }: {
  state: GameState; userId: number; onSave: () => void; onError: (e: string) => void;
}) {
  const [credits, setCredits] = useState(state.resources.credits);
  const [knowledge, setKnowledge] = useState(state.resources.knowledge);
  const [influence, setInfluence] = useState(state.resources.influence);
  const [nuclearTech, setNuclearTech] = useState(state.resources.nuclearTech);
  const [rawMaterials, setRawMaterials] = useState(state.resources.rawMaterials);
  const [era, setEra] = useState(state.currentEra);

  useEffect(() => {
    setCredits(state.resources.credits);
    setKnowledge(state.resources.knowledge);
    setInfluence(state.resources.influence);
    setNuclearTech(state.resources.nuclearTech);
    setRawMaterials(state.resources.rawMaterials);
    setEra(state.currentEra);
  }, [state]);

  const handleSave = async () => {
    try {
      await setUserResources(userId, { credits, knowledge, influence, nuclearTech, rawMaterials });
      await setUserEra(userId, era);
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const fields = [
    { label: 'Credits', value: credits, set: setCredits },
    { label: 'Knowledge', value: knowledge, set: setKnowledge },
    { label: 'Influence', value: influence, set: setInfluence },
    { label: 'Nuclear Tech', value: nuclearTech, set: setNuclearTech },
    { label: 'Raw Materials', value: rawMaterials, set: setRawMaterials },
  ];

  return (
    <div className="space-y-4 max-w-lg">
      {fields.map((f) => (
        <div key={f.label} className="flex items-center gap-3">
          <label className="w-32 text-sm text-[var(--era-text)]/60">{f.label}</label>
          <input
            type="number"
            value={f.value}
            onChange={(e) => f.set(Number(e.target.value))}
            className="flex-1 px-3 py-1.5 rounded bg-white border border-[var(--era-surface)]/30 text-black text-sm"
          />
        </div>
      ))}
      <div className="flex items-center gap-3">
        <label className="w-32 text-sm text-[var(--era-text)]/60">Era</label>
        <select
          value={era}
          onChange={(e) => setEra(Number(e.target.value))}
          className="flex-1 px-3 py-1.5 rounded bg-white border border-[var(--era-surface)]/30 text-black text-sm"
        >
          {[0, 1, 2, 3].map((e) => (
            <option key={e} value={e}>{ERA_DEFINITIONS[e as Era]?.name ?? `Era ${e}`}</option>
          ))}
        </select>
      </div>
      <button type="button" onClick={handleSave} className="px-4 py-2 rounded bg-[var(--era-accent)] text-[var(--era-bg)] font-semibold text-sm hover:opacity-90 transition-opacity">
        Save Resources
      </button>
    </div>
  );
}

function PrestigeEditor({ state, userId, onSave, onError }: {
  state: GameState; userId: number; onSave: () => void; onError: (e: string) => void;
}) {
  const [seldonPoints, setSeldonPoints] = useState(state.prestige.seldonPoints);
  const [totalSeldonPoints, setTotalSeldonPoints] = useState(state.prestige.totalSeldonPoints);
  const [prestigeCount, setPrestigeCount] = useState(state.prestige.prestigeCount);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(state.prestige.prestigeMultiplier);

  useEffect(() => {
    setSeldonPoints(state.prestige.seldonPoints);
    setTotalSeldonPoints(state.prestige.totalSeldonPoints);
    setPrestigeCount(state.prestige.prestigeCount);
    setPrestigeMultiplier(state.prestige.prestigeMultiplier);
  }, [state]);

  const handleSave = async () => {
    try {
      await setUserPrestige(userId, { seldonPoints, totalSeldonPoints, prestigeCount, prestigeMultiplier });
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const fields = [
    { label: 'Seldon Points', value: seldonPoints, set: setSeldonPoints },
    { label: 'Total SP', value: totalSeldonPoints, set: setTotalSeldonPoints },
    { label: 'Prestige Count', value: prestigeCount, set: setPrestigeCount },
    { label: 'Multiplier', value: prestigeMultiplier, set: setPrestigeMultiplier, step: 0.01 },
  ];

  return (
    <div className="space-y-4 max-w-lg">
      {fields.map((f) => (
        <div key={f.label} className="flex items-center gap-3">
          <label className="w-32 text-sm text-[var(--era-text)]/60">{f.label}</label>
          <input
            type="number"
            value={f.value}
            step={f.step ?? 1}
            onChange={(e) => f.set(Number(e.target.value))}
            className="flex-1 px-3 py-1.5 rounded bg-white border border-[var(--era-surface)]/30 text-black text-sm"
          />
        </div>
      ))}
      <button type="button" onClick={handleSave} className="px-4 py-2 rounded bg-[var(--era-accent)] text-[var(--era-bg)] font-semibold text-sm hover:opacity-90 transition-opacity">
        Save Prestige
      </button>
    </div>
  );
}

function BuildingsEditor({ state, userId, onSave, onError }: {
  state: GameState; userId: number; onSave: () => void; onError: (e: string) => void;
}) {
  const buildingsByEra = useMemo(() => {
    const groups = new Map<number, typeof state.buildings>();
    for (const b of state.buildings) {
      const def = BUILDING_DEFINITIONS[b.buildingKey];
      if (!def) continue;
      const list = groups.get(def.era) ?? [];
      list.push(b);
      groups.set(def.era, list);
    }
    return groups;
  }, [state.buildings]);

  const handleChange = async (buildingKey: string, count: number) => {
    try {
      await setUserBuilding(userId, buildingKey, Math.max(0, count));
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  return (
    <div className="space-y-6">
      {Array.from(buildingsByEra.entries()).sort(([a], [b]) => a - b).map(([era, buildings]) => (
        <section key={era}>
          <h4 className="text-sm font-semibold tracking-wide uppercase text-[var(--era-text)]/50 mb-2">
            Era {era}: {ERA_DEFINITIONS[era as Era]?.name}
          </h4>
          <div className="grid gap-1">
            {buildings.map((b) => {
              const def = BUILDING_DEFINITIONS[b.buildingKey];
              return (
                <div key={b.buildingKey} className="flex items-center gap-3 py-1">
                  <span className="w-48 text-sm truncate" title={def?.name}>{def?.name ?? b.buildingKey}</span>
                  <input
                    type="number"
                    defaultValue={b.count}
                    min={0}
                    onBlur={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v) && v !== b.count) handleChange(b.buildingKey, v);
                    }}
                    className="w-24 px-2 py-1 rounded bg-white border border-[var(--era-surface)]/30 text-black text-sm"
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function UpgradesEditor({ state, userId, onSave, onError }: {
  state: GameState; userId: number; onSave: () => void; onError: (e: string) => void;
}) {
  const [filter, setFilter] = useState('');

  const upgradesByEra = useMemo(() => {
    const groups = new Map<number, typeof state.upgrades>();
    const lf = filter.toLowerCase();
    for (const u of state.upgrades) {
      const def = UPGRADE_DEFINITIONS[u.upgradeKey];
      if (!def) continue;
      if (lf && !def.name.toLowerCase().includes(lf) && !u.upgradeKey.toLowerCase().includes(lf)) continue;
      const list = groups.get(def.era) ?? [];
      list.push(u);
      groups.set(def.era, list);
    }
    return groups;
  }, [state.upgrades, filter]);

  const handleToggle = async (upgradeKey: string, isPurchased: boolean) => {
    try {
      await setUserUpgrade(userId, upgradeKey, isPurchased);
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search upgrades..."
        className="w-full max-w-sm px-3 py-1.5 rounded bg-white border border-[var(--era-surface)]/30 text-black text-sm placeholder-gray-400"
      />
      {Array.from(upgradesByEra.entries()).sort(([a], [b]) => a - b).map(([era, upgrades]) => (
        <section key={era}>
          <h4 className="text-sm font-semibold tracking-wide uppercase text-[var(--era-text)]/50 mb-2">
            Era {era}: {ERA_DEFINITIONS[era as Era]?.name}
          </h4>
          <div className="grid gap-1">
            {upgrades.map((u) => {
              const def = UPGRADE_DEFINITIONS[u.upgradeKey];
              return (
                <label key={u.upgradeKey} className="flex items-center gap-3 py-1 cursor-pointer hover:bg-[var(--era-surface)]/10 rounded px-1">
                  <input
                    type="checkbox"
                    checked={u.isPurchased}
                    onChange={(e) => handleToggle(u.upgradeKey, e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">{def?.name ?? u.upgradeKey}</span>
                </label>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function ShipsEditor({ state, userId, onSave, onError }: {
  state: GameState; userId: number; onSave: () => void; onError: (e: string) => void;
}) {
  const handleDelete = async (shipId: string) => {
    try {
      await deleteUserShip(userId, shipId);
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to delete ship');
    }
  };

  if (state.ships.length === 0) {
    return <p className="text-sm text-[var(--era-text)]/40">No ships.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--era-surface)]/30">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--era-surface)]/30 bg-[var(--era-surface)]/10">
            <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">Name</th>
            <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">Type</th>
            <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">Status</th>
            <th className="text-right px-3 py-2 font-medium text-[var(--era-text)]/60">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.ships.map((ship) => (
            <tr key={ship.id} className="border-b border-[var(--era-surface)]/10">
              <td className="px-3 py-2">{ship.name}</td>
              <td className="px-3 py-2 text-[var(--era-text)]/60">{ship.shipType}</td>
              <td className="px-3 py-2 text-[var(--era-text)]/60">{ship.status}</td>
              <td className="px-3 py-2 text-right">
                <button
                  type="button"
                  onClick={() => handleDelete(ship.id)}
                  className="px-2 py-1 rounded text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AchievementsEditor({ state, userId, onSave, onError }: {
  state: GameState; userId: number; onSave: () => void; onError: (e: string) => void;
}) {
  const achievementMap = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const a of state.achievements) {
      map.set(a.achievementKey, a.unlockedAt !== null);
    }
    return map;
  }, [state.achievements]);

  const handleToggle = async (key: string, grant: boolean) => {
    try {
      if (grant) {
        await grantUserAchievement(userId, key);
      } else {
        await revokeUserAchievement(userId, key);
      }
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to update achievement');
    }
  };

  const allKeys = Object.keys(ACHIEVEMENT_DEFINITIONS);

  return (
    <div className="grid gap-1">
      {allKeys.map((key) => {
        const def = ACHIEVEMENT_DEFINITIONS[key];
        const unlocked = achievementMap.get(key) ?? false;
        return (
          <label key={key} className="flex items-center gap-3 py-1 cursor-pointer hover:bg-[var(--era-surface)]/10 rounded px-1">
            <input
              type="checkbox"
              checked={unlocked}
              onChange={(e) => handleToggle(key, e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">{def?.name ?? key}</span>
            <span className="text-xs text-[var(--era-text)]/30">{def?.description}</span>
          </label>
        );
      })}
    </div>
  );
}

function ResearchEditor({ state, userId, onSave, onError }: {
  state: GameState; userId: number; onSave: () => void; onError: (e: string) => void;
}) {
  const heroMap = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const h of state.heroes) {
      map.set(h.heroKey, h.unlockedAt !== null);
    }
    return map;
  }, [state.heroes]);

  const handleHeroToggle = async (key: string, grant: boolean) => {
    try {
      if (grant) {
        await grantUserHero(userId, key);
      } else {
        await revokeUserHero(userId, key);
      }
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to update hero');
    }
  };

  const handleCancelActivity = async (activityKey: string) => {
    try {
      await cancelUserActivity(userId, activityKey);
      onSave();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to cancel activity');
    }
  };

  const allHeroKeys = Object.keys(HERO_DEFINITIONS);

  return (
    <div className="space-y-6">
      <section>
        <h4 className="text-sm font-semibold tracking-wide uppercase text-[var(--era-text)]/50 mb-2">Heroes</h4>
        <div className="grid gap-1">
          {allHeroKeys.map((key) => {
            const def = HERO_DEFINITIONS[key];
            const unlocked = heroMap.get(key) ?? false;
            return (
              <label key={key} className="flex items-center gap-3 py-1 cursor-pointer hover:bg-[var(--era-surface)]/10 rounded px-1">
                <input
                  type="checkbox"
                  checked={unlocked}
                  onChange={(e) => handleHeroToggle(key, e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">{def?.name ?? key}</span>
                <span className="text-xs text-[var(--era-text)]/30">{def?.title}</span>
              </label>
            );
          })}
        </div>
      </section>

      {state.activeActivities.length > 0 && (
        <section>
          <h4 className="text-sm font-semibold tracking-wide uppercase text-[var(--era-text)]/50 mb-2">Active Activities</h4>
          <div className="grid gap-2">
            {state.activeActivities.map((a) => (
              <div key={a.activityKey} className="flex items-center justify-between py-2 px-3 rounded bg-[var(--era-surface)]/10 border border-[var(--era-surface)]/20">
                <div>
                  <span className="text-sm font-medium">{a.activityKey}</span>
                  <span className="text-xs text-[var(--era-text)]/40 ml-2">Hero: {a.heroKey}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCancelActivity(a.activityKey)}
                  className="px-2 py-1 rounded text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
