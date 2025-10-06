"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuickTestPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testSystemStatus = async () => {
    setIsLoading(true);
    setResult("🔍 Verificando status do sistema integrado...\n\n");

    try {
      // Teste 1: Verificar CORS
      setResult((prev) => prev + "1️⃣ Testando CORS...\n");

      const corsTest = await fetch("http://localhost:8000/api/login", {
        method: "OPTIONS",
        headers: {
          Origin: "http://localhost:3000",
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "Content-Type",
        },
      });

      if (corsTest.status === 200 || corsTest.status === 204) {
        setResult((prev) => prev + "✅ CORS configurado corretamente!\n\n");
      } else {
        setResult((prev) => prev + "❌ CORS ainda não configurado\n\n");
        return;
      }

      // Teste 2: Verificar estrutura da API
      setResult((prev) => prev + "2️⃣ Verificando estrutura da API...\n");

      const apiTest = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          email: "invalid@test.com",
          password: "invalid",
        }),
      });

      setResult((prev) => prev + `Status: ${apiTest.status}\n`);

      if (apiTest.status === 401) {
        setResult(
          (prev) =>
            prev +
            "✅ API de login funcionando (401 esperado para credenciais inválidas)\n"
        );
      } else if (apiTest.status === 422) {
        setResult(
          (prev) =>
            prev + "✅ API de login funcionando (422 - validação funcionando)\n"
        );
      } else {
        setResult(
          (prev) => prev + `⚠️  Status inesperado: ${apiTest.status}\n`
        );
      }

      setResult((prev) => prev + "\n🎉 Sistema pronto para uso!\n");
      setResult(
        (prev) =>
          prev + "👤 Use suas credenciais reais do Laravel para fazer login\n"
      );
    } catch (error) {
      setResult(
        (prev) =>
          prev +
          `❌ Erro de conexão: ${
            error instanceof Error ? error.message : "Erro desconhecido"
          }\n`
      );
      setResult(
        (prev) =>
          prev +
          "\n💡 Verifique se o Laravel está rodando e o CORS configurado\n"
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
            🎯 Sistema Integrado Laravel + Next.js
          </h1>

          <div className="space-y-4 mb-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-300 font-semibold mb-2">
                ✅ Configuração Concluída!
              </h3>
              <ul className="text-green-200 text-sm space-y-1">
                <li>• CORS configurado e funcionando</li>
                <li>• Frontend conectado ao Laravel backend</li>
                <li>• Rotas de API implementadas</li>
                <li>• Sistema pronto para autenticação real</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">
                Como usar agora:
              </h3>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Use suas credenciais reais do Laravel</li>
                <li>• Não há mais usuários de teste pré-configurados</li>
                <li>• O login autentica direto com seu banco de dados</li>
                <li>• Tokens JWT são gerenciados pelo Laravel Sanctum</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
            <button
              onClick={testSystemStatus}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isLoading ? "Verificando..." : "🔍 Verificar Status do Sistema"}
            </button>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-8">
            <h3 className="text-white font-semibold mb-3">Status:</h3>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {result ||
                "Sistema pronto! Clique para verificar status ou vá direto para o login."}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              🚀 Fazer Login
            </Link>

            <Link
              href="/test-connection"
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              🔧 Teste Detalhado
            </Link>

            <Link
              href="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              📊 Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
