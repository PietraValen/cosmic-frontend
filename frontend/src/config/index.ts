// Configurações da aplicação utilizando variáveis de ambiente
// Este arquivo centraliza todas as configurações que dependem do .env

export const config = {
  // URLs da API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    endpoints: {
      auth: {
        login: process.env.NEXT_PUBLIC_API_AUTH_LOGIN || "/api/auth/login",
        register:
          process.env.NEXT_PUBLIC_API_AUTH_REGISTER || "/api/auth/register",
        logout: process.env.NEXT_PUBLIC_API_AUTH_LOGOUT || "/api/auth/logout",
        refresh:
          process.env.NEXT_PUBLIC_API_AUTH_REFRESH || "/api/auth/refresh",
      },
      data: {
        glitches: process.env.NEXT_PUBLIC_API_GLITCHES || "/api/glitches",
        classifications:
          process.env.NEXT_PUBLIC_API_CLASSIFICATIONS || "/api/classifications",
        spectrograms:
          process.env.NEXT_PUBLIC_API_SPECTROGRAMS || "/api/spectrograms",
        detectors: process.env.NEXT_PUBLIC_API_DETECTORS || "/api/detectors",
      },
    },
  },

  // URLs dos detectores de ondas gravitacionais
  detectors: {
    ligoHandford:
      process.env.NEXT_PUBLIC_LIGO_HANFORD_URL ||
      "https://www.ligo.caltech.edu/",
    ligoLivingston:
      process.env.NEXT_PUBLIC_LIGO_LIVINGSTON_URL ||
      "https://www.ligo.caltech.edu/",
    virgo: process.env.NEXT_PUBLIC_VIRGO_URL || "https://www.virgo-gw.eu/",
    kagra:
      process.env.NEXT_PUBLIC_KAGRA_URL ||
      "https://gwcenter.icrr.u-tokyo.ac.jp/en/",
    geo600: process.env.NEXT_PUBLIC_GEO600_URL || "https://www.geo600.org/",
  },

  // APIs externas
  external: {
    gravitationalWaveApi:
      process.env.NEXT_PUBLIC_GRAVITATIONAL_WAVE_API ||
      "https://www.gw-openscience.org/api/",
    ligoOpenDataApi:
      process.env.NEXT_PUBLIC_LIGO_OPEN_DATA_API ||
      "https://www.gw-openscience.org/eventapi/",
  },

  // Configurações da aplicação
  app: {
    frontendUrl:
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    environment: process.env.NODE_ENV || "development",
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },

  // Configurações de analytics (se usar)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
  },

  // Configurações de autenticação (apenas para referência, JWT_SECRET não deve ser exposto)
  auth: {
    tokenKey: "cosmic-auth-token",
    userKey: "cosmic-user-data",
  },
} as const;

// Função para construir URLs completas da API
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = config.api.baseUrl.endsWith("/")
    ? config.api.baseUrl.slice(0, -1)
    : config.api.baseUrl;

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${baseUrl}${cleanEndpoint}`;
};

// Função para obter o token de autenticação
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(config.auth.tokenKey);
};

// Função para salvar o token de autenticação
export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(config.auth.tokenKey, token);
};

// Função para remover o token de autenticação
export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(config.auth.tokenKey);
  localStorage.removeItem(config.auth.userKey);
};

// Função para construir headers de requisição com autenticação
export const buildAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export default config;
