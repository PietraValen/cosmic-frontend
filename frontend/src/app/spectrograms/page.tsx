"use client";

import { useRequireAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  ArrowLeft,
  Search,
  Grid3X3,
  List,
  Download,
  Eye,
  Zap,
  TrendingUp,
  Play,
} from "lucide-react";

interface SpectrogramData {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  source: "LIGO Hanford" | "LIGO Livingston" | "Virgo";
  frequency: string;
  duration: string;
  glitchType: string;
  confidence: number;
  imageUrl: string;
  status: "analyzed" | "processing" | "flagged";
}

export default function SpectrogramsPage() {
  const { user, isLoading } = useRequireAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedSpectrogram, setSelectedSpectrogram] =
    useState<SpectrogramData | null>(null);

  const spectrograms: SpectrogramData[] = [
    {
      id: "1",
      title: "Blip Detection - LIGO Hanford",
      description: "Classificação de blip detectado com alta confiança",
      timestamp: "2024-01-20 14:30",
      source: "LIGO Hanford",
      frequency: "100-300 Hz",
      duration: "0.1s",
      glitchType: "Blip",
      confidence: 94.2,
      imageUrl: "/spectrograms/blip-hanford-001.png",
      status: "analyzed",
    },
    {
      id: "2",
      title: "Scratchy Noise - Virgo",
      description: "Ruído do tipo scratchy identificado no detector Virgo",
      timestamp: "2024-01-20 13:15",
      source: "Virgo",
      frequency: "50-200 Hz",
      duration: "2.3s",
      glitchType: "Scratchy",
      confidence: 89.7,
      imageUrl: "/spectrograms/scratchy-virgo-002.png",
      status: "analyzed",
    },
    {
      id: "3",
      title: "Whistle Event - LIGO Livingston",
      description: "Evento do tipo whistle com características únicas",
      timestamp: "2024-01-20 11:45",
      source: "LIGO Livingston",
      frequency: "200-800 Hz",
      duration: "5.8s",
      glitchType: "Whistle",
      confidence: 91.3,
      imageUrl: "/spectrograms/whistle-livingston-003.png",
      status: "analyzed",
    },
    {
      id: "4",
      title: "Power Line Interference",
      description: "Interferência de linha de energia detectada",
      timestamp: "2024-01-19 16:20",
      source: "LIGO Hanford",
      frequency: "60 Hz harmonics",
      duration: "10.2s",
      glitchType: "Power Line",
      confidence: 96.8,
      imageUrl: "/spectrograms/powerline-hanford-004.png",
      status: "flagged",
    },
    {
      id: "5",
      title: "Unknown Transient",
      description: "Evento transiente não classificado em análise",
      timestamp: "2024-01-19 14:05",
      source: "Virgo",
      frequency: "20-1000 Hz",
      duration: "0.5s",
      glitchType: "Unknown",
      confidence: 67.4,
      imageUrl: "/spectrograms/unknown-virgo-005.png",
      status: "processing",
    },
    {
      id: "6",
      title: "Violin Mode - LIGO Livingston",
      description: "Modo violin das fibras de suspensão detectado",
      timestamp: "2024-01-19 10:30",
      source: "LIGO Livingston",
      frequency: "~500 Hz",
      duration: "1.2s",
      glitchType: "Violin Mode",
      confidence: 93.1,
      imageUrl: "/spectrograms/violin-livingston-006.png",
      status: "analyzed",
    },
  ];

  const filteredSpectrograms = spectrograms.filter((spec) => {
    const matchesSearch =
      spec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.glitchType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource =
      sourceFilter === "all" || spec.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "analyzed":
        return "text-green-400 bg-green-500/10";
      case "processing":
        return "text-yellow-400 bg-yellow-500/10";
      case "flagged":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getGlitchTypeColor = (glitchType: string) => {
    switch (glitchType.toLowerCase()) {
      case "blip":
        return "bg-blue-500/20 text-blue-300";
      case "scratchy":
        return "bg-purple-500/20 text-purple-300";
      case "whistle":
        return "bg-green-500/20 text-green-300";
      case "power line":
        return "bg-red-500/20 text-red-300";
      case "violin mode":
        return "bg-orange-500/20 text-orange-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando espectrogramas...</p>
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
                <BarChart3 className="w-7 h-7 text-blue-400" />
                Galeria de Espectrogramas
              </h1>
            </div>
            <span className="text-white font-medium">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controles e Filtros */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Busca */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar espectrogramas..."
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Filtro por Fonte */}
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas as fontes</option>
                <option value="LIGO Hanford">LIGO Hanford</option>
                <option value="LIGO Livingston">LIGO Livingston</option>
                <option value="Virgo">Virgo</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              {/* Modo de Visualização */}
              <div className="bg-white/5 rounded-lg p-1 flex gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* Estatísticas rápidas */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {spectrograms.length}
                </div>
                <div className="text-sm text-gray-300">Total</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {spectrograms.filter((s) => s.status === "analyzed").length}
                </div>
                <div className="text-sm text-gray-300">Analisados</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {spectrograms.filter((s) => s.glitchType === "Blip").length}
                </div>
                <div className="text-sm text-gray-300">Blips</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {Math.round(
                    spectrograms.reduce((acc, s) => acc + s.confidence, 0) /
                      spectrograms.length
                  )}
                  %
                </div>
                <div className="text-sm text-gray-300">Confiança Média</div>
              </div>
            </div>
          </div>
        </div>

        {/* Galeria de Espectrogramas */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpectrograms.map((spectrogram) => (
              <div
                key={spectrogram.id}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedSpectrogram(spectrogram)}
              >
                {/* Placeholder da Imagem */}
                <div className="relative h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-white/50 mx-auto mb-2" />
                    <div className="text-white/70 text-sm">Espectrograma</div>
                    <div className="text-white/50 text-xs">
                      {spectrogram.frequency}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        spectrogram.status
                      )}`}
                    >
                      {spectrogram.status === "analyzed"
                        ? "Analisado"
                        : spectrogram.status === "processing"
                        ? "Processando"
                        : "Sinalizado"}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      {spectrogram.title}
                    </h3>
                    <div className="text-right">
                      <div className="text-white font-bold text-sm">
                        {spectrogram.confidence}%
                      </div>
                      <div className="text-gray-400 text-xs">confiança</div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                    {spectrogram.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Fonte:</span>
                      <span className="text-white">{spectrogram.source}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Duração:</span>
                      <span className="text-white">{spectrogram.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${getGlitchTypeColor(
                          spectrogram.glitchType
                        )}`}
                      >
                        {spectrogram.glitchType}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {new Date(spectrogram.timestamp).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="divide-y divide-white/10">
              {filteredSpectrograms.map((spectrogram) => (
                <div
                  key={spectrogram.id}
                  className="p-6 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedSpectrogram(spectrogram)}
                >
                  <div className="flex items-center gap-6">
                    {/* Thumbnail */}
                    <div className="w-24 h-16 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white/50" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold">
                          {spectrogram.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${getGlitchTypeColor(
                              spectrogram.glitchType
                            )}`}
                          >
                            {spectrogram.glitchType}
                          </div>
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              spectrogram.status
                            )}`}
                          >
                            {spectrogram.status === "analyzed"
                              ? "Analisado"
                              : spectrogram.status === "processing"
                              ? "Processando"
                              : "Sinalizado"}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-3">
                        {spectrogram.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Fonte</div>
                          <div className="text-white">{spectrogram.source}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Frequência</div>
                          <div className="text-white">
                            {spectrogram.frequency}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Duração</div>
                          <div className="text-white">
                            {spectrogram.duration}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Confiança</div>
                          <div className="text-white font-semibold">
                            {spectrogram.confidence}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Data</div>
                          <div className="text-white">
                            {new Date(spectrogram.timestamp).toLocaleDateString(
                              "pt-BR"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredSpectrograms.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Nenhum espectrograma encontrado
            </h3>
            <p className="text-gray-400">
              Tente ajustar os filtros para ver mais resultados
            </p>
          </div>
        )}

        {/* Modal de Detalhes */}
        {selectedSpectrogram && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedSpectrogram.title}
                </h2>
                <button
                  onClick={() => setSelectedSpectrogram(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Imagem do Espectrograma */}
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-24 h-24 text-white/50 mx-auto mb-4" />
                      <div className="text-white text-lg">
                        Espectrograma Detalhado
                      </div>
                      <div className="text-white/70">
                        {selectedSpectrogram.frequency}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors">
                      <Download className="w-4 h-4" />
                      Baixar
                    </button>
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors">
                      <Play className="w-4 h-4" />
                      Reproduzir Audio
                    </button>
                  </div>
                </div>

                {/* Informações Detalhadas */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Informações Gerais
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Fonte:</span>
                        <span className="text-white font-medium">
                          {selectedSpectrogram.source}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Tipo de Glitch:</span>
                        <div
                          className={`px-2 py-1 rounded text-sm font-medium ${getGlitchTypeColor(
                            selectedSpectrogram.glitchType
                          )}`}
                        >
                          {selectedSpectrogram.glitchType}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Confiança:</span>
                        <span className="text-white font-medium">
                          {selectedSpectrogram.confidence}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Frequência:</span>
                        <span className="text-white font-medium">
                          {selectedSpectrogram.frequency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Duração:</span>
                        <span className="text-white font-medium">
                          {selectedSpectrogram.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Data/Hora:</span>
                        <span className="text-white font-medium">
                          {selectedSpectrogram.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Descrição
                    </h3>
                    <p className="text-gray-300">
                      {selectedSpectrogram.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Status da Análise
                    </h3>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${getStatusColor(
                        selectedSpectrogram.status
                      )}`}
                    >
                      {selectedSpectrogram.status === "analyzed"
                        ? "✅ Analisado"
                        : selectedSpectrogram.status === "processing"
                        ? "⏳ Processando"
                        : "🚩 Sinalizado"}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex gap-3">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <TrendingUp className="w-4 h-4" />
                        Análise Detalhada
                      </button>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <Zap className="w-4 h-4" />
                        Reprocessar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
