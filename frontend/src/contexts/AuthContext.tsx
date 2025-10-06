"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import apiService from "@/services/api";
import type { User } from "@/services/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("cosmic-auth-token");
      const userData = localStorage.getItem("cosmic-user-data");

      if (token && userData) {
        // Verificar se o token ainda é válido com o backend
        try {
          const response = await fetch("http://127.0.0.1:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          if (response.ok) {
            const validUserData = await response.json();
            setUser(validUserData);
          } else {
            // Token inválido, limpar dados
            localStorage.removeItem("cosmic-auth-token");
            localStorage.removeItem("cosmic-user-data");
            setUser(null);
          }
        } catch (apiError) {
          // Erro de conexão, limpar dados para forçar novo login
          console.log(
            "Erro ao validar token, limpando autenticação:",
            apiError
          );
          localStorage.removeItem("cosmic-auth-token");
          localStorage.removeItem("cosmic-user-data");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      localStorage.removeItem("cosmic-auth-token");
      localStorage.removeItem("cosmic-user-data");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiService.login({ email, password });

      if (response.success && response.user) {
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiService.register({ name, email, password });

      if (response.success && response.user) {
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no registro:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("cosmic-auth-token");
    localStorage.removeItem("cosmic-user-data");
    setUser(null);
    // Redirecionar para login se necessário
    window.location.href = "/auth/login";
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// Hook para páginas que requerem autenticação
export function useRequireAuth() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      window.location.href = "/auth/login";
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  return auth;
}
