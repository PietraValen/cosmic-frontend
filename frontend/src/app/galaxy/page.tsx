"use client";

import { Canvas } from "@react-three/fiber";
import AnomalyMap from "@/components/AnomalyMap";

export default function Galaxy3DPage() {
  return (
    <div className="w-full h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10 text-white">
        <h1 className="text-2xl font-bold mb-2">🌌 Visualização Galáctica</h1>
        <div className="text-sm space-y-1 bg-black/50 p-3 rounded">
          <p>
            🔴 <span className="text-red-400">Vermelho</span>: Anomalias
          </p>
          <p>
            🔵 <span className="text-cyan-400">Azul</span>: Regiões Estáveis
          </p>
          <p>
            ⚪ <span className="text-gray-400">Cinza</span>: Região Desconhecida
          </p>
          <p className="mt-2 text-xs text-gray-300">
            Use o mouse para rotacionar • Scroll para zoom
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-4 right-4 z-10 text-white">
        <div className="bg-black/50 p-3 rounded space-y-1 text-sm">
          <p>
            📊 <strong>Sistema de Monitoramento</strong>
          </p>
          <p>🎯 50 pontos sendo monitorados</p>
          <p>⚠️ ~15 anomalias detectadas</p>
          <p>🔄 Atualização em tempo real</p>
        </div>
      </div>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 80], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <AnomalyMap />
      </Canvas>

      {/* Loading overlay */}
      <div className="absolute bottom-4 left-4 z-10 text-white">
        <div className="bg-black/50 p-2 rounded text-xs">
          <p>🚀 Sistema Cosmic Frontend</p>
          <p>🔬 Caçadores de Falhas v1.0</p>
        </div>
      </div>
    </div>
  );
}
