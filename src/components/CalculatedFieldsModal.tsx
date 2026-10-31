import React from 'react';
import { X, Sparkles, Code2, Calculator } from 'lucide-react';
import { CALCULATED_FIELDS } from '../data/projectArchitecture';

interface CalculatedFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode: boolean;
}

export const CalculatedFieldsModal: React.FC<CalculatedFieldsModalProps> = ({
  isOpen,
  onClose,
  isLightMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`w-full max-w-2xl max-h-[90vh] rounded-lg border overflow-hidden flex flex-col shadow-2xl ${
        isLightMode ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Tableau Calculated Fields & Formulas
              </h3>
              <p className="text-xs text-slate-400">
                Formula specifications for derived race intelligence and reliability metrics
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3.5 text-xs flex-1">
          {CALCULATED_FIELDS.map((field) => (
            <div key={field.name} className="p-3.5 rounded bg-slate-800/40 border border-slate-700/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-red-400" />
                  {field.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {field.type}
                </span>
              </div>

              <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                <code>{field.formula}</code>
              </div>

              <p className="text-slate-400 text-xs">
                {field.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end">
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
