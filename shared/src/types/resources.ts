export type ResourceKey = 'credits' | 'knowledge' | 'influence' | 'nuclearTech' | 'rawMaterials';

export interface Resources {
  credits: number;
  knowledge: number;
  influence: number;
  nuclearTech: number;
  rawMaterials: number;
}

export interface ResourceRate {
  resource: ResourceKey;
  amount: number;
}

export const EMPTY_RESOURCES: Resources = {
  credits: 0,
  knowledge: 0,
  influence: 0,
  nuclearTech: 0,
  rawMaterials: 0,
};
