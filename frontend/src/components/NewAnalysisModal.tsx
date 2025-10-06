"use client";

import { useState } from "react";
import { X, Play, Telescope } from "lucide-react";

interface NewAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (analysisConfig: AnalysisConfig) => void;
}

export interface AnalysisConfig {
  detector: string;
  analysisType: string;
  startDate: string;
  endDate: string;
  sensitivity: number;
  frequencyRange: {
    min: number;
    max: number;
  };
  description: string;
}

export default function NewAnalysisModal({
  isOpen,
  onClose,
  onSubmit,
}: NewAnalysisModalProps) {
  const [config, setConfig] = useState<AnalysisConfig>({
    detector: "LIGO_HANFORD",
    analysisType: "glitch_detection",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    sensitivity: 0.8,
    frequencyRange: {
      min: 10,
      max: 1000,
    },
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(config);
      onClose();
    } catch (error) {
      console.error("Erro ao submeter análise:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Telescope className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Nova Análise de Ondas Gravitacionais
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Detector Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Detector
            </label>
            <select
              value={config.detector}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, detector: e.target.value }))
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="LIGO_HANFORD">LIGO Hanford</option>
              <option value="LIGO_LIVINGSTON">LIGO Livingston</option>
              <option value="VIRGO">Virgo</option>
              <option value="KAGRA">KAGRA</option>
              <option value="ALL">Todos os Detectores</option>
            </select>
          </div>

          {/* Analysis Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tipo de Análise
            </label>
            <select
              value={config.analysisType}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, analysisType: e.target.value }))
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="glitch_detection">Detecção de Glitches</option>
              <option value="gravitational_wave_search">
                Busca por Ondas Gravitacionais
              </option>
              <option value="noise_analysis">Análise de Ruído</option>
              <option value="spectral_analysis">Análise Espectral</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Data de Início
              </label>
              <input
                type="date"
                value={config.startDate}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, startDate: e.target.value }))
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Data de Fim
              </label>
              <input
                type="date"
                value={config.endDate}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sensitivity */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Sensibilidade: {config.sensitivity}
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={config.sensitivity}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  sensitivity: parseFloat(e.target.value),
                }))
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Baixa</span>
              <span>Alta</span>
            </div>
          </div>

          {/* Frequency Range */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Faixa de Frequência (Hz)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Min (Hz)"
                  value={config.frequencyRange.min}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      frequencyRange: {
                        ...prev.frequencyRange,
                        min: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max (Hz)"
                  value={config.frequencyRange.max}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      frequencyRange: {
                        ...prev.frequencyRange,
                        max: parseInt(e.target.value) || 1000,
                      },
                    }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Descrição (Opcional)
            </label>
            <textarea
              value={config.description}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Descreva o objetivo desta análise..."
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Iniciar Análise
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
