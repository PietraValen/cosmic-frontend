"use client";

import { useState } from "react";
import { ApiService } from "@/services/api";

const api = new ApiService();

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export default function QuickDebugPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (result: TestResult) => {
    setResults((prev) => [result, ...prev]);
  };

  const testConfig = () => {
    addResult({
      name: "Configuração da API",
      success: true,
      message: "Verificando configurações atuais",
      details: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        currentTime: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 100),
      },
      timestamp: new Date().toLocaleString(),
    });
  };

  const testLogin = async () => {
    setLoading(true);

    // Teste com credenciais que funcionam no fetch direto
    const testCredentials = {
      email: "admin@cosmic.com", // Email correto que funciona
      password: "123456", // Senha correta que funciona
    };

    try {
      console.log("🔄 Iniciando teste de login...");

      const result = await api.login(testCredentials);

      addResult({
        name: "Teste de Login",
        success: result.success,
        message: result.message,
        details: {
          hasToken: !!result.token,
          hasUser: !!result.user,
          data: result.data,
        },
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("❌ Erro no teste:", error);

      addResult({
        name: "Erro no Teste de Login",
        success: false,
        message: error instanceof Error ? error.message : String(error),
        details: {
          errorType:
            error instanceof Error ? error.constructor.name : typeof error,
          stack: error instanceof Error ? error.stack : undefined,
        },
        timestamp: new Date().toLocaleString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const testConnectivity = async () => {
    setLoading(true);

    // Teste 1: Verificar se conseguimos fazer fetch para qualquer coisa
    try {
      console.log("🔄 Teste 1: Conectividade básica...");

      const simpleResponse = await fetch("http://127.0.0.1:8000", {
        method: "GET",
        mode: "no-cors", // Evita problemas de CORS
      });

      addResult({
        name: "Teste 1: Conectividade Básica (no-cors)",
        success: true,
        message: "Conseguiu fazer fetch (modo no-cors)",
        details: {
          type: simpleResponse.type,
          status: simpleResponse.status || "opaque",
        },
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      addResult({
        name: "Teste 1: Falha na Conectividade Básica",
        success: false,
        message: error instanceof Error ? error.message : String(error),
        details: {
          errorType:
            error instanceof Error ? error.constructor.name : typeof error,
        },
        timestamp: new Date().toLocaleString(),
      });
    }

    // Teste 2: Verificar se o problema é específico da rota /api/login
    try {
      console.log("🔄 Teste 2: Verificando rota específica...");

      const apiResponse = await fetch("http://127.0.0.1:8000/api/login", {
        method: "GET", // Só GET primeiro
        headers: {
          Accept: "application/json",
        },
      });

      addResult({
        name: "Teste 2: GET na rota /api/login",
        success: true,
        message: `Status: ${apiResponse.status}`,
        details: {
          status: apiResponse.status,
          statusText: apiResponse.statusText,
          headers: Object.fromEntries(apiResponse.headers.entries()),
        },
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      addResult({
        name: "Teste 2: Falha no GET /api/login",
        success: false,
        message: error instanceof Error ? error.message : String(error),
        details: {
          errorType:
            error instanceof Error ? error.constructor.name : typeof error,
        },
        timestamp: new Date().toLocaleString(),
      });
    }

    setLoading(false);
  };

  const testWithXHR = async () => {
    setLoading(true);

    try {
      console.log("🔄 Testando com XMLHttpRequest...");

      const xhr = new XMLHttpRequest();

      const result = await new Promise<{
        success: boolean;
        data: Record<string, unknown>;
      }>((resolve) => {
        xhr.open("GET", "http://127.0.0.1:8000/api/login", true);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            resolve({
              success: xhr.status >= 200 && xhr.status < 300,
              data: {
                status: xhr.status,
                statusText: xhr.statusText,
                responseText: xhr.responseText.substring(0, 500),
                headers: xhr.getAllResponseHeaders(),
              },
            });
          }
        };

        xhr.onerror = function () {
          resolve({
            success: false,
            data: {
              error: "XMLHttpRequest error",
              status: xhr.status,
              statusText: xhr.statusText,
            },
          });
        };

        xhr.send();
      });

      addResult({
        name: "Teste XMLHttpRequest",
        success: result.success,
        message: result.success ? "XHR funcionou!" : "XHR falhou",
        details: result.data,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      addResult({
        name: "Erro no XMLHttpRequest",
        success: false,
        message: error instanceof Error ? error.message : String(error),
        details: {
          errorType:
            error instanceof Error ? error.constructor.name : typeof error,
        },
        timestamp: new Date().toLocaleString(),
      });
    }

    setLoading(false);
  };

  const testDirectFetch = async () => {
    setLoading(true);

    try {
      console.log("🔄 Testando fetch direto...");

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: "admin@cosmic.com",
          password: "123456",
        }),
      });

      const data = await response.text();

      addResult({
        name: "Fetch Direto",
        success: response.ok,
        message: `Status: ${response.status} ${response.statusText}`,
        details: {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          body: data.substring(0, 500),
        },
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      addResult({
        name: "Erro no Fetch Direto",
        success: false,
        message: error instanceof Error ? error.message : String(error),
        details: {
          errorType:
            error instanceof Error ? error.constructor.name : typeof error,
        },
        timestamp: new Date().toLocaleString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔍 Debug Login</h1>

        <div className="mb-6 flex gap-4 flex-wrap">
          <button
            onClick={testConfig}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
          >
            Verificar Config
          </button>

          <button
            onClick={testConnectivity}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-4 py-2 rounded"
          >
            {loading ? "Testando..." : "Testar Conectividade"}
          </button>

          <button
            onClick={testLogin}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded"
          >
            {loading ? "Testando..." : "Testar Login via API Service"}
          </button>

          <button
            onClick={testWithXHR}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 px-4 py-2 rounded"
          >
            {loading ? "Testando..." : "Testar XMLHttpRequest"}
          </button>

          <button
            onClick={testDirectFetch}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded"
          >
            {loading ? "Testando..." : "Testar Fetch Direto"}
          </button>

          <button
            onClick={() => setResults([])}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Limpar
          </button>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded border ${
                result.success
                  ? "bg-green-900/20 border-green-500"
                  : "bg-red-900/20 border-red-500"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{result.name}</h3>
                <span className="text-xs text-gray-400">
                  {result.timestamp}
                </span>
              </div>

              <p className="mb-2">{result.message}</p>

              {result.details && (
                <pre className="text-xs bg-slate-800 p-2 rounded overflow-x-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            Clique em um dos botões acima para testar
          </div>
        )}
      </div>
    </div>
  );
}
