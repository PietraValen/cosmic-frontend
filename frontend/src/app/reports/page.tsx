"use client";

import { useRequireAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ArrowLeft,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Zap,
  Brain,
  Globe,
  Filter,
  Settings,
  Mail,
  Share2,
} from "lucide-react";

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: "analysis" | "detection" | "summary" | "collaboration";
  dateRange: string;
  generatedAt: string;
  size: string;
  status: "ready" | "generating" | "error";
}

export default function ReportsPage() {
  const { user, isLoading } = useRequireAuth();
  const [selectedReportType, setSelectedReportType] = useState("summary");
  const [dateRange, setDateRange] = useState("month");
  const [availableReports] = useState<ReportData[]>([
    {
      id: "1",
      title: "Relatório Mensal de Análises",
      description: "Resumo completo das análises realizadas em dezembro 2024",
      type: "analysis",
      dateRange: "Dezembro 2024",
      generatedAt: "2024-01-20 10:30",
      size: "2.4 MB",
      status: "ready",
    },
    {
      id: "2",
      title: "Detecções de Glitches - Semanal",
      description:
        "Relatório detalhado de glitches detectados na última semana",
      type: "detection",
      dateRange: "13-20 Jan 2024",
      generatedAt: "2024-01-20 08:15",
      size: "1.8 MB",
      status: "ready",
    },
    {
      id: "3",
      title: "Resumo de Colaborações",
      description: "Atividades colaborativas e parcerias do trimestre",
      type: "collaboration",
      dateRange: "Q4 2024",
      generatedAt: "2024-01-19 16:45",
      size: "950 KB",
      status: "ready",
    },
    {
      id: "4",
      title: "Análise Anual 2024",
      description: "Relatório completo anual com todas as descobertas",
      type: "summary",
      dateRange: "Janeiro - Dezembro 2024",
      generatedAt: "2024-01-18 14:20",
      size: "15.7 MB",
      status: "generating",
    },
  ]);

  const getReportIcon = (type: string) => {
    switch (type) {
      case "analysis":
        return <BarChart3 className="w-5 h-5" />;
      case "detection":
        return <Zap className="w-5 h-5" />;
      case "summary":
        return <PieChart className="w-5 h-5" />;
      case "collaboration":
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getReportColor = (type: string) => {
    switch (type) {
      case "analysis":
        return "text-blue-400 bg-blue-500/10";
      case "detection":
        return "text-yellow-400 bg-yellow-500/10";
      case "summary":
        return "text-green-400 bg-green-500/10";
      case "collaboration":
        return "text-purple-400 bg-purple-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "text-green-400 bg-green-500/10";
      case "generating":
        return "text-yellow-400 bg-yellow-500/10";
      case "error":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const generateNewReport = () => {
    console.log("Generating new report:", {
      type: selectedReportType,
      dateRange: dateRange,
    });
    alert("Novo relatório será gerado e ficará disponível em alguns minutos!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // useRequireAuth will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-7 h-7 text-blue-400" />
                Relatórios e Exportações
              </h1>
            </div>
            <span className="text-white font-medium">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gerador de Relatórios */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 sticky top-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Gerar Novo Relatório
              </h2>

              <div className="space-y-6">
                {/* Tipo de Relatório */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">
                    Tipo de Relatório
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="summary"
                        checked={selectedReportType === "summary"}
                        onChange={(e) => setSelectedReportType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-green-400" />
                        <span className="text-white">Resumo Geral</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="analysis"
                        checked={selectedReportType === "analysis"}
                        onChange={(e) => setSelectedReportType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                        <span className="text-white">Análises Detalhadas</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="detection"
                        checked={selectedReportType === "detection"}
                        onChange={(e) => setSelectedReportType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-white">
                          Detecções de Glitches
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="collaboration"
                        checked={selectedReportType === "collaboration"}
                        onChange={(e) => setSelectedReportType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-white">Colaborações</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Período */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Período
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="week">Última semana</option>
                    <option value="month">Último mês</option>
                    <option value="quarter">Último trimestre</option>
                    <option value="year">Último ano</option>
                    <option value="custom">Período personalizado</option>
                  </select>
                </div>

                {/* Formato */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Formato de Exportação
                  </label>
                  <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="pdf">PDF</option>
                    <option value="xlsx">Excel (XLSX)</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                  </select>
                </div>

                {/* Botão Gerar */}
                <button
                  onClick={generateNewReport}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 justify-center transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Gerar Relatório
                </button>

                {/* Opções Rápidas */}
                <div className="border-t border-white/20 pt-6">
                  <h3 className="text-white font-medium mb-3">Ações Rápidas</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm transition-colors">
                      <Mail className="w-4 h-4" />
                      Enviar por Email
                    </button>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm transition-colors">
                      <Share2 className="w-4 h-4" />
                      Compartilhar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Relatórios */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Relatórios Disponíveis
                </h2>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar className="w-4 h-4" />
                  Últimas atualizações
                </div>
              </div>

              <div className="space-y-4">
                {availableReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${getReportColor(
                            report.type
                          )}`}
                        >
                          {getReportIcon(report.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg mb-1">
                            {report.title}
                          </h3>
                          <p className="text-gray-300 mb-2">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {report.dateRange}
                            </div>
                            <div>Gerado em: {report.generatedAt}</div>
                            <div>Tamanho: {report.size}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status === "ready"
                            ? "✅ Pronto"
                            : report.status === "generating"
                            ? "⏳ Gerando..."
                            : report.status === "error"
                            ? "❌ Erro"
                            : report.status}
                        </div>
                        {report.status === "ready" && (
                          <div className="flex gap-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors">
                              <Download className="w-3 h-3" />
                              Baixar
                            </button>
                            <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">
                              Ver
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estatísticas de Relatórios */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">47</div>
                <div className="text-gray-300 text-sm">Total de Análises</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">156</div>
                <div className="text-gray-300 text-sm">Glitches Detectados</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                <Brain className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">94.2%</div>
                <div className="text-gray-300 text-sm">Precisão Média</div>
              </div>
            </div>

            {/* Links Relacionados */}
            <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Links Relacionados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/analysis"
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Nova Análise</div>
                    <div className="text-gray-400 text-sm">
                      Iniciar análise de dados
                    </div>
                  </div>
                </Link>
                <Link
                  href="/galaxy"
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Globe className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">
                      Visualização 3D
                    </div>
                    <div className="text-gray-400 text-sm">
                      Explorar galáxia
                    </div>
                  </div>
                </Link>
                <Link
                  href="/activity"
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Histórico</div>
                    <div className="text-gray-400 text-sm">Ver atividades</div>
                  </div>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Filter className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="text-white font-medium">Dashboard</div>
                    <div className="text-gray-400 text-sm">Visão geral</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
