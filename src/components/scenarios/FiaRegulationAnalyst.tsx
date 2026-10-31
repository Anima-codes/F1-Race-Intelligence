import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  Filter, 
  Wrench, 
  Activity, 
  BarChart3,
  Calendar
} from 'lucide-react';
import { DNF_CATEGORIES_DATA, REGULATORY_ERAS, CONSTRUCTORS, TOP_DRIVERS } from '../../data/f1Data';
import { RegulatoryEra } from '../../types/f1';

interface FiaRegulationAnalystProps {
  isLightMode: boolean;
}

export const FiaRegulationAnalyst: React.FC<FiaRegulationAnalystProps> = ({ isLightMode }) => {
  const [selectedEra, setSelectedEra] = useState<'All' | RegulatoryEra>('All');
  const [selectedFailureCategory, setSelectedFailureCategory] = useState<string>('Power Unit / Engine');

  // Compute stats
  const totalDNFs = DNF_CATEGORIES_DATA.reduce((acc, c) => acc + c.count, 0);
  const mechanicalDNFs = DNF_CATEGORIES_DATA.filter(c => c.mechanical).reduce((acc, c) => acc + c.count, 0);
  const mechanicalShare = ((mechanicalDNFs / totalDNFs) * 100).toFixed(1);

  const selectedCategoryData = DNF_CATEGORIES_DATA.find(c => c.category === selectedFailureCategory) || DNF_CATEGORIES_DATA[0];

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
                Scenario 3 · FIA Technical Regulation Analyst
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs text-slate-400 font-mono">Persona: Arvind (Mr. Gilchrist)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Driver Reliability & DNF Failure Mode Diagnostic
            </h2>
            <p className="text-sm text-slate-400 max-w-3xl">
              Analyzing 1,124+ Did Not Finish (DNF) occurrences across 17 seasons to isolate mechanical failures from collisions, track regulatory impact across 3 engine eras, and draft evidence-based FIA Technical Directives.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-400">Mechanical Failure Share</div>
              <div className="text-base font-bold font-mono-numbers text-amber-400">
                {mechanicalShare}% ({mechanicalDNFs} of {totalDNFs})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DNF Failure Mode Breakdown & Stacked Visual */}
      <div className={`p-5 rounded-lg border ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-red-500" />
              <span>Tableau Stacked Failure Mode Distribution (6 Categories)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Categorization of all 1,124 retirements across 6,464 race records from 2008 through 2024.
            </p>
          </div>

          {/* Era filter */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1"
            >
              <option value="All">All 3 Regulatory Eras</option>
              <option value="V8 Era (2008-2013)">V8 Era (2008–2013)</option>
              <option value="Turbo-Hybrid Era (2014-2021)">Turbo-Hybrid (2014–2021)</option>
              <option value="Ground Effect Era (2022-2024)">Ground Effect (2022–2024)</option>
            </select>
          </div>
        </div>

        {/* Tableau Stacked Horizontal Bar */}
        <div className="pt-4">
          <div className="h-7 w-full bg-slate-800 rounded flex overflow-hidden border border-slate-700 shadow-inner">
            {DNF_CATEGORIES_DATA.map((item) => (
              <div
                key={item.category}
                onClick={() => setSelectedFailureCategory(item.category)}
                title={`${item.category}: ${item.count} DNFs (${item.percentage}%)`}
                className="h-full cursor-pointer hover:opacity-85 transition-opacity flex items-center justify-center text-[10px] font-bold text-white font-mono px-1 truncate"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color
                }}
              >
                {item.percentage > 12 ? `${item.percentage.toFixed(0)}%` : ''}
              </div>
            ))}
          </div>

          {/* Interactive Failure Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4">
            {DNF_CATEGORIES_DATA.map((item) => {
              const isSelected = selectedFailureCategory === item.category;
              return (
                <div
                  key={item.category}
                  onClick={() => setSelectedFailureCategory(item.category)}
                  className={`p-3 rounded border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-800/90 border-red-500 shadow-md ring-1 ring-red-500/50' 
                      : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold text-white truncate">{item.category}</span>
                  </div>
                  <div className="text-lg font-bold font-mono-numbers text-white">
                    {item.count}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>{item.percentage}%</span>
                    <span className={item.trend === 'Decreasing' ? 'text-emerald-400' : 'text-slate-400'}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Failure Mode Deep-Dive */}
        <div className="mt-4 p-4 bg-slate-800/50 rounded border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-red-400" />
              <h4 className="font-bold text-sm text-white">
                Detailed Technical Investigation: {selectedCategoryData.category}
              </h4>
            </div>
            <p className="text-xs text-slate-300">
              {selectedCategoryData.historicalNote}
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 shrink-0">
            Classification: <span className="text-white font-semibold">{selectedCategoryData.mechanical ? 'Mechanical Fault' : 'Racing Incident'}</span>
          </div>
        </div>
      </div>

      {/* Regulatory Era Reliability Comparison */}
      <div className={`p-5 rounded-lg border ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Impact of FIA Regulatory Frameworks on Race Completion Rates</span>
          </h3>
          <p className="text-xs text-slate-400">
            Comparing race completion and retirement statistics across the three dominant modern Formula 1 engine and aero regulation eras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {REGULATORY_ERAS.map((era) => (
            <div 
              key={era.name} 
              className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/70 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-racing text-lg font-bold text-white uppercase">{era.name}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                  {era.years}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">Avg DNF Rate</span>
                  <span className={`text-base font-bold ${era.avgDnfRate > 20 ? 'text-red-400' : era.avgDnfRate > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {era.avgDnfRate}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Races Sanctioned</span>
                  <span className="text-base font-bold text-white">{era.totalRaces} GPs</span>
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300">
                <div><strong className="text-slate-400">Engine Spec:</strong> {era.engineSpec}</div>
                <div><strong className="text-slate-400">Regulatory Shift:</strong> {era.keyFeatures}</div>
                <div><strong className="text-slate-400">Dominance:</strong> {era.championDominance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Constructor Reliability Rankings & Compliance Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Constructor Reliability Scores */}
        <div className={`lg:col-span-6 p-5 rounded-lg border ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Constructor Reliability Index (17 Seasons)</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Percentage of total race entries that successfully crossed the chequered flag.
          </p>

          <div className="space-y-3">
            {CONSTRUCTORS.map((c) => (
              <div key={c.id} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-sans font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-bold text-slate-200">{c.reliabilityRate}% ({c.dnfCount} DNFs)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${c.reliabilityRate}%`,
                      backgroundColor: c.reliabilityRate >= 90 ? '#10B981' : c.reliabilityRate >= 85 ? '#3B82F6' : '#EAB308' 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Arvind's Formal FIA Recommendations */}
        <div className={`lg:col-span-6 p-5 rounded-lg border space-y-4 ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Arvind's Technical Regulation Directives (FIA Working Group)
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Evidence-based recommendations derived from 6,464 race records submitted to the Technical Committee.
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded bg-slate-800/40 border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 font-mono text-[10px]">TD-2026/01</span>
                <span>Power Unit Component Limits & Thermal Stress</span>
              </div>
              <p className="text-slate-300">
                With PU failures accounting for 30.96% of all retirements, propose standardizing MGU-K harness connectors and internal cooling jackets to prevent thermal electrical fires at high-ambient tracks.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-800/40 border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 font-mono text-[10px]">TD-2026/02</span>
                <span>Brake Duct Cooling Minimum Airflow Mandate</span>
              </div>
              <p className="text-slate-300">
                Hydraulic and brake failures spike by 3.8× at heavy deceleration venues (Monza, Montreal, Singapore). Mandate minimum cross-sectional intake area for front brake cooling ducts.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-800/40 border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono text-[10px]">TD-2026/03</span>
                <span>Ground Effect Porpoising Vertical Oscillation Limit (TD039 Extension)</span>
              </div>
              <p className="text-slate-300">
                Chassis bottoming stresses accounted for 82 suspension failures. Enforce continuous accelerometer telemetry monitoring with plank wear optical sensors to protect driver spinal safety.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
