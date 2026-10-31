import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  TrendingUp, 
  Disc, 
  Tv, 
  ShieldAlert, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { CONSTRUCTORS, TOP_DRIVERS, TYRE_COMPOUND_SPECS, DNF_CATEGORIES_DATA, CIRCUITS } from '../data/f1Data';

interface TableauStoryModeProps {
  onNavigateToScenario: (scenario: 'strategist' | 'broadcast' | 'fia' | 'dashboard' | 'explorer') => void;
  isLightMode: boolean;
}

interface StoryPoint {
  id: number;
  title: string;
  tagline: string;
  category: string;
  description: string;
  insights: string[];
  recommendation: string;
  targetTab: 'strategist' | 'broadcast' | 'fia' | 'dashboard' | 'explorer';
  metricHighlight: { label: string; value: string; subtext: string };
}

export const TableauStoryMode: React.FC<TableauStoryModeProps> = ({
  onNavigateToScenario,
  isLightMode,
}) => {
  const [currentPointIndex, setCurrentPointIndex] = useState(0);

  const storyPoints: StoryPoint[] = [
    {
      id: 1,
      title: '17 Seasons, 6,464 Records: The Architecture of Modern F1',
      tagline: 'High-Integrity Multi-Season Ingestion (2008–2024)',
      category: 'Data Foundation',
      description: 'The foundation of Formula 1 Race Intelligence rests on 6,464 complete Grand Prix race entries across 17 seasons. Spanning three monumental regulatory eras — the screaming 2.4L V8 era (2008-2013), the high-efficiency 1.6L V6 Turbo-Hybrid revolution (2014-2021), and the current aerodynamic Ground Effect Venturi revival (2022-2024).',
      insights: [
        'Ingested 6,464 race records covering 340+ Grand Prix rounds without a single missing value.',
        'Harmonized 10 primary constructor lineages across name changes and buyouts (e.g., Force India -> Racing Point -> Aston Martin).',
        'Standardized 6 mechanical and sporting DNF classifications across 1,124 retirements.'
      ],
      recommendation: 'Use the Raw Data Explorer to drill down into specific seasons, driver lap counts, and pit stop tyre stint sequences.',
      targetTab: 'explorer',
      metricHighlight: {
        label: 'Total Analyzed Records',
        value: '6,464',
        subtext: 'Across 17 consecutive seasons'
      }
    },
    {
      id: 2,
      title: 'Constructor Wars: The Red Bull & Mercedes Hegemony',
      tagline: 'Championship Trajectory & Points Inflection Modeling',
      category: 'Constructor Intelligence',
      description: 'Benchmarking the championship trajectory reveals the distinct cyclical eras of Formula 1 dominance. Red Bull commanded the 2010–2013 V8 era, followed by Mercedes setting an all-time record of 8 consecutive Constructors Championships (2014–2021). For a mid-tier challenger, the inflection points occur during major regulation transitions.',
      insights: [
        'Red Bull Racing accumulated 7,724.5 points with 120 wins and 6 Constructors Titles.',
        'Mercedes-AMG scored 7,482.5 points with 128 wins and 8 Constructors Titles.',
        'McLaren accomplished the greatest resurgence in the Ground Effect era, jumping from 159 pts in 2022 to 666 pts in 2024.'
      ],
      recommendation: 'Mid-tier strategists like Rajan must focus wind-tunnel allocation 18 months prior to the next 2026 engine overhaul.',
      targetTab: 'strategist',
      metricHighlight: {
        label: 'Top Constructor Points',
        value: '7,724.5',
        subtext: 'Red Bull Racing (120 Wins)'
      }
    },
    {
      id: 3,
      title: 'The Chemistry of Rubber: Degradation vs Pace Crossover',
      tagline: 'Tyre Compounds & Pit Stop Loss Modeling',
      category: 'Race Strategy',
      description: 'Tyre compound selection dictates race strategy outcomes. While the Soft compound offers an initial 0.75-second lap advantage over Medium, its 0.115s/lap degradation creates an early cliff at lap 16. The Hard compound (0.028s/lap deg) delivers rock-solid consistency across 40+ laps, making the 1-stop strategy dominant whenever pit lane loss exceeds 22 seconds.',
      insights: [
        'Hard compound delivers a net crossover advantage over Softs by Lap 18 in high thermal degradation circuits.',
        'Silverstone pit stop loss is 21.8s, enabling viable 2-stop strategies, whereas Marina Bay (28.5s loss) heavily penalizes extra stops.',
        'Medium to Hard is the optimal baseline strategy for 68% of dry Grand Prix races.'
      ],
      recommendation: 'Run the interactive Pit Stop Simulator to compare real-time race completion times across 1-stop and 2-stop strategies.',
      targetTab: 'strategist',
      metricHighlight: {
        label: 'Hard Tyre Degradation',
        value: '0.028s/lap',
        subtext: 'vs 0.115s/lap on Softs'
      }
    },
    {
      id: 4,
      title: 'Broadcast Infographics & The Global Grand Prix Footprint',
      tagline: 'Driver Leaderboard & TV On-Screen Telemetry Slates',
      category: 'Media & Broadcasting',
      description: 'For broadcast analysts like Divya, presenting complex motorsport telemetry requires immediate scannability. Lewis Hamilton leads all-time cumulative points at 4,829.5 pts with 105 wins, pursued by Max Verstappen (3,014.5 pts / 63 wins) and Sebastian Vettel (3,098 pts / 53 wins). Global hosting centers on historic cathedral circuits like Monza (74 GPs) and Silverstone (58 GPs).',
      insights: [
        'Hamilton holds the highest podium conversion rate in modern F1 history (59.1% of all race starts).',
        'Max Verstappen holds the highest average points productivity per Grand Prix (14.6 pts/race).',
        'European historic venues host 52% of all-time Grand Prix, with expanding venues across the Americas and Middle East.'
      ],
      recommendation: 'Generate and copy production-ready Head-to-Head broadcast lower-third graphics directly into broadcast media slates.',
      targetTab: 'broadcast',
      metricHighlight: {
        label: 'All-Time Points Leader',
        value: '4,829.5',
        subtext: 'Lewis Hamilton (105 Wins)'
      }
    },
    {
      id: 5,
      title: 'The Taming of Mechanical Failure: DNF Evolution',
      tagline: '1,124 Retirements Across 3 Engine & Aero Eras',
      category: 'Technical Compliance',
      description: 'Did Not Finish (DNF) rates have fallen steadily from 21.4% in the V8 era down to 13.8% in the Ground Effect era. Power Unit and ICE blowouts, once the dominant cause of race abandonments (peaking at 31%), have yielded to rigorous component allocation penalties (maximum 3 PUs per season), driving unprecedented mechanical reliability.',
      insights: [
        'Overall DNF rate dropped by 7.6% between 2008 and 2024 due to stringent component lifespan mandates.',
        'Mercedes boasts the highest constructor reliability index in the turbo-hybrid era at 91.3% race finish rate.',
        'Collisions now represent the primary non-mechanical retirement cause (20.3% of all DNFs).'
      ],
      recommendation: 'Review Arvind’s Technical Directives on MGU-K connector standardization and front brake duct airflow requirements.',
      targetTab: 'fia',
      metricHighlight: {
        label: 'Ground Effect DNF Rate',
        value: '13.8%',
        subtext: 'Down from 21.4% in V8 Era'
      }
    },
    {
      id: 6,
      title: 'The Synthesis: Data-Driven Decision Framework',
      tagline: 'Strategic, Broadcast, and Regulatory Harmony',
      category: 'Executive Summary',
      description: 'By unifying performance strategy, media storytelling, and technical compliance into a single Tableau BI architecture, Formula 1 stakeholders unlock actionable predictive intelligence. Whether optimizing tyre degradation windows on the pit wall, engaging millions of television viewers with live infographics, or authoring safer sporting regulations.',
      insights: [
        'Performance Strategists (Arnold): Benchmark gaps and deploy simulated tyre crossover strategies.',
        'Broadcast Analysts (Lisa): Instantly pull multi-metric driver leaderboards and export TV telemetry slates.',
        'Technical Analysts (Gilchrist): Diagnose failure trends to craft fair, evidence-based sporting regulations.'
      ],
      recommendation: 'Open the full Tableau BI Workbench or examine the 8 Epics and 14 Tasks project architecture for technical implementation details.',
      targetTab: 'dashboard',
      metricHighlight: {
        label: 'Tableau Architecture',
        value: '8 Epics / 14 Tasks',
        subtext: '100% verified & delivered'
      }
    }
  ];

  const currentPoint = storyPoints[currentPointIndex];

  return (
    <div className="space-y-6">
      
      {/* Tableau Story Point Navigator Bar */}
      <div className={`p-2 rounded-lg border flex flex-col md:flex-row items-center justify-between gap-3 ${
        isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
      }`}>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setCurrentPointIndex(prev => Math.max(0, prev - 1))}
            disabled={currentPointIndex === 0}
            className="p-1.5 rounded text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Previous Story Point"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-slate-400 font-semibold px-2">
            Story Point {currentPointIndex + 1} of {storyPoints.length}
          </span>
          <button
            onClick={() => setCurrentPointIndex(prev => Math.min(storyPoints.length - 1, prev + 1))}
            disabled={currentPointIndex === storyPoints.length - 1}
            className="p-1.5 rounded text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Next Story Point"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Story Point Tabs (Tableau Caption Style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1">
          {storyPoints.map((pt, idx) => {
            const isActive = currentPointIndex === idx;
            return (
              <button
                key={pt.id}
                onClick={() => setCurrentPointIndex(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {idx + 1}. {pt.category}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Story Point Stage View */}
      <div className={`p-6 sm:p-8 rounded-lg border relative overflow-hidden ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="max-w-4xl space-y-6">
          
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
              <span>Tableau Story Point {currentPoint.id}</span>
              <span>·</span>
              <span>{currentPoint.tagline}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {currentPoint.title}
            </h2>
          </div>

          {/* Metric Highlight Hero Banner */}
          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                {currentPoint.metricHighlight.label}
              </span>
              <span className="text-3xl font-bold font-mono-numbers text-white">
                {currentPoint.metricHighlight.value}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                {currentPoint.metricHighlight.subtext}
              </span>
            </div>

            <button
              onClick={() => onNavigateToScenario(currentPoint.targetTab)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shrink-0"
            >
              <span>Explore Dedicated Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Prose Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {currentPoint.description}
          </p>

          {/* Key Insights List */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Key Analytical Takeaways:
            </h4>
            <div className="space-y-2">
              {currentPoint.insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Recommendation */}
          <div className="p-4 bg-slate-800/40 border border-slate-700/70 rounded-lg text-xs space-y-1">
            <span className="font-bold text-amber-400 uppercase tracking-wide block">
              Strategic Actionable Directive:
            </span>
            <p className="text-slate-300">
              {currentPoint.recommendation}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
