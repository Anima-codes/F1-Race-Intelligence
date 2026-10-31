import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ALL_RACE_RECORDS } from '../data/f1Data';
import { RaceEntry } from '../types/f1';

interface RawDataExplorerProps {
  isLightMode: boolean;
}

export const RawDataExplorer: React.FC<RawDataExplorerProps> = ({ isLightMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Finished' | 'DNF'>('All');
  const [compoundFilter, setCompoundFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortField, setSortField] = useState<keyof RaceEntry>('season');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter dataset
  const filteredData = useMemo(() => {
    return ALL_RACE_RECORDS.filter((record) => {
      const matchesSearch = 
        record.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.constructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.grandPrix.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.circuit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeason = seasonFilter === 'All' || record.season === Number(seasonFilter);
      const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
      const matchesCompound = compoundFilter === 'All' || record.primaryCompound === compoundFilter;

      return matchesSearch && matchesSeason && matchesStatus && matchesCompound;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA === undefined || valB === undefined) return 0;
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchTerm, seasonFilter, statusFilter, compoundFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (field: keyof RaceEntry) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'ID', 'Season', 'Round', 'Grand Prix', 'Circuit', 'Country', 'Circuit Type',
      'Driver', 'Code', 'Nationality', 'Constructor', 'Grid', 'Finish', 'Status',
      'DNF Reason', 'DNF Category', 'Points', 'Laps Completed', 'Total Laps',
      'Pit Stops', 'Primary Tyre', 'Era'
    ];

    const rows = filteredData.map(r => [
      r.id,
      r.season,
      r.round,
      `"${r.grandPrix}"`,
      `"${r.circuit}"`,
      `"${r.country}"`,
      r.circuitType,
      `"${r.driverName}"`,
      r.driverCode,
      r.driverNationality,
      `"${r.constructorName}"`,
      r.gridPosition,
      r.finishPosition,
      r.status,
      `"${r.dnfReason || ''}"`,
      r.dnfCategory,
      r.points,
      r.lapsCompleted,
      r.totalLaps,
      r.pitStops,
      r.primaryCompound,
      `"${r.era}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `F1_Race_Intelligence_6464_Records_${seasonFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      
      {/* Header & Controls */}
      <div className={`p-4 rounded-lg border ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Full Tabular Dataset (6,464 Race Entries · 17 Seasons)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Query, filter, inspect and export all 6,464 Grand Prix records across 2008–2024.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV ({filteredData.length.toLocaleString()} Rows)</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-800/60 mt-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search driver, team, circuit..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded pl-8 pr-3 py-1.5 focus:outline-none"
            />
          </div>

          {/* Season */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 shrink-0">Season:</span>
            <select
              value={seasonFilter}
              onChange={(e) => { setSeasonFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1.5"
            >
              <option value="All">All 17 Seasons (2008–2024)</option>
              {Array.from({ length: 17 }, (_, i) => 2008 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1.5"
            >
              <option value="All">All Results</option>
              <option value="Finished">Finished Chequered Flag</option>
              <option value="DNF">Did Not Finish (DNF)</option>
            </select>
          </div>

          {/* Tyre */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 shrink-0">Tyre:</span>
            <select
              value={compoundFilter}
              onChange={(e) => { setCompoundFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1.5"
            >
              <option value="All">All Compounds</option>
              <option value="Soft">Soft (Red)</option>
              <option value="Medium">Medium (Yellow)</option>
              <option value="Hard">Hard (White)</option>
            </select>
          </div>
        </div>
      </div>

      {/* High Density Table */}
      <div className={`rounded-lg border overflow-hidden ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono">
                <th className="py-2.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('season')}>
                  <span className="inline-flex items-center gap-1">Season <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2.5 px-3">Grand Prix</th>
                <th className="py-2.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('driverName')}>
                  <span className="inline-flex items-center gap-1">Driver <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2.5 px-3">Constructor</th>
                <th className="py-2.5 px-3 text-center">Grid</th>
                <th className="py-2.5 px-3 text-center cursor-pointer hover:text-white" onClick={() => handleSort('finishPosition')}>
                  <span className="inline-flex items-center gap-1">Finish <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2.5 px-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('points')}>
                  <span className="inline-flex items-center gap-1">Points <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2.5 px-3 text-center">Tyres</th>
                <th className="py-2.5 px-3">Status / DNF Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
              {paginatedData.map((record) => (
                <tr key={record.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2 px-3 font-semibold text-slate-300">{record.season} (R{record.round})</td>
                  <td className="py-2 px-3 font-sans">
                    <span className="text-white block font-medium truncate max-w-[150px]">{record.grandPrix}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{record.circuitType}</span>
                  </td>
                  <td className="py-2 px-3 font-sans">
                    <span className="font-semibold text-white block">{record.driverName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{record.driverNationality}</span>
                  </td>
                  <td className="py-2 px-3 font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: record.constructorColor }} />
                      <span className="text-slate-300 truncate max-w-[130px]">{record.constructorName}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center font-mono text-slate-400">P{record.gridPosition}</td>
                  <td className="py-2 px-3 text-center font-mono">
                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                      record.finishPosition === 1 ? 'bg-amber-500/20 text-amber-300' :
                      record.finishPosition <= 3 ? 'bg-slate-300/20 text-slate-200' :
                      record.finishPosition <= 10 ? 'bg-emerald-500/20 text-emerald-300' :
                      'text-slate-400'
                    }`}>
                      {record.status === 'DNF' ? 'DNF' : `P${record.finishPosition}`}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-bold font-mono text-red-400">
                    {record.points > 0 ? `+${record.points}` : '0'}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      record.primaryCompound === 'Soft' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                      record.primaryCompound === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                      'bg-slate-200/20 text-slate-200 border border-slate-300/40'
                    }`}>
                      {record.primaryCompound}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-xs">
                    {record.status === 'Finished' ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Finished ({record.lapsCompleted}/{record.totalLaps} Laps)</span>
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1 truncate max-w-[200px]" title={record.dnfReason}>
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span className="truncate">{record.dnfCategory}: {record.dnfReason}</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            Showing <span className="text-white font-semibold">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
            <span className="text-white font-semibold">{Math.min(currentPage * pageSize, filteredData.length)}</span> of{' '}
            <span className="text-white font-semibold">{filteredData.length.toLocaleString()}</span> entries
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-0.5 text-xs"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono">
                {currentPage} / {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
