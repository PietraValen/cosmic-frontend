"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { getAuthToken, buildAuthHeaders } from "@/config";

interface TokenInfo {
  token: string;
  hasToken: boolean;
  headers: HeadersInit;
}

interface TestResult {
  success: boolean;
  data?: unknown;
  user?: unknown;
  error?: string;
}

export default function DebugAuthPage() {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    const headers = buildAuthHeaders();

    setTokenInfo({
      token: token ? token.substring(0, 20) + "..." : "Nenhum token encontrado",
      hasToken: !!token,
      headers: headers,
    });
  }, []);

  const testGlitchesApi = async () => {
    try {
      console.log("Testando API de glitches...");
      const result = await api.getGlitches({ limit: 5 });
      setTestResult({ success: true, data: result });
    } catch (error) {
      console.error("Erro na API:", error);
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  const testLoginStatus = async () => {
    try {
      const result = await api.getUserProfile();
      setTestResult({ success: true, user: result });
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Debug de Autenticação</h1>

      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Informações do Token</h2>
          <pre className="text-sm bg-gray-700 p-4 rounded overflow-auto">
            {JSON.stringify(tokenInfo, null, 2)}
          </pre>
        </div>

        <div className="space-x-4">
          <button
            onClick={testGlitchesApi}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Testar API Glitches
          </button>

          <button
            onClick={testLoginStatus}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Testar Status do Login
          </button>
        </div>

        {testResult && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Resultado do Teste</h2>
            <pre className="text-sm bg-gray-700 p-4 rounded overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
