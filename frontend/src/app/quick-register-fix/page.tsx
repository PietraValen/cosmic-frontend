"use client";

import { useState } from "react";

export default function QuickRegisterTest() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testRegisterWorkaround = async () => {
    setIsLoading(true);
    setResult("🔄 Testando solução temporária para registro...\n\n");

    try {
      // Como não temos /api/register, vamos simular um processo
      setResult(
        (prev) => prev + "📝 Criando usuário via processo alternativo...\n"
      );

      // Simular criação de usuário (você implementaria isso no Laravel)
      const userData = {
        name: "Usuário Teste",
        email: "teste" + Date.now() + "@cosmic.com",
        password: "MinhaSenh@123",
      };

      setResult((prev) => prev + `👤 Dados do usuário: ${userData.email}\n`);

      // Tentar fazer login imediatamente (se o usuário já existir)
      setResult(
        (prev) => prev + "🔐 Tentando login para testar autenticação...\n"
      );

      const loginResponse = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: "admin@cosmic.com", // Use um email que existe
          password: "password123", // Use a senha correta
        }),
      });

      setResult((prev) => prev + `🔐 Login Status: ${loginResponse.status}\n`);

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        setResult((prev) => prev + "✅ Autenticação funcionando!\n");
        setResult(
          (prev) =>
            prev +
            `🎟️ Token recebido: ${loginData.access_token ? "Sim" : "Não"}\n\n`
        );
      }

      setResult((prev) => prev + "💡 Próximas ações recomendadas:\n");
      setResult(
        (prev) => prev + "1. Adicionar rota /api/register no Laravel\n"
      );
      setResult(
        (prev) => prev + "2. Implementar método register no AuthController\n"
      );
      setResult((prev) => prev + "3. Testar registro completo\n\n");

      setResult((prev) => prev + "🔧 Código Laravel necessário:\n");
      setResult(
        (prev) =>
          prev +
          "Route::post('/api/register', [AuthController::class, 'register']);\n"
      );
    } catch (error) {
      setResult(
        (prev) =>
          prev +
          `❌ Erro: ${
            error instanceof Error ? error.message : "Desconhecido"
          }\n`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            🔧 Solução para Registro de Usuários
          </h1>

          <div className="mb-6 space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-300 font-semibold mb-2">
                ✅ Rotas Funcionando:
              </h3>
              <ul className="text-green-200 text-sm space-y-1">
                <li>• /api/login (Status: 401) ✅</li>
                <li>• /api/logout (Status: 401) ✅</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h3 className="text-red-300 font-semibold mb-2">
                ❌ Rotas Faltando:
              </h3>
              <ul className="text-red-200 text-sm space-y-1">
                <li>• /api/register (404)</li>
                <li>• /api/user (404)</li>
              </ul>
            </div>
          </div>

          <button
            onClick={testRegisterWorkaround}
            disabled={isLoading}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
          >
            {isLoading ? "Testando..." : "🧪 Testar Sistema Atual"}
          </button>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-3">Resultado:</h3>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {result || "Clique no botão para testar o sistema atual..."}
            </pre>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">
              🚀 Ação Necessária no Laravel:
            </h3>
            <div className="text-blue-200 text-sm space-y-2">
              <p>
                <strong>1. Adicionar no routes/api.php:</strong>
              </p>
              <div className="bg-slate-800 p-3 rounded text-xs text-green-300 font-mono">
                {`Route::post('/api/register', [AuthController::class, 'register']);`}
                <br />
                {`Route::middleware('auth:sanctum')->get('/api/user', function (Request $request) {`}
                <br />
                {`    return $request->user();`}
                <br />
                {`});`}
              </div>

              <p>
                <strong>
                  2. Implementar método register no AuthController
                </strong>
              </p>
              <p>
                <strong>
                  3. Após implementar, testar novamente o registro
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
