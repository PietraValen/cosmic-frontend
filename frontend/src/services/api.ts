// Service para comunicação com a API backend
import {
  buildApiUrl,
  buildAuthHeaders,
  setAuthToken,
  removeAuthToken,
} from "@/config";

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

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface GlitchData {
  id: string;
  type: string;
  confidence: number;
  timestamp: string;
  detector: string;
  spectrogramUrl?: string;
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
  location: string;
  status: string;
  sensitivity: number;
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
      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro na requisição");
      }

      return {
        success: true,
        message: data.message || "Sucesso",
        data: data.data || data,
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      console.error("Erro na API:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  }

  // ========== MÉTODOS DE AUTENTICAÇÃO ==========

  async login(credentials: LoginData): Promise<ApiResponse<User>> {
    const response = await this.makeRequest<User>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Se o login foi bem-sucedido, salva o token
    if (response.success && response.token) {
      setAuthToken(response.token);
      if (response.user && typeof window !== "undefined") {
        localStorage.setItem("cosmic-user-data", JSON.stringify(response.user));
      }
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<User>> {
    const response = await this.makeRequest<User>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    // Se o registro foi bem-sucedido, salva o token
    if (response.success && response.token) {
      setAuthToken(response.token);
      if (response.user && typeof window !== "undefined") {
        localStorage.setItem("cosmic-user-data", JSON.stringify(response.user));
      }
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.makeRequest("/api/auth/logout", {
      method: "POST",
    });

    // Remove o token independentemente da resposta da API
    removeAuthToken();
    
    if (typeof window !== "undefined") {
      localStorage.removeItem("cosmic-user-data");
    }

    return response;
  }

  // ========== MÉTODOS DE DADOS CIENTÍFICOS ==========

  async getGlitches(params?: {
    type?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<GlitchData[]>> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/api/glitches${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.makeRequest<GlitchData[]>(endpoint);
  }

  async getClassifications(): Promise<ApiResponse<Classification[]>> {
    return this.makeRequest<Classification[]>("/api/classifications");
  }

  async getSpectrograms(glitchId?: string): Promise<ApiResponse<Spectrogram[]>> {
    const endpoint = glitchId
      ? `/api/spectrograms/${glitchId}`
      : "/api/spectrograms";
    return this.makeRequest<Spectrogram[]>(endpoint);
  }

  async getDetectors(): Promise<ApiResponse<Detector[]>> {
    return this.makeRequest<Detector[]>("/api/detectors");
  }

  async submitClassification(data: {
    glitchId: string;
    classification: string;
    confidence: number;
    notes?: string;
  }): Promise<ApiResponse> {
    return this.makeRequest("/api/classifications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ========== MÉTODOS DE UPLOAD ==========

  async uploadSpectrogram(file: File, metadata?: UploadMetadata): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("file", file);

    if (metadata) {
      formData.append("metadata", JSON.stringify(metadata));
    }

    const url = buildApiUrl("/api/spectrograms/upload");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // Não inclua Content-Type para FormData - o browser define automaticamente
          Authorization: `Bearer ${
            localStorage.getItem("cosmic-auth-token") || ""
          }`,
        },
        body: formData,
      });

      const data = await response.json();

      return {
        success: response.ok,
        message:
          data.message ||
          (response.ok ? "Upload realizado com sucesso" : "Erro no upload"),
        data: data.data || data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Erro no upload",
      };
    }
  }

  // ========== MÉTODOS DE STATUS ==========

  async checkHealth(): Promise<ApiResponse> {
    return this.makeRequest("/api/health");
  }

  async getStats(): Promise<
    ApiResponse<{
      totalGlitches: number;
      totalClassifications: number;
      totalUsers: number;
      accuracy: number;
    }>
  > {
    return this.makeRequest("/api/stats");
  }
}

// Instância singleton do service
const apiService = new ApiService();

export default apiService;
