// Service para comunicação com a API backend
import {
  buildApiUrl,
  buildAuthHeaders,
  setAuthToken,
  removeAuthToken,
  getAuthToken,
} from "@/config";
import { mockData } from "./mockData";

// Tipos para as respostas da API
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  joinDate: string;
  lastLogin: string;
  avatar?: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface ChangePasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string; // Laravel espera este campo
}

export interface Classification {
  id: string;
  glitchId: string;
  userId: string;
  classification: string;
  confidence: number;
  notes?: string;
  timestamp: string;
}

export interface Spectrogram {
  id: string;
  glitchId?: string;
  url: string;
  filename: string;
  uploadedAt: string;
  metadata?: Record<string, unknown>;
}

export interface Detector {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  location: string;
  country: string;
  arm_length_km: number;
  status: "active" | "maintenance" | "offline";
  operational_since: string;
  description: string;
  color: string;
}

export interface GlitchType {
  id: string;
  name: string;
  description: string;
}

export interface GlitchData {
  id: string;
  detector_id: string;
  glitch_type_id: string;
  timestamp: string;
  peak_frequency: number;
  snr: number;
  duration: number;
  confidence: number;
  classification_method: "ai" | "human";
  spectrogram_url?: string;
  notes?: string;
  validated: boolean;
  validated_by?: string;
  validated_at?: string;
  detector?: Detector;
  glitch_type?: GlitchType;
}

export interface GravitationalEvent {
  id: string;
  name: string;
  event_date: string;
  latitude: number;
  longitude: number;
  event_type: "BBH" | "BNS" | "NSBH" | "Unknown";
  mass_1: number;
  mass_2: number;
  distance_mpc: number;
  false_alarm_rate: number;
  description: string;
  significance: "Alta" | "Muito Alta" | "Baixa";
  detectors: string[];
  color: string;
}

export interface Observatory {
  id: string;
  name: string;
  description: string;
}

export interface ProjectStatistic {
  id: string;
  name: string;
  description: string;
  value?: number;
  unit?: string;
}

export interface ScientificDiscovery {
  id: string;
  name: string;
  description: string;
  discovery_date?: string;
  importance?: "High" | "Medium" | "Low";
}

export interface UploadMetadata {
  description?: string;
  tags?: string[];
  detector?: string;
  timestamp?: string;
}

// Classe principal do service
class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = buildApiUrl(endpoint);

    const defaultOptions: RequestInit = {
      headers: buildAuthHeaders(),
      ...options,
    };

    try {
      console.log("🔗 API Request:", {
        url,
        method: defaultOptions.method || "GET",
        headers: defaultOptions.headers,
        body: defaultOptions.body
          ? String(defaultOptions.body).substring(0, 200)
          : undefined,
      });

      const response = await fetch(url, defaultOptions);

      console.log(
        "📡 API Response Status:",
        response.status,
        response.statusText,
        "Headers:",
        Object.fromEntries(response.headers.entries())
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("❌ JSON Parse Error:", jsonError);
        throw new Error(
          `Erro ao parsear resposta JSON: ${response.status} ${response.statusText}`
        );
      }

      console.log("📦 API Response Data:", data);

      if (!response.ok) {
        throw new Error(
          data.message || `Erro HTTP ${response.status}: ${response.statusText}`
        );
      }

      return {
        success: true,
        message: data.message || "Sucesso",
        data: data.data || data,
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      console.error("❌ Erro na API:", error);

      // Tratamento específico para erros de rede/CORS
      if (error instanceof TypeError) {
        console.error("🚨 TypeError Details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          url: url,
        });

        if (
          error.message.includes("fetch") ||
          error.message.includes("Failed to fetch")
        ) {
          console.log(
            "🚫 Falha de fetch detectada, lançando exceção para fallback"
          );
          throw new Error(`FETCH_FAILED: ${error.message}`);
        }
        if (
          error.message.includes("NetworkError") ||
          error.message.includes("CORS")
        ) {
          console.log(
            "🚫 Erro de CORS detectado, lançando exceção para fallback"
          );
          throw new Error(`CORS_ERROR: ${error.message}`);
        }
      }

      throw error; // Re-lança outros erros para serem tratados pelos métodos específicos
    }
  }

  // ========== MÉTODOS DE AUTENTICAÇÃO ==========

  async login(credentials: LoginData): Promise<ApiResponse<User>> {
    console.log("🔄 Iniciando login com:", credentials.email);

    const response = await this.makeRequest<{
      access_token?: string;
      token_type?: string;
      expires_in?: number;
    }>("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    console.log("📡 Resposta do login:", response);

    // Laravel Sanctum retorna formato: { access_token, token_type, expires_in }
    if (response.success && response.data) {
      const laravelData = response.data;

      // Se tem access_token, é resposta do Laravel
      if (laravelData.access_token) {
        const token = laravelData.access_token;
        setAuthToken(token);

        // Buscar dados do usuário com o token
        try {
          const userResponse = await fetch(buildApiUrl("/api/me"), {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "cosmic-user-data",
                JSON.stringify(userData)
              );
            }

            return {
              success: true,
              message: "Login realizado com sucesso!",
              user: userData,
              token: token,
            };
          }
        } catch (userError) {
          console.error("Erro ao buscar dados do usuário:", userError);
        }

        // Fallback: usar dados mínimos
        const fallbackUser = {
          id: "1",
          name: "Usuário",
          email: credentials.email,
          role: "user",
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "cosmic-user-data",
            JSON.stringify(fallbackUser)
          );
        }

        return {
          success: true,
          message: "Login realizado com sucesso!",
          user: fallbackUser,
          token: token,
        };
      }
    }

    return {
      success: false,
      message: response.message || "Login falhou",
    };
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.makeRequest("/api/logout", {
      method: "POST",
    });

    // Remove o token independentemente da resposta da API
    removeAuthToken();

    if (typeof window !== "undefined") {
      localStorage.removeItem("cosmic-user-data");
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<User>> {
    console.log("🔄 Iniciando registro para:", userData.email);

    // Adicionar password_confirmation para Laravel
    const registrationData = {
      ...userData,
      password_confirmation: userData.password,
    };

    const response = await this.makeRequest<{
      access_token?: string;
      token_type?: string;
      expires_in?: number;
    }>("/api/register", {
      method: "POST",
      body: JSON.stringify(registrationData),
    });

    console.log("📡 Resposta do registro:", response);

    // Laravel Sanctum pode retornar formato: { access_token, token_type, expires_in }
    if (response.success && response.data) {
      const laravelData = response.data;

      // Se tem access_token, é resposta do Laravel
      if (laravelData.access_token) {
        const token = laravelData.access_token;
        setAuthToken(token);

        // Buscar dados do usuário com o token
        try {
          const userResponse = await fetch(buildApiUrl("/api/me"), {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "cosmic-user-data",
                JSON.stringify(userData)
              );
            }

            return {
              success: true,
              message: "Conta criada com sucesso!",
              user: userData,
              token: token,
            };
          }
        } catch (userError) {
          console.error("Erro ao buscar dados do usuário:", userError);
        }

        // Fallback: usar dados básicos
        const fallbackUser = {
          id: "1",
          name: userData.name,
          email: userData.email,
          role: "user",
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "cosmic-user-data",
            JSON.stringify(fallbackUser)
          );
        }

        return {
          success: true,
          message: "Conta criada com sucesso!",
          user: fallbackUser,
          token: token,
        };
      }
    }

    return {
      success: false,
      message: response.message || "Registro falhou",
    };
  }

  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.makeRequest<User>("/api/me");
  }

  async updateUserProfile(
    profileData: UpdateProfileData
  ): Promise<ApiResponse<UserProfile>> {
    return this.makeRequest<UserProfile>("/api/me", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(
    passwordData: ChangePasswordData
  ): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }>("/api/change-password", {
      method: "POST",
      body: JSON.stringify(passwordData),
    });
  }

  async uploadAvatar(file: File): Promise<ApiResponse<{ avatar_url: string }>> {
    const formData = new FormData();
    formData.append("avatar", file);

    const token = getAuthToken();
    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.makeRequest<{ avatar_url: string }>("/api/upload-avatar", {
      method: "POST",
      body: formData,
      headers: headers,
    });
  }

  async refreshToken(): Promise<ApiResponse<{ access_token: string }>> {
    return this.makeRequest<{ access_token: string }>("/api/refresh", {
      method: "POST",
    });
  }

  // ========== MÉTODOS DE DETECTORES ==========

  async getDetectors(): Promise<ApiResponse<Detector[]>> {
    try {
      const result = await this.makeRequest<Detector[]>("/api/detectors");

      // Se a API falhou, usar dados mock
      if (!result.success) {
        console.log("📦 Usando dados mock para detectores");
        return {
          success: true,
          message: "Dados mock carregados (API indisponível)",
          data: mockData.detectors as Detector[],
        };
      }

      return result;
    } catch (error) {
      console.log("📦 Usando dados mock para detectores devido a erro:", error);
      return {
        success: true,
        message: "Dados mock carregados (API indisponível)",
        data: mockData.detectors as Detector[],
      };
    }
  }

  async getDetector(id: string): Promise<ApiResponse<Detector>> {
    return this.makeRequest<Detector>(`/detectors/${id}`);
  }

  async createDetector(
    detector: Omit<Detector, "id">
  ): Promise<ApiResponse<Detector>> {
    return this.makeRequest<Detector>("/api/detectors", {
      method: "POST",
      body: JSON.stringify(detector),
    });
  }

  async updateDetector(
    id: string,
    detector: Partial<Detector>
  ): Promise<ApiResponse<Detector>> {
    return this.makeRequest<Detector>(`/detectors/${id}`, {
      method: "PUT",
      body: JSON.stringify(detector),
    });
  }

  async deleteDetector(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/detectors/${id}`, {
      method: "DELETE",
    });
  }

  // ========== MÉTODOS DE GLITCHES ==========

  async getGlitches(params?: {
    detector_id?: string;
    glitch_type_id?: string;
    limit?: number;
    offset?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<ApiResponse<GlitchData[]>> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const endpoint = `/glitches${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`;
      const result = await this.makeRequest<GlitchData[]>(endpoint);

      // Se a API falhou, usar dados mock
      if (!result.success) {
        console.log("📦 Usando dados mock para glitches");
        return {
          success: true,
          message: "Dados mock carregados (API indisponível)",
          data: mockData.glitches as GlitchData[],
        };
      }

      return result;
    } catch (error) {
      console.log("📦 Usando dados mock para glitches devido a erro:", error);
      return {
        success: true,
        message: "Dados mock carregados (API indisponível)",
        data: mockData.glitches as GlitchData[],
      };
    }
  }

  async getGlitch(id: string): Promise<ApiResponse<GlitchData>> {
    return this.makeRequest<GlitchData>(`/glitches/${id}`);
  }

  async createGlitch(
    glitch: Omit<GlitchData, "id">
  ): Promise<ApiResponse<GlitchData>> {
    return this.makeRequest<GlitchData>("/api/glitches", {
      method: "POST",
      body: JSON.stringify(glitch),
    });
  }

  async updateGlitch(
    id: string,
    glitch: Partial<GlitchData>
  ): Promise<ApiResponse<GlitchData>> {
    return this.makeRequest<GlitchData>(`/glitches/${id}`, {
      method: "PUT",
      body: JSON.stringify(glitch),
    });
  }

  async deleteGlitch(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/glitches/${id}`, {
      method: "DELETE",
    });
  }

  // ========== MÉTODOS DE TIPOS DE GLITCHES ==========

  async getGlitchTypes(): Promise<ApiResponse<GlitchType[]>> {
    return this.makeRequest<GlitchType[]>("/api/glitch-types");
  }

  async getGlitchType(id: string): Promise<ApiResponse<GlitchType>> {
    return this.makeRequest<GlitchType>(`/glitch-types/${id}`);
  }

  async createGlitchType(
    glitchType: Omit<GlitchType, "id">
  ): Promise<ApiResponse<GlitchType>> {
    return this.makeRequest<GlitchType>("/api/glitch-types", {
      method: "POST",
      body: JSON.stringify(glitchType),
    });
  }

  async updateGlitchType(
    id: string,
    glitchType: Partial<GlitchType>
  ): Promise<ApiResponse<GlitchType>> {
    return this.makeRequest<GlitchType>(`/glitch-types/${id}`, {
      method: "PUT",
      body: JSON.stringify(glitchType),
    });
  }

  async deleteGlitchType(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/glitch-types/${id}`, {
      method: "DELETE",
    });
  }

  // ========== MÉTODOS DE EVENTOS GRAVITACIONAIS ==========

  async getGravitationalEvents(): Promise<ApiResponse<GravitationalEvent[]>> {
    return this.makeRequest<GravitationalEvent[]>("/api/events");
  }

  async getGravitationalEvent(
    id: string
  ): Promise<ApiResponse<GravitationalEvent>> {
    return this.makeRequest<GravitationalEvent>(`/events/${id}`);
  }

  async createGravitationalEvent(
    event: Omit<GravitationalEvent, "id">
  ): Promise<ApiResponse<GravitationalEvent>> {
    return this.makeRequest<GravitationalEvent>("/api/events", {
      method: "POST",
      body: JSON.stringify(event),
    });
  }

  async updateGravitationalEvent(
    id: string,
    event: Partial<GravitationalEvent>
  ): Promise<ApiResponse<GravitationalEvent>> {
    return this.makeRequest<GravitationalEvent>(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(event),
    });
  }

  async deleteGravitationalEvent(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/events/${id}`, {
      method: "DELETE",
    });
  }

  // ========== MÉTODOS DE OBSERVATÓRIOS ==========

  async getObservatories(): Promise<ApiResponse<Observatory[]>> {
    return this.makeRequest<Observatory[]>("/api/observatories");
  }

  async getObservatory(id: string): Promise<ApiResponse<Observatory>> {
    return this.makeRequest<Observatory>(`/observatories/${id}`);
  }

  async createObservatory(
    observatory: Omit<Observatory, "id">
  ): Promise<ApiResponse<Observatory>> {
    return this.makeRequest<Observatory>("/api/observatories", {
      method: "POST",
      body: JSON.stringify(observatory),
    });
  }

  async updateObservatory(
    id: string,
    observatory: Partial<Observatory>
  ): Promise<ApiResponse<Observatory>> {
    return this.makeRequest<Observatory>(`/observatories/${id}`, {
      method: "PUT",
      body: JSON.stringify(observatory),
    });
  }

  async deleteObservatory(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/observatories/${id}`, {
      method: "DELETE",
    });
  }

  // ========== MÉTODOS DE ESTATÍSTICAS DE PROJETOS ==========

  async getProjectStatistics(): Promise<ApiResponse<ProjectStatistic[]>> {
    return this.makeRequest<ProjectStatistic[]>("/api/project-statistics");
  }

  async getProjectStatistic(
    id: string
  ): Promise<ApiResponse<ProjectStatistic>> {
    return this.makeRequest<ProjectStatistic>(`/project-statistics/${id}`);
  }

  async createProjectStatistic(
    statistic: Omit<ProjectStatistic, "id">
  ): Promise<ApiResponse<ProjectStatistic>> {
    return this.makeRequest<ProjectStatistic>("/api/project-statistics", {
      method: "POST",
      body: JSON.stringify(statistic),
    });
  }

  async updateProjectStatistic(
    id: string,
    statistic: Partial<ProjectStatistic>
  ): Promise<ApiResponse<ProjectStatistic>> {
    return this.makeRequest<ProjectStatistic>(`/project-statistics/${id}`, {
      method: "PUT",
      body: JSON.stringify(statistic),
    });
  }

  async deleteProjectStatistic(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/project-statistics/${id}`, {
      method: "DELETE",
    });
  }

  // ========== MÉTODOS DE DESCOBERTAS CIENTÍFICAS ==========

  async getScientificDiscoveries(): Promise<
    ApiResponse<ScientificDiscovery[]>
  > {
    return this.makeRequest<ScientificDiscovery[]>(
      "/api/scientific-discoveries"
    );
  }

  async getScientificDiscovery(
    id: string
  ): Promise<ApiResponse<ScientificDiscovery>> {
    return this.makeRequest<ScientificDiscovery>(
      `/scientific-discoveries/${id}`
    );
  }

  async createScientificDiscovery(
    discovery: Omit<ScientificDiscovery, "id">
  ): Promise<ApiResponse<ScientificDiscovery>> {
    return this.makeRequest<ScientificDiscovery>(
      "/api/scientific-discoveries",
      {
        method: "POST",
        body: JSON.stringify(discovery),
      }
    );
  }

  async updateScientificDiscovery(
    id: string,
    discovery: Partial<ScientificDiscovery>
  ): Promise<ApiResponse<ScientificDiscovery>> {
    return this.makeRequest<ScientificDiscovery>(
      `/scientific-discoveries/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(discovery),
      }
    );
  }

  async deleteScientificDiscovery(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/scientific-discoveries/${id}`, {
      method: "DELETE",
    });
  }

  // ========== MÉTODOS UTILITÁRIOS ==========

  // Método para buscar estatísticas do dashboard
  async getDashboardStats(): Promise<
    ApiResponse<{
      totalDetectors: number;
      totalGlitches: number;
      totalEvents: number;
      totalObservatories: number;
      recentDiscoveries: number;
      systemHealth: "healthy" | "warning" | "critical";
    }>
  > {
    try {
      // TODO: Implementar endpoint real no backend Laravel
      // const result = await this.makeRequest("/api/dashboard/stats");

      // Por enquanto, usar dados mock sempre
      console.log("📦 Usando dados mock para estatísticas do dashboard");
      return {
        success: true,
        message: "Estatísticas do dashboard carregadas",
        data: mockData.dashboardStats,
      };
    } catch (error) {
      console.log("📦 Usando dados mock para dashboard devido a erro:", error);
      return {
        success: true,
        message: "Dados mock carregados (API indisponível)",
        data: mockData.dashboardStats,
      };
    }
  }

  // Método para buscar dados de análise em tempo real
  async getRealtimeAnalysis(): Promise<
    ApiResponse<{
      currentDetections: number;
      signalStrength: number;
      noiseLevel: number;
      status: string;
      lastUpdate: string;
    }>
  > {
    try {
      // Tentativa de chamar API real (quando estiver implementada)
      // const result = await this.makeRequest("/api/realtime-analysis");

      // Por enquanto, usar dados mock sempre
      console.log("📦 Usando dados mock para análise em tempo real");
      return {
        success: true,
        message: "Dados de análise em tempo real carregados",
        data: mockData.realtimeAnalysis,
      };
    } catch (error) {
      console.log(
        "📦 Usando dados mock para análise em tempo real devido a erro:",
        error
      );
      return {
        success: true,
        message: "Dados mock carregados (API indisponível)",
        data: mockData.realtimeAnalysis,
      };
    }
  }

  // Método para buscar histórico de atividades do usuário
  async getUserActivity(): Promise<
    ApiResponse<
      Array<{
        id: string;
        action: string;
        description: string;
        timestamp: string;
        category: string;
      }>
    >
  > {
    try {
      // TODO: Implementar endpoint real no backend Laravel
      // const result = await this.makeRequest("/api/user/activity");

      // Por enquanto, usar dados mock sempre
      console.log("📦 Usando dados mock para atividades do usuário");
      return {
        success: true,
        message: "Atividades do usuário carregadas",
        data: mockData.userActivity,
      };
    } catch (error) {
      console.log("📦 Usando dados mock para atividades devido a erro:", error);
      return {
        success: true,
        message: "Dados mock carregados (API indisponível)",
        data: mockData.userActivity,
      };
    }
  }

  // Método para buscar relatórios disponíveis
  async getReports(): Promise<
    ApiResponse<
      Array<{
        id: string;
        name: string;
        description: string;
        type: string;
        createdAt: string;
        status: "ready" | "processing" | "error";
      }>
    >
  > {
    // TODO: Implementar endpoint real no backend Laravel
    // Por enquanto, retornamos dados simulados
    const mockReports = [
      {
        id: "1",
        name: "Relatório Semanal GW",
        description: "Análise semanal de detecções de ondas gravitacionais",
        type: "weekly_analysis",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: "ready" as const,
      },
      {
        id: "2",
        name: "Estatísticas de Performance",
        description: "Relatório de performance dos detectores",
        type: "performance_stats",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: "ready" as const,
      },
      {
        id: "3",
        name: "Análise Mensal",
        description: "Compilação mensal de descobertas científicas",
        type: "monthly_summary",
        createdAt: new Date().toISOString(),
        status: "processing" as const,
      },
    ];

    return Promise.resolve({
      success: true,
      data: mockReports,
      message: "Reports retrieved successfully (mock data)",
    });
  }

  // Método para gerar novo relatório
  async generateReport(config: {
    type: string;
    parameters: Record<string, string | number | boolean>;
    format: "pdf" | "csv" | "json";
  }): Promise<ApiResponse<{ reportId: string }>> {
    return this.makeRequest("/api/reports/generate", {
      method: "POST",
      body: JSON.stringify(config),
    });
  }

  // Método para buscar espectrogramas
  async getSpectrograms(params?: {
    detector_id?: string;
    limit?: number;
    offset?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<
    ApiResponse<
      Array<{
        id: string;
        detectorId: string;
        timestamp: string;
        frequency: number;
        amplitude: number;
        imageUrl?: string;
        metadata: Record<string, string | number>;
      }>
    >
  > {
    // TODO: Implementar endpoint real no backend Laravel
    // Por enquanto, retornamos dados simulados
    const mockSpectrograms = [
      {
        id: "1",
        detectorId: "H1",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        frequency: 250.5,
        amplitude: 0.85,
        imageUrl: "/spectrograms/gw190521_h1.png",
        metadata: {
          duration: 0.2,
          snr: 14.7,
          confidence: 0.98,
        },
      },
      {
        id: "2",
        detectorId: "L1",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        frequency: 150.3,
        amplitude: 0.72,
        imageUrl: "/spectrograms/gw190814_l1.png",
        metadata: {
          duration: 0.15,
          snr: 12.3,
          confidence: 0.94,
        },
      },
      {
        id: "3",
        detectorId: "V1",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        frequency: 300.8,
        amplitude: 0.91,
        imageUrl: "/spectrograms/gw200129_v1.png",
        metadata: {
          duration: 0.3,
          snr: 16.2,
          confidence: 0.99,
        },
      },
    ];

    const limit = params?.limit || 10;
    const offset = params?.offset || 0;

    return Promise.resolve({
      success: true,
      data: mockSpectrograms.slice(offset, offset + limit),
      message: "Spectrograms retrieved successfully (mock data)",
    });
  }

  // Método para testar conexão com a API
  async testConnection(): Promise<
    ApiResponse<{ status: string; timestamp: string }>
  > {
    return this.makeRequest("/api/health");
  }

  // ========== MÉTODOS DE STATUS ==========

  async checkHealth(): Promise<ApiResponse> {
    return this.makeRequest("/health");
  }

  async getStats(): Promise<
    ApiResponse<{
      totalGlitches: number;
      totalClassifications: number;
      totalUsers: number;
      accuracy: number;
    }>
  > {
    return this.makeRequest("/stats");
  }
}

// Instância singleton do service
const apiService = new ApiService();

// Exportações principais
export default apiService;
export const api = apiService;
export { ApiService };

// Funções utilitárias exportadas
export { setAuthToken, removeAuthToken, getAuthToken };
