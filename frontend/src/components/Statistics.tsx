"use client";
import { TrendingUp, Users, Database, Target } from "lucide-react";
import { useEffect, useState } from "react";

interface Stat {
  icon: typeof TrendingUp;
  value: string;
  label: string;
  color: string;
  suffix?: string;
}

export default function Statistics() {
  const [counts, setCounts] = useState({
    detections: 0,
    volunteers: 0,
    glitches: 0,
    accuracy: 0,
  });

  const stats: Stat[] = [
    {
      icon: Database,
      value: counts.detections.toLocaleString(),
      label: "Detecções de Ondas Gravitacionais",
      color: "blue",
      suffix: "+",
    },
    {
      icon: Users,
      value: counts.volunteers.toLocaleString(),
      label: "Voluntários Engajados",
      color: "green",
      suffix: "+",
    },
    {
      icon: Target,
      value: counts.glitches.toLocaleString(),
      label: "Glitches Classificados",
      color: "purple",
      suffix: "M+",
    },
    {
      icon: TrendingUp,
      value: counts.accuracy.toString(),
      label: "Precisão do Sistema",
      color: "cyan",
      suffix: "%",
    },
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const targets = {
      detections: 90,
      volunteers: 5000,
      glitches: 10,
      accuracy: 94,
    };

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        detections: Math.floor(targets.detections * easeOut),
        volunteers: Math.floor(targets.volunteers * easeOut),
        glitches: Math.floor(targets.glitches * easeOut),
        accuracy: Math.floor(targets.accuracy * easeOut),
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const colors: Record<
    string,
    { bg: string; border: string; icon: string; glow: string }
  > = {
    blue: {
      bg: "from-blue-600/20 to-blue-600/5",
      border: "border-blue-500/50",
      icon: "text-blue-400",
      glow: "shadow-blue-500/20",
    },
    green: {
      bg: "from-green-600/20 to-green-600/5",
      border: "border-green-500/50",
      icon: "text-green-400",
      glow: "shadow-green-500/20",
    },
    purple: {
      bg: "from-purple-600/20 to-purple-600/5",
      border: "border-purple-500/50",
      icon: "text-purple-400",
      glow: "shadow-purple-500/20",
    },
    cyan: {
      bg: "from-cyan-600/20 to-cyan-600/5",
      border: "border-cyan-500/50",
      icon: "text-cyan-400",
      glow: "shadow-cyan-500/20",
    },
  };

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Impacto do Projeto
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Números que demonstram o alcance e a efetividade da nossa abordagem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorScheme = colors[stat.color];

            return (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colorScheme.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div
                  className={`relative bg-slate-900/80 backdrop-blur-sm border ${colorScheme.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 ${colorScheme.glow} shadow-lg h-full`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 bg-slate-950/50 rounded-xl border border-slate-800`}
                    >
                      <Icon className={`w-6 h-6 ${colorScheme.icon}`} />
                    </div>
                  </div>

                  <div
                    className={`text-4xl font-bold ${colorScheme.icon} mb-2`}
                  >
                    {stat.value}
                    {stat.suffix}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {stat.label}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${colorScheme.icon.replace(
                          "text-",
                          "bg-"
                        )} animate-pulse`}
                      />
                      <span className="text-xs text-slate-500">
                        Em constante crescimento
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">O Futuro</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                  <span className="text-blue-400 text-sm">→</span>
                </div>
                <p className="text-slate-300">
                  Expansão para novos detectores ao redor do mundo
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                  <span className="text-blue-400 text-sm">→</span>
                </div>
                <p className="text-slate-300">
                  Identificação de novos tipos de glitches ainda desconhecidos
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                  <span className="text-blue-400 text-sm">→</span>
                </div>
                <p className="text-slate-300">
                  Melhoria contínua dos detectores baseada nos dados coletados
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Colaboradores
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Este projeto é resultado da colaboração entre:
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">•</span>
                <span>Observatórios LIGO e Virgo</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">•</span>
                <span>Pesquisadores em Inteligência Artificial</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">•</span>
                <span>Comunidade de Ciência Cidadã</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">•</span>
                <span>Instituições acadêmicas internacionais</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
