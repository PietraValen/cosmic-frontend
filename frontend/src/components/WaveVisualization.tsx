"use client";
import { useEffect, useRef, useState } from "react";

export default function WaveVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationFrameId: number;
    let time = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const waves = [
        {
          amplitude: 30,
          frequency: 0.02,
          speed: 0.03,
          color: "rgba(59, 130, 246, 0.6)",
        },
        {
          amplitude: 25,
          frequency: 0.025,
          speed: 0.025,
          color: "rgba(14, 165, 233, 0.4)",
        },
        {
          amplitude: 20,
          frequency: 0.03,
          speed: 0.02,
          color: "rgba(6, 182, 212, 0.3)",
        },
      ];

      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;

        const mouseInfluence =
          Math.max(0, 100 - Math.abs(mousePos.x - canvas.width / 2)) / 100;

        for (let x = 0; x < canvas.width; x++) {
          const distanceFromMouse = Math.abs(x - mousePos.x);
          const ripple =
            distanceFromMouse < 200
              ? (1 - distanceFromMouse / 200) * mouseInfluence * 20
              : 0;

          const y =
            centerY +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * 0.01 + time * 0.05 + index) * 10 +
            ripple;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      time++;
      animationFrameId = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Ondas Gravitacionais
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ondulações no espaço-tempo geradas por eventos cósmicos extremos
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl" />
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            className="w-full h-64 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm cursor-crosshair"
            style={{ maxWidth: "100%" }}
          />
          <p className="text-center text-sm text-slate-500 mt-4">
            Mova o cursor para interagir com as ondas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2">1916</div>
            <p className="text-slate-300">
              Einstein prevê as ondas gravitacionais
            </p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2">2015</div>
            <p className="text-slate-300">Primeira detecção direta pelo LIGO</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2">Hoje</div>
            <p className="text-slate-300">
              Caçando glitches para melhorar detecções
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
