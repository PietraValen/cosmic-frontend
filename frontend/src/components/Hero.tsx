// frontend/src/components/Hero.tsx

"use client"; // Esta diretiva é necessária aqui pois o componente usa hooks

import { useState, useEffect } from "react";
import Link from "next/link";
import { Waves, ChevronDown } from "lucide-react";

// REMOVIDO: A interface não precisa mais da prop scrollY
// interface HeroProps {
//   scrollY: number;
// }

interface Particle {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
}

// REMOVIDO: A prop scrollY não é mais recebida
export default function Hero() {
  // ADICIONADO: Estado para gerenciar o scroll internamente
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const parallaxOffset = scrollY * 0.5;

  useEffect(() => {
    // A lógica de partículas e isClient continua perfeita
    setIsClient(true);
    const generatedParticles = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 1}px`,
      height: `${Math.random() * 4 + 1}px`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
    setParticles(generatedParticles);

    // ADICIONADO: Lógica de scroll que antes estava no componente pai
    const handleScroll = () => setScrollY(window.scrollY);

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []); // O array de dependências vazio está correto, executa uma vez

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* O resto do seu JSX continua exatamente o mesmo, pois já é excelente */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent" />
        {isClient &&
          particles.map((particle, i) => (
            <div
              key={i}
              className="absolute bg-blue-400/20 rounded-full animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.width,
                height: particle.height,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
              }}
            />
          ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse" />
            <Waves
              className="w-24 h-24 text-blue-400 relative z-10"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent leading-tight">
          Caçadores de Falhas
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
          Desvendando os segredos das ondas gravitacionais através da
          inteligência híbrida
        </p>

        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Um projeto inovador que une Inteligência Artificial e Ciência Cidadã
          para identificar e classificar ruídos em detectores de ondas
          gravitacionais
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative flex items-center justify-center gap-4">
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce mb-1">
              <ChevronDown className="w-8 h-8 text-slate-400" />
            </div>
            <Link
              href="/Explore"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50"
            >
              Explorar o Projeto
            </Link>
          </div>
          <Link
            href="/KnowMore"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all duration-300 border border-slate-700"
          >
            Saiba Mais
          </Link>
        </div>
      </div>
    </section>
  );
}
