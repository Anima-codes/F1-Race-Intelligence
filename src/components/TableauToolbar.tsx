import React from 'react';
import { Filter, RotateCcw, Sun, Moon, Calendar, Shield, Flag } from 'lucide-react';
import { RegulatoryEra, CircuitType } from '../types/f1';
import { CONSTRUCTORS } from '../data/f1Data';

interface FilterState {
  era: 'All' | RegulatoryEra;
  startSeason: number;
  endSeason: number;
  selectedConstructor: string;
  circuitType: 'All' | CircuitType;
  searchQuery: string;
}

interface TableauToolbarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  filteredCount: number;
  totalCount: number;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export const TableauToolbar: React.FC<TableauToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount,
  totalCount,
  isLightMode,
  onToggleTheme,
}) => {
  return (
    <div className={`border-b transition-colors ${
      isLightMode 
        ? 'bg-slate-100/90 border-slate-300 text-slate-800' 
        : 'bg-slate-900/80 border-slate-800 text-slate-200'
    } px-4 sm:px-6 py-2.5`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Filter Section */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-medium text-slate-400">
            <Filter className="w-3.5 h-3.5 text-red-500" />
            <span className="uppercase tracking-wider font-semibold">Tableau Filters:</span>
          </div>

          {/* Era Filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 hidden sm:inline">Era:</span>
            <select
              value={filters.era}
              onChange={(e) => onFilterChange({ era: e.target.value as any })}
              className={`rounded px-2 py-1 font-medium border text-xs focus:outline-none cursor-pointer ${
                isLightMode 
                  ? 'bg-white border-slate-300 text-slate-800 focus:border-red-500' 
                  : 'bg-slate-800 border-slate-700 text-slate-100 focus:border-red-500'
              }`}
            >
              <option value="All">All 3 Regulatory Eras</option>
              <option value="V8 Era (2008-2013)">V8 Era (2008–2013)</option>
              <option value="Turbo-Hybrid Era (2014-2021)">Turbo-Hybrid (2014–2021)</option>
              <option value="Ground Effect Era (2022-2024)">Ground Effect (2022–2024)</option>
            </select>
          </div>

          {/* Season Range */}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <select
              value={filters.startSeason}
              onChange={(e) => onFilterChange({ startSeason: Number(e.target.value) })}
              className={`rounded px-1.5 py-1 font-mono-numbers border text-xs cursor-pointer ${
                isLightMode 
                  ? 'bg-white border-slate-300 text-slate-800' 
                  : 'bg-slate-800 border-slate-700 text-slate-100'
              }`}
            >
              {Array.from({ length: 17 }, (_, i) => 2008 + i).map((yr) => (
                <option key={`start-${yr}`} value={yr} disabled={yr > filters.endSeason}>{yr}</option>
              ))}
            </select>
            <span className="text-slate-400">to</span>
            <select
              value={filters.endSeason}
              onChange={(e) => onFilterChange({ endSeason: Number(e.target.value) })}
              className={`rounded px-1.5 py-1 font-mono-numbers border text-xs cursor-pointer ${
                isLightMode 
                  ? 'bg-white border-slate-300 text-slate-800' 
                  : 'bg-slate-800 border-slate-700 text-slate-100'
              }`}
            >
              {Array.from({ length: 17 }, (_, i) => 2008 + i).map((yr) => (
                <option key={`end-${yr}`} value={yr} disabled={yr < filters.startSeason}>{yr}</option>
              ))}
            </select>
          </div>

          {/* Constructor Filter */}
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-slate-400" />
            <select
              value={filters.selectedConstructor}
              onChange={(e) => onFilterChange({ selectedConstructor: e.target.value })}
              className={`rounded px-2 py-1 font-medium border text-xs cursor-pointer ${
                isLightMode 
                  ? 'bg-white border-slate-300 text-slate-800' 
                  : 'bg-slate-800 border-slate-700 text-slate-100'
              }`}
            >
              <option value="All">All Constructors</option>
              {CONSTRUCTORS.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Circuit Type */}
          <div className="flex items-center gap-1">
            <Flag className="w-3 h-3 text-slate-400" />
            <select
              value={filters.circuitType}
              onChange={(e) => onFilterChange({ circuitType: e.target.value as any })}
              className={`rounded px-2 py-1 font-medium border text-xs cursor-pointer ${
                isLightMode 
                  ? 'bg-white border-slate-300 text-slate-800' 
                  : 'bg-slate-800 border-slate-700 text-slate-100'
              }`}
            >
              <option value="All">All Circuit Types</option>
              <option value="Street">Street Circuits</option>
              <option value="High-Speed">High-Speed Circuits</option>
              <option value="Technical">Technical Circuits</option>
              <option value="High-Degradation">High-Degradation</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            title="Reset all filters to default"
            className="inline-flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Right Info & Theme Controls */}
        <div className="flex items-center gap-3">
          <div className="font-mono-numbers text-slate-400">
            Records: <span className="font-semibold text-slate-100 dark:text-slate-200">{filteredCount.toLocaleString()}</span> / {totalCount.toLocaleString()}
          </div>

          <div className="h-3 w-px bg-slate-700" />

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium transition-colors cursor-pointer ${
              isLightMode
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle between Pitwall Dark Telemetry and Tableau Light Theme"
          >
            {isLightMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>Pitwall Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Tableau Light</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
