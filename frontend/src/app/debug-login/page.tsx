"use client";

import { useState } from "react";

export default function SimpleTestPage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult("Enviando requisição...");

    try {
      console.log(
        "Fazendo requisição para: http://localhost:3000/api/auth/login"
      );

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "123456",
        }),
      });

      console.log("Status da resposta:", response.status);
      console.log("Headers da resposta:", response.headers);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Erro detalhado:", error);
      setResult(
        `ERRO: ${error instanceof Error ? error.message : "Erro desconhecido"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const testServer = async () => {
    setLoading(true);
    setResult("Testando se o servidor está rodando...");

    try {
      const response = await fetch("http://localhost:3000/");
      if (response.ok) {
        setResult("✅ Servidor está rodando na porta 3000");
      } else {
        setResult(`❌ Servidor respondeu com status: ${response.status}`);
      }
    } catch (error) {
      setResult(
        `❌ Servidor não está respondendo: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          🔧 Teste de Debug - Login API
        </h1>

        <div className="space-y-4 mb-6">
          <button
            onClick={testServer}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Testando..." : "1. Testar se servidor está rodando"}
          </button>

          <button
            onClick={testLogin}
            disabled={loading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Testando..." : "2. Testar Login API"}
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Resultado:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {result || "Clique em um botão para testar"}
          </pre>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-bold">Instruções:</h3>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Primeiro, teste se o servidor está rodando</li>
            <li>Se estiver, teste a API de login</li>
            <li>Verifique o console do browser (F12) para logs detalhados</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
