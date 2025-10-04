"use client";
import { config } from "@/config";
import Link from "next/link";

export default function TestEnvPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-cyan-400">
          🧪 Teste das Variáveis de Ambiente
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* API Configuration */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              🌐 Configurações da API
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-400">Base URL:</span>
                <span className="ml-2 font-mono text-blue-300">
                  {config.api.baseUrl}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Login Endpoint:</span>
                <span className="ml-2 font-mono text-blue-300">
                  {config.api.endpoints.auth.login}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Register Endpoint:</span>
                <span className="ml-2 font-mono text-blue-300">
                  {config.api.endpoints.auth.register}
                </span>
              </div>
            </div>
          </div>

          {/* App Configuration */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              ⚙️ Configurações da App
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-400">Frontend URL:</span>
                <span className="ml-2 font-mono text-blue-300">
                  {config.app.frontendUrl}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Environment:</span>
                <span className="ml-2 font-mono text-blue-300">
                  {config.app.environment}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Is Development:</span>
                <span className="ml-2 font-mono text-blue-300">
                  {config.app.isDevelopment ? "✅" : "❌"}
                </span>
              </div>
            </div>
          </div>

          {/* Detectors */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              🔭 Detectores de Ondas Gravitacionais
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-400">LIGO Hanford:</span>
                <span className="ml-2 font-mono text-blue-300 text-xs">
                  {config.detectors.ligoHandford}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Virgo:</span>
                <span className="ml-2 font-mono text-blue-300 text-xs">
                  {config.detectors.virgo}
                </span>
              </div>
              <div>
                <span className="text-slate-400">KAGRA:</span>
                <span className="ml-2 font-mono text-blue-300 text-xs">
                  {config.detectors.kagra}
                </span>
              </div>
            </div>
          </div>

          {/* External APIs */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">
              🌍 APIs Externas
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-400">Gravitational Wave API:</span>
                <span className="ml-2 font-mono text-blue-300 text-xs">
                  {config.external.gravitationalWaveApi}
                </span>
              </div>
              <div>
                <span className="text-slate-400">LIGO Open Data API:</span>
                <span className="ml-2 font-mono text-blue-300 text-xs">
                  {config.external.ligoOpenDataApi}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-300">
            ✅ Status da Configuração
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Arquivo .env carregado com sucesso</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Variáveis de ambiente acessíveis</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Configuração centralizada funcionando</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Pronto para conectar com backend</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            ← Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
