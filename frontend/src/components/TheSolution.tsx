"use client";
import { Brain, Users, RefreshCw, Sparkles } from "lucide-react";

export default function TheSolution() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full">
              <Sparkles className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">A Solução</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Inteligência Híbrida
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Unindo o melhor da Inteligência Artificial e da cognição humana
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-500/20 rounded-2xl">
                  <Brain className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Inteligência Artificial
              </h3>
              <p className="text-slate-300 leading-relaxed text-center">
                Modelos de IA analisam rapidamente milhões de eventos, fazendo
                uma triagem inicial e classificando padrões conhecidos
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-center gap-2 text-sm text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  Processamento em larga escala
                </div>
              </div>
            </div>
          </div>

          <div className="group relative lg:mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-500/20 rounded-2xl">
                  <RefreshCw className="w-12 h-12 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Ciclo Virtuoso
              </h3>
              <p className="text-slate-300 leading-relaxed text-center">
                As classificações humanas retroalimentam o modelo de IA,
                melhorando continuamente sua precisão e robustez
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-center gap-2 text-sm text-purple-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  Aprendizado contínuo
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-500/20 rounded-2xl">
                  <Users className="w-12 h-12 text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Ciência Cidadã
              </h3>
              <p className="text-slate-300 leading-relaxed text-center">
                Voluntários analisam casos ambíguos, identificando padrões sutis
                que a IA pode não reconhecer
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Reconhecimento de padrões
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl blur-2xl" />
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/30 rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              O Resultado
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Alta Precisão
                  </h4>
                  <p className="text-slate-400">
                    Sistema capaz de classificar glitches com confiança elevada,
                    reduzindo falsos alarmes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Catálogo Público
                  </h4>
                  <p className="text-slate-400">
                    Base de dados detalhada para ajudar cientistas a aprimorar
                    os detectores
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Engajamento Público
                  </h4>
                  <p className="text-slate-400">
                    Cidadãos participam diretamente da fronteira da pesquisa
                    científica
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Melhoria Contínua
                  </h4>
                  <p className="text-slate-400">
                    Sistema que evolui constantemente com novos dados e
                    classificações
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
