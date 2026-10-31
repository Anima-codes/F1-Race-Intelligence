/**
 * Formula 1 Race Intelligence - TypeScript Type Definitions
 */

export type RegulatoryEra = 'V8 Era (2008-2013)' | 'Turbo-Hybrid Era (2014-2021)' | 'Ground Effect Era (2022-2024)';

export type CircuitType = 'Street' | 'High-Speed' | 'Technical' | 'High-Degradation' | 'Low-Degradation';

export type TyreCompound = 'Soft' | 'Medium' | 'Hard' | 'Intermediate' | 'Wet';

export type DNFCategory = 
  | 'Power Unit / Engine'
  | 'Gearbox & Transmission'
  | 'Hydraulics & Brakes'
  | 'Collision & Accident'
  | 'Suspension & Chassis'
  | 'Electrical & MGU-K'
  | 'Finished';

export interface RaceEntry {
  id: string;
  season: number;
  round: number;
  grandPrix: string;
  circuit: string;
  country: string;
  circuitType: CircuitType;
  driverId: string;
  driverName: string;
  driverCode: string;
  driverNationality: string;
  constructorId: string;
  constructorName: string;
  constructorColor: string;
  gridPosition: number;
  finishPosition: number;
  status: 'Finished' | 'DNF' | 'DNS' | 'DSQ';
  dnfReason?: string;
  dnfCategory: DNFCategory;
  points: number;
  lapsCompleted: number;
  totalLaps: number;
  fastestLap: boolean;
  pitStops: number;
  primaryCompound: TyreCompound;
  stint1Compound: TyreCompound;
  stint2Compound?: TyreCompound;
  stint3Compound?: TyreCompound;
  podium: boolean;
  win: boolean;
  era: RegulatoryEra;
}

export interface DriverSummary {
  id: string;
  name: string;
  code: string;
  nationality: string;
  flag: string;
  activeSeasons: string;
  totalRaces: number;
  cumulativePoints: number;
  wins: number;
  podiums: number;
  p1Count: number;
  p2Count: number;
  p3Count: number;
  polePositions: number;
  fastestLaps: number;
  championships: number;
  dnfCount: number;
  reliabilityRate: number; // % finished
  avgPointsPerRace: number;
  primaryTeam: string;
  teamColor: string;
}

export interface ConstructorSummary {
  id: string;
  name: string;
  color: string;
  country: string;
  totalRaces: number;
  cumulativePoints: number;
  wins: number;
  podiums: number;
  championships: number;
  dnfCount: number;
  reliabilityRate: number;
  engineSupplier: string;
  annualPoints: Record<number, number>;
}

export interface CircuitInfo {
  id: string;
  name: string;
  country: string;
  city: string;
  circuitType: CircuitType;
  lengthKm: number;
  laps: number;
  turns: number;
  drsZones: number;
  lapRecordTime: string;
  lapRecordDriver: string;
  lapRecordYear: number;
  tyreDegradationLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  pitStopLossSeconds: number;
  totalGPHosted: number;
  coordinates: [number, number]; // [lat, lng]
}

export interface TyreCompoundStats {
  compound: TyreCompound;
  color: string;
  code: string;
  relativePaceDeltaSec: number; // delta to Medium
  degPerLapSec: number;
  idealStintWindow: [number, number]; // [minLaps, maxLaps]
  grainingRisk: 'Low' | 'Moderate' | 'High';
  operatingTempRange: string;
  usageFrequencyPct: number;
}

export interface NationalityStat {
  nationality: string;
  countryCode: string;
  driverCount: number;
  totalPoints: number;
  totalWins: number;
  totalPodiums: number;
  topDrivers: string[];
}

export interface DNFBreakdown {
  category: DNFCategory;
  count: number;
  percentage: number;
  mechanical: boolean;
  color: string;
  trend: 'Increasing' | 'Decreasing' | 'Stable';
  historicalNote: string;
}

export interface ProjectEpic {
  id: string;
  epicNumber: number;
  title: string;
  description: string;
  tasksCount: number;
  status: 'Completed' | 'In Progress' | 'Planned';
  tableauSheet: string;
}

export interface ProjectTask {
  id: string;
  epicNumber: number;
  taskNumber: number;
  title: string;
  owner: string;
  description: string;
  deliverable: string;
  status: 'Completed' | 'Verified' | 'In Progress';
  metrics: string;
}
