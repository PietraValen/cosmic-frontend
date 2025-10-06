"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestConnectionPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const testConnection = async () => {
    setIsLoading(true);
    setResult("Testando conexão...\n");

    try {
      // Teste 0: Verificar se o Laravel está acessível
      setResult(
        (prev) => prev + "\n🔍 Verificando se Laravel está acessível...\n"
      );

      const healthCheck = await fetch("http://127.0.0.1:8000", {
        method: "GET",
        mode: "cors",
      });

      setResult(
        (prev) => prev + `✅ Laravel acessível: Status ${healthCheck.status}\n`
      );

      // Teste 1: Verificar endpoint de login
      setResult((prev) => prev + "\n🔍 Testando endpoint de login...\n");

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "123456",
        }),
      });

      const data = await response.json();

      setResult(
        (prev) =>
          prev +
          `
📡 Status: ${response.status} ${response.statusText}
📦 Headers: ${JSON.stringify(
            Object.fromEntries(response.headers.entries()),
            null,
            2
          )}
📄 Response: ${JSON.stringify(data, null, 2)}
      `
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      setResult(
        (prev) =>
          prev +
          `
❌ Erro de conexão: ${errorMessage}

💡 Possíveis causas:
• Laravel não está rodando em http://localhost:8000
• CORS não configurado adequadamente
• Rota /api/login não existe
• Problema de rede/firewall
      `
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testLaravelAccess = async () => {
    setIsLoading(true);
    setResult("Verificando acesso ao Laravel...\n");

    try {
      const response = await fetch("http://127.0.0.1:8000", {
        method: "GET",
        mode: "cors",
      });

      const text = await response.text();

      setResult(`
✅ Laravel está acessível!
📡 Status: ${response.status} ${response.statusText}
📄 Conteúdo (primeiros 200 chars): 
${text.substring(0, 200)}...
      `);
    } catch (error) {
      setResult(`
❌ Laravel não está acessível!
Erro: ${error instanceof Error ? error.message : "Erro desconhecido"}

Verifique se você executou:
> php artisan serve

E que o Laravel está rodando em http://localhost:8000
      `);
    } finally {
      setIsLoading(false);
    }
  };

  const testWithApiService = async () => {
    setIsLoading(true);
    setResult("Testando com API Service...");

    try {
      // Importação dinâmica para evitar problemas SSR
      const { default: apiService } = await import("@/services/api");

      const response = await apiService.login({
        email: "test@test.com",
        password: "123456",
      });

      setResult(`
API Service Response:
${JSON.stringify(response, null, 2)}
      `);
    } catch (error) {
      setResult(
        `Erro no API Service: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            🧪 Teste de Conexão Laravel
          </h1>

          <div className="space-y-4 mb-8">
            <p className="text-slate-300">
              Esta página testa a conexão entre o frontend Next.js e o backend
              Laravel.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">
                Pré-requisitos:
              </h3>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Laravel rodando em http://localhost:8000</li>
                <li>• Usuário teste: test@test.com / 123456</li>
                <li>• CORS configurado no Laravel</li>
                <li>• Rotas de API definidas</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={testLaravelAccess}
              disabled={isLoading}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isLoading ? "Testando..." : "Verificar Laravel"}
            </button>

            <button
              onClick={testConnection}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isLoading ? "Testando..." : "Teste Direto (Fetch)"}
            </button>

            <button
              onClick={testWithApiService}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isLoading ? "Testando..." : "Teste via API Service"}
            </button>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Resultado:</h3>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {result || "Clique em um botão para testar a conexão..."}
            </pre>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              ← Voltar ao Dashboard
            </button>

            <button
              onClick={() => router.push("/auth/login")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Ir para Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
