import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { TableauToolbar } from './components/TableauToolbar';
import { TableauStoryMode } from './components/TableauStoryMode';
import { StrategistWorkbench } from './components/scenarios/StrategistWorkbench';
import { BroadcastStudio } from './components/scenarios/BroadcastStudio';
import { FiaRegulationAnalyst } from './components/scenarios/FiaRegulationAnalyst';
import { TableauInteractiveDashboard } from './components/TableauInteractiveDashboard';
import { RawDataExplorer } from './components/RawDataExplorer';
import { ProjectArchitectureModal } from './components/ProjectArchitectureModal';
import { CalculatedFieldsModal } from './components/CalculatedFieldsModal';
import { ALL_RACE_RECORDS } from './data/f1Data';
import { RegulatoryEra, CircuitType } from './types/f1';
import { 
  TrendingUp, 
  Tv, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  FileSpreadsheet, 
  Gauge, 
  Award 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('story');
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [isCalculatedFieldsOpen, setIsCalculatedFieldsOpen] = useState<boolean>(false);

  // Global Tableau Filter State
  const [filters, setFilters] = useState<{
    era: 'All' | RegulatoryEra;
    startSeason: number;
    endSeason: number;
    selectedConstructor: string;
    circuitType: 'All' | CircuitType;
    searchQuery: string;
  }>({
    era: 'All',
    startSeason: 2008,
    endSeason: 2024,
    selectedConstructor: 'All',
    circuitType: 'All',
    searchQuery: '',
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      era: 'All',
      startSeason: 2008,
      endSeason: 2024,
      selectedConstructor: 'All',
      circuitType: 'All',
      searchQuery: '',
    });
  };

  // Filter count calculation
  const filteredRecords = useMemo(() => {
    return ALL_RACE_RECORDS.filter(r => {
      const matchEra = filters.era === 'All' || r.era === filters.era;
      const matchSeason = r.season >= filters.startSeason && r.season <= filters.endSeason;
      const matchConstructor = filters.selectedConstructor === 'All' || r.constructorName === filters.selectedConstructor;
      const matchCircuit = filters.circuitType === 'All' || r.circuitType === filters.circuitType;
      return matchEra && matchSeason && matchConstructor && matchCircuit;
    });
  }, [filters]);

  const toggleTheme = () => {
    setIsLightMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      return next;
    });
  };

  return (
    <div className={`min-h-screen transition-colors ${
      isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    } flex flex-col font-sans`}>
      
      {/* 3-Zone Header Contract */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenCalculatedFields={() => setIsCalculatedFieldsOpen(true)}
      />

      {/* Tableau Filter Ribbon */}
      <TableauToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        filteredCount={filteredRecords.length}
        totalCount={ALL_RACE_RECORDS.length}
        isLightMode={isLightMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Quick Scenario & Story Selector Bar */}
        <div className={`p-2.5 rounded-lg border flex flex-wrap items-center justify-between gap-2 text-xs font-semibold ${
          isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="flex items-center gap-1.5 text-slate-400 pl-1 font-mono uppercase tracking-wider text-[11px]">
            <span>Mode Select:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('story')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tableau Story</span>
            </button>

            <button
              onClick={() => setActiveTab('strategist')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'strategist'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>1. Team Strategist (Arnold)</span>
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'broadcast'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>2. Broadcast Studio (Lisa)</span>
            </button>

            <button
              onClick={() => setActiveTab('fia')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'fia'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>3. FIA Reliability (Gilchrist)</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>BI Workbench</span>
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'explorer'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Raw Data (6,464 Rows)</span>
            </button>
          </div>
        </div>

        {/* View Routing */}
        {activeTab === 'story' && (
          <TableauStoryMode
            onNavigateToScenario={(tab) => setActiveTab(tab)}
            isLightMode={isLightMode}
          />
        )}

        {activeTab === 'strategist' && (
          <StrategistWorkbench isLightMode={isLightMode} />
        )}

        {activeTab === 'broadcast' && (
          <BroadcastStudio isLightMode={isLightMode} />
        )}

        {activeTab === 'fia' && (
          <FiaRegulationAnalyst isLightMode={isLightMode} />
        )}

        {activeTab === 'dashboard' && (
          <TableauInteractiveDashboard
            isLightMode={isLightMode}
            selectedEra={filters.era}
            selectedConstructor={filters.selectedConstructor}
            onSelectConstructor={(c) => handleFilterChange({ selectedConstructor: c })}
            startSeason={filters.startSeason}
            endSeason={filters.endSeason}
          />
        )}

        {activeTab === 'explorer' && (
          <RawDataExplorer isLightMode={isLightMode} />
        )}

      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-racing font-bold text-white tracking-wider">FORMULA 1 RACE INTELLIGENCE</span>
            <span>·</span>
            <span>Tableau Business Intelligence Report</span>
            <span>·</span>
            <span className="font-mono text-slate-500">6,464 Records · 17 Seasons</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSpecsOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              8 Epics / 14 Tasks Specifications
            </button>
            <span>·</span>
            <button
              onClick={() => setIsCalculatedFieldsOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Tableau Calculated Fields
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectArchitectureModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        isLightMode={isLightMode}
      />

      <CalculatedFieldsModal
        isOpen={isCalculatedFieldsOpen}
        onClose={() => setIsCalculatedFieldsOpen(false)}
        isLightMode={isLightMode}
      />

    </div>
  );
}
