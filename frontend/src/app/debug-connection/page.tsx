"use client";

import { useState } from "react";

export default function DebugConnection() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testBasicConnection = async () => {
    setIsLoading(true);
    setResult("🔍 Testando conexão básica...\n\n");

    try {
      // Teste 1: Verificar se Laravel responde
      setResult((prev) => prev + "1️⃣ Testando se Laravel responde...\n");

      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "test123",
        }),
      });

      setResult(
        (prev) => prev + `Status: ${response.status} ${response.statusText}\n`
      );

      const responseText = await response.text();
      setResult((prev) => prev + `Resposta: ${responseText}\n\n`);

      if (response.status === 401) {
        setResult(
          (prev) => prev + "✅ Laravel está respondendo (401 é esperado)\n"
        );
      } else if (response.status === 422) {
        setResult(
          (prev) => prev + "✅ Laravel está respondendo (422 é esperado)\n"
        );
      } else {
        setResult(
          (prev) => prev + `⚠️ Status inesperado: ${response.status}\n`
        );
      }
    } catch (error) {
      setResult(
        (prev) =>
          prev +
          `❌ Erro: ${
            error instanceof Error ? error.message : "Erro desconhecido"
          }\n`
      );
      setResult((prev) => prev + "\n💡 Possíveis causas:\n");
      setResult(
        (prev) => prev + "- Laravel não está rodando (php artisan serve)\n"
      );
      setResult((prev) => prev + "- CORS não configurado\n");
      setResult((prev) => prev + "- Porta incorreta\n");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            🔧 Debug de Conexão Laravel
          </h1>

          <button
            onClick={testBasicConnection}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
          >
            {isLoading ? "Testando..." : "🧪 Testar Conexão Básica"}
          </button>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Resultado:</h3>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {result ||
                "Clique no botão para testar a conexão com o Laravel..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
