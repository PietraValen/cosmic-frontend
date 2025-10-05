"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ApiResponse } from "@/services/api";

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
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiState<T> {
  const { immediate = true, dependencies = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  // Use ref para evitar recriação da função
  const apiCallRef = useRef(apiCall);
  apiCallRef.current = apiCall;

  // Use ref para controlar se já executou
  const hasExecutedRef = useRef(false);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      setLoading(true);
      setError(null);

      const response = await apiCallRef.current();

      if (!mountedRef.current) return;

      if (response.success && response.data !== undefined) {
        setData(response.data);
        setError(null);
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
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    hasExecutedRef.current = false;
  }, []);

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
      await fetchData();
    }
  }, [fetchData]);

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

// Hook para mutations (POST, PUT, DELETE)
export function useMutation<T>(): {
  loading: boolean;
  error: string | null;
  execute: (apiFunction: () => Promise<ApiResponse<T>>) => Promise<T | null>;
  reset: () => void;
} {
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
    async (apiFunction: () => Promise<ApiResponse<T>>): Promise<T | null> => {
      if (!mountedRef.current) return null;

      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction();

        if (!mountedRef.current) return null;

        if (response.success && response.data !== undefined) {
          setError(null);
          return response.data;
        } else {
          setError(response.message || "Erro na operação");
          return null;
        }
      } catch (err) {
        if (!mountedRef.current) return null;
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        return null;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    reset,
  };
}
