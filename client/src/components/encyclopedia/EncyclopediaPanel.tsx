import React, { useState } from 'react';
import { useGameStore } from '../../store';
import { ERA_DEFINITIONS, BUILDING_DEFINITIONS, Era } from '@foundation/shared';
import type { BuildingKey } from '@foundation/shared';
import { TabGroup } from '../common';

type EncyclopediaSection = 'about' | 'eras' | 'buildings' | 'figures';

const TABS = [
  { key: 'about', label: 'About the Foundation' },
  { key: 'eras', label: 'Eras' },
  { key: 'buildings', label: 'Buildings' },
  { key: 'figures', label: 'Key Figures' },
];

function AboutSection() {
  return (
    <div className="prose prose-sm max-w-none space-y-4 text-[var(--era-text)]/80">
      <h3 className="text-lg font-display font-semibold text-[var(--era-primary)]">
        The Foundation
      </h3>
      <p>
        The Foundation was established by Hari Seldon at the edge of the Galaxy on the
        planet Terminus. Ostensibly created to compile an Encyclopedia Galactica that
        would preserve all human knowledge, the true purpose of the Foundation was far
        greater: to serve as the nucleus of a Second Galactic Empire, reducing the
        inevitable period of barbarism from thirty thousand years to a mere one thousand.
      </p>
      <p>
        Using the mathematical science of psychohistory, Seldon predicted the fall of
        the Galactic Empire and set in motion a plan to guide humanity through the
        coming dark age. The Foundation, armed with superior technology and guided by
        the Seldon Plan, would grow from a small colony into a power capable of
        unifying the Galaxy once more.
      </p>
      <h4 className="text-md font-semibold text-[var(--era-primary)] mt-6">
        The Seldon Plan
      </h4>
      <p>
        At key moments in history, known as Seldon Crises, holographic recordings of
        Hari Seldon would appear in the Time Vault on Terminus to reassure the
        Foundation that events were proceeding according to plan. Each crisis forced
        the Foundation to evolve, adopting new strategies for survival and growth.
      </p>
      <p>
        The Plan accounts for the aggregate behavior of large populations, making it
        possible to predict the broad sweep of future history -- though not the actions
        of individuals. This mathematical certainty is the Foundation's greatest asset
        and most closely guarded secret.
      </p>
      <h4 className="text-md font-semibold text-[var(--era-primary)] mt-6">
        The Encyclopedia Galactica
      </h4>
      <p>
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
    <div className="space-y-6">
      {Object.values(ERA_DEFINITIONS).map((eraDef) => {
        const isActive = eraDef.era === currentEra;
        const isLocked = eraDef.era > currentEra;

        return (
          <div
            key={eraDef.era}
            className={[
              'p-4 rounded-lg border',
              isActive
                ? 'border-[var(--era-accent)]/30 bg-[var(--era-accent)]/5'
                : isLocked
                  ? 'border-[var(--era-surface)] bg-[var(--era-surface)]/10 opacity-50'
                  : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/20',
            ].join(' ')}
          >
            <div className="flex items-center gap-3 mb-2">
              <h3
                className="text-md font-semibold"
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
            <p className="text-sm text-[var(--era-text)]/60 mb-2">
              {eraDef.description}
            </p>
            <p className="text-xs text-[var(--era-text)]/40">
              Unlock: {eraDef.unlockCondition}
            </p>
            {/* Theme color preview */}
            <div className="flex gap-2 mt-3">
              {Object.entries(eraDef.themeColors).map(([name, color]) => (
                <div key={name} className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 h-6 rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[9px] text-[var(--era-text)]/30">{name}</span>
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
    <div className="space-y-6">
      {Object.entries(buildingsByEra).map(([era, buildings]) => {
        const eraNum = Number(era) as Era;
        const eraDef = ERA_DEFINITIONS[eraNum];
        const isLocked = eraNum > currentEra;

        return (
          <div key={era}>
            <h3
              className="text-sm font-semibold tracking-wide uppercase mb-3"
              style={{ color: eraDef.themeColors.primary }}
            >
              Era {era}: {eraDef.name}
            </h3>
            <div className="grid gap-3">
              {buildings.map((building) => (
                <div
                  key={building.key}
                  className={[
                    'p-3 rounded-md border',
                    isLocked
                      ? 'border-[var(--era-surface)] bg-[var(--era-surface)]/10 opacity-40'
                      : 'border-[var(--era-primary)]/15 bg-[var(--era-surface)]/20',
                  ].join(' ')}
                >
                  <h4 className="text-sm font-semibold text-[var(--era-text)] mb-1">
                    {isLocked ? '???' : building.name}
                  </h4>
                  <p className="text-xs text-[var(--era-text)]/50">
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
  return (
    <div className="space-y-6 text-[var(--era-text)]/80">
      {[
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
      ].map((figure) => (
        <div
          key={figure.name}
          className="p-4 rounded-lg border border-[var(--era-primary)]/15 bg-[var(--era-surface)]/20"
        >
          <h4 className="text-sm font-semibold text-[var(--era-primary)]">
            {figure.name}
          </h4>
          <span className="text-[11px] text-[var(--era-accent)] italic">
            {figure.role}
          </span>
          <p className="text-xs text-[var(--era-text)]/60 mt-2">
            {figure.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function EncyclopediaPanel() {
  const [activeSection, setActiveSection] = useState<EncyclopediaSection>('about');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Encyclopedia Galactica
        </h2>
        <p className="text-sm text-[var(--era-text)]/50 mt-1">
          The collected knowledge of the Foundation.
        </p>
      </div>

      {/* Section tabs */}
      <TabGroup
        tabs={TABS}
        activeTab={activeSection}
        onTabChange={(key) => setActiveSection(key as EncyclopediaSection)}
      />

      {/* Section content */}
      <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'eras' && <ErasSection />}
        {activeSection === 'buildings' && <BuildingsSection />}
        {activeSection === 'figures' && <FiguresSection />}
      </div>
    </div>
  );
}
