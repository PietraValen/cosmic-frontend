"use client";

import { useState } from "react";
import { buildApiUrl } from "@/config";

interface TestResult {
  name: string;
  result: unknown;
  timestamp: string;
}

export default function DebugApiPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (name: string, result: unknown) => {
    setTestResults((prev) => [
      ...prev,
      { name, result, timestamp: new Date().toISOString() },
    ]);
  };

  const testBasicConnectivity = async () => {
    setLoading(true);
    addResult(
      "Teste Iniciado",
      "Verificando conectividade com Laravel backend..."
    );

    // Teste 1: Verificar se a URL da API está configurada
    const apiUrl = buildApiUrl("");
    addResult("URL da API", apiUrl);

    // Teste 2: Tentar conectar com rota básica
    try {
      const response = await fetch(buildApiUrl("/"), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      addResult("Conectividade Básica", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      const text = await response.text();
      addResult("Resposta do Servidor", text.substring(0, 500));
    } catch (error) {
      addResult("Erro de Conectividade", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    // Teste 3: Verificar CORS com OPTIONS
    try {
      const corsResponse = await fetch(buildApiUrl("/api/login"), {
        method: "OPTIONS",
        headers: {
          Origin: window.location.origin,
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers":
            "Content-Type, Accept, Authorization",
        },
      });

      addResult("Teste CORS", {
        status: corsResponse.status,
        headers: Object.fromEntries(corsResponse.headers.entries()),
      });
    } catch (error) {
      addResult("Erro CORS", {
        message: error instanceof Error ? error.message : String(error),
      });
    }

    // Teste 4: Tentar login com credenciais de teste
    try {
      const loginResponse = await fetch(buildApiUrl("/api/login"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const loginData = await loginResponse.text();
      addResult("Teste de Login", {
        status: loginResponse.status,
        statusText: loginResponse.statusText,
        data: loginData.substring(0, 500),
      });
    } catch (error) {
      addResult("Erro no Login", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
      });
    }

    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Debug da API Laravel</h1>

        <div className="mb-8 space-x-4">
          <button
            onClick={testBasicConnectivity}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors"
          >
            {loading ? "Testando..." : "Testar Conectividade"}
          </button>

          <button
            onClick={clearResults}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Limpar Resultados
          </button>
        </div>

        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg border border-slate-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-blue-400">
                  {result.name}
                </h3>
                <span className="text-xs text-gray-400">
                  {result.timestamp}
                </span>
              </div>
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300">
                {typeof result.result === "object"
                  ? JSON.stringify(result.result, null, 2)
                  : String(result.result)}
              </pre>
            </div>
          ))}
        </div>

        {testResults.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Clique em &ldquo;Testar Conectividade&rdquo; para iniciar o
            diagnóstico
          </div>
        )}

        <div className="mt-12 bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
            💡 Possíveis Soluções
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              • <strong>Laravel não está rodando:</strong> Execute{" "}
              <code className="bg-slate-700 px-2 py-1 rounded">
                php artisan serve
              </code>
            </li>
            <li>
              • <strong>CORS não configurado:</strong> Verifique o arquivo{" "}
              <code className="bg-slate-700 px-2 py-1 rounded">
                config/cors.php
              </code>
            </li>
            <li>
              • <strong>URL incorreta:</strong> Verifique{" "}
              <code className="bg-slate-700 px-2 py-1 rounded">
                NEXT_PUBLIC_API_URL
              </code>{" "}
              no .env
            </li>
            <li>
              • <strong>Firewall/Antivírus:</strong> Pode estar bloqueando
              conexões localhost
            </li>
            <li>
              • <strong>Rotas não definidas:</strong> Verifique{" "}
              <code className="bg-slate-700 px-2 py-1 rounded">
                routes/api.php
              </code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
