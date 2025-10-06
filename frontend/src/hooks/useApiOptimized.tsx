"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ApiResponse } from "@/services/api";

// Cache simples em memória para otimização
const apiCache = new Map<
  string,
  { data: unknown; timestamp: number; ttl: number }
>();

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

export interface UseApiOptions {
  immediate?: boolean;
  dependencies?: readonly unknown[];
  cacheKey?: string;
  cacheTTL?: number; // Time to live em milissegundos
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiState<T> {
  const {
    immediate = true,
    dependencies = [],
    cacheKey,
    cacheTTL = 5 * 60 * 1000,
  } = options; // 5 minutos default

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  // Use ref para evitar recriação da função
  const apiCallRef = useRef(apiCall);
  apiCallRef.current = apiCall;

  // Use ref para controlar se já executou
  const hasExecutedRef = useRef(false);
  const mountedRef = useRef(true);

  // Função para verificar cache
  const getCachedData = useCallback((key: string) => {
    const cached = apiCache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    return null;
  }, []);

  // Função para salvar no cache
  const setCachedData = useCallback((key: string, data: T, ttl: number) => {
    apiCache.set(key, { data, timestamp: Date.now(), ttl });
  }, []);

  const fetchData = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      setLoading(true);
      setError(null);

      // Verificar cache primeiro
      if (cacheKey) {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
          setData(cachedData as T);
          setLoading(false);
          return;
        }
      }

      const response = await apiCallRef.current();

      if (!mountedRef.current) return;

      if (response.success && response.data !== undefined) {
        setData(response.data);
        setError(null);

        // Salvar no cache
        if (cacheKey && response.data) {
          setCachedData(cacheKey, response.data, cacheTTL);
        }
      } else {
        setError(response.message || "Erro ao carregar dados");
        setData(null);
      }
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setData(null);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [cacheKey, getCachedData, setCachedData, cacheTTL]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    hasExecutedRef.current = false;

    // Limpar cache se necessário
    if (cacheKey) {
      apiCache.delete(cacheKey);
    }
  }, [cacheKey]);

  // Effect para execução inicial
  useEffect(() => {
    mountedRef.current = true;

    if (immediate && !hasExecutedRef.current) {
      hasExecutedRef.current = true;
      fetchData();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [immediate, fetchData]);

  // Effect separado para dependencies
  useEffect(() => {
    if (
      dependencies.length > 0 &&
      hasExecutedRef.current &&
      mountedRef.current
    ) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  const refetch = useCallback(async () => {
    if (mountedRef.current) {
      // Limpar cache ao fazer refetch
      if (cacheKey) {
        apiCache.delete(cacheKey);
      }
      await fetchData();
    }
  }, [fetchData, cacheKey]);

  return {
    data,
    loading,
    error,
    refetch,
    reset,
  };
}

// Hook simples para casos problemáticos
export function useApiSimple<T>(): {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (apiFunction: () => Promise<ApiResponse<T>>) => Promise<void>;
  reset: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (apiFunction: () => Promise<ApiResponse<T>>) => {
      if (!mountedRef.current) return;

      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction();

        if (!mountedRef.current) return;

        if (response.success && response.data !== undefined) {
          setData(response.data);
          setError(null);
        } else {
          setError(response.message || "Erro na operação");
          setData(null);
        }
      } catch (err) {
        if (!mountedRef.current) return;
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setData(null);
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

// Função para limpar todo o cache
export const clearApiCache = () => {
  apiCache.clear();
};

// Função para limpar cache expirado
export const clearExpiredCache = () => {
  const now = Date.now();
  for (const [key, value] of apiCache.entries()) {
    if (now - value.timestamp >= value.ttl) {
      apiCache.delete(key);
    }
  }
};
