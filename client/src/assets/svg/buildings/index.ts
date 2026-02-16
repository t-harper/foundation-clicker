import React from 'react';
import type { BuildingKey } from '@foundation/shared';

// Era 0: Religious Dominance
import { SurvivalShelterArt } from './SurvivalShelterArt';
import { WaterReclamatorArt } from './WaterReclamatorArt';
import { HydroponicsFarmArt } from './HydroponicsFarmArt';
import { MiningOutpostArt } from './MiningOutpostArt';
import { SolarArrayArt } from './SolarArrayArt';
import { ResearchLabArt } from './ResearchLabArt';
import { SteelFoundryArt } from './SteelFoundryArt';
import { NuclearPlantArt } from './NuclearPlantArt';
import { EncyclopediaCenterArt } from './EncyclopediaCenterArt';
import { FabricationShopArt } from './FabricationShopArt';
import { MissionaryChapelArt } from './MissionaryChapelArt';
import { HoloTempleArt } from './HoloTempleArt';
import { AtomicForgeArt } from './AtomicForgeArt';
import { CathedralOfScienceArt } from './CathedralOfScienceArt';

// Era 1: Trading Expansion
import { TradingPostArt } from './TradingPostArt';
import { ManufacturingPlantArt } from './ManufacturingPlantArt';
import { CargoWarehouseArt } from './CargoWarehouseArt';
import { FoundationBankArt } from './FoundationBankArt';
import { ShipyardArt } from './ShipyardArt';
import { CommodityExchangeArt } from './CommodityExchangeArt';
import { RefineryComplexArt } from './RefineryComplexArt';
import { MerchantHubArt } from './MerchantHubArt';
import { NavigatorsAcademyArt } from './NavigatorsAcademyArt';
import { TradeEmbassyArt } from './TradeEmbassyArt';
import { WeaponsFactoryArt } from './WeaponsFactoryArt';
import { FreighterDocksArt } from './FreighterDocksArt';
import { MallowTradingHouseArt } from './MallowTradingHouseArt';
import { GalacticBourseArt } from './GalacticBourseArt';

// Era 2: Psychological Influence
import { PsychohistoryInstituteArt } from './PsychohistoryInstituteArt';
import { EmotionalAdjustmentCenterArt } from './EmotionalAdjustmentCenterArt';
import { MentalicsAcademyArt } from './MentalicsAcademyArt';
import { AuraManufactoryArt } from './AuraManufactoryArt';
import { PrimeRadiantVaultArt } from './PrimeRadiantVaultArt';
import { PropagandaNetworkArt } from './PropagandaNetworkArt';
import { DreamProbeLabArt } from './DreamProbeLabArt';
import { ImperialArchiveArt } from './ImperialArchiveArt';
import { ShieldGeneratorArt } from './ShieldGeneratorArt';
import { ConversionChamberArt } from './ConversionChamberArt';
import { SpeakersSanctumArt } from './SpeakersSanctumArt';
import { MindShieldArrayArt } from './MindShieldArrayArt';
import { WhisperShipHangarArt } from './WhisperShipHangarArt';
import { SecondFoundationRetreatArt } from './SecondFoundationRetreatArt';

// Era 3: Galactic Reunification
import { GraviticPlantArt } from './GraviticPlantArt';
import { GaianBiosphereArt } from './GaianBiosphereArt';
import { GraviticFoundryArt } from './GraviticFoundryArt';
import { ConsciousnessAmplifierArt } from './ConsciousnessAmplifierArt';
import { TerraformingEngineArt } from './TerraformingEngineArt';
import { GalaxiaBeaconArt } from './GalaxiaBeaconArt';
import { StellarHarvesterArt } from './StellarHarvesterArt';
import { RobotArchivesArt } from './RobotArchivesArt';
import { WormholeNexusArt } from './WormholeNexusArt';
import { GalacticSenateArt } from './GalacticSenateArt';
import { SingularityForgeArt } from './SingularityForgeArt';
import { GalaxiaCoreArt } from './GalaxiaCoreArt';
import { FoundationHeadquartersArt } from './FoundationHeadquartersArt';
import { EternityEngineArt } from './EternityEngineArt';

import { GenericBuildingArt } from './GenericBuildingArt';

// Re-exports
export { SurvivalShelterArt } from './SurvivalShelterArt';
export { WaterReclamatorArt } from './WaterReclamatorArt';
export { HydroponicsFarmArt } from './HydroponicsFarmArt';
export { MiningOutpostArt } from './MiningOutpostArt';
export { SolarArrayArt } from './SolarArrayArt';
export { ResearchLabArt } from './ResearchLabArt';
export { SteelFoundryArt } from './SteelFoundryArt';
export { NuclearPlantArt } from './NuclearPlantArt';
export { EncyclopediaCenterArt } from './EncyclopediaCenterArt';
export { FabricationShopArt } from './FabricationShopArt';
export { MissionaryChapelArt } from './MissionaryChapelArt';
export { HoloTempleArt } from './HoloTempleArt';
export { AtomicForgeArt } from './AtomicForgeArt';
export { CathedralOfScienceArt } from './CathedralOfScienceArt';
export { TradingPostArt } from './TradingPostArt';
export { ManufacturingPlantArt } from './ManufacturingPlantArt';
export { CargoWarehouseArt } from './CargoWarehouseArt';
export { FoundationBankArt } from './FoundationBankArt';
export { ShipyardArt } from './ShipyardArt';
export { CommodityExchangeArt } from './CommodityExchangeArt';
export { RefineryComplexArt } from './RefineryComplexArt';
export { MerchantHubArt } from './MerchantHubArt';
export { NavigatorsAcademyArt } from './NavigatorsAcademyArt';
export { TradeEmbassyArt } from './TradeEmbassyArt';
export { WeaponsFactoryArt } from './WeaponsFactoryArt';
export { FreighterDocksArt } from './FreighterDocksArt';
export { MallowTradingHouseArt } from './MallowTradingHouseArt';
export { GalacticBourseArt } from './GalacticBourseArt';
export { PsychohistoryInstituteArt } from './PsychohistoryInstituteArt';
export { EmotionalAdjustmentCenterArt } from './EmotionalAdjustmentCenterArt';
export { MentalicsAcademyArt } from './MentalicsAcademyArt';
export { AuraManufactoryArt } from './AuraManufactoryArt';
export { PrimeRadiantVaultArt } from './PrimeRadiantVaultArt';
export { PropagandaNetworkArt } from './PropagandaNetworkArt';
export { DreamProbeLabArt } from './DreamProbeLabArt';
export { ImperialArchiveArt } from './ImperialArchiveArt';
export { ShieldGeneratorArt } from './ShieldGeneratorArt';
export { ConversionChamberArt } from './ConversionChamberArt';
export { SpeakersSanctumArt } from './SpeakersSanctumArt';
export { MindShieldArrayArt } from './MindShieldArrayArt';
export { WhisperShipHangarArt } from './WhisperShipHangarArt';
export { SecondFoundationRetreatArt } from './SecondFoundationRetreatArt';
export { GraviticPlantArt } from './GraviticPlantArt';
export { GaianBiosphereArt } from './GaianBiosphereArt';
export { GraviticFoundryArt } from './GraviticFoundryArt';
export { ConsciousnessAmplifierArt } from './ConsciousnessAmplifierArt';
export { TerraformingEngineArt } from './TerraformingEngineArt';
export { GalaxiaBeaconArt } from './GalaxiaBeaconArt';
export { StellarHarvesterArt } from './StellarHarvesterArt';
export { RobotArchivesArt } from './RobotArchivesArt';
export { WormholeNexusArt } from './WormholeNexusArt';
export { GalacticSenateArt } from './GalacticSenateArt';
export { SingularityForgeArt } from './SingularityForgeArt';
export { GalaxiaCoreArt } from './GalaxiaCoreArt';
export { FoundationHeadquartersArt } from './FoundationHeadquartersArt';
export { EternityEngineArt } from './EternityEngineArt';
export { GenericBuildingArt } from './GenericBuildingArt';

// Legacy re-exports for any external usage
export { VaultOfKnowledgeArt } from './VaultOfKnowledgeArt';
export { HyperspaceRelayArt } from './HyperspaceRelayArt';

type BuildingArtComponent = React.FC<{ className?: string; size?: number; level?: 1 | 2 | 3 }>;

export const BUILDING_ART_MAP: Record<BuildingKey, BuildingArtComponent> = {
  // Era 0: Religious Dominance
  survivalShelter: SurvivalShelterArt,
  waterReclamator: WaterReclamatorArt,
  hydroponicsFarm: HydroponicsFarmArt,
  miningOutpost: MiningOutpostArt,
  solarArray: SolarArrayArt,
  researchStation: ResearchLabArt,
  steelFoundry: SteelFoundryArt,
  nuclearReactor: NuclearPlantArt,
  encyclopediaArchive: EncyclopediaCenterArt,
  fabricationShop: FabricationShopArt,
  missionaryChapel: MissionaryChapelArt,
  holoTemple: HoloTempleArt,
  atomicForge: AtomicForgeArt,
  cathedralOfScience: CathedralOfScienceArt,
  // Era 1: Trading Expansion
  tradingPost: TradingPostArt,
  manufacturingPlant: ManufacturingPlantArt,
  cargoWarehouse: CargoWarehouseArt,
  foundationBank: FoundationBankArt,
  orbitalShipyard: ShipyardArt,
  commodityExchange: CommodityExchangeArt,
  refineryComplex: RefineryComplexArt,
  merchantGuildHall: MerchantHubArt,
  navigatorsAcademy: NavigatorsAcademyArt,
  tradeEmbassy: TradeEmbassyArt,
  weaponsFactory: WeaponsFactoryArt,
  freighterDocks: FreighterDocksArt,
  mallowTradingHouse: MallowTradingHouseArt,
  galacticBourse: GalacticBourseArt,
  // Era 2: Psychological Influence
  psychohistoryLab: PsychohistoryInstituteArt,
  emotionalAdjustmentCenter: EmotionalAdjustmentCenterArt,
  mentalicsAcademy: MentalicsAcademyArt,
  auraManufactory: AuraManufactoryArt,
  primeRadiantVault: PrimeRadiantVaultArt,
  propagandaNetwork: PropagandaNetworkArt,
  dreamProbeLab: DreamProbeLabArt,
  imperialArchive: ImperialArchiveArt,
  shieldGenerator: ShieldGeneratorArt,
  conversionChamber: ConversionChamberArt,
  speakersSanctum: SpeakersSanctumArt,
  mindShieldArray: MindShieldArrayArt,
  whisperShipHangar: WhisperShipHangarArt,
  secondFoundationRetreat: SecondFoundationRetreatArt,
  // Era 3: Galactic Reunification
  graviticPlant: GraviticPlantArt,
  gaianBiosphere: GaianBiosphereArt,
  graviticFoundry: GraviticFoundryArt,
  consciousnessAmplifier: ConsciousnessAmplifierArt,
  terraformingEngine: TerraformingEngineArt,
  galaxiaBeacon: GalaxiaBeaconArt,
  stellarHarvester: StellarHarvesterArt,
  robotArchives: RobotArchivesArt,
  wormholeNexus: WormholeNexusArt,
  galacticSenate: GalacticSenateArt,
  singularityForge: SingularityForgeArt,
  galaxiaCore: GalaxiaCoreArt,
  foundationHeadquarters: FoundationHeadquartersArt,
  eternityEngine: EternityEngineArt,
};
