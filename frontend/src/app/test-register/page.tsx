"use client";

import { useState } from "react";

export default function TestRegisterPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testRegister = async () => {
    setIsLoading(true);
    setResult("🔍 Testando registro com Laravel...\n\n");

    try {
      const testData = {
        name: "Usuário Teste",
        email: "teste" + Date.now() + "@cosmic.com", // Email único
        password: "MinhaSenh@123",
        password_confirmation: "MinhaSenh@123",
      };

      setResult((prev) => prev + `📝 Tentando registrar: ${testData.email}\n`);

      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(testData),
      });

      setResult(
        (prev) => prev + `Status: ${response.status} ${response.statusText}\n`
      );

      const responseText = await response.text();
      setResult((prev) => prev + `Resposta: ${responseText}\n\n`);

      if (response.status === 201 || response.status === 200) {
        setResult((prev) => prev + "✅ Registro funcionando!\n");

        try {
          const data = JSON.parse(responseText);
          if (data.access_token) {
            setResult((prev) => prev + "✅ Token recebido com sucesso!\n");
          }
        } catch {
          setResult((prev) => prev + "⚠️ Resposta não é JSON válido\n");
        }
      } else if (response.status === 422) {
        setResult(
          (prev) => prev + "⚠️ Erro de validação (normal se email já existe)\n"
        );
      } else {
        setResult((prev) => prev + `❌ Erro inesperado: ${response.status}\n`);
      }
    } catch (error) {
      setResult(
        (prev) =>
          prev +
          `❌ Erro de conexão: ${
            error instanceof Error ? error.message : "Erro desconhecido"
          }\n`
      );
      setResult((prev) => prev + "\n💡 Verifique se:\n");
      setResult(
        (prev) => prev + "- Laravel está rodando (php artisan serve)\n"
      );
      setResult((prev) => prev + "- Rota /api/register existe\n");
      setResult((prev) => prev + "- CORS configurado\n");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            🧪 Teste de Registro Laravel
          </h1>

          <div className="mb-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">
                Teste de Cadastro:
              </h3>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Testa conexão com /api/register</li>
                <li>• Verifica se Laravel processa registro</li>
                <li>• Confirma retorno de access_token</li>
                <li>• Valida estrutura de resposta</li>
              </ul>
            </div>
          </div>

          <button
            onClick={testRegister}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
          >
            {isLoading ? "Testando..." : "🚀 Testar Registro"}
          </button>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Resultado:</h3>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {result || "Clique no botão para testar o registro..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
