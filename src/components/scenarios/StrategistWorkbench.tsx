import React, { useState } from 'react';
import { 
  TrendingUp, 
  Disc, 
  Users, 
  Zap, 
  Clock, 
  HelpCircle, 
  ChevronRight, 
  Gauge, 
  AlertCircle,
  Award,
  CheckCircle2
} from 'lucide-react';
import { CONSTRUCTORS, TYRE_COMPOUND_SPECS, NATIONALITIES, CIRCUITS } from '../../data/f1Data';
import { TyreCompound, CircuitType } from '../../types/f1';

interface StrategistWorkbenchProps {
  isLightMode: boolean;
}

export const StrategistWorkbench: React.FC<StrategistWorkbenchProps> = ({ isLightMode }) => {
  // Scenario 1 Controls
  const [selectedMidTier, setSelectedMidTier] = useState<string>('mclaren');
  const [trajectoryMode, setTrajectoryMode] = useState<'cumulative' | 'annual'>('annual');
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>('silverstone');
  const [selectedCompound, setSelectedCompound] = useState<TyreCompound>('Medium');
  const [activeStrategyView, setActiveStrategyView] = useState<'matrix' | 'simulator'>('simulator');
  const [simStint1Compound, setSimStint1Compound] = useState<TyreCompound>('Medium');
  const [simStint2Compound, setSimStint2Compound] = useState<TyreCompound>('Hard');
  const [simStops, setSimStops] = useState<1 | 2>(1);

  const midTierConstructor = CONSTRUCTORS.find(c => c.id === selectedMidTier) || CONSTRUCTORS[3];
  const redBull = CONSTRUCTORS.find(c => c.id === 'red_bull')!;
  const mercedes = CONSTRUCTORS.find(c => c.id === 'mercedes')!;
  const selectedCircuit = CIRCUITS.find(c => c.id === selectedCircuitId) || CIRCUITS[1];

  const seasonsList = Array.from({ length: 17 }, (_, i) => 2008 + i);

  // Calculate trajectory points
  const getPointsSeries = (constructor: typeof redBull) => {
    let cum = 0;
    return seasonsList.map(yr => {
      const pts = constructor.annualPoints[yr] || 0;
      cum += pts;
      return trajectoryMode === 'cumulative' ? cum : pts;
    });
  };

  const redBullSeries = getPointsSeries(redBull);
  const mercedesSeries = getPointsSeries(mercedes);
  const midTierSeries = getPointsSeries(midTierConstructor);

  const maxVal = Math.max(...redBullSeries, ...mercedesSeries, ...midTierSeries, 1);

  // Strategy Simulation Calculation
  const compound1Spec = TYRE_COMPOUND_SPECS.find(t => t.compound === simStint1Compound)!;
  const compound2Spec = TYRE_COMPOUND_SPECS.find(t => t.compound === simStint2Compound)!;

  const totalLaps = selectedCircuit.laps;
  const stint1Laps = simStops === 1 ? Math.floor(totalLaps * 0.45) : Math.floor(totalLaps * 0.32);
  const stint2Laps = totalLaps - stint1Laps;

  // Base lap time estimated around 90 seconds
  const baseLapTime = 90.0;
  const pitLoss = selectedCircuit.pitStopLossSeconds * simStops;
  
  // Deg calculation: sum of (paceDelta + deg * lap)
  const stint1PaceLoss = Array.from({ length: stint1Laps }, (_, i) => compound1Spec.relativePaceDeltaSec + i * compound1Spec.degPerLapSec).reduce((a, b) => a + b, 0);
  const stint2PaceLoss = Array.from({ length: stint2Laps }, (_, i) => compound2Spec.relativePaceDeltaSec + i * compound2Spec.degPerLapSec).reduce((a, b) => a + b, 0);
  
  const estimatedRaceTimeSec = (totalLaps * baseLapTime) + pitLoss + stint1PaceLoss + stint2PaceLoss;
  const minutes = Math.floor(estimatedRaceTimeSec / 60);
  const seconds = (estimatedRaceTimeSec % 60).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Persona Header Card */}
      <div className={`p-5 rounded-lg border transition-colors ${
        isLightMode 
          ? 'bg-white border-slate-200 shadow-sm' 
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-racing text-xs uppercase tracking-wider text-red-500 font-bold">
                Scenario 1 · F1 Team Performance Strategist
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs text-slate-400 font-mono">Persona: Rajan (Mr. Arnold)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white">
              Championship Trajectory & Race Strategy Workbench
            </h2>
            <p className="text-sm text-slate-400 max-w-3xl">
              Benchmarking mid-tier team championship trajectories against Red Bull Racing & Mercedes, evaluating tyre compound degradation across circuit types, and formulating driver talent acquisition models.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Target Benchmark Gap (2024)</div>
              <div className="text-base font-bold font-mono-numbers text-red-400">
                {(redBull.annualPoints[2024] - (midTierConstructor.annualPoints[2024] || 0)).toFixed(0)} pts to Red Bull
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Trajectory Benchmark & Mid-Tier Selector */}
      <div className={`p-5 rounded-lg border ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span>Constructor Championship Trajectory (2008–2024)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Benchmark points trajectory across 17 seasons against tier-1 champions Red Bull Racing and Mercedes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Mid-Tier Constructor Picker */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Select Challenger:</span>
              <select
                value={selectedMidTier}
                onChange={(e) => setSelectedMidTier(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1 text-xs font-semibold focus:outline-none"
              >
                <option value="mclaren">McLaren F1 Team</option>
                <option value="ferrari">Scuderia Ferrari</option>
                <option value="aston_martin">Aston Martin / Racing Point</option>
                <option value="alpine">Alpine / Renault</option>
                <option value="williams">Williams Racing</option>
                <option value="haas">Haas F1 Team</option>
              </select>
            </div>

            {/* Annual vs Cumulative toggle */}
            <div className="inline-flex rounded-md p-0.5 bg-slate-800 border border-slate-700">
              <button
                onClick={() => setTrajectoryMode('annual')}
                className={`px-2.5 py-1 text-xs font-medium rounded ${
                  trajectoryMode === 'annual' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual Points
              </button>
              <button
                onClick={() => setTrajectoryMode('cumulative')}
                className={`px-2.5 py-1 text-xs font-medium rounded ${
                  trajectoryMode === 'cumulative' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cumulative Growth
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 py-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#3671C6]"></span>
            <span className="font-medium text-slate-300">Red Bull Racing ({redBull.championships} Titles)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#00A19B]"></span>
            <span className="font-medium text-slate-300">Mercedes-AMG ({mercedes.championships} Titles)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: midTierConstructor.color }}></span>
            <span className="font-medium text-white">{midTierConstructor.name} ({midTierConstructor.cumulativePoints.toLocaleString()} pts)</span>
          </div>
        </div>

        {/* Interactive SVG Line & Area Chart */}
        <div className="h-64 sm:h-72 w-full pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 850 250">
            {/* Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const y = 220 - pct * 190;
              const pts = Math.round(pct * maxVal);
              return (
                <g key={i}>
                  <line x1="45" y1={y} x2="840" y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <text x="38" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" className="font-mono">
                    {pts}
                  </text>
                </g>
              );
            })}

            {/* X-axis Season Labels */}
            {seasonsList.map((yr, idx) => {
              const x = 50 + (idx / (seasonsList.length - 1)) * 780;
              return (
                <text key={yr} x={x} y="242" fill="#94a3b8" fontSize="10" textAnchor="middle" className="font-mono">
                  {yr % 2 === 0 || idx === seasonsList.length - 1 ? yr : ''}
                </text>
              );
            })}

            {/* Red Bull Trajectory Path */}
            <path
              d={seasonsList.reduce((acc, yr, idx) => {
                const x = 50 + (idx / (seasonsList.length - 1)) * 780;
                const y = 220 - (redBullSeries[idx] / maxVal) * 190;
                return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
              }, '')}
              fill="none"
              stroke="#3671C6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Mercedes Trajectory Path */}
            <path
              d={seasonsList.reduce((acc, yr, idx) => {
                const x = 50 + (idx / (seasonsList.length - 1)) * 780;
                const y = 220 - (mercedesSeries[idx] / maxVal) * 190;
                return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
              }, '')}
              fill="none"
              stroke="#00A19B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Mid-Tier Trajectory Path */}
            <path
              d={seasonsList.reduce((acc, yr, idx) => {
                const x = 50 + (idx / (seasonsList.length - 1)) * 780;
                const y = 220 - (midTierSeries[idx] / maxVal) * 190;
                return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
              }, '')}
              fill="none"
              stroke={midTierConstructor.color}
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Points Markers on Mid-Tier */}
            {seasonsList.map((yr, idx) => {
              const x = 50 + (idx / (seasonsList.length - 1)) * 780;
              const y = 220 - (midTierSeries[idx] / maxVal) * 190;
              return (
                <circle
                  key={`dot-${yr}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={midTierConstructor.color}
                  stroke="#0f172a"
                  strokeWidth="2"
                  className="transition-transform hover:scale-150 cursor-pointer"
                >
                  <title>{`${midTierConstructor.name} (${yr}): ${midTierSeries[idx]} pts`}</title>
                </circle>
              );
            })}
          </svg>
        </div>

        {/* Trajectory Insights Banner */}
        <div className="mt-4 p-3 bg-slate-800/40 border border-slate-700/60 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">{midTierConstructor.name}</strong> 17-Season Summary: {midTierConstructor.wins} Grand Prix Wins, {midTierConstructor.podiums} Podiums, {midTierConstructor.cumulativePoints.toLocaleString()} Total Points.
            </span>
          </div>
          <div className="text-slate-400 font-mono">
            Reliability: <span className="text-emerald-400 font-bold">{midTierConstructor.reliabilityRate}%</span>
          </div>
        </div>
      </div>

      {/* Section 2: Tyre Compound Strategy & Pit Stop Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Tyre Compound Degradation Matrix */}
        <div className={`lg:col-span-5 p-5 rounded-lg border space-y-4 ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Disc className="w-4 h-4 text-amber-400" />
              <span>Tyre Compound Characteristics</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Pirelli F1 Specs</span>
          </div>

          <p className="text-xs text-slate-400">
            Pace deltas relative to Medium compound baseline and thermal wear degradation per completed race lap.
          </p>

          <div className="space-y-2.5">
            {TYRE_COMPOUND_SPECS.map((c) => {
              const isSel = selectedCompound === c.compound;
              return (
                <div
                  key={c.compound}
                  onClick={() => setSelectedCompound(c.compound)}
                  className={`p-3 rounded border transition-all cursor-pointer ${
                    isSel 
                      ? 'bg-slate-800/90 border-red-500 shadow-sm' 
                      : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: c.color }} />
                      <span className="font-bold text-sm text-white">{c.compound}</span>
                      <span className="text-xs font-mono text-slate-400">({c.code})</span>
                    </div>
                    <div className="text-xs font-mono font-semibold text-slate-200">
                      {c.relativePaceDeltaSec > 0 ? `+${c.relativePaceDeltaSec.toFixed(2)}s` : `${c.relativePaceDeltaSec.toFixed(2)}s`}
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-400 font-mono">
                    <div>
                      <span className="text-[10px] uppercase block text-slate-500">Deg/Lap</span>
                      <span className="text-slate-200 font-semibold">{c.degPerLapSec}s</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase block text-slate-500">Stint Window</span>
                      <span className="text-slate-200 font-semibold">{c.idealStintWindow[0]}-{c.idealStintWindow[1]} laps</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase block text-slate-500">Usage Share</span>
                      <span className="text-slate-200 font-semibold">{c.usageFrequencyPct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-red-950/20 border border-red-800/40 rounded text-xs text-red-300">
            <strong>Rajan's Tyre Rule:</strong> At circuits like Bahrain or Suzuka with extreme thermal deg, the Hard compound (0.028s/lap deg) yields a 4.2-second net crossover advantage after lap 18 over Softs.
          </div>
        </div>

        {/* Right Column: Pit Stop Strategy Simulator */}
        <div className={`lg:col-span-7 p-5 rounded-lg border space-y-4 ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Circuit Pit Stop & Strategy Simulator</span>
              </h3>
              <p className="text-xs text-slate-400">
                Model race duration and pit loss deltas across 1-stop vs 2-stop strategies.
              </p>
            </div>

            {/* Circuit Selector */}
            <select
              value={selectedCircuitId}
              onChange={(e) => setSelectedCircuitId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded px-3 py-1.5 text-xs font-semibold focus:outline-none"
            >
              {CIRCUITS.map((circ) => (
                <option key={circ.id} value={circ.id}>
                  {circ.name} ({circ.country})
                </option>
              ))}
            </select>
          </div>

          {/* Circuit Telemetry Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-800/40 rounded border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">Total Race Laps</span>
              <span className="text-sm font-bold font-mono text-white">{selectedCircuit.laps} Laps</span>
            </div>
            <div>
              <span className="text-slate-400 block">Pit Lane Loss</span>
              <span className="text-sm font-bold font-mono text-amber-400">{selectedCircuit.pitStopLossSeconds}s</span>
            </div>
            <div>
              <span className="text-slate-400 block">Degradation Level</span>
              <span className="text-sm font-bold font-mono text-red-400">{selectedCircuit.tyreDegradationLevel}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Circuit Type</span>
              <span className="text-sm font-bold font-mono text-sky-400">{selectedCircuit.circuitType}</span>
            </div>
          </div>

          {/* Strategy Builder Controls */}
          <div className="p-4 bg-slate-950/60 rounded border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Strategy Plan Selection</span>
              <div className="inline-flex rounded bg-slate-800 border border-slate-700 p-0.5">
                <button
                  onClick={() => setSimStops(1)}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    simStops === 1 ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1-Stop Plan
                </button>
                <button
                  onClick={() => setSimStops(2)}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    simStops === 2 ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2-Stop Plan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Stint 1 (Start to Lap {stint1Laps})</label>
                <select
                  value={simStint1Compound}
                  onChange={(e) => setSimStint1Compound(e.target.value as TyreCompound)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1.5"
                >
                  <option value="Soft">Soft (Red) - Aggressive Start</option>
                  <option value="Medium">Medium (Yellow) - Balanced Stint</option>
                  <option value="Hard">Hard (White) - Deep Stint</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Stint 2 (Lap {stint1Laps + 1} to {totalLaps})</label>
                <select
                  value={simStint2Compound}
                  onChange={(e) => setSimStint2Compound(e.target.value as TyreCompound)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1.5"
                >
                  <option value="Hard">Hard (White) - Maximum Durability</option>
                  <option value="Medium">Medium (Yellow) - Sprint Finish</option>
                  <option value="Soft">Soft (Red) - Late Attack</option>
                </select>
              </div>
            </div>

            {/* Visual Stint Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>Stint 1: {stint1Laps} Laps ({simStint1Compound})</span>
                <span className="text-amber-400 font-semibold">Pit Window: Lap {stint1Laps} (+{selectedCircuit.pitStopLossSeconds}s)</span>
                <span>Stint 2: {stint2Laps} Laps ({simStint2Compound})</span>
              </div>
              <div className="w-full h-4 bg-slate-800 rounded flex overflow-hidden border border-slate-700">
                <div
                  className="h-full flex items-center justify-center text-[10px] font-bold text-black"
                  style={{
                    width: `${(stint1Laps / totalLaps) * 100}%`,
                    backgroundColor: compound1Spec.color,
                  }}
                >
                  {simStint1Compound}
                </div>
                <div
                  className="h-full flex items-center justify-center text-[10px] font-bold text-black"
                  style={{
                    width: `${(stint2Laps / totalLaps) * 100}%`,
                    backgroundColor: compound2Spec.color,
                  }}
                >
                  {simStint2Compound}
                </div>
              </div>
            </div>

            {/* Race Time Output */}
            <div className="p-3 bg-slate-900/90 rounded border border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Simulated Total Race Duration</span>
                <span className="text-lg font-bold font-mono-numbers text-emerald-400">
                  {minutes}m {seconds}s
                </span>
              </div>
              <div className="text-right text-xs font-mono text-slate-400">
                <div>Pit Loss: <span className="text-white font-semibold">{pitLoss.toFixed(1)}s</span></div>
                <div>Wear Penalty: <span className="text-amber-400 font-semibold">+{(stint1PaceLoss + stint2PaceLoss).toFixed(1)}s</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Section 3: Global Driver Talent Recruitment Pool */}
      <div className={`p-5 rounded-lg border ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              <span>Global Talent Pool: Driver Productivity by Nationality</span>
            </h3>
            <p className="text-xs text-slate-400">
              Scouting intelligence for mid-tier constructor recruitment based on 17 seasons of points productivity and podium rates.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Analyzed: 12 Nationalities / 40+ Premier Drivers
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4">
          {NATIONALITIES.map((n) => (
            <div
              key={n.nationality}
              className="p-3 bg-slate-800/40 rounded border border-slate-700/70 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{n.nationality}</span>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                  {n.countryCode}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-1 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Points</span>
                  <span className="text-red-400 font-bold">{n.totalPoints.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Wins</span>
                  <span className="text-white font-semibold">{n.totalWins}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Podiums</span>
                  <span className="text-amber-400 font-semibold">{n.totalPodiums}</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-700/50 text-[11px] text-slate-400 truncate">
                Key Talent: {n.topDrivers.slice(0, 2).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
