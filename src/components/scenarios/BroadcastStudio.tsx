import React, { useState } from 'react';
import { 
  Tv, 
  Trophy, 
  Globe, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Search, 
  ArrowUpDown, 
  Flag,
  Share2
} from 'lucide-react';
import { TOP_DRIVERS, CIRCUITS, CONSTRUCTORS } from '../../data/f1Data';
import { DriverSummary } from '../../types/f1';

interface BroadcastStudioProps {
  isLightMode: boolean;
}

export const BroadcastStudio: React.FC<BroadcastStudioProps> = ({ isLightMode }) => {
  // Scenario 2 states
  const [searchDriver, setSearchDriver] = useState('');
  const [driverSortKey, setDriverSortKey] = useState<keyof DriverSummary>('cumulativePoints');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedDriver1Id, setSelectedDriver1Id] = useState<string>('hamilton');
  const [selectedDriver2Id, setSelectedDriver2Id] = useState<string>('verstappen');
  const [copiedSlate, setCopiedSlate] = useState(false);
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>('monza');

  // Filter & sort drivers
  const filteredDrivers = TOP_DRIVERS.filter(d => 
    d.name.toLowerCase().includes(searchDriver.toLowerCase()) ||
    d.nationality.toLowerCase().includes(searchDriver.toLowerCase()) ||
    d.primaryTeam.toLowerCase().includes(searchDriver.toLowerCase())
  ).sort((a, b) => {
    const valA = a[driverSortKey] as number;
    const valB = b[driverSortKey] as number;
    return sortAsc ? valA - valB : valB - valA;
  });

  const handleSort = (key: keyof DriverSummary) => {
    if (driverSortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setDriverSortKey(key);
      setSortAsc(false);
    }
  };

  const driver1 = TOP_DRIVERS.find(d => d.id === selectedDriver1Id) || TOP_DRIVERS[0];
  const driver2 = TOP_DRIVERS.find(d => d.id === selectedDriver2Id) || TOP_DRIVERS[1];
  const circuit = CIRCUITS.find(c => c.id === selectedCircuitId) || CIRCUITS[0];

  const handleCopySlate = () => {
    const text = `[F1 BROADCAST HEAD-TO-HEAD SLATE]
${driver1.name} (${driver1.code}) vs ${driver2.name} (${driver2.code})
- Points: ${driver1.cumulativePoints} vs ${driver2.cumulativePoints}
- Wins: ${driver1.wins} vs ${driver2.wins}
- Podiums: ${driver1.podiums} vs ${driver2.podiums}
- Poles: ${driver1.polePositions} vs ${driver2.polePositions}
- World Championships: ${driver1.championships} vs ${driver2.championships}`;
    navigator.clipboard.writeText(text);
    setCopiedSlate(true);
    setTimeout(() => setCopiedSlate(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Persona Header Card */}
      <div className={`p-5 rounded-lg border transition-colors ${
        isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-racing text-xs uppercase tracking-wider text-red-500 font-bold">
                Scenario 2 · Motorsport Broadcast Analyst
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs text-slate-400 font-mono">Persona: Divya (Ms. Lisa)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Broadcast Intelligence & Infographics Studio
            </h2>
            <p className="text-sm text-slate-400 max-w-3xl">
              Rapid retrieval of Driver Performance Leaderboards across 17 seasons, global Grand Prix hosting distribution, podium achievements, and live TV on-screen infographics generation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopySlate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
            >
              {copiedSlate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSlate ? 'Slate Copied!' : 'Copy Broadcast Slate'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast Lower-Third & Head-to-Head Infographic Card */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle F1 race car watermark / background accent */}
        <div className="absolute top-0 right-0 w-96 h-full bg-red-600/5 -skew-x-12 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 relative z-10 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            <div>
              <span className="font-racing text-xs text-red-500 uppercase tracking-widest font-bold block">
                F1 ON-SCREEN BROADCAST TELEMETRY SLATE
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Driver Rivalry Comparison & Career Benchmark
              </h3>
            </div>
          </div>

          {/* Selectors for Driver 1 and Driver 2 */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedDriver1Id}
              onChange={(e) => setSelectedDriver1Id(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1 font-semibold"
            >
              {TOP_DRIVERS.map(d => (
                <option key={`d1-${d.id}`} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
            <span className="text-slate-400 font-bold">VS</span>
            <select
              value={selectedDriver2Id}
              onChange={(e) => setSelectedDriver2Id(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1 font-semibold"
            >
              {TOP_DRIVERS.map(d => (
                <option key={`d2-${d.id}`} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Head-to-Head Battle Slate */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 pt-6 items-center relative z-10">
          
          {/* Driver 1 Card */}
          <div className="md:col-span-4 p-4 rounded-lg bg-slate-900/90 border-t-2 border-slate-700" style={{ borderTopColor: driver1.teamColor }}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl">{driver1.flag}</span>
                <h4 className="font-racing text-2xl font-bold text-white tracking-wider uppercase mt-1">
                  {driver1.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium">{driver1.primaryTeam}</p>
              </div>
              <span className="font-racing text-3xl font-bold font-mono px-3 py-1 rounded bg-slate-800 text-white">
                {driver1.code}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Championship Titles</span>
                <span className="font-bold text-amber-400 font-mono-numbers text-sm">{driver1.championships}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Career Points</span>
                <span className="font-bold text-white font-mono-numbers text-sm">{driver1.cumulativePoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grand Prix Wins</span>
                <span className="font-bold text-white font-mono-numbers">{driver1.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Podium Finishes</span>
                <span className="font-bold text-white font-mono-numbers">{driver1.podiums}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pole Positions</span>
                <span className="font-bold text-white font-mono-numbers">{driver1.polePositions}</span>
              </div>
            </div>
          </div>

          {/* Center Comparison Metrics */}
          <div className="md:col-span-3 space-y-3 py-2 text-center">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Win Rate %</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className={`text-sm font-bold font-mono-numbers ${driver1.wins / driver1.totalRaces >= driver2.wins / driver2.totalRaces ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {((driver1.wins / driver1.totalRaces) * 100).toFixed(1)}%
                </span>
                <span className="text-slate-600">·</span>
                <span className={`text-sm font-bold font-mono-numbers ${driver2.wins / driver2.totalRaces >= driver1.wins / driver1.totalRaces ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {((driver2.wins / driver2.totalRaces) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Podium Conversion</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className={`text-sm font-bold font-mono-numbers ${driver1.podiums / driver1.totalRaces >= driver2.podiums / driver2.totalRaces ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {((driver1.podiums / driver1.totalRaces) * 100).toFixed(1)}%
                </span>
                <span className="text-slate-600">·</span>
                <span className={`text-sm font-bold font-mono-numbers ${driver2.podiums / driver2.totalRaces >= driver1.podiums / driver1.totalRaces ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {((driver2.podiums / driver2.totalRaces) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Reliability Score</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className={`text-sm font-bold font-mono-numbers ${driver1.reliabilityRate >= driver2.reliabilityRate ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {driver1.reliabilityRate}%
                </span>
                <span className="text-slate-600">·</span>
                <span className={`text-sm font-bold font-mono-numbers ${driver2.reliabilityRate >= driver1.reliabilityRate ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {driver2.reliabilityRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Driver 2 Card */}
          <div className="md:col-span-4 p-4 rounded-lg bg-slate-900/90 border-t-2 border-slate-700" style={{ borderTopColor: driver2.teamColor }}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl">{driver2.flag}</span>
                <h4 className="font-racing text-2xl font-bold text-white tracking-wider uppercase mt-1">
                  {driver2.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium">{driver2.primaryTeam}</p>
              </div>
              <span className="font-racing text-3xl font-bold font-mono px-3 py-1 rounded bg-slate-800 text-white">
                {driver2.code}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Championship Titles</span>
                <span className="font-bold text-amber-400 font-mono-numbers text-sm">{driver2.championships}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Career Points</span>
                <span className="font-bold text-white font-mono-numbers text-sm">{driver2.cumulativePoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grand Prix Wins</span>
                <span className="font-bold text-white font-mono-numbers">{driver2.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Podium Finishes</span>
                <span className="font-bold text-white font-mono-numbers">{driver2.podiums}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pole Positions</span>
                <span className="font-bold text-white font-mono-numbers">{driver2.polePositions}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Driver Performance Leaderboard Table */}
      <div className={`p-5 rounded-lg border ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Driver Performance Leaderboard (17 Seasons Cumulative)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Sorted historical record of Grand Prix starts, podiums, wins, points, and reliability across 2008–2024.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search driver / team..."
                value={searchDriver}
                onChange={(e) => setSearchDriver(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded pl-8 pr-3 py-1 text-xs focus:outline-none w-48"
              />
            </div>
          </div>
        </div>

        {/* High Density Leaderboard Table */}
        <div className="overflow-x-auto pt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Driver</th>
                <th className="py-2 px-3">Team</th>
                <th 
                  className="py-2 px-3 text-right cursor-pointer hover:text-white"
                  onClick={() => handleSort('cumulativePoints')}
                >
                  <span className="inline-flex items-center gap-1">Points <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th 
                  className="py-2 px-3 text-right cursor-pointer hover:text-white"
                  onClick={() => handleSort('wins')}
                >
                  <span className="inline-flex items-center gap-1">Wins <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th 
                  className="py-2 px-3 text-right cursor-pointer hover:text-white"
                  onClick={() => handleSort('podiums')}
                >
                  <span className="inline-flex items-center gap-1">Podiums <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th 
                  className="py-2 px-3 text-right cursor-pointer hover:text-white"
                  onClick={() => handleSort('polePositions')}
                >
                  <span className="inline-flex items-center gap-1">Poles <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th 
                  className="py-2 px-3 text-right cursor-pointer hover:text-white"
                  onClick={() => handleSort('reliabilityRate')}
                >
                  <span className="inline-flex items-center gap-1">Reliability <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2 px-3 text-center">Podium Split (1st / 2nd / 3rd)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
              {filteredDrivers.map((driver, idx) => (
                <tr 
                  key={driver.id} 
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedDriver1Id(driver.id);
                  }}
                >
                  <td className="py-2.5 px-3 font-mono text-slate-500">{idx + 1}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{driver.flag}</span>
                      <div>
                        <span className="font-semibold text-white font-sans block">{driver.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{driver.activeSeasons}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: driver.teamColor }} />
                      <span className="text-slate-300 truncate max-w-[140px]">{driver.primaryTeam}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-red-400">{driver.cumulativePoints.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-white">{driver.wins}</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-amber-300">{driver.podiums}</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{driver.polePositions}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`font-semibold ${driver.reliabilityRate >= 88 ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {driver.reliabilityRate}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {/* Visual 1st / 2nd / 3rd stacked bar */}
                    <div className="w-36 mx-auto h-3 bg-slate-800 rounded flex overflow-hidden">
                      <div 
                        title={`P1 (Wins): ${driver.p1Count}`}
                        className="bg-amber-400 h-full"
                        style={{ width: `${(driver.p1Count / Math.max(driver.podiums, 1)) * 100}%` }}
                      />
                      <div 
                        title={`P2: ${driver.p2Count}`}
                        className="bg-slate-300 h-full"
                        style={{ width: `${(driver.p2Count / Math.max(driver.podiums, 1)) * 100}%` }}
                      />
                      <div 
                        title={`P3: ${driver.p3Count}`}
                        className="bg-amber-700 h-full"
                        style={{ width: `${(driver.p3Count / Math.max(driver.podiums, 1)) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Grand Prix Hosting Geography */}
      <div className={`p-5 rounded-lg border ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>Global Grand Prix Circuit Atlas & Hosting Geography</span>
            </h3>
            <p className="text-xs text-slate-400">
              Host countries, circuit length, DRS zones, and tyre degradation ratings across the modern Formula 1 calendar.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Most GP Hosted: Autodromo Nazionale Monza (74 Rounds)
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {CIRCUITS.map((circ) => {
            const isSelected = selectedCircuitId === circ.id;
            return (
              <div
                key={circ.id}
                onClick={() => setSelectedCircuitId(circ.id)}
                className={`p-3.5 rounded border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-800/90 border-red-500 shadow-md' 
                    : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{circ.name}</span>
                  <span className="text-xs font-mono text-red-400 font-semibold">{circ.totalGPHosted} GPs</span>
                </div>
                
                <div className="text-xs text-slate-400 mt-1">
                  {circ.city}, {circ.country}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
                  <div>Length: <span className="text-white font-medium">{circ.lengthKm} km</span></div>
                  <div>Laps: <span className="text-white font-medium">{circ.laps}</span></div>
                  <div>DRS Zones: <span className="text-emerald-400 font-medium">{circ.drsZones}</span></div>
                  <div>Type: <span className="text-sky-300 font-medium">{circ.circuitType}</span></div>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 font-mono truncate">
                  Record: {circ.lapRecordTime} ({circ.lapRecordDriver})
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
