"use client";
import { useState, useEffect, memo } from "react";
import Hero from "../components/Hero";
import TheProblem from "../components/TheProblem"; 
import TheSolution from "../components/TheSolution";
import HowItWorks from "../components/HowItWorks";
import WaveVisualization from "../components/WaveVisualization";
import CallToAction from "../components/CallToAction";
import Footer from "@/components/Footer";

// Lazy loading dos componentes mais pesados
import {
  LazySpectrogramGallery,
  LazyStatistics,
  LazyGlobeVisualization,
  LazyInteractiveScientificMap,
  LazyNeuralNetworkFlow,
} from "../components/LazyComponents";

const App = memo(function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    // Throttle scroll events for better performance
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
              Visualize a rede mundial de detectores de ondas gravitacionais
              trabalhando em conjunto
            </p>
          </div>
          <LazyGlobeVisualization />
        </div>
      </section>

      <TheProblem />
      <TheSolution />

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazyNeuralNetworkFlow />
        </div>
      </section>

      <HowItWorks />

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazyInteractiveScientificMap />
        </div>
      </section>

      <LazySpectrogramGallery />
      <LazyStatistics />

      <CallToAction />

      <Footer />
    </div>
  );
});

export default App;
