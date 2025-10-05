"use client";

import { memo } from "react";
import { useRequireAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApiOptimized";
import { api } from "@/services/api";
import { LoadingSpinner, CardSkeleton } from "@/components/LoadingComponents";
import { ErrorComponent } from "@/components/ErrorComponents";
import Link from "next/link";
import {
  BarChart3,
  Activity,
  Telescope,
  Brain,
  Settings,
  Users,
  FileText,
  Zap,
  Globe,
  PieChart,
  Bell,
  Download,
  Plus,
  ChevronRight,
} from "lucide-react";

const DashboardPage = memo(function DashboardPage() {
  const { user, logout, isLoading } = useRequireAuth();

  // API calls using the optimized useApi hook with cache
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useApi(() => api.getDashboardStats(), {
    cacheKey: "dashboard-stats",
    cacheTTL: 2 * 60 * 1000, // 2 minutos
  });

  const {
    data: recentActivity,
    loading: activityLoading,
    error: activityError,
    refetch: refetchActivity,
  } = useApi(() => api.getUserActivity({ limit: 5 }), {
    cacheKey: "recent-activity",
    cacheTTL: 1 * 60 * 1000, // 1 minuto
  });

  const {
    data: detectors,
    loading: detectorsLoading,
    error: detectorsError,
  } = useApi(() => api.getDetectors(), {
    cacheKey: "detectors",
    cacheTTL: 5 * 60 * 1000, // 5 minutos
  });

  // Loading state
  if (isLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <LoadingSpinner size="lg" message="Carregando dashboard..." />
          </div>
          <CardSkeleton count={6} />
        </div>
      </div>
    );
  }

  // Error state
  if (statsError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorComponent
            error={statsError}
            onRetry={refetchStats}
            type="general"
          />
        </div>
      </div>
    );
  }

  // Dados padrão se não houver dados da API
  const dashboardStats = stats || {
    totalDetectors: 0,
    totalGlitches: 0,
    totalEvents: 0,
    totalObservatories: 0,
    recentDiscoveries: 0,
    systemHealth: "healthy" as const,
  };

  const activities = recentActivity || [];

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return "🟢";
      case "warning":
        return "🟡";
      case "critical":
        return "🔴";
      default:
        return "⚫";
    }
  };

  if (!user) {
    return null; // useRequireAuth will redirect
  }

  const getActivityIcon = (category: string) => {
    switch (category) {
      case "analysis":
        return <BarChart3 className="w-4 h-4" />;
      case "detection":
        return <Zap className="w-4 h-4" />;
      case "training":
        return <Brain className="w-4 h-4" />;
      case "collaboration":
        return <Users className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (category: string) => {
    switch (category) {
      case "analysis":
        return "text-blue-400 bg-blue-500/10";
      case "detection":
        return "text-yellow-400 bg-yellow-500/10";
      case "training":
        return "text-green-400 bg-green-500/10";
      case "collaboration":
        return "text-purple-400 bg-purple-500/10";
      default:
        return "text-slate-400 bg-slate-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header Melhorado */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                🌌 Cosmic Frontend
                <span className="text-sm bg-blue-500/20 px-2 py-1 rounded text-blue-300">
                  v2.0
                </span>
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notificações */}
              <div className="relative">
                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>

              <div className="text-white">
                <span className="text-gray-300">Bem-vindo, </span>
                <span className="font-semibold">{user.name}</span>
              </div>

              <Link
                href="/profile"
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seção de Boas-vindas com Status */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Bem-vindo de volta, {user.name}! 👋
              </h2>
              <p className="text-blue-200 text-lg">
                Sistema de Caçadores de Falhas - Detecção de Ondas
                Gravitacionais
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Nova Análise
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* Estatísticas em Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-blue-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">
                {statsLoading ? "..." : dashboardStats.totalDetectors}
              </div>
              <div className="text-blue-300 text-sm">Detectores</div>
            </div>
            <div className="bg-yellow-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">
                {statsLoading ? "..." : dashboardStats.totalGlitches}
              </div>
              <div className="text-yellow-300 text-sm">Glitches</div>
            </div>
            <div className="bg-green-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">
                {statsLoading ? "..." : dashboardStats.totalEvents}
              </div>
              <div className="text-green-300 text-sm">Eventos</div>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">
                {statsLoading ? "..." : dashboardStats.totalObservatories}
              </div>
              <div className="text-purple-300 text-sm">Observatórios</div>
            </div>
            <div className="bg-indigo-500/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">
                {statsLoading ? "..." : dashboardStats.recentDiscoveries}
              </div>
              <div className="text-indigo-300 text-sm">Descobertas</div>
            </div>
            <div className="bg-red-500/20 p-4 rounded-lg text-center">
              <div
                className={`text-2xl font-bold ${getHealthColor(
                  dashboardStats.systemHealth
                )}`}
              >
                {getHealthIcon(dashboardStats.systemHealth)}
              </div>
              <div className="text-red-300 text-sm">Sistema</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ações Principais */}
          <div className="lg:col-span-2 space-y-8">
            {/* Ações Rápidas */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/analysis"
                  className="group bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 hover:from-blue-600/30 hover:to-cyan-600/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Telescope className="w-6 h-6 text-blue-400" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Nova Análise
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Iniciar análise de dados gravitacionais com IA
                  </p>
                </Link>

                <Link
                  href="/galaxy"
                  className="group bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                      <Globe className="w-6 h-6 text-purple-400" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Visualização 3D
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Explorar galáxia com anomalias interativas
                  </p>
                </Link>

                <Link
                  href="/spectrograms"
                  className="group bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-500/20 p-3 rounded-lg group-hover:bg-green-500/30 transition-colors">
                      <PieChart className="w-6 h-6 text-green-400" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Espectrogramas
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Galeria de análises e visualizações
                  </p>
                </Link>

                <Link
                  href="/reports"
                  className="group bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                      <FileText className="w-6 h-6 text-orange-400" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Relatórios
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Exportar dados e gerar documentos
                  </p>
                </Link>
              </div>
            </div>

            {/* Links de Desenvolvimento (temporários) */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                Ferramentas de Desenvolvimento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/debug-login"
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-200 group"
                >
                  <div className="text-2xl mb-2">🔧</div>
                  <h4 className="text-white font-semibold text-sm group-hover:text-blue-300">
                    Debug Login
                  </h4>
                </Link>

                <Link
                  href="/quick-test"
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-200 group"
                >
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="text-white font-semibold text-sm group-hover:text-blue-300">
                    Teste Rápido
                  </h4>
                </Link>

                <Link
                  href="/test-connection"
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-200 group"
                >
                  <div className="text-2xl mb-2">🔗</div>
                  <h4 className="text-white font-semibold text-sm group-hover:text-blue-300">
                    Teste Laravel
                  </h4>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar Direita */}
          <div className="space-y-8">
            {/* Atividades Recentes */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Atividades Recentes
              </h3>
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                {activityLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-lg animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : activityError ? (
                  <ErrorComponent
                    error={activityError}
                    onRetry={refetchActivity}
                    type="general"
                  />
                ) : (
                  <div className="space-y-4">
                    {activities.length > 0 ? (
                      activities.slice(0, 4).map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`p-2 rounded-lg ${getActivityColor(
                              activity.category
                            )}`}
                          >
                            {getActivityIcon(activity.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium leading-tight">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-gray-400 text-xs">
                                {new Date(activity.timestamp).toLocaleString(
                                  "pt-BR"
                                )}
                              </p>
                              <span className="text-xs text-gray-500 capitalize">
                                {activity.action}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">
                        Nenhuma atividade recente
                      </p>
                    )}
                  </div>
                )}

                <Link
                  href="/activity"
                  className="block w-full text-center text-blue-400 hover:text-blue-300 text-sm mt-4 pt-4 border-t border-white/20 transition-colors"
                >
                  Ver todas as atividades →
                </Link>
              </div>
            </div>

            {/* Detectores */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Telescope className="w-5 h-5 text-yellow-400" />
                Detectores Ativos
              </h3>
              <div className="space-y-3">
                {detectorsLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                    >
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                      </div>
                    </div>
                  ))
                ) : detectorsError ? (
                  <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                    <p className="text-red-300 text-sm">
                      Erro ao carregar detectores
                    </p>
                  </div>
                ) : detectors && detectors.length > 0 ? (
                  detectors.slice(0, 3).map((detector) => (
                    <div
                      key={detector.id}
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm">
                            {detector.name}
                            <span
                              className={`ml-2 inline-block w-2 h-2 rounded-full ${
                                detector.status === "active"
                                  ? "bg-green-500"
                                  : detector.status === "maintenance"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            ></span>
                          </h4>
                          <p className="text-gray-300 text-xs mt-1">
                            {detector.location}, {detector.country}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {detector.arm_length_km}km arm length
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <p className="text-gray-400 text-center text-sm">
                      Nenhum detector encontrado
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status do Sistema */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Status do Sistema
              </h3>
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">API Backend:</span>
                    <span className="text-green-400 font-medium text-sm">
                      ✅ Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Autenticação:</span>
                    <span className="text-green-400 font-medium text-sm">
                      ✅ Ativa
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Visualização 3D:
                    </span>
                    <span className="text-green-400 font-medium text-sm">
                      ✅ Funcionando
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Análise IA:</span>
                    <span className="text-green-400 font-medium text-sm">
                      ✅ Disponível
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">LIGO Data:</span>
                    <span className="text-yellow-400 font-medium text-sm">
                      ⚠️ Sincronizando
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default DashboardPage;
