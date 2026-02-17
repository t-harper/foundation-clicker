import React, { useState } from 'react';
import { useGameStore } from '@desktop/store';
import { ERA_DEFINITIONS, BUILDING_DEFINITIONS, Era } from '@foundation/shared';
import type { BuildingKey } from '@foundation/shared';

type EncyclopediaSection = 'about' | 'eras' | 'buildings' | 'figures';

const TABS: { key: EncyclopediaSection; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'eras', label: 'Eras' },
  { key: 'buildings', label: 'Buildings' },
  { key: 'figures', label: 'Figures' },
];

function AboutSection() {
  return (
    <div className="space-y-4 text-[var(--era-text)]/80">
      <h3 className="text-base font-display font-semibold text-[var(--era-primary)]">
        The Foundation
      </h3>
      <p className="text-sm leading-relaxed">
        The Foundation was established by Hari Seldon at the edge of the Galaxy on the
        planet Terminus. Ostensibly created to compile an Encyclopedia Galactica that
        would preserve all human knowledge, the true purpose of the Foundation was far
        greater: to serve as the nucleus of a Second Galactic Empire, reducing the
        inevitable period of barbarism from thirty thousand years to a mere one thousand.
      </p>
      <p className="text-sm leading-relaxed">
        Using the mathematical science of psychohistory, Seldon predicted the fall of
        the Galactic Empire and set in motion a plan to guide humanity through the
        coming dark age. The Foundation, armed with superior technology and guided by
        the Seldon Plan, would grow from a small colony into a power capable of
        unifying the Galaxy once more.
      </p>
      <h4 className="text-sm font-semibold text-[var(--era-primary)] mt-5">
        The Seldon Plan
      </h4>
      <p className="text-sm leading-relaxed">
        At key moments in history, known as Seldon Crises, holographic recordings of
        Hari Seldon would appear in the Time Vault on Terminus to reassure the
        Foundation that events were proceeding according to plan. Each crisis forced
        the Foundation to evolve, adopting new strategies for survival and growth.
      </p>
      <p className="text-sm leading-relaxed">
        The Plan accounts for the aggregate behavior of large populations, making it
        possible to predict the broad sweep of future history -- though not the actions
        of individuals. This mathematical certainty is the Foundation's greatest asset
        and most closely guarded secret.
      </p>
      <h4 className="text-sm font-semibold text-[var(--era-primary)] mt-5">
        The Encyclopedia Galactica
      </h4>
      <p className="text-sm leading-relaxed">
        While the Encyclopedia Galactica served as the initial cover story for the
        Foundation's existence, it ultimately became one of humanity's greatest
        intellectual achievements. Containing the sum total of human knowledge, the
        Encyclopedia has been continuously expanded and updated throughout the
        Foundation's history, serving as both a scholarly resource and a symbol of
        the Foundation's commitment to preserving civilization.
      </p>
    </div>
  );
}

function ErasSection() {
  const currentEra = useGameStore((s) => s.currentEra);

  return (
    <div className="space-y-4">
      {Object.values(ERA_DEFINITIONS).map((eraDef) => {
        const isActive = eraDef.era === currentEra;
        const isLocked = eraDef.era > currentEra;

        return (
          <div
            key={eraDef.era}
            className={[
              'p-3 rounded-lg border',
              isActive
                ? 'border-[var(--era-accent)]/30 bg-[var(--era-accent)]/5'
                : isLocked
                  ? 'border-[var(--era-surface)] bg-[var(--era-surface)]/10 opacity-50'
                  : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/20',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-sm font-semibold"
                style={{ color: eraDef.themeColors.primary }}
              >
                Era {eraDef.era}: {eraDef.name}
              </h3>
              {isActive && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--era-accent)]/15 text-[var(--era-accent)]">
                  Current
                </span>
              )}
              {isLocked && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--era-surface)] text-[var(--era-text)]/30">
                  Locked
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--era-text)]/60 mb-2 leading-relaxed">
              {eraDef.description}
            </p>
            <p className="text-[11px] text-[var(--era-text)]/40">
              Unlock: {eraDef.unlockCondition}
            </p>
            {/* Theme color preview */}
            <div className="flex gap-2 mt-3">
              {Object.entries(eraDef.themeColors).map(([name, color]) => (
                <div key={name} className="flex flex-col items-center gap-0.5">
                  <div
                    className="w-5 h-5 rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[8px] text-[var(--era-text)]/30">{name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BuildingsSection() {
  const currentEra = useGameStore((s) => s.currentEra);

  const buildingsByEra = Object.values(BUILDING_DEFINITIONS).reduce<
    Record<number, typeof BUILDING_DEFINITIONS[BuildingKey][]>
  >((acc, def) => {
    if (!acc[def.era]) acc[def.era] = [];
    acc[def.era].push(def);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      {Object.entries(buildingsByEra).map(([era, buildings]) => {
        const eraNum = Number(era) as Era;
        const eraDef = ERA_DEFINITIONS[eraNum];
        const isLocked = eraNum > currentEra;

        return (
          <div key={era}>
            <h3
              className="text-xs font-semibold tracking-wide uppercase mb-2"
              style={{ color: eraDef.themeColors.primary }}
            >
              Era {era}: {eraDef.name}
            </h3>
            <div className="space-y-2">
              {buildings.map((building) => (
                <div
                  key={building.key}
                  className={[
                    'p-3 rounded-lg border',
                    isLocked
                      ? 'border-[var(--era-surface)] bg-[var(--era-surface)]/10 opacity-40'
                      : 'border-[var(--era-primary)]/15 bg-[var(--era-surface)]/20',
                  ].join(' ')}
                >
                  <h4 className="text-sm font-semibold text-[var(--era-text)] mb-1">
                    {isLocked ? '???' : building.name}
                  </h4>
                  <p className="text-xs text-[var(--era-text)]/50 leading-relaxed">
                    {isLocked ? 'Locked - reach this era to learn more.' : building.description}
                  </p>
                  {!isLocked && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                      {building.production.map((prod) => (
                        <span key={prod.resource} className="text-[11px] text-[var(--era-accent)]">
                          +{prod.amount} {prod.resource}/s
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FiguresSection() {
  const figures = [
    {
      name: 'Hari Seldon',
      role: 'Creator of Psychohistory',
      description:
        'A mathematician of the late Galactic Empire, Seldon developed the science of psychohistory -- using mathematics to predict the large-scale behavior of human populations. He established the Foundation on Terminus and set in motion the Seldon Plan to shorten the coming dark age.',
    },
    {
      name: 'Salvor Hardin',
      role: 'First Mayor of Terminus',
      description:
        'The first great leader of the Foundation, Hardin navigated the first two Seldon Crises through diplomacy and the strategic use of technology-as-religion. His famous maxim: "Violence is the last refuge of the incompetent."',
    },
    {
      name: 'Hober Mallow',
      role: 'First of the Merchant Princes',
      description:
        'A master trader who resolved the third Seldon Crisis by demonstrating that economic control was more powerful than religious or military force. He ushered in the era of the Merchant Princes.',
    },
    {
      name: 'The Mule',
      role: 'Mutant Conqueror',
      description:
        'A mutant with the power to manipulate emotions, the Mule was the single greatest threat to the Seldon Plan. His unpredictable actions nearly destroyed the Foundation before the Second Foundation intervened.',
    },
    {
      name: 'Preem Palver',
      role: 'First Speaker of the Second Foundation',
      description:
        'The leader of the Second Foundation during its most dangerous period. Palver orchestrated the defeat of the Mule and ensured the Seldon Plan returned to its predicted course.',
    },
    {
      name: 'Golan Trevize',
      role: 'Foundation Councilman',
      description:
        'The man who made the ultimate choice regarding humanity\'s future, deciding between the Second Empire, the Seldon Plan, and Galaxia -- a unified galactic consciousness that could protect humanity from external threats.',
    },
    {
      name: 'R. Daneel Olivaw',
      role: 'The Eternal Guardian',
      description:
        'An ancient robot who guided humanity for twenty thousand years from the shadows. Daneel\'s Zeroth Law -- that a robot may not harm humanity, or through inaction allow humanity to come to harm -- drove his tireless efforts to protect civilization.',
    },
  ];

  return (
    <div className="space-y-3">
      {figures.map((figure) => (
        <div
          key={figure.name}
          className="p-3 rounded-lg border border-[var(--era-primary)]/15 bg-[var(--era-surface)]/20"
        >
          <h4 className="text-sm font-semibold text-[var(--era-primary)]">
            {figure.name}
          </h4>
          <span className="text-[11px] text-[var(--era-accent)] italic">
            {figure.role}
          </span>
          <p className="text-xs text-[var(--era-text)]/60 mt-2 leading-relaxed">
            {figure.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function MobileEncyclopediaPanel() {
  const [activeSection, setActiveSection] = useState<EncyclopediaSection>('about');

  return (
    <div className="space-y-3">
      {/* Header */}
      <div>
        <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">
          Encyclopedia Galactica
        </h2>
        <p className="text-xs text-[var(--era-text)]/50 mt-0.5">
          The collected knowledge of the Foundation.
        </p>
      </div>

      {/* Horizontal scrollable sub-tab bar */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none -mx-3 px-3 pb-1 border-b border-[var(--era-surface)]/30">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveSection(tab.key)}
            className={[
              'shrink-0 px-3 py-2 text-sm font-medium rounded-t transition-colors touch-action-manipulation',
              activeSection === tab.key
                ? 'text-[var(--era-accent)] border-b-2 border-[var(--era-accent)]'
                : 'text-[var(--era-text)]/40 active:text-[var(--era-text)]/70',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section content -- single column layout */}
      <div>
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'eras' && <ErasSection />}
        {activeSection === 'buildings' && <BuildingsSection />}
        {activeSection === 'figures' && <FiguresSection />}
      </div>
    </div>
  );
}
