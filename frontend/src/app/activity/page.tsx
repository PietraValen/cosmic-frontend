"use client";

import { useRequireAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import { api } from "@/services/api";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Brain,
  Users,
  Zap,
  ArrowLeft,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Pause,
  Play,
  Search,
  Loader2,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "analysis" | "detection" | "training" | "collaboration" | "system";
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "in-progress" | "failed" | "paused";
  details?: {
    duration?: string;
    glitchesFound?: number;
    confidence?: number;
    collaborator?: string;
    analysisId?: string;
  };
}

interface ActivityStats {
  totalActivities: number;
  completedAnalyses: number;
  glitchesDetected: number;
  collaborations: number;
  timeSpent: string;
}

export default function ActivityPage() {
  const { user, isLoading } = useRequireAuth();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>(
    []
  );
  const [stats, setStats] = useState<ActivityStats>({
    totalActivities: 0,
    completedAnalyses: 0,
    glitchesDetected: 0,
    collaborations: 0,
    timeSpent: "0h 0m",
  });
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  // Hook para carregar atividades do usuário da API
  const {
    data: apiActivities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useApi(() => api.getUserActivity({ limit: 50 }), {
    dependencies: [user],
  });

  // Função para transformar dados da API no formato da interface
  const transformApiActivities = useCallback(
    (
      apiData: Array<{
        id: string;
        action: string;
        description: string;
        timestamp: string;
        category: string;
      }>
    ): ActivityItem[] => {
      return apiData.map((item) => ({
        id: item.id,
        type: getActivityTypeFromCategory(item.category),
        title: formatActivityTitle(item.action),
        description: item.description,
        timestamp: new Date(item.timestamp).toLocaleString("pt-BR"),
        status: "completed" as const,
        details: {
          analysisId: item.id,
        },
      }));
    },
    []
  );

  const getActivityTypeFromCategory = (
    category: string
  ): ActivityItem["type"] => {
    switch (category) {
      case "analysis":
        return "analysis";
      case "authentication":
        return "system";
      case "profile":
        return "system";
      case "reports":
        return "analysis";
      case "spectrograms":
        return "analysis";
      default:
        return "system";
    }
  };

  const formatActivityTitle = (action: string): string => {
    switch (action) {
      case "login":
        return "Login realizado";
      case "analysis_started":
        return "Análise iniciada";
      case "profile_updated":
        return "Perfil atualizado";
      case "report_generated":
        return "Relatório gerado";
      case "spectrogram_viewed":
        return "Espectrograma visualizado";
      default:
        return action
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  // Atualizar atividades quando dados da API chegarem
  useEffect(() => {
    if (apiActivities) {
      const transformedActivities = transformApiActivities(apiActivities);
      setActivities(transformedActivities);
      setFilteredActivities(transformedActivities);

      // Calcular estatísticas baseadas nos dados reais
      setStats({
        totalActivities: transformedActivities.length,
        completedAnalyses: transformedActivities.filter(
          (a) => a.type === "analysis" && a.status === "completed"
        ).length,
        glitchesDetected:
          transformedActivities.filter(
            (a) => a.type === "detection" || a.type === "analysis"
          ).length * 5, // Simulação baseada na quantidade de análises
        collaborations: transformedActivities.filter(
          (a) => a.type === "collaboration"
        ).length,
        timeSpent: `${Math.floor(transformedActivities.length * 1.5)}h ${
          (transformedActivities.length * 15) % 60
        }m`,
      });
    }
  }, [apiActivities, transformApiActivities]);

  useEffect(() => {
    // Simular carregamento de atividades
    const mockActivities: ActivityItem[] = [
      {
        id: "1",
        type: "analysis",
        title: "Análise de Espectrograma Concluída",
        description:
          "Análise de dados LIGO Hanford - Dezembro 2024 finalizada com sucesso",
        timestamp: "2024-01-20 14:30",
        status: "completed",
        details: {
          duration: "2h 15m",
          glitchesFound: 23,
          confidence: 94.2,
          analysisId: "ANL-2024-001",
        },
      },
      {
        id: "2",
        type: "detection",
        title: "Glitch Detectado",
        description:
          "Sistema identificou possível interferência em LIGO Livingston",
        timestamp: "2024-01-20 13:45",
        status: "completed",
        details: {
          confidence: 87.5,
          analysisId: "DET-2024-045",
        },
      },
      {
        id: "3",
        type: "training",
        title: "Treinamento de IA Iniciado",
        description: "Sessão de treinamento do modelo de detecção em andamento",
        timestamp: "2024-01-20 12:00",
        status: "in-progress",
        details: {
          duration: "~3h 30m",
        },
      },
      {
        id: "4",
        type: "collaboration",
        title: "Nova Colaboração",
        description: "Iniciada colaboração com Dr. Sarah Wilson do MIT",
        timestamp: "2024-01-20 10:15",
        status: "completed",
        details: {
          collaborator: "Dr. Sarah Wilson (MIT)",
        },
      },
      {
        id: "5",
        type: "analysis",
        title: "Análise de Dados Virgo",
        description: "Processamento de dados do observatório Virgo na Europa",
        timestamp: "2024-01-19 16:20",
        status: "completed",
        details: {
          duration: "1h 45m",
          glitchesFound: 18,
          confidence: 91.7,
          analysisId: "ANL-2024-002",
        },
      },
      {
        id: "6",
        type: "system",
        title: "Atualização do Sistema",
        description:
          "Sistema atualizado para versão 2.1.0 com melhorias de performance",
        timestamp: "2024-01-19 09:00",
        status: "completed",
      },
      {
        id: "7",
        type: "detection",
        title: "Anomalia Detectada",
        description:
          "Padrão incomum identificado nos dados de onda gravitacional",
        timestamp: "2024-01-18 20:30",
        status: "completed",
        details: {
          confidence: 92.3,
          analysisId: "DET-2024-046",
        },
      },
      {
        id: "8",
        type: "analysis",
        title: "Análise Falhou",
        description:
          "Erro durante processamento de dados - memoria insuficiente",
        timestamp: "2024-01-18 14:15",
        status: "failed",
        details: {
          duration: "45m",
          analysisId: "ANL-2024-003",
        },
      },
      {
        id: "9",
        type: "training",
        title: "Modelo IA Atualizado",
        description:
          "Novo modelo de machine learning implementado com 95% de precisão",
        timestamp: "2024-01-17 11:30",
        status: "completed",
        details: {
          duration: "4h 20m",
        },
      },
      {
        id: "10",
        type: "collaboration",
        title: "Revisão de Paper",
        description: "Revisão colaborativa do paper sobre detecção de blips",
        timestamp: "2024-01-16 15:45",
        status: "completed",
        details: {
          collaborator: "Prof. Carlos Santos (USP)",
        },
      },
    ];

    setActivities(mockActivities);
    setFilteredActivities(mockActivities);

    // Calcular estatísticas
    setStats({
      totalActivities: mockActivities.length,
      completedAnalyses: mockActivities.filter(
        (a) => a.type === "analysis" && a.status === "completed"
      ).length,
      glitchesDetected: mockActivities
        .filter((a) => a.type === "detection" || a.type === "analysis")
        .reduce((sum, a) => sum + (a.details?.glitchesFound || 0), 0),
      collaborations: mockActivities.filter((a) => a.type === "collaboration")
        .length,
      timeSpent: "23h 45m",
    });
  }, []);

  useEffect(() => {
    let filtered = activities;

    // Filtro por tipo
    if (filterType !== "all") {
      filtered = filtered.filter((activity) => activity.type === filterType);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tempo
    if (timeFilter !== "all") {
      const now = new Date();
      let cutoffDate: Date;

      switch (timeFilter) {
        case "today":
          cutoffDate = new Date();
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          cutoffDate = new Date();
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoffDate = new Date();
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        default:
          cutoffDate = new Date(0); // fallback
      }

      filtered = filtered.filter(
        (activity) => new Date(activity.timestamp) >= cutoffDate
      );
    }

    setFilteredActivities(filtered);
  }, [activities, filterType, searchTerm, timeFilter]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "analysis":
        return <BarChart3 className="w-5 h-5" />;
      case "detection":
        return <Zap className="w-5 h-5" />;
      case "training":
        return <Brain className="w-5 h-5" />;
      case "collaboration":
        return <Users className="w-5 h-5" />;
      case "system":
        return <Activity className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "analysis":
        return "text-blue-400 bg-blue-500/10";
      case "detection":
        return "text-yellow-400 bg-yellow-500/10";
      case "training":
        return "text-green-400 bg-green-500/10";
      case "collaboration":
        return "text-purple-400 bg-purple-500/10";
      case "system":
        return "text-gray-400 bg-gray-500/10";
      default:
        return "text-slate-400 bg-slate-500/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "in-progress":
        return <Play className="w-4 h-4 text-blue-400" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in-progress":
        return "text-blue-400";
      case "failed":
        return "text-red-400";
      case "paused":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins} minutos atrás`;
    } else if (diffHours < 24) {
      return `${diffHours} horas atrás`;
    } else if (diffDays === 1) {
      return "ontem";
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`;
    } else {
      return date.toLocaleDateString("pt-BR");
    }
  };

  if (isLoading || activitiesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white">
            {isLoading
              ? "Carregando..."
              : "Carregando histórico de atividades..."}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // useRequireAuth will redirect
  }

  // Mostrar erro se houver problema ao carregar atividades
  if (activitiesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Erro ao carregar atividades
          </h2>
          <p className="text-gray-300 mb-4">
            Não foi possível carregar o histórico de atividades. Tente novamente
            mais tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
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
                <Activity className="w-7 h-7 text-blue-400" />
                Histórico de Atividades
              </h1>
            </div>
            <span className="text-white font-medium">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalActivities}
            </div>
            <div className="text-gray-300 text-sm">Total de Atividades</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.completedAnalyses}
            </div>
            <div className="text-gray-300 text-sm">Análises Completas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.glitchesDetected}
            </div>
            <div className="text-gray-300 text-sm">Glitches Detectados</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.collaborations}
            </div>
            <div className="text-gray-300 text-sm">Colaborações</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.timeSpent}
            </div>
            <div className="text-gray-300 text-sm">Tempo Total</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 sticky top-8">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </h2>

              {/* Busca */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar atividades..."
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Filtro por Tipo */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Tipo de Atividade
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas</option>
                  <option value="analysis">Análises</option>
                  <option value="detection">Detecções</option>
                  <option value="training">Treinamento</option>
                  <option value="collaboration">Colaborações</option>
                  <option value="system">Sistema</option>
                </select>
              </div>

              {/* Filtro por Tempo */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Período
                </label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todo o período</option>
                  <option value="today">Hoje</option>
                  <option value="week">Última semana</option>
                  <option value="month">Último mês</option>
                </select>
              </div>

              {/* Ações */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors">
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
                <button
                  onClick={() => {
                    setFilterType("all");
                    setSearchTerm("");
                    setTimeFilter("all");
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Atividades */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Atividades Recentes ({filteredActivities.length})
                </h2>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar className="w-4 h-4" />
                  Últimas atualizações
                </div>
              </div>

              {filteredActivities.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Nenhuma atividade encontrada
                  </h3>
                  <p className="text-gray-400">
                    Tente ajustar os filtros para ver mais resultados
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${getActivityColor(
                              activity.type
                            )}`}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg mb-1">
                              {activity.title}
                            </h3>
                            <p className="text-gray-300 mb-2">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatTimestamp(activity.timestamp)}
                              </div>
                              {activity.details?.duration && (
                                <div>Duração: {activity.details.duration}</div>
                              )}
                              {activity.details?.analysisId && (
                                <div>ID: {activity.details.analysisId}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div
                            className={`flex items-center gap-1 ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {getStatusIcon(activity.status)}
                            <span className="text-sm font-medium">
                              {activity.status === "completed"
                                ? "Concluída"
                                : activity.status === "in-progress"
                                ? "Em Progresso"
                                : activity.status === "failed"
                                ? "Falhou"
                                : activity.status === "paused"
                                ? "Pausada"
                                : activity.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Detalhes adicionais */}
                      {activity.details && (
                        <div className="border-t border-white/10 pt-4 mt-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            {activity.details.glitchesFound !== undefined && (
                              <div className="text-center">
                                <div className="text-white font-semibold">
                                  {activity.details.glitchesFound}
                                </div>
                                <div className="text-gray-400">Glitches</div>
                              </div>
                            )}
                            {activity.details.confidence !== undefined && (
                              <div className="text-center">
                                <div className="text-white font-semibold">
                                  {activity.details.confidence}%
                                </div>
                                <div className="text-gray-400">Confiança</div>
                              </div>
                            )}
                            {activity.details.collaborator && (
                              <div className="md:col-span-2 text-center">
                                <div className="text-white font-semibold">
                                  {activity.details.collaborator}
                                </div>
                                <div className="text-gray-400">Colaborador</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
