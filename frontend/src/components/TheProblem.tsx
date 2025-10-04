"use client";
import { AlertCircle, Radio, Activity, Zap } from "lucide-react";

export default function TheProblem() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            O Desafio
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Detectores extremamente sensíveis captam não apenas sinais
            astrofísicos, mas também ruídos indesejados
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Glitches</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Ruídos instrumentais e ambientais que contaminam os dados dos
                detectores. Esses glitches podem mascarar sinais reais ou criar
                falsos alarmes.
              </p>
              <div className="bg-slate-950/50 rounded-lg p-6 border border-slate-700">
                <div className="font-mono text-cyan-400 text-lg mb-2">
                  h = s + n + g
                </div>
                <div className="text-sm text-slate-400 space-y-1">
                  <p>
                    <span className="text-blue-400">h</span> = dados observados
                  </p>
                  <p>
                    <span className="text-green-400">s</span> = sinal
                    astrofísico real
                  </p>
                  <p>
                    <span className="text-yellow-400">n</span> = ruído de fundo
                  </p>
                  <p>
                    <span className="text-red-400">g</span> = glitch (ruído
                    indesejado)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                  <Radio className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Ruído Ambiental
                  </h4>
                  <p className="text-slate-400">
                    Vibrações sísmicas, tráfego, ondas do oceano e até mesmo
                    trovões podem gerar glitches
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Activity className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Ruído Instrumental
                  </h4>
                  <p className="text-slate-400">
                    Flutuações nos lasers, espelhos e sistemas eletrônicos dos
                    detectores
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Impacto na Ciência
                  </h4>
                  <p className="text-slate-400">
                    Falsos alarmes e sinais mascarados comprometem a análise e a
                    confiança nas detecções
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-950/30 to-orange-950/30 border border-red-900/50 rounded-2xl p-8 text-center">
          <p className="text-xl text-slate-300 leading-relaxed">
            <span className="text-red-400 font-semibold">
              Milhões de eventos
            </span>{" "}
            são registrados, mas apenas uma fração representa sinais
            astrofísicos genuínos. Como separar o joio do trigo?
          </p>
        </div>
      </div>
    </section>
  );
}
