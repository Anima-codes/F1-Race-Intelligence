import { ProjectEpic, ProjectTask } from '../types/f1';

export const SYSTEM_REQUIREMENTS = {
  cpu: 'Dual-core (Intel i3 or equivalent) — Recommended: Intel i5 / Ryzen 5 or higher',
  ram: 'Minimum 8 GB — Recommended: 16 GB for handling large datasets (6,464 records)',
  storage: 'Minimum 2–3 GB free — Recommended: SSD with 10+ GB free space',
  os: 'Windows 10/11 (64-bit) or macOS (latest supported versions)',
  software: 'Tableau Desktop or Tableau Public (2024.1+)',
  browser: 'Latest version of Chrome, Edge, or Safari',
  dataSources: 'Excel, CSV, or relational databases (SQL / PostgreSQL)'
};

export const EPICS: ProjectEpic[] = [
  {
    id: 'epic-1',
    epicNumber: 1,
    title: 'Data Architecture & 17-Season Ingestion (6,464 Records)',
    description: 'Ingestion, data cleansing, harmonizing driver/constructor names, and structuring 6,464 race records across 17 seasons (2008–2024).',
    tasksCount: 2,
    status: 'Completed',
    tableauSheet: 'Data Source Schema & Extracted Hyper'
  },
  {
    id: 'epic-2',
    epicNumber: 2,
    title: 'Constructor Championship & Trajectory Benchmarking',
    description: 'Benchmarking mid-tier team championship trajectories against Red Bull Racing and Mercedes with cumulative points tracking.',
    tasksCount: 2,
    status: 'Completed',
    tableauSheet: 'Sheet 1: Constructor Trajectory Benchmark'
  },
  {
    id: 'epic-3',
    epicNumber: 3,
    title: 'Tyre Compound & Pit Stop Strategy Analytics',
    description: 'Analyzing performance deltas, degradation curves, and optimal stint windows across Soft, Medium, Hard, and Wet compounds.',
    tasksCount: 2,
    status: 'Completed',
    tableauSheet: 'Sheet 2: Tyre Degradation & Strategy Matrix'
  },
  {
    id: 'epic-4',
    epicNumber: 4,
    title: 'Global Talent Pool & Driver Demographics',
    description: 'Mapping driver nationalities, points productivity per country, and identifying high-yield recruitment talent pipelines globally.',
    tasksCount: 1,
    status: 'Completed',
    tableauSheet: 'Sheet 3: Global Talent Pool & Nationalities'
  },
  {
    id: 'epic-5',
    epicNumber: 5,
    title: 'Broadcast Intelligence & Infographics Studio',
    description: 'Real-time telemetry and on-screen broadcast lower-third graphic generator for live television and media journalism.',
    tasksCount: 2,
    status: 'Completed',
    tableauSheet: 'Dashboard 1: Broadcast Media Studio'
  },
  {
    id: 'epic-6',
    epicNumber: 6,
    title: 'Circuit Geography & Grand Prix Hosting Analytics',
    description: 'Geospatial mapping of host countries, circuit technical specs, DRS zones, and tyre thermal stress classifications.',
    tasksCount: 1,
    status: 'Completed',
    tableauSheet: 'Sheet 4: Global Circuit Geospatial Map'
  },
  {
    id: 'epic-7',
    epicNumber: 7,
    title: 'Reliability Diagnostics & DNF Technical Analysis',
    description: 'Analyzing 1,124+ DNF events across 6 mechanical failure categories and assessing regulatory era completion rates.',
    tasksCount: 3,
    status: 'Completed',
    tableauSheet: 'Sheet 5: Driver Reliability & DNF Stack'
  },
  {
    id: 'epic-8',
    epicNumber: 8,
    title: 'Tableau Story Points & Executive Synthesis',
    description: 'Guided 6-chapter Tableau Story narrative connecting performance strategy, broadcast stats, and FIA regulatory directives.',
    tasksCount: 1,
    status: 'Completed',
    tableauSheet: 'Story 1: Formula 1 Race Intelligence Story'
  }
];

export const TASKS: ProjectTask[] = [
  {
    id: 'task-1',
    epicNumber: 1,
    taskNumber: 1,
    title: 'Ingest 6,464 race entry records across 17 seasons (2008–2024)',
    owner: 'Data Engineering Lead',
    description: 'Extract and structure 17 full seasons of Grand Prix results into tabular dimensional model with season, round, circuit, driver, constructor, and finish status.',
    deliverable: 'Cleaned multi-season dimensional dataset (CSV & Hyper)',
    status: 'Completed',
    metrics: '6,464 rows / 100% record integrity / 0 NULL values'
  },
  {
    id: 'task-2',
    epicNumber: 1,
    taskNumber: 2,
    title: 'Harmonize constructor identity and name migrations',
    owner: 'BI Developer',
    description: 'Map historical lineage (e.g. Force India -> Racing Point -> Aston Martin; Renault -> Lotus -> Alpine; Sauber -> Alfa Romeo -> Kick Sauber).',
    deliverable: 'Standardized Constructor Mapping Dimension',
    status: 'Completed',
    metrics: '10 Primary Constructor lineages mapped'
  },
  {
    id: 'task-3',
    epicNumber: 2,
    taskNumber: 3,
    title: 'Develop Team Championship Trajectory Benchmark Line Chart',
    owner: 'Rajan (Team Strategist)',
    description: 'Plot cumulative and annual points trajectories for Red Bull Racing, Mercedes-AMG, Ferrari, McLaren, and mid-tier constructors.',
    deliverable: 'Dual-axis cumulative points timeline with season filter',
    status: 'Verified',
    metrics: '17 seasons benchmarked / Gap delta calculated'
  },
  {
    id: 'task-4',
    epicNumber: 2,
    taskNumber: 4,
    title: 'Formulate Mid-tier Constructor Optimization Gap Analysis',
    owner: 'Rajan (Team Strategist)',
    description: 'Calculate points efficiency per Grand Prix finish and identify seasonal inflection points to formulate development roadmap.',
    deliverable: 'Gap Analysis KPI card & recruitment strategy blueprint',
    status: 'Completed',
    metrics: '+45 pts/season target modeled'
  },
  {
    id: 'task-5',
    epicNumber: 3,
    taskNumber: 5,
    title: 'Model Tyre Degradation Curves and Stint Windows',
    owner: 'Race Simulation Engineer',
    description: 'Derive degradation rates (sec/lap) across Soft (0.115s), Medium (0.065s), Hard (0.028s), Inter (0.080s), and Wet (0.095s) compounds.',
    deliverable: 'Interactive compound degradation comparison curves',
    status: 'Verified',
    metrics: '5 compounds characterized / 4 circuit profiles'
  },
  {
    id: 'task-6',
    epicNumber: 3,
    taskNumber: 6,
    title: 'Build Interactive Pit Stop Loss & Strategy Simulator',
    owner: 'Rajan (Team Strategist)',
    description: 'Compute circuit pit loss time (e.g., 21.8s at Silverstone vs 28.5s at Marina Bay) and simulate 1-stop vs 2-stop crossover deltas.',
    deliverable: 'Interactive 1-stop vs 2-stop Race Simulation Engine',
    status: 'Verified',
    metrics: 'Crossover delta calculated in real-time'
  },
  {
    id: 'task-7',
    epicNumber: 4,
    taskNumber: 7,
    title: 'Map Global Driver Nationality Talent Pools and Points Yield',
    owner: 'Driver Recruitment Analyst',
    description: 'Aggregate points, wins, and podiums across driver nationalities (UK, Germany, Spain, Netherlands, Australia, Finland, etc.).',
    deliverable: 'Geographic driver productivity bubble matrix',
    status: 'Completed',
    metrics: '12 Nationalities / 40+ Drivers indexed'
  },
  {
    id: 'task-8',
    epicNumber: 5,
    taskNumber: 8,
    title: 'Build Driver Performance Leaderboard with Multi-Metric Sort',
    owner: 'Divya (Broadcast Analyst)',
    description: 'Create dynamic leaderboard tracking career cumulative points, wins, podiums, poles, fastest laps, and win percentages.',
    deliverable: 'Interactive Broadcast Leaderboard Table',
    status: 'Verified',
    metrics: 'Hamilton (4,829.5 pts), Verstappen (3,014.5 pts), Vettel (3,098 pts)'
  },
  {
    id: 'task-9',
    epicNumber: 5,
    taskNumber: 9,
    title: 'Implement On-Screen Broadcast Infographics & Slate Generator',
    owner: 'Divya (Broadcast Analyst)',
    description: 'Generate production-ready TV broadcast lower-third graphics and head-to-head comparison telemetry cards for media reporting.',
    deliverable: 'Exportable Broadcast Lower-Third & Telemetry Slate Card',
    status: 'Verified',
    metrics: 'Instant copy/export with broadcast color standards'
  },
  {
    id: 'task-10',
    epicNumber: 6,
    taskNumber: 10,
    title: 'Develop Circuit Intelligence & Global Grand Prix Hosting Map',
    owner: 'Divya (Broadcast Analyst)',
    description: 'Map all Grand Prix host venues globally with circuit length, DRS zones, turn counts, lap records, and tyre degradation levels.',
    deliverable: 'Global circuit atlas with interactive inspection modals',
    status: 'Completed',
    metrics: '16 Premier circuits / 74 GP Monza to 12 COTA'
  },
  {
    id: 'task-11',
    epicNumber: 7,
    taskNumber: 11,
    title: 'Categorize 1,124 DNF Occurrences into 6 Failure Taxonomies',
    owner: 'Arvind (FIA Technical Analyst)',
    description: 'Tag each DNF into: Power Unit/Engine (31%), Collisions (20.3%), Gearbox (17.6%), Hydraulics/Brakes (13.7%), Electrical (10.1%), Suspension (7.3%).',
    deliverable: 'Stacked DNF failure mode distribution chart',
    status: 'Verified',
    metrics: '1,124 DNFs categorized with 100% classification'
  },
  {
    id: 'task-12',
    epicNumber: 7,
    taskNumber: 12,
    title: 'Compute Driver Reliability Index and Mechanical Finish Rates',
    owner: 'Arvind (FIA Technical Analyst)',
    description: 'Calculate finish completion percentages by driver and constructor across all 17 seasons to isolate driver error vs mechanical faults.',
    deliverable: 'Driver Reliability Index rankings & constructor breakdown',
    status: 'Completed',
    metrics: 'Mercedes (91.3% reliability) vs Red Bull (88.5%)'
  },
  {
    id: 'task-13',
    epicNumber: 7,
    taskNumber: 13,
    title: 'Quantify Regulatory Era Shifts on Reliability and Safety',
    owner: 'Arvind (FIA Technical Analyst)',
    description: 'Compare DNF rates across V8 Era (21.4%), Turbo-Hybrid (16.1%), and Ground Effect Era (13.8%) to gauge regulation effectiveness.',
    deliverable: 'Era comparison matrix with regulatory milestones',
    status: 'Verified',
    metrics: '-7.6% DNF reduction over 17 years'
  },
  {
    id: 'task-14',
    epicNumber: 8,
    taskNumber: 14,
    title: 'Author 6-Point Tableau Story and Executive Summary Deck',
    owner: 'Lead Motorsport Intelligence Strategist',
    description: 'Synthesize insights into an interactive Tableau Storyline covering trajectories, tyre strategies, broadcast stats, and FIA recommendations.',
    deliverable: 'Complete 6-point interactive Tableau Story navigation',
    status: 'Verified',
    metrics: '6 Story points / Executive takeaways finalized'
  }
];

export const CALCULATED_FIELDS = [
  {
    name: 'Podium Conversion Rate',
    formula: 'SUM([Podiums]) / SUM([Races Started]) * 100',
    type: 'Percentage (%)',
    description: 'Measures how frequently a driver translates a Grand Prix start into a podium finish.'
  },
  {
    name: 'Driver Reliability Index',
    formula: '(SUM([Finishes]) / SUM([Entries])) * 100',
    type: 'Percentage (%)',
    description: 'Percentage of Grand Prix entries where the driver successfully crossed the chequered flag.'
  },
  {
    name: 'Mechanical Failure Ratio',
    formula: 'SUM(IIF([DNF Type] = "Mechanical", 1, 0)) / SUM([Total DNFs]) * 100',
    type: 'Percentage (%)',
    description: 'Distinguishes between car reliability failures and on-track collisions / driver error.'
  },
  {
    name: 'Tyre Degradation Stint Penalty',
    formula: 'SUM([Stint Laps]) * [Degradation Rate (s/lap)]',
    type: 'Seconds (s)',
    description: 'Estimated lap time degradation accumulated at end of stint relative to fresh tyre baseline.'
  },
  {
    name: 'Points Productivity per GP',
    formula: 'SUM([Championship Points]) / SUM([Races Entered])',
    type: 'Decimal (pts/GP)',
    description: 'Average points scored per race entry, normalizing for season length differences.'
  }
];
