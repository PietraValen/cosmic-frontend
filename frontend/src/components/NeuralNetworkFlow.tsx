"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Brain, Database, Users, CheckCircle } from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
  type: "input" | "hidden" | "output" | "data";
  label: string;
  active: boolean;
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

export default function NeuralNetworkFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const animationRef = useRef<number>();

  const nodes: Node[] = useMemo(
    () => [
      {
        id: "data1",
        x: 100,
        y: 150,
        type: "data",
        label: "Dados LIGO",
        active: false,
      },
      {
        id: "data2",
        x: 100,
        y: 250,
        type: "data",
        label: "Dados Virgo",
        active: false,
      },
      {
        id: "data3",
        x: 100,
        y: 350,
        type: "data",
        label: "Dados KAGRA",
        active: false,
      },

      {
        id: "input1",
        x: 250,
        y: 100,
        type: "input",
        label: "Espectrograma",
        active: false,
      },
      {
        id: "input2",
        x: 250,
        y: 180,
        type: "input",
        label: "Frequência",
        active: false,
      },
      {
        id: "input3",
        x: 250,
        y: 260,
        type: "input",
        label: "Amplitude",
        active: false,
      },
      {
        id: "input4",
        x: 250,
        y: 340,
        type: "input",
        label: "Duração",
        active: false,
      },
      {
        id: "input5",
        x: 250,
        y: 420,
        type: "input",
        label: "SNR",
        active: false,
      },

      {
        id: "hidden1",
        x: 400,
        y: 120,
        type: "hidden",
        label: "Conv 1",
        active: false,
      },
      {
        id: "hidden2",
        x: 400,
        y: 200,
        type: "hidden",
        label: "Conv 2",
        active: false,
      },
      {
        id: "hidden3",
        x: 400,
        y: 280,
        type: "hidden",
        label: "Pool",
        active: false,
      },
      {
        id: "hidden4",
        x: 400,
        y: 360,
        type: "hidden",
        label: "Dense",
        active: false,
      },

      {
        id: "hidden5",
        x: 550,
        y: 160,
        type: "hidden",
        label: "LSTM 1",
        active: false,
      },
      {
        id: "hidden6",
        x: 550,
        y: 240,
        type: "hidden",
        label: "LSTM 2",
        active: false,
      },
      {
        id: "hidden7",
        x: 550,
        y: 320,
        type: "hidden",
        label: "Dropout",
        active: false,
      },

      {
        id: "output1",
        x: 700,
        y: 150,
        type: "output",
        label: "Blip",
        active: false,
      },
      {
        id: "output2",
        x: 700,
        y: 230,
        type: "output",
        label: "Whistle",
        active: false,
      },
      {
        id: "output3",
        x: 700,
        y: 310,
        type: "output",
        label: "Scattered",
        active: false,
      },
      {
        id: "output4",
        x: 700,
        y: 390,
        type: "output",
        label: "Outros",
        active: false,
      },

      {
        id: "human",
        x: 850,
        y: 270,
        type: "data",
        label: "Validação",
        active: false,
      },
    ],
    []
  );

  const connections: Connection[] = useMemo(
    () => [
      { from: "data1", to: "input1", active: false },
      { from: "data1", to: "input2", active: false },
      { from: "data2", to: "input3", active: false },
      { from: "data2", to: "input4", active: false },
      { from: "data3", to: "input5", active: false },

      { from: "input1", to: "hidden1", active: false },
      { from: "input2", to: "hidden1", active: false },
      { from: "input2", to: "hidden2", active: false },
      { from: "input3", to: "hidden2", active: false },
      { from: "input3", to: "hidden3", active: false },
      { from: "input4", to: "hidden3", active: false },
      { from: "input4", to: "hidden4", active: false },
      { from: "input5", to: "hidden4", active: false },

      { from: "hidden1", to: "hidden5", active: false },
      { from: "hidden2", to: "hidden5", active: false },
      { from: "hidden2", to: "hidden6", active: false },
      { from: "hidden3", to: "hidden6", active: false },
      { from: "hidden3", to: "hidden7", active: false },
      { from: "hidden4", to: "hidden7", active: false },

      { from: "hidden5", to: "output1", active: false },
      { from: "hidden5", to: "output2", active: false },
      { from: "hidden6", to: "output2", active: false },
      { from: "hidden6", to: "output3", active: false },
      { from: "hidden7", to: "output3", active: false },
      { from: "hidden7", to: "output4", active: false },

      { from: "output1", to: "human", active: false },
      { from: "output2", to: "human", active: false },
      { from: "output3", to: "human", active: false },
      { from: "output4", to: "human", active: false },
    ],
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);

        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = conn.active ? "#22d3ee" : "#334155";
          ctx.lineWidth = conn.active ? 2 : 1;
          ctx.globalAlpha = conn.active ? 0.8 : 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;

          if (conn.active) {
            const progress = (Date.now() % 1000) / 1000;
            const x = fromNode.x + (toNode.x - fromNode.x) * progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * progress;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#22d3ee";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#22d3ee";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      nodes.forEach((node) => {
        const colors = {
          data: "#3b82f6",
          input: "#22d3ee",
          hidden: "#8b5cf6",
          output: "#22c55e",
        };

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.active ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? colors[node.type] : "#1e293b";
        ctx.fill();
        ctx.strokeStyle = colors[node.type];
        ctx.lineWidth = 2;
        ctx.stroke();

        if (node.active) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = colors[node.type];
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
          ctx.strokeStyle = colors[node.type];
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeStep, nodes, connections]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    nodes.forEach((node) => (node.active = false));
    connections.forEach((conn) => (conn.active = false));

    if (activeStep === 0) {
      ["data1", "data2", "data3"].forEach((id) => {
        const node = nodes.find((n) => n.id === id);
        if (node) node.active = true;
      });
    } else if (activeStep === 1) {
      ["input1", "input2", "input3", "input4", "input5"].forEach((id) => {
        const node = nodes.find((n) => n.id === id);
        if (node) node.active = true;
      });
      connections.slice(0, 5).forEach((conn) => (conn.active = true));
    } else if (activeStep === 2) {
      [
        "hidden1",
        "hidden2",
        "hidden3",
        "hidden4",
        "hidden5",
        "hidden6",
        "hidden7",
      ].forEach((id) => {
        const node = nodes.find((n) => n.id === id);
        if (node) node.active = true;
      });
      connections.slice(5, 21).forEach((conn) => (conn.active = true));
    } else if (activeStep === 3) {
      ["output1", "output2", "output3", "output4"].forEach((id) => {
        const node = nodes.find((n) => n.id === id);
        if (node) node.active = true;
      });
      connections.slice(21, 27).forEach((conn) => (conn.active = true));
    } else if (activeStep === 4) {
      const humanNode = nodes.find((n) => n.id === "human");
      if (humanNode) humanNode.active = true;
      connections.slice(27).forEach((conn) => (conn.active = true));
    }
  }, [activeStep, nodes, connections]);

  const stages = [
    {
      icon: Database,
      title: "Coleta de Dados",
      desc: "Dados dos detectores LIGO, Virgo e KAGRA",
    },
    {
      icon: Brain,
      title: "Extração de Features",
      desc: "Conversão em espectrogramas e análise de características",
    },
    {
      icon: Brain,
      title: "Processamento Neural",
      desc: "Redes convolucionais e LSTM para classificação",
    },
    {
      icon: CheckCircle,
      title: "Classificação",
      desc: "Identificação do tipo de glitch",
    },
    {
      icon: Users,
      title: "Validação Humana",
      desc: "Ciência cidadã confirma casos ambíguos",
    },
  ];

  return (
    <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h3 className="text-2xl font-bold text-white mb-2">
          Fluxo de Inteligência Híbrida
        </h3>
        <p className="text-slate-400 text-sm">
          IA + Ciência Cidadã trabalhando juntas
        </p>
      </div>

      <div className="p-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={950}
            height={500}
            className="w-full bg-slate-900 rounded-lg"
          />

          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <div className="text-xs font-semibold text-cyan-400">Entrada</div>
            <div className="text-xs font-semibold text-purple-400">
              Processamento
            </div>
            <div className="text-xs font-semibold text-green-400">Saída</div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mt-6">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border transition-all ${
                activeStep === idx
                  ? "bg-cyan-500/10 border-cyan-500"
                  : "bg-slate-800/50 border-slate-700"
              }`}
            >
              <stage.icon
                className={`w-6 h-6 mb-2 ${
                  activeStep === idx ? "text-cyan-400" : "text-slate-500"
                }`}
              />
              <h4 className="text-sm font-semibold text-white mb-1">
                {stage.title}
              </h4>
              <p className="text-xs text-slate-400">{stage.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {stages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeStep === idx ? "bg-cyan-400 w-8" : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
