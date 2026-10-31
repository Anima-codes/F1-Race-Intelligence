import React, { useState } from 'react';
import { X, Layers, CheckCircle2, Cpu, HardDrive, Monitor, Database, Award } from 'lucide-react';
import { EPICS, TASKS, SYSTEM_REQUIREMENTS } from '../data/projectArchitecture';

interface ProjectArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode: boolean;
}

export const ProjectArchitectureModal: React.FC<ProjectArchitectureModalProps> = ({
  isOpen,
  onClose,
  isLightMode,
}) => {
  const [activeTab, setActiveTab] = useState<'epics' | 'tasks' | 'requirements'>('epics');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-lg border overflow-hidden flex flex-col shadow-2xl ${
        isLightMode ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Formula 1 Race Intelligence · Technical Architecture
              </h3>
              <p className="text-xs text-slate-400">
                Tableau BI Implementation Structure: 8 Epics · 14 Tasks · 0 Subtasks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('epics')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'epics' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Epics (Total: 8)
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tasks' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tasks & Deliverables (Total: 14)
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'requirements' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            System Requirements & Tableau Specs
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* TAB 1: 8 Epics */}
          {activeTab === 'epics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {EPICS.map((epic) => (
                <div key={epic.id} className="p-3.5 rounded bg-slate-800/40 border border-slate-700/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-red-400 font-bold">Epic 0{epic.epicNumber}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-400 font-medium text-[10px]">
                      {epic.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{epic.title}</h4>
                  <p className="text-slate-400 text-xs">{epic.description}</p>
                  <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                    Tableau Target: <span className="text-slate-300">{epic.tableauSheet}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: 14 Tasks */}
          {activeTab === 'tasks' && (
            <div className="space-y-3">
              {TASKS.map((task) => (
                <div key={task.id} className="p-3 rounded bg-slate-800/40 border border-slate-700/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-red-400 font-bold">Task {task.taskNumber}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 font-mono text-[11px]">Epic {task.epicNumber}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300 font-medium">Owner: {task.owner}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{task.title}</h4>
                    <p className="text-slate-400 text-xs">{task.description}</p>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      Deliverable: {task.deliverable}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-slate-300 text-[10px] block">
                      {task.metrics}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: System Requirements */}
          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/40 rounded border border-slate-700/70 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-sky-400" />
                  <span>Technical Architecture & Hardware Specifications</span>
                </h4>
                <p className="text-slate-300 text-xs">
                  Recommended environment configurations for processing the 6,464 race entries across 17 seasons in Tableau:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" /> Processor (CPU)
                    </span>
                    <p className="text-white font-mono text-xs">{SYSTEM_REQUIREMENTS.cpu}</p>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-emerald-400" /> RAM Memory
                    </span>
                    <p className="text-white font-mono text-xs">{SYSTEM_REQUIREMENTS.ram}</p>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-sky-400" /> Storage Drive
                    </span>
                    <p className="text-white font-mono text-xs">{SYSTEM_REQUIREMENTS.storage}</p>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-red-400" /> Tableau & Data Pipeline
                    </span>
                    <p className="text-white font-mono text-xs">{SYSTEM_REQUIREMENTS.software} · {SYSTEM_REQUIREMENTS.dataSources}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            8 Epics · 14 Tasks · 0 Subtasks
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
