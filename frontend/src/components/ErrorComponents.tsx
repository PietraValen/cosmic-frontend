"use client";

import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";
import React from "react";

interface ErrorComponentProps {
  error: string;
  onRetry?: () => void;
  type?: "general" | "network" | "auth" | "notfound";
}

export function ErrorComponent({
  error,
  onRetry,
  type = "general",
}: ErrorComponentProps) {
  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: WifiOff,
          title: "Erro de Conexão",
          description:
            "Não foi possível conectar com o servidor. Verifique sua conexão.",
          bgColor: "bg-red-50 dark:bg-red-950",
          iconColor: "text-red-500",
        };
      case "auth":
        return {
          icon: AlertCircle,
          title: "Erro de Autenticação",
          description: "Você precisa fazer login novamente.",
          bgColor: "bg-yellow-50 dark:bg-yellow-950",
          iconColor: "text-yellow-500",
        };
      case "notfound":
        return {
          icon: AlertCircle,
          title: "Dados não encontrados",
          description: "Os dados solicitados não foram encontrados.",
          bgColor: "bg-gray-50 dark:bg-gray-950",
          iconColor: "text-gray-500",
        };
      default:
        return {
          icon: AlertCircle,
          title: "Ops! Algo deu errado",
          description: error,
          bgColor: "bg-red-50 dark:bg-red-950",
          iconColor: "text-red-500",
        };
    }
  };

  const config = getErrorConfig();
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg p-6 ${config.bgColor} border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex flex-col items-center text-center">
        <Icon className={`w-12 h-12 ${config.iconColor} mb-4`} />

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {config.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {config.description}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorComponent
          error={this.state.error?.message || "Erro inesperado"}
          onRetry={() => this.setState({ hasError: false })}
          type="general"
        />
      );
    }

    return this.props.children;
  }
}
