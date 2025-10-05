"use client";

import { Zap } from "lucide-react";

export default function SpectrogramGallery() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Galeria de Espectrogramas
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore diferentes tipos de glitches detectados
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Blip</h3>
            </div>
            <p className="text-slate-300 mb-4 text-sm">
              Short-duration transient noise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
