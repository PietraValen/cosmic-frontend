"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Waves, ChevronDown, LogIn, UserPlus } from "lucide-react";

interface HeroProps {
  scrollY: number;
}

interface Particle {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
}

export default function Hero({ scrollY }: HeroProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const parallaxOffset = scrollY * 0.5;

  useEffect(() => {
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
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50">
            Explorar o Projeto
          </button>
          <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all duration-300 border border-slate-700">
            Saiba Mais
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/auth/login"
            className="flex items-center space-x-2 px-6 py-3 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-slate-500/20"
          >
            <LogIn className="w-5 h-5" />
            <span>Já tenho conta</span>
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            <UserPlus className="w-5 h-5" />
            <span>Criar conta gratuita</span>
          </Link>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </div>
      </div>
    </section>
  );
}
