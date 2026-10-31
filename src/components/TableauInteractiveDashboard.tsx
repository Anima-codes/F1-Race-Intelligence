import React, { useState } from 'react';
import { 
  BarChart, 
  PieChart, 
  ScatterChart, 
  Layers, 
  Eye, 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  Trophy, 
  Disc, 
  ShieldAlert,
  ChevronRight,
  Filter
} from 'lucide-react';
import { CONSTRUCTORS, TOP_DRIVERS, TYRE_COMPOUND_SPECS, DNF_CATEGORIES_DATA, CIRCUITS } from '../data/f1Data';
import { RegulatoryEra, CircuitType } from '../types/f1';

interface TableauInteractiveDashboardProps {
  isLightMode: boolean;
  selectedEra: 'All' | RegulatoryEra;
  selectedConstructor: string;
  onSelectConstructor: (c: string) => void;
  startSeason: number;
  endSeason: number;
}

export const TableauInteractiveDashboard: React.FC<TableauInteractiveDashboardProps> = ({
  isLightMode,
  selectedEra,
  selectedConstructor,
  onSelectConstructor,
  startSeason,
  endSeason,
}) => {
  // Tableau Marks Card states
  const [colorEncoding, setColorEncoding] = useState<'constructor' | 'era' | 'points'>('constructor');
  const [showLabels, setShowLabels] = useState(true);
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);

  // Filter constructors
  const visibleConstructors = selectedConstructor === 'All' 
    ? CONSTRUCTORS 
    : CONSTRUCTORS.filter(c => c.name === selectedConstructor);

  const top10Drivers = TOP_DRIVERS.slice(0, 10);

  return (
    <div className="space-y-6">
      
      {/* Executive KPI Strip (Tableau Big Numbers) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className={`p-4 rounded-lg border ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-xs text-slate-400 font-mono uppercase block">Dataset Records</span>
          <span className="text-2xl font-bold font-mono-numbers text-white">6,464</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">17 Seasons (2008–2024)</span>
        </div>

        <div className={`p-4 rounded-lg border ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-xs text-slate-400 font-mono uppercase block">Total Points Leader</span>
          <span className="text-2xl font-bold font-mono-numbers text-red-500">4,829.5</span>
          <span className="text-[11px] text-slate-400 block mt-0.5 truncate">L. Hamilton (105 Wins)</span>
        </div>

        <div className={`p-4 rounded-lg border ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-xs text-slate-400 font-mono uppercase block">Leading Constructor</span>
          <span className="text-2xl font-bold font-mono-numbers text-[#3671C6]">7,724.5</span>
          <span className="text-[11px] text-slate-400 block mt-0.5 truncate">Red Bull Racing (120 Wins)</span>
        </div>

        <div className={`p-4 rounded-lg border ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-xs text-slate-400 font-mono uppercase block">Grand Prix Venues</span>
          <span className="text-2xl font-bold font-mono-numbers text-sky-400">16 Circuits</span>
          <span className="text-[11px] text-slate-400 block mt-0.5 truncate">Monza, Silverstone, Spa...</span>
        </div>

        <div className={`p-4 rounded-lg border ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-xs text-slate-400 font-mono uppercase block">Mean Reliability</span>
          <span className="text-2xl font-bold font-mono-numbers text-emerald-400">82.6%</span>
          <span className="text-[11px] text-slate-400 block mt-0.5 truncate">17.38% Mean DNF Rate</span>
        </div>
      </div>

      {/* Main Tableau Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Tableau Marks & Parameter Shelf */}
        <div className="lg:col-span-3 space-y-4">
          <div className={`p-4 rounded-lg border space-y-4 ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Layers className="w-4 h-4 text-red-500" />
              <span>Tableau Marks Shelf</span>
            </div>

            {/* Marks Color Encoding */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 block">Color Encoding Dimension:</label>
              <select
                value={colorEncoding}
                onChange={(e) => setColorEncoding(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1.5 text-xs"
              >
                <option value="constructor">Color: By Constructor Identity</option>
                <option value="era">Color: By Regulatory Era</option>
                <option value="points">Color: By Points Intensity</option>
              </select>
            </div>

            {/* Toggle Labels */}
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-400">Data Value Labels:</span>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  showLabels 
                    ? 'bg-red-600 text-white border-red-500' 
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {showLabels ? 'Visible' : 'Hidden'}
              </button>
            </div>

            {/* Cross-Filtering by Constructor */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800">
              <label className="text-slate-400 block font-semibold">Cross-Filter Constructor:</label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => onSelectConstructor('All')}
                  className={`w-full text-left px-2 py-1 rounded text-xs transition-colors flex items-center justify-between ${
                    selectedConstructor === 'All' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>All Constructors</span>
                  <span className="font-mono text-[10px]">8 Teams</span>
                </button>
                {CONSTRUCTORS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => onSelectConstructor(c.name)}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-colors flex items-center justify-between ${
                      selectedConstructor === c.name ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="truncate">{c.name}</span>
                    </span>
                    <span className="font-mono text-[10px] shrink-0">{c.wins}W</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Calculated Fields Callout */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <span className="text-amber-400 font-bold font-mono block">Calculated Formula in View:</span>
            <code className="text-slate-300 font-mono text-[11px] block bg-slate-950 p-1.5 rounded">
              SUM([Points]) / SUM([Races])
            </code>
            <p className="text-slate-400 text-[11px]">
              Normalizes performance across seasons with variable Grand Prix counts (18 in 2008 vs 24 in 2024).
            </p>
          </div>
        </div>

        {/* Center / Right Column: Multi-View Dashboard Charts */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Chart 1: Constructor Cumulative Points Comparison */}
          <div className={`p-5 rounded-lg border ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span>Constructor Points & Race Win Distribution</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Aggregated cumulative championship points and race victories across 17 seasons.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Range: {startSeason}–{endSeason}
              </span>
            </div>

            {/* Horizontal Bar Chart */}
            <div className="space-y-3 pt-4">
              {visibleConstructors.map((c) => {
                const maxPts = 8000;
                const widthPct = Math.min(100, (c.cumulativePoints / maxPts) * 100);
                return (
                  <div key={c.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-sans font-semibold text-white flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name}
                      </span>
                      <span className="text-slate-300 font-bold font-mono-numbers">
                        {c.cumulativePoints.toLocaleString()} pts ({c.wins} Wins · {c.podiums} Podiums)
                      </span>
                    </div>

                    <div className="w-full h-4 bg-slate-800 rounded flex overflow-hidden border border-slate-700/60">
                      <div
                        className="h-full transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-bold text-white font-mono"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: c.color
                        }}
                      >
                        {showLabels && widthPct > 20 ? `${c.cumulativePoints.toLocaleString()} pts` : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 2: Top Drivers Scatter Plot (Points vs Podium Conversion) */}
          <div className={`p-5 rounded-lg border ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Driver Efficiency Matrix: Career Points vs Podium Conversion Rate</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Measures driver conversion from race entry to top-3 podium finish against total scoring yield.
                </p>
              </div>
            </div>

            {/* Interactive Grid Table of Drivers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
              {top10Drivers.map((d) => {
                const podRate = ((d.podiums / d.totalRaces) * 100).toFixed(1);
                const winRate = ((d.wins / d.totalRaces) * 100).toFixed(1);
                return (
                  <div
                    key={d.id}
                    onMouseEnter={() => setHoveredDriver(d.name)}
                    onMouseLeave={() => setHoveredDriver(null)}
                    className="p-3 bg-slate-800/40 rounded border border-slate-700/60 hover:border-slate-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{d.name}</span>
                      <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-700 text-white">
                        {d.code}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-0.5">
                      {d.primaryTeam}
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono border-t border-slate-800/60 pt-2">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Points</span>
                        <span className="text-red-400 font-bold">{d.cumulativePoints.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Podium %</span>
                        <span className="text-emerald-400 font-bold">{podRate}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
