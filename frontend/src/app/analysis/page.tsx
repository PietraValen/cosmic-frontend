"use client";

import { useRequireAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { api, GlitchData } from "@/services/api";
import { LoadingSpinner, CardSkeleton } from "@/components/LoadingComponents";
import { ErrorComponent } from "@/components/ErrorComponents";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Settings,
  Activity,
  Zap,
  Upload,
  Play,
  Pause,
  Square,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
} from "lucide-react";

export default function AnalysisPage() {
  const { user, isLoading } = useRequireAuth();

  // API calls usando hooks personalizados
  const {
    data: realtimeData,
    loading: realtimeLoading,
    error: realtimeError,
    refetch: refetchRealtime,
  } = useApi(() => api.getRealtimeAnalysis());

  const {
    data: glitches,
    loading: glitchesLoading,
    error: glitchesError,
    refetch: refetchGlitches,
  } = useApi(() => api.getGlitches({ limit: 10 }));

  const {
    data: detectors,
    loading: detectorsLoading,
    error: detectorsError,
  } = useApi(() => api.getDetectors());

  // Estados locais
  const [selectedDetector, setSelectedDetector] = useState<string>("");
  const [analysisStatus, setAnalysisStatus] = useState<
    "idle" | "running" | "paused"
  >("idle");

  // Loading state
  if (isLoading || realtimeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <LoadingSpinner
              size="lg"
              message="Carregando análise em tempo real..."
            />
          </div>
          <CardSkeleton count={4} />
        </div>
      </div>
    );
  }

  // Error state
  if (realtimeError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorComponent
            error={realtimeError}
            onRetry={refetchRealtime}
            type="general"
          />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // useRequireAuth will redirect
  }

  // Dados padrão se não houver dados da API
  const defaultRealtimeData = realtimeData || {
    currentDetections: 0,
    signalStrength: 0,
    noiseLevel: 0,
    status: "offline",
    lastUpdate: new Date().toISOString(),
  };

  const recentGlitches = glitches || [];
  const availableDetectors = detectors || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "text-green-400";
      case "analyzing":
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      case "offline":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "running":
        return <Play className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "paused":
        return <Pause className="w-4 h-4" />;
      case "error":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const startNewAnalysis = () => {
    setAnalysisStatus("running");
  };

  const pauseAnalysis = () => {
    setAnalysisStatus("paused");
  };

  const resumeAnalysis = () => {
    setAnalysisStatus("running");
  };

  const stopAnalysis = () => {
    setAnalysisStatus("idle");
  };

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
                <Brain className="w-7 h-7 text-blue-400" />
                Análise de Dados Gravitacionais
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <span className="text-white font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Análise Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Controles de Análise */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Nova Análise
                </h2>
                <div className="flex gap-3">
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    Importar Dados
                  </button>
                  <select
                    value={selectedDetector}
                    onChange={(e) => setSelectedDetector(e.target.value)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Selecionar Detector</option>
                    {availableDetectors.map(
                      (detector: { id: string; name: string }) => (
                        <option key={detector.id} value={detector.id}>
                          {detector.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {analysisStatus === "idle" ? (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Pronto para iniciar análise
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Configure os parâmetros e inicie uma nova análise de dados
                    gravitacionais
                  </p>
                  <button
                    onClick={startNewAnalysis}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    Iniciar Análise
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold">
                        Análise de Dados Gravitacionais em Andamento
                      </h3>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        {getStatusIcon(analysisStatus)}
                        {analysisStatus === "running"
                          ? "Em execução"
                          : analysisStatus === "paused"
                          ? "Pausada"
                          : "Parada"}
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progresso Simulada */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>
                        Progresso: {analysisStatus === "running" ? "45%" : "0%"}
                      </span>
                      <span>
                        {analysisStatus === "running"
                          ? "~25 minutos"
                          : "Parado"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                        style={{
                          width: analysisStatus === "running" ? "45%" : "0%",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Estatísticas da Análise */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {analysisStatus === "running" ? "4" : "0"}
                      </div>
                      <div className="text-sm text-gray-300">
                        Glitches Detectados
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {analysisStatus === "running" ? "87%" : "0%"}
                      </div>
                      <div className="text-sm text-gray-300">Confiança</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {analysisStatus === "running" ? "15min" : "0min"}
                      </div>
                      <div className="text-sm text-gray-300">
                        Tempo Decorrido
                      </div>
                    </div>
                  </div>

                  {/* Controles */}
                  <div className="flex gap-3">
                    {analysisStatus === "running" ? (
                      <>
                        <button
                          onClick={pauseAnalysis}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Pause className="w-4 h-4" />
                          Pausar
                        </button>
                        <button
                          onClick={stopAnalysis}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Square className="w-4 h-4" />
                          Parar
                        </button>
                      </>
                    ) : analysisStatus === "paused" ? (
                      <>
                        <button
                          onClick={resumeAnalysis}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          Retomar
                        </button>
                        <button
                          onClick={stopAnalysis}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Square className="w-4 h-4" />
                          Parar
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* Dados em Tempo Real */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Dados em Tempo Real
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {defaultRealtimeData.currentDetections}
                  </div>
                  <div className="text-gray-300">Detecções Atuais</div>
                  <div
                    className={`text-sm ${getStatusColor(
                      defaultRealtimeData.status
                    )}`}
                  >
                    {defaultRealtimeData.status}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {defaultRealtimeData.signalStrength.toFixed(2)}
                  </div>
                  <div className="text-gray-300">Força do Sinal</div>
                  <div className="text-sm text-blue-400">dB</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {defaultRealtimeData.noiseLevel.toFixed(2)}
                  </div>
                  <div className="text-gray-300">Nível de Ruído</div>
                  <div className="text-sm text-yellow-400">Hz</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-sm text-gray-400">
                  Última atualização:{" "}
                  {new Date(defaultRealtimeData.lastUpdate).toLocaleString(
                    "pt-BR"
                  )}
                </div>
              </div>
            </div>

            {/* Histórico de Análises */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Glitches Recentes
              </h3>

              {glitchesLoading ? (
                <div className="space-y-3">
                  <CardSkeleton count={3} />
                </div>
              ) : glitchesError ? (
                <ErrorComponent
                  error={glitchesError}
                  onRetry={refetchGlitches}
                  type="general"
                />
              ) : recentGlitches.length > 0 ? (
                <div className="space-y-3">
                  {recentGlitches.slice(0, 5).map((glitch: GlitchData) => (
                    <div
                      key={glitch.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold">
                            Glitch #{glitch.id}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {new Date(glitch.timestamp).toLocaleString("pt-BR")}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {glitch.peak_frequency} Hz
                          </div>
                          <div className="text-gray-400 text-sm">
                            {glitch.confidence}% confiança
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                          {glitch.glitch_type_id}
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                          Ver detalhes →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Nenhum glitch detectado recentemente
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Status do Sistema */}
          <div className="space-y-8">
            {/* Status do Sistema */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-green-400" />
                Status do Sistema
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    CPU
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-sm font-medium text-green-400">
                      34%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300 flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    Memória
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-3/5"></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-400">
                      67%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    GPU
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                    </div>
                    <span className="text-sm font-medium text-green-400">
                      23%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300 flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    Rede
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/5"></div>
                    </div>
                    <span className="text-sm font-medium text-green-400">
                      12%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detectores Disponíveis */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Detectores
              </h3>

              {detectorsLoading ? (
                <CardSkeleton count={2} />
              ) : detectorsError ? (
                <ErrorComponent
                  error={detectorsError}
                  onRetry={() => window.location.reload()}
                  type="general"
                />
              ) : availableDetectors.length > 0 ? (
                <div className="space-y-3">
                  {availableDetectors.map(
                    (detector: {
                      id: string;
                      name: string;
                      location: string;
                      status: string;
                    }) => (
                      <div
                        key={detector.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-white font-medium">
                              {detector.name}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {detector.location}
                            </div>
                          </div>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              detector.status === "online"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400">Nenhum detector disponível</p>
                </div>
              )}
            </div>

            {/* Links Rápidos */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Links Rápidos
              </h3>
              <div className="space-y-3">
                <Link
                  href="/spectrograms"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  📊 Espectrogramas
                </Link>
                <Link
                  href="/reports"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  📄 Relatórios
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  🏠 Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
