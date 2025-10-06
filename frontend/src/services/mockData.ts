// Mock data para quando a API não estiver disponível
export const mockData = {
  glitches: [
    {
      id: "1",
      detector_id: "ligo-hanford",
      glitch_type_id: "blip",
      timestamp: "2025-01-05T10:30:00Z",
      peak_frequency: 150.5,
      snr: 8.2,
      duration: 0.2,
      confidence: 0.85,
      classification_method: "ai" as const,
      validated: false,
      detector: {
        id: "ligo-hanford",
        name: "LIGO Hanford",
        location: "Hanford, WA",
        status: "online",
      },
      glitch_type: {
        id: "blip",
        name: "Blip",
        description: "Short duration transient signal",
      },
    },
    {
      id: "2",
      detector_id: "ligo-livingston",
      glitch_type_id: "chirp",
      timestamp: "2025-01-05T10:25:00Z",
      peak_frequency: 75.3,
      snr: 12.1,
      duration: 0.5,
      confidence: 0.92,
      classification_method: "human" as const,
      validated: true,
      detector: {
        id: "ligo-livingston",
        name: "LIGO Livingston",
        location: "Livingston, LA",
        status: "online",
      },
      glitch_type: {
        id: "chirp",
        name: "Chirp",
        description: "Frequency sweep signal",
      },
    },
  ],

  detectors: [
    {
      id: "ligo-hanford",
      name: "LIGO Hanford",
      location: "Hanford, WA",
      status: "online",
      latitude: 46.4551,
      longitude: -119.4074,
    },
    {
      id: "ligo-livingston",
      name: "LIGO Livingston",
      location: "Livingston, LA",
      status: "online",
      latitude: 30.5628,
      longitude: -90.7742,
    },
    {
      id: "virgo",
      name: "Virgo",
      location: "Cascina, Italy",
      status: "maintenance",
      latitude: 43.6314,
      longitude: 10.5045,
    },
  ],

  realtimeAnalysis: {
    currentDetections: 3,
    signalStrength: 8.7,
    noiseLevel: 2.1,
    status: "running",
    lastUpdate: new Date().toISOString(),
  },

  dashboardStats: {
    totalDetectors: 3,
    totalGlitches: 1247,
    totalEvents: 856,
    totalObservatories: 3,
    recentDiscoveries: 12,
    systemHealth: "healthy" as const,
  },

  userActivity: [
    {
      id: "1",
      action: "Análise de glitch classificada",
      description: "Classificou glitch #1247 como 'Blip'",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      category: "classification",
    },
    {
      id: "2",
      action: "Nova detecção validada",
      description: "Validou detecção #1246 como verdadeira",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      category: "validation",
    },
    {
      id: "3",
      action: "Relatório exportado",
      description: "Exportou relatório de análises em CSV",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      category: "export",
    },
  ],
};
