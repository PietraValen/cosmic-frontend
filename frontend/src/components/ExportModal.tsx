"use client";

import { useState } from "react";
import { X, Download, FileText, Database } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (exportConfig: ExportConfig) => void;
}

export interface ExportConfig {
  format: "csv" | "json" | "pdf" | "xlsx";
  dataType: "glitches" | "events" | "statistics" | "all";
  dateRange: {
    start: string;
    end: string;
  };
  includeMetadata: boolean;
  includeCharts: boolean;
}

export default function ExportModal({
  isOpen,
  onClose,
  onExport,
}: ExportModalProps) {
  const [config, setConfig] = useState<ExportConfig>({
    format: "csv",
    dataType: "glitches",
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 30 dias atrás
      end: new Date().toISOString().split("T")[0],
    },
    includeMetadata: true,
    includeCharts: false,
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);

    try {
      await onExport(config);
      onClose();
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const formatOptions = [
    {
      value: "csv",
      label: "CSV",
      description: "Planilha compatível com Excel",
      icon: FileText,
    },
    {
      value: "json",
      label: "JSON",
      description: "Formato estruturado para APIs",
      icon: Database,
    },
    {
      value: "pdf",
      label: "PDF",
      description: "Relatório formatado para impressão",
      icon: FileText,
    },
    {
      value: "xlsx",
      label: "Excel",
      description: "Arquivo nativo do Microsoft Excel",
      icon: FileText,
    },
  ];

  const dataTypeOptions = [
    {
      value: "glitches",
      label: "Glitches Detectados",
      description: "Anomalias e interferências identificadas",
    },
    {
      value: "events",
      label: "Eventos Gravitacionais",
      description: "Detecções de ondas gravitacionais confirmadas",
    },
    {
      value: "statistics",
      label: "Estatísticas",
      description: "Métricas e resumos analíticos",
    },
    {
      value: "all",
      label: "Todos os Dados",
      description: "Exportação completa do dataset",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Download className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Exportar Dados</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleExport} className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Formato de Exportação
            </label>
            <div className="grid grid-cols-2 gap-3">
              {formatOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        format: option.value as ExportConfig["format"],
                      }))
                    }
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      config.format === option.value
                        ? "border-green-500 bg-green-500/10"
                        : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-4 h-4 text-green-400" />
                      <span className="font-medium text-white">
                        {option.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data Type Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Tipo de Dados
            </label>
            <div className="space-y-2">
              {dataTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      dataType: option.value as ExportConfig["dataType"],
                    }))
                  }
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    config.dataType === option.value
                      ? "border-green-500 bg-green-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                  }`}
                >
                  <div className="font-medium text-white">{option.label}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Período de Dados
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Data de Início
                </label>
                <input
                  type="date"
                  value={config.dateRange.start}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value },
                    }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Data de Fim
                </label>
                <input
                  type="date"
                  value={config.dateRange.end}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value },
                    }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Opções Adicionais
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.includeMetadata}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      includeMetadata: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                />
                <div>
                  <div className="text-white text-sm">Incluir Metadados</div>
                  <div className="text-gray-400 text-xs">
                    Informações adicionais sobre detectores e configurações
                  </div>
                </div>
              </label>

              {(config.format === "pdf" || config.format === "xlsx") && (
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.includeCharts}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        includeCharts: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                  />
                  <div>
                    <div className="text-white text-sm">Incluir Gráficos</div>
                    <div className="text-gray-400 text-xs">
                      Visualizações e espectrogramas nos relatórios
                    </div>
                  </div>
                </label>
              )}
            </div>
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
              disabled={isExporting}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Exportar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
