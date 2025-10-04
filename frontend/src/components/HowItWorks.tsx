"use client";
import {
  ArrowRight,
  ScanSearch,
  UserCheck,
  Database,
  TrendingUp,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ScanSearch,
      title: "Triagem por IA",
      description:
        "Modelo de inteligência artificial analisa milhões de eventos convertidos em espectrogramas, classificando rapidamente padrões conhecidos.",
      color: "blue",
      stats: "Milhões de eventos/dia",
    },
    {
      icon: UserCheck,
      title: "Análise Humana",
      description:
        "Casos ambíguos ou desconhecidos são enviados para voluntários, que identificam padrões sutis usando sua capacidade única de reconhecimento.",
      color: "green",
      stats: "Precisão humana em casos complexos",
    },
    {
      icon: Database,
      title: "Retroalimentação",
      description:
        "Classificações dos voluntários são usadas para retreinar o modelo, criando um ciclo de melhoria contínua e expansão do conhecimento.",
      color: "purple",
      stats: "Aprendizado constante",
    },
    {
      icon: TrendingUp,
      title: "Evolução do Sistema",
      description:
        "Com cada iteração, o sistema se torna mais preciso, robusto e capaz de identificar novos tipos de glitches automaticamente.",
      color: "cyan",
      stats: "Melhoria contínua da precisão",
    },
  ];

  const colors: Record<
    string,
    { bg: string; border: string; icon: string; arrow: string }
  > = {
    blue: {
      bg: "from-blue-600/20 to-blue-600/5",
      border: "border-blue-500/50",
      icon: "text-blue-400",
      arrow: "text-blue-500",
    },
    green: {
      bg: "from-green-600/20 to-green-600/5",
      border: "border-green-500/50",
      icon: "text-green-400",
      arrow: "text-green-500",
    },
    purple: {
      bg: "from-purple-600/20 to-purple-600/5",
      border: "border-purple-500/50",
      icon: "text-purple-400",
      arrow: "text-purple-500",
    },
    cyan: {
      bg: "from-cyan-600/20 to-cyan-600/5",
      border: "border-cyan-500/50",
      icon: "text-cyan-400",
      arrow: "text-cyan-500",
    },
  };

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Como Funciona
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Um processo iterativo e colaborativo que une máquinas e humanos
          </p>
        </div>

        <div className="relative">
          {steps.map((step, index) => {
            const colorScheme = colors[step.color];
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="relative">
                <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div
                      className={`bg-gradient-to-br ${colorScheme.bg} backdrop-blur-sm border ${colorScheme.border} rounded-2xl p-8 hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700">
                          <Icon className={`w-8 h-8 ${colorScheme.icon}`} />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400 font-medium">
                            Etapa {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-slate-300 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div
                          className={`w-2 h-2 ${colorScheme.icon} rounded-full animate-pulse`}
                        />
                        <span className={colorScheme.icon}>{step.stats}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      index % 2 === 1 ? "lg:order-1" : ""
                    } flex justify-center`}
                  >
                    <div className="relative w-64 h-64">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colorScheme.bg} rounded-full blur-2xl opacity-50`}
                      />
                      <div className="relative w-full h-full bg-slate-900/80 backdrop-blur-sm border-2 border-slate-800 rounded-full flex items-center justify-center">
                        <Icon
                          className={`w-32 h-32 ${colorScheme.icon}`}
                          strokeWidth={1}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex justify-center mb-16">
                    <div className="flex flex-col items-center gap-2">
                      <ArrowRight
                        className={`w-8 h-8 ${colorScheme.arrow} animate-bounce`}
                        style={{ transform: "rotate(90deg)" }}
                      />
                      <div
                        className={`w-1 h-12 bg-gradient-to-b ${colorScheme.bg}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Por que funciona?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">IA</div>
              <p className="text-slate-400">
                Velocidade e escala para processar grandes volumes
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                Humanos
              </div>
              <p className="text-slate-400">
                Intuição e reconhecimento de padrões complexos
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                Juntos
              </div>
              <p className="text-slate-400">
                Sistema híbrido mais poderoso que a soma das partes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
