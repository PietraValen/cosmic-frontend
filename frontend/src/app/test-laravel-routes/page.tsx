"use client";

import { useState } from "react";

export default function TestLaravelRoutes() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testAvailableRoutes = async () => {
    setIsLoading(true);
    setResult("🔍 Testando rotas disponíveis no Laravel...\n\n");

    const routesToTest = [
      "/api/login",
      "/api/register",
      "/api/user",
      "/api/logout",
      "/register",
      "/login",
    ];

    for (const route of routesToTest) {
      try {
        setResult((prev) => prev + `📡 Testando: ${route}\n`);

        const response = await fetch(`http://localhost:8000${route}`, {
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

        if (response.status === 404) {
          setResult((prev) => prev + `❌ Rota não encontrada\n\n`);
        } else {
          setResult(
            (prev) => prev + `✅ Rota existe (Status: ${response.status})\n\n`
          );
        }
      } catch (error) {
        setResult(
          (prev) =>
            prev +
            `❌ Erro: ${
              error instanceof Error ? error.message : "Desconhecido"
            }\n\n`
        );
      }
    }

    setResult((prev) => prev + "\n🎯 Próximos passos:\n");
    setResult(
      (prev) =>
        prev +
        "1. Se apenas /api/login existe, precisa adicionar /api/register\n"
    );
    setResult(
      (prev) =>
        prev +
        "2. Se /register existe, pode trocar frontend para usar sem /api\n"
    );
    setResult(
      (prev) =>
        prev + "3. Se nenhuma rota existe, precisa configurar autenticação\n"
    );

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            🔍 Diagnóstico de Rotas Laravel
          </h1>

          <div className="mb-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <h3 className="text-amber-300 font-semibold mb-2">
                ⚠️ Problema Detectado:
              </h3>
              <p className="text-amber-200 text-sm">
                A rota <code>/api/register</code> não foi encontrada no Laravel
                backend. Este teste vai verificar quais rotas estão disponíveis.
              </p>
            </div>
          </div>

          <button
            onClick={testAvailableRoutes}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
          >
            {isLoading ? "Testando..." : "🧪 Verificar Rotas Disponíveis"}
          </button>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Resultado:</h3>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {result ||
                "Clique no botão para verificar as rotas disponíveis no Laravel..."}
            </pre>
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">
              📋 Possíveis Soluções:
            </h3>
            <div className="text-blue-200 text-sm space-y-2">
              <div>
                <strong>1. Adicionar rota no Laravel:</strong>
              </div>
              <div className="bg-slate-800 p-2 rounded text-xs text-green-300 font-mono">
                {`Route::post('/api/register', [AuthController::class, 'register']);`}
              </div>

              <div>
                <strong>2. Usar Laravel Breeze/Sanctum:</strong>
              </div>
              <div className="bg-slate-800 p-2 rounded text-xs text-green-300 font-mono">
                composer require laravel/breeze --dev
                <br />
                php artisan breeze:install api
              </div>

              <div>
                <strong>3. Atualizar frontend para usar rotas corretas</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
