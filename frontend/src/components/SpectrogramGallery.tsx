"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as LucideImage,
  Zap,
  Wind,
  Waves as WavesIcon,
} from "lucide-react";

interface GlitchType {
  id: string;
  name: string;
  description: string;
  icon: typeof Zap;
  color: string;
  pattern: string;
}

export default function SpectrogramGallery() {
  const [selectedGlitch, setSelectedGlitch] = useState<string | null>(null);
  const [spectrogramUrls, setSpectrogramUrls] = useState<
    Record<string, string>
  >({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const glitchTypes: GlitchType[] = [
    {
      id: "blip",
      name: "Blip",
      description:
        "Transientes curtos e de banda larga, geralmente causados por acoplamentos mecânicos",
      icon: Zap,
      color: "yellow",
      pattern: "blip",
    },
    {
      id: "whistle",
      name: "Whistle",
      description:
        "Sinais de frequência crescente, possivelmente de origem eletrônica ou ambiental",
      icon: Wind,
      color: "cyan",
      pattern: "whistle",
    },
    {
      id: "scattered-light",
      name: "Scattered Light",
      description:
        "Padrões em arco causados por dispersão de luz nos espelhos do interferômetro",
      icon: WavesIcon,
      color: "purple",
      pattern: "scattered",
    },
  ];

  useEffect(() => {
    if (isClient) {
      const glitchTypesData = [
        {
          id: "blip",
          name: "Blip",
          description:
            "Transientes curtos e de banda larga, geralmente causados por acoplamentos mecânicos",
          icon: Zap,
          color: "yellow",
          pattern: "blip",
        },
        {
          id: "whistle",
          name: "Whistle",
          description:
            "Sinais de frequência crescente, possivelmente de origem eletrônica ou ambiental",
          icon: Wind,
          color: "cyan",
          pattern: "whistle",
        },
        {
          id: "scattered-light",
          name: "Scattered Light",
          description:
            "Padrões em arco causados por dispersão de luz nos espelhos do interferômetro",
          icon: WavesIcon,
          color: "purple",
          pattern: "scattered",
        },
      ];

      const generateSpectrogram = (pattern: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");
        if (!ctx) return "";

        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#1e293b");
        gradient.addColorStop(1, "#0f172a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 200);

        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 10; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * 20);
          ctx.lineTo(300, i * 20);
          ctx.stroke();
        }

        if (pattern === "blip") {
          const centerX = 150;
          const centerY = 100;
          for (let i = 0; i < 30; i++) {
            const alpha = 1 - i / 30;
            const size = i * 2;
            ctx.fillStyle = `rgba(234, 179, 8, ${alpha * 0.8})`;
            ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);
          }
        } else if (pattern === "whistle") {
          ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 50; x < 250; x++) {
            const y = 150 - (x - 50) * 0.5 + Math.sin(x * 0.1) * 5;
            if (x === 50) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
          ctx.lineWidth = 8;
          ctx.stroke();
        } else if (pattern === "scattered") {
          for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 - i * 0.1})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(150, 100, 20 + i * 15, -Math.PI / 3, Math.PI / 3);
            ctx.stroke();
          }
        }

        return canvas.toDataURL();
      };

      const urls: Record<string, string> = {};
      glitchTypesData.forEach((glitch) => {
        urls[glitch.pattern] = generateSpectrogram(glitch.pattern);
      });
      setSpectrogramUrls(urls);
    }
  }, [isClient]);

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full mb-4">
            <LucideImage className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 font-medium">Espectrogramas</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tipos de Glitches
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Eventos são convertidos em imagens espectrográficas para análise
            visual
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {glitchTypes.map((glitch) => {
            const Icon = glitch.icon;
            const isSelected = selectedGlitch === glitch.id;
            const colors: Record<
              string,
              { bg: string; border: string; icon: string; glow: string }
            > = {
              yellow: {
                bg: "from-yellow-600/20 to-yellow-600/5",
                border: "border-yellow-500/50",
                icon: "text-yellow-400",
                glow: "shadow-yellow-500/50",
              },
              cyan: {
                bg: "from-cyan-600/20 to-cyan-600/5",
                border: "border-cyan-500/50",
                icon: "text-cyan-400",
                glow: "shadow-cyan-500/50",
              },
              purple: {
                bg: "from-purple-600/20 to-purple-600/5",
                border: "border-purple-500/50",
                icon: "text-purple-400",
                glow: "shadow-purple-500/50",
              },
            };
            const colorScheme = colors[glitch.color];

            return (
              <div
                key={glitch.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  isSelected ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setSelectedGlitch(isSelected ? null : glitch.id)}
              >
                <div
                  className={`bg-gradient-to-br ${
                    colorScheme.bg
                  } backdrop-blur-sm border ${
                    isSelected
                      ? colorScheme.border + " shadow-2xl " + colorScheme.glow
                      : "border-slate-800"
                  } rounded-2xl p-6 h-full transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-slate-900 rounded-lg ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-offset-slate-900"
                          : ""
                      }`}
                      style={isSelected ? { ringColor: colorScheme.icon } : {}}
                    >
                      <Icon className={`w-6 h-6 ${colorScheme.icon}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {glitch.name}
                    </h3>
                  </div>

                  <div className="bg-slate-950/50 rounded-lg p-2 mb-4 border border-slate-800">
                    {spectrogramUrls[glitch.pattern] ? (
                      <Image
                        src={spectrogramUrls[glitch.pattern]}
                        alt={`${glitch.name} spectrogram`}
                        width={300}
                        height={200}
                        className="w-full rounded"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-40 bg-slate-800/50 rounded flex items-center justify-center">
                        <div className="animate-pulse text-slate-400">
                          Gerando espectrograma...
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {glitch.description}
                  </p>

                  {isSelected && (
                    <div
                      className={`mt-4 pt-4 border-t border-slate-700 animate-fadeIn`}
                    >
                      <div className="flex items-center gap-2 text-sm ${colorScheme.icon}">
                        <div
                          className={`w-2 h-2 rounded-full ${colorScheme.icon.replace(
                            "text-",
                            "bg-"
                          )} animate-pulse`}
                        />
                        <span>Padrão selecionado</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            O que são Espectrogramas?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Espectrogramas são representações visuais que mostram como a
                energia de um sinal varia com o tempo e a frequência. No eixo
                horizontal temos o tempo, no vertical a frequência, e a
                intensidade é representada por cores.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Esta visualização permite que tanto algoritmos de IA quanto
                voluntários humanos identifiquem padrões característicos de
                diferentes tipos de glitches.
              </p>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800">
              <h4 className="font-semibold text-white mb-4">
                Por que usar imagens?
              </h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Reconhecimento visual é natural para humanos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>
                    Redes neurais convolucionais processam imagens
                    eficientemente
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Padrões complexos ficam visíveis e comparáveis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Facilita a colaboração entre cientistas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
