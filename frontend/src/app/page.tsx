"use client";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import TheProblem from "../components/TheProblem"; 
import TheSolution from "../components/TheSolution";
import HowItWorks from "../components/HowItWorks";
import SpectrogramGallery from "../components/SpectrogramGallery";
import WaveVisualization from "../components/WaveVisualization";
import Statistics from "../components/Statistics";
import GlobeVisualization from "../components/GlobeVisualization";
import GravitationalWavesPropagation from "../components/GravitationalWavesPropagation";
import InteractiveScientificMap from "../components/InteractiveScientificMap";
import NeuralNetworkFlow from "../components/NeuralNetworkFlow";
import CallToAction from "../components/CallToAction";
import AnomalyMap from "../components/AnomalyMap";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      <Hero scrollY={scrollY} />
      <WaveVisualization />

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Rede Global de Detecção
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Visualize a rede mundial de detectores de ondas gravitacionais trabalhando em conjunto
            </p>
          </div>
          <GlobeVisualization />
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
              Ondas Gravitacionais em Ação
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Visualização 3D da propagação de ondas gravitacionais pelo
              espaço-tempo
            </p>
          </div>
          <GravitationalWavesPropagation />
        </div>
      </section>

      <TheProblem />
      <TheSolution />

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NeuralNetworkFlow />
        </div>
      </section>

      <HowItWorks />

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveScientificMap />
        </div>
      </section>

      
      <SpectrogramGallery />
      <Statistics />

      <CallToAction />

      <footer className="relative z-10 border-t border-slate-800 py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400">
            <p className="text-lg font-light">Caçadores de Falhas</p>
            <p className="text-sm mt-2">
              Desvendando os mistérios do universo através de ondas
              gravitacionais
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
