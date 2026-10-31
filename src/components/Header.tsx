import React from 'react';
import { Layers, FileSpreadsheet, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSpecs: () => void;
  onOpenCalculatedFields: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenSpecs,
  onOpenCalculatedFields,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark in display font */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); onTabChange('story'); }}
          className="font-racing text-2xl font-bold tracking-wider text-white flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="w-2.5 h-6 bg-red-600 rounded-sm transform -skew-x-12 inline-block"></span>
          <span>F1 RACE INTELLIGENCE</span>
          <span className="text-xs font-mono font-medium text-slate-400 border border-slate-700/80 rounded px-1.5 py-0.5">
            TABLEAU BI
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('story')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'story' ? 'text-red-500 font-semibold border-b-2 border-red-500' : 'hover:text-white'
            }`}
          >
            Tableau Story
          </button>
          <button
            onClick={() => onTabChange('strategist')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'strategist' ? 'text-red-500 font-semibold border-b-2 border-red-500' : 'hover:text-white'
            }`}
          >
            Team Strategist (Arnold)
          </button>
          <button
            onClick={() => onTabChange('broadcast')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'broadcast' ? 'text-red-500 font-semibold border-b-2 border-red-500' : 'hover:text-white'
            }`}
          >
            Broadcast Studio (Lisa)
          </button>
          <button
            onClick={() => onTabChange('fia')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'fia' ? 'text-red-500 font-semibold border-b-2 border-red-500' : 'hover:text-white'
            }`}
          >
            FIA Reliability (Gilchrist)
          </button>
          <button
            onClick={() => onTabChange('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'dashboard' ? 'text-red-500 font-semibold border-b-2 border-red-500' : 'hover:text-white'
            }`}
          >
            BI Workbench
          </button>
          <button
            onClick={() => onTabChange('explorer')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'explorer' ? 'text-red-500 font-semibold border-b-2 border-red-500' : 'hover:text-white'
            }`}
          >
            Data (6,464 Rows)
          </button>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCalculatedFields}
            title="View Tableau calculated fields & formulas"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-700 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Formulas</span>
          </button>
          
          <button
            onClick={onOpenSpecs}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>8 Epics / 14 Tasks</span>
          </button>
        </div>

      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden flex items-center justify-start gap-3 px-4 py-2 overflow-x-auto border-t border-slate-800/80 bg-slate-900/60 text-xs font-medium">
        <button 
          onClick={() => onTabChange('story')} 
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded ${activeTab === 'story' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
        >
          Story Mode
        </button>
        <button 
          onClick={() => onTabChange('strategist')} 
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded ${activeTab === 'strategist' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
        >
          Strategist (Arnold)
        </button>
        <button 
          onClick={() => onTabChange('broadcast')} 
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded ${activeTab === 'broadcast' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
        >
          Broadcast (Lisa)
        </button>
        <button 
          onClick={() => onTabChange('fia')} 
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded ${activeTab === 'fia' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
        >
          FIA DNF (Gilchrist)
        </button>
        <button 
          onClick={() => onTabChange('dashboard')} 
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded ${activeTab === 'dashboard' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
        >
          BI Workbench
        </button>
        <button 
          onClick={() => onTabChange('explorer')} 
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded ${activeTab === 'explorer' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
        >
          6,464 Rows
        </button>
      </div>
    </header>
  );
};
