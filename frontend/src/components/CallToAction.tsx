"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, LogIn, Sparkles } from "lucide-react";

interface Particle {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
}

export default function CallToAction() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 2 + 3}s`,
    }));
    setParticles(generatedParticles);
  }, []);
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {isClient &&
          particles.map((particle, i) => (
            <div
              key={i}
              className="absolute bg-blue-400/10 rounded-full animate-pulse"
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
          <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full backdrop-blur-sm border border-blue-500/30">
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Junte-se à Revolução Científica
        </h2>

        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Faça parte da maior rede colaborativa de caçadores de ondas
          gravitacionais. Sua contribuição pode levar à próxima grande
          descoberta do universo.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🔬</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Pesquisa de Ponta
            </h3>
            <p className="text-slate-400 text-sm">
              Trabalhe com dados reais de detectores como LIGO e Virgo
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Colaboração Global
            </h3>
            <p className="text-slate-400 text-sm">
              Conecte-se com cientistas e entusiastas do mundo todo
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Reconhecimento
            </h3>
            <p className="text-slate-400 text-sm">
              Ganhe badges e seja reconhecido por suas descobertas
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/auth/register"
            className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            <UserPlus className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold text-lg">
              Começar Agora - Grátis
            </span>
          </Link>

          <Link
            href="/auth/login"
            className="flex items-center space-x-2 px-6 py-3 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-xl transition-all duration-200 hover:bg-slate-800/50"
          >
            <LogIn className="w-5 h-5" />
            <span>Já sou membro</span>
          </Link>
        </div>

        <p className="text-sm text-slate-500 mt-6">
          ✨ Sem custos ocultos • 🔒 Dados protegidos • 🚀 Acesso instantâneo
        </p>
      </div>
    </section>
  );
}
