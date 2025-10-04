"use client";
import { useState } from "react";
import { MapPin, Radio, Telescope, Satellite, Zap } from "lucide-react";

interface ScientificLocation {
  id: number;
  name: string;
  type: "detector" | "observatory" | "research" | "satellite" | "event";
  lat: number;
  lon: number;
  description: string;
  icon: typeof MapPin;
  color: string;
  discoveries?: string[];
}

const scientificLocations: ScientificLocation[] = [
  {
    id: 1,
    name: "LIGO Hanford",
    type: "detector",
    lat: 46.455,
    lon: -119.408,
    description: "Detector de ondas gravitacionais com braços de 4 km",
    icon: Radio,
    color: "#22d3ee",
    discoveries: [
      "GW150914 - Primeira detecção",
      "GW170817 - Fusão de estrelas de nêutrons",
    ],
  },
  {
    id: 2,
    name: "LIGO Livingston",
    type: "detector",
    lat: 30.563,
    lon: -90.774,
    description: "Segundo detector LIGO nos EUA",
    icon: Radio,
    color: "#22d3ee",
    discoveries: [
      "Confirmação de GW150914",
      "Mais de 90 detecções confirmadas",
    ],
  },
  {
    id: 3,
    name: "Virgo",
    type: "detector",
    lat: 43.6314,
    lon: 10.5045,
    description: "Detector europeu de ondas gravitacionais",
    icon: Radio,
    color: "#3b82f6",
    discoveries: [
      "Localização precisa de eventos",
      "Colaboração internacional",
    ],
  },
  {
    id: 4,
    name: "KAGRA",
    type: "detector",
    lat: 36.4125,
    lon: 137.3059,
    description: "Detector subterrâneo no Japão",
    icon: Radio,
    color: "#8b5cf6",
    discoveries: ["Operacional desde 2020", "Tecnologia criogênica avançada"],
  },
  {
    id: 5,
    name: "GEO600",
    type: "detector",
    lat: 52.2467,
    lon: 9.8083,
    description: "Detector alemão de pesquisa",
    icon: Radio,
    color: "#06b6d4",
    discoveries: [
      "Desenvolvimento de tecnologias",
      "Pesquisa de supressão de ruído",
    ],
  },
  {
    id: 6,
    name: "GW150914",
    type: "event",
    lat: -70.6,
    lon: -113.9,
    description: "Primeira detecção de ondas gravitacionais",
    icon: Zap,
    color: "#f59e0b",
    discoveries: [
      "14 de setembro de 2015",
      "Fusão de buracos negros",
      "Prêmio Nobel 2017",
    ],
  },
  {
    id: 7,
    name: "GW170817",
    type: "event",
    lat: -23.38,
    lon: -69.4,
    description: "Fusão de estrelas de nêutrons",
    icon: Zap,
    color: "#eab308",
    discoveries: [
      "17 de agosto de 2017",
      "Contraparte eletromagnética",
      "Kilonova observada",
    ],
  },
  {
    id: 8,
    name: "VLA",
    type: "observatory",
    lat: 34.0784,
    lon: -107.6184,
    description: "Very Large Array - Radiotelescópio",
    icon: Telescope,
    color: "#10b981",
    discoveries: ["Observações de contrapartes", "Confirmação de eventos"],
  },
  {
    id: 9,
    name: "Observatório Gemini",
    type: "observatory",
    lat: 19.8238,
    lon: -155.4689,
    description: "Telescópios ópticos/infravermelhos",
    icon: Telescope,
    color: "#22c55e",
    discoveries: ["Follow-up óptico", "Espectroscopia de eventos"],
  },
  {
    id: 10,
    name: "Fermi",
    type: "satellite",
    lat: 0,
    lon: 0,
    description: "Satélite de raios gama",
    icon: Satellite,
    color: "#a855f7",
    discoveries: [
      "Detecção de raios gama",
      "GRB associados a ondas gravitacionais",
    ],
  },
];

export default function InteractiveScientificMap() {
  const [selectedLocation, setSelectedLocation] =
    useState<ScientificLocation | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const toMercator = (lat: number, lon: number) => {
    const x = ((lon + 180) / 360) * 100;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = 50 - (mercN / (2 * Math.PI)) * 100;
    return { x, y };
  };

  const filteredLocations =
    filter === "all"
      ? scientificLocations
      : scientificLocations.filter((loc) => loc.type === filter);

  return (
    <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h3 className="text-2xl font-bold text-white mb-4">
          Rede Global de Detecção
        </h3>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("detector")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "detector"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Radio className="inline w-4 h-4 mr-1" />
            Detectores
          </button>
          <button
            onClick={() => setFilter("event")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "event"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Zap className="inline w-4 h-4 mr-1" />
            Eventos
          </button>
          <button
            onClick={() => setFilter("observatory")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "observatory"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Telescope className="inline w-4 h-4 mr-1" />
            Observatórios
          </button>
        </div>
      </div>

      <div className="relative h-[500px] bg-slate-900">
        <svg
          viewBox="0 0 100 50"
          className="w-full h-full"
          style={{ backgroundColor: "#0f172a" }}
        >
          <defs>
            <pattern
              id="grid"
              width="2"
              height="2"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 2 0 L 0 0 0 2"
                fill="none"
                stroke="#1e293b"
                strokeWidth="0.05"
              />
            </pattern>
          </defs>

          <rect width="100" height="50" fill="url(#grid)" />

          {[...Array(6)].map((_, i) => (
            <line
              key={`lat-${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="#334155"
              strokeWidth="0.05"
              opacity="0.3"
            />
          ))}

          {[...Array(12)].map((_, i) => (
            <line
              key={`lon-${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="50"
              stroke="#334155"
              strokeWidth="0.05"
              opacity="0.3"
            />
          ))}

          {filteredLocations.map((location) => {
            const pos = toMercator(location.lat, location.lon);
            const Icon = location.icon;
            const isSelected = selectedLocation?.id === location.id;

            return (
              <g key={location.id}>
                {isSelected && (
                  <>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="2"
                      fill="none"
                      stroke={location.color}
                      strokeWidth="0.1"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="r"
                        from="2"
                        to="4"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.3"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}

                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? "0.8" : "0.5"}
                  fill={location.color}
                  opacity="0.8"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedLocation(location)}
                  style={{
                    filter: `drop-shadow(0 0 ${isSelected ? "8px" : "4px"} ${
                      location.color
                    })`,
                  }}
                />

                <foreignObject
                  x={pos.x - 0.3}
                  y={pos.y - 0.3}
                  width="0.6"
                  height="0.6"
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon size={8} color="white" strokeWidth={3} />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-sm p-4 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${selectedLocation.color}20` }}
              >
                {(() => {
                  const Icon = selectedLocation.icon;
                  return (
                    <Icon size={24} style={{ color: selectedLocation.color }} />
                  );
                })()}
              </div>

              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-1">
                  {selectedLocation.name}
                </h4>
                <p className="text-sm text-slate-300 mb-2">
                  {selectedLocation.description}
                </p>

                {selectedLocation.discoveries && (
                  <div className="space-y-1">
                    {selectedLocation.discoveries.map((discovery, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5"
                          style={{ backgroundColor: selectedLocation.color }}
                        />
                        <p className="text-xs text-slate-400">{discovery}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedLocation(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
